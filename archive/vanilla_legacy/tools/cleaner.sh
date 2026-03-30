#!/bin/bash
# Dream OS v13.4 - Cleaning Service
TRASH_DIR="$HOME/dream-os/TRASH_DREAM"
mkdir -p "$TRASH_DIR"

echo "--- 🤖 SIS BAWEL CLEANING SERVICE ---"
# Pindahin file sampah (.bak, .broken, .backup)
find ~/dream-os -maxdepth 2 -name "*.bak" -o -name "*.backup" -o -name "*.broken" | while read -r file; do
    mv "$file" "$TRASH_DIR/" && echo "📦 Keamanan: $(basename "$file") -> TRASH"
done

# Rapihin folder janitor (Underscore to Trash)
[ -d "$HOME/dream-os/modules/janitor_indoor" ] && mv "$HOME/dream-os/modules/janitor_indoor" "$TRASH_DIR/" && echo "⚠️ janitor_indoor -> TRASH"
[ -d "$HOME/dream-os/modules/janitor_outdoor" ] && mv "$HOME/dream-os/modules/janitor_outdoor" "$TRASH_DIR/" && echo "⚠️ janitor_outdoor -> TRASH"

echo "--- ✨ DAPUR KINCLONG, MASTER M! ---"
