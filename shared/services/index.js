// ===== shared/services/index.js =====
import { config, sha256 } from './config.js';
import { auth } from './auth.js';
import { toast } from './toast.js';

export const services = {
  config,
  crypto: { sha256 },
  auth,
  toast
};

export async function initServices() {
  console.log('[Services] Initialized');
  // Bisa tambah inisialisasi lain (misal cek session)
}
// shared/services/index.js
export const services = {};

export async function initServices() {
  // 1. Config (env/API endpoints)
  services.config = await import('./config.js').then(m => m.default);
  
  // 2. Supabase client
  services.supabase = await import('./supabase.js').then(m => m.init(services.config));
  
  // 3. Auth (legacy + Supabase fallback)
  services.auth = await import('./auth.js').then(m => m.init(services));
  
  // 4. Toast notifications
  services.toast = await import('./toast.js').then(m => m.init);
  
  // 5. i18n
  services.i18n = await import('./i18n.js').then(m => m.default);
  
  // 6. Theme
  services.theme = await import('./theme.js').then(m => m.init);
  
  // 7. Clock (for shell)
  services.clock = await import('./clock.js').then(m => m.init);
  
  console.log('✅ Services initialized');
  return services;
}
