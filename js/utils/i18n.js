/**
 * DREAM OS v13.0 - Internationalization System
 * Master-controlled, device fallback, RTL ready
 */

// ============================================================================
// LANGUAGE MAP (id, en, ar)
// ============================================================================
const DREAM_LANG_MAP = {
    id: {
        // Common & Nav
        nav_home: "Beranda",
        nav_hub: "Dream Hub",
        nav_ai: "AI Center",
        nav_security: "Sekuriti",
        nav_scanner: "Scanner",
        nav_profile: "Profil",

        // Dream Hub Module
        hub_title: "LEGALITAS SISTEM",
        hub_subtitle: "Kepatuhan Standar Internasional",
        hub_auth_approver: "Pemberi Persetujuan",
        hub_auth_coord: "Koordinator Lapangan",
        hub_integrity_btn: "VERIFIKASI INTEGRITAS",

        // Security Module
        sec_title: "PANEL KEAMANAN",
        sec_shift_pagi: "Shift Pagi (Terjadwal)",
        sec_shift_malam: "Shift Malam (Siaga)",
        sec_report_btn: "Buat Laporan K3",
        sec_safe_core: "Radius Safe Core 5KM: AKTIF",

        // Settings & Profile
        set_title: "KONTROL SISTEM",
        set_haptic: "Getaran Haptic",
        set_dark_mode: "Mode Gelap",
        set_lang: "Bahasa Sistem",
        set_battery: "Optimasi Baterai",
        set_logout: "Keluar Sistem",

        // Toast & Alerts
        msg_welcome: "Selamat Datang, Master M",
        msg_access_denied: "Akses Ditolak: Butuh Sidik Jari Master",
        msg_save_success: "Data Berhasil Disinkronkan ke Supabase"
    },
    en: {
        nav_home: "Home",
        nav_hub: "Dream Hub",
        nav_ai: "AI Center",
        nav_security: "Security",
        nav_scanner: "Scanner",
        nav_profile: "Profile",

        hub_title: "SYSTEM LEGALITY",
        hub_subtitle: "International Standard Compliance",
        hub_auth_approver: "Approver Authority",
        hub_auth_coord: "Field Coordinator",
        hub_integrity_btn: "VERIFY INTEGRITY",

        sec_title: "SECURITY PANEL",
        sec_shift_pagi: "Morning Shift (Scheduled)",
        sec_shift_malam: "Night Shift (Standby)",
        sec_report_btn: "Create K3 Report",
        sec_safe_core: "Safe Core 5KM Radius: ACTIVE",

        set_title: "SYSTEM CONTROL",
        set_haptic: "Haptic Feedback",
        set_dark_mode: "Dark Mode",
        set_lang: "System Language",
        set_battery: "Battery Optimization",
        set_logout: "Logout System",

        msg_welcome: "Welcome, Master M",
        msg_access_denied: "Access Denied: Master Fingerprint Required",
        msg_save_success: "Data Synchronized to Supabase Successfully"
    },
    ar: {
        nav_home: "الرئيسية",
        nav_hub: "مركز دريم",
        nav_ai: "مركز الذكاء",
        nav_security: "الأمن",
        nav_scanner: "الماسح",
        nav_profile: "الملف الشخصي",

        hub_title: "قانونية النظام",
        hub_subtitle: "امتثال المعايير الدولية",
        hub_auth_approver: "سلطة الموافقة",
        hub_auth_coord: "منسق ميداني",
        hub_integrity_btn: "تحقق من النزاهة",

        sec_title: "لوحة الأمن",
        sec_shift_pagi: "وردية الصباح",
        sec_shift_malam: "وردية المساء",
        sec_report_btn: "إنشاء تقرير K3",
        sec_safe_core: "نطاق النواة الآمنة 5 كم: نشط",

        set_title: "تحكم النظام",
        set_haptic: "ردود الفعل اللمسية",
        set_dark_mode: "الوضع الداكن",
        set_lang: "لغة النظام",
        set_battery: "تحسين البطارية",
        set_logout: "تسجيل الخروج",

        msg_welcome: "مرحباً بك يا سيد م",
        msg_access_denied: "تم رفض الوصول: بصمة السيد مطلوبة",
        msg_save_success: "تم مزامنة البيانات بنجاح"
    }
};

// ============================================================================
// INIT LANGUAGE (AUTO-DETECT WITH MANUAL OVERRIDE)
// ============================================================================
(function initLanguage() {
    // 1. Check saved manual choice
    let savedLang = localStorage.getItem('dream_lang');

    if (!savedLang) {
        // 2. Fallback to device language
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.includes('id')) {
            savedLang = 'id';
        } else if (browserLang.includes('ar')) {
            savedLang = 'ar';
        } else {
            savedLang = 'en';
        }
        localStorage.setItem('dream_lang', savedLang);
    }

    // 3. Set global variables
    window.current_lang = savedLang;
    window.t = (key) => DREAM_LANG_MAP[window.current_lang][key] || key;

    // 4. Set direction and lang attribute
    document.documentElement.dir = (savedLang === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLang;

    console.log(`🌐 [I18N] Language set to: ${savedLang}`);
})();

// ============================================================================
// MANUAL LANGUAGE SWITCH (CALL FROM SETTINGS)
// ============================================================================
window.setDreamLanguage = (newLang) => {
    // Simple validation
    if (!['id', 'en', 'ar'].includes(newLang)) return;

    // Save to localStorage
    localStorage.setItem('dream_lang', newLang);
    window.current_lang = newLang;

    // Update direction
    document.documentElement.dir = (newLang === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;

    // Notify user (use DREAM.showToast if available)
    if (window.DREAM && window.DREAM.showToast) {
        window.DREAM.showToast(`🌐 Language set to ${newLang.toUpperCase()}`, 'success');
    } else {
        alert(`Language changed to ${newLang}. Reloading...`);
    }

    // Optional: auto-save unsaved data before reload? 
    // For now, we reload to apply changes everywhere.
    setTimeout(() => {
        location.reload();
    }, 800);
};
