# Language Toggle Implementation Guide

## Overview
A multilingual translation system has been created for the GoldTech Gym platform with support for English and Arabic. The system uses localStorage to persist language preferences and automatically switches the UI direction (RTL for Arabic).

## Files Created

### 1. `assets/js/i18n.js`
Main translation engine with:
- Bilingual translations (English & Arabic)
- Language toggle functionality
- localStorage persistence
- RTL/LTR direction switching
- data-i18n attribute support

## How to Add to All Pages

### Step 1: Add Script to Head
```html
<script src="assets/js/i18n.js" defer></script>
```

### Step 2: Add Language Toggle Button to Header
Place this button in your header (before or after other header buttons):

```html
<button id="languageToggle" class="hidden sm:inline-flex p-2 rounded-lg bg-white/3 focus-visible-ring gap-2" aria-label="Toggle language">
  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M5 8h14M5 8a9 9 0 0 0 0 8M5 8a9 9 0 0 1 14 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>
  <span data-lang-text class="text-stone-400 text-sm">العربية</span>
</button>
```

### Step 3: Mark Translatable Text with data-i18n Attribute
```html
<!-- Navigation items -->
<span data-i18n="nav.dashboard">Dashboard</span>
<span data-i18n="nav.workouts">Workouts</span>

<!-- Header -->
<input data-i18n="header.search" placeholder="Search workouts"/>

<!-- Page content -->
<h1 data-i18n="dashboard.title">Dashboard</h1>
```

## Available Translation Keys

### Navigation
- `nav.home` - Home
- `nav.dashboard` - Dashboard
- `nav.programs` - Programs
- `nav.workouts` - Workouts
- `nav.classes` - Classes
- `nav.coaches` - Coaches
- `nav.community` - Community
- `nav.blogs` - Blogs
- `nav.crowd` - Crowd
- `nav.inbody` - InBody
- `nav.machines` - Machines
- `nav.nutrition` - Nutrition
- `nav.smart-test` - Smart Test
- `nav.achievements` - Achievements
- `nav.store` - Store
- `nav.membership` - Membership
- `nav.notifications` - Notifications
- `nav.settings` - Settings
- `nav.support` - Support
- `nav.profile` - Profile

### Common UI
- `header.search` - Search placeholder
- `header.language` - Language label
- `sidebar.membership` - Active Membership
- `sidebar.valid` - Valid until

### Dashboard
- `dashboard.title` - Dashboard title
- `dashboard.today` - Today's Activity
- `dashboard.stats` - Statistics

### Workouts
- `workout.title` - Workout Program
- `workout.tracker` - Workout Tracker
- `workout.in-progress` - In Progress
- `workout.completed` - Completed
- `workout.remaining` - Remaining
- `workout.start-timer` - Start Timer
- `workout.end-workout` - End Workout
- `workout.exercises` - Exercises

### Crowd
- `crowd.title` - Live Crowd
- `crowd.capacity` - Capacity used
- `crowd.peak-hours` - Peak Hours
- `crowd.available` - Available machines
- `crowd.heatmap` - Floor Activity Heatmap
- `crowd.contributions` - Weekly Contributions
- `crowd.total` - Total workouts
- `crowd.activity` - Activity
- `crowd.low` - Low
- `crowd.medium` - Medium
- `crowd.high` - High
- `crowd.peak` - Peak

## Features

✅ **Automatic RTL/LTR Switching** - Layout adjusts for Arabic
✅ **Persistent Language** - Choice saved in localStorage
✅ **Dynamic Button Text** - Button shows current language option
✅ **Placeholder Support** - Input placeholders translate too
✅ **Easy to Extend** - Add new translations to i18n.translations object

## How It Works

1. User clicks language toggle button
2. System switches language preference (saved to localStorage)
3. HTML lang attribute updates
4. Page direction switches to RTL (for Arabic) or LTR (for English)
5. All elements with `data-i18n` attribute update text
6. Button label changes to show opposite language option

## JavaScript API

### Get Translation
```javascript
i18n.t('dashboard.title') // Returns translated text
```

### Toggle Language
```javascript
i18n.toggle() // Switch between EN and AR
```

### Apply Translations to Page
```javascript
i18n.apply() // Re-apply translations (useful after dynamic content)
```

### Get Current Language
```javascript
i18n.currentLang // Returns 'en' or 'ar'
```

## Adding New Translations

Edit `assets/js/i18n.js` and add to the appropriate language section:

```javascript
translations: {
  en: {
    'new.key': 'English Text',
    ...
  },
  ar: {
    'new.key': 'النص العربي',
    ...
  }
}
```

Then use in HTML:
```html
<span data-i18n="new.key">English Text</span>
```

## Pages Updated

✅ workout.html - Language toggle added to header
✅ crowd.html - Language toggle added to header
✅ landing.html - i18n.js script added (ready for toggle button)

## Pages Pending Update

- dashboard.html
- programs.html
- classes.html
- coaches.html
- community.html
- blogs.html
- inbody.html
- machines.html
- nutrition.html
- smart-test.html
- achievements.html
- store.html
- membership.html
- notifications.html
- settings.html
- support.html
- profile.html
- (other pages)

## Quick Implementation Template

```html
<!doctype html>
<html lang="en">
<head>
  <!-- ... other head content ... -->
  <script src="assets/js/i18n.js" defer></script>
</head>
<body>
  <header>
    <!-- Language toggle button -->
    <button id="languageToggle" class="hidden sm:inline-flex p-2 rounded-lg bg-white/3 gap-2">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M5 8h14M5 8a9 9 0 0 0 0 8M5 8a9 9 0 0 1 14 0" stroke="currentColor" stroke-width="1.6"/>
      </svg>
      <span data-lang-text>العربية</span>
    </button>
    
    <!-- Translatable content -->
    <h1 data-i18n="page.title">Page Title</h1>
    <input data-i18n="form.search" placeholder="Search"/>
  </header>
</body>
</html>
```

---

For questions or issues with translations, check that:
1. ✅ `i18n.js` is loaded before page content
2. ✅ `data-i18n` keys match exactly (case-sensitive)
3. ✅ Language toggle button has id="languageToggle"
4. ✅ Button contains `<span data-lang-text>` for text update
