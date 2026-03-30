export const SovereignHub = {
  detectNetwork: async () => ({ online: typeof navigator !== 'undefined' ? navigator.onLine : true }),
  scanBluetooth: async () => "Ready",
  checkNFC: async () => "Ready",
  detectPrinter: async () => "Standby",
  detectSmartBox: () => "Connected"
};
