// ===== shared/services/auth.js =====
import { config, sha256 } from './config.js';

// Data user (sementara, nanti pindah ke manifest atau database)
const USERS = {
  // ... (isi dari index.html lama, object USERS)
};

let currentUser = null;

export const auth = {
  async login(code) {
    const hash = await sha256(code + config.pepper);
    const user = USERS[hash];
    if (user) {
      currentUser = { ...user };
      return currentUser;
    }
    return null;
  },
  logout() {
    currentUser = null;
  },
  getUser() {
    return currentUser;
  }
};
