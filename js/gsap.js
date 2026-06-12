// ===================================================
// FINANCING DASHBOARD – GSAP ANIMATIONS
// ===================================================

const gsapReady = () => typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

// ── Register ScrollTrigger ─────────────────────────
function registerGSAP() {
  if (!gsapReady()) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
}

// ── 1. Sidebar Entrance ────────────────────────────
function animateSidebar() {
  if (!gsapReady()) return;

  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  gsap.from(sidebar, {
    x: -30,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    clearProps: 'transform,opacity',
  });



  gsap.from('.sidebar-logo', {
    scale: 0.5,
    opacity: 0,
    duration: 0.5,
    delay: 0.2,
    ease: 'back.out(1.7)',
  });

  gsap.from('.nav-item', {
    x: -20,
    opacity: 0,
    duration: 0.4,
    stagger: 0.06,
    delay: 0.3,
    ease: 'power2.out',
  });

  gsap.from('.sidebar-footer', {
    y: 20,
    opacity: 0,
    duration: 0.4,
    delay: 0.6,
    ease: 'power2.out',
  });
}

// ── 2. Topbar Fade-in ──────────────────────────────
function animateTopbar() {
  if (!gsapReady()) return;

  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  gsap.from(topbar, {
    y: -20,
    opacity: 0,
    duration: 0.5,
    delay: 0.4,
    ease: 'power3.out',
  });
}

// ── 3. KPI Cards Stagger ──────────────────────────
function animateKPICards() {
  if (!gsapReady()) return;

  const cards = gsap.utils.toArray('.kpi-card');
  if (!cards.length) return;

  gsap.from(cards, {
    y: 30,
    opacity: 0,
    duration: 0.5,
    stagger: { each: 0.07, ease: 'power1.inOut' },
    delay: 0.5,
    ease: 'power3.out',
  });
}

// ── 4. KPI Counter Animation ──────────────────────
function animateCounters() {
  if (!gsapReady()) return;

  document.querySelectorAll('.kpi-value[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const isFloat = el.dataset.count.includes('.');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.5,
      delay: 0.7,
      ease: 'power2.out',
      onUpdate() {
        const v = isFloat ? obj.val.toFixed(1) : Math.floor(obj.val);
        el.textContent = prefix + Number(v).toLocaleString() + suffix;
      }
    });
  });
}

// ── 5. Chart Sections Reveal ──────────────────────
function animateCharts() {
  if (!gsapReady()) return;

  gsap.utils.toArray('#page-dashboard .card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      y: 24,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  });
}

// ── 6. Table Rows Reveal ──────────────────────────
function animateTableRows() {
  if (!gsapReady()) return;

  const rows = gsap.utils.toArray('#page-dashboard .data-table tbody tr');
  if (!rows.length) return;

  gsap.from(rows, {
    scrollTrigger: {
      trigger: '#page-dashboard .data-table',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    x: -15,
    opacity: 0,
    duration: 0.35,
    stagger: 0.05,
    ease: 'power2.out',
  });
}

// ── 7. Timeline Reveal ────────────────────────────
function animateTimeline() {
  if (!gsapReady()) return;

  const items = gsap.utils.toArray('#page-dashboard .timeline-item');
  if (!items.length) return;

  gsap.from(items, {
    scrollTrigger: {
      trigger: '#page-dashboard .timeline',
      start: 'top 85%',
    },
    x: 15,
    opacity: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power2.out',
  });
}

// ── 8. Funnel Bars ────────────────────────────────
function animateFunnelBars() {
  if (!gsapReady()) return;

  document.querySelectorAll('#page-dashboard .funnel-bar-fill').forEach(bar => {
    const targetW = bar.dataset.width || '0%';
    bar.style.width = '0%';

    ScrollTrigger.create({
      trigger: bar,
      start: 'top 90%',
      onEnter() {
        gsap.to(bar, {
          width: targetW,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
    });
  });
}

// ── 9. AI Panel Insights ──────────────────────────
function animateAIPanel() {
  if (!gsapReady()) return;

  const items = gsap.utils.toArray('#page-dashboard .ai-insight-item');
  if (!items.length) return;

  gsap.from(items, {
    scrollTrigger: {
      trigger: '#page-dashboard .ai-panel',
      start: 'top 85%',
    },
    x: 20,
    opacity: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power2.out',
  });
}

// ── 10. Activity Feed ─────────────────────────────
function animateActivity() {
  if (!gsapReady()) return;

  const items = gsap.utils.toArray('#page-dashboard .activity-item');
  if (!items.length) return;

  gsap.from(items, {
    scrollTrigger: {
      trigger: '#page-dashboard .activity-list',
      start: 'top 88%',
    },
    y: 12,
    opacity: 0,
    duration: 0.3,
    stagger: 0.07,
    ease: 'power1.out',
  });
}

// ── 11. Copilot Widget ────────────────────────────
function animateCopilot() {
  if (!gsapReady()) return;

  const widget = document.querySelector('#page-dashboard .copilot-widget');
  if (!widget) return;

  gsap.from(widget, {
    scrollTrigger: {
      trigger: widget,
      start: 'top 88%',
    },
    scale: 0.95,
    opacity: 0,
    duration: 0.5,
    ease: 'back.out(1.5)',
  });
}

// ── 12. Hover Micro-interactions (DOM) ───────────
function initHoverEffects() {
  // KPI cards scale-up icon on hover
  document.querySelectorAll('.kpi-card').forEach(card => {
    const icon = card.querySelector('.kpi-icon');
    if (!icon || !gsapReady()) return;

    card.addEventListener('mouseenter', () => {
      gsap.to(icon, { scale: 1.15, duration: 0.25, ease: 'back.out(2)' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(icon, { scale: 1, duration: 0.2, ease: 'power2.out' });
    });
  });

  // Nav items
  document.querySelectorAll('.nav-item:not(.active)').forEach(item => {
    if (!gsapReady()) return;
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { x: 4, duration: 0.2, ease: 'power2.out' });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { x: 0, duration: 0.2, ease: 'power2.out' });
    });
  });

  // Btn hover
  document.querySelectorAll('.btn-primary').forEach(btn => {
    if (!gsapReady()) return;
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.03, duration: 0.2, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, duration: 0.2, ease: 'power2.out' });
    });
  });
}

// ── Init All GSAP ─────────────────────────────────
function initGSAP() {
  registerGSAP();
  animateSidebar();
  animateTopbar();
  animateKPICards();
  animateCounters();
  animateCharts();
  animateTableRows();
  animateTimeline();
  animateFunnelBars();
  animateAIPanel();
  animateActivity();
  animateCopilot();
  initHoverEffects();
}

// initGSAP is now globally available
