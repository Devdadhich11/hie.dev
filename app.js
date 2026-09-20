/**
 * Dev Dadhich — Portfolio Application Controller
 * Executive Masterpiece Edition: High-Impact Asymmetric Showcase Architecture & Filter Count Badges
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  const data = window.PORTFOLIO_DATA;
  let currentRole = 'apm';
  let chartInstance = null;
  let ecomChartInstance = null;
  let hasCountedStats = false;

  initPreloader();
  initTheme();
  initNavigation();
  initRoleSwitcher();
  setRole('apm'); // Force APM mode as default on initial load
  renderHeroStats();
  renderCompetencies();
  renderMarquee();
  renderPRDDoc();
  initChart();
  renderProjects('all');
  renderTimeline();
  renderEducation();
  initScrollAnimations();

  // -------------------------------------------------------------
  // Preloader Animation (DD -> Dev Dadhich expansion)
  // -------------------------------------------------------------
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    setTimeout(() => {
      preloader.classList.add('expand');
    }, 300);

    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.style.display = 'none', 600);
    }, 1300);
  }

  // -------------------------------------------------------------
  // Theme Manager
  // -------------------------------------------------------------
  function initTheme() {
    const btn = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeLabel(saved);

    if (btn) {
      btn.addEventListener('click', () => {
        const active = document.documentElement.getAttribute('data-theme');
        const next = active === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeLabel(next);
        if (chartInstance) updateChartColors(next);
      });
    }
  }

  function updateThemeLabel(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

  }

  function initNavigation() {
    const nav = document.querySelector('.nav-minimal');
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.nav-links a[data-section]');
    const sections = [...new Set([...links].map(link => document.getElementById(link.dataset.section)).filter(Boolean))];
    const setActive = (id) => links.forEach(link => link.classList.toggle('active', link.dataset.section === id));
    const closeMenu = () => {
      if (!menu || !toggle) return;
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      toggle.innerHTML = '<i data-lucide="menu"></i>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    toggle?.addEventListener('click', () => {
      const open = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      toggle.innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
    links.forEach(link => link.addEventListener('click', closeMenu));
    if (sections.length) {
      const observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.3, 0.6] });
      sections.forEach(section => observer.observe(section));
    }
    window.addEventListener('scroll', () => {
      nav?.classList.toggle('is-scrolled', window.scrollY > 20);
      if (window.scrollY < 120) setActive('');
    }, { passive: true });
  }

  // -------------------------------------------------------------
  // Role Mode Switcher (APM Mode Default)
  // -------------------------------------------------------------
  function initRoleSwitcher() {
    const apmBtn = document.getElementById('role-btn-apm');
    const baBtn = document.getElementById('role-btn-ba');

    if (apmBtn && baBtn) {
      apmBtn.addEventListener('click', () => setRole('apm'));
      baBtn.addEventListener('click', () => setRole('ba'));
    }
  }

  function setRole(role) {
    currentRole = role;
    const apmBtn = document.getElementById('role-btn-apm');
    const baBtn = document.getElementById('role-btn-ba');
    const roleTitle = document.getElementById('hero-role-title');
    const roleTagline = document.getElementById('hero-role-tagline');
    const bioText = document.getElementById('hero-bio-text');

    if (role === 'apm') {
      if (apmBtn) apmBtn.classList.add('active');
      if (baBtn) baBtn.classList.remove('active');
      if (roleTitle) roleTitle.textContent = "Aspiring Associate Product Manager";
      if (roleTagline) roleTagline.textContent = data.roles.apm.heroTagline;
      if (bioText) bioText.textContent = data.profile.bioAPM;
      updateFocusBullets(data.roles.apm.focus);
    } else {
      if (baBtn) baBtn.classList.add('active');
      if (apmBtn) apmBtn.classList.remove('active');
      if (roleTitle) roleTitle.textContent = "Aspiring Business Analyst";
      if (roleTagline) roleTagline.textContent = data.roles.ba.heroTagline;
      if (bioText) bioText.textContent = data.profile.bioBA;
      updateFocusBullets(data.roles.ba.focus);
    }
  }

  function updateFocusBullets(list) {
    const container = document.getElementById('role-focus-bullets');
    if (!container) return;
    container.innerHTML = list.map(item => `
      <div class="flex items-start gap-3 py-2 border-b border-zinc-800/40 last:border-0 text-xs md:text-sm">
        <span class="font-mono text-dim font-bold">/</span>
        <span class="text-sub font-semibold">${item}</span>
      </div>
    `).join('');
  }

  // -------------------------------------------------------------
  // Render Hero Metrics & Animated Counter
  // -------------------------------------------------------------
  function renderHeroStats() {
    const grid = document.getElementById('hero-stats-grid');
    if (!grid) return;
    grid.innerHTML = data.profile.stats.map((s, idx) => `
      <div class="py-4 px-3 border-r border-zinc-800/60 last:border-0 text-center sm:text-left">
        <div class="text-3xl md:text-4xl font-extrabold text-main font-mono flex items-center justify-center sm:justify-start">
          <span id="stat-val-${idx}">0</span><span>${s.suffix}</span>
        </div>
        <div class="text-xs font-semibold text-sub mt-1 leading-tight">${s.label}</div>
      </div>
    `).join('');
  }

  function triggerStatsCounter() {
    if (hasCountedStats) return;
    hasCountedStats = true;

    data.profile.stats.forEach((s, idx) => {
      const el = document.getElementById(`stat-val-${idx}`);
      if (!el) return;

      const target = s.num;
      const duration = 1500;
      const steps = 30;
      const stepTime = duration / steps;
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  // -------------------------------------------------------------
  // 3-Line Infinite Marquee System
  // -------------------------------------------------------------
  function renderMarquee() {
    const container = document.getElementById('marquee-section');
    if (!container) return;

    const buildTrack = (items, directionClass) => {
      const chips = items.map(item => `<div class="marquee-chip">${item}</div>`).join('');
      return `
        <div class="marquee-container mb-3">
          <div class="marquee-track ${directionClass}">
            ${chips} ${chips} ${chips}
          </div>
        </div>
      `;
    };

    container.innerHTML = `
      <div class="py-6">
        <span class="section-tag mb-4 block">[ TECHNOLOGIES & TOOLS MATRIX ]</span>
        ${buildTrack(data.marquee.line1, 'marquee-left')}
        ${buildTrack(data.marquee.line2, 'marquee-right')}
        ${buildTrack(data.marquee.line3, 'marquee-left')}
      </div>
    `;
  }

  // -------------------------------------------------------------
  // Render Competency Pillars
  // -------------------------------------------------------------
  function renderCompetencies() {
    const container = document.getElementById('competencies-grid');
    if (!container) return;
    container.innerHTML = data.competencies.map(c => `
      <div class="minimal-card p-6 flex flex-col justify-between reveal-on-scroll">
        <div>
          <div class="font-mono text-xs font-bold text-dim mb-3">[ ${c.code} ]</div>
          <h3 class="text-lg font-bold text-main mb-2">${c.title}</h3>
          <p class="text-xs font-medium text-sub leading-relaxed">${c.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // -------------------------------------------------------------
  // Interactive PRD Document Viewer (High-Contrast Refined Box Styling)
  // -------------------------------------------------------------
  function renderPRDDoc() {
    const prd = data.samplePRD;
    const content = document.getElementById('prd-doc-body');
    const tabs = document.querySelectorAll('.prd-nav-tab');
    if (!content) return;

    window.switchPrdView = (view) => {
      tabs.forEach(t => {
        if (t.dataset.view === view) {
          t.classList.add('bg-zinc-800', 'text-white');
          t.classList.remove('text-dim');
        } else {
          t.classList.remove('bg-zinc-800', 'text-white');
          t.classList.add('text-dim');
        }
      });

      if (view === 'overview') {
        content.innerHTML = `
          <div class="space-y-4">
            <div class="prd-content-box">
              <span class="section-tag">PROBLEM STATEMENT</span>
              <p class="text-xs md:text-sm font-semibold text-main mt-1 leading-relaxed">${prd.problem}</p>
            </div>
            <div class="prd-content-box">
              <span class="section-tag">CORE OBJECTIVES</span>
              <ul class="list-disc list-inside text-xs md:text-sm font-semibold text-main mt-2 space-y-1">
                ${prd.objectives.map(o => `<li>${o}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
      } else if (view === 'stories') {
        content.innerHTML = `
          <div class="space-y-3">
            <span class="section-tag">USER STORIES & ACCEPTANCE CRITERIA</span>
            ${prd.stories.map(s => `
              <div class="prd-content-box text-xs">
                <span class="font-mono text-main font-bold">AS A ${s.role.toUpperCase()}:</span> 
                <span class="text-main font-semibold">I want to ${s.task},</span> 
                <span class="text-sub italic font-medium">so that ${s.value}</span>
              </div>
            `).join('')}
          </div>
        `;
      } else if (view === 'tech') {
        content.innerHTML = `
          <div class="space-y-3">
            <span class="section-tag">TECHNICAL ARCHITECTURE</span>
            <div class="grid grid-cols-2 gap-2 font-mono text-xs">
              ${prd.architecture.map(a => `
                <div class="prd-content-box text-main font-bold flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span> ${a}
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (view === 'metrics') {
        content.innerHTML = `
          <div class="space-y-3">
            <span class="section-tag">MEASURED SUCCESS KPIS</span>
            <div class="space-y-2 text-xs font-mono">
              ${prd.metrics.map(m => `
                <div class="prd-content-box text-main font-bold flex items-center gap-2">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i> ${m}
                </div>
              `).join('')}
            </div>
          </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    };

    tabs.forEach(t => {
      t.addEventListener('click', () => window.switchPrdView(t.dataset.view));
    });

    window.switchPrdView('overview');
  }

  // -------------------------------------------------------------
  // Minimalist RWMS Chart.js Simulation
  // -------------------------------------------------------------
  function initChart() {
    const canvas = document.getElementById('minimal-chart-canvas');
    if (!canvas || typeof Chart === 'undefined') return;

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    chartInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: data.chartData.labels,
        datasets: [
          {
            label: 'Candidates',
            data: data.chartData.candidates,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(9, 9, 11, 0.85)',
            borderRadius: 4
          },
          {
            label: 'SLA Met (%)',
            data: data.chartData.sla,
            backgroundColor: isDark ? 'rgba(212, 212, 216, 0.45)' : 'rgba(82, 82, 91, 0.45)',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 42, right: 4, bottom: 0, left: 0 }
        },
        plugins: {
          legend: {
            labels: {
              color: isDark ? '#f4f4f5' : '#09090b',
              font: { family: 'JetBrains Mono', size: 11, weight: 'bold' }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: isDark ? '#27272a' : '#e4e4e7',
              drawOnChartArea: true,
              drawTicks: true,
              z: -1
            },
            ticks: { color: isDark ? '#d4d4d8' : '#3f3f46', font: { family: 'JetBrains Mono', size: 10, weight: 'bold' } }
          },
          y: {
            grid: {
              color: isDark ? '#27272a' : '#e4e4e7',
              drawOnChartArea: true,
              drawTicks: true,
              z: -1
            },
            ticks: { color: isDark ? '#d4d4d8' : '#3f3f46', font: { family: 'JetBrains Mono', size: 10, weight: 'bold' } }
          }
        }
      }
    });
  }

  function updateChartColors(theme) {
    if (!chartInstance) return;
    const isDark = theme === 'dark';
    chartInstance.data.datasets[0].backgroundColor = isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(9, 9, 11, 0.85)';
    chartInstance.data.datasets[1].backgroundColor = isDark ? 'rgba(212, 212, 216, 0.45)' : 'rgba(82, 82, 91, 0.45)';
    chartInstance.options.plugins.legend.labels.color = isDark ? '#f4f4f5' : '#09090b';
    chartInstance.options.scales.x.grid.color = isDark ? '#27272a' : '#e4e4e7';
    chartInstance.options.scales.x.ticks.color = isDark ? '#d4d4d8' : '#3f3f46';
    chartInstance.options.scales.y.grid.color = isDark ? '#27272a' : '#e4e4e7';
    chartInstance.options.scales.y.ticks.color = isDark ? '#d4d4d8' : '#3f3f46';
    chartInstance.update();
    if (document.getElementById('ecom-line-chart-canvas')) {
      initEcomLineChart();
    }
  }

  function initEcomLineChart() {
    const canvas = document.getElementById('ecom-line-chart-canvas');
    if (!canvas || typeof Chart === 'undefined') return;

    if (ecomChartInstance) {
      ecomChartInstance.destroy();
      ecomChartInstance = null;
    }

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const chartData = data.ecomChartData || {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      cart: [6200, 6800, 6500, 6100, 1741],
      purchase: [3100, 3400, 3200, 3000, 729]
    };

    ecomChartInstance = new Chart(canvas, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Cart Events',
            data: chartData.cart,
            borderColor: '#34d399',
            backgroundColor: 'rgba(52, 211, 153, 0.12)',
            borderWidth: 2,
            tension: 0.35,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: '#34d399',
            pointHoverRadius: 6
          },
          {
            label: 'Purchase Events',
            data: chartData.purchase,
            borderColor: '#60a5fa',
            backgroundColor: 'rgba(96, 165, 250, 0.12)',
            borderWidth: 2,
            tension: 0.35,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: '#60a5fa',
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 8, right: 8, bottom: 0, left: 0 }
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              color: isDark ? '#f4f4f5' : '#09090b',
              font: { family: 'JetBrains Mono', size: 9, weight: 'bold' },
              boxWidth: 8,
              usePointStyle: true
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(ctx) {
                return ` ${ctx.dataset.label}: ${ctx.raw.toLocaleString()} events`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: isDark ? '#27272a' : '#e4e4e7',
              drawOnChartArea: true,
              drawTicks: false
            },
            ticks: {
              color: isDark ? '#a1a1aa' : '#52525b',
              font: { family: 'JetBrains Mono', size: 9, weight: 'bold' }
            }
          },
          y: {
            grid: {
              color: isDark ? '#27272a' : '#e4e4e7',
              drawOnChartArea: true,
              drawTicks: false
            },
            ticks: {
              color: isDark ? '#a1a1aa' : '#52525b',
              font: { family: 'JetBrains Mono', size: 9, weight: 'bold' },
              callback: function(val) {
                return val >= 1000 ? (val / 1000) + 'k' : val;
              }
            }
          }
        }
      }
    });
  }

  // -------------------------------------------------------------
  // Render Projects (Equal-weight organized grid)
  // -------------------------------------------------------------
  function renderProjects(filter) {
    const grid = document.getElementById('projects-grid');
    const filterBtns = document.querySelectorAll('.filter-pill');
    if (!grid) return;

    filterBtns.forEach(b => {
      if (b.dataset.filter === filter) {
        b.classList.add('bg-zinc-800', 'text-white');
        b.classList.remove('text-dim');
      } else {
        b.classList.remove('bg-zinc-800', 'text-white');
        b.classList.add('text-dim');
      }
    });

    const items = filter === 'all'
      ? data.projects
      : data.projects.filter(p => p.type.toLowerCase().includes(filter));
    items.sort((a, b) => (a.id === 'avionic-crm-product' ? -1 : b.id === 'avionic-crm-product' ? 1 : 0));

    if (!items.length) {
      grid.innerHTML = `<div class="col-span-full py-12 text-center text-dim font-mono">No projects found for this category.</div>`;
      return;
    }

    const imageFallback = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80";
    const projectIcons = {
      'avionic-crm-product': 'workflow',
      'power-plant-analytics': 'bar-chart-3',
      'vyndo-market-strategy': 'megaphone',
      'ravivari-retail-study': 'store',
      'drishti-brand-web': 'clapperboard',
      'eventsphere-app': 'calendar-days',
      'pinkcity-parichay': 'map',
      'frames-of-friendship': 'film'
    };
    grid.innerHTML = items.map(p => `
      <article class="project-card cursor-pointer group reveal-on-scroll" onclick="openCaseModal('${p.id}')">
        <div class="project-card-top">
          <span class="project-number">${p.num}</span>
          <span class="project-type">${p.type}</span>
          <i data-lucide="arrow-up-right" class="project-arrow"></i>
        </div>
        <div class="project-card-visual" aria-hidden="true">
          <span class="project-visual-label">CASE / ${p.num}</span>
          <span class="project-visual-mark"><i data-lucide="${projectIcons[p.id] || 'sparkles'}"></i></span>
          <span class="project-visual-initial">${p.title.charAt(0)}</span>
          <span class="project-visual-line"></span>
        </div>
        <div class="project-card-content">
          <div class="project-card-meta"><span>${p.role}</span><span>${p.tags.length} skills</span></div>
          <h3>${p.title}</h3>
          <p>${p.summary}</p>
        </div>
        <div class="project-card-bottom">
          <div class="project-tags">${p.tags.slice(0, 3).map(t => `<span>${t}</span>`).join('')}</div>
          <span class="project-view">VIEW CASE</span>
        </div>
      </article>
    `).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();

    filterBtns.forEach(b => {
      b.onclick = () => renderProjects(b.dataset.filter);
    });

    initScrollAnimations();
  }

  // -------------------------------------------------------------
  // Case Study Modal Window with Smooth Zoom-In Spring Animation
  // -------------------------------------------------------------
  window.openImageLightbox = (src, alt) => {
    let lightbox = document.getElementById('ecom-lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'ecom-lightbox';
      lightbox.className = 'ecom-cs-lightbox';
      document.body.appendChild(lightbox);
    }
    lightbox.innerHTML = `
      <button class="ecom-cs-lightbox-close" onclick="closeImageLightbox()">&times;</button>
      <div class="ecom-cs-lightbox-img-wrap" onclick="event.stopPropagation()">
        <img src="${src}" alt="${alt}" class="ecom-cs-lightbox-img" />
        <div class="ecom-cs-lightbox-caption">${alt}</div>
      </div>
    `;
    lightbox.onclick = () => closeImageLightbox();
    lightbox.style.display = 'flex';
  };

  window.closeImageLightbox = () => {
    const lightbox = document.getElementById('ecom-lightbox');
    if (lightbox) {
      lightbox.style.display = 'none';
    }
  };

  window.openCaseModal = (id) => {
    const item = data.projects.find(p => p.id === id);
    if (!item) return;

    const modal = document.getElementById('case-modal');
    const body = document.getElementById('case-modal-body');
    if (!modal || !body) return;

    const totalProjects = String(data.projects.length).padStart(2, '0');

    if (id === 'ecommerce-performance-analytics') {
      body.classList.add('modal-dialog-wide');
      body.innerHTML = `
        <div class="case-study ecom-case-study">
          <!-- Header (Title Left, Image Right - Matching standard project overlay architecture) -->
          <header class="case-study-header">
            <div class="case-study-heading">
              <div class="case-study-kicker">
                <span>CASE ${item.num} / ${totalProjects}</span>
                <span>${item.type}</span>
              </div>
              <h2 class="case-study-title">${item.title}</h2>
              <p class="case-study-role">${item.role}</p>
              <p class="text-xs md:text-sm font-semibold text-sub mt-2 leading-relaxed max-w-lg">
                Turning 657K+ customer events into actionable category, brand, and conversion insights.
              </p>
            </div>
            <div class="case-study-image">
              <img src="Overview.png" onerror="this.onerror=null; this.src='Overview.png';" alt="${item.title}" />
            </div>
            <button onclick="closeCaseModal()" class="case-study-close" aria-label="Close case study">&times;</button>
          </header>

          <!-- SECTION 1: HERO METADATA BAR -->
          <section class="ecom-cs-section my-6">
            <div class="ecom-cs-meta-grid">
              <div class="ecom-cs-meta-pill">
                <span class="ecom-cs-meta-label">DATASET</span>
                <span class="ecom-cs-meta-val">657K+ events</span>
              </div>
              <div class="ecom-cs-meta-pill">
                <span class="ecom-cs-meta-label">USERS</span>
                <span class="ecom-cs-meta-val">122K+</span>
              </div>
              <div class="ecom-cs-meta-pill">
                <span class="ecom-cs-meta-label">PURCHASES</span>
                <span class="ecom-cs-meta-val">13K+</span>
              </div>
              <div class="ecom-cs-meta-pill">
                <span class="ecom-cs-meta-label">TOOLS</span>
                <span class="ecom-cs-meta-val">Power BI · DAX · Power Query</span>
              </div>
            </div>
          </section>

          <!-- SECTION 2: BUSINESS QUESTIONS -->
          <section class="ecom-cs-section">
            <div class="ecom-cs-sec-header">
              <span class="ecom-cs-tag">[ PROBLEM FRAMEWORK ]</span>
              <h2 class="ecom-cs-sec-title">Business Questions</h2>
            </div>
            <div class="ecom-cs-questions-grid">
              <div class="ecom-cs-q-card">
                <div class="ecom-cs-q-top">
                  <span class="ecom-cs-q-badge">CARD 1 / CONVERSION</span>
                  <i data-lucide="filter" class="w-4 h-4 text-emerald-400"></i>
                </div>
                <p class="ecom-cs-q-text">"Where are customers dropping out of the purchase funnel?"</p>
              </div>
              <div class="ecom-cs-q-card">
                <div class="ecom-cs-q-top">
                  <span class="ecom-cs-q-badge">CARD 2 / CATEGORY</span>
                  <i data-lucide="layers" class="w-4 h-4 text-emerald-400"></i>
                </div>
                <p class="ecom-cs-q-text">"Which categories are driving revenue?"</p>
              </div>
              <div class="ecom-cs-q-card">
                <div class="ecom-cs-q-top">
                  <span class="ecom-cs-q-badge">CARD 3 / BRAND</span>
                  <i data-lucide="award" class="w-4 h-4 text-emerald-400"></i>
                </div>
                <p class="ecom-cs-q-text">"Which brands drive volume versus value?"</p>
              </div>
              <div class="ecom-cs-q-card">
                <div class="ecom-cs-q-top">
                  <span class="ecom-cs-q-badge">CARD 4 / BEHAVIOUR</span>
                  <i data-lucide="activity" class="w-4 h-4 text-emerald-400"></i>
                </div>
                <p class="ecom-cs-q-text">"What factors are associated with purchase activity?"</p>
              </div>
            </div>
          </section>

          <!-- SECTION 3: DASHBOARD (2-Column Equal Width Side-by-Side Grid) -->
          <section class="ecom-cs-section">
            <div class="ecom-cs-sec-header">
              <span class="ecom-cs-tag">[ VISUAL ANALYTICS ]</span>
              <h2 class="ecom-cs-sec-title">Power BI Dashboard</h2>
              <p class="ecom-cs-sec-desc">Click any dashboard view below for a high-resolution full-screen preview.</p>
            </div>
            
            <div class="ecom-cs-dashboards-wrap">
              <!-- Dashboard 1 (Column 1) -->
              <div class="ecom-cs-dash-card">
                <div class="ecom-cs-dash-header">
                  <span class="ecom-cs-dash-title"><i data-lucide="layout-dashboard" class="w-4 h-4 inline mr-1 text-emerald-400"></i> Dashboard 1: Overview</span>
                  <span class="ecom-cs-zoom-hint"><i data-lucide="maximize-2" class="w-3.5 h-3.5 inline mr-1"></i> Expand</span>
                </div>
                <div class="ecom-cs-dash-img-frame" onclick="openImageLightbox('Overview.png', 'E-Commerce Performance Overview Dashboard')">
                  <img src="Overview.png" alt="E-Commerce Performance Overview" class="ecom-cs-dash-img" />
                  <div class="ecom-cs-img-overlay">
                    <span class="ecom-cs-overlay-btn"><i data-lucide="zoom-in" class="w-4 h-4 inline mr-1"></i> Full View</span>
                  </div>
                </div>
              </div>

              <!-- Dashboard 2 (Column 2) -->
              <div class="ecom-cs-dash-card">
                <div class="ecom-cs-dash-header">
                  <span class="ecom-cs-dash-title"><i data-lucide="smartphone" class="w-4 h-4 inline mr-1 text-emerald-400"></i> Dashboard 2: Smartphone Deep Dive</span>
                  <span class="ecom-cs-zoom-hint"><i data-lucide="maximize-2" class="w-3.5 h-3.5 inline mr-1"></i> Expand</span>
                </div>
                <div class="ecom-cs-dash-img-frame" onclick="openImageLightbox('Category and Brand Analysis.png', 'Category & Brand Analysis — Smartphone Deep Dive Dashboard')">
                  <img src="Category and Brand Analysis.png" alt="Category & Brand Analysis — Smartphone Deep Dive" class="ecom-cs-dash-img" />
                  <div class="ecom-cs-img-overlay">
                    <span class="ecom-cs-overlay-btn"><i data-lucide="zoom-in" class="w-4 h-4 inline mr-1"></i> Full View</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- SECTION 4: KEY INSIGHTS -->
          <section class="ecom-cs-section">
            <div class="ecom-cs-sec-header">
              <span class="ecom-cs-tag">[ EMPIRICAL FINDINGS ]</span>
              <h2 class="ecom-cs-sec-title">What the Data Revealed</h2>
            </div>

            <!-- TOP ROW: Left (Insight 1), Right ([New Line Chart Graph] + Insight 2) -->
            <div class="ecom-cs-insights-top-row">
              <!-- Left Column: INSIGHT 01 -->
              <div class="ecom-cs-insight-card">
                <div>
                  <div class="ecom-cs-insight-num">INSIGHT 01</div>
                  <h3 class="ecom-cs-insight-title">Conversion Bottleneck</h3>
                  
                  <div class="ecom-cs-funnel-wrap">
                    <div class="ecom-cs-funnel-step step-views">
                      <span class="funnel-val">657K</span>
                      <span class="funnel-lbl">VIEWS</span>
                    </div>
                    <div class="ecom-cs-funnel-arrow"><i data-lucide="chevron-down" class="w-4 h-4 text-zinc-500"></i></div>
                    <div class="ecom-cs-funnel-step step-carts">
                      <span class="funnel-val">27K</span>
                      <span class="funnel-lbl">CARTS</span>
                    </div>
                    <div class="ecom-cs-funnel-arrow"><i data-lucide="chevron-down" class="w-4 h-4 text-zinc-500"></i></div>
                    <div class="ecom-cs-funnel-step step-purchases">
                      <span class="funnel-val">13K</span>
                      <span class="funnel-lbl">PURCHASES</span>
                    </div>
                  </div>

                  <div class="ecom-cs-funnel-rates">
                    <div class="rate-badge">
                      <span class="rate-num">~4.1%</span>
                      <span class="rate-label">View → Cart</span>
                    </div>
                    <div class="rate-badge">
                      <span class="rate-num">~48.9%</span>
                      <span class="rate-label">Cart → Purchase</span>
                    </div>
                  </div>
                </div>

                <p class="ecom-cs-insight-interp">
                  "The largest observed funnel drop occurs before cart creation."
                </p>
              </div>

              <!-- Right Column: Stacked [New Graph] + [Insight 02] -->
              <div class="ecom-cs-insights-col-right">
                <!-- NEW GRAPH: CART & PURCHASE EVENT TREND LINE CHART -->
                <div class="ecom-cs-insight-card compact-card">
                  <div>
                    <div class="ecom-cs-insight-num">INSIGHT — EVENT TRENDS</div>
                    <h3 class="ecom-cs-insight-title">Cart & Purchase Funnel Activity</h3>
                    
                    <div class="ecom-chart-wrap">
                      <canvas id="ecom-line-chart-canvas"></canvas>
                    </div>
                  </div>

                  <p class="ecom-cs-insight-interp">
                    "Cart and purchase events track closely across Weeks 1–4 before experiencing a parallel decline in Week 5."
                  </p>
                </div>

                <!-- INSIGHT 02: REVENUE CONCENTRATION -->
                <div class="ecom-cs-insight-card compact-card">
                  <div>
                    <div class="ecom-cs-insight-num">INSIGHT 02</div>
                    <h3 class="ecom-cs-insight-title">Revenue Concentration</h3>
                    
                    <div class="ecom-cs-compare-bars">
                      <div class="compare-row">
                        <div class="compare-info">
                          <span class="compare-label">Smartphones</span>
                          <span class="compare-val text-emerald-400">≈ ₹3.9M revenue</span>
                        </div>
                        <div class="compare-bar-bg">
                          <div class="compare-bar-fill fill-smartphones" style="width: 95%;"></div>
                        </div>
                      </div>

                      <div class="compare-row">
                        <div class="compare-info">
                          <span class="compare-label">Next major category</span>
                          <span class="compare-val text-zinc-400">≈ ₹0.2M</span>
                        </div>
                        <div class="compare-bar-bg">
                          <div class="compare-bar-fill fill-next" style="width: 8%;"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p class="ecom-cs-insight-interp">
                    "Revenue is heavily concentrated in smartphones, increasing dependence on a single category."
                  </p>
                </div>
              </div>
            </div>

            <!-- BOTTOM ROW: INSIGHTS 03, 04, 05 -->
            <div class="ecom-cs-insights-grid">
              <!-- INSIGHT 03 -->
              <div class="ecom-cs-insight-card">
                <div>
                  <div class="ecom-cs-insight-num">INSIGHT 03</div>
                  <h3 class="ecom-cs-insight-title">Volume ≠ Value</h3>

                  <div class="ecom-cs-brand-split">
                    <div class="brand-box">
                      <span class="brand-name text-emerald-400">SAMSUNG</span>
                      <span class="brand-role">Highest purchase volume</span>
                    </div>
                    <div class="brand-divider">vs</div>
                    <div class="brand-box">
                      <span class="brand-name text-blue-400">APPLE</span>
                      <span class="brand-role">Highest revenue contribution</span>
                    </div>
                  </div>
                </div>

                <p class="ecom-cs-insight-interp">
                  "Samsung appears to be a volume-driving brand, while Apple contributes substantially more revenue value."
                </p>
              </div>

              <!-- INSIGHT 04 -->
              <div class="ecom-cs-insight-card">
                <div>
                  <div class="ecom-cs-insight-num">INSIGHT 04</div>
                  <h3 class="ecom-cs-insight-title">Weekly Activity Pattern</h3>

                  <div class="ecom-cs-week-flow">
                    <div class="week-node stable">
                      <span class="wk-title">WEEK 1</span>
                      <span class="wk-status">Stable</span>
                    </div>
                    <div class="wk-arrow">→</div>
                    <div class="week-node stable">
                      <span class="wk-title">WEEK 2</span>
                      <span class="wk-status">Stable</span>
                    </div>
                    <div class="wk-arrow">→</div>
                    <div class="week-node stable">
                      <span class="wk-title">WEEK 3</span>
                      <span class="wk-status">Stable</span>
                    </div>
                    <div class="wk-arrow">→</div>
                    <div class="week-node stable">
                      <span class="wk-title">WEEK 4</span>
                      <span class="wk-status">Stable</span>
                    </div>
                    <div class="wk-arrow">→</div>
                    <div class="week-node decline">
                      <span class="wk-title">WEEK 5</span>
                      <span class="wk-status">Declines</span>
                    </div>
                  </div>
                </div>

                <p class="ecom-cs-insight-interp">
                  "Customer activity remains broadly stable through Weeks 1–4, followed by a sharp decline in Week 5."
                </p>
              </div>

              <!-- INSIGHT 05 -->
              <div class="ecom-cs-insight-card full-width-insight">
                <div>
                  <div class="ecom-cs-insight-num">INSIGHT 05</div>
                  <h3 class="ecom-cs-insight-title">Purchase Signals</h3>

                  <div class="ecom-cs-signals-grid">
                    <div class="signal-card">
                      <span class="signal-factor">₹254–₹255</span>
                      <span class="signal-metric">2.35× purchase likelihood</span>
                    </div>
                    <div class="signal-card">
                      <span class="signal-factor">Days 3–19</span>
                      <span class="signal-metric">1.70× purchase likelihood</span>
                    </div>
                    <div class="signal-card">
                      <span class="signal-factor">Samsung</span>
                      <span class="signal-metric">1.43× purchase likelihood</span>
                    </div>
                    <div class="signal-card">
                      <span class="signal-factor">Week 2</span>
                      <span class="signal-metric">1.41× purchase likelihood</span>
                    </div>
                  </div>
                </div>

                <p class="ecom-cs-insight-interp">
                  "The analysis identified associations between purchase likelihood and specific price ranges, brands and time periods."
                </p>
              </div>
            </div>
          </section>

          <!-- SECTION 5: FROM INSIGHT TO ACTION -->
          <section class="ecom-cs-section">
            <div class="ecom-cs-sec-header">
              <span class="ecom-cs-tag">[ STRATEGIC EXECUTION ]</span>
              <h2 class="ecom-cs-sec-title">From Insight to Action</h2>
            </div>

            <div class="ecom-cs-actions-list">
              <!-- ACTION 01 -->
              <div class="ecom-cs-act-card">
                <div class="act-header">
                  <span class="act-num">ACTION 01</span>
                  <span class="act-area">CONVERSION</span>
                </div>
                <div class="act-flow">
                  <div class="act-step">
                    <span class="step-tag">INSIGHT</span>
                    <p>View → Cart conversion is approximately 4%.</p>
                  </div>
                  <div class="act-arrow">➔</div>
                  <div class="act-step">
                    <span class="step-tag">IMPLICATION</span>
                    <p>The largest observed funnel leakage occurs before cart creation.</p>
                  </div>
                  <div class="act-arrow">➔</div>
                  <div class="act-step rec-step">
                    <span class="step-tag rec-tag">RECOMMENDED ACTION</span>
                    <p>Investigate product-page conversion factors such as CTA visibility, product information, reviews, delivery/returns visibility, pricing/value communication, product imagery, and stock availability.</p>
                  </div>
                </div>
              </div>

              <!-- ACTION 02 -->
              <div class="ecom-cs-act-card">
                <div class="act-header">
                  <span class="act-num">ACTION 02</span>
                  <span class="act-area">CATEGORY</span>
                </div>
                <div class="act-flow">
                  <div class="act-step">
                    <span class="step-tag">INSIGHT</span>
                    <p>Smartphones contribute disproportionately to revenue.</p>
                  </div>
                  <div class="act-arrow">➔</div>
                  <div class="act-step">
                    <span class="step-tag">IMPLICATION</span>
                    <p>The business is highly dependent on one category.</p>
                  </div>
                  <div class="act-arrow">➔</div>
                  <div class="act-step rec-step">
                    <span class="step-tag rec-tag">RECOMMENDED ACTION</span>
                    <p>Develop adjacent-category growth and cross-selling opportunities such as: smartphones → accessories → audio → wearables.</p>
                  </div>
                </div>
              </div>

              <!-- ACTION 03 -->
              <div class="ecom-cs-act-card">
                <div class="act-header">
                  <span class="act-num">ACTION 03</span>
                  <span class="act-area">BRAND</span>
                </div>
                <div class="act-flow">
                  <div class="act-step">
                    <span class="step-tag">INSIGHT</span>
                    <p>Samsung leads purchase volume while Apple contributes more revenue.</p>
                  </div>
                  <div class="act-arrow">➔</div>
                  <div class="act-step">
                    <span class="step-tag">IMPLICATION</span>
                    <p>Different brands may play different commercial roles.</p>
                  </div>
                  <div class="act-arrow">➔</div>
                  <div class="act-step rec-step">
                    <span class="step-tag rec-tag">RECOMMENDED ACTION</span>
                    <p>Use separate merchandising/campaign strategies for volume-oriented and value-oriented brands.</p>
                  </div>
                </div>
              </div>

              <!-- ACTION 04 -->
              <div class="ecom-cs-act-card">
                <div class="act-header">
                  <span class="act-num">ACTION 04</span>
                  <span class="act-area">PRICE</span>
                </div>
                <div class="act-flow">
                  <div class="act-step">
                    <span class="step-tag">INSIGHT</span>
                    <p>A specific price range is associated with higher purchase likelihood.</p>
                  </div>
                  <div class="act-arrow">➔</div>
                  <div class="act-step">
                    <span class="step-tag">IMPLICATION</span>
                    <p>Price appears to be an important behavioural signal.</p>
                  </div>
                  <div class="act-arrow">➔</div>
                  <div class="act-step rec-step">
                    <span class="step-tag rec-tag">RECOMMENDED ACTION</span>
                    <p>Validate the relationship through controlled pricing/promotional experiments rather than assuming causality.</p>
                  </div>
                </div>
              </div>

              <!-- ACTION 05 -->
              <div class="ecom-cs-act-card">
                <div class="act-header">
                  <span class="act-num">ACTION 05</span>
                  <span class="act-area">WEEK 5</span>
                </div>
                <div class="act-flow">
                  <div class="act-step">
                    <span class="step-tag">INSIGHT</span>
                    <p>Activity declines during Week 5.</p>
                  </div>
                  <div class="act-arrow">➔</div>
                  <div class="act-step">
                    <span class="step-tag">IMPLICATION</span>
                    <p>A period-specific change may need investigation.</p>
                  </div>
                  <div class="act-arrow">➔</div>
                  <div class="act-step rec-step">
                    <span class="step-tag rec-tag">RECOMMENDED ACTION</span>
                    <p>Check inventory, campaign activity, calendar effects, category-level activity, or whether the final period contains fewer observations/days.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- SECTION 6: RECOMMENDED ANALYTICS ROADMAP -->
          <section class="ecom-cs-section">
            <div class="ecom-cs-sec-header">
              <span class="ecom-cs-tag">[ FORWARD STRATEGY ]</span>
              <h2 class="ecom-cs-sec-title">Recommended Analytics Roadmap</h2>
            </div>

            <div class="ecom-cs-roadmap-grid">
              <div class="roadmap-stage">
                <div class="stage-header">
                  <span class="stage-tag">STAGE 01</span>
                  <span class="stage-time">NOW</span>
                </div>
                <h4 class="stage-goal">Improve View → Cart conversion</h4>
                <p class="stage-desc">Prioritize friction-reduction on high-traffic product pages.</p>
              </div>
              <div class="roadmap-arrow">➔</div>
              <div class="roadmap-stage">
                <div class="stage-header">
                  <span class="stage-tag">STAGE 02</span>
                  <span class="stage-time">NEXT</span>
                </div>
                <h4 class="stage-goal">Reduce category concentration</h4>
                <p class="stage-desc">Expand cross-sell funnels to accessories and wearables.</p>
              </div>
              <div class="roadmap-arrow">➔</div>
              <div class="roadmap-stage">
                <div class="stage-header">
                  <span class="stage-tag">STAGE 03</span>
                  <span class="stage-time">TEST</span>
                </div>
                <h4 class="stage-goal">Validate pricing and merchandising signals</h4>
                <p class="stage-desc">Run controlled price elasticity and promotional experiments.</p>
              </div>
            </div>
          </section>

          <!-- SECTION 7: ANALYTICAL LIMITATIONS -->
          <section class="ecom-cs-section">
            <div class="ecom-cs-sec-header">
              <span class="ecom-cs-tag">[ METHODOLOGICAL CONSTRAINTS ]</span>
              <h2 class="ecom-cs-sec-title">What the Data Cannot Tell Us</h2>
            </div>

            <div class="ecom-cs-limits-grid">
              <div class="limit-card">
                <span class="limit-title">CAUSALITY</span>
                <p class="limit-text">"Observed relationships do not establish causation."</p>
              </div>
              <div class="limit-card">
                <span class="limit-title">CUSTOMER INTENT</span>
                <p class="limit-text">"Event data shows behaviour but not why customers abandon."</p>
              </div>
              <div class="limit-card">
                <span class="limit-title">LONG-TERM TREND</span>
                <p class="limit-text">"A single ~30-day period cannot establish seasonality or long-term trends."</p>
              </div>
            </div>

            <div class="ecom-cs-next-step">
              <i data-lucide="compass" class="w-5 h-5 text-emerald-400 flex-shrink-0"></i>
              <span><strong>Next step:</strong> combine behavioural data with A/B testing, customer feedback and longer historical periods.</span>
            </div>
          </section>

          <!-- CASE STUDY TAGS -->
          <div class="case-study-tags my-4">${item.tags.map(tag => `<span>${tag}</span>`).join('')}</div>

          <!-- FOOTER ACTIONS (OPEN CASE ARTIFACT + CLOSE BUTTON) -->
          <div class="case-study-actions">
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn-solid case-study-primary">
              OPEN CASE ARTIFACT <i data-lucide="external-link"></i>
            </a>
            <button onclick="closeCaseModal()" class="btn-outline case-study-secondary">
              CLOSE
            </button>
          </div>
        </div>
      `;
    } else {
      body.classList.remove('modal-dialog-wide');
      body.innerHTML = `
        <div class="case-study">
          <header class="case-study-header">
            <div class="case-study-heading">
              <div class="case-study-kicker"><span>${item.num} / ${totalProjects}</span><span>${item.type}</span></div>
              <h2 class="case-study-title">${item.title}</h2>
              <p class="case-study-role">${item.role}</p>
            </div>
            ${item.image ? `
              <div class="case-study-image">
                <img src="${item.image}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80';" alt="${item.title}" />
              </div>
            ` : ''}
            <button onclick="closeCaseModal()" class="case-study-close" aria-label="Close case study">&times;</button>
          </header>

          <div class="case-study-stats">
            <div><span>ROLE</span><strong>${item.role}</strong></div>
            <div><span>TOOLS</span><strong>${item.tags.slice(0, 2).join(' · ')}</strong></div>
            <div><span>RESULT</span><strong>${item.impact}</strong></div>
          </div>

          <div class="case-study-content">
            <div class="case-study-section">
              <span class="section-tag">01 / PROBLEM</span>
              <p>${item.problem}</p>
            </div>
            <div class="case-study-section">
              <span class="section-tag">02 / APPROACH</span>
              <p>${item.solution}</p>
            </div>
          </div>

          <div class="case-study-tags">${item.tags.map(tag => `<span>${tag}</span>`).join('')}</div>

          <div class="case-study-actions">
            ${item.link && item.link !== '#' ? `
              <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn-solid case-study-primary">
                OPEN CASE ARTIFACT <i data-lucide="external-link"></i>
              </a>
            ` : ''}
            <button onclick="closeCaseModal()" class="btn-outline case-study-secondary">
              CLOSE
            </button>
          </div>
        </div>
      `;
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Trigger smooth zoom-in & float-up spring animation
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      if (id === 'ecommerce-performance-analytics') {
        setTimeout(initEcomLineChart, 100);
      }
    });
  };

  window.closeCaseModal = () => {
    const modal = document.getElementById('case-modal');
    const body = document.getElementById('case-modal-body');
    if (ecomChartInstance) {
      ecomChartInstance.destroy();
      ecomChartInstance = null;
    }
    if (modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(() => {
        modal.classList.add('hidden');
        if (body) body.classList.remove('modal-dialog-wide');
      }, 350);
    }
  };

  const modal = document.getElementById('case-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closeCaseModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeCaseModal();
        window.closeImageLightbox();
      }
    });
  }

  // -------------------------------------------------------------
  // Render Experience Timeline
  // -------------------------------------------------------------
  function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    container.innerHTML = data.experiences.map(e => `
      <div class="border-l-2 border-zinc-700/80 pl-6 py-2 relative reveal-on-scroll">
        <div class="absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full bg-zinc-100 border-2 border-zinc-900"></div>
        <div class="font-mono text-xs text-dim font-bold mb-1">${e.period}</div>
        <h3 class="text-xl font-black text-main">${e.role}</h3>
        <p class="text-xs font-mono text-sub font-bold mb-3">${e.organization}</p>
        <ul class="space-y-2 text-xs md:text-sm text-sub font-medium list-disc list-inside">
          ${e.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  // -------------------------------------------------------------
  // Render Education & Clickable Certifications
  // -------------------------------------------------------------
  function renderEducation() {
    const eduGrid = document.getElementById('edu-grid');
    const certGrid = document.getElementById('cert-grid');

    if (eduGrid) {
      eduGrid.innerHTML = data.education.map(e => `
        <div class="minimal-card p-5 reveal-on-scroll">
          <div class="flex justify-between font-mono text-xs text-dim mb-2 font-bold">
            <span>${e.year}</span>
            <span class="text-main">${e.score}</span>
          </div>
          <h4 class="font-black text-main text-sm md:text-base">${e.degree}</h4>
          <p class="text-xs text-sub font-mono font-bold mt-1">${e.detail}</p>
          <p class="text-xs text-dim font-medium mt-2">${e.institution}</p>
        </div>
      `).join('');
    }

    if (certGrid) {
      certGrid.innerHTML = data.certifications.map(c => `
        <a href="${c.link}" target="_blank" rel="noopener noreferrer" 
           class="minimal-card cert-card p-5 flex items-center justify-between group hover:border-zinc-400 transition-all reveal-on-scroll">
          <div>
            <h4 class="font-extrabold text-main text-xs md:text-sm group-hover:underline underline-offset-4">${c.title}</h4>
            <span class="text-xs font-mono text-sub font-semibold block mt-1">${c.issuer}</span>
            <span class="font-mono text-[11px] text-dim font-bold block mt-1">Credential ID: <span class="text-main">${c.id}</span></span>
          </div>
          <div class="p-2.5 rounded bg-zinc-800/40 text-sub group-hover:text-main group-hover:scale-110 transition-transform">
            <i data-lucide="external-link" class="w-4 h-4"></i>
          </div>
        </a>
      `).join('');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  }

  // -------------------------------------------------------------
  // Scroll Reveal Animations & Stats Counter Observer
  // -------------------------------------------------------------
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    if (elements.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.1 });

      elements.forEach(el => observer.observe(el));
    }

    const statsGrid = document.getElementById('hero-stats-grid');
    if (statsGrid) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerStatsCounter();
          }
        });
      }, { threshold: 0.2 });

      statsObserver.observe(statsGrid);
    }
  }
});
