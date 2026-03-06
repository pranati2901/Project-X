#!/usr/bin/env bash
# ============================================
# NTUlearn — Sample API Requests
# ============================================
# Tests key API endpoints with valid payloads.
#
# Usage:
#   ./testbench/sample-requests.sh                          # demo mode (no auth)
#   AUTH_TOKEN="your-token" ./testbench/sample-requests.sh   # with Firebase token
#   BASE_URL="https://ntulearn-cd226.web.app" ./testbench/sample-requests.sh  # against live
#
# Requires: curl, jq (optional, for pretty output)

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3002}"
TOKEN="${AUTH_TOKEN:-}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PAYLOADS="$SCRIPT_DIR/payloads"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Build auth header
AUTH_HEADER=""
if [ -n "$TOKEN" ]; then
  AUTH_HEADER="Authorization: Bearer $TOKEN"
fi

pass=0
fail=0

test_endpoint() {
  local method="$1"
  local path="$2"
  local payload="$3"
  local description="$4"

  printf "${YELLOW}%-40s${NC} " "$description"

  if [ -n "$AUTH_HEADER" ]; then
    response=$(curl -s -w "\n%{http_code}" -X "$method" "$BASE_URL$path" \
      -H "Content-Type: application/json" \
      -H "$AUTH_HEADER" \
      -d @"$payload" 2>&1) || true
  else
    response=$(curl -s -w "\n%{http_code}" -X "$method" "$BASE_URL$path" \
      -H "Content-Type: application/json" \
      -d @"$payload" 2>&1) || true
  fi

  status_code=$(echo "$response" | tail -1)
  body=$(echo "$response" | sed '$d')

  if [ "$status_code" -ge 200 ] && [ "$status_code" -lt 300 ]; then
    printf "${GREEN}PASS${NC} (HTTP %s)\n" "$status_code"
    pass=$((pass + 1))
  elif [ "$status_code" -eq 401 ]; then
    printf "${YELLOW}AUTH${NC} (HTTP 401 — provide AUTH_TOKEN)\n"
    pass=$((pass + 1))
  else
    printf "${RED}FAIL${NC} (HTTP %s)\n" "$status_code"
    echo "  Response: $(echo "$body" | head -c 200)"
    fail=$((fail + 1))
  fi
}

echo ""
echo "============================================"
echo "  NTUlearn API Test Suite"
echo "  Base URL: $BASE_URL"
echo "  Auth: ${TOKEN:+token provided}${TOKEN:-demo mode}"
echo "============================================"
echo ""

test_endpoint POST "/api/burnout" \
  "$PAYLOADS/burnout.json" \
  "Burnout risk analysis"

test_endpoint POST "/api/flashcards" \
  "$PAYLOADS/flashcards.json" \
  "AI flashcard generation"

test_endpoint POST "/api/chat" \
  "$PAYLOADS/chat.json" \
  "AI tutor chat"

test_endpoint POST "/api/study-plan" \
  "$PAYLOADS/study-plan.json" \
  "Study plan generation"

test_endpoint POST "/api/predict" \
  "$PAYLOADS/predict.json" \
  "Score prediction"

test_endpoint POST "/api/weakness-analysis" \
  "$PAYLOADS/weakness-analysis.json" \
  "Weakness analysis"

test_endpoint POST "/api/insights" \
  "$PAYLOADS/insights.json" \
  "Learning insights"

test_endpoint POST "/api/practice" \
  "$PAYLOADS/practice.json" \
  "Practice paper generation"

echo ""
echo "============================================"
printf "  Results: ${GREEN}%d passed${NC}" "$pass"
if [ "$fail" -gt 0 ]; then
  printf ", ${RED}%d failed${NC}" "$fail"
fi
echo ""
echo "============================================"
echo ""

exit "$fail"
