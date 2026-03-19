#!/bin/bash
# DREAM OS STARTUP v1.1 [TERMUX FIXED]
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "╔════════════════════════════════════════════════════════════════╗"
echo -e "║   ${GREEN}🚀 DREAM OS STARTUP SEQUENCE${NC}                              ║"
echo "╠════════════════════════════════════════════════════════════════╣"

# 1. MariaDB Check
echo -e "║   ${BLUE}[1/3] Checking MariaDB...${NC}                                   ║"
if service mariadb status > /dev/null 2>&1; then
    echo -e "║   ${GREEN}✅ MariaDB: RUNNING${NC}                                     ║"
else
    echo -e "║   ${YELLOW}⚠️  MariaDB: Starting...${NC}                                ║"
    service mariadb start
    sleep 2
fi

# 2. Bridge API Check
echo -e "║   ${BLUE}[2/3] Checking Bridge API...${NC}                                ║"
if pgrep -f "node.*bridge.js" > /dev/null; then
    echo -e "║   ${GREEN}✅ Bridge API: RUNNING${NC}                                  ║"
else
    echo -e "║   ${YELLOW}⚠️  Bridge API: Starting...${NC}                             ║"
    nohup node ~/bridge.js > ~/bridge.log 2>&1 &
    sleep 2
    echo -e "║   ${GREEN}✅ Bridge API: STARTED${NC}                                   ║"
fi

# 3. Prayer Sync
echo -e "║   ${BLUE}[3/3] Checking Prayer Time...${NC}                               ║"
[ -f ~/jadwal_sholat.py ] && echo -e "║   ${GREEN}✅ Prayer Script: SYNCED${NC}                                 ║" || echo -e "║   ${YELLOW}⚠️  Prayer Script: NOT FOUND${NC}                            ║"

echo "╠════════════════════════════════════════════════════════════════╣"
echo -e "║   ${GREEN}🎉 DREAM OS READY TO SYNC!${NC}                                   ║"
echo "╚════════════════════════════════════════════════════════════════╝"
