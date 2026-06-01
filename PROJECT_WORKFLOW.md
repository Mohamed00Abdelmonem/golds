# Project Workflow Summary

## Project Type
- Static frontend for GoldTech Fitness / Gym Golds.
- Main pages are plain HTML files with shared CSS and vanilla JavaScript.
- No build step is required for local editing.

## Core Files
- `index.html` and the other root HTML pages are the primary entry points.
- `assets/css/style.css` contains the shared styling.
- `assets/js/components.js` contains shared UI behavior.
- `assets/js/i18n.js` manages English and Arabic language switching.
- `sw.js` and `manifest.json` support the PWA experience.

## Typical Workflow
1. Pick the page you want to update, such as `dashboard.html`, `landing.html`, or another feature page.
2. Edit the HTML structure first, then adjust shared CSS or JavaScript only if the change needs it.
3. Keep the UI mobile-friendly and app-like, with compact cards, clear actions, and touch-safe controls.
4. If the page contains translatable text, add or update `data-i18n` attributes and the matching keys in `assets/js/i18n.js`.
5. Test the page in a browser after each meaningful change.

## Running Locally
- Open an HTML file directly in the browser for a quick check.
- For a local server, run:

```bash
python -m http.server 8000
```

- Then open `http://localhost:8000/` and navigate to the desired page.

## Translation Workflow
- Add `data-i18n` to any text that must switch between English and Arabic.
- Keep the `languageToggle` button in the page header when a page should support language switching.
- Update `assets/js/i18n.js` with matching English and Arabic strings.
- Confirm the page direction changes correctly for RTL Arabic layout.

## Mobile and Layout Checks
- Keep touch targets large enough for mobile use.
- Verify spacing, stacking, and scrolling on small screens.
- Check key pages in both portrait and landscape orientation when possible.

## PWA Checks
- If a change affects offline behavior, update `sw.js` and verify the manifest still matches the app name, icons, and start URL.
- Re-test offline loading after changes to cached assets.

## Recommended Finish Check
- Reload the page.
- Confirm images, icons, and fonts load correctly.
- Confirm navigation works.
- Confirm translated text and responsive layout still behave as expected.