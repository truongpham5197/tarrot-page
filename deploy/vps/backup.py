"""Back up Sarah Reader's PostgreSQL database and retain seven archives."""
import os
import subprocess
from datetime import datetime, timezone
from pathlib import Path

root = Path('/opt/sarahreader').resolve()
directory = root / 'backups'
directory.mkdir(mode=0o700, exist_ok=True)
stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
os.umask(0o077)
pg_destination = directory / f'sarah-{stamp}.dump'
pg_temporary = directory / f'.sarah-{stamp}.dump.tmp'
try:
    with pg_temporary.open('wb') as output:
        subprocess.run(
            [
                'docker', 'exec', 'infra-postgres-1', 'pg_dump', '-U', 'postgres',
                '--no-owner', '--format=custom', 'sarahreader',
            ],
            check=True, stdout=output,
        )
    with pg_temporary.open('rb') as archive:
        subprocess.run(
            ['docker', 'exec', '-i', 'infra-postgres-1', 'pg_restore', '--file=/dev/null'],
            check=True, stdin=archive,
        )
except Exception:
    pg_temporary.unlink(missing_ok=True)
    raise
pg_temporary.replace(pg_destination)
pg_destination.chmod(0o600)
for old in sorted(directory.glob('sarah-*.dump'), reverse=True)[7:]:
    if old.resolve().parent == directory:
        old.unlink()
print(f'Postgres backup verified: {pg_destination.name}')
