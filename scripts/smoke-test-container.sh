#!/usr/bin/env bash
set -euo pipefail

image="${1:-bengal-unfolded:smoke}"
name="bengal-unfolded-smoke-$$"
cleanup() { docker rm -f "$name" >/dev/null 2>&1 || true; }
trap cleanup EXIT

docker build -t "$image" .
docker run -d --name "$name" -p 127.0.0.1::80 "$image" >/dev/null
port="$(docker port "$name" 80/tcp | sed 's/.*://')"
base="http://127.0.0.1:$port"

wait_for_health() {
  for _ in $(seq 1 30); do
    status="$(docker inspect --format '{{.State.Health.Status}}' "$name")"
    [ "$status" = healthy ] && return 0
    sleep 1
  done
  echo "Container did not become healthy" >&2
  docker inspect --format '{{json .State.Health}}' "$name" >&2
  return 1
}
wait_for_health

check_status() {
  expected="$1" path="$2"
  actual="$(curl -sS -o /dev/null -w '%{http_code}' "$base$path")"
  [ "$actual" = "$expected" ] || { echo "$path: expected $expected, got $actual" >&2; exit 1; }
  echo "HTTP $actual $path"
}

check_status 200 /bn/
check_status 200 /en/
check_status 200 /bn/timeline/
check_status 200 /en/timeline/
asset_path="$(find out/_next/static -type f -name '*.js' -print -quit | sed 's#^out##')"
[ -n "$asset_path" ] || { echo "No JavaScript asset found in out/" >&2; exit 1; }
check_status 200 "$asset_path"
asset_headers="$(curl -sSI "$base$asset_path")"
printf '%s\n' "$asset_headers" | rg -qi '^Content-Type: application/javascript' || { echo "JavaScript MIME type missing" >&2; exit 1; }
printf '%s\n' "$asset_headers" | rg -qi '^Cache-Control: public, max-age=31536000, immutable' || { echo "Immutable cache header missing for Next asset" >&2; exit 1; }
check_status 301 /bn/heroes/
check_status 301 /en/heroes/example-id
check_status 301 /bn/events/example-event/heroes/
check_status 404 /route-that-does-not-exist/

redirect="$(curl -sS -o /dev/null -w '%{redirect_url}' "$base/bn/heroes/example-id")"
[ "$redirect" = "$base/bn/figures/example-id/" ] || { echo "Unexpected redirect: $redirect" >&2; exit 1; }
echo "Redirect destination verified: $redirect"
echo "Container health check: healthy"
