// ===================================================
// FINANCING DASHBOARD – APP.JS (No ES Modules)
// ===================================================

// ── Mock Data ──────────────────────────────────────
const APPLICATIONS = [
  { id:'FIN-2401', name:'Arjun Mehta',    initials:'AM', color:'#6366f1', type:'Business Loan',      amount:'$45,000',  score:780, status:'approved', progress:100, officer:'Sarah K.', date:'Jun 10, 2026' },
  { id:'FIN-2402', name:'Priya Sharma',   initials:'PS', color:'#ec4899', type:'Equipment Finance',   amount:'$28,500',  score:720, status:'pending',  progress:60,  officer:'Mike R.',  date:'Jun 10, 2026' },
  { id:'FIN-2403', name:'Rahul Verma',    initials:'RV', color:'#f59e0b', type:'Trade Finance',       amount:'$92,000',  score:695, status:'review',   progress:40,  officer:'Anna L.',  date:'Jun 9, 2026'  },
  { id:'FIN-2404', name:'Neha Patel',     initials:'NP', color:'#10b981', type:'Working Capital',     amount:'$15,000',  score:810, status:'approved', progress:100, officer:'James P.', date:'Jun 9, 2026'  },
  { id:'FIN-2405', name:'Vikram Singh',   initials:'VS', color:'#2563eb', type:'Invoice Discounting', amount:'$67,200',  score:640, status:'rejected', progress:0,   officer:'Sarah K.', date:'Jun 8, 2026'  },
  { id:'FIN-2406', name:'Anita Joshi',    initials:'AJ', color:'#7c3aed', type:'Business Loan',       amount:'$120,000', score:755, status:'review',   progress:75,  officer:'Mike R.',  date:'Jun 8, 2026'  },
  { id:'FIN-2407', name:'Suresh Kumar',   initials:'SK', color:'#0ea5e9', type:'Equipment Finance',   amount:'$33,800',  score:788, status:'approved', progress:100, officer:'Anna L.',  date:'Jun 7, 2026'  },
  { id:'FIN-2408', name:'Kavya Reddy',    initials:'KR', color:'#ef4444', type:'Working Capital',     amount:'$22,500',  score:662, status:'pending',  progress:30,  officer:'James P.', date:'Jun 7, 2026'  },
];

const ACTIVITY = [
  { type:'approved', icon:'check_circle',  text:'<strong>FIN-2401</strong> – Arjun Mehta approved for $45,000',   time:'2 min ago'  },
  { type:'payment',  icon:'payments',      text:'<strong>EMI received</strong> from Neha Patel – $1,250',          time:'15 min ago' },
  { type:'document', icon:'upload_file',   text:'<strong>Rahul Verma</strong> uploaded income certificate',         time:'34 min ago' },
  { type:'rejected', icon:'cancel',        text:'<strong>FIN-2405</strong> rejected – low credit score',           time:'1 hr ago'   },
  { type:'note',     icon:'sticky_note_2', text:'<strong>Sarah K.</strong> added note on FIN-2406',                time:'2 hr ago'   },
  { type:'payment',  icon:'payments',      text:'<strong>Overdue alert</strong> – Vikram Singh payment due',       time:'3 hr ago'   },
  { type:'document', icon:'folder_open',   text:'<strong>Kavya Reddy</strong> application under review',           time:'5 hr ago'   },
];

const AI_INSIGHTS = [
  { type:'warning', icon:'warning',     title:'3 Applications Missing Documents',  desc:'FIN-2403, FIN-2406, FIN-2408 require income proof. Auto-reminder sent.'       },
  { type:'danger',  icon:'alarm',       title:'7 Overdue EMIs This Week',          desc:'$18,400 at risk. Proactive outreach recommended for high-value accounts.'     },
  { type:'success', icon:'trending_up', title:'Approval Rate Up 12% This Month',   desc:'Credit scoring model improvements have reduced false rejections significantly.' },
  { type:'info',    icon:'smart_toy',   title:'AI Recommends Fast-Track 4 Apps',   desc:'Credit profiles of FIN-2401, 2404, 2407 suggest expedited review opportunity.' },
];

const TIMELINE = [
  { status:'completed', title:'Application Submitted',   desc:'KYC and documents received',       time:'Jun 5, 2026'  },
  { status:'completed', title:'Credit Bureau Check',     desc:'CIBIL score 780 – Excellent',      time:'Jun 6, 2026'  },
  { status:'completed', title:'Risk Assessment',         desc:'Low risk – cleared for approval',  time:'Jun 7, 2026'  },
  { status:'active',    title:'Credit Committee Review', desc:'Awaiting final sign-off',          time:'Jun 10, 2026' },
  { status:'pending',   title:'Loan Disbursement',       desc:'Pending committee approval',       time:'Scheduled'    },
  { status:'pending',   title:'First EMI Collection',    desc:'Auto-debit setup required',        time:'Jul 1, 2026'  },
];

const FUNNEL_STEPS = [
  { label:'Total Applications', count:1284, pct:100,  color:'#2563EB' },
  { label:'Documents Verified', count:1102, pct:85.8, color:'#0EA5E9' },
  { label:'Credit Checked',     count:947,  pct:73.7, color:'#7C3AED' },
  { label:'Under Review',       count:612,  pct:47.7, color:'#F59E0B' },
  { label:'Approved',           count:745,  pct:58.0, color:'#10B981' },
  { label:'Disbursed',          count:698,  pct:54.4, color:'#10B981' },
];

const NAV_PAGES = {
  'Dashboard':       { title:'Dashboard',       breadcrumb:'Overview',     pageId:'dashboard'    },
  'Applications':    { title:'Applications',    breadcrumb:'Applications', pageId:'applications'  },
  'Payments':        { title:'Payments',        breadcrumb:'Payments',     pageId:'payments'      },
  'Customers':       { title:'Customers',       breadcrumb:'Management',   pageId:'customers'     },
  'Loan Portfolio':  { title:'Loan Portfolio',  breadcrumb:'Management',   pageId:'portfolio'     },
  'Credit Risk':     { title:'Credit Risk',     breadcrumb:'Management',   pageId:'risk'          },
  'Reports':         { title:'Reports',         breadcrumb:'Analytics',    pageId:'reports'       },
  'AI Insights':     { title:'AI Insights',     breadcrumb:'Analytics',    pageId:'ai-insights'   },
  'Compliance':      { title:'Compliance',      breadcrumb:'Analytics',    pageId:'compliance'    },
  'Settings':        { title:'Settings',        breadcrumb:'System',       pageId:'settings'      },
  'Help & Support':  { title:'Help & Support',  breadcrumb:'System',       pageId:'help'          },
};

// ── Page Switcher ──────────────────────────────────
function switchPage(pageId) {
  document.querySelectorAll('.page-content').forEach(function(p) {
    p.style.display = 'none';
  });
  var target = document.getElementById('page-' + pageId)
    || document.getElementById('page-dashboard');
  if (!target) return;
  target.style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
  if (typeof gsap !== 'undefined') {
    gsap.fromTo(target,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }
}

// ── Toast Notification System ──────────────────────
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = [
      'position:fixed', 'bottom:24px', 'right:24px',
      'display:flex', 'flex-direction:column', 'gap:10px',
      'z-index:9999', 'pointer-events:none'
    ].join(';');
    document.body.appendChild(container);
  }

  const colors = {
    info:    { bg:'#EFF6FF', border:'#2563EB', icon:'info',         iconColor:'#2563EB' },
    success: { bg:'#ECFDF5', border:'#10B981', icon:'check_circle', iconColor:'#10B981' },
    warning: { bg:'#FFFBEB', border:'#F59E0B', icon:'warning',      iconColor:'#F59E0B' },
    error:   { bg:'#FEF2F2', border:'#EF4444', icon:'cancel',       iconColor:'#EF4444' },
  };
  const c = colors[type] || colors.info;

  const toast = document.createElement('div');
  toast.style.cssText = [
    `background:${c.bg}`,
    `border:1px solid ${c.border}`,
    'border-radius:12px',
    'padding:12px 16px',
    'display:flex',
    'align-items:center',
    'gap:10px',
    'font-family:Inter,sans-serif',
    'font-size:14px',
    'color:#0F172A',
    'box-shadow:0 8px 24px rgba(0,0,0,0.12)',
    'pointer-events:all',
    'max-width:320px',
    'transform:translateX(120%)',
    'transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    'cursor:pointer',
  ].join(';');

  toast.innerHTML = `
    <span class="material-symbols-outlined" style="font-size:18px;color:${c.iconColor};flex-shrink:0">${c.icon}</span>
    <span style="flex:1;line-height:1.4">${message}</span>
    <span class="material-symbols-outlined" style="font-size:16px;color:#94A3B8;flex-shrink:0">close</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => { toast.style.transform = 'translateX(0)'; });

  const remove = () => {
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 300);
  };

  toast.addEventListener('click', remove);
  setTimeout(remove, 3500);
}

// ── Render Helpers ─────────────────────────────────
function badgeHTML(status) {
  const map = { approved:'Approved', pending:'Pending', review:'Under Review', rejected:'Rejected', active:'Active' };
  return `<span class="badge badge-${status}">${map[status] || status}</span>`;
}

function scoreColor(score) {
  if (score >= 750) return 'var(--color-success)';
  if (score >= 700) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

// ── Render Applications Table ──────────────────────
function renderTable(data) {
  data = data || APPLICATIONS;
  
  ['applicationsBody', 'pageApplicationsBody'].forEach(id => {
    const tbody = document.getElementById(id);
    if (!tbody) return;

    tbody.innerHTML = data.map(app => `
      <tr tabindex="0" data-id="${app.id}">
        <td>
          <div class="applicant-cell">
            <div class="applicant-avatar" style="background:${app.color}">${app.initials}</div>
            <div>
              <div class="applicant-name">${app.name}</div>
              <div class="applicant-id">${app.id}</div>
            </div>
          </div>
        </td>
        <td>${app.type}</td>
        <td><strong>${app.amount}</strong></td>
        <td><span style="color:${scoreColor(app.score)};font-weight:600">${app.score}</span></td>
        <td>${badgeHTML(app.status)}</td>
        <td>
          <div class="progress-wrap">
            <div class="progress-track" style="width:80px">
              <div class="progress-fill" style="width:${app.progress}%;background:${app.progress===100?'var(--color-success)':'var(--color-primary)'}"></div>
            </div>
            <span class="progress-label">${app.progress}%</span>
          </div>
        </td>
        <td>${app.officer}</td>
        <td>${app.date}</td>
        <td>
          <div class="flex gap-2">
            <button class="btn btn-sm btn-outline view-btn" data-id="${app.id}" title="View">
              <span class="material-symbols-outlined" style="font-size:14px">open_in_new</span>
            </button>
            <button class="btn btn-sm btn-ghost more-btn" data-id="${app.id}" title="More">
              <span class="material-symbols-outlined" style="font-size:14px">more_horiz</span>
            </button>
          </div>
        </td>
      </tr>
    `).join('');

    // Wire up row and button clicks for this specific tbody
    tbody.querySelectorAll('tr').forEach(row => {
      row.addEventListener('click', function(e) {
        if (e.target.closest('.view-btn') || e.target.closest('.more-btn')) return;
        showToast('Viewing application ' + this.dataset.id, 'info');
      });
      row.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') this.click();
      });
    });

    tbody.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        showToast('Opening full view for ' + this.dataset.id, 'info');
      });
    });

    tbody.querySelectorAll('.more-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        showToast('Options for ' + this.dataset.id, 'info');
      });
    });
  });

  const countEl = document.getElementById('tableCount');
  if (countEl) {
    countEl.textContent = 'Showing ' + data.length + ' of ' + APPLICATIONS.length + ' applications';
  }
}

// ── Render Activity ────────────────────────────────
function renderActivity() {
  const list = document.getElementById('activityList');
  if (!list) return;
  list.innerHTML = ACTIVITY.map(a => `
    <div class="activity-item" role="listitem" style="cursor:pointer">
      <div class="activity-icon ${a.type}">
        <span class="material-symbols-outlined">${a.icon}</span>
      </div>
      <div class="activity-content">
        <div class="activity-text">${a.text}</div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.activity-item').forEach(item => {
    item.addEventListener('click', () => showToast('Activity details opened', 'info'));
  });
}

// ── Render AI Insights ─────────────────────────────
function renderAIInsights() {
  const panel = document.getElementById('aiInsightsPanel');
  if (!panel) return;
  panel.innerHTML = AI_INSIGHTS.map(ins => `
    <div class="ai-insight-item" tabindex="0">
      <div class="ai-insight-icon ${ins.type}">
        <span class="material-symbols-outlined">${ins.icon}</span>
      </div>
      <div class="ai-insight-content">
        <div class="ai-insight-title">${ins.title}</div>
        <div class="ai-insight-desc">${ins.desc}</div>
        <span class="ai-insight-action">
          Take action <span class="material-symbols-outlined" style="font-size:12px">arrow_forward</span>
        </span>
      </div>
    </div>
  `).join('');

  panel.querySelectorAll('.ai-insight-item').forEach(item => {
    item.addEventListener('click', () => showToast('AI insight expanded', 'info'));
    item.addEventListener('keydown', e => { if (e.key === 'Enter') item.click(); });
  });

  panel.querySelectorAll('.ai-insight-action').forEach(action => {
    action.addEventListener('click', e => {
      e.stopPropagation();
      showToast('Action initiated', 'success');
    });
  });
}

// ── Render Timeline ────────────────────────────────
function renderTimeline() {
  const container = document.getElementById('journeyTimeline');
  if (!container) return;
  container.innerHTML = TIMELINE.map(step => `
    <div class="timeline-item">
      <div class="timeline-dot ${step.status}"></div>
      <div class="timeline-title">${step.title}</div>
      <div class="timeline-desc">${step.desc}</div>
      <div class="timeline-time">${step.time}</div>
    </div>
  `).join('');
}

// ── Render Funnel ──────────────────────────────────
function renderFunnel() {
  const container = document.getElementById('funnelSteps');
  if (!container) return;
  container.innerHTML = FUNNEL_STEPS.map(step => `
    <div class="funnel-step">
      <div class="funnel-meta">
        <span class="funnel-label">${step.label}</span>
        <span class="funnel-count">${step.count.toLocaleString()}</span>
      </div>
      <div class="funnel-bar-track">
        <div class="funnel-bar-fill" style="background:${step.color};width:0" data-width="${step.pct}%"></div>
      </div>
      <div class="funnel-pct">${step.pct}% of total</div>
    </div>
  `).join('');

  // Animate bars after render
  setTimeout(() => {
    container.querySelectorAll('.funnel-bar-fill').forEach(bar => {
      bar.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
      bar.style.width = bar.dataset.width;
    });
  }, 300);
}

// ── Sidebar ────────────────────────────────────────
function initSidebar() {
  const sidebar    = document.getElementById('sidebar');
  const main       = document.getElementById('mainContent');
  const toggle     = document.getElementById('sidebarToggle');
  const overlay    = document.getElementById('sidebarOverlay');
  const mobileBtn  = document.getElementById('mobileSidebarBtn');
  const pageTitle  = document.querySelector('.page-title');
  const breadcrumb = document.querySelector('.breadcrumb-current');

  if (!sidebar) return;

  let collapsed = false;

  // ── Desktop toggle ──
  if (toggle) {
    toggle.addEventListener('click', function() {
      collapsed = !collapsed;
      sidebar.classList.toggle('collapsed', collapsed);
      if (main) main.classList.toggle('sidebar-collapsed', collapsed);
      const icon = toggle.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = collapsed ? 'menu' : 'menu_open';
    });
  }

  // ── Mobile open ──
  if (mobileBtn) {
    mobileBtn.addEventListener('click', function() {
      sidebar.classList.add('mobile-open');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // ── Close mobile ──
  function closeMobile() {
    sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (overlay) overlay.addEventListener('click', closeMobile);

  // ── Nav items ──
  const navItems = sidebar.querySelectorAll('.nav-item');
  navItems.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault(); // prevent href="#" scroll jump

      // Update active state
      navItems.forEach(i => {
        i.classList.remove('active');
        i.removeAttribute('aria-current');
      });
      this.classList.add('active');
      this.setAttribute('aria-current', 'page');

      // Update page title & breadcrumb
      const label = this.querySelector('.nav-label');
      if (label) {
        const name = label.textContent.trim();
        const page = NAV_PAGES[name];
        if (page) {
          if (pageTitle)  pageTitle.textContent  = page.title;
          if (breadcrumb) breadcrumb.textContent = page.breadcrumb;
          switchPage(page.pageId);
        }
        showToast('Navigated to ' + name, 'info');
      }

      // Close mobile sidebar if open
      if (window.innerWidth < 768) closeMobile();
    });

    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}

// ── Table Filters ──────────────────────────────────
function initTableFilters() {
  const filterGroups = document.querySelectorAll('.table-filters');
  filterGroups.forEach(function(group) {
    const chips = group.querySelectorAll('.filter-chip');
    chips.forEach(function(chip) {
      chip.addEventListener('click', function() {
        chips.forEach(c => { c.classList.remove('active'); c.setAttribute('aria-pressed','false'); });
        this.classList.add('active');
        this.setAttribute('aria-pressed','true');

        const filter = this.dataset.filter;
        const filtered = filter === 'all'
          ? APPLICATIONS
          : APPLICATIONS.filter(a => a.status === filter);
        renderTable(filtered);
        
        // Synchronize active states of filter chips in the other page's table-filters
        const otherGroups = document.querySelectorAll('.table-filters');
        otherGroups.forEach(og => {
          if (og !== group) {
            const ogChips = og.querySelectorAll('.filter-chip');
            ogChips.forEach(oc => {
              if (oc.dataset.filter === filter) {
                ogChips.forEach(c => { c.classList.remove('active'); c.setAttribute('aria-pressed','false'); });
                oc.classList.add('active');
                oc.setAttribute('aria-pressed','true');
              }
            });
          }
        });

        showToast('Filtered: ' + this.textContent.trim(), 'info');
      });
    });
  });
}

// ── Search ─────────────────────────────────────────
function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  var timer;
  input.addEventListener('input', function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      const q = input.value.toLowerCase().trim();
      const filtered = q
        ? APPLICATIONS.filter(a =>
            a.name.toLowerCase().includes(q) ||
            a.id.toLowerCase().includes(q) ||
            a.type.toLowerCase().includes(q)
          )
        : APPLICATIONS;
      renderTable(filtered);
    }, 200);
  });
}

// ── New Application Button ─────────────────────────
function initNewAppBtn() {
  const btn = document.getElementById('newAppBtn');
  if (!btn) return;
  btn.addEventListener('click', function() {
    showToast('New Application form coming soon!', 'success');
  });
}

// ── Pagination ─────────────────────────────────────
function initPagination() {
  const pageBtns = document.querySelectorAll('.page-btn');
  pageBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      pageBtns.forEach(b => { b.classList.remove('active'); b.removeAttribute('aria-current'); });
      this.classList.add('active');
      this.setAttribute('aria-current','page');
      const label = this.getAttribute('aria-label') || this.textContent.trim();
      showToast('Loading page ' + label, 'info');
    });
  });
}

// ── Topbar Buttons ─────────────────────────────────
function initTopbarButtons() {
  // Notifications
  const notifBtn = document.querySelector('[aria-label="Notifications"]');
  if (notifBtn) {
    notifBtn.addEventListener('click', function() {
      showToast('You have 7 unread notifications', 'warning');
    });
  }

  // Download / Export
  const downloadBtn = document.querySelector('[aria-label="Download report"]');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      showToast('Generating report export…', 'success');
    });
  }

  // Date pill
  const datePill = document.getElementById('datePill');
  if (datePill) {
    datePill.addEventListener('click', function() {
      showToast('Date range picker coming soon!', 'info');
    });
  }

  // Profile dropdown setup
  initProfileDropdown();

  // Sidebar footer user block
  const footerUser = document.querySelector('.sidebar-footer');
  if (footerUser) {
    footerUser.addEventListener('click', function() {
      navigateToSettings();
    });
  }
}

function initProfileDropdown() {
  const container = document.getElementById('profileDropdownContainer');
  const avatarBtn = document.getElementById('topbarUserAvatar');
  const menu      = document.getElementById('profileDropdownMenu');
  
  if (!container || !avatarBtn || !menu) return;
  
  avatarBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    menu.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!container.contains(e.target)) {
      menu.classList.remove('active');
    }
  });
  
  // Dropdown menu items
  const updateInfoBtn = document.getElementById('dropdownUpdateInfo');
  const settingsBtn   = document.getElementById('dropdownSettings');
  const logoutBtn     = document.getElementById('dropdownLogout');
  
  if (updateInfoBtn) {
    updateInfoBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      menu.classList.remove('active');
      navigateToSettings();
    });
  }
  
  if (settingsBtn) {
    settingsBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      menu.classList.remove('active');
      navigateToSettings();
    });
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      menu.classList.remove('active');
      handleLogout();
    });
  }
}

function handleLogout() {
  showToast('Logging out...', 'info');
  const logoutOverlay = document.getElementById('logoutOverlay');
  if (logoutOverlay) {
    logoutOverlay.classList.add('active');
  }
}

function initLogoutOverlay() {
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      const logoutOverlay = document.getElementById('logoutOverlay');
      if (logoutOverlay) {
        logoutOverlay.classList.remove('active');
      }
      showToast('Logged back in successfully!', 'success');
      // Navigate back to dashboard on log back in
      const dashboardNavItem = Array.from(document.querySelectorAll('.sidebar .nav-item')).find(function(item) {
        const label = item.querySelector('.nav-label');
        return label && label.textContent.trim() === 'Dashboard';
      });
      if (dashboardNavItem) {
        dashboardNavItem.click();
      }
    });
  }
}

function navigateToSettings() {
  const settingsNavItem = Array.from(document.querySelectorAll('.sidebar .nav-item')).find(function(item) {
    const label = item.querySelector('.nav-label');
    return label && label.textContent.trim() === 'Settings';
  });
  if (settingsNavItem) {
    settingsNavItem.click();
  }
}

// ── Card Action Buttons ────────────────────────────
function initCardButtons() {
  // More-options (⋯) buttons
  document.querySelectorAll('.btn-ghost .material-symbols-outlined').forEach(function(icon) {
    if (icon.textContent.trim() === 'more_horiz') {
      icon.closest('button').addEventListener('click', function() {
        showToast('Options menu opened', 'info');
      });
    }
  });

  // Export button
  document.querySelectorAll('.btn-outline').forEach(function(btn) {
    if (btn.textContent.trim().includes('Export')) {
      btn.addEventListener('click', function() {
        showToast('Exporting data as CSV…', 'success');
      });
    }
    if (btn.textContent.trim().includes('Filter')) {
      btn.addEventListener('click', function() {
        showToast('Filter options opened', 'info');
      });
    }
  });

  // Full View button
  document.querySelectorAll('.btn-primary').forEach(function(btn) {
    if (btn.textContent.trim().includes('Full View')) {
      btn.addEventListener('click', function() {
        showToast('Opening full application journey view', 'info');
      });
    }
  });

  // View all activity
  document.querySelectorAll('[aria-label="View all activity"]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      showToast('Loading all activity logs…', 'info');
    });
  });
}

// ── AI Copilot ─────────────────────────────────────
const COPILOT_RESPONSES = [
  'Approval rates are up 12% this month. Key driver: improved document verification speed.',
  "I've identified 3 high-value applications ready for fast-track review: FIN-2401, FIN-2404, and FIN-2407.",
  'Overdue payments are concentrated in Q4 disbursements. Recommend proactive outreach to 7 accounts.',
  'Credit score distribution shows 65% of applicants scoring above 720 — healthiest in 6 months.',
  'I can generate a full risk report for any application. Which one would you like to analyze?',
];
var copilotIdx = 0;

function initCopilot() {
  const input    = document.getElementById('copilotInput');
  const sendBtn  = document.getElementById('copilotSend');
  const messages = document.getElementById('copilotMessages');
  const chips    = document.querySelectorAll('.copilot-chip');

  if (!sendBtn || !messages) return;

  function sendMessage(text) {
    text = text.trim();
    if (!text) return;

    // User bubble
    var userMsg = document.createElement('div');
    userMsg.className = 'copilot-msg user';
    userMsg.textContent = text;
    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;

    // Typing indicator
    var typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    // AI reply after delay
    setTimeout(function() {
      messages.removeChild(typing);
      var reply = COPILOT_RESPONSES[copilotIdx % COPILOT_RESPONSES.length];
      copilotIdx++;
      var aiMsg = document.createElement('div');
      aiMsg.className = 'copilot-msg ai';
      aiMsg.textContent = reply;
      messages.appendChild(aiMsg);
      messages.scrollTop = messages.scrollHeight;
    }, 1200);

    if (input) input.value = '';
  }

  sendBtn.addEventListener('click', function() {
    sendMessage(input ? input.value : '');
  });

  if (input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(this.value); }
    });
  }

  chips.forEach(function(chip) {
    chip.addEventListener('click', function() {
      sendMessage(this.textContent.trim());
    });
  });
}

// ── Date Pill ──────────────────────────────────────
function initDatePill() {
  const el = document.getElementById('currentDate');
  if (!el) return;
  const now  = new Date();
  const opts = { year:'numeric', month:'short', day:'numeric' };
  el.textContent = now.toLocaleDateString('en-US', opts);
}

// ── KPI Pulse (GSAP) ──────────────────────────────
function initKPIPulse() {
  if (typeof gsap === 'undefined') return;
  var overdue = document.querySelector('.kpi-card.red .kpi-icon');
  if (!overdue) return;
  gsap.to(overdue, {
    boxShadow: '0 0 0 8px rgba(239,68,68,0.15)',
    duration: 1, repeat: -1, yoyo: true, ease: 'power1.inOut',
  });
}

// ── Settings ───────────────────────────────────────
function initSettings() {
  const saveBtn = document.getElementById('profileSaveBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      const nameInput = document.getElementById('profile-full-name');
      const emailInput = document.getElementById('profile-email');
      const roleInput = document.getElementById('profile-role');
      const branchInput = document.getElementById('profile-branch');
      
      if (nameInput && roleInput) {
        const name = nameInput.value.trim();
        const role = roleInput.value.trim();
        
        if (!name) {
          showToast('Full Name is required', 'error');
          return;
        }

        // Update user-name and user-role elements in DOM
        const sidebarName = document.querySelector('.sidebar-footer .user-name');
        if (sidebarName) sidebarName.textContent = name;
        
        const sidebarRole = document.querySelector('.sidebar-footer .user-role');
        if (sidebarRole) sidebarRole.textContent = role;
        
        const dropdownName = document.getElementById('dropdownUserName');
        if (dropdownName) dropdownName.textContent = name;
        
        const dropdownRole = document.getElementById('dropdownUserRole');
        if (dropdownRole) dropdownRole.textContent = role;
        

        

        
        // Compute and update initials on all avatars (NP)
        const parts = name.split(/\s+/);
        let initials = '';
        if (parts.length > 0 && parts[0]) {
          initials += parts[0].charAt(0).toUpperCase();
          if (parts.length > 1 && parts[parts.length - 1]) {
            initials += parts[parts.length - 1].charAt(0).toUpperCase();
          } else {
            initials += parts[0].slice(0, 2).toUpperCase();
          }
        }
        
        if (initials) {
          document.querySelectorAll('.user-avatar').forEach(function(av) {
            av.textContent = initials;
          });
        }
        
        showToast('Profile updated successfully!', 'success');
      }
    });
  }
}

// ── Init ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  renderFunnel();
  renderTimeline();
  renderAIInsights();
  renderTable();
  renderActivity();

  initSidebar();
  initTableFilters();
  initSearch();
  initNewAppBtn();
  initPagination();
  initTopbarButtons();
  initCardButtons();
  initCopilot();
  initDatePill();
  initSettings();
  initLogoutOverlay();

  if (typeof initCharts === 'function') initCharts();
  if (typeof initGSAP   === 'function') initGSAP();
  initKPIPulse();
});
