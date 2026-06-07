
  // Exercise data organized by category
  const muscleVideoMap = {
    chest: { src: 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495622/bush2_rlkjzu.mp4', label: 'Active: Chest', focus: 'Push pattern' },
    'upper chest': { src: 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495622/bush2_rlkjzu.mp4', label: 'Active: Upper Chest', focus: 'Push pattern' },
    shoulders: { src: 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495622/bush2_rlkjzu.mp4', label: 'Active: Shoulders', focus: 'Pressing' },
    shoulder: { src: 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495622/bush2_rlkjzu.mp4', label: 'Active: Shoulder', focus: 'Pressing' },
    triceps: { src: 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495622/bush2_rlkjzu.mp4', label: 'Active: Triceps', focus: 'Push pattern' },
    back: { src: 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495622/bush2_rlkjzu.mp4', label: 'Active: Back', focus: 'Pull pattern' },
    lats: { src: 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495622/bush2_rlkjzu.mp4', label: 'Active: Lats', focus: 'Pull pattern' },
    'rear delts': { src: 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495622/bush2_rlkjzu.mp4', label: 'Active: Rear Delts', focus: 'Pull pattern' },
    biceps: { src: 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495622/bush2_rlkjzu.mp4', label: 'Active: Biceps', focus: 'Pull pattern' },
    'quads & glutes': { src: 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495622/bush2_rlkjzu.mp4', label: 'Active: Legs', focus: 'Lower body' },
    quads: { src: 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495622/bush2_rlkjzu.mp4', label: 'Active: Legs', focus: 'Lower body' },
    hamstrings: { src: 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495622/bush2_rlkjzu.mp4', label: 'Active: Legs', focus: 'Lower body' }
  };

  function setMuscleVisualization(exercise) {
    const videoEl = document.getElementById('muscleVideo');
    const labelEl = document.getElementById('muscleActiveLabel');
    const focusEl = document.getElementById('muscleSessionFocus');
    if (!videoEl || !labelEl || !focusEl || !exercise) return;

    const key = (exercise.target || '').toLowerCase();
    const muscleState = muscleVideoMap[key] || muscleVideoMap.shoulder;
    videoEl.src = muscleState.src;
    try { videoEl.load(); videoEl.play().catch(() => {}); } catch (error) {}
    labelEl.textContent = muscleState.label;
    focusEl.textContent = muscleState.focus;
  }

  function getDetailVideo(exercise) {
    const target = (exercise.target || '').toLowerCase();
    if (target.includes('back') || target.includes('lat') || target.includes('rear delt') || target.includes('biceps')) return 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495645/Back_xndmi1.mp4';
    if (target.includes('quads') || target.includes('hamstring') || target.includes('glute') || target.includes('leg')) return 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495622/bush2_rlkjzu.mp4';
    return 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495645/Back_xndmi1.mp4';
  }

  function openTutorialModal(src, title, subtitle) {
    const modal = document.getElementById('tutorialModal');
    const videoEl = modal.querySelector('video');
    const playerWrap = videoEl.parentElement;
    const sourceEl = videoEl.querySelector('source');
    const existingIframe = playerWrap.querySelector('iframe');

    modal.querySelector('.text-white.font-bold') && (modal.querySelector('.text-white.font-bold').textContent = title || 'Exercise Tutorial');
    modal.querySelector('.text-stone-400') && (modal.querySelector('.text-stone-400').textContent = subtitle || 'Video and pointers');

    if (existingIframe) existingIframe.remove();
    videoEl.style.display = 'block';
    videoEl.setAttribute('controls', '');
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('webkit-playsinline', '');
    if (sourceEl) sourceEl.src = src || 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495645/Back_xndmi1.mp4';
    try {
      videoEl.currentTime = 0;
      videoEl.load();
      videoEl.play().catch(() => {});
    } catch (error) {}

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.innerWidth <= 640) modal.classList.add('mobile'); else modal.classList.remove('mobile');
  }

  function closeTutorialModal() {
    const modal = document.getElementById('tutorialModal');
    const videoEl = modal.querySelector('video');
    const playerWrap = videoEl.parentElement;
    const sourceEl = videoEl.querySelector('source');

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.classList.remove('mobile');

    try { videoEl.pause(); } catch (error) {}
    try { videoEl.currentTime = 0; } catch (error) {}
    if (sourceEl) sourceEl.src = '';
    const existingIframe = playerWrap.querySelector('iframe');
    if (existingIframe) existingIframe.remove();
    videoEl.style.display = 'block';
  }

  function parseRestSeconds(restValue) {
    const parsed = parseInt(String(restValue).replace(/[^0-9]/g, ''), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function formatRestLabel(secondsLeft) {
    if (!Number.isFinite(secondsLeft) || secondsLeft <= 0) return 'Ready';
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}s`;
  }

  const workoutStartBtn = document.getElementById('startWorkout');
  const workoutResumeBtn = document.getElementById('resumeWorkout');
  const restCountdownEl = document.getElementById('restCountdown');
  const activeExerciseLabelEl = document.getElementById('activeExerciseLabel');
  const completedSetsEl = document.getElementById('completedSets');
  const totalSetsEl = document.getElementById('totalSets');

  let restTimer = null;
  let restRemaining = 0;
  let restTotal = 0;
  let activeRestCard = null;

  function stopRestTimer() {
    if (restTimer) {
      clearInterval(restTimer);
      restTimer = null;
    }
  }

  function updateRestPanel(card, secondsLeft) {
    if (restCountdownEl) restCountdownEl.textContent = formatRestLabel(secondsLeft);
    if (activeExerciseLabelEl) activeExerciseLabelEl.textContent = card ? `${card.dataset.name} • Rest ${card.dataset.restLabel}` : 'Tap Start';

    const restBar = document.getElementById('restTimeBar');
    if (restBar) {
      const total = Math.max(1, restTotal || secondsLeft || 0);
      const percent = card && total ? Math.max(0, Math.min(100, (secondsLeft / total) * 100)) : 0;
      restBar.style.width = percent + '%';
    }
  }

  function startRestTimer(card) {
    if (!card) return;
    stopRestTimer();
    activeRestCard = card;
    restRemaining = parseRestSeconds(card.dataset.rest);
    restTotal = restRemaining;
    updateRestPanel(card, restRemaining);
    if (restRemaining <= 0) return;

    restTimer = setInterval(() => {
      restRemaining -= 1;
      if (restRemaining <= 0) {
        restRemaining = 0;
        stopRestTimer();
        updateRestPanel(activeRestCard, restRemaining);
        showAchievement('Rest Complete', `${activeRestCard.dataset.name} is ready for the next set`);
        return;
      }
      updateRestPanel(activeRestCard, restRemaining);
    }, 1000);
  }

  function getExerciseCards() {
    return Array.from(document.querySelectorAll('.exercise-card'));
  }

  function getFirstPendingCard() {
    return getExerciseCards().find(card => (Number(card.dataset.completedSets) || 0) < (Number(card.dataset.sets) || 0)) || getExerciseCards()[0] || null;
  }

  function resetWorkoutSession() {
    stopRestTimer();
    restRemaining = 0;
    restTotal = 0;
    activeRestCard = null;
    if (workoutStartBtn) workoutStartBtn.textContent = 'Start Workout';
    if (workoutResumeBtn) workoutResumeBtn.textContent = 'Resume Rest';
    updateRestPanel(null, 0);
  }

  function updateCounts() {
    const cards = getExerciseCards();
    const total = cards.length;
    const totalSets = cards.reduce((sum, card) => sum + (Number(card.dataset.sets) || 0), 0);
    const completedSets = cards.reduce((sum, card) => sum + (Number(card.dataset.completedSets) || 0), 0);

    document.getElementById('completedCount').textContent = completedSets;
    document.getElementById('remainingCount').textContent = Math.max(0, totalSets - completedSets);
    if (completedSetsEl) completedSetsEl.textContent = completedSets;
    if (totalSetsEl) totalSetsEl.textContent = totalSets;

    cards.forEach(card => {
      const progressEl = card.querySelector('.set-progress');
      const exerciseSets = Number(card.dataset.sets) || 0;
      const exerciseCompletedSets = Number(card.dataset.completedSets) || 0;
      if (progressEl) progressEl.textContent = `Sets ${exerciseCompletedSets}/${exerciseSets}`;
    });

    const pct = totalSets ? Math.round((completedSets / totalSets) * 100) : 0;
    document.getElementById('progressPct').textContent = pct + '%';
    const arc = document.getElementById('progArc');
    const dash = (pct / 100) * 100;
    arc.setAttribute('stroke-dasharray', dash + ' 100');
  }

  const exerciseData = {
    'Push Day': [
      { name: 'Barbell Bench Press', target: 'Chest', sets: 4, reps: '6-8', rest: '90s', weight: 80, image: 'assets/img/exercises/img1.png', instructions: 'Lie flat on bench, grip slightly wider than shoulder. Lower bar to chest under control, pause briefly, and press up explosively.', mistakes: ['Flared elbows', 'Bouncing off chest'], safety: ['Use spotter for heavy sets', 'Control tempo'], machine: 'M-231' },
      { name: 'Incline Dumbbell Press', target: 'Upper Chest', sets: 4, reps: '8-10', rest: '90s', weight: 35, image: 'assets/img/exercises/exersice.png', instructions: 'Set bench to 45° angle, press dumbbells upward and inward in controlled motion.', mistakes: ['Dropping dumbbells', 'Uneven press'], safety: ['Secure dumbbells grip', 'No swinging'], machine: 'N/A' },
      { name: 'Tricep Dips', target: 'Triceps', sets: 3, reps: '8-12', rest: '60s', weight: 'Bodyweight', image: 'assets/img/exercises/exersice5.png', instructions: 'Use parallel bars, lower body until elbows are 90°, then press back up explosively.', mistakes: ['Excessive forward lean', 'Incomplete range'], safety: ['Use dip belt for weight', 'Maintain upright posture'], machine: 'M-245' },
      { name: 'Lateral Raises', target: 'Shoulders', sets: 3, reps: '12-15', rest: '45s', weight: 15, image: 'assets/img/exercises/excersice4.png', instructions: 'Stand with dumbbells at sides, raise arms to shoulder height with slight bend.', mistakes: ['Jerky movements', 'Too heavy weight'], safety: ['Controlled tempo', 'No momentum'], machine: 'N/A' }
    ],
    'Pull Day': [
      { name: 'Bent-over Barbell Row', target: 'Back', sets: 4, reps: '6-8', rest: '90s', weight: 100, image: 'assets/img/exercises/image2.png', instructions: 'Hinge at hips, keep a flat back, pull bar towards lower ribs with explosive force.', mistakes: ['Rounded back', 'Bar path deviation'], safety: ['Warm up thoroughly', 'Use lifting belt'], machine: 'M-312' },
      { name: 'Pull-ups', target: 'Lats', sets: 4, reps: '8-12', rest: '90s', weight: 'Bodyweight', image: 'assets/img/exercises/exersice2.png', instructions: 'Grip bar shoulder-width apart, pull body up until chest touches bar, control descent.', mistakes: ['Partial range', 'Kipping'], safety: ['Assisted if needed', 'Controlled negatives'], machine: 'M-156' },
      { name: 'Face Pulls', target: 'Rear Delts', sets: 3, reps: '12-15', rest: '60s', weight: 30, image: 'assets/img/exercises/excersice4.png', instructions: 'Use rope attachment, pull towards face while elbows high, squeeze rear delts.', mistakes: ['Too heavy', 'Low elbow position'], safety: ['Shoulder friendly', 'Light weight'], machine: 'M-289' },
      { name: 'Barbell Curl', target: 'Biceps', sets: 3, reps: '8-10', rest: '60s', weight: 50, image: 'assets/img/exercises/exersice5.png', instructions: 'Stand with bar at thighs, curl upward keeping elbows locked at sides.', mistakes: ['Swinging bar', 'Moving elbows'], safety: ['No momentum', 'Controlled tempo'], machine: 'N/A' }
    ],
    'Leg Day': [
      { name: 'Barbell Back Squat', target: 'Quads & Glutes', sets: 4, reps: '6-8', rest: '120s', weight: 140, image: 'assets/img/exercises/exersice.png', instructions: 'Bar across upper back, squat until thighs parallel, drive through heels to stand.', mistakes: ['Forward knee cave', 'Excessive lean'], safety: ['Use rack', 'Spotter recommended', 'Tight core'], machine: 'M-401' },
      { name: 'Romanian Deadlift', target: 'Hamstrings', sets: 4, reps: '6-8', rest: '90s', weight: 120, image: 'assets/img/exercises/image3.png', instructions: 'Keep legs nearly straight, hinge at hips, lower bar to shins, squeeze glutes to return.', mistakes: ['Rounding back', 'Bent knees'], safety: ['Maintain neutral spine', 'Light weight for form'], machine: 'M-445' },
      { name: 'Leg Press', target: 'Quads', sets: 3, reps: '8-12', rest: '60s', weight: 300, image: 'assets/img/exercises/exersice3.png', instructions: 'Feet shoulder-width on platform, lower weight under control, press through heels.', mistakes: ['Knees caving', 'Shallow depth'], safety: ['Full range of motion', 'Controlled descent'], machine: 'M-234' },
      { name: 'Leg Curl', target: 'Hamstrings', sets: 3, reps: '10-12', rest: '45s', weight: 80, image: 'assets/img/exercises/excersice4.png', instructions: 'Lie face down, curl weight towards glutes with controlled motion.', mistakes: ['Hip lift', 'Jerky movement'], safety: ['No swinging', 'Steady tempo'], machine: 'M-289' }
    ],
    'Upper Body': [
      { name: 'Barbell Bench Press', target: 'Chest', sets: 4, reps: '6-8', rest: '90s', weight: 80, image: 'assets/img/exercises/img1.png', instructions: 'Lie flat on bench, grip slightly wider than shoulder. Lower bar to chest under control, pause briefly, and press up explosively.', mistakes: ['Flared elbows', 'Bouncing off chest'], safety: ['Use spotter for heavy sets', 'Control tempo'], machine: 'M-231' },
      { name: 'Bent-over Barbell Row', target: 'Back', sets: 4, reps: '6-8', rest: '90s', weight: 100, image: 'assets/img/exercises/image2.png', instructions: 'Hinge at hips, keep a flat back, pull bar towards lower ribs with explosive force.', mistakes: ['Rounded back', 'Bar path deviation'], safety: ['Warm up thoroughly', 'Use lifting belt'], machine: 'M-312' },
      { name: 'Standing Overhead Press', target: 'Shoulders', sets: 4, reps: '6', rest: '120s', weight: 54, image: 'assets/img/exercises/excersice4.png', instructions: 'Engage core, drive bar overhead in a straight path, lower with control.', mistakes: ['Excessive arching', 'Forward bar path'], safety: ['Brace core', 'Light weight for form'], machine: 'N/A' },
      { name: 'Pull-ups', target: 'Lats', sets: 3, reps: '8-10', rest: '90s', weight: 'Bodyweight', image: 'assets/img/exercises/exersice2.png', instructions: 'Grip bar shoulder-width apart, pull body up until chest touches bar, control descent.', mistakes: ['Partial range', 'Kipping'], safety: ['Assisted if needed', 'Controlled negatives'], machine: 'M-156' }
    ],
    'Lower Body': [
      { name: 'Barbell Back Squat', target: 'Quads & Glutes', sets: 4, reps: '6-8', rest: '120s', weight: 140, image: 'assets/img/exercises/exersice.png', instructions: 'Bar across upper back, squat until thighs parallel, drive through heels to stand.', mistakes: ['Forward knee cave', 'Excessive lean'], safety: ['Use rack', 'Spotter recommended', 'Tight core'], machine: 'M-401' },
      { name: 'Romanian Deadlift', target: 'Hamstrings', sets: 4, reps: '6-8', rest: '90s', weight: 120, image: 'assets/img/exercises/image3.png', instructions: 'Keep legs nearly straight, hinge at hips, lower bar to shins, squeeze glutes to return.', mistakes: ['Rounding back', 'Bent knees'], safety: ['Maintain neutral spine', 'Light weight for form'], machine: 'M-445' },
      { name: 'Leg Press', target: 'Quads', sets: 3, reps: '8-12', rest: '60s', weight: 300, image: 'assets/img/exercises/exersice3.png', instructions: 'Feet shoulder-width on platform, lower weight under control, press through heels.', mistakes: ['Knees caving', 'Shallow depth'], safety: ['Full range of motion', 'Controlled descent'], machine: 'M-234' },
      { name: 'Leg Curl', target: 'Hamstrings', sets: 3, reps: '10-12', rest: '45s', weight: 80, image: 'assets/img/exercises/excersice4.png', instructions: 'Lie face down, curl weight towards glutes with controlled motion.', mistakes: ['Hip lift', 'Jerky movement'], safety: ['No swinging', 'Steady tempo'], machine: 'M-289' }
    ],
    'Full Body': [
      { name: 'Barbell Back Squat', target: 'Quads & Glutes', sets: 3, reps: '8', rest: '120s', weight: 120, image: 'assets/img/exercises/exersice.png', instructions: 'Bar across upper back, squat until thighs parallel, drive through heels to stand.', mistakes: ['Forward knee cave', 'Excessive lean'], safety: ['Use rack', 'Spotter recommended', 'Tight core'], machine: 'M-401' },
      { name: 'Barbell Bench Press', target: 'Chest', sets: 3, reps: '8', rest: '90s', weight: 70, image: 'assets/img/exercises/img1.png', instructions: 'Lie flat on bench, grip slightly wider than shoulder. Lower bar to chest under control, pause briefly, and press up explosively.', mistakes: ['Flared elbows', 'Bouncing off chest'], safety: ['Use spotter for heavy sets', 'Control tempo'], machine: 'M-231' },
      { name: 'Bent-over Barbell Row', target: 'Back', sets: 3, reps: '8', rest: '90s', weight: 90, image: 'assets/img/exercises/image2.png', instructions: 'Hinge at hips, keep a flat back, pull bar towards lower ribs with explosive force.', mistakes: ['Rounded back', 'Bar path deviation'], safety: ['Warm up thoroughly', 'Use lifting belt'], machine: 'M-312' },
      { name: 'Standing Overhead Press', target: 'Shoulders', sets: 3, reps: '8', rest: '90s', weight: 48, image: 'assets/img/exercises/excersice4.png', instructions: 'Engage core, drive bar overhead in a straight path, lower with control.', mistakes: ['Excessive arching', 'Forward bar path'], safety: ['Brace core', 'Light weight for form'], machine: 'N/A' }
    ]
  };

  // Render exercises for selected category
  function renderExercises(category) {
    const exerciseList = document.getElementById('exerciseList');
    const exercises = exerciseData[category] || [];

    resetWorkoutSession();
    
    exerciseList.innerHTML = exercises.map((ex, idx) => `
      <article class="exercise-card glass hover-lift fast-trans" data-target="${ex.target}" data-detail-video="${getDetailVideo(ex)}" data-name="${ex.name}" data-sets="${ex.sets}" data-completed-sets="0" data-rest="${parseRestSeconds(ex.rest)}" data-rest-label="${ex.rest}" style="padding:var(--card-pad)">
        <img src="${ex.image}" alt="${ex.name}" class="hero-shot object-cover border border-white/6" />

        <div class="exercise-head mt-3">
          <div class="min-w-0">
            <div class="exercise-name text-white truncate">${ex.name}</div>
            <div class="text-stone-400 mt-1" style="font-size:clamp(0.7rem,1.6vw,0.82rem)">Target: ${ex.target} • ${ex.reps} reps</div>
          </div>
          <div class="text-right">
            <div class="text-white font-bold">${ex.weight}${typeof ex.weight === 'string' ? '' : ' kg'}</div>
            <div class="text-stone-400" style="font-size:clamp(0.68rem,1.4vw,0.78rem)">Rest ${ex.rest}</div>
          </div>
        </div>

        <div class="exercise-chips mt-3">
          <span class="exercise-chip">Sets ${ex.sets}</span>
          <span class="exercise-chip">Machine ${ex.machine}</span>
          <span class="set-progress exercise-chip">Progress 0/${ex.sets}</span>
        </div>

        <div class="mt-3 flex items-center gap-2">
          <button class="set-btn flex-1 bg-gradient-to-br from-[#2b2b2b] to-[#0f0f0f] text-gold rounded-lg font-semibold" data-action="start-set" style="padding:clamp(0.5rem,1vw,0.62rem) clamp(0.7rem,2vw,0.9rem); font-size:clamp(0.72rem,1.5vw,0.82rem)">Start Set</button>
          <button class="expand-btn glass rounded-lg font-semibold" style="padding:clamp(0.5rem,1vw,0.62rem) clamp(0.75rem,2vw,0.9rem); font-size:clamp(0.72rem,1.5vw,0.82rem)">Details</button>
        </div>

        <div class="details accordion-enter fast-trans" style="margin-top:clamp(0.65rem,1.5vw,0.9rem)">
          <div class="text-stone-400">Instructions: ${ex.instructions}</div>
          <div class="grid grid-cols-1 md:grid-cols-2" style="margin-top:clamp(0.5rem,1vw,0.75rem); gap:var(--gap)">
            <div class="glass rounded-lg" style="padding:clamp(0.5rem,1.5vw,0.75rem)"><div class="text-stone-400">Common mistakes</div><ul class="text-stone-400" style="margin-top:clamp(0.25rem,0.75vw,0.5rem); font-size:clamp(0.65rem,1.5vw,0.75rem)">${ex.mistakes.map(m => `<li>${m}</li>`).join('')}</ul></div>
            <div class="glass rounded-lg" style="padding:clamp(0.5rem,1.5vw,0.75rem)"><div class="text-stone-400">Safety tips</div><ul class="text-stone-400" style="margin-top:clamp(0.25rem,0.75vw,0.5rem); font-size:clamp(0.65rem,1.5vw,0.75rem)">${ex.safety.map(s => `<li>${s}</li>`).join('')}</ul></div>
          </div>
          <div class="exercise-detail-video-wrap glass rounded-lg overflow-hidden" style="margin-top:clamp(0.5rem,1vw,0.75rem)">
            <video class="exercise-detail-video w-full object-contain bg-black" muted playsinline webkit-playsinline controls preload="metadata" poster="${ex.image}" style="max-height:clamp(10rem,30vw,14rem)">
              <source src="https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495645/Back_xndmi1.mp4" type="video/mp4" />
            </video>
          </div>
          <div class="flex flex-wrap items-center" style="margin-top:clamp(0.5rem,1vw,0.75rem); gap:clamp(0.25rem,1vw,0.5rem)">
            <button class="glass rounded-lg" style="padding:clamp(0.4rem,1vw,0.5rem) clamp(0.5rem,2vw,0.75rem); font-size:clamp(0.65rem,1.5vw,0.75rem)" data-action="qr">Scan QR</button>
            <button class="tutorial-btn glass rounded-lg" data-video="${ex.video || ('https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780496704/Everyday_peaceful_debate_ideas_and_clever_inspiration_for_beginners_that_keep_things_grounded_zivxrz.mp4')}" data-title="${ex.name}" data-subtitle="${ex.target}" style="padding:clamp(0.4rem,1vw,0.5rem) clamp(0.5rem,2vw,0.75rem); font-size:clamp(0.65rem,1.5vw,0.75rem)">Watch Tutorial</button>
            <div class="text-stone-400 ml-auto" style="font-size:clamp(0.65rem,1.5vw,0.75rem)">Machine: ${ex.machine}</div>
          </div>
        </div>

        <form class="grid grid-cols-1 sm:grid-cols-3 items-center mt-3" style="gap:var(--gap)">
          <label class="text-stone-400 block">
            <input type="number" class="glass w-full bg-transparent text-white rounded-lg" style="margin-top:clamp(0.25rem,0.75vw,0.5rem)" value="${typeof ex.weight === 'string' ? 0 : ex.weight}" placeholder="Weight (kg)" />
          </label>
          <label class="text-stone-400 block">
            <input type="number" class="glass w-full bg-transparent text-white rounded-lg" style="margin-top:clamp(0.25rem,0.75vw,0.5rem)" value="${ex.reps.split('-')[0]}" placeholder="Reps" />
          </label>
          <label class="text-stone-400 block">
            <input type="text" class="glass w-full bg-transparent text-white rounded-lg" style="margin-top:clamp(0.25rem,0.75vw,0.5rem)" placeholder="Notes" />
          </label>
        </form>

        <button class="rest-btn glass rounded-lg w-full mt-2 flex items-center justify-center gap-2" aria-label="Start rest timer" title="Start rest" data-rest-action="start" style="padding:clamp(0.48rem,1vw,0.62rem) clamp(0.6rem,2vw,0.8rem); font-size:clamp(0.72rem,1.5vw,0.82rem)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-4 h-4 text-gold"><path d="M12 8v4l3 2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="8.5" stroke-width="1.8"/></svg>
          Start Rest Timer
        </button>
      </article>
    `).join('');

    setMuscleVisualization(exercises[0]);

    // Re-attach event listeners for new elements
    attachExerciseListeners();
    updateCounts();
  }

  // Attach listeners to exercise elements
  function attachExerciseListeners() {
    document.querySelectorAll('.expand-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.exercise-card');
        const details = card.querySelector('.details');
        const detailVideo = card.querySelector('.exercise-detail-video');
        const detailVideoSrc = card.dataset.detailVideo || '';
        const isOpen = details.classList.contains('accordion-open');
        if(isOpen) {
          details.classList.remove('accordion-open');
          details.classList.add('accordion-enter');
          details.style.maxHeight = '0px';
          if (detailVideo) {
            try { detailVideo.pause(); } catch (error) {}
            detailVideo.removeAttribute('src');
            detailVideo.load();
          }
        } else {
          details.classList.add('accordion-open');
          details.classList.remove('accordion-enter');
          details.style.maxHeight = details.scrollHeight + 'px';
          if (detailVideo && detailVideoSrc) {
            detailVideo.src = detailVideoSrc;
            try { detailVideo.load(); detailVideo.play().catch(() => {}); } catch (error) {}
          }
        }
      });
    });

    document.querySelectorAll('.rest-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.exercise-card');
        if (!card) return;
        startRestTimer(card);
        showAchievement('Rest Started', `${card.dataset.name} timer running`);
      });
    });

    document.querySelectorAll('.set-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.exercise-card');
        if (!card) return;

        const totalSets = Number(card.dataset.sets) || 0;
        const completedSets = Math.min(totalSets, (Number(card.dataset.completedSets) || 0) + 1);
        card.dataset.completedSets = String(completedSets);
        updateCounts();

        const setProgress = card.querySelector('.set-progress');
        if (setProgress) setProgress.textContent = `Sets ${completedSets}/${totalSets}`;

        startRestTimer(card);

        if (completedSets >= totalSets) {
          const title = card.dataset.name || 'Exercise';
          showAchievement('Exercise Complete', `${title} all sets finished`);
        } else {
          showAchievement('Set Logged', `${card.dataset.name} ${completedSets}/${totalSets}`);
        }
      });
    });

    document.querySelectorAll('.exercise-card').forEach(card => {
      card.addEventListener('click', (event) => {
        if (event.target.closest('button, input, label, a, select, textarea')) return;
        const target = card.dataset.target || '';
        if (!target) return;
        setMuscleVisualization({ target });
      });
    });

    document.querySelectorAll('[data-action="qr"]').forEach(b => {
      b.addEventListener('click', () => {
        b.textContent = 'Scanning...';
        setTimeout(() => {
          b.textContent = 'Scanned';
          showAchievement('Machine Linked', 'QR scan successful');
        }, 900);
      });
    });

    // Tutorial buttons (supports local mp4 or YouTube URLs)
    document.querySelectorAll('.tutorial-btn').forEach(b => {
      b.addEventListener('click', () => {
        const src = b.dataset.video || 'https://res.cloudinary.com/dfp9cwgdz/video/upload/v1780495645/Back_xndmi1.mp4';
        const title = b.dataset.title || 'Exercise Tutorial';
        const subtitle = b.dataset.subtitle || 'Video and pointers';

        if (/youtube\.com|youtu\.be/.test(src)) {
          const modal = document.getElementById('tutorialModal');
          const videoEl = modal.querySelector('video');
          const playerWrap = videoEl.parentElement;
          const existingIframe = playerWrap.querySelector('iframe');
          if (existingIframe) existingIframe.remove();
          videoEl.style.display = 'none';
          let videoId = '';
          try { const u = new URL(src); if (u.searchParams.get('v')) videoId = u.searchParams.get('v'); else videoId = u.pathname.split('/').pop(); } catch (error) { videoId = src.split('/').pop(); }
          const iframe = document.createElement('iframe');
          iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`);
          iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
          iframe.setAttribute('allowfullscreen', '');
          iframe.className = 'w-full h-full';
          iframe.style.border = '0';
          modal.querySelector('.text-white.font-bold') && (modal.querySelector('.text-white.font-bold').textContent = title);
          modal.querySelector('.text-stone-400') && (modal.querySelector('.text-stone-400').textContent = subtitle);
          modal.classList.remove('hidden');
          modal.classList.add('flex');
          playerWrap.appendChild(iframe);
          if (window.innerWidth <= 640) modal.classList.add('mobile'); else modal.classList.remove('mobile');
          return;
        }

        openTutorialModal(src, title, subtitle);
      });
    });
  }

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('bg-white/6', 'text-black', 'glow-amber', 'active-tab');
        b.classList.add('text-stone-400');
      });
      btn.classList.add('bg-white/6', 'text-black', 'glow-amber', 'active-tab');
      btn.classList.remove('text-stone-400');
      
      const category = btn.textContent.trim();
      renderExercises(category);
    });
  });

  // Initial render
  renderExercises('Push Day');

  workoutStartBtn?.addEventListener('click', () => {
    const card = getFirstPendingCard();
    if (!card) return;
    startRestTimer(card);
    showAchievement('Workout Started', `${card.dataset.name} rest timer running`);
  });

  workoutResumeBtn?.addEventListener('click', () => {
    const card = activeRestCard || getFirstPendingCard();
    if (!card) return;
    startRestTimer(card);
  });

  // Completion checkboxes and achievement popup
  function showAchievement(text, sub){
    const container = document.getElementById('achieves');
    const el = document.getElementById('achievementTemplate').content.firstElementChild.cloneNode(true);
    el.querySelector('[data-achievement-title]').textContent = text;
    el.querySelector('[data-achievement-subtitle]').textContent = sub;
    container.appendChild(el);
    el.animate([{ transform: 'translateY(-10px)', opacity:0 }, { transform: 'translateY(0)', opacity:1}], { duration:240, easing:'ease-out' });
    setTimeout(()=>{ el.animate([{ transform: 'translateY(0)', opacity:1 }, { transform: 'translateY(-8px)', opacity:0}], { duration:380, easing:'ease-in' }); setTimeout(()=>el.remove(),420); },2200);
  }

  // Timer
  let timer = null; let seconds = 0; const timerToggle = document.getElementById('timerToggle');
  function formatTime(s){ const m = Math.floor(s/60); const ss = s%60; return `${m}:${ss.toString().padStart(2,'0')}`; }
  timerToggle.addEventListener('click', ()=>{
    if(timer){ clearInterval(timer); timer = null; timerToggle.textContent = 'Start Timer'; }
    else { timer = setInterval(()=>{ seconds++; document.querySelector('header .text-stone-400:last-child').textContent = formatTime(seconds); },1000); timerToggle.textContent = 'Pause Timer'; }
  });

  // Tutorial modal
  document.getElementById('closeTutorial').addEventListener('click', closeTutorialModal);

  document.getElementById('tutorialModal').addEventListener('click', (event) => {
    if (event.target.id === 'tutorialModal') closeTutorialModal();
  });

  // Mobile menu toggle

  // End workout
  document.getElementById('endWorkout').addEventListener('click', ()=>{ if(timer) { clearInterval(timer); timer = null; } stopRestTimer(); resetWorkoutSession(); showAchievement('Workout Complete','+300 XP • Streak +1'); updateCounts(); });

  updateRestPanel(null, 0);
