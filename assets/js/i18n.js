// International (i18n) Translation System
const i18n = {
  currentLang: localStorage.getItem('app-lang') || 'en',

  translations: {
    en: {
      // Header & Navigation
      'nav.home': 'Home',
      'nav.dashboard': 'Dashboard',
      'nav.programs': 'Programs',
      'nav.workouts': 'Workouts',
      'nav.classes': 'Classes',
      'nav.coaches': 'Coaches',
      'nav.community': 'Community',
      'nav.blogs': 'Blogs',
      'nav.crowd': 'Crowd',
      'nav.inbody': 'InBody',
      'nav.machines': 'Machines',
      'nav.nutrition': 'Nutrition',
      'nav.smart-test': 'Smart Test',
      'nav.achievements': 'Achievements',
      'nav.store': 'Store',
      'nav.membership': 'Membership',
      'nav.notifications': 'Notifications',
      'nav.settings': 'Settings',
      'nav.support': 'Support',
      'nav.profile': 'Profile',

      // Common
      'header.search': 'Search workouts',
      'header.language': 'Language',
      'sidebar.membership': 'Active Membership',
      'sidebar.valid': 'Valid until',

      // Dashboard
      'dashboard.title': 'Dashboard',
      'dashboard.today': "Today's Activity",
      'dashboard.stats': 'Stats',

      // Workouts
      'workout.title': 'Workout Program',
      'workout.tracker': 'Workout Tracker',
      'workout.in-progress': 'In Progress',
      'workout.completed': 'Completed',
      'workout.remaining': 'Remaining',
      'workout.start-timer': 'Start Timer',
      'workout.end-workout': 'End Workout',
      'workout.exercises': 'Exercises',

      // Crowd
      'crowd.title': 'Live Crowd',
      'crowd.capacity': 'Capacity used',
      'crowd.peak-hours': 'Peak Hours',
      'crowd.available': 'Available machines',
      'crowd.heatmap': 'Floor Activity Heatmap',
      'crowd.contributions': 'Weekly Contributions',
      'crowd.total': 'Total workouts',
      'crowd.activity': 'Activity',
      'crowd.low': 'Low',
      'crowd.medium': 'Medium',
      'crowd.high': 'High',
      'crowd.peak': 'Peak',

      // Footer
      'footer.membership': 'Gold Elite',
    },
    ar: {
      // Header & Navigation
      'nav.home': 'الرئيسية',
      'nav.dashboard': 'لوحة التحكم',
      'nav.programs': 'البرامج',
      'nav.workouts': 'التمارين',
      'nav.classes': 'الحصص',
      'nav.coaches': 'المدربون',
      'nav.community': 'المجتمع',
      'nav.blogs': 'المدونات',
      'nav.crowd': 'الازدحام',
      'nav.inbody': 'إن بودي',
      'nav.machines': 'الأجهزة',
      'nav.nutrition': 'التغذية',
      'nav.smart-test': 'الاختبار الذكي',
      'nav.achievements': 'الإنجازات',
      'nav.store': 'المتجر',
      'nav.membership': 'العضوية',
      'nav.notifications': 'الإشعارات',
      'nav.settings': 'الإعدادات',
      'nav.support': 'الدعم',
      'nav.profile': 'الملف الشخصي',

      // Common
      'header.search': 'ابحث عن التمارين',
      'header.language': 'اللغة',
      'sidebar.membership': 'العضوية النشطة',
      'sidebar.valid': 'صالح حتى',

      // Dashboard
      'dashboard.title': 'لوحة التحكم',
      'dashboard.today': 'نشاط اليوم',
      'dashboard.stats': 'الإحصائيات',

      // Workouts
      'workout.title': 'برنامج التمرين',
      'workout.tracker': 'متتبع التمرين',
      'workout.in-progress': 'قيد التنفيذ',
      'workout.completed': 'مكتمل',
      'workout.remaining': 'المتبقي',
      'workout.start-timer': 'ابدأ المؤقت',
      'workout.end-workout': 'إنهاء التمرين',
      'workout.exercises': 'التمارين',

      // Crowd
      'crowd.title': 'الازدحام المباشر',
      'crowd.capacity': 'السعة المستخدمة',
      'crowd.peak-hours': 'ساعات الذروة',
      'crowd.available': 'الأجهزة المتاحة',
      'crowd.heatmap': 'خريطة نشاط الصالة',
      'crowd.contributions': 'المساهمات الأسبوعية',
      'crowd.total': 'إجمالي التمارين',
      'crowd.activity': 'النشاط',
      'crowd.low': 'منخفض',
      'crowd.medium': 'متوسط',
      'crowd.high': 'مرتفع',
      'crowd.peak': 'ذروة',

      // Footer
      'footer.membership': 'جولد إيليت',
    }
  },

  // Initialize translation system
  init() {
    this.apply();
    this.setupToggle();
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
  },

  // Get translated text
  t(key) {
    const lang = this.currentLang;
    return this.translations[lang]?.[key] || this.translations.en[key] || key;
  },

  // Apply translations to all elements with data-i18n attribute
  apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (el.tagName === 'INPUT' && el.type === 'text') {
        el.placeholder = this.t(key);
      } else {
        el.textContent = this.t(key);
      }
    });

    // Apply to title attribute
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.title = this.t(key);
    });
  },

  // Toggle language
  toggle() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('app-lang', this.currentLang);
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    this.apply();
    this.updateToggleButton();
  },

  // Setup language toggle button
  setupToggle() {
    const toggleBtn = document.getElementById('languageToggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => this.toggle());
    this.updateToggleButton();
  },

  // Update toggle button appearance
  updateToggleButton() {
    const toggleBtn = document.getElementById('languageToggle');
    if (!toggleBtn) return;

    const langText = toggleBtn.querySelector('[data-lang-text]');
    if (langText) {
      langText.textContent = this.currentLang === 'en' ? 'العربية' : 'English';
    }
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}
