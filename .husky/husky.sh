#!/bin/sh
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

run_command () {
  command="$1"
  shift
  if command_exists "$command"; then
    "$command" "$@"
  else
    echo "Command $command does not exist. Skipping hook."
  fi
}

run_hook () {
  hook="$1"
  shift
  if [ -f ".husky/$hook" ]; then
    run_command sh ".husky/$hook" "$@"
  fi
}

run_hook "$@"
