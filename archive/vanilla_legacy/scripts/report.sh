#!/bin/bash

# 📊 DREAM OS - Report Generator
# Usage: ./scripts/report.sh
echo "╔══════════════════════════════════════════════════╗"
echo "║   📊 DREAM OS - Report Generator                 ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

SUPABASE_URL="https://lfavawkzvdhdpaaplaiq.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

echo -e "\033[0;34mSelect report type:\033[0m"
echo "1. Booking Report"
echo "2. K3 Report"
echo "3. Stock Report"
echo "4. Approval Report"
read -p "Enter choice (1-4): " report_type

read -p "Start date (YYYY-MM-DD, empty for 30 days ago): " start_date
read -p "End date (YYYY-MM-DD, empty for today): " end_date

if [ -z "$start_date" ]; then
  start_date=$(date -d "30 days ago" +%Y-%m-%d 2>/dev/null || date -v-30d +%Y-%m-%d)
fi
if [ -z "$end_date" ]; then
  end_date=$(date +%Y-%m-%d)
fi

echo -e "\n\033[0;34mSelect format:\033[0m"
echo "1. CSV"
echo "2. JSON"
read -p "Enter choice (1-2): " format_type

timestamp=$(date +%Y%m%d_%H%M%S)
case $report_type in
  1) table="bookings"; report_name="booking_report";;
  2) table="k3_reports"; report_name="k3_report";;
  3) table="stok"; report_name="stock_report";;
  4) table="approval_requests"; report_name="approval_report";;
esac

if [ "$format_type" = "1" ]; then
  output_file="${report_name}_${timestamp}.csv"
else
  output_file="${report_name}_${timestamp}.json"
fi

echo -e "\n\033[1;33mGenerating report...\033[0m"

response=$(curl -s -X GET "${SUPABASE_URL}/rest/v1/${table}?created_at=gte.${start_date}&created_at=lte.${end_date}" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Prefer: return=representation")
if [ "$format_type" = "1" ]; then
  echo "$response" | jq -r '.[0] | keys[] as $k | "\($k)"' | tr '\n' ',' | sed 's/,$/\n/' > "$output_file"
  echo "$response" | jq -r '.[] | [.[] | tostring] | join(",")' >> "$output_file"
else
  echo "$response" > "$output_file"
fi

echo -e "\n\033[0;32m✅ Report generated: ${output_file}\033[0m"
echo -e "\033[0;34m📊 Total records: $(echo "$response" | jq '. | length')\033[0m"
echo ""
