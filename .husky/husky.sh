#!/bin/sh
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Get the absolute path to the directory containing this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run Husky with custom path to its files
. "$SCRIPT_DIR/../../node_modules/husky/run.js" "$@"
