#!/bin/sh
# Installs dependencies into the node_modules volume when it is empty or when
# package-lock.json has changed since the last install, then runs the command.
set -e

LOCK_HASH_FILE=node_modules/.package-lock.sha256
CURRENT_HASH=$(sha256sum package-lock.json | cut -d' ' -f1)

if [ ! -f "$LOCK_HASH_FILE" ] || [ "$(cat "$LOCK_HASH_FILE")" != "$CURRENT_HASH" ]; then
  echo "[dev-entrypoint] package-lock.json changed or node_modules empty: running npm ci"
  npm ci --no-audit --no-fund
  echo "$CURRENT_HASH" > "$LOCK_HASH_FILE"
else
  echo "[dev-entrypoint] node_modules up to date"
fi

exec "$@"
