#!/bin/bash
# DREAM OS IMAGE RECONSTRUCTION SYSTEM

G='\033[0;32m'
R='\033[0;31m'
NC='\033[0m'

cd assets/img || exit

for f in *.png; do
    echo -e "Processing: $f..."
    
    # Ambil konten file dan bersihkan karakter aneh
    CONTENT=$(cat "$f" | tr -d '\r\n[:space:]')
    
    # Check jika ada header data:image/png;base64,
    CLEAN_CONTENT=$(echo "$CONTENT" | sed 's/^data:image\/png;base64,//')
    
    # Re-build jadi biner asli pakai base64
    echo "$CLEAN_CONTENT" | base64 -d > "${f}.bin" 2>/dev/null
    
    if [ $? -eq 0 ] && [ -s "${f}.bin" ]; then
        mv "${f}.bin" "$f"
        echo -e "${G}✅ $f SEKARANG SUDAH JADI GAMBAR BINER ASLI!${NC}"
    else
        rm -f "${f}.bin"
        echo -e "${R}❌ Gagal merubah $f (Isi file bukan base64 valid)${NC}"
    fi
done

cd ../..
