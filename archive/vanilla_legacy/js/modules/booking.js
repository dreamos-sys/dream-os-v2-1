// ==================== modules/booking.js ====================
/**
 * DREAM OS NANO - Booking System Module
 * Smart Calendar | Double Booking Prevention | Islamic Rules
 */

class DreamBooking {
  constructor() {
    this.bookings = JSON.parse(localStorage.getItem('dreamos_bookings') || '[]');
    this.facilities = [
      { id: 1, name: 'Aula SMP', includes: 'sound, lighting, ac, projector', status: 'available' },
      { id: 2, name: 'Aula SMA', includes: 'sound, projector', status: 'available' },
      { id: 3, name: 'Saung Besar', includes: 'sound', status: 'available' },
      { id: 4, name: 'Saung Kecil', includes: '-', status: 'available' },
      { id: 5, name: 'Masjid', includes: 'sound', status: 'maintenance', note: 'Maintenance/Renovasi' },
      { id: 6, name: 'Serbaguna', includes: 'sound', status: 'available' },
      { id: 7, name: 'Labkom SD', includes: '-', status: 'available' },
      { id: 8, name: 'Labkom SMP', includes: '-', status: 'available' },
      { id: 9, name: 'Labkom SMA', includes: '-', status: 'available' },
      { id: 10, name: 'Lapangan Volley', includes: '-', status: 'available' },
      { id: 11, name: 'Lapangan Basket', includes: '-', status: 'available' },
      { id: 12, name: 'Lapangan SMA', includes: '-', status: 'available' },
      { id: 13, name: 'Lapangan Tanah', includes: '-', status: 'available' },
      { id: 14, name: 'Kantin SMP', includes: '-', status: 'available' },
      { id: 15, name: 'Kantin SMA', includes: '-', status: 'available' },
      { id: 16, name: 'Perpus SD', includes: '-', status: 'available' },
      { id: 17, name: 'Perpus SMP', includes: '-', status: 'available' },
      { id: 18, name: 'Perpus SMA', includes: '-', status: 'available' }
    ];
    
    this.rules = {
      normalHours: { start: '07:30', end: '16:00' },
      fridayHours: { start: '10:30', end: '13:00' },
      fridayBlacklist: ['Aula SMP', 'Serbaguna'],
      maintenance: ['Masjid'],
      maxDaysAhead: 7,
      maxBookingPerUser: 3
    };
    
    this.init();
  }
  
  init() {
    console.log('📅 Booking System Initializing...');
    this.setupEventListeners();
    console.log('✅ Booking System Ready');
  }
  
  setupEventListeners() {
    // Listen for language changes to update UI
    document.addEventListener('languageChanged', () => {
      this.renderFacilityList();
      this.renderUserBookings();
    });
  }
  
  // ========== SMART AVAILABILITY CHECK ==========
  checkAvailability(facilityName, date, timeSlot) {
    const facility = this.facilities.find(f => f.name === facilityName);
    
    // 1. Check maintenance
    if (facility.status === 'maintenance') {
      return {
        available: false,
        reason: DreamI18n.translate('booking.maintenance')
      };
    }
    
    // 2. Check Friday rules
    const bookingDate = new Date(date);
    const dayOfWeek = bookingDate.getDay(); // 0=Sunday, 5=Friday
    
    if (dayOfWeek === 5) { // Friday
      if (this.rules.fridayBlacklist.includes(facilityName)) {
        return {
          available: false,
          reason: DreamI18n.translate('booking.friday.blacklist')
        };
      }
    }
    
    // 3. Check double booking
    const isDoubleBooked = this.bookings.some(booking => {
      return booking.facility === facilityName &&
             booking.date === date &&
             this.isTimeOverlap(booking.time, timeSlot);
    });
    
    if (isDoubleBooked) {
      return {
        available: false,
        reason: DreamI18n.translate('booking.double.booked')
      };
    }
    
    // 4. Check user booking limit
    const userBookings = this.bookings.filter(b => 
      b.user === DreamOS?.currentUser?.name
    );
    
    if (userBookings.length >= this.rules.maxBookingPerUser) {
      return {
        available: false,
        reason: DreamI18n.translate('booking.limit.reached')
      };
    }
    
    // 5. Check date range (max 7 days ahead)
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + this.rules.maxDaysAhead);
    
    if (bookingDate > maxDate) {
      return {
        available: false,
        reason: DreamI18n.translate('booking.too.far.ahead')
      };
    }
    
    // All checks passed
    return {
      available: true,
      facility: facility,
      timeSlot: this.getTimeSlotForDay(dayOfWeek, timeSlot)
    };
  }
  
  isTimeOverlap(time1, time2) {
    const [start1, end1] = time1.split('-').map(t => this.timeToMinutes(t.trim()));
    const [start2, end2] = time2.split('-').map(t => this.timeToMinutes(t.trim()));
    
    return !(end1 <= start2 || end2 <= start1);
  }
  
  timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  getTimeSlotForDay(dayOfWeek, requestedTime) {
    let defaultTime = `${this.rules.normalHours.start}-${this.rules.normalHours.end}`;
    
    if (dayOfWeek === 5) { // Friday
      defaultTime = `${this.rules.fridayHours.start}-${this.rules.fridayHours.end}`;
    }
    
    return requestedTime || defaultTime;
  }
  
  // ========== BOOKING CREATION ==========
  createBooking(facilityName, date, time, purpose) {
    const availability = this.checkAvailability(facilityName, date, time);
    
    if (!availability.available) {
      DreamAccessibility.announce(availability.reason);
      return { success: false, message: availability.reason };
    }
    
    const booking = {
      id: 'BK-' + Date.now().toString().slice(-6),
      facility: facilityName,
      date: date,
      time: availability.timeSlot,
      purpose: purpose || '',
      user: DreamOS.currentUser?.name || 'Unknown',
      status: 'pending',
      createdAt: new Date().toISOString(),
      includes: availability.facility?.includes || '-'
    };
    
    this.bookings.push(booking);
    this.saveBookings();
    
    // Send WhatsApp notification
    this.sendWhatsAppNotification(booking);
    
    DreamAccessibility.announce(
      DreamI18n.translate('booking.created.success')
    );
    
    return {
      success: true,
      booking: booking,
      message: DreamI18n.translate('booking.created.success')
    };
  }
  
  sendWhatsAppNotification(booking) {
    const message = `📅 BOOKING BARU - DREAM OS\n\n` +
      `🏢 Sarana: ${booking.facility}\n` +
      `📅 Tanggal: ${booking.date}\n` +
      `⏰ Waktu: ${booking.time}\n` +
      `📝 Keperluan: ${booking.purpose}\n` +
      `👤 Pemesan: ${booking.user}\n` +
      `🆔 ID: ${booking.id}\n` +
      `📋 Fasilitas Include: ${booking.includes}\n\n` +
      `_*Auto-generated from Dream OS*_`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/628886183954?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
    
    console.log('📱 WhatsApp notification sent');
  }
  
  // ========== USER BOOKING MANAGEMENT ==========
  getUserBookings() {
    if (!DreamOS?.currentUser) return [];
    
    return this.bookings.filter(booking => 
      booking.user === DreamOS.currentUser.name
    );
  }
  
  cancelBooking(bookingId) {
    const index = this.bookings.findIndex(b => b.id === bookingId);
    
    if (index === -1) {
      return { success: false, message: 'Booking tidak ditemukan' };
    }
    
    // Check if booking belongs to current user
    if (this.bookings[index].user !== DreamOS.currentUser?.name) {
      return { success: false, message: 'Anda tidak memiliki akses' };
    }
    
    // Remove booking
    const cancelled = this.bookings.splice(index, 1)[0];
    this.saveBookings();
    
    // Send cancellation notification
    this.sendCancellationNotification(cancelled);
    
    return {
      success: true,
      message: 'Booking berhasil dibatalkan',
      booking: cancelled
    };
  }
  
  sendCancellationNotification(booking) {
    const message = `❌ BOOKING DIBATALKAN - DREAM OS\n\n` +
      `🏢 Sarana: ${booking.facility}\n` +
      `📅 Tanggal: ${booking.date}\n` +
      `👤 Pembatal: ${DreamOS.currentUser?.name}\n` +
      `🆔 ID: ${booking.id}\n\n` +
      `_*Auto-generated from Dream OS*_`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/628886183954?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }
  
  // ========== SMART CALENDAR ==========
  generateCalendar(year, month) {
    const now = new Date();
    const currentYear = year || now.getFullYear();
    const currentMonth = month || now.getMonth();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const calendar = {
      year: currentYear,
      month: currentMonth,
      monthName: this.getMonthName(currentMonth),
      days: []
    };
    
    // Generate days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayBookings = this.bookings.filter(b => b.date === dateStr);
      
      calendar.days.push({
        date: dateStr,
        day: day,
        dayOfWeek: date.getDay(),
        isToday: this.isSameDate(date, now),
        isPast: date < now,
        bookings: dayBookings
      });
    }
    
    return calendar;
  }
  
  getMonthName(monthIndex) {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return months[monthIndex];
  }
  
  isSameDate(date1, date2) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
  
  // ========== UI RENDER METHODS ==========
  renderFacilityList() {
    const container = document.getElementById('facility-list');
    if (!container) return;
    
    const availableFacilities = this.facilities.filter(f => f.status === 'available');
    
    const html = availableFacilities.map(facility => `
      <div class="facility-card" data-facility="${facility.name}">
        <div class="facility-header">
          <h3>${facility.name}</h3>
          <span class="status-badge available">
            ${DreamI18n.translate('booking.available')}
          </span>
        </div>
        <div class="facility-details">
          <p><small>${DreamI18n.translate('booking.includes')}: ${facility.includes}</small></p>
        </div>
        <button class="btn-select-facility" 
                onclick="DreamBooking.selectFacility('${facility.name}')"
                data-i18n="booking.select">
          Pilih
        </button>
      </div>
    `).join('');
    
    container.innerHTML = html;
    
    // Translate all i18n elements
    DreamI18n.translatePage();
  }
  
  renderUserBookings() {
    const container = document.getElementById('user-bookings');
    if (!container) return;
    
    const userBookings = this.getUserBookings();
    
    if (userBookings.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p data-i18n="booking.no.bookings">Belum ada booking</p>
        </div>
      `;
      return;
    }
    
    const html = userBookings.map(booking => `
      <div class="booking-card" data-booking-id="${booking.id}">
        <div class="booking-header">
          <h4>${booking.facility}</h4>
          <span class="status-badge ${booking.status}">
            ${booking.status === 'pending' ? 
              DreamI18n.translate('booking.status.pending') : 
              DreamI18n.translate('booking.status.approved')}
          </span>
        </div>
        <div class="booking-details">
          <p><strong data-i18n="booking.date">Tanggal:</strong> ${booking.date}</p>
          <p><strong data-i18n="booking.time">Waktu:</strong> ${booking.time}</p>
          ${booking.purpose ? `<p><strong data-i18n="booking.purpose">Keperluan:</strong> ${booking.purpose}</p>` : ''}
          <p><small><strong data-i18n="booking.includes">Include:</strong> ${booking.includes}</small></p>
        </div>
        <div class="booking-actions">
          ${booking.status === 'pending' ? `
            <button class="btn-cancel" 
                    onclick="DreamBooking.showCancelDialog('${booking.id}')"
                    data-i18n="booking.cancel">
              Batalkan
            </button>
          ` : ''}
          <button class="btn-details" 
                  onclick="DreamBooking.showDetails('${booking.id}')"
                  data-i18n="booking.details">
            Detail
          </button>
        </div>
      </div>
    `).join('');
    
    container.innerHTML = html;
    DreamI18n.translatePage();
  }
  
  // ========== UI INTERACTION METHODS ==========
  selectFacility(facilityName) {
    // Store selected facility for booking form
    sessionStorage.setItem('selectedFacility', facilityName);
    
    // Show booking form
    this.showBookingForm(facilityName);
  }
  
  showBookingForm(facilityName = null) {
    const facility = facilityName || sessionStorage.getItem('selectedFacility');
    
    const formHtml = `
      <div class="booking-form-modal" id="booking-form-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2 data-i18n="booking.new">Booking Baru</h2>
            <button class="btn-close" onclick="this.closest('.booking-form-modal').remove()">
              ×
            </button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label data-i18n="booking.facility">Sarana</label>
              <input type="text" value="${facility || ''}" 
                     id="booking-facility" 
                     readonly
                     class="form-input">
            </div>
            
            <div class="form-group">
              <label data-i18n="booking.date">Tanggal</label>
              <input type="date" 
                     id="booking-date"
                     class="form-input"
                     min="${this.getMinDate()}"
                     max="${this.getMaxDate()}">
            </div>
            
            <div class="form-group">
              <label data-i18n="booking.time">Waktu (opsional)</label>
              <input type="text" 
                     id="booking-time"
                     class="form-input"
                     placeholder="Contoh: 07:30-16:00"
                     data-i18n-placeholder="booking.time.placeholder">
              <small data-i18n="booking.time.note">
                Kosongkan untuk waktu default sesuai hari
              </small>
            </div>
            
            <div class="form-group">
              <label data-i18n="booking.purpose">Keperluan</label>
              <textarea id="booking-purpose" 
                        class="form-textarea"
                        rows="3"
                        placeholder="Jelaskan keperluan booking..."
                        data-i18n-placeholder="booking.purpose.placeholder"></textarea>
            </div>
            
            <div id="availability-check-result"></div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-secondary" 
                    onclick="document.getElementById('booking-form-modal').remove()"
                    data-i18n="common.cancel">
              Batal
            </button>
            <button class="btn-primary" 
                    onclick="DreamBooking.submitBookingForm()"
                    id="btn-submit-booking"
                    data-i18n="booking.submit">
              Ajukan Booking
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Remove existing modal
    const existingModal = document.getElementById('booking-form-modal');
    if (existingModal) existingModal.remove();
    
    // Add new modal
    document.body.insertAdjacentHTML('beforeend', formHtml);
    
    // Add change listeners
    document.getElementById('booking-date').addEventListener('change', () => {
      this.checkAvailabilityInForm();
    });
    
    document.getElementById('booking-time').addEventListener('input', () => {
      this.checkAvailabilityInForm();
    });
    
    // Initial check
    this.checkAvailabilityInForm();
    
    DreamI18n.translatePage();
    DreamAccessibility.focusFirstElement(document.getElementById('booking-form-modal'));
  }
  
  checkAvailabilityInForm() {
    const facility = document.getElementById('booking-facility')?.value;
    const date = document.getElementById('booking-date')?.value;
    const time = document.getElementById('booking-time')?.value;
    
    if (!facility || !date) return;
    
    const result = this.checkAvailability(facility, date, time);
    const resultDiv = document.getElementById('availability-check-result');
    const submitBtn = document.getElementById('btn-submit-booking');
    
    if (result.available) {
      resultDiv.innerHTML = `
        <div class="alert alert-success">
          ✅ <span data-i18n="booking.available">Tersedia</span>
        </div>
      `;
      submitBtn.disabled = false;
    } else {
      resultDiv.innerHTML = `
        <div class="alert alert-error">
          ❌ ${result.reason}
        </div>
      `;
      submitBtn.disabled = true;
    }
    
    DreamI18n.translatePage();
  }
  
  submitBookingForm() {
    const facility = document.getElementById('booking-facility')?.value;
    const date = document.getElementById('booking-date')?.value;
    const time = document.getElementById('booking-time')?.value;
    const purpose = document.getElementById('booking-purpose')?.value;
    
    if (!facility || !date) {
      DreamAccessibility.announce(
        DreamI18n.translate('booking.form.incomplete')
      );
      return;
    }
    
    const result = this.createBooking(facility, date, time, purpose);
    
    if (result.success) {
      // Close modal
      const modal = document.getElementById('booking-form-modal');
      if (modal) modal.remove();
      
      // Refresh bookings list
      this.renderUserBookings();
      
      // Show success message
      DreamAccessibility.announce(result.message);
      
      // Trigger notification check
      if (DreamNotification) {
        DreamNotification.checkUpcomingBookings();
      }
    } else {
      DreamAccessibility.announce(result.message);
    }
  }
  
  showCancelDialog(bookingId) {
    if (!confirm(DreamI18n.translate('booking.cancel.confirm'))) return;
    
    const result = this.cancelBooking(bookingId);
    
    if (result.success) {
      this.renderUserBookings();
      DreamAccessibility.announce(result.message);
    } else {
      DreamAccessibility.announce(result.message);
    }
  }
  
  showDetails(bookingId) {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) return;
    
    const detailsHtml = `
      <div class="details-modal">
        <div class="modal-content">
          <h2 data-i18n="booking.details">Detail Booking</h2>
          <div class="details-content">
            <p><strong data-i18n="booking.facility">Sarana:</strong> ${booking.facility}</p>
            <p><strong data-i18n="booking.date">Tanggal:</strong> ${booking.date}</p>
            <p><strong data-i18n="booking.time">Waktu:</strong> ${booking.time}</p>
            <p><strong data-i18n="booking.status">Status:</strong> ${booking.status}</p>
            <p><strong data-i18n="booking.includes">Include:</strong> ${booking.includes}</p>
            ${booking.purpose ? `<p><strong data-i18n="booking.purpose">Keperluan:</strong> ${booking.purpose}</p>` : ''}
            <p><small><strong data-i18n="booking.created">Dibuat:</strong> ${new Date(booking.createdAt).toLocaleString()}</small></p>
          </div>
          <button onclick="this.closest('.details-modal').remove()"
                  data-i18n="common.close">
            Tutup
          </button>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', detailsHtml);
    DreamI18n.translatePage();
  }
  
  // ========== UTILITY METHODS ==========
  getMinDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  
  getMaxDate() {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + this.rules.maxDaysAhead);
    return maxDate.toISOString().split('T')[0];
  }
  
  saveBookings() {
    localStorage.setItem('dreamos_bookings', JSON.stringify(this.bookings));
  }
}

window.DreamBooking = new DreamBooking();
