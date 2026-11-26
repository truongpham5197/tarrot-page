FROM node:22-slim AS dependencies
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --include=optional --no-audit --no-fund

FROM dependencies AS builder
WORKDIR /app
ENV NODE_ENV=production
COPY next.config.ts next-env.d.ts tsconfig.json ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
RUN groupadd --gid 1001 sarah && useradd --uid 1001 --gid sarah --no-create-home sarah
COPY --from=builder --chown=sarah:sarah /app/.next/standalone ./
COPY --from=builder --chown=sarah:sarah /app/.next/static ./.next/static
COPY --from=builder --chown=sarah:sarah /app/public ./public
USER sarah
EXPOSE 3000
CMD ["node", "server.js"]
