/**
 * 📊 DREAM OS V14.0 - Global Data Store
 * Shared state for all modules integration
 */

export interface BookingData {
  id: number;
  title: string;
  date: string;  time: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  user: string;
}

export interface K3Report {
  id: number;
  type: string;
  location: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'resolved';
  timestamp: string;
  assignedTo?: string;
}

export interface MaintenanceTask {
  id: number;
  type: string;
  location: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  assignedTo: string;
  dueDate: string;
}

export interface SecurityAlert {
  id: number;
  type: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'resolved';
  timestamp: string;
}

export interface JanitorTask {
  id: number;
  type: 'indoor' | 'outdoor';
  area: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  notes?: string;
}

export interface WeatherAlert {
  condition: 'clear' | 'rain' | 'storm' | 'extreme';
  temperature: number;
  warning?: string;
  mitigations: string[];}

export interface Announcement {
  id: number;
  type: 'command' | 'general' | 'greeting';
  title: string;
  content: string;
  timestamp: string;
  priority: 'normal' | 'high' | 'urgent';
}

// Global Store Class
class GlobalStore {
  private static instance: GlobalStore;
  private storage: Map<string, any>;

  private constructor() {
    this.storage = new Map();
    this.initializeDefaults();
  }

  static getInstance(): GlobalStore {
    if (!GlobalStore.instance) {
      GlobalStore.instance = new GlobalStore();
    }
    return GlobalStore.instance;
  }

  private initializeDefaults() {
    // Initialize with default data
    this.set('bookings', []);
    this.set('k3Reports', []);
    this.set('maintenanceTasks', []);
    this.set('securityAlerts', []);
    this.set('janitorTasks', []);
    this.set('weatherAlert', { condition: 'clear', temperature: 28, mitigations: [] });
    this.set('announcements', []);
  }

  set(key: string, value: any): void {
    this.storage.set(key, value);
    // Also save to localStorage for persistence
    localStorage.setItem(`dream_${key}`, JSON.stringify(value));
  }

  get(key: string): any {
    // Try localStorage first
    const stored = localStorage.getItem(`dream_${key}`);
    if (stored) {
      return JSON.parse(stored);    }
    return this.storage.get(key);
  }

  add(key: string, item: any): void {
    const data = this.get(key) || [];
    data.push(item);
    this.set(key, data);
  }

  update(key: string, id: number, updates: any): void {
    const data = this.get(key) || [];
    const index = data.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      this.set(key, data);
    }
  }

  // Get greeting based on time
  getGreeting(): { text: string; icon: string; subtext: string } {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) {
      return { text: 'Selamat Pagi', icon: '🌅', subtext: 'Semangat memulai hari!' };
    } else if (hour >= 11 && hour < 15) {
      return { text: 'Selamat Siang', icon: '☀️', subtext: 'Tetap produktif!' };
    } else if (hour >= 15 && hour < 18) {
      return { text: 'Selamat Sore', icon: '🌤️', subtext: 'Selesaikan tugas hari ini!' };
    } else {
      return { text: 'Selamat Malam', icon: '🌙', subtext: 'Istirahat yang cukup!' };
    }
  }

  // Get K3 progress from all departments
  getK3Progress(): { total: number; pending: number; inProgress: number; resolved: number; actions: any[] } {
    const reports = this.get('k3Reports') || [];
    const maintenance = this.get('maintenanceTasks') || [];
    const security = this.get('securityAlerts') || [];
    const janitor = this.get('janitorTasks') || [];

    const actions = [
      ...maintenance.map((m: any) => ({ type: 'maintenance', ...m })),
      ...security.map((s: any) => ({ type: 'security', ...s })),
      ...janitor.map((j: any) => ({ type: 'janitor', ...j })),
    ];

    return {
      total: reports.length,
      pending: reports.filter((r: any) => r.status === 'pending').length,
      inProgress: actions.filter((a: any) => a.status === 'in-progress').length,      resolved: reports.filter((r: any) => r.status === 'resolved').length,
      actions,
    };
  }

  // Get smart weather mitigations
  getWeatherMitigations(): WeatherAlert {
    const conditions = ['clear', 'rain', 'storm', 'extreme'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    const mitigations: Record<string, string[]> = {
      clear: ['Aktivitas normal', 'Tidak ada peringatan khusus'],
      rain: [
        '🧹 Janitor Indoor: Persiapkan peralatan kebersihan (lantai licin)',
        '🔧 Maintenance: Cek atap dan saluran air (antisipasi bocor)',
        '🛡️ Security: Pantau lokasi rawan banjir',
        '📅 Booking: Pertimbangkan pindah lapangan ke indoor',
      ],
      storm: [
        '🚨 SEMUA DEPARTEMEN: Siaga tinggi!',
        '🧹 Janitor: Amankan peralatan outdoor',
        '🔧 Maintenance: Cek semua titik rawan',
        '🛡️ Security: Evakuasi area berbahaya',
        '📅 Booking: Batalkan aktivitas outdoor',
      ],
      extreme: ['🚨 BENCANA! Ikuti protokol darurat', '📞 Hubungi command center'],
    };

    return {
      condition: randomCondition,
      temperature: Math.floor(Math.random() * 15) + 25,
      warning: randomCondition !== 'clear' ? 'Peringatan Cuaca' : undefined,
      mitigations: mitigations[randomCondition],
    };
  }
}

export const store = GlobalStore.getInstance();
export default store;
