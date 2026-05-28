// Reusable Assign My Workouts drawer for program pages.
const ProgramCustomizer = (function () {
  const STORAGE_PREFIX = 'goldtech.assignedWorkouts.v1';

  const library = [
    { id: 'bench-press', name: 'Barbell Bench Press', muscle: 'Chest', equipment: 'Barbell', sets: 4, reps: '6-8', rest: '90s' },
    { id: 'incline-db-press', name: 'Incline Dumbbell Press', muscle: 'Upper Chest', equipment: 'Dumbbells', sets: 4, reps: '8-10', rest: '75s' },
    { id: 'cable-fly', name: 'Cable Fly', muscle: 'Chest', equipment: 'Cable', sets: 3, reps: '12-15', rest: '60s' },
    { id: 'lat-pulldown', name: 'Lat Pulldown', muscle: 'Lats', equipment: 'Machine', sets: 4, reps: '8-12', rest: '75s' },
    { id: 'barbell-row', name: 'Barbell Row', muscle: 'Back', equipment: 'Barbell', sets: 4, reps: '8-10', rest: '90s' },
    { id: 'face-pull', name: 'Face Pull', muscle: 'Rear Delts', equipment: 'Cable', sets: 3, reps: '12-15', rest: '45s' },
    { id: 'back-squat', name: 'Back Squat', muscle: 'Quads', equipment: 'Barbell', sets: 4, reps: '5-8', rest: '120s' },
    { id: 'romanian-deadlift', name: 'Romanian Deadlift', muscle: 'Hamstrings', equipment: 'Barbell', sets: 4, reps: '8-10', rest: '90s' },
    { id: 'leg-press', name: 'Leg Press', muscle: 'Legs', equipment: 'Machine', sets: 4, reps: '10-12', rest: '90s' },
    { id: 'overhead-press', name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell', sets: 4, reps: '6-8', rest: '90s' },
    { id: 'lateral-raise', name: 'Lateral Raise', muscle: 'Side Delts', equipment: 'Dumbbells', sets: 3, reps: '12-15', rest: '45s' },
    { id: 'biceps-curl', name: 'Incline Biceps Curl', muscle: 'Biceps', equipment: 'Dumbbells', sets: 3, reps: '10-12', rest: '60s' },
    { id: 'triceps-pushdown', name: 'Triceps Pushdown', muscle: 'Triceps', equipment: 'Cable', sets: 3, reps: '10-12', rest: '60s' },
    { id: 'walking-lunge', name: 'Walking Lunge', muscle: 'Glutes', equipment: 'Dumbbells', sets: 3, reps: '10-12', rest: '75s' },
    { id: 'hanging-leg-raise', name: 'Hanging Leg Raise', muscle: 'Core', equipment: 'Bodyweight', sets: 3, reps: '12-15', rest: '45s' },
  ];

  const templates = {
    en: [
      { id: 'push', name: 'Push Day', focus: 'Chest, shoulders, triceps' },
      { id: 'pull', name: 'Pull Day', focus: 'Back, biceps, rear delts' },
                <div class="text-lg font-bold text-white">${active ? active.name : t('emptyPlan')}</div>
              </div>
              <button type="button" class="report-cta px-4 py-2 text-sm font-semibold" data-action="add-day">${t('addDay')}</button>
            </div>
            <p class="text-sm text-stone-400">Choose a day, then add workouts from the library below.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${daysMarkup}</div>
          </section>

          <section class="program-customizer-section p-4 md:p-5 space-y-4">
            <div class="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <div class="text-stone-400 text-xs uppercase tracking-[0.24em]">${t('library')}</div>
                <div class="text-lg font-bold text-white">Pick workouts for this plan</div>
              </div>
              <input type="search" class="glass w-full sm:w-80 rounded-xl px-4 py-3 bg-transparent text-white placeholder:text-stone-500 focus-visible-ring" placeholder="${t('search')}" value="${state.search}" data-action="search-input" />
            </div>
            <div class="grid gap-3 md:grid-cols-2">${libraryMarkup}</div>
          </section>

          <section class="program-customizer-section p-4 md:p-5 space-y-4">
            <div class="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <div class="text-stone-400 text-xs uppercase tracking-[0.24em]">${t('selected')}</div>
                <div class="text-lg font-bold text-white">${active ? active.name : t('emptyPlan')}</div>
              </div>
              <button type="button" class="report-cta px-4 py-2 text-sm font-semibold" data-action="save">${t('save')}</button>
            </div>
            <div class="space-y-3">${exercisesMarkup}</div>
          </section>
        </div>
      </div>`;
  };

  const inputField = (field, label, value, uid) => `
    <label class="space-y-1 text-sm text-stone-300">
      <span class="text-xs uppercase tracking-[0.2em] text-stone-500">${label}</span>
      <input type="text" value="${value}" data-action="edit-field" data-field="${field}" data-uid="${uid}" class="w-full rounded-xl border border-white/8 bg-black/30 px-3 py-2 text-white focus-visible-ring" />
    </label>`;

  const open = () => {
    const backdrop = document.getElementById('programCustomizerBackdrop');
    const panel = document.getElementById('programCustomizerPanel');
    if (!backdrop || !panel) return;

    state.open = true;
    backdrop.classList.add('is-open');
    panel.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    state.loading = true;
    renderPanel();

    window.setTimeout(() => {
      state.loading = false;
      renderPanel();
    }, 350);
  };

  const close = () => {
    // Assign My Workouts modal for program pages.
    const ProgramCustomizer = (function () {
      const STORAGE_PREFIX = 'goldtech.assignedWorkouts.v1';

      const exercises = [
        { id: 'bench-press', name: 'Barbell Bench Press', muscle: 'Chest', equipment: 'Barbell', sets: 4, reps: '6-8', rest: '90s' },
        { id: 'incline-db-press', name: 'Incline Dumbbell Press', muscle: 'Upper Chest', equipment: 'Dumbbells', sets: 4, reps: '8-10', rest: '75s' },
        { id: 'cable-fly', name: 'Cable Fly', muscle: 'Chest', equipment: 'Cable', sets: 3, reps: '12-15', rest: '60s' },
        { id: 'lat-pulldown', name: 'Lat Pulldown', muscle: 'Lats', equipment: 'Machine', sets: 4, reps: '8-12', rest: '75s' },
        { id: 'barbell-row', name: 'Barbell Row', muscle: 'Back', equipment: 'Barbell', sets: 4, reps: '8-10', rest: '90s' },
        { id: 'face-pull', name: 'Face Pull', muscle: 'Rear Delts', equipment: 'Cable', sets: 3, reps: '12-15', rest: '45s' },
        { id: 'back-squat', name: 'Back Squat', muscle: 'Quads', equipment: 'Barbell', sets: 4, reps: '5-8', rest: '120s' },
        { id: 'romanian-deadlift', name: 'Romanian Deadlift', muscle: 'Hamstrings', equipment: 'Barbell', sets: 4, reps: '8-10', rest: '90s' },
        { id: 'leg-press', name: 'Leg Press', muscle: 'Legs', equipment: 'Machine', sets: 4, reps: '10-12', rest: '90s' },
        { id: 'overhead-press', name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell', sets: 4, reps: '6-8', rest: '90s' },
        { id: 'lateral-raise', name: 'Lateral Raise', muscle: 'Side Delts', equipment: 'Dumbbells', sets: 3, reps: '12-15', rest: '45s' },
        { id: 'biceps-curl', name: 'Incline Biceps Curl', muscle: 'Biceps', equipment: 'Dumbbells', sets: 3, reps: '10-12', rest: '60s' },
        { id: 'triceps-pushdown', name: 'Triceps Pushdown', muscle: 'Triceps', equipment: 'Cable', sets: 3, reps: '10-12', rest: '60s' },
        { id: 'walking-lunge', name: 'Walking Lunge', muscle: 'Glutes', equipment: 'Dumbbells', sets: 3, reps: '10-12', rest: '75s' },
        { id: 'hanging-leg-raise', name: 'Hanging Leg Raise', muscle: 'Core', equipment: 'Bodyweight', sets: 3, reps: '12-15', rest: '45s' },
      ];

      const templates = {
        en: [
          { id: 'push', name: 'Push Day', focus: 'Chest, shoulders, triceps' },
          { id: 'pull', name: 'Pull Day', focus: 'Back, biceps, rear delts' },
          { id: 'legs', name: 'Leg Day', focus: 'Quads, hamstrings, glutes' },
        ],
        ar: [
          { id: 'push', name: 'يوم الدفع', focus: 'الصدر والكتف والترايسبس' },
          { id: 'pull', name: 'يوم السحب', focus: 'الظهر والبايسبس والكتف الخلفي' },
          { id: 'legs', name: 'يوم الأرجل', focus: 'الفخذين والهامسترنج والألوية' },
        ],
      };

      const messages = {
        en: {
          button: 'Customize Program',
          title: 'Assign My Workouts',
          subtitle: 'Open the workout modal, pick exercises from the library, edit sets, and save the plan to your account.',
          days: 'Workout days',
          library: 'Exercise library',
          empty: 'No exercises assigned yet. Add one from the library.',
          loading: 'Loading exercise library...',
          addDay: 'Add Day',
          save: 'Save Program',
          close: 'Close',
          selected: 'Selected exercises',
          search: 'Search exercises',
          add: 'Add',
          remove: 'Remove',
          up: 'Up',
          down: 'Down',
          target: 'Target muscle',
          sets: 'Sets',
          reps: 'Reps',
          rest: 'Rest',
          noResults: 'No exercises found.',
          saved: 'Saved for your account',
          emptyPlan: 'No custom plan yet.',
          createFirst: 'Create your first custom workout day.',
        },
        ar: {
          button: 'تخصيص البرنامج',
          title: 'تعيين تماريني',
          subtitle: 'افتح نافذة التمارين، واختر التمارين من المكتبة، وعدّل المجموعات ثم احفظ الخطة لحسابك.',
          days: 'أيام التدريب',
          library: 'مكتبة التمارين',
          empty: 'لا توجد تمارين بعد. أضف واحدًا من المكتبة.',
          loading: 'جاري تحميل مكتبة التمارين...',
          addDay: 'إضافة يوم',
          save: 'حفظ البرنامج',
          close: 'إغلاق',
          selected: 'التمارين المختارة',
          search: 'ابحث عن التمارين',
          add: 'إضافة',
          remove: 'حذف',
          up: 'أعلى',
          down: 'أسفل',
          target: 'العضلة المستهدفة',
          sets: 'المجموعات',
          reps: 'التكرارات',
          rest: 'الراحة',
          noResults: 'لا توجد تمارين مطابقة.',
          saved: 'تم الحفظ لحسابك',
          emptyPlan: 'لا توجد خطة مخصصة بعد.',
          createFirst: 'أنشئ أول يوم تدريب مخصص.',
        },
      };

      const state = {
        open: false,
        loading: true,
        lang: 'en',
        days: [],
        activeDayId: null,
        search: '',
        userKey: 'default',
      };

      const isArabicPage = () => document.documentElement.dir === 'rtl' || window.location.pathname.includes('/arabic/');
      const t = (key) => messages[state.lang][key] || messages.en[key] || key;
      const storageKey = () => `${STORAGE_PREFIX}.${state.userKey}`;

      const getUserKey = () => {
        const headerUser = document.querySelector('header .text-white.font-semibold')?.textContent?.trim();
        const profileUser = document.querySelector('aside .text-white.font-semibold')?.textContent?.trim();
        return (profileUser || headerUser || 'guest').toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-');
      };

      const createExercise = (exercise, overrides = {}) => ({
        uid: `${exercise.id}-${Math.random().toString(36).slice(2, 8)}`,
        name: exercise.name,
        muscle: exercise.muscle,
        equipment: exercise.equipment,
        sets: overrides.sets ?? exercise.sets,
        reps: overrides.reps ?? exercise.reps,
        rest: overrides.rest ?? exercise.rest,
        target: overrides.target ?? exercise.muscle,
      });

      const normalizeDay = (day, index) => ({
        id: day.id || `day-${index + 1}`,
        name: day.name || (state.lang === 'ar' ? `اليوم ${index + 1}` : `Day ${index + 1}`),
        focus: day.focus || '',
        exercises: Array.isArray(day.exercises) ? day.exercises : [],
      });

      const defaultPlan = () => templates[state.lang].map((day) => ({
        ...day,
        exercises: day.id === 'push'
          ? [createExercise(exercises[0]), createExercise(exercises[9]), createExercise(exercises[12])]
          : day.id === 'pull'
            ? [createExercise(exercises[3]), createExercise(exercises[4]), createExercise(exercises[5])]
            : [createExercise(exercises[6]), createExercise(exercises[7]), createExercise(exercises[8])],
      }));

      const load = () => {
        state.lang = isArabicPage() ? 'ar' : 'en';
        state.userKey = getUserKey();
        try {
          const raw = localStorage.getItem(storageKey());
          if (raw) {
            const parsed = JSON.parse(raw);
            state.days = (parsed.days || []).map(normalizeDay);
            state.activeDayId = parsed.activeDayId || state.days[0]?.id || null;
          } else {
            state.days = defaultPlan();
            state.activeDayId = state.days[0]?.id || null;
          }
        } catch {
          state.days = defaultPlan();
          state.activeDayId = state.days[0]?.id || null;
        }
      };

      const save = () => {
        localStorage.setItem(storageKey(), JSON.stringify({ days: state.days, activeDayId: state.activeDayId }));
        const badge = document.querySelector('[data-program-saved-badge]');
        if (badge) badge.textContent = t('saved');
      };

      const activeDay = () => state.days.find((day) => day.id === state.activeDayId) || state.days[0] || null;
      const filteredLibrary = () => {
        const query = state.search.trim().toLowerCase();
        if (!query) return exercises;
        return exercises.filter((exercise) => [exercise.name, exercise.muscle, exercise.equipment].some((value) => value.toLowerCase().includes(query)));
      };

      const renderMount = () => {
        const mount = document.getElementById('programCustomizerMount');
        if (!mount) return;

        const totalExercises = state.days.reduce((sum, day) => sum + day.exercises.length, 0);
        const active = activeDay();

        mount.innerHTML = `
          <div class="program-customizer-section rounded-3xl p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="space-y-2">
              <div class="text-gold text-xs font-bold uppercase tracking-[0.28em]">${t('button')}</div>
              <h2 class="text-2xl md:text-3xl font-black text-white">${t('title')}</h2>
              <p class="text-stone-300 max-w-2xl">${t('subtitle')}</p>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <div class="rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-stone-300"><span class="text-white font-semibold">${state.days.length}</span> ${t('days')}</div>
              <div class="rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-stone-300"><span class="text-white font-semibold">${totalExercises}</span> workouts</div>
              <button type="button" data-open-program-customizer aria-haspopup="dialog" class="report-cta px-5 py-3 font-semibold">${t('button')}</button>
            </div>
          </div>
          <div class="mt-4 program-state-card rounded-3xl p-5 md:p-6 flex items-start justify-between gap-4">
            <div>
              <div class="text-stone-400 text-xs uppercase tracking-[0.24em]">${t('saved')}</div>
              <div class="mt-2 text-xl font-black text-white">${active ? active.name : t('emptyPlan')}</div>
              <p class="mt-2 text-sm text-stone-300">${active ? `${active.focus || t('createFirst')} • ${active.exercises.length} exercises` : t('createFirst')}</p>
            </div>
            <div class="text-right">
              <div class="text-gold font-black text-2xl" data-program-saved-badge>${t('saved')}</div>
              <div class="text-stone-400 text-sm">Local only, per user</div>
            </div>
          </div>`;

        mount.querySelectorAll('[data-open-program-customizer]').forEach((button) => {
          if (button.dataset.programCustomizerBound === '1') return;
          button.dataset.programCustomizerBound = '1';
          button.addEventListener('click', open);
        });
      };

      const inputField = (field, label, value, uid) => `
        <label class="space-y-1 text-sm text-stone-300">
          <span class="text-xs uppercase tracking-[0.2em] text-stone-500">${label}</span>
          <input type="text" value="${value}" data-action="edit-field" data-field="${field}" data-uid="${uid}" class="w-full rounded-xl border border-white/8 bg-black/30 px-3 py-2 text-white focus-visible-ring" />
        </label>`;

      const renderPanel = () => {
        const panel = document.getElementById('programCustomizerPanel');
        if (!panel) return;
        const active = activeDay();
        const daysMarkup = state.days.length
          ? state.days.map((day) => `
            <button type="button" class="program-day-chip ${day.id === state.activeDayId ? 'is-active' : ''} rounded-2xl px-4 py-3 text-sm font-semibold text-start" data-day-id="${day.id}">
              <div class="font-semibold text-white">${day.name}</div>
              <div class="text-xs opacity-80 mt-1">${day.focus || ''}</div>
            </button>`).join('')
          : `<div class="program-state-card rounded-2xl p-4 text-sm text-stone-300">${t('createFirst')}</div>`;

        const currentExercises = active?.exercises || [];
        const exercisesMarkup = currentExercises.length
          ? currentExercises.map((exercise) => `
            <div class="program-exercise-card rounded-2xl p-4" data-exercise-uid="${exercise.uid}">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="font-bold text-white">${exercise.name}</div>
                  <div class="text-xs text-stone-400 mt-1">${exercise.equipment} • ${exercise.muscle}</div>
                </div>
                <div class="flex items-center gap-2">
                  <button type="button" class="rounded-lg border border-white/8 bg-white/3 px-3 py-2 text-xs text-stone-200" data-action="move-up" data-uid="${exercise.uid}">${t('up')}</button>
                  <button type="button" class="rounded-lg border border-white/8 bg-white/3 px-3 py-2 text-xs text-stone-200" data-action="move-down" data-uid="${exercise.uid}">${t('down')}</button>
                  <button type="button" class="rounded-lg border border-white/8 bg-rose-500/10 px-3 py-2 text-xs text-rose-300" data-action="remove" data-uid="${exercise.uid}">${t('remove')}</button>
                </div>
              </div>
              <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                ${inputField('sets', t('sets'), exercise.sets, exercise.uid)}
                ${inputField('reps', t('reps'), exercise.reps, exercise.uid)}
                ${inputField('rest', t('rest'), exercise.rest, exercise.uid)}
                ${inputField('target', t('target'), exercise.target, exercise.uid)}
              </div>
            </div>`).join('')
          : `<div class="program-state-card rounded-2xl p-5 text-sm text-stone-300">${t('empty')}</div>`;

        const libraryMarkup = filteredLibrary().length
          ? filteredLibrary().map((exercise) => `
            <div class="program-exercise-card rounded-2xl p-4 flex items-start justify-between gap-4">
              <div>
                <div class="font-bold text-white">${exercise.name}</div>
                <div class="mt-1 text-xs text-stone-400">${exercise.equipment} • ${exercise.muscle}</div>
                <div class="mt-2 text-xs text-stone-500">${exercise.sets} sets • ${exercise.reps} reps • ${exercise.rest} rest</div>
              </div>
              <button type="button" class="report-cta px-4 py-2 text-sm font-semibold" data-action="add-exercise" data-exercise-id="${exercise.id}">${t('add')}</button>
            </div>`).join('')
          : `<div class="program-state-card rounded-2xl p-5 text-sm text-stone-300">${t('noResults')}</div>`;

        panel.innerHTML = `
          <div class="program-customizer-shell" role="document">
            <div class="program-customizer-head p-4 md:p-5 flex items-center justify-between gap-3">
              <div>
                <div class="text-gold text-xs font-bold uppercase tracking-[0.28em]">${t('button')}</div>
                <h2 class="text-2xl font-black text-white mt-1">${t('title')}</h2>
              </div>
              <button type="button" class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-stone-200" data-action="close">${t('close')}</button>
            </div>
            <div class="program-customizer-body p-4 md:p-5 space-y-5">
              <section class="program-customizer-section p-4 md:p-5 space-y-4">
                <div class="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div class="text-stone-400 text-xs uppercase tracking-[0.24em]">${t('days')}</div>
                    <div class="text-lg font-bold text-white">${active ? active.name : t('emptyPlan')}</div>
                  </div>
                  <button type="button" class="report-cta px-4 py-2 text-sm font-semibold" data-action="add-day">${t('addDay')}</button>
                </div>
                <p class="text-sm text-stone-400">Choose a day, then add workouts from the library below.</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${daysMarkup}</div>
              </section>

              <section class="program-customizer-section p-4 md:p-5 space-y-4">
                <div class="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div class="text-stone-400 text-xs uppercase tracking-[0.24em]">${t('library')}</div>
                    <div class="text-lg font-bold text-white">Pick workouts for this plan</div>
                  </div>
                  <input type="search" class="glass w-full sm:w-80 rounded-xl px-4 py-3 bg-transparent text-white placeholder:text-stone-500 focus-visible-ring" placeholder="${t('search')}" value="${state.search}" data-action="search-input" />
                </div>
                <div class="grid gap-3 md:grid-cols-2">${libraryMarkup}</div>
              </section>

              <section class="program-customizer-section p-4 md:p-5 space-y-4">
                <div class="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div class="text-stone-400 text-xs uppercase tracking-[0.24em]">${t('selected')}</div>
                    <div class="text-lg font-bold text-white">${active ? active.name : t('emptyPlan')}</div>
                  </div>
                  <button type="button" class="report-cta px-4 py-2 text-sm font-semibold" data-action="save">${t('save')}</button>
                </div>
                <div class="space-y-3">${exercisesMarkup}</div>
              </section>
            </div>
          </div>`;
      };

      const open = () => {
        const backdrop = document.getElementById('programCustomizerBackdrop');
        const panel = document.getElementById('programCustomizerPanel');
        if (!backdrop || !panel) return;
        state.open = true;
        backdrop.classList.add('is-open');
        panel.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        renderPanel();
      };

      const close = () => {
        const backdrop = document.getElementById('programCustomizerBackdrop');
        const panel = document.getElementById('programCustomizerPanel');
        if (!backdrop || !panel) return;
        state.open = false;
        backdrop.classList.remove('is-open');
        panel.classList.remove('is-open');
        document.body.style.overflow = '';
      };

      const addDay = () => {
        const dayNumber = state.days.length + 1;
        const day = {
          id: `day-${Date.now()}`,
          name: state.lang === 'ar' ? `اليوم ${dayNumber}` : `Day ${dayNumber}`,
          focus: state.lang === 'ar' ? 'تمرين مخصص' : 'Custom workout',
          exercises: [],
        };
        state.days.push(day);
        state.activeDayId = day.id;
        save();
        render();
        renderPanel();
      };

      const addExercise = (exerciseId) => {
        const template = exercises.find((item) => item.id === exerciseId);
        const day = activeDay();
        if (!template || !day) return;
        day.exercises.push(createExercise(template));
        save();
        renderPanel();
        renderMount();
      };

      const removeExercise = (uid) => {
        const day = activeDay();
        if (!day) return;
        day.exercises = day.exercises.filter((exercise) => exercise.uid !== uid);
        save();
        renderPanel();
        renderMount();
      };

      const moveExercise = (uid, direction) => {
        const day = activeDay();
        if (!day) return;
        const index = day.exercises.findIndex((exercise) => exercise.uid === uid);
        const targetIndex = index + direction;
        if (index < 0 || targetIndex < 0 || targetIndex >= day.exercises.length) return;
        const [item] = day.exercises.splice(index, 1);
        day.exercises.splice(targetIndex, 0, item);
        save();
        renderPanel();
      };

      const updateExerciseField = (uid, field, value) => {
        const day = activeDay();
        if (!day) return;
        const exercise = day.exercises.find((item) => item.uid === uid);
        if (!exercise) return;
        exercise[field] = value;
      };

      const bindHandlers = () => {
        if (document.body.dataset.programCustomizerBound === '1') return;
        document.body.dataset.programCustomizerBound = '1';

        document.addEventListener('click', (event) => {
          const trigger = event.target.closest('[data-action], [data-open-program-customizer], [data-day-id]');
          if (!trigger) return;

          if (trigger.hasAttribute('data-open-program-customizer')) {
            open();
            return;
          }

          const action = trigger.getAttribute('data-action');
          const dayId = trigger.getAttribute('data-day-id');
          const exerciseId = trigger.getAttribute('data-exercise-id');
          const uid = trigger.getAttribute('data-uid');

          if (dayId) {
            state.activeDayId = dayId;
            save();
            renderPanel();
            renderMount();
            return;
          }

          switch (action) {
            case 'close':
              close();
              break;
            case 'add-day':
              addDay();
              break;
            case 'add-exercise':
              addExercise(exerciseId);
              break;
            case 'remove':
              removeExercise(uid);
              break;
            case 'move-up':
              moveExercise(uid, -1);
              break;
            case 'move-down':
              moveExercise(uid, 1);
              break;
            case 'save':
              save();
              break;
            default:
              break;
          }
        });

        document.addEventListener('input', (event) => {
          const target = event.target;
          if (target.matches('[data-action="search-input"]')) {
            state.search = target.value;
            renderPanel();
          }
        });

        document.addEventListener('change', (event) => {
          const target = event.target;
          if (!target.matches('[data-action="edit-field"]')) return;
          updateExerciseField(target.getAttribute('data-uid'), target.getAttribute('data-field'), target.value);
          save();
          renderPanel();
        });

        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && state.open) close();
        });

        const backdrop = document.getElementById('programCustomizerBackdrop');
        if (backdrop) backdrop.addEventListener('click', close);
      };

      const render = () => {
        renderMount();
        if (state.open) renderPanel();
      };

      const init = () => {
        if (!document.body || document.getElementById('programCustomizerRoot')) return;
        load();

        const root = document.createElement('div');
        root.id = 'programCustomizerRoot';
        root.innerHTML = `
          <div id="programCustomizerBackdrop" class="program-customizer-backdrop" aria-hidden="true"></div>
          <div id="programCustomizerPanel" class="program-customizer-panel" role="dialog" aria-modal="true" aria-label="${t('title')}"></div>`;
        document.body.appendChild(root);

        bindHandlers();
        render();
        state.loading = false;
      };

      return { init, open, close };
    })();

    window.ProgramCustomizer = ProgramCustomizer;
  const renderDayEditor = (day) => {
    if (!day) {
      return `<div class="rounded-3xl border border-dashed border-white/10 bg-white/3 p-5 text-sm text-stone-400">${t('noDays')}</div>`;
    }

    const dayEmpty = !day.exercises.length;
    const stats = getDayStats(day);

    return `
      <div class="rounded-[1.5rem] border border-white/8 bg-black/25 p-4 md:p-5">
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1">
            <label class="block text-xs uppercase tracking-[0.24em] text-stone-400">${t('day')}</label>
            <input data-day-name-input value="${day.name.replace(/"/g, '&quot;')}" class="mt-2 w-full rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-white placeholder:text-stone-500 focus-visible-ring" />
          </div>
          <button type="button" data-delete-day="${day.id}" class="rounded-2xl border border-white/8 bg-white/5 px-3 py-2 text-xs text-stone-300 hover:border-rose-400/40 hover:text-rose-300 fast-trans">${t('remove')}</button>
        </div>

        <div class="mt-4 grid grid-cols-3 gap-3 text-xs text-stone-300">
          <div class="rounded-2xl border border-white/8 bg-white/3 p-3"><div class="text-stone-400 uppercase tracking-[0.2em]">${t('setLabel')}</div><div class="mt-1 text-lg font-semibold text-white">${stats.sets}</div></div>
          <div class="rounded-2xl border border-white/8 bg-white/3 p-3"><div class="text-stone-400 uppercase tracking-[0.2em]">Exercises</div><div class="mt-1 text-lg font-semibold text-white">${stats.exercises}</div></div>
          <div class="rounded-2xl border border-white/8 bg-white/3 p-3"><div class="text-stone-400 uppercase tracking-[0.2em]">${t('restLabel')}</div><div class="mt-1 text-lg font-semibold text-white">${stats.rest}s</div></div>
        </div>

        <div class="mt-4 space-y-3">
          ${dayEmpty ? `<div class="rounded-2xl border border-dashed border-white/10 bg-white/3 px-4 py-6 text-center text-sm text-stone-400">${t('emptyDay')}</div>` : day.exercises.map((exercise, index) => `
            <article class="rounded-2xl border border-white/8 bg-white/3 p-4">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="font-semibold text-white">${exercise.name}</div>
                  <div class="mt-1 text-xs text-stone-400">${exercise.muscle} • ${exercise.equipment}</div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button type="button" data-move-exercise="${exercise.id}" data-direction="-1" class="rounded-xl border border-white/8 bg-white/5 px-3 py-1.5 text-[11px] text-stone-200">${t('up')}</button>
                  <button type="button" data-move-exercise="${exercise.id}" data-direction="1" class="rounded-xl border border-white/8 bg-white/5 px-3 py-1.5 text-[11px] text-stone-200">${t('down')}</button>
                  <button type="button" data-remove-exercise="${exercise.id}" class="rounded-xl border border-white/8 bg-white/5 px-3 py-1.5 text-[11px] text-stone-200">${t('remove')}</button>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <label class="space-y-1">
                  <span class="text-xs uppercase tracking-[0.18em] text-stone-400">${t('setLabel')}</span>
                  <input data-edit-field="sets" data-exercise-id="${exercise.id}" value="${exercise.sets}" class="w-full rounded-xl border border-white/8 bg-black/25 px-3 py-2 text-white focus-visible-ring" />
                </label>
                <label class="space-y-1">
                  <span class="text-xs uppercase tracking-[0.18em] text-stone-400">${t('repLabel')}</span>
                  <input data-edit-field="reps" data-exercise-id="${exercise.id}" value="${exercise.reps}" class="w-full rounded-xl border border-white/8 bg-black/25 px-3 py-2 text-white focus-visible-ring" />
                </label>
                <label class="space-y-1">
                  <span class="text-xs uppercase tracking-[0.18em] text-stone-400">${t('restLabel')}</span>
                  <input data-edit-field="rest" data-exercise-id="${exercise.id}" value="${exercise.rest}" class="w-full rounded-xl border border-white/8 bg-black/25 px-3 py-2 text-white focus-visible-ring" />
                </label>
                <label class="space-y-1">
                  <span class="text-xs uppercase tracking-[0.18em] text-stone-400">${t('muscleLabel')}</span>
                  <input data-edit-field="muscle" data-exercise-id="${exercise.id}" value="${exercise.muscle}" class="w-full rounded-xl border border-white/8 bg-black/25 px-3 py-2 text-white focus-visible-ring" />
                </label>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  };

  const renderAssignedSummary = (highlight = false) => {
    const mount = document.getElementById('assignedProgramsMount');
    if (!mount) return;

    const program = getCurrentProgram();
    const totalExercises = program.days.reduce((count, day) => count + day.exercises.length, 0);
    const totalSets = program.days.reduce((count, day) => count + day.exercises.reduce((daySets, exercise) => daySets + Number(exercise.sets || 0), 0), 0);
    const updatedLabel = program.updatedAt ? new Date(program.updatedAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : t('saved');

    mount.innerHTML = `
      <div class="glass rounded-3xl p-6 border border-white/8 ${highlight ? 'ring-2 ring-gold/30' : ''}">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div class="text-gold text-xs font-bold uppercase tracking-[0.24em]">${t('selected')}</div>
            <h2 class="mt-2 text-2xl font-black text-white">${getProgramTitle(program.programId)}</h2>
            <p class="mt-1 text-sm text-stone-400">${program.days.length} workout days • ${totalExercises} exercises • ${totalSets} total sets</p>
          </div>
          <div class="flex flex-wrap items-center gap-2 text-xs text-stone-300">
            <span class="rounded-full border border-white/8 bg-white/5 px-3 py-1.5">${t('userBadge')}</span>
            <span class="rounded-full border border-white/8 bg-white/5 px-3 py-1.5">${updatedLabel}</span>
          </div>
        </div>
      </div>
    `;
  };

  const renderDrawer = () => {
    const drawer = document.getElementById('programCustomizerDrawer');
    if (!drawer) return;
    const program = getCurrentProgram();
    const day = program.days.find((item) => item.id === appState.selectedDayId) || program.days[0];
    const programOptions = PROGRAMS.map((programOption) => `<option value="${programOption.id}" ${programOption.id === program.programId ? 'selected' : ''}>${programOption.title}</option>`).join('');

    drawer.innerHTML = `
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div class="absolute inset-y-0 right-0 w-full max-w-5xl bg-[#09090a] border-l border-white/8 shadow-[0_40px_120px_rgba(0,0,0,0.6)] flex flex-col">
        <div class="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-4 md:px-6">
          <div>
            <div class="text-gold text-xs font-bold uppercase tracking-[0.24em]">${t('title')}</div>
            <h2 class="mt-1 text-xl md:text-2xl font-black text-white">${t('customize')}</h2>
            <p class="text-sm text-stone-400">${t('subtitle')}</p>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" data-save-program class="rounded-2xl bg-gradient-to-r from-gold to-amber-200 px-4 py-2.5 font-semibold text-black shadow-[0_16px_35px_rgba(245,176,65,0.22)]">${t('save')}</button>
            <button type="button" data-close-program-customizer class="rounded-2xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm text-stone-200">${t('close')}</button>
          </div>
        </div>

        ${appState.loading ? `<div class="flex-1 p-5 md:p-6"><div class="grid gap-4 md:grid-cols-[1.1fr_1fr]"><div class="rounded-3xl border border-white/8 bg-white/3 p-5 animate-pulse"><div class="h-5 w-36 rounded bg-white/10"></div><div class="mt-4 h-10 rounded-2xl bg-white/10"></div><div class="mt-4 space-y-3"><div class="h-24 rounded-2xl bg-white/10"></div><div class="h-24 rounded-2xl bg-white/10"></div><div class="h-24 rounded-2xl bg-white/10"></div></div></div><div class="rounded-3xl border border-white/8 bg-white/3 p-5 animate-pulse"><div class="h-5 w-32 rounded bg-white/10"></div><div class="mt-4 h-10 rounded-2xl bg-white/10"></div><div class="mt-4 h-32 rounded-2xl bg-white/10"></div><div class="mt-4 h-48 rounded-2xl bg-white/10"></div></div></div></div>` : `
+        <div class="flex-1 overflow-y-auto p-5 md:p-6">
+          <div class="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
+            <div class="space-y-5">
+              <section class="rounded-3xl border border-white/8 bg-white/3 p-5">
+                <div class="flex items-center justify-between gap-3">
+                  <div>
+                    <div class="text-stone-400 text-xs uppercase tracking-[0.24em]">${t('program')}</div>
+                    <h3 class="mt-1 text-lg font-black text-white">${getProgramTitle(program.programId)}</h3>
+                  </div>
+                  <span class="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">${program.days.length} days</span>
+                </div>
+                <label class="mt-4 block text-sm text-stone-300">
+                  <span class="text-xs uppercase tracking-[0.2em] text-stone-400">${t('program')}</span>
+                  <select data-program-select class="mt-2 w-full rounded-2xl border border-white/8 bg-black/25 px-4 py-3 text-white focus-visible-ring">
+                    ${programOptions}
+                  </select>
+                </label>
+              </section>
+
+              <section class="rounded-3xl border border-white/8 bg-white/3 p-5">
+                <div class="flex items-center justify-between gap-3">
+                  <div>
+                    <div class="text-stone-400 text-xs uppercase tracking-[0.24em]">${t('day')}</div>
+                    <h3 class="mt-1 text-lg font-black text-white">Workout Days</h3>
+                  </div>
+                  <button type="button" data-add-day class="rounded-2xl border border-gold/30 bg-gold/10 px-3 py-2 text-sm font-semibold text-gold">${t('addDay')}</button>
+                </div>
+                <div class="mt-4 flex flex-wrap gap-2">
+                  ${program.days.map((item) => `<button type="button" data-day-pill="${item.id}" class="rounded-full border px-4 py-2 text-sm ${item.id === day?.id ? 'border-gold/30 bg-gold/10 text-gold' : 'border-white/8 bg-white/5 text-stone-300'}">${item.name}</button>`).join('')}
+                </div>
+              </section>
+
+              <section class="rounded-3xl border border-white/8 bg-white/3 p-5">
+                <div class="flex items-center justify-between gap-3">
+                  <div>
+                    <div class="text-stone-400 text-xs uppercase tracking-[0.24em]">${t('library')}</div>
+                    <h3 class="mt-1 text-lg font-black text-white">Exercise Library</h3>
+                  </div>
+                  <span class="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-stone-300">${EXERCISES.length} items</span>
+                </div>
+                <input data-library-search type="search" value="${appState.query.replace(/"/g, '&quot;')}" placeholder="${t('search')}" class="mt-4 w-full rounded-2xl border border-white/8 bg-black/25 px-4 py-3 text-white placeholder:text-stone-500 focus-visible-ring" />
+                <div class="mt-4 max-h-[24rem] space-y-3 overflow-y-auto pr-1">${renderLibrary()}</div>
+              </section>
+            </div>
+
+            <section class="rounded-3xl border border-white/8 bg-white/3 p-5">
+              <div class="flex items-center justify-between gap-3">
+                <div>
+                  <div class="text-stone-400 text-xs uppercase tracking-[0.24em]">${t('selected')}</div>
+                  <h3 class="mt-1 text-lg font-black text-white">${day ? day.name : t('noDays')}</h3>
+                </div>
+                <span class="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-stone-300">${day?.exercises.length || 0} exercises</span>
+              </div>
+              <div class="mt-4">${renderDayEditor(day)}</div>
+            </section>
+          </div>
+        </div>`}
+
+        <div class="border-t border-white/8 px-5 py-4 md:px-6 text-sm text-stone-400">
+          ${t('saved')}
+        </div>
+      </div>
+    `;
+  };
+
+  const ensureDrawer = () => {
+    if (document.getElementById('programCustomizerDrawer')) return;
+    const drawer = document.createElement('div');
+    drawer.id = 'programCustomizerDrawer';
+    drawer.className = 'fixed inset-0 z-[70] hidden';
+    document.body.appendChild(drawer);
+
+    drawer.addEventListener('click', (event) => {
+      if (event.target.closest('[data-close-program-customizer]') || event.target.id === 'programCustomizerDrawer') {
+        closeDrawer();
+      }
+    });
+  };
+
+  const openDrawer = (programId) => {
+    ensureDrawer();
+    appState.open = true;
+    appState.loading = true;
+    appState.selectedProgramId = programId || appState.selectedProgramId || PROGRAMS[0].id;
+    const program = ensureProgram(appState.selectedProgramId);
+    appState.selectedDayId = appState.selectedDayId || program.days[0]?.id || null;
+    document.body.style.overflow = 'hidden';
+    const drawer = document.getElementById('programCustomizerDrawer');
+    drawer.classList.remove('hidden');
+    renderDrawer();
+    window.setTimeout(() => {
+      appState.loading = false;
+      renderDrawer();
+      bindDrawerEvents();
+    }, 220);
+  };
+
+  const closeDrawer = () => {
+    const drawer = document.getElementById('programCustomizerDrawer');
+    if (!drawer) return;
+    appState.open = false;
+    document.body.style.overflow = '';
+    drawer.classList.add('hidden');
+  };
+
+  const bindDrawerEvents = () => {
+    const drawer = document.getElementById('programCustomizerDrawer');
+    if (!drawer) return;
+
+    drawer.querySelector('[data-program-select]')?.addEventListener('change', (event) => setSelectedProgram(event.target.value));
+    drawer.querySelector('[data-add-day]')?.addEventListener('click', addDay);
+    drawer.querySelectorAll('[data-day-pill]').forEach((button) => button.addEventListener('click', () => setSelectedDay(button.dataset.dayPill)));
+    drawer.querySelector('[data-library-search]')?.addEventListener('input', (event) => {
+      appState.query = event.target.value;
+      renderDrawer();
+      bindDrawerEvents();
+    });
+    drawer.querySelectorAll('[data-add-exercise]').forEach((button) => button.addEventListener('click', () => {
+      const exercise = JSON.parse(button.dataset.addExercise.replace(/&apos;/g, "'"));
+      addExercise(exercise);
+    }));
+    drawer.querySelectorAll('[data-day-name-input]').forEach((input) => input.addEventListener('input', (event) => updateDayName(appState.selectedDayId, event.target.value)));
+    drawer.querySelectorAll('[data-delete-day]').forEach((button) => button.addEventListener('click', () => deleteDay(button.dataset.deleteDay)));
+    drawer.querySelectorAll('[data-remove-exercise]').forEach((button) => button.addEventListener('click', () => removeExercise(button.dataset.removeExercise)));
+    drawer.querySelectorAll('[data-move-exercise]').forEach((button) => button.addEventListener('click', () => moveExercise(button.dataset.moveExercise, Number(button.dataset.direction))))
+    drawer.querySelectorAll('[data-edit-field]').forEach((input) => input.addEventListener('input', (event) => updateExercise(event.target.dataset.exerciseId, event.target.dataset.editField, event.target.value)));
+    drawer.querySelector('[data-save-program]')?.addEventListener('click', () => {
+      saveCurrentProgram();
+      closeDrawer();
+    });
+  };
+
+  const renderTrigger = () => {
+    const trigger = document.querySelector('[data-program-customizer-trigger]');
+    if (!trigger) return;
+    trigger.textContent = t('customize');
+    trigger.addEventListener('click', () => openDrawer(getProgramIdFromButton(trigger)));
+  };
+
+  const renderAssignedSummaryIfNeeded = () => {
+    const mount = document.getElementById('assignedProgramsMount');
+    if (!mount) return;
+    renderAssignedSummary();
+  };
+
+  const init = () => {
+    const trigger = document.querySelector('[data-program-customizer-trigger]');
+    const mount = document.getElementById('assignedProgramsMount');
+    if (!trigger && !mount) return;
+
+    appState.userKey = slugify(getUserName());
+    appState.store = readStore();
+    appState.selectedProgramId = PROGRAMS[0].id;
+    ensureProgram(appState.selectedProgramId);
+
+    renderTrigger();
+    renderAssignedSummaryIfNeeded();
+    persistStore();
+  };
+
+  return { init };
+})();
+
+window.ProgramCustomizer = ProgramCustomizer;
+
*** End of content