/**
 * 🔐 DREAM OS V14.0 - User Credentials
 * Global Pro Standard
 */

export interface UserCredential {
  username: string;
  password: string;
  role: string;
  access: string;
  modules?: string[];
}

export const CREDENTIALS: UserCredential[] = [
  {
    username: 'developer',
    password: 'b15m1ll4h_012443410',
    role: 'Developer',
    access: 'Full Access',
    modules: ['all']
  },  {
    username: 'master',
    password: 'Mr.M_Architect_2025',
    role: 'Master',
    access: 'Full Access',
    modules: ['all']
  },
  {
    username: 'commandcenter',
    password: '4dm1n_AF6969@00',
    role: 'Command Center',
    access: 'Full Access',
    modules: ['all']
  },
  {
    username: 'sekuriti',
    password: 'LHPSsec_AF2025',
    role: 'Security',
    access: 'Security Module',
    modules: ['security', 'k3', 'monitoring']
  },
  {
    username: 'janitorindoor',
    password: 'CHCS_AF_@003',
    role: 'Janitor Indoor',
    access: 'Janitor Module',
    modules: ['janitor', 'indoor']
  },
  {
    username: 'janitoroutdoor',
    password: 'CHCS_AF_@004',
    role: 'Janitor Outdoor',
    access: 'Janitor Module',
    modules: ['janitor', 'outdoor']
  },
  {
    username: 'stok',
    password: 'SACS_AF@004',
    role: 'Stock Manager',
    access: 'Stock Module',
    modules: ['stok', 'warehouse']
  },
  {
    username: 'maintenance',
    password: 'M41n_4F@234',
    role: 'Maintenance',
    access: 'Maintenance Module',
    modules: ['maintenance', 'repair']
  },
  {    username: 'inventaris',
    password: '4dm1n_6969@01',
    role: 'Inventory Admin',
    access: 'Inventory Module',
    modules: ['inventaris', 'asset']
  },
  {
    username: 'gudang',
    password: '4dm1n_9696@02',
    role: 'Warehouse Admin',
    access: 'Warehouse Module',
    modules: ['gudang', 'stock']
  },
  {
    username: 'asset',
    password: '4553Tumum_AF@1112',
    role: 'Asset Manager',
    access: 'Asset Module',
    modules: ['asset', 'inventory']
  },
  {
    username: 'booking',
    password: 'user_@1234',
    role: 'Booking User',
    access: 'Booking Module',
    modules: ['booking', 'rooms']
  },
  {
    username: 'k3',
    password: 'user_@2345',
    role: 'K3 User',
    access: 'K3 Module',
    modules: ['k3', 'safety']
  }
];

// Ghost Stealth Mode - Dynamic Password
export const getGhostPassword = (): string => {
  const now = new Date();
  const prayerTimes = {
    subuh: '2',
    dhuhur: '4',
    ashar: '4',
    maghrib: '3',
    isya: '4'
  };
  
  // Get current prayer time (simplified)
  const hour = now.getHours();
  let rakaat = 4;  
  if (hour >= 4 && hour < 11) rakaat = 2; // Subuh
  else if (hour >= 11 && hour < 15) rakaat = 4; // Dhuhur
  else if (hour >= 15 && hour < 18) rakaat = 4; // Ashar
  else if (hour >= 18 && hour < 19) rakaat = 3; // Maghrib
  else rakaat = 4; // Isya
  
  return `dreamos2026+${rakaat}`;
};

export const GHOST_STEALTH = {
  username: 'ghoststealth',
  getPassword: getGhostPassword,
  role: 'Ghost Stealth',
  access: 'Hidden Mode',
  modules: ['all', 'hidden']
};

export const authenticateUser = (username: string, password: string): UserCredential | null => {
  // Check Ghost Stealth Mode first
  if (username === 'ghoststealth' || username === 'dreamos2026') {
    const ghostPass = getGhostPassword();
    if (password === ghostPass || password.includes('dreamos') && password.includes(String(getGhostPassword().split('+')[1]))) {
      return GHOST_STEALTH as UserCredential;
    }
  }
  
  // Check regular credentials
  const user = CREDENTIALS.find(
    u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );
  
  return user || null;
};

export default CREDENTIALS;
