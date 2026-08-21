/* =========================================================
   DHIYACRAFT: THE PORTFOLIO REALM — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     DATA
     --------------------------------------------------------- */
  const INGREDIENTS = [
    { name: 'Book', emoji: '📖', skills: ['HTML', 'CSS'] },
    { name: 'Redstone', emoji: '🔴', skills: ['JavaScript', 'Python'] },
    { name: 'Emerald', emoji: '💚', skills: ['GitHub', 'Leadership'] },
    { name: 'Note Block', emoji: '🎵', skills: ['Violin', 'Teamwork'] },
    { name: 'Compass', emoji: '🧭', skills: ['Accountancy', 'Business Studies'] },
  ];

  const PROJECTS = [
    { title: 'Personal Portfolio', desc: 'A clean, personal site introducing who I am and what I build.', tags: ['HTML', 'CSS', 'JavaScript'] },
    { title: 'DhiyaCraft Portfolio', desc: 'This very realm — a fully game-themed portfolio experience.', tags: ['HTML', 'CSS', 'JavaScript', 'Animation'] },
    { title: 'Python Mini Projects', desc: 'A collection of small Python programs exploring logic, loops, and problem solving.', tags: ['Python'] },
    { title: 'Business Presentation Projects', desc: 'Commerce class presentations on business studies and accountancy case studies.', tags: ['Business Studies', 'Accountancy'] },
  ];

  const GALLERY = [
    { icon: '🖥️', caption: 'Portfolio Screenshot — homepage preview' },
    { icon: '🎼', caption: 'Violin Certificate — 6 years of training' },
    { icon: '🐍', caption: 'Python Project Preview — mini programs' },
    { icon: '📊', caption: 'Business Case Study — commerce presentation' },
    { icon: '🐙', caption: 'GitHub Contribution — project commits' },
    { icon: '🏅', caption: 'School Achievement — sports and academics' },
  ];

  const ACHIEVEMENTS = [
    { icon: '🏃', title: 'Sports Competitor', desc: 'Inter-school Relay and Kho Kho participant.' },
    { icon: '🎻', title: 'Melody Master', desc: '6 years of professional violin training.' },
    { icon: '💻', title: 'Builder of Ideas', desc: 'Created projects using HTML, CSS, JavaScript, and GitHub.' },
    { icon: '📚', title: 'Commerce Explorer', desc: 'Currently studying Class 11 Commerce.' },
  ];

  // "Curious Explorer" is reserved for the hidden diamond block egg.
  const HIDDEN_TOASTS = [
    { icon: '🌍', sub: 'First Spawn' },
    { icon: '🔴', sub: 'Redstone Engineer' },
    { icon: '⭐', sub: 'XP Collector' },
    { icon: '🏗️', sub: 'World Creator' },
  ];
  let toastPool = [...HIDDEN_TOASTS];

  const CONSOLE_RESPONSES = {
    '/help': 'Available commands: /help, /about, /skills, /xp, /gamemode creative, /summon creeper, /locate portfolio',
    '/about': 'Dhiya Umapathy — Level 17 Commerce student, violinist, and web developer from Chennai.',
    '/skills': 'HTML, CSS, JavaScript, Python, GitHub, Accountancy, Business Studies, Leadership, Teamwork, Violin.',
    '/xp': () => `Current XP: ${Math.floor(xp)}% toward Level ${level + 1}.`,
    '/gamemode creative': 'Gamemode set to Creative. Fly around and explore freely!',
    '/summon creeper': 'A creeper spawns nearby... but decides this portfolio is too impressive to blow up. Ssss... respect.',
    '/locate portfolio': 'Portfolio located at coordinates: you are already standing in it.',
  };

  /* ---------------------------------------------------------
     SPLASH + LOADING SEQUENCE
     --------------------------------------------------------- */
  (function introSequence() {
    const splash = document.getElementById('splash-screen');
    const loading = document.getElementById('loading-screen');
    const fill = document.getElementById('load-bar-fill');
    const pct = document.getElementById('load-percent');
    const status = document.getElementById('load-status');
    const messages = ['Generating World...', 'Placing Blocks...', 'Spawning Mobs...', 'Loading Textures...', 'Almost There...'];

    document.body.style.overflow = 'hidden';

    // Phase 1: splash logo (~1s)
    setTimeout(() => {
      splash.classList.add('hide');
      loading.classList.add('show');

      // Phase 2: generating world bar (~1.5s)
      let progress = 0;
      const tick = setInterval(() => {
        progress += Math.random() * 20 + 8;
        if (progress >= 100) {
          progress = 100;
          clearInterval(tick);
          setTimeout(() => {
            loading.classList.add('hide');
            document.body.style.overflow = '';
          }, 220);
        }
        fill.style.width = progress + '%';
        pct.textContent = Math.floor(progress) + '%';
        status.textContent = messages[Math.min(messages.length - 1, Math.floor(progress / 22))];
      }, 170);
    }, 1000);

    // Safety net in case something stalls
    setTimeout(() => { document.body.style.overflow = ''; }, 3500);
  })();

  /* ---------------------------------------------------------
     DAY / NIGHT CYCLE (every 45s)
     --------------------------------------------------------- */
  (function dayNightCycle() {
    const panorama = document.getElementById('panorama');
    const starsLayer = document.getElementById('stars');
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('span');
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 60 + '%';
      starsLayer.appendChild(s);
    }
    setInterval(() => panorama.classList.toggle('night'), 45000);
  })();

  /* ---------------------------------------------------------
     HERO PARTICLES + PORTAL PARTICLES
     --------------------------------------------------------- */
  (function heroParticles() {
    const layer = document.getElementById('hero-particles');
    const count = window.innerWidth < 600 ? 14 : 26;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
      p.style.animationDuration = (8 + Math.random() * 10) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.opacity = 0.3 + Math.random() * 0.5;
      layer.appendChild(p);
    }
  })();

  (function portalParticles() {
    const layer = document.getElementById('portal-particles');
    if (!layer) return;
    for (let i = 0; i < 20; i++) {
      const s = document.createElement('span');
      s.className = 'portal-spark';
      s.style.left = Math.random() * 100 + '%';
      s.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      s.style.animationDelay = (Math.random() * 4) + 's';
      layer.appendChild(s);
    }
  })();

  /* ---------------------------------------------------------
     RANDOM AMBIENT EVENTS (birds, fireflies, shooting stars, emeralds)
     --------------------------------------------------------- */
  (function ambientEvents() {
    const layer = document.getElementById('ambient-layer');
    const spawners = [
      () => {
        const el = document.createElement('span');
        el.className = 'ambient-critter ambient-bird';
        el.textContent = '🐦';
        el.style.top = (10 + Math.random() * 30) + 'vh';
        el.style.animationDuration = (8 + Math.random() * 4) + 's';
        layer.appendChild(el);
        setTimeout(() => el.remove(), 13000);
      },
      () => {
        const el = document.createElement('span');
        el.className = 'ambient-critter ambient-firefly';
        el.style.left = Math.random() * 90 + 'vw';
        el.style.top = (40 + Math.random() * 40) + 'vh';
        layer.appendChild(el);
        setTimeout(() => el.remove(), 6200);
      },
      () => {
        const el = document.createElement('span');
        el.className = 'ambient-critter ambient-star';
        el.style.left = (60 + Math.random() * 30) + 'vw';
        el.style.top = (5 + Math.random() * 15) + 'vh';
        layer.appendChild(el);
        setTimeout(() => el.remove(), 1300);
      },
      () => {
        const el = document.createElement('span');
        el.className = 'ambient-critter ambient-emerald';
        el.textContent = '💚';
        el.style.left = Math.random() * 90 + 'vw';
        el.style.top = (70 + Math.random() * 20) + 'vh';
        layer.appendChild(el);
        setTimeout(() => el.remove(), 5200);
      },
    ];
    setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      const chance = Math.random();
      if (chance < 0.7) spawners[Math.floor(Math.random() * spawners.length)]();
    }, 5000);
  })();

  /* ---------------------------------------------------------
     SCROLL REVEAL (re-usable; call refreshReveal() after DOM inserts)
     --------------------------------------------------------- */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealIO.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  function refreshReveal() {
    document.querySelectorAll('[data-reveal]:not(.in-view)').forEach((el) => revealIO.observe(el));
  }
  refreshReveal();

  /* ---------------------------------------------------------
     SMOOTH SCROLL
     --------------------------------------------------------- */
  function scrollToTarget(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  document.querySelectorAll('[data-target]').forEach((node) => {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTarget(node.getAttribute('data-target'));
      closeInventory();
    });
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToTarget(node.getAttribute('data-target')); closeInventory(); }
    });
  });

  /* ---------------------------------------------------------
     INVENTORY TOGGLE
     --------------------------------------------------------- */
  const inventoryBar = document.getElementById('inventory-bar');
  const inventoryToggle = document.getElementById('inventory-toggle');
  let inventoryOpen = true;
  function openInventory() { inventoryOpen = true; inventoryBar.classList.remove('closed'); inventoryToggle.setAttribute('aria-expanded', 'true'); }
  function closeInventory() { if (window.innerWidth > 640) return; inventoryOpen = false; inventoryBar.classList.add('closed'); inventoryToggle.setAttribute('aria-expanded', 'false'); }
  function toggleInventory() { inventoryOpen ? closeInventory() : openInventory(); }
  inventoryToggle.addEventListener('click', toggleInventory);
  if (window.innerWidth <= 640) closeInventory();

  /* ---------------------------------------------------------
     TOASTS
     --------------------------------------------------------- */
  function showToast(icon, title, sub) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'mc-toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-text"><span class="toast-title">${title}</span><span class="toast-sub">${sub}</span></span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4200);
  }
  function showRandomHiddenToast() {
    if (toastPool.length === 0) toastPool = [...HIDDEN_TOASTS];
    const idx = Math.floor(Math.random() * toastPool.length);
    const t = toastPool.splice(idx, 1)[0];
    showToast(t.icon, 'Achievement Unlocked!', t.sub);
  }
  let hiddenToastBudget = 3;
  function maybeHiddenToast() {
    if (hiddenToastBudget > 0 && Math.random() < 0.5) { hiddenToastBudget--; setTimeout(showRandomHiddenToast, 500); }
  }

  /* ---------------------------------------------------------
     BLOCK BREAK EFFECT — pixel fragments + shake
     --------------------------------------------------------- */
  function breakEffect(el) {
    el.classList.remove('shake');
    void el.offsetWidth;
    el.classList.add('shake');
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#8B5A2B', '#6b4520', '#a5713c', '#454545'];
    for (let i = 0; i < 8; i++) {
      const frag = document.createElement('span');
      frag.className = 'break-frag';
      frag.style.left = cx + 'px';
      frag.style.top = cy + 'px';
      frag.style.background = colors[i % colors.length];
      const angle = Math.random() * Math.PI * 2;
      const dist = 18 + Math.random() * 22;
      frag.style.setProperty('--fx', Math.cos(angle) * dist + 'px');
      frag.style.setProperty('--fy', Math.sin(angle) * dist + 'px');
      document.body.appendChild(frag);
      setTimeout(() => frag.remove(), 550);
    }
  }
  document.querySelectorAll('.breakable').forEach((el) => {
    el.style.cursor = 'var(--cursor-pointer)';
    el.addEventListener('click', () => breakEffect(el));
  });

  /* ---------------------------------------------------------
     SKILLS — DRAG & DROP CRAFTING TABLE
     --------------------------------------------------------- */
  (function craftingTable() {
    const tray = document.getElementById('ingredient-tray');
    const grid = document.getElementById('crafting-grid');
    const output = document.getElementById('crafting-output');
    const cardsWrap = document.getElementById('skill-cards');
    const hint = document.getElementById('craft-hint');

    // Build 9 empty craft slots
    const slots = [];
    for (let i = 0; i < 9; i++) {
      const slot = document.createElement('div');
      slot.className = 'craft-slot';
      slot.dataset.index = i;
      grid.appendChild(slot);
      slots.push(slot);

      slot.addEventListener('dragover', (e) => { e.preventDefault(); slot.classList.add('drag-over'); });
      slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
      slot.addEventListener('drop', (e) => {
        e.preventDefault();
        slot.classList.remove('drag-over');
        const name = e.dataTransfer.getData('text/plain');
        const ingredient = INGREDIENTS.find((ing) => ing.name === name);
        if (ingredient) placeIngredient(ingredient, slot);
      });
    }

    // Render skill cards up front (locked visual state)
    const cardEls = {};
    INGREDIENTS.forEach((ing) => {
      ing.skills.forEach((skillName) => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.innerHTML = `<span class="skill-emoji">${ing.emoji}</span><span class="skill-name">${skillName}</span>`;
        cardsWrap.appendChild(card);
        cardEls[skillName] = card;
      });
    });

    // Ingredient tray — draggable AND tap-to-craft (mobile friendly)
    INGREDIENTS.forEach((ing) => {
      const chip = document.createElement('div');
      chip.className = 'ingredient';
      chip.textContent = ing.emoji;
      chip.title = ing.name;
      chip.draggable = true;
      chip.tabIndex = 0;
      chip.setAttribute('role', 'button');
      chip.setAttribute('aria-label', 'Craft with ' + ing.name);

      chip.addEventListener('dragstart', (e) => {
        chip.classList.add('dragging');
        e.dataTransfer.setData('text/plain', ing.name);
      });
      chip.addEventListener('dragend', () => chip.classList.remove('dragging'));

      function tapCraft() {
        const emptySlot = slots.find((s) => !s.classList.contains('filled'));
        placeIngredient(ing, emptySlot || slots[0]);
      }
      chip.addEventListener('click', tapCraft);
      chip.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tapCraft(); } });

      tray.appendChild(chip);
    });

    function placeIngredient(ing, slot) {
      slot.textContent = ing.emoji;
      slot.classList.remove('filled');
      void slot.offsetWidth;
      slot.classList.add('filled');

      output.innerHTML = `<span>${ing.emoji}</span>`;
      output.classList.remove('glow');
      void output.offsetWidth;
      output.classList.add('glow');
      hint.textContent = `Crafted: ${ing.skills.join(' & ')}!`;

      ing.skills.forEach((skillName) => {
        const card = cardEls[skillName];
        card.classList.add('crafted');
      });

      playBlip();
      maybeHiddenToast();
      addXP(4);
    }
  })();

  /* ---------------------------------------------------------
     PROJECTS — CHESTS
     --------------------------------------------------------- */
  (function chests() {
    const wrap = document.getElementById('chest-grid');
    PROJECTS.forEach((proj) => {
      const card = document.createElement('div');
      card.className = 'chest-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', 'false');
      card.innerHTML = `
        <span class="chest-visual">📦</span>
        <span class="chest-pop">✨</span>
        <span class="chest-title">${proj.title}</span>
        <div class="chest-detail">
          <p class="chest-desc">${proj.desc}</p>
          <div class="chest-stack">${proj.tags.map((t) => `<span class="chest-tag">${t}</span>`).join('')}</div>
        </div>
      `;
      function toggle() {
        const isOpen = card.classList.toggle('open');
        card.setAttribute('aria-expanded', String(isOpen));
        card.querySelector('.chest-visual').textContent = isOpen ? '🗃️' : '📦';
        if (isOpen) {
          spawnSparkles(card);
          maybeHiddenToast();
          addXP(3);
        }
      }
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
      wrap.appendChild(card);
    });

    function spawnSparkles(card) {
      for (let i = 0; i < 6; i++) {
        const s = document.createElement('span');
        s.className = 'chest-sparkle';
        s.textContent = '✨';
        s.style.left = (30 + Math.random() * 40) + '%';
        s.style.top = '10px';
        s.style.animationDelay = (i * 0.05) + 's';
        card.appendChild(s);
        setTimeout(() => s.remove(), 800);
      }
    }
  })();

  /* ---------------------------------------------------------
     ITEM FRAME GALLERY + LIGHTBOX
     --------------------------------------------------------- */
  (function gallery() {
    const grid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lbIcon = document.getElementById('lightbox-icon');
    const lbCaption = document.getElementById('lightbox-caption');
    const lbClose = document.getElementById('lightbox-close');

    GALLERY.forEach((item) => {
      const frame = document.createElement('div');
      frame.className = 'gallery-frame';
      frame.tabIndex = 0;
      frame.setAttribute('role', 'button');
      frame.setAttribute('aria-label', 'Open ' + item.caption);
      frame.innerHTML = `<span class="frame-icon">${item.icon}</span><span class="frame-caption">${item.caption}</span>`;
      function open() {
        lbIcon.textContent = item.icon;
        lbCaption.textContent = item.caption;
        lightbox.classList.remove('hidden');
        lbClose.focus();
      }
      frame.addEventListener('click', open);
      frame.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
      grid.appendChild(frame);
    });

    function close() { lightbox.classList.add('hidden'); }
    lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) close(); });
  })();

  /* ---------------------------------------------------------
     ACHIEVEMENTS
     --------------------------------------------------------- */
  (function achievements() {
    const wrap = document.getElementById('advancement-grid');
    ACHIEVEMENTS.forEach((a, i) => {
      const card = document.createElement('div');
      card.className = 'advancement-card';
      card.setAttribute('data-reveal', '');
      card.style.transitionDelay = (i * 0.08) + 's';
      card.innerHTML = `<span class="adv-icon">${a.icon}</span><span><span class="adv-title">${a.title}</span><span class="adv-desc">${a.desc}</span></span>`;
      wrap.appendChild(card);
    });
    refreshReveal();
  })();

  /* ---------------------------------------------------------
     VISITOR COUNTER
     --------------------------------------------------------- */
  (function visitorCounter() {
    const el = document.getElementById('visitor-count');
    const key = 'dhiyacraft_players_joined';
    let total = parseInt(localStorage.getItem(key) || '118', 10);
    if (!sessionStorage.getItem('dhiyacraft_counted')) {
      total += 1;
      localStorage.setItem(key, String(total));
      sessionStorage.setItem('dhiyacraft_counted', '1');
    }

    let counted = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          animateCount(el, total, 1200);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);

    function animateCount(node, target, duration) {
      const start = performance.now();
      function step(now) {
        const p = Math.min(1, (now - start) / duration);
        node.textContent = Math.floor(p * target);
        if (p < 1) requestAnimationFrame(step);
        else node.textContent = target;
      }
      requestAnimationFrame(step);
    }
  })();

  /* ---------------------------------------------------------
     CONTACT — COPY EMAIL
     --------------------------------------------------------- */
  (function copyEmail() {
    const btn = document.getElementById('copy-email-btn');
    const email = 'dhiyatheprogirl@gmail.com';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
      } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      showToast('📋', 'Copied!', 'Email address copied to clipboard');
    });
  })();

  /* ---------------------------------------------------------
     PLAYER STATE (level, xp, hearts, hunger) — shared by
     footer HUD and the About player card
     --------------------------------------------------------- */
  const xpFill = document.getElementById('xp-fill');
  const levelBadge = document.getElementById('xp-level-badge');
  const cardXpFill = document.getElementById('card-xp-fill');
  const cardLevel = document.getElementById('card-level');
  let level = 17;
  let xp = 30;

  (function footerHotbar() {
    const hearts = document.getElementById('hearts-row');
    const hunger = document.getElementById('hunger-row');
    const cardHearts = document.getElementById('card-hearts');
    const cardHunger = document.getElementById('card-hunger');
    const slots = document.getElementById('hotbar-row');

    for (let i = 0; i < 10; i++) hearts.innerHTML += '❤️';
    for (let i = 0; i < 10; i++) hunger.innerHTML += '🍗';
    cardHearts.textContent = '❤️'.repeat(10);
    cardHunger.textContent = '🍗'.repeat(10);

    const slotIcons = ['⚔️', '📖', '💚', '🧰', '🖼️', '🏆', '🧭', '🎻', '🐍', '📊'];
    slotIcons.forEach((icon) => {
      const s = document.createElement('div');
      s.className = 'hotbar-slot';
      s.textContent = icon;
      slots.appendChild(s);
    });

    xpFill.style.width = xp + '%';
    levelBadge.textContent = level;
    cardXpFill.style.width = xp + '%';
    cardLevel.textContent = level;
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    window.addEventListener('scroll', () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const target = Math.min(95, 30 + scrollPct * 65);
      if (target > xp) { xp = target; xpFill.style.width = xp + '%'; cardXpFill.style.width = xp + '%'; }
    }, { passive: true });
  })();

  const levelUpBanner = document.createElement('div');
  levelUpBanner.id = 'level-up-banner';
  levelUpBanner.textContent = 'Level Up!';
  document.body.appendChild(levelUpBanner);

  function addXP(amount) {
    xp += amount;
    if (xp >= 100) {
      xp = 100;
      xpFill.style.width = '100%';
      cardXpFill.style.width = '100%';
      level += 1;
      levelBadge.textContent = level;
      cardLevel.textContent = level;
      levelUpBanner.classList.add('show');
      showToast('⬆️', 'Level Up!', `You reached Level ${level}`);
      setTimeout(() => {
        levelUpBanner.classList.remove('show');
        xp = 20;
        xpFill.style.width = xp + '%';
        cardXpFill.style.width = xp + '%';
      }, 1800);
    } else {
      xpFill.style.width = xp + '%';
      cardXpFill.style.width = xp + '%';
    }
  }

  /* ---------------------------------------------------------
     PATH WALKER — moves down the education timeline on scroll
     --------------------------------------------------------- */
  (function pathWalker() {
    const track = document.getElementById('path-track');
    const walker = document.getElementById('path-walker');
    if (!track || !walker) return;
    window.addEventListener('scroll', () => {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const progress = Math.min(1, Math.max(0, (vh * 0.75 - rect.top) / total));
      walker.style.top = (progress * (total - 24)) + 'px';
    }, { passive: true });
  })();

  /* ---------------------------------------------------------
     XP ORBS
     --------------------------------------------------------- */
  (function xpOrbs() {
    const layer = document.getElementById('xp-orb-layer');
    function spawnOrb() {
      const orb = document.createElement('div');
      orb.className = 'xp-orb';
      const startX = Math.random() * (window.innerWidth - 20);
      orb.style.left = startX + 'px';
      orb.style.top = (window.innerHeight - 20) + 'px';
      orb.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
      const duration = 5 + Math.random() * 3;
      orb.style.animationDuration = duration + 's';
      orb.addEventListener('click', () => {
        addXP(6);
        showToast('✨', 'XP Collected!', '+6 XP');
        playBlip();
        orb.remove();
      });
      layer.appendChild(orb);
      setTimeout(() => orb.remove(), duration * 1000 + 200);
    }
    setInterval(() => { if (document.visibilityState === 'visible') spawnOrb(); }, 4500);
    setTimeout(spawnOrb, 3000);
  })();

  /* ---------------------------------------------------------
     BACKGROUND MUSIC TOGGLE — Web Audio ambient pad (synthesized,
     no external sound files needed). Default: muted.
     --------------------------------------------------------- */
  const AudioEngine = (function () {
    let ctx = null;
    let nodes = [];
    let playing = false;

    function ensureContext() {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      return ctx;
    }

    function start() {
      const c = ensureContext();
      if (c.state === 'suspended') c.resume();
      const master = c.createGain();
      master.gain.value = 0.05;
      master.connect(c.destination);

      const freqs = [196.0, 246.94, 293.66]; // soft G-B-D pad
      freqs.forEach((f, i) => {
        const osc = c.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f;
        const g = c.createGain();
        g.gain.value = 0;
        osc.connect(g);
        g.connect(master);
        osc.start();
        g.gain.linearRampToValueAtTime(0.6 / freqs.length, c.currentTime + 1.2 + i * 0.3);
        nodes.push({ osc, g });
      });

      // gentle LFO on master gain for a "breathing" ambient feel
      const lfo = c.createOscillator();
      lfo.frequency.value = 0.08;
      const lfoGain = c.createGain();
      lfoGain.gain.value = 0.02;
      lfo.connect(lfoGain);
      lfoGain.connect(master.gain);
      lfo.start();
      nodes.push({ osc: lfo, g: lfoGain });

      nodes.push({ master });
      playing = true;
    }

    function stop() {
      if (!ctx) return;
      const c = ctx;
      nodes.forEach((n) => {
        if (n.g && n.g.gain) n.g.gain.linearRampToValueAtTime(0, c.currentTime + 0.6);
        if (n.osc) setTimeout(() => { try { n.osc.stop(); } catch (e) {} }, 700);
      });
      setTimeout(() => { nodes = []; }, 750);
      playing = false;
    }

    function blip() {
      const c = ensureContext();
      if (c.state === 'suspended') return; // don't force-resume without gesture
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = 'square';
      osc.frequency.value = 660;
      g.gain.value = 0.04;
      osc.connect(g);
      g.connect(c.destination);
      osc.start();
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12);
      osc.stop(c.currentTime + 0.13);
    }

    return { start, stop, blip, isPlaying: () => playing };
  })();

  function playBlip() { try { AudioEngine.blip(); } catch (e) {} }

  (function musicToggle() {
    const btn = document.getElementById('music-toggle');
    btn.addEventListener('click', () => {
      const active = btn.getAttribute('aria-pressed') === 'true';
      if (active) {
        AudioEngine.stop();
        btn.setAttribute('aria-pressed', 'false');
        showToast('🔇', 'Music Off', 'Ambient music paused');
      } else {
        AudioEngine.start();
        btn.setAttribute('aria-pressed', 'true');
        showToast('🎵', 'Music On', 'Ambient music playing');
      }
    });
  })();

  /* ---------------------------------------------------------
     COMMAND CONSOLE
     --------------------------------------------------------- */
  (function commandConsole() {
    const consoleEl = document.getElementById('command-console');
    const input = document.getElementById('console-input');
    const output = document.getElementById('console-output');

    function openConsole() { consoleEl.classList.remove('hidden'); input.value = ''; setTimeout(() => input.focus(), 10); }
    function closeConsole() { consoleEl.classList.add('hidden'); }

    document.addEventListener('keydown', (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
      if (e.key === '/' && !typing) { e.preventDefault(); openConsole(); }
      else if (e.key === 'Escape' && !consoleEl.classList.contains('hidden')) { closeConsole(); }
      else if ((e.key === 'm' || e.key === 'M') && !typing) { toggleInventory(); }
    });

    consoleEl.addEventListener('click', (e) => { if (e.target === consoleEl) closeConsole(); });

    input.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const raw = input.value.trim();
      if (!raw) return;
      const cmd = raw.startsWith('/') ? raw : '/' + raw;

      const echo = document.createElement('p');
      echo.className = 'console-line cmd-echo';
      echo.textContent = '> ' + cmd;
      output.appendChild(echo);

      const responseEntry = CONSOLE_RESPONSES[cmd.toLowerCase()];
      const responseText = typeof responseEntry === 'function' ? responseEntry() : responseEntry;

      const reply = document.createElement('p');
      reply.className = 'console-line';
      reply.textContent = responseText || `Unknown command: ${cmd}. Try /help.`;
      output.appendChild(reply);

      output.scrollTop = output.scrollHeight;
      input.value = '';
    });
  })();

  /* ---------------------------------------------------------
     HIDDEN EASTER EGG — diamond block (only triggers once, ever)
     --------------------------------------------------------- */
  (function easterEgg() {
    const EGG_KEY = 'dhiyacraft_egg_found';
    if (localStorage.getItem(EGG_KEY) === '1') return; // already found — don't show again

    const egg = document.createElement('button');
    egg.className = 'diamond-egg';
    egg.setAttribute('aria-label', 'A curious sparkle in the world');

    function placeEgg() {
      const footer = document.getElementById('hotbar-footer');
      const rect = footer.getBoundingClientRect();
      const top = window.scrollY + rect.top - 40 + Math.random() * 10;
      const side = Math.random() > 0.5 ? 'left' : 'right';
      egg.style.position = 'absolute';
      egg.style.top = top + 'px';
      if (side === 'left') egg.style.left = (12 + Math.random() * 8) + 'px';
      else egg.style.right = (12 + Math.random() * 8) + 'px';
      document.body.style.position = document.body.style.position || 'relative';
      document.body.appendChild(egg);
    }
    placeEgg();

    const card = document.createElement('div');
    card.className = 'easter-card';
    card.innerHTML = `<strong>Achievement Unlocked: Curious Explorer!</strong><p>Thanks for exploring DhiyaCraft. Keep mining for hidden secrets.</p>`;
    document.body.appendChild(card);

    egg.addEventListener('click', () => {
      localStorage.setItem(EGG_KEY, '1');
      breakEffect(egg);
      egg.style.transition = 'transform 0.3s var(--ease-mc), opacity 0.3s';
      egg.style.transform = 'scale(0)';
      egg.style.opacity = '0';
      showToast('💎', 'Achievement Unlocked!', 'Curious Explorer');
      addXP(10);
      setTimeout(() => card.classList.add('show'), 350);
      setTimeout(() => card.classList.remove('show'), 6500);
      setTimeout(() => egg.remove(), 400);
    }, { once: true });
  })();

});
