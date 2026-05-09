#!/usr/bin/env bash

set -euo pipefail

# Resolve the repo root so the script works no matter where it is launched from.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
NODE_BACKEND_DIR="$ROOT_DIR/backend"
LOG_DIR="$ROOT_DIR/logs"

# Allow ports and startup behavior to be overridden without editing the file.
FRONTEND_PORT="${FRONTEND_PORT:-5173}"
BACKEND_PORT="${BACKEND_PORT:-5000}"
START_AFTER_SETUP="${START_AFTER_SETUP:-1}"

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

print_step() {
  printf "\n==> %s\n" "$1"
}

# Stop early with a clear message if a required tool is missing.
ensure_command() {
  local cmd="$1"
  local help_text="$2"

  if ! command_exists "$cmd"; then
    echo "Missing required command: $cmd"
    echo "$help_text"
    exit 1
  fi
}

# Copy example env files only when the real file does not exist yet.
copy_if_missing() {
  local source_file="$1"
  local target_file="$2"

  if [ -f "$source_file" ] && [ ! -f "$target_file" ]; then
    cp "$source_file" "$target_file"
    echo "Created $(basename "$target_file") from $(basename "$source_file")"
  fi
}

# Update an env key if it exists, or append it if it does not.
upsert_env_line() {
  local file="$1"
  local key="$2"
  local value="$3"

  if grep -q "^${key}=" "$file"; then
    perl -0pi -e "s#^${key}=.*#${key}=${value}#m" "$file"
  else
    printf "\n%s=%s\n" "$key" "$value" >> "$file"
  fi
}

# Use npm ci when a lockfile exists for reproducible installs.
install_node_dependencies() {
  local app_dir="$1"
  local app_name="$2"

  print_step "Installing $app_name dependencies"
  if [ -f "$app_dir/package-lock.json" ]; then
    (cd "$app_dir" && npm ci)
  else
    (cd "$app_dir" && npm install)
  fi
}

# Pre-download Maven dependencies so the Spring app is ready on a fresh machine.
install_java_dependencies() {
  print_step "Preparing Spring/Maven dependencies"
  (cd "$NODE_BACKEND_DIR" && mvn -q -DskipTests dependency:go-offline)
}

# Create local env files and inject safe defaults for local development.
bootstrap_env_files() {
  print_step "Bootstrapping environment files"

  copy_if_missing "$FRONTEND_DIR/.env.example" "$FRONTEND_DIR/.env"
  copy_if_missing "$NODE_BACKEND_DIR/.env.example" "$NODE_BACKEND_DIR/.env"

  if [ -f "$FRONTEND_DIR/.env" ]; then
    upsert_env_line "$FRONTEND_DIR/.env" "VITE_API_URL" "http://localhost:${BACKEND_PORT}/api"
  fi

  if [ -f "$NODE_BACKEND_DIR/.env" ]; then
    upsert_env_line "$NODE_BACKEND_DIR/.env" "PORT" "$BACKEND_PORT"
    upsert_env_line "$NODE_BACKEND_DIR/.env" "FRONTEND_URL" "http://localhost:${FRONTEND_PORT}"
    upsert_env_line "$NODE_BACKEND_DIR/.env" "JWT_SECRET" "celebeasy-local-dev-secret"
    upsert_env_line "$NODE_BACKEND_DIR/.env" "JWT_EXPIRES_IN" "7d"
  fi
}

# Only start the real Node backend when Mongo has actually been configured.
can_start_node_backend() {
  local env_file="$NODE_BACKEND_DIR/.env"

  if [ ! -f "$env_file" ]; then
    return 1
  fi

  if ! grep -q "^MONGODB_URI=" "$env_file"; then
    return 1
  fi

  if grep -q "<username>" "$env_file"; then
    return 1
  fi

  return 0
}

# Start the Vite dev server and send output to a log file.
start_frontend() {
  print_step "Starting frontend"
  mkdir -p "$LOG_DIR"
  (
    cd "$FRONTEND_DIR"
    npm run dev -- --host 0.0.0.0 --port "$FRONTEND_PORT"
  ) >"$LOG_DIR/frontend.log" 2>&1 &
  FRONTEND_PID=$!
  echo "Frontend started on http://localhost:${FRONTEND_PORT} (pid: $FRONTEND_PID)"
}

# Start the Node API server in the background and log its output too.
start_node_backend() {
  print_step "Starting Node backend"
  mkdir -p "$LOG_DIR"
  (
    cd "$NODE_BACKEND_DIR"
    npm run dev
  ) >"$LOG_DIR/backend.log" 2>&1 &
  BACKEND_PID=$!
  echo "Backend started on http://localhost:${BACKEND_PORT} (pid: $BACKEND_PID)"
}

# Give the person running the script a simple summary at the end.
show_next_steps() {
  cat <<EOF

Project bootstrap finished.

Frontend URL:
  http://localhost:${FRONTEND_PORT}

Log files:
  $LOG_DIR/frontend.log
  $LOG_DIR/backend.log

Notes:
  - The frontend will run even if the backend is not configured, because the app has local fallback data.
  - To enable the real Node backend, set a valid MONGODB_URI in backend/.env and run this script again.
  - The repo also contains a Spring backend, and this script prepares its Maven dependencies too.
EOF
}

main() {
  echo "CelebEasy global bootstrap starting..."

  # Verify the machine has the tools this repo expects.
  ensure_command "node" "Install Node.js 18+ from https://nodejs.org/"
  ensure_command "npm" "Install npm with Node.js from https://nodejs.org/"
  ensure_command "java" "Install Java 17+ to support the Spring backend."
  ensure_command "mvn" "Install Maven 3.8+ to prepare Spring dependencies."

  # Install both app dependency trees and prepare local config.
  install_node_dependencies "$FRONTEND_DIR" "frontend"
  install_node_dependencies "$NODE_BACKEND_DIR" "backend"
  bootstrap_env_files
  install_java_dependencies

  # Allow a setup-only mode when someone wants installs without booting servers.
  if [ "$START_AFTER_SETUP" != "1" ]; then
    show_next_steps
    exit 0
  fi

  # The frontend is always safe to run because it has fallback demo data.
  start_frontend

  # The backend is optional until Mongo credentials are configured.
  if can_start_node_backend; then
    start_node_backend
  else
    echo
    echo "Skipping Node backend startup because backend/.env does not contain a ready-to-use MONGODB_URI."
    echo "The frontend will still run with local fallback data."
  fi

  show_next_steps

  echo
  # Keep the parent shell attached so logs stay visible if desired.
  echo "Press Ctrl+C to stop this script. Started processes will continue running in the background."
  wait
}

main "$@"
