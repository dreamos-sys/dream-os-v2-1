export const VaccineEngine = {
  // Fungsi "Makan" serangan
  ingestAttack: (payload: string) => {
    console.log("🧬 NEURAL: Attack detected! Converting to Vaccine...");
    const signature = btoa(payload).substring(0, 16);
    
    // Simpan signature serangan ke blacklist permanen (Vaksin)
    const vaccines = JSON.parse(localStorage.getItem('dream_vaccines') || '[]');
    if (!vaccines.includes(signature)) {
      vaccines.push(signature);
      localStorage.setItem('dream_vaccines', JSON.stringify(vaccines));
    }
    
    return signature;
  },
  
  checkImmunity: (incoming: string) => {
    const signature = btoa(incoming).substring(0, 16);
    const vaccines = JSON.parse(localStorage.getItem('dream_vaccines') || '[]');
    return vaccines.includes(signature); // True jika sudah punya vaksinnya
  }
};
