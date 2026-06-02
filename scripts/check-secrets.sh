#!/usr/bin/env bash
# Scan git-tracked files for common secret patterns. Run before push.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "Not a git repository: $ROOT"
  exit 1
fi

PATTERN='ghp_[A-Za-z0-9]{20,}|gho_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|xox[baprs]-[A-Za-z0-9-]{10,}|li_at=[A-Za-z0-9_-]{20,}|-----BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY-----'

echo "Scanning tracked files in $(pwd) ..."
if git ls-files -z | xargs -0 grep -nE "$PATTERN" 2>/dev/null; then
  echo ""
  echo "FAIL: Possible secrets found in tracked files. Remove before committing."
  exit 1
fi

echo "OK: No common secret patterns in git-tracked files."
