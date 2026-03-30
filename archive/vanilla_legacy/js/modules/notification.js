// ==================== modules/notification.js ====================
/**
 * DREAM OS NANO - Smart Notification System
 * Push Notifications | In-App Alerts | Scheduling
 */

class DreamNotification {
  constructor() {
    this.notifications = JSON.parse(localStorage.getItem('dreamos_notifications') || '[]');
    this.permission = Notification.permission;
    this.checkInterval = null;
    this.upcomingCheckInterval = null;
    
    this.init();
  }
  
  async init() {
    console.log('🔔 Notification System Initializing...');
    
    // Request permission if not granted
    if (this.permission === 'default') {
      await this.requestPermission();
    }
    
    // Setup periodic checks
    this.setupPeriodicChecks();
    
    // Load existing notifications
    this.setupNotificationUI();
    
    console.log('✅ Notification System Ready');
  }
  
  async requestPermission() {
    try {
      this.permission = await Notification.requestPermission();
      
      if (this.permission === 'granted') {
        DreamAccessibility.announce(
          DreamI18n.translate('notification.permission.granted')
        );
        console.log('🔔 Notification permission granted');
      } else {
        DreamAccessibility.announce(
          DreamI18n.translate('notification.permission.denied')
        );
        console.log('🔔 Notification permission denied');
      }
    } catch (error) {
      console.error('Notification permission error:', error);
    }
  }
  
  setupPeriodicChecks() {
    // Check for upcoming bookings every 5 minutes
    this.upcomingCheckInterval = setInterval(() => {
      this.checkUpcomingBookings();
    }, 5 * 60 * 1000);
    
    // Check for K3 updates every 10 minutes
    setInterval(() => {
      this.checkK3Updates();
    }, 10 * 60 * 1000);
    
    // Initial checks
    setTimeout(() => {
      this.checkUpcomingBookings();
      this.checkK3Updates();
    }, 5000);
  }
  
  // ========== BOOKING NOTIFICATIONS ==========
  checkUpcomingBookings() {
    if (!DreamBooking || !DreamOS?.currentUser) return;
    
    const userBookings = DreamBooking.getUserBookings();
    const now = new Date();
    
    userBookings.forEach(booking => {
      const bookingDate = new Date(booking.date + 'T' + booking.time.split('-')[0]);
      const timeDiff = bookingDate - now;
      
      // Notify 1 hour before
      if (timeDiff > 0 && timeDiff <= 60 * 60 * 1000) {
        this.notifyUpcomingBooking(booking);
      }
      
      // Notify 24 hours before
      if (timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 1000 && timeDiff > 23 * 60 * 60 * 1000) {
        this.notifyTomorrowBooking(booking);
      }
    });
  }
  
  notifyUpcomingBooking(booking) {
    const title = DreamI18n.translate('notification.booking.upcoming.title');
    const body = DreamI18n.translate('notification.booking.upcoming.body')
      .replace('{facility}', booking.facility)
      .replace('{time}', booking.time);
    
    this.createNotification(title, body, 'booking', {
      bookingId: booking.id,
      type: 'upcoming',
      timestamp: new Date().toISOString()
    });
  }
  
  notifyTomorrowBooking(booking) {
    const title = DreamI18n.translate('notification.booking.tomorrow.title');
    const body = DreamI18n.translate('notification.booking.tomorrow.body')
      .replace('{facility}', booking.facility);
    
    this.createNotification(title, body, 'booking', {
      bookingId: booking.id,
      type: 'tomorrow',
      timestamp: new Date().toISOString()
    });
  }
  
  // ========== K3 NOTIFICATIONS ==========
  checkK3Updates() {
    if (!DreamK3 || !DreamOS?.currentUser) return;
    
    const userReports = DreamK3.getUserReports();
    const lastChecked = localStorage.getItem('dreamos_k3_last_checked') || new Date(0).toISOString();
    
    userReports.forEach(report => {
      // Check for status changes since last check
      if (new Date(report.createdAt) > new Date(lastChecked)) {
        this.notifyK3StatusChange(report);
      }
    });
    
    localStorage.setItem('dreamos_k3_last_checked', new Date().toISOString());
  }
  
  notifyK3StatusChange(report) {
    const title = DreamI18n.translate('notification.k3.status.title');
    const body = DreamI18n.translate('notification.k3.status.body')
      .replace('{reportId}', report.id)
      .replace('{status}', DreamK3.getReportStatusLabel(report.status));
    
    this.createNotification(title, body, 'k3', {
      reportId: report.id,
      status: report.status,
      timestamp: new Date().toISOString()
    });
  }
  
  // ========== CORE NOTIFICATION METHODS ==========
  async createNotification(title, body, type = 'info', data = {}) {
    const notificationId = 'NOTIF-' + Date.now();
    const notification = {
      id: notificationId,
      title,
      body,
      type,
      data,
      read: false,
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    };
    
    // Add to array
    this.notifications.unshift(notification);
    this.saveNotifications();
    
    // Show browser notification if permission granted
    if (this.permission === 'granted' && document.visibilityState === 'hidden') {
      await this.showBrowserNotification(title, body, notificationId);
    }
    
    // Show in-app notification
    this.showInAppNotification(notification);
    
    // Update notification badge
    this.updateNotificationBadge();
    
    return notification;
  }
  
  async showBrowserNotification(title, body, notificationId) {
    try {
      const icon = '/icon.png'; // Path to your app icon
      
      const notification = new Notification(title, {
        body,
        icon,
        tag: notificationId,
        requireInteraction: false,
        silent: DreamBattery?.isLowPower || false // Silent in low power mode
      });
      
      notification.onclick = () => {
        window.focus();
        this.markAsRead(notificationId);
        this.handleNotificationClick(notificationId);
      };
      
      // Auto close after 10 seconds (5 seconds in low power mode)
      const timeout = DreamBattery?.isLowPower ? 5000 : 10000;
      setTimeout(() => {
        notification.close();
      }, timeout);
      
    } catch (error) {
      console.error('Browser notification failed:', error);
    }
  }
  
  showInAppNotification(notification) {
    const container = document.getElementById('notification-center');
    if (!container) return;
    
    const notificationEl = document.createElement('div');
    notificationEl.className = `inapp-notification ${notification.type} ${notification.read ? 'read' : 'unread'}`;
    notificationEl.dataset.notificationId = notification.id;
    
    notificationEl.innerHTML = `
      <div class="notification-content">
        <div class="notification-header">
          <span class="notification-title">${notification.title}</span>
          <span class="notification-time">${this.formatTime(notification.timestamp)}</span>
        </div>
        <div class="notification-body">${notification.body}</div>
        ${notification.data.bookingId ? 
          `<button class="btn-view-booking" data-booking-id="${notification.data.bookingId}">
            Lihat Booking
          </button>` : ''}
        ${notification.data.reportId ? 
          `<button class="btn-view-report" data-report-id="${notification.data.reportId}">
            Lihat Laporan
          </button>` : ''}
      </div>
      <button class="btn-mark-read" onclick="DreamNotification.markAsRead('${notification.id}')">
        ✓
      </button>
    `;
    
    // Add click handler for action buttons
    notificationEl.querySelector('.btn-view-booking')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.handleViewBooking(notification.data.bookingId);
    });
    
    notificationEl.querySelector('.btn-view-report')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.handleViewReport(notification.data.reportId);
    });
    
    // Add click handler for notification
    notificationEl.addEventListener('click', () => {
      this.markAsRead(notification.id);
      this.handleNotificationClick(notification.id);
    });
    
    // Insert at top
    if (container.firstChild) {
      container.insertBefore(notificationEl, container.firstChild);
    } else {
      container.appendChild(notificationEl);
    }
    
    // Auto remove after 24 hours
    setTimeout(() => {
      if (notificationEl.parentNode) {
        notificationEl.remove();
      }
    }, 24 * 60 * 60 * 1000);
    
    // Announce for screen readers
    DreamAccessibility.announce(
      `Notifikasi baru: ${notification.title}. ${notification.body}`
    );
  }
  
  // ========== NOTIFICATION MANAGEMENT ==========
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      notification.read = true;
      this.saveNotifications();
      
      // Update UI
      const notificationEl = document.querySelector(`[data-notification-id="${notificationId}"]`);
      if (notificationEl) {
        notificationEl.classList.remove('unread');
        notificationEl.classList.add('read');
      }
      
      // Update badge
      this.updateNotificationBadge();
    }
  }
  
  markAllAsRead() {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
    
    this.saveNotifications();
    
    // Update UI
    document.querySelectorAll('.inapp-notification').forEach(el => {
      el.classList.remove('unread');
      el.classList.add('read');
    });
    
    // Update badge
    this.updateNotificationBadge();
    
    DreamAccessibility.announce(
      DreamI18n.translate('notification.all.marked.read')
    );
  }
  
  deleteNotification(notificationId) {
    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      this.notifications.splice(index, 1);
      this.saveNotifications();
      
      // Remove from UI
      const notificationEl = document.querySelector(`[data-notification-id="${notificationId}"]`);
      if (notificationEl) {
        notificationEl.remove();
      }
      
      // Update badge
      this.updateNotificationBadge();
    }
  }
  
  clearAllNotifications() {
    if (!confirm(DreamI18n.translate('notification.clear.confirm'))) return;
    
    this.notifications = [];
    this.saveNotifications();
    
    // Clear UI
    const container = document.getElementById('notification-center');
    if (container) {
      container.innerHTML = '';
    }
    
    // Update badge
    this.updateNotificationBadge();
    
    DreamAccessibility.announce(
      DreamI18n.translate('notification.all.cleared')
    );
  }
  
  // ========== UI METHODS ==========
  setupNotificationUI() {
    // Create notification center if not exists
    if (!document.getElementById('notification-center')) {
      const container = document.createElement('div');
      container.id = 'notification-center';
      container.className = 'notification-center';
      container.style.cssText = `
        position: fixed;
        top: 60px;
        right: 20px;
        width: 350px;
        max-height: 500px;
        overflow-y: auto;
        background: var(--card-bg);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        z-index: 9998;
        display: none;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      `;
      document.body.appendChild(container);
    }
    
    // Create notification bell
    this.createNotificationBell();
    
    // Render existing notifications
    this.renderNotificationList();
  }
  
  createNotificationBell() {
    const bellHtml = `
      <div id="notification-bell" class="notification-bell">
        <button class="btn-notification-bell" 
                onclick="DreamNotification.toggleNotificationCenter()"
                aria-label="${DreamI18n.translate('notification.bell.aria')}">
          🔔
          <span id="notification-badge" class="notification-badge">0</span>
        </button>
      </div>
    `;
    
    // Remove existing bell
    const existingBell = document.getElementById('notification-bell');
    if (existingBell) existingBell.remove();
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', bellHtml);
    
    // Update badge
    this.updateNotificationBadge();
  }
  
  toggleNotificationCenter() {
    const center = document.getElementById('notification-center');
    const bell = document.getElementById('notification-bell');
    
    if (center.style.display === 'block') {
      center.style.display = 'none';
      bell?.classList.remove('active');
    } else {
      center.style.display = 'block';
      bell?.classList.add('active');
      
      // Focus first notification
      setTimeout(() => {
        const firstNotification = center.querySelector('.inapp-notification');
        if (firstNotification) {
          firstNotification.focus();
        }
      }, 100);
    }
  }
  
  renderNotificationList() {
    const container = document.getElementById('notification-center');
    if (!container) return;
    
    // Clear existing
    container.innerHTML = '';
    
    // Add header
    const header = document.createElement('div');
    header.className = 'notification-header';
    header.innerHTML = `
      <h3 data-i18n="notification.center.title">Notifikasi</h3>
      <div class="notification-actions">
        <button onclick="DreamNotification.markAllAsRead()" 
                data-i18n="notification.mark.all.read">
          Tandai semua terbaca
        </button>
        <button onclick="DreamNotification.clearAllNotifications()" 
                class="btn-danger"
                data-i18n="notification.clear.all">
          Hapus semua
        </button>
      </div>
    `;
    container.appendChild(header);
    
    // Add notifications
    if (this.notifications.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'notification-empty';
      emptyState.innerHTML = `
        <p data-i18n="notification.empty">Tidak ada notifikasi</p>
      `;
      container.appendChild(emptyState);
    } else {
      this.notifications.forEach(notification => {
        this.showInAppNotification(notification);
      });
    }
    
    DreamI18n.translatePage();
  }
  
  updateNotificationBadge() {
    const unreadCount = this.notifications.filter(n => !n.read).length;
    const badge = document.getElementById('notification-badge');
    
    if (badge) {
      badge.textContent = unreadCount > 9 ? '9+' : unreadCount.toString();
      badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
  }
  
  // ========== NOTIFICATION HANDLERS ==========
  handleNotificationClick(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (!notification) return;
    
    switch (notification.type) {
      case 'booking':
        this.handleBookingNotification(notification);
        break;
      case 'k3':
        this.handleK3Notification(notification);
        break;
      default:
        // Generic notification, just mark as read
        this.markAsRead(notificationId);
    }
  }
  
  handleBookingNotification(notification) {
    const bookingId = notification.data.bookingId;
    if (bookingId && DreamBooking) {
      // Switch to booking tab and show details
      if (DreamOS?.switchTab) {
        DreamOS.switchTab('booking-tab');
      }
      
      // Show booking details
      setTimeout(() => {
        DreamBooking.showDetails(bookingId);
      }, 500);
    }
    
    this.markAsRead(notification.id);
  }
  
  handleK3Notification(notification) {
    const reportId = notification.data.reportId;
    if (reportId && DreamK3) {
      // Switch to K3 tab
      if (DreamOS?.switchTab) {
        DreamOS.switchTab('k3-tab');
      }
      
      // Show report details
      setTimeout(() => {
        DreamK3.showReportDetails(reportId);
      }, 500);
    }
    
    this.markAsRead(notification.id);
  }
  
  handleViewBooking(bookingId) {
    if (bookingId && DreamBooking) {
      DreamBooking.showDetails(bookingId);
      this.toggleNotificationCenter();
    }
  }
  
  handleViewReport(reportId) {
    if (reportId && DreamK3) {
      DreamK3.showReportDetails(reportId);
      this.toggleNotificationCenter();
    }
  }
  
  // ========== UTILITY METHODS ==========
  formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) {
      return DreamI18n.translate('time.just.now');
    } else if (diffMins < 60) {
      return DreamI18n.translate('time.minutes.ago').replace('{minutes}', diffMins);
    } else if (diffHours < 24) {
      return DreamI18n.translate('time.hours.ago').replace('{hours}', diffHours);
    } else if (diffDays < 7) {
      return DreamI18n.translate('time.days.ago').replace('{days}', diffDays);
    } else {
      return date.toLocaleDateString();
    }
  }
  
  saveNotifications() {
    // Clean up old notifications (older than 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    this.notifications = this.notifications.filter(n => 
      new Date(n.timestamp) > thirtyDaysAgo
    );
    
    localStorage.setItem('dreamos_notifications', JSON.stringify(this.notifications));
  }
  
  // ========== SPIRITUAL NOTIFICATIONS ==========
  setupSpiritualNotifications() {
    // Random dzikir reminders
    const dzikirInterval = Math.random() * (45 - 15) + 15; // 15-45 minutes
    setTimeout(() => {
      this.showDzikirReminder();
      this.setupSpiritualNotifications(); // Recursive for next reminder
    }, dzikirInterval * 60 * 1000);
  }
  
  showDzikirReminder() {
    if (!DreamOS?.currentUser || document.visibilityState !== 'visible') return;
    
    const dzikirs = [
      { arabic: 'سُبْحَانَ اللَّهِ', translation: 'Mahasuci Allah' },
      { arabic: 'الْحَمْدُ لِلَّهِ', translation: 'Segala puji bagi Allah' },
      { arabic: 'اللَّهُ أَكْبَرُ', translation: 'Allah Mahabesar' },
      { arabic: 'لَا إِلَهَ إِلَّا اللَّهُ', translation: 'Tidak ada Tuhan selain Allah' }
    ];
    
    const randomDzikir = dzikirs[Math.floor(Math.random() * dzikirs.length)];
    
    this.createNotification(
      '💚 Dzikir Reminder',
      `${randomDzikir.arabic}\n${randomDzikir.translation}`,
      'spiritual',
      { dzikir: randomDzikir }
    );
  }
}

window.DreamNotification = new DreamNotification();
