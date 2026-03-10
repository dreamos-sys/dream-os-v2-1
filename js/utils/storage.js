/* ============================================
   🕌 DREAM OS 2026 - STORAGE UTILITY
   LocalStorage + IndexedDB Wrapper
   ============================================ */

class StorageUtility {
  constructor() {
    this.db = null;
    this.dbName = 'DreamOS';
    this.dbVersion = 1;
  }

  async init() {
    await this.initIndexedDB();
  }

  async initIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        if (!db.objectStoreNames.contains('modules')) {
          db.createObjectStore('modules', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' });
        }
      };
    });
  }

  // LocalStorage
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('⚠️ [STORAGE] LocalStorage failed:', error);
    }
  }
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('⚠️ [STORAGE] LocalStorage get failed:', error);
      return defaultValue;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('⚠️ [STORAGE] LocalStorage remove failed:', error);
    }
  }

  // IndexedDB
  async dbPut(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async dbGet(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async dbDelete(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);    });
  }

  async clear() {
    try {
      localStorage.clear();
      console.log('✅ [STORAGE] Cleared');
    } catch (error) {
      console.warn('⚠️ [STORAGE] Clear failed:', error);
    }
  }
}

DREAM.utils = DREAM.utils || {};
DREAM.utils.storage = new StorageUtility();
