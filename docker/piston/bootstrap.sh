#!/bin/sh
set -eu

PISTON_URL="${PISTON_URL:-http://piston:2000}"
PISTON_PACKAGES="${PISTON_PACKAGES:-python node typescript}"

echo "Waiting for Piston at ${PISTON_URL}..."

until curl -fsS "${PISTON_URL}/api/v2/runtimes" >/dev/null 2>&1; do
    sleep 2
done

for package in ${PISTON_PACKAGES}; do
    echo "Installing Piston package: ${package}"

    if curl -fsS -X POST "${PISTON_URL}/api/v2/packages" \
        -H "Content-Type: application/json" \
        -d "{\"language\":\"${package}\",\"version\":\"*\"}"; then
        echo
    else
        echo "Package '${package}' may already be installed; continuing."
    fi
done

echo "Installed Piston runtimes:"
curl -fsS "${PISTON_URL}/api/v2/runtimes"
