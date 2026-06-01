// Shared shell interactions for static pages.
const Components = (function () {
  const STORAGE_KEY = 'goldtech.sidebarCollapsed';
  const THEME_KEY = 'goldtech.theme';
  const COMPONENTS_SCRIPT_URL = document.currentScript?.src || new URL('assets/js/components.js', window.location.href).href;
  const APP_ROOT_URL = new URL('../../', COMPONENTS_SCRIPT_URL);
  const resolveAppUrl = (path) => new URL(path, APP_ROOT_URL).href;
  const MANIFEST_URL = resolveAppUrl('manifest.json');
  const APP_ICON_URL = resolveAppUrl('assets/logo-app.png');
  const SERVICE_WORKER_URL = resolveAppUrl('sw.js');
  const PWA_THEME_COLORS = {
    dark: '#070708',
    light: '#f7f8fb',
  };
  let deferredInstallPrompt = null;
  const currentPage = () => window.location.pathname.split('/').pop() || 'index.html';
  const resolveActive = (href, page) => {
    const aliases = {
      'exercise.html': 'workout.html',
      'coach.html': 'coaches.html',
      'product.html': 'store.html',
      'blog-details.html': 'blogs.html',
    };
    return href === (aliases[page] || page) || (page === 'index.html' && href === 'landing.html');
  };

  const getPreferredTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const isStandaloneMode = () => window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;

  const isMobileViewport = () => window.matchMedia?.('(max-width: 768px)').matches || window.matchMedia?.('(pointer: coarse)').matches;

  const ensureMeta = (name, content) => {
    let meta = document.head.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
    return meta;
  };

  const ensureLink = (rel, href, extraAttributes = {}) => {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
    Object.entries(extraAttributes).forEach(([key, value]) => link.setAttribute(key, value));
    return link;
  };

  const injectPremiumFonts = () => {
    if (!document.head) return;
    if (!document.head.querySelector('link[data-goldtech-fonts="premium-preconnect-google"]')) {
      const preconnectGoogle = document.createElement('link');
      preconnectGoogle.rel = 'preconnect';
      preconnectGoogle.href = 'https://fonts.googleapis.com';
      preconnectGoogle.setAttribute('data-goldtech-fonts', 'premium-preconnect-google');
      document.head.appendChild(preconnectGoogle);
    }
    if (!document.head.querySelector('link[data-goldtech-fonts="premium-preconnect-gstatic"]')) {
      const preconnectGstatic = document.createElement('link');
      preconnectGstatic.rel = 'preconnect';
      preconnectGstatic.href = 'https://fonts.gstatic.com';
      preconnectGstatic.crossOrigin = 'anonymous';
      preconnectGstatic.setAttribute('data-goldtech-fonts', 'premium-preconnect-gstatic');
      document.head.appendChild(preconnectGstatic);
    }
    if (!document.head.querySelector('link[data-goldtech-fonts="premium-stylesheet"]')) {
      const fontSheet = document.createElement('link');
      fontSheet.rel = 'stylesheet';
      fontSheet.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Sora:wght@500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap';
      fontSheet.setAttribute('data-goldtech-fonts', 'premium-stylesheet');
      document.head.appendChild(fontSheet);
    }
  };

  const syncThemeColor = (theme) => {
    const resolved = theme === 'light' ? 'light' : 'dark';
    ensureMeta('theme-color', PWA_THEME_COLORS[resolved]);
    document.documentElement.style.colorScheme = resolved;
  };

  const injectPwaAssets = () => {
    ensureLink('manifest', MANIFEST_URL, { type: 'application/manifest+json' });
    ensureLink('icon', APP_ICON_URL, { type: 'image/png' });
    ensureLink('apple-touch-icon', APP_ICON_URL);
    ensureMeta('application-name', 'GoldTech');
    ensureMeta('apple-mobile-web-app-title', 'GoldTech');
    ensureMeta('apple-mobile-web-app-capable', 'yes');
    ensureMeta('mobile-web-app-capable', 'yes');
    ensureMeta('apple-mobile-web-app-status-bar-style', 'black-translucent');
    syncThemeColor(getPreferredTheme());
  };

  const registerServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) return;

    try {
      await navigator.serviceWorker.register(SERVICE_WORKER_URL, { scope: APP_ROOT_URL.pathname, updateViaCache: 'none' });
    } catch {
      // Silent fallback for unsupported hosts or file:// previews.
    }
  };

  const initSplashScreen = () => {
    if (!document.body || document.getElementById('appSplashScreen')) return;
    if (!isStandaloneMode() || !isMobileViewport()) return;

    const splashSeenKey = 'goldtech.splashSeen';
    const page = currentPage();
    const isFirstAppPage = page === 'index.html' || page === 'landing.html';

    if (!isFirstAppPage || sessionStorage.getItem(splashSeenKey) === '1') return;
    sessionStorage.setItem(splashSeenKey, '1');

    const splash = document.createElement('div');
    splash.id = 'appSplashScreen';
    splash.className = 'app-splash';
    splash.innerHTML = `
      <div class="app-splash__card">
        <div class="app-splash__logo-wrap" aria-hidden="true">
          <img src="${APP_ICON_URL}" alt="" />
        </div>
        <div class="app-splash__title">GoldTech</div>
        <div class="app-splash__subtitle">SMART FITNESS OS</div>
      </div>`;

    document.body.appendChild(splash);
    document.body.classList.add('page-ready');

    window.setTimeout(() => {
      splash.classList.add('is-hidden');
      window.setTimeout(() => splash.remove(), 460);
    }, 2400);
  };

  const initInstallPrompt = () => {
    if (!document.body || document.getElementById('pwaInstallButton')) return;

    const installButton = document.createElement('button');
    installButton.id = 'pwaInstallButton';
    installButton.type = 'button';
    installButton.className = 'pwa-install-button hidden';
    installButton.setAttribute('aria-label', 'Install GoldTech app');
    installButton.innerHTML = '<span class="pwa-install-button__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v10m0 0 3.5-3.5M12 13l-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 14.5v2.8c0 1.2.9 2.2 2 2.2h10c1.1 0 2-.9 2-2.2v-2.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span><span class="pwa-install-button__text">Install app</span>';

    const updateVisibility = () => {
      const shouldShow = Boolean(deferredInstallPrompt) && !isStandaloneMode();
      installButton.classList.toggle('hidden', !shouldShow);
    };

    const handleInstall = async () => {
      if (!deferredInstallPrompt) return;

      deferredInstallPrompt.prompt();
      try {
        await deferredInstallPrompt.userChoice;
      } finally {
        deferredInstallPrompt = null;
        updateVisibility();
      }
    };

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
      updateVisibility();
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      updateVisibility();
    });

    window.matchMedia?.('(display-mode: standalone)')?.addEventListener?.('change', updateVisibility);
    installButton.addEventListener('click', handleInstall);
    document.body.appendChild(installButton);
    updateVisibility();
  };

  const syncPwaState = () => {
    injectPwaAssets();
    document.documentElement.classList.toggle('is-standalone', isStandaloneMode());
    document.body?.classList.toggle('is-standalone', isStandaloneMode());
    initInstallPrompt();
    registerServiceWorker();
  };

  const syncThemeIcons = (theme) => {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const lightIcon = toggle.querySelector('[data-theme-icon="light"]');
    const darkIcon = toggle.querySelector('[data-theme-icon="dark"]');
    const isLight = theme === 'light';

    lightIcon?.classList.toggle('hidden', !isLight);
    darkIcon?.classList.toggle('hidden', isLight);
    toggle.setAttribute('aria-pressed', String(isLight));
    toggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  };

  const applyTheme = (theme) => {
    const resolved = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', resolved);
    document.body.setAttribute('data-theme', resolved);
    localStorage.setItem(THEME_KEY, resolved);
    syncThemeColor(resolved);
    syncThemeIcons(resolved);
  };

  const toggleTheme = () => {
    applyTheme(document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  };

  const syncSidebarState = () => {
    const shellRoot = document.getElementById('shell-root');
    const toggle = document.getElementById('sidebarToggle');
    if (!shellRoot || !toggle) return;

    const collapsed = localStorage.getItem(STORAGE_KEY) === '1';
    shellRoot.classList.toggle('sidebar-collapsed', collapsed);
    toggle.setAttribute('aria-pressed', String(collapsed));
  };

  const injectTimerNav = () => {
    const isArabicPage = window.location.pathname.includes('/arabic/');
    const label = isArabicPage ? 'المؤقت' : 'Timer';
    const sidebarLinks = document.querySelectorAll('aside.app-sidebar nav ul');

    sidebarLinks.forEach((list) => {
      if (list.querySelector('a[href="timer.html"]')) return;

      const timerItem = document.createElement('li');
      timerItem.innerHTML = '<a href="timer.html" data-nav-link class="sidebar-link group flex items-center gap-3 p-3 rounded-xl fast-trans border border-transparent hover:bg-white/3 focus-visible-ring"><span class="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gold to-amber-200 shadow-[0_0_18px_rgba(245,176,65,0.35)]"></span><span class="sidebar-label">' + label + '</span></a>';

      const settingsLink = list.querySelector('a[href="settings.html"]');
      if (settingsLink?.parentElement) {
        settingsLink.parentElement.before(timerItem);
        return;
      }

      const supportLink = list.querySelector('a[href="support.html"]');
      if (supportLink?.parentElement) {
        supportLink.parentElement.before(timerItem);
        return;
      }

      list.appendChild(timerItem);
    });
  };

  const injectCoachDashboardNav = () => {
    const isArabicPage = window.location.pathname.includes('/arabic/');
    const label = isArabicPage ? 'لوحة المدرب' : 'Coach Dashboard';
    const href = isArabicPage ? '../coach-dashboard.html' : 'coach-dashboard.html';
    const sidebarLinks = document.querySelectorAll('aside.app-sidebar nav ul');

    sidebarLinks.forEach((list) => {
      if (list.querySelector(`a[href="${href}"]`)) return;

      const coachItem = document.createElement('li');
      coachItem.innerHTML = '<a href="' + href + '" data-nav-link class="sidebar-link group flex items-center gap-3 p-3 rounded-xl fast-trans border border-transparent hover:bg-white/3 focus-visible-ring"><span class="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gold to-amber-200 shadow-[0_0_18px_rgba(245,176,65,0.35)]"></span><span class="sidebar-label">' + label + '</span></a>';

      const supportLink = list.querySelector('a[href="support.html"]');
      if (supportLink?.parentElement) {
        supportLink.parentElement.before(coachItem);
        return;
      }

      list.appendChild(coachItem);
    });
  };

  const injectAttendanceNav = () => {
    const isArabicPage = window.location.pathname.includes('/arabic/');
    const label = isArabicPage ? 'الحضور الذكي' : 'Smart Attendance';
    const href = isArabicPage ? '../smart-attendance.html' : 'smart-attendance.html';
    const sidebarLinks = document.querySelectorAll('aside.app-sidebar nav ul');

    sidebarLinks.forEach((list) => {
      if (list.querySelector(`a[href="${href}"]`)) return;

      const attendanceItem = document.createElement('li');
      attendanceItem.innerHTML = '<a href="' + href + '" data-nav-link class="sidebar-link group flex items-center gap-3 p-3 rounded-xl fast-trans border border-transparent hover:bg-white/3 focus-visible-ring"><span class="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gold to-amber-200 shadow-[0_0_18px_rgba(245,176,65,0.35)]"></span><span class="sidebar-label">' + label + '</span></a>';

      const supportLink = list.querySelector('a[href="support.html"]');
      if (supportLink?.parentElement) {
        supportLink.parentElement.before(attendanceItem);
        return;
      }

      list.appendChild(attendanceItem);
    });
  };

  const injectAiCoachNav = () => {
    const isArabicPage = window.location.pathname.includes('/arabic/');
    const label = isArabicPage ? 'AI Coach' : 'AI Coach';
    const href = isArabicPage ? '../ai-coach.html' : 'ai-coach.html';
    const sidebarLinks = document.querySelectorAll('aside.app-sidebar nav ul');

    sidebarLinks.forEach((list) => {
      if (list.querySelector(`a[href="${href}"]`)) return;

      const aiItem = document.createElement('li');
      aiItem.innerHTML = '<a href="' + href + '" data-nav-link class="sidebar-link group flex items-center gap-3 p-3 rounded-xl fast-trans border border-transparent hover:bg-white/3 focus-visible-ring"><span class="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gold to-amber-200 shadow-[0_0_18px_rgba(245,176,65,0.35)]"></span><span class="sidebar-label">' + label + '</span></a>';

      const supportLink = list.querySelector('a[href="support.html"]');
      if (supportLink?.parentElement) {
        supportLink.parentElement.before(aiItem);
        return;
      }

      list.appendChild(aiItem);
    });
  };

  const injectNutritionVoiceNav = () => {
    const isArabicPage = window.location.pathname.includes('/arabic/');
    const label = isArabicPage ? 'Voice Nutrition' : 'Nutrition Voice';
    const href = isArabicPage ? '../nutrition-voice.html' : 'nutrition-voice.html';
    const sidebarLinks = document.querySelectorAll('aside.app-sidebar nav ul');

    sidebarLinks.forEach((list) => {
      if (list.querySelector(`a[href="${href}"]`)) return;

      const voiceItem = document.createElement('li');
      voiceItem.innerHTML = '<a href="' + href + '" data-nav-link class="sidebar-link group flex items-center gap-3 p-3 rounded-xl fast-trans border border-transparent hover:bg-white/3 focus-visible-ring"><span class="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gold to-amber-200 shadow-[0_0_18px_rgba(245,176,65,0.35)]"></span><span class="sidebar-label">' + label + '</span></a>';

      const nutritionLink = list.querySelector('a[href="nutrition.html"]');
      if (nutritionLink?.parentElement) {
        nutritionLink.parentElement.after(voiceItem);
        return;
      }

      const supportLink = list.querySelector('a[href="support.html"]');
      if (supportLink?.parentElement) {
        supportLink.parentElement.before(voiceItem);
        return;
      }

      list.appendChild(voiceItem);
    });
  };

  const highlightActiveNav = () => {
    const page = currentPage();
    document.querySelectorAll('[data-nav-link]').forEach((link) => {
      const active = resolveActive(link.getAttribute('href') || '', page);
      link.classList.toggle('nav-link-active', active);
      link.setAttribute('aria-current', active ? 'page' : 'false');
    });

    document.querySelectorAll('[data-mobile-nav-link]').forEach((link) => {
      const active = resolveActive(link.getAttribute('href') || '', page);
      link.classList.toggle('text-white', active);
      link.classList.toggle('font-semibold', active);
      link.classList.toggle('text-stone-400', !active);
      const dot = link.querySelector('span');
      dot?.classList.toggle('bg-gold', active);
      dot?.classList.toggle('bg-white/30', !active);
    });
  };

  // Ensure essential mobile bottom nav links exist (prevents other pages/scripts from removing them)
  const ensureEssentialMobileLinks = () => {
    const nav = document.getElementById('mobileBottomNav') || document.querySelector('nav.mobile-bottom-nav');
    if (!nav) return;
    const inner = nav.querySelector('.mobile-bottom-nav__inner');
    if (!inner) return;

    const moreButton = inner.querySelector('#mobileMoreBtn');
    const canonicalLinks = [
      {
        href: 'landing.html',
        ariaLabel: 'Home',
        svgHtml: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      },
      {
        href: 'dashboard.html',
        ariaLabel: 'Dashboard',
        svgHtml: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>',
      },
      {
        href: 'workout.html',
        ariaLabel: 'Workout',
        svgHtml: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2L5 14h6l-1 8 9-12h-6l0-8z"/></svg>',
      },
    ];

    inner.querySelectorAll('a[data-mobile-nav-link]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (!canonicalLinks.some((item) => item.href === href)) {
        link.remove();
      }
    });

    canonicalLinks.forEach(({ href, ariaLabel, svgHtml }) => {
      let link = inner.querySelector(`a[href="${href}"]`);
      if (!link) {
        link = document.createElement('a');
        link.setAttribute('href', href);
        link.setAttribute('data-mobile-nav-link', '');
        link.className = 'mobile-bottom-nav__item';
        link.setAttribute('aria-label', ariaLabel);
        link.innerHTML = svgHtml;
      } else {
        link.className = 'mobile-bottom-nav__item';
        link.setAttribute('aria-label', ariaLabel);
        if (!link.querySelector('svg')) link.innerHTML = svgHtml;
      }

      if (moreButton) inner.insertBefore(link, moreButton);
      else inner.appendChild(link);
    });

    if (!moreButton) {
      const button = document.createElement('button');
      button.id = 'mobileMoreBtn';
      button.type = 'button';
      button.className = 'mobile-bottom-nav__item';
      button.setAttribute('aria-controls', 'mobileMoreSheet');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'More navigation');
      button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/><circle cx="5" cy="12" r="1.5" fill="currentColor"/></svg>';
      inner.appendChild(button);
    }
  };

  const initRevealObserver = () => {
    const nodes = document.querySelectorAll('[data-reveal], .reveal');
    if (!nodes.length) return;
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.12 });

    nodes.forEach((node) => {
      node.classList.add('reveal');
      revealObserver.observe(node);
    });
  };

  const initProgressPhotos = () => {
    const section = document.querySelector('[data-progress-photos]');
    if (!section) return;

    const storageKey = 'goldtech.progressPhotos';
    const localMedia = {
      front: 'assets/img/transformations/1.png',
      side: 'assets/img/transformations/2.png',
      back: 'assets/img/transformations/3.png',
    };
    const fallbackEntries = [
      {
        id: 'seed-3',
        date: '2026-05-15',
        note: 'Pulled a little tighter on the waist and improved back pose control.',
        weight: 77.8,
        bodyFat: 18.2,
        muscleMass: 35.5,
        bmi: 23.9,
        front: localMedia.front,
        side: localMedia.side,
        back: localMedia.back,
      },
      {
        id: 'seed-2',
        date: '2026-05-08',
        note: 'Stayed consistent with strength training and steps. Leaner posture visible.',
        weight: 78.4,
        bodyFat: 18.8,
        muscleMass: 35.1,
        bmi: 24.1,
        front: localMedia.front,
        side: localMedia.side,
        back: localMedia.back,
      },
      {
        id: 'seed-1',
        date: '2026-05-01',
        note: 'Baseline capture before the cutting phase began.',
        weight: 79.3,
        bodyFat: 19.7,
        muscleMass: 34.8,
        bmi: 24.6,
        front: localMedia.front,
        side: localMedia.side,
        back: localMedia.back,
      },
    ];

    const fallbackMedia = {
      front: fallbackEntries[2].front,
      side: fallbackEntries[2].side,
      back: fallbackEntries[2].back,
    };

    const parseEntries = () => {
      try {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return [...fallbackEntries];
        const parsed = JSON.parse(raw);
        const normalizeMedia = (url, fallbackUrl) => {
          if (typeof url !== 'string' || !url) return fallbackUrl;
          if (url.startsWith('data:')) return url;
          if (url === localMedia.front || url === localMedia.side || url === localMedia.back) return url;
          return fallbackUrl;
        };
        if (!Array.isArray(parsed) || !parsed.length) return [...fallbackEntries];
        return parsed.map((entry, index) => ({
          ...entry,
          front: normalizeMedia(entry.front, localMedia.front),
          side: normalizeMedia(entry.side, localMedia.side),
          back: normalizeMedia(entry.back, localMedia.back),
        }));
      } catch {
        return [...fallbackEntries];
      }
    };

    const persistEntries = (entries) => {
      localStorage.setItem(storageKey, JSON.stringify(entries));
    };

    const state = {
      entries: parseEntries(),
      selectedFiles: [],
    };

    const elements = {
      uploadForm: section.querySelector('[data-progress-form]'),
      fileInput: section.querySelector('[data-progress-input]'),
      dropZone: section.querySelector('[data-progress-dropzone]'),
      fileList: section.querySelector('[data-progress-files]'),
      noteInput: section.querySelector('[data-progress-note]'),
      status: section.querySelector('[data-progress-status]'),
      emptyState: section.querySelector('[data-progress-empty]'),
      timeline: section.querySelector('[data-progress-timeline]'),
      chartLine: section.querySelector('[data-progress-chart-line]'),
      chartArea: section.querySelector('[data-progress-chart-area]'),
      compareRange: section.querySelector('[data-progress-compare-range]'),
      compareReveal: section.querySelector('[data-progress-compare-reveal]'),
      compareBefore: section.querySelector('[data-progress-before]'),
      compareAfter: section.querySelector('[data-progress-after]'),
      compareCaption: section.querySelector('[data-progress-compare-caption]'),
      statValues: section.querySelectorAll('[data-progress-stat-value]'),
      statDeltas: section.querySelectorAll('[data-progress-stat-delta]'),
      statMeta: section.querySelectorAll('[data-progress-stat-meta]'),
      noteCount: section.querySelector('[data-progress-note-count]'),
      uploadHint: section.querySelector('[data-progress-upload-hint]'),
    };

    const formatShortDate = (value) => new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value));

    const getLatest = () => state.entries[0] || null;
    const getPrevious = () => state.entries[1] || state.entries[0] || null;

    const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error || new Error('Unable to read file'));
      reader.readAsDataURL(file);
    });

    const updateStatus = (message) => {
      if (elements.status) elements.status.textContent = message;
    };

    const setCompareImages = () => {
      const latest = getLatest();
      const previous = getPrevious();
      const before = previous || latest;
      const after = latest || previous;
      const reveal = elements.compareReveal;
      if (!reveal || !elements.compareBefore || !elements.compareAfter) return;

      elements.compareBefore.src = before?.front || fallbackMedia.front;
      elements.compareAfter.src = after?.front || fallbackMedia.front;
      elements.compareBefore.alt = before ? `Before photo from ${formatShortDate(before.date)}` : 'Before progress photo';
      elements.compareAfter.alt = after ? `After photo from ${formatShortDate(after.date)}` : 'After progress photo';

      const value = elements.compareRange ? elements.compareRange.value : '50';
      reveal.style.setProperty('--compare-width', `${value}%`);
      if (elements.compareCaption) {
        elements.compareCaption.textContent = latest && previous
          ? `Comparing ${formatShortDate(before.date)} and ${formatShortDate(after.date)}`
          : 'Add another upload to activate the before/after comparison.';
      }
    };

    const setChart = () => {
      const entries = [...state.entries].slice(0, 6).reverse();
      if (!elements.chartLine || !elements.chartArea) return;

      if (!entries.length) {
        elements.chartLine.setAttribute('d', '');
        elements.chartArea.setAttribute('d', '');
        return;
      }

      const width = 260;
      const height = 110;
      const values = entries.map((entry) => entry.weight);
      const min = Math.min(...values) - 0.6;
      const max = Math.max(...values) + 0.6;
      const span = max - min || 1;
      const step = entries.length > 1 ? width / (entries.length - 1) : width;

      const points = values.map((value, index) => {
        const x = index * step;
        const y = height - ((value - min) / span) * (height - 10) - 5;
        return { x, y };
      });

      const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ');
      const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;
      elements.chartLine.setAttribute('d', linePath);
      elements.chartArea.setAttribute('d', areaPath);
    };

    const renderMetrics = () => {
      const latest = getLatest();
      const previous = getPrevious();
      const values = [latest?.weight ?? 0, latest?.bodyFat ?? 0, latest?.muscleMass ?? 0, latest?.bmi ?? 0];
      const deltas = [
        latest && previous ? latest.weight - previous.weight : 0,
        latest && previous ? latest.bodyFat - previous.bodyFat : 0,
        latest && previous ? latest.muscleMass - previous.muscleMass : 0,
        latest && previous ? latest.bmi - previous.bmi : 0,
      ];
      const labels = ['kg', '% body fat', 'kg lean muscle', 'BMI'];

      elements.statValues.forEach((node, index) => {
        const value = values[index];
        node.textContent = index === 1 ? `${value.toFixed(1)}%` : index === 3 ? value.toFixed(1) : `${value.toFixed(1)}kg`;
      });

      elements.statDeltas.forEach((node, index) => {
        const delta = deltas[index];
        const positive = index === 1 || index === 3 ? delta <= 0 : delta >= 0;
        if (delta === 0) {
          node.textContent = 'Stable vs prior update';
        } else {
          const sign = delta > 0 ? '+' : '−';
          node.textContent = `${sign}${Math.abs(delta).toFixed(1)} ${labels[index]}`;
        }
        node.classList.toggle('text-emerald-300', positive && delta !== 0);
        node.classList.toggle('text-rose-300', !positive && delta !== 0);
      });

      elements.statMeta.forEach((node, index) => {
        node.textContent = labels[index];
      });

      if (elements.noteCount) {
        const noteCount = state.entries.filter((entry) => entry.note).length;
        elements.noteCount.textContent = `${noteCount} notes recorded`;
      }
    };

    const renderTimeline = () => {
      if (!elements.timeline || !elements.emptyState) return;

      if (!state.entries.length) {
        elements.timeline.innerHTML = '';
        elements.emptyState.classList.remove('hidden');
        return;
      }

      elements.emptyState.classList.add('hidden');
      elements.timeline.innerHTML = state.entries.map((entry) => {
        const day = new Date(entry.date).getDate().toString().padStart(2, '0');
        return `
          <article class="progress-timeline-item rounded-[1.5rem] border border-white/6 bg-white/3 p-4 md:p-5 hover:bg-white/5 fast-trans">
            <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="h-11 w-11 rounded-2xl bg-gradient-to-br from-gold/25 to-white/5 border border-white/10 flex items-center justify-center text-gold font-bold">${day}</div>
                  <div>
                    <div class="text-white font-semibold">${formatShortDate(entry.date)}</div>
                    <div class="text-stone-400 text-sm">${entry.note || 'Progress capture synced from the gym app.'}</div>
                  </div>
                </div>
                <div class="flex flex-wrap gap-2 text-xs">
                  <span class="rounded-full border border-white/8 bg-black/20 px-3 py-1 text-stone-200">${entry.weight.toFixed(1)} kg</span>
                  <span class="rounded-full border border-white/8 bg-black/20 px-3 py-1 text-stone-200">${entry.bodyFat.toFixed(1)}% body fat</span>
                  <span class="rounded-full border border-white/8 bg-black/20 px-3 py-1 text-stone-200">${entry.muscleMass.toFixed(1)} kg muscle</span>
                  <span class="rounded-full border border-white/8 bg-black/20 px-3 py-1 text-stone-200">BMI ${entry.bmi.toFixed(1)}</span>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-2 md:w-48 shrink-0">
                ${['front', 'side', 'back'].map((slot) => `<div class="overflow-hidden rounded-2xl border border-white/8 bg-black/30 aspect-square"><img src="${entry[slot]}" alt="${slot} progress photo" class="h-full w-full object-cover"/></div>`).join('')}
              </div>
            </div>
          </article>
        `;
      }).join('');
    };

    const renderSelection = () => {
      if (!elements.fileList || !elements.uploadHint) return;
      if (!state.selectedFiles.length) {
        elements.fileList.innerHTML = '';
        elements.uploadHint.textContent = 'Drop front, side, and back images here, or browse from your device.';
        return;
      }

      elements.uploadHint.textContent = `${state.selectedFiles.length} image${state.selectedFiles.length > 1 ? 's' : ''} ready for upload`;
      elements.fileList.innerHTML = state.selectedFiles.map((file, index) => `
        <div class="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-3 py-2 text-sm">
          <span class="truncate text-stone-200">${['Front', 'Side', 'Back'][index] || 'Photo'}: ${file.name}</span>
          <span class="text-stone-500">${(file.size / 1024 / 1024).toFixed(1)} MB</span>
        </div>
      `).join('');
    };

    const syncState = () => {
      persistEntries(state.entries);
      renderMetrics();
      renderTimeline();
      setChart();
      setCompareImages();
      renderSelection();
    };

    const handleFiles = async (fileList) => {
      const files = Array.from(fileList || []).filter((file) => file.type.startsWith('image/')).slice(0, 3);
      if (!files.length) {
        updateStatus('Select image files to create a progress update.');
        return;
      }

      state.selectedFiles = files;
      const mediaUrls = await Promise.all(files.map((file) => readFileAsDataUrl(file)));
      const latest = getLatest();
      const record = {
        id: `entry-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        note: elements.noteInput?.value.trim() || 'New progress photos uploaded from the gym floor.',
        weight: Number(section.querySelector('[name="weight"]')?.value || latest?.weight || 0),
        bodyFat: Number(section.querySelector('[name="bodyFat"]')?.value || latest?.bodyFat || 0),
        muscleMass: Number(section.querySelector('[name="muscleMass"]')?.value || latest?.muscleMass || 0),
        bmi: Number(section.querySelector('[name="bmi"]')?.value || latest?.bmi || 0),
        front: mediaUrls[0] || latest?.front || fallbackMedia.front,
        side: mediaUrls[1] || latest?.side || fallbackMedia.side,
        back: mediaUrls[2] || latest?.back || fallbackMedia.back,
      };

      state.entries = [record, ...state.entries];
      syncState();
      elements.uploadForm?.reset();
      updateStatus('Progress update saved to your timeline.');
    };

    elements.uploadForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputFiles = elements.fileInput?.files;
      const files = state.selectedFiles.length ? state.selectedFiles : Array.from(inputFiles || []);
      if (!files.length) {
        updateStatus('Choose at least one photo before uploading.');
        return;
      }
      handleFiles(files).catch(() => updateStatus('The selected files could not be processed.'));
    });

    elements.fileInput?.addEventListener('change', () => {
      state.selectedFiles = Array.from(elements.fileInput?.files || []).filter((file) => file.type.startsWith('image/')).slice(0, 3);
      renderSelection();
      updateStatus(state.selectedFiles.length ? 'Files staged. Press upload to save this progress update.' : 'Choose front, side, and back images to continue.');
    });

    if (elements.dropZone && elements.fileInput) {
      const openPicker = () => elements.fileInput?.click();
      elements.dropZone.addEventListener('click', openPicker);
      elements.dropZone.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openPicker();
        }
      });

      ['dragenter', 'dragover'].forEach((eventName) => {
        elements.dropZone.addEventListener(eventName, (event) => {
          event.preventDefault();
          elements.dropZone.classList.add('is-dragging');
        });
      });

      ['dragleave', 'drop'].forEach((eventName) => {
        elements.dropZone.addEventListener(eventName, (event) => {
          event.preventDefault();
          elements.dropZone.classList.remove('is-dragging');
        });
      });

      elements.dropZone.addEventListener('drop', (event) => {
        const files = Array.from(event.dataTransfer?.files || []).filter((file) => file.type.startsWith('image/')).slice(0, 3);
        if (!files.length) return;
        state.selectedFiles = files;
        renderSelection();
        updateStatus('Images dropped in and ready to upload.');
      });
    }

    elements.compareRange?.addEventListener('input', () => {
      if (elements.compareReveal) {
        elements.compareReveal.style.setProperty('--compare-width', `${elements.compareRange.value}%`);
      }
    });

    syncState();
    updateStatus('Ready to capture your next progress update.');
  };

  const initLeaderboardChallenges = () => {
    const section = document.querySelector('[data-gamify-dashboard]');
    if (!section) return;

    const nodes = Array.from(section.querySelectorAll('[data-countdown-target]'));
    if (!nodes.length) return;

    const formatCountdown = (targetDate) => {
      const delta = Math.max(0, targetDate.getTime() - Date.now());
      const totalHours = Math.floor(delta / 36e5);
      const days = Math.floor(totalHours / 24);
      const hours = totalHours % 24;
      const minutes = Math.floor((delta % 36e5) / 6e4);
      if (days > 0) return `${days}d ${String(hours).padStart(2, '0')}h left`;
      return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m left`;
    };

    const update = () => {
      nodes.forEach((node) => {
        const target = new Date(node.getAttribute('data-countdown-target') || '');
        if (Number.isNaN(target.getTime())) return;
        node.textContent = formatCountdown(target);
      });
    };

    update();
    window.setInterval(update, 60000);
  };

  function init() {
    injectPremiumFonts();
    applyTheme(getPreferredTheme());
    syncSidebarState();
    const runMobileNavSetup = () => {
      injectTimerNav();
      injectCoachDashboardNav();
      injectAttendanceNav();
      injectAiCoachNav();
      injectNutritionVoiceNav();
      ensureEssentialMobileLinks();
      highlightActiveNav();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runMobileNavSetup, { once: true });
    } else {
      runMobileNavSetup();
    }
    initRevealObserver();
    initProgressPhotos();
    initLeaderboardChallenges();

    if (!window.location.hash) {
      window.requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    }

    const shellRoot = document.getElementById('shell-root');
    const sidebar = document.querySelector('aside.app-sidebar');

    document.getElementById('themeToggle')?.addEventListener('click', () => {
      applyTheme(document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });

    document.getElementById('sidebarToggle')?.addEventListener('click', () => {
      if (!shellRoot) return;
      const collapsed = !shellRoot.classList.contains('sidebar-collapsed');
      shellRoot.classList.toggle('sidebar-collapsed', collapsed);
      localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
      document.getElementById('sidebarToggle')?.setAttribute('aria-pressed', String(collapsed));
    });

    document.getElementById('mobileMenuBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar?.classList.toggle('hidden');
      document.querySelector('.shell-overlay')?.classList.toggle('opacity-100', !sidebar?.classList.contains('hidden'));
      document.querySelector('.shell-overlay')?.classList.toggle('pointer-events-auto', !sidebar?.classList.contains('hidden'));
    });

    // Close sidebar when clicking outside
    document.getElementById('shell-root')?.addEventListener('click', (e) => {
      if (window.innerWidth < 768 && sidebar && !sidebar.classList.contains('hidden') && !e.target.closest('aside.app-sidebar') && !e.target.closest('#mobileMenuBtn')) {
        sidebar.classList.add('hidden');
        document.querySelector('.shell-overlay')?.classList.remove('opacity-100', 'pointer-events-auto');
      }
    });

    document.addEventListener('click', (event) => {
      const anchor = event.target.closest('a[href]');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.href === window.location.href || (url.pathname === window.location.pathname && url.hash)) return;
      event.preventDefault();
      document.body.classList.add('page-leaving');
      window.setTimeout(() => {
        window.location.href = url.href;
      }, 140);
    }, true);

    document.body.classList.add('page-ready');
  }

  const bootPwa = () => {
    syncPwaState();
    initSplashScreen();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootPwa, { once: true });
  } else {
    bootPwa();
  }

  return { init, applyTheme, toggleTheme };
})();

window.Components = Components;
