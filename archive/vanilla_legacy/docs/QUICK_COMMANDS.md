# 🚀 DREAM OS - QUICK COMMANDS

## GitHub Push
```bash
cd ~/dream-os
git add -A
git commit -m "Your message"
git push -f origin main
git checkout gh-pages
git merge main -X theirs
git push -f origin gh-pages
git checkout main
```

## Test Locally
```bash
cd ~/dream-os
python3 -m http.server 8000
# Open: http://localhost:8000/dream/
```

## Clear Cache
```bash
# In browser console
localStorage.clear()
sessionStorage.clear()
location.reload()
```

## Module Development
```bash
# Create new module
mkdir -p modules/new-module
cat > modules/new-module/module.js
```

## Database Backup
```bash
# Export Supabase data
curl -X GET 'https://YOUR_URL.supabase.co/rest/v1/YOUR_TABLE' \
  -H "apikey: YOUR_KEY" \
  -H "Authorization: Bearer YOUR_KEY" \
  > backup.json
```

## Quick Fixes
```bash
# Fix stuck git
git reset --hard HEAD
git clean -fd

# Force push
git push -f origin main

# Check status
git status
git log -5
```
