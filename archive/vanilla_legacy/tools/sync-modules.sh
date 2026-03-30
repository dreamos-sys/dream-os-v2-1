#!/bin/bash
# --------------------------------------------------
# DREAM OS v13.4 - SYNC MODULES V 2.1 (PRO AI PLUS)
# AUTHOR: MASTER M (GHOST ARCHITECT)
# ASSISTANT: SIS BAWEL PREMIUM v2.0
# --------------------------------------------------

OUTPUT="modules-list.js"

echo "// --- DREAM OS AUTO-GENERATED V 2.1 ---" > $OUTPUT
echo "// Last Sync: $(date)" >> $OUTPUT
echo "window.MODULES = [" >> $OUTPUT

echo "--- 🤖 SIS BAWEL V 2.1 STARTING SYNC ---"

# Loop melalui folder di /modules
for d in modules/*/ ; do
    [ -L "$d" ] && continue # Skip symbolic links
    MOD_ID=$(basename "$d")
    
    # VALIDASI: Hanya masukkan jika ada file module.js (Biar gak ada tombol kosong)
    if [ -f "modules/$MOD_ID/module.js" ]; then
        # Format nama (janitor-indoor -> Janitor Indoor)
        MOD_NAME=$(echo "$MOD_ID" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')
        
        # Mapping Icon yang lebih lengkap
        ICON="fa-folder"
        case $MOD_ID in
            stok|gudang|inventaris) ICON="fa-boxes" ;;
            asset) ICON="fa-vcard" ;;
            sekuriti) ICON="fa-shield-alt" ;;
            janitor*) ICON="fa-broom" ;;
            ghost) ICON="fa-ghost" ;;
            ai-chat) ICON="fa-robot-astronat" ;;
            k3) ICON="fa-hard-hat" ;;
            booking) ICON="fa-calendar-check" ;;
            maintenance) ICON="fa-tools" ;;
            settings) ICON="fa-cog" ;;
            profile) ICON="fa-user-circle" ;;
            qr|scanner) ICON="fa-qrcode" ;;
            commandcenter) ICON="fa-satellite-dish" ;;
            audit) ICON="fa-clipboard-list" ;;
        esac

        echo "  { id: '$MOD_ID', name: '$MOD_NAME', icon: '$ICON', description: 'Accessing $MOD_NAME...' }," >> $OUTPUT
        echo "✅ Module Found: $MOD_ID (Icon: $ICON)"
    else
        echo "⚠️ Skipping: $MOD_ID (Empty or missing module.js)"
    fi
done

echo "];" >> $OUTPUT
echo ""
echo "--- ✨ SYNC V 2.1 COMPLETE! ---"
echo "--- 🌐 DREAM OS IS READY TO GAS! ---"
