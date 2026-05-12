// Shared shell interactions for static pages.
const Components = (function () {
  const STORAGE_KEY = 'goldtech.sidebarCollapsed';
  const THEME_KEY = 'goldtech.theme';
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
    syncThemeIcons(resolved);
  };

  const syncSidebarState = () => {
    const shellRoot = document.getElementById('shell-root');
    const toggle = document.getElementById('sidebarToggle');
    if (!shellRoot || !toggle) return;

    const collapsed = localStorage.getItem(STORAGE_KEY) === '1';
    shellRoot.classList.toggle('sidebar-collapsed', collapsed);
    toggle.setAttribute('aria-pressed', String(collapsed));
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

  function init() {
    applyTheme(getPreferredTheme());
    syncSidebarState();
    highlightActiveNav();
    initRevealObserver();

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

  return { init, applyTheme };
})();

window.Components = Components;
