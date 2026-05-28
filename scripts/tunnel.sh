#!/usr/bin/env bash
set -euo pipefail

PORT=3000
SUBDOMAIN="clinica-app"

if ! command -v nport >/dev/null 2>&1; then
  echo "Erro: nport não está instalado globalmente. Instale com: npm install -g nport"
  exit 1
fi

echo "Iniciando NPort tunnel para http://localhost:${PORT} com subdomínio ${SUBDOMAIN}.nport.link"
exec nport "$PORT" -s "$SUBDOMAIN"
