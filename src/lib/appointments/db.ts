import "server-only";
import { createClient, type Client, type InStatement } from "@libsql/client";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Pool, type PoolClient } from "pg";

export type SqlRow = Record<string, unknown>;
export type SqlResult = { rows: SqlRow[]; rowsAffected: number };
export type SqlStatement =
  | string
  | { sql: string; args?: Array<string | number | bigint | null> };
export interface SqlTransaction {
  execute(statement: SqlStatement): Promise<SqlResult>;
  commit(): Promise<void>;
  close(): void;
}
export interface SqlDatabase {
  execute(statement: SqlStatement): Promise<SqlResult>;
  batch(statements: SqlStatement[], mode?: string): Promise<SqlResult[]>;
  transaction(mode?: string): Promise<SqlTransaction>;
  close(): Promise<void> | void;
}

const slotTable = `CREATE TABLE IF NOT EXISTS appointment_slots (id TEXT PRIMARY KEY, starts_at TEXT NOT NULL UNIQUE, ends_at TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 1)`;
const appointmentTable = `CREATE TABLE IF NOT EXISTS appointments (id TEXT PRIMARY KEY, reference TEXT NOT NULL UNIQUE, request_key TEXT NOT NULL UNIQUE, name TEXT NOT NULL, contact TEXT NOT NULL, email TEXT NOT NULL, service TEXT NOT NULL, note TEXT NOT NULL, admin_note TEXT NOT NULL DEFAULT '', mode TEXT NOT NULL CHECK(mode IN ('slot','proposal')), status TEXT NOT NULL CHECK(status IN ('proposed','pending','confirmed','completed','cancelled')), slot_id TEXT REFERENCES appointment_slots(id), starts_at TEXT NOT NULL, ends_at TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 1)`;
const reservationIndex = `CREATE UNIQUE INDEX IF NOT EXISTS active_slot_reservation ON appointments(slot_id) WHERE status IN ('pending','confirmed','completed') AND slot_id IS NOT NULL`;
const dateIndex = `CREATE INDEX IF NOT EXISTS appointments_date ON appointments(starts_at)`;
const scheduleLockTable = `CREATE TABLE IF NOT EXISTS appointment_schedule_locks (date TEXT PRIMARY KEY, version INTEGER NOT NULL DEFAULT 0)`;
const adminTable = `CREATE TABLE IF NOT EXISTS appointment_admin (id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL)`;
const sessionTable = (expires: string) =>
  `CREATE TABLE IF NOT EXISTS admin_sessions (token_hash TEXT PRIMARY KEY, expires_at ${expires} NOT NULL, admin_id INTEGER NOT NULL REFERENCES appointment_admin(id))`;
const limitTable = (resets: string) =>
  `CREATE TABLE IF NOT EXISTS request_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, resets_at ${resets} NOT NULL)`;

const cache = globalThis as typeof globalThis & {
  sarahDatabase?: { url: string; promise: Promise<SqlDatabase> };
};

function postgresSql(sql: string) {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`);
}
function statementOf(statement: SqlStatement) {
  if (typeof statement === "string") return { sql: statement, args: [] };
  return { sql: statement.sql, args: statement.args ?? [] };
}
function pgResult(result: {
  rows: SqlRow[];
  rowCount: number | null;
}): SqlResult {
  return { rows: result.rows, rowsAffected: result.rowCount ?? 0 };
}
async function runPg(
  client: Pool | PoolClient,
  statement: SqlStatement,
): Promise<SqlResult> {
  const { sql, args } = statementOf(statement);
  return pgResult(await client.query(postgresSql(sql), args));
}

function postgresDatabase(url: string): SqlDatabase {
  const pool = new Pool({ connectionString: url, max: 4 });
  pool.on("error", () => undefined);
  return {
    execute: (statement) => runPg(pool, statement),
    async batch(statements) {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const results: SqlResult[] = [];
        for (const statement of statements)
          results.push(await runPg(client, statement));
        await client.query("COMMIT");
        return results;
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    },
    async transaction() {
      const client = await pool.connect();
      await client.query("BEGIN");
      let settled = false;
      const finish = (sql: "COMMIT" | "ROLLBACK") => {
        if (settled) return;
        settled = true;
        void client.query(sql).finally(() => client.release());
      };
      return {
        execute: (statement) => runPg(client, statement),
        async commit() {
          if (settled) return;
          try {
            await client.query("COMMIT");
            settled = true;
          } finally {
            if (!settled) {
              settled = true;
              await client.query("ROLLBACK").catch(() => undefined);
            }
            client.release();
          }
        },
        close() {
          finish("ROLLBACK");
        },
      };
    },
    close: () => pool.end(),
  };
}

function sqliteDatabase(db: Client): SqlDatabase {
  const normalize = (result: { rows: unknown[]; rowsAffected: number }) => ({
    rows: result.rows as SqlRow[],
    rowsAffected: result.rowsAffected,
  });
  return {
    async execute(statement) {
      return normalize(await db.execute(statement as InStatement));
    },
    async batch(statements, mode) {
      const results = await db.batch(
        statements as InStatement[],
        mode as "write" | "read" | "deferred" | undefined,
      );
      return results.map(normalize);
    },
    async transaction(mode) {
      const tx = await db.transaction(
        mode as "write" | "read" | "deferred" | undefined,
      );
      return {
        async execute(statement) {
          return normalize(await tx.execute(statement as InStatement));
        },
        commit: () => tx.commit(),
        close: () => tx.close(),
      };
    },
    close: () => db.close(),
  };
}

export function database(): Promise<SqlDatabase> {
  let url = process.env.BOOKING_DATABASE_URL;
  if (process.env.VERCEL && (!url || url.startsWith("file:")))
    throw new Error(
      "BOOKING_DATABASE_URL must point to durable remote storage on Vercel.",
    );
  url ??= `file:${resolve(".data/sarah.db")}`;
  if (cache.sarahDatabase?.url === url) return cache.sarahDatabase.promise;
  const configuredUrl = url;
  const promise = (async () => {
    const postgres = /^postgres(ql)?:/i.test(configuredUrl);
    const db = postgres
      ? postgresDatabase(configuredUrl)
      : await openSqlite(configuredUrl);
    await db.batch(
      postgres
        ? [
            slotTable,
            appointmentTable,
            reservationIndex,
            dateIndex,
            scheduleLockTable,
            adminTable,
            sessionTable("BIGINT"),
            limitTable("BIGINT"),
          ]
        : [
            "PRAGMA foreign_keys = ON",
            slotTable,
            appointmentTable,
            reservationIndex,
            dateIndex,
            scheduleLockTable,
            adminTable,
            sessionTable("INTEGER"),
            limitTable("INTEGER"),
          ],
      "write",
    );
    return db;
  })();
  cache.sarahDatabase = { url, promise };
  promise.catch(() => {
    if (cache.sarahDatabase?.promise === promise)
      cache.sarahDatabase = undefined;
  });
  return promise;
}

async function openSqlite(configuredUrl: string) {
  let connectionUrl = configuredUrl;
  if (configuredUrl.startsWith("file:")) {
    const path = configuredUrl.startsWith("file://")
      ? fileURLToPath(configuredUrl)
      : resolve(configuredUrl.slice(5));
    await mkdir(dirname(path), { recursive: true });
    connectionUrl = pathToFileURL(path).href;
  }
  return sqliteDatabase(
    createClient({
      url: connectionUrl,
      authToken: process.env.BOOKING_DATABASE_AUTH_TOKEN,
    }),
  );
}
