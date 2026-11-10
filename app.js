/**
 * Dev Dadhich — Portfolio Application Controller
 * Dual-Persona Architecture: "Business Analyst" vs. "Marketing & Branding"
 * First-Screen Perspective Chooser, Smooth Loading Sequence, and Iconic Graphic Project Cards
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  const data = window.PORTFOLIO_DATA;
  let currentRole = localStorage.getItem('portfolio_persona') || 'ba';
  let chartInstance = null;
  let hasCountedStats = false;
  let hasCompletedInitialLoad = false;

  // Initialize navigation and theme
  initTheme();
  initNavigation();
  initPersonaModal();
  initRoleSwitcher();

  // Perspective Chooser & Preloader Load Sequence Check
  const sessionHasPersona = sessionStorage.getItem('persona_selected');
  const runLoaderOnLoad = sessionStorage.getItem('run_loader_on_load');
  const navDestination = sessionStorage.getItem('nav_destination') || window.location.hash;

  if (runLoaderOnLoad === 'true') {
    // User switched view and requested reload: load new role, preserve destination, play preloader
    sessionStorage.removeItem('run_loader_on_load');
    sessionStorage.removeItem('nav_destination');
    sessionStorage.setItem('persona_selected', 'true');

    document.documentElement.classList.remove('is-reloading-view');
    closePersonaModalImmediate();
    setRole(currentRole);
    renderPRDDoc();
    initChart();
    renderTimeline();
    renderEducation();
    initScrollAnimations();
    hasCompletedInitialLoad = true;

    // Apply destination scroll position and active nav state
    if (navDestination && navDestination !== '#home') {
      const sectionId = navDestination.replace('#', '');
      const links = document.querySelectorAll('.nav-links a[data-section]');
      links.forEach(l => l.classList.toggle('active', l.dataset.section === sectionId));

      const targetEl = document.querySelector(navDestination);
      if (targetEl) {
        setTimeout(() => targetEl.scrollIntoView({ behavior: 'auto' }), 10);
      }
    }

    // Play smooth preloader animation (DD -> DEV DADHICH)
    runPreloaderAnimation(() => {
      if (navDestination && navDestination !== '#home') {
        const targetEl = document.querySelector(navDestination);
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  } else if (sessionHasPersona) {
    // Normal in-session load: load stored role immediately
    closePersonaModalImmediate();
    setRole(currentRole);
    renderPRDDoc();
    initChart();
    renderTimeline();
    renderEducation();
    initScrollAnimations();
    hasCompletedInitialLoad = true;

    if (window.location.hash && window.location.hash !== '#home') {
      const sectionId = window.location.hash.replace('#', '');
      const links = document.querySelectorAll('.nav-links a[data-section]');
      links.forEach(l => l.classList.toggle('active', l.dataset.section === sectionId));
      const targetEl = document.querySelector(window.location.hash);
      if (targetEl) {
        setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  } else {
    // First time visiting: Show the Perspective Chooser ONLY
    openPersonaModal();
  }

  // -------------------------------------------------------------
  // Perspective Chooser & View Switching with Proper Reload
  // -------------------------------------------------------------
  window.switchViewWithReload = function(role, destination) {
    localStorage.setItem('portfolio_persona', role);
    sessionStorage.setItem('persona_selected', 'true');
    sessionStorage.setItem('run_loader_on_load', 'true');

    const targetHash = destination || window.location.hash || '#home';
    sessionStorage.setItem('nav_destination', targetHash);

    if (window.location.hash !== targetHash && targetHash !== '#home') {
      window.location.hash = targetHash;
    }
    window.location.reload();
  };

  function handleSelectPersona(role) {
    window.switchViewWithReload(role, window.location.hash);
  }

  function initPersonaModal() {
    const btnBA = document.getElementById('persona-card-ba');
    const btnMarketing = document.getElementById('persona-card-marketing');
    const btnOpen = document.getElementById('open-persona-btn');

    if (btnBA) {
      btnBA.addEventListener('click', () => handleSelectPersona('ba'));
    }

    if (btnMarketing) {
      btnMarketing.addEventListener('click', () => handleSelectPersona('marketing'));
    }

    if (btnOpen) {
      btnOpen.addEventListener('click', () => {
        openPersonaModal();
      });
    }
  }

  function openPersonaModal() {
    const modal = document.getElementById('persona-modal');
    if (!modal) return;
    modal.classList.remove('is-hidden', 'hidden');
    modal.style.display = 'flex';
    void modal.offsetWidth;
    modal.style.opacity = '1';
  }

  function closePersonaModal() {
    const modal = document.getElementById('persona-modal');
    if (!modal) return;
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.classList.add('is-hidden');
      modal.style.display = 'none';
    }, 250);
  }

  function closePersonaModalImmediate() {
    const modal = document.getElementById('persona-modal');
    if (!modal) return;
    modal.classList.add('is-hidden');
    modal.style.opacity = '0';
    modal.style.display = 'none';
  }

  // -------------------------------------------------------------
  // Preloader Welcome Animation (DD -> Dev Dadhich)
  // -------------------------------------------------------------
  function runPreloaderAnimation(onComplete) {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
      if (onComplete) onComplete();
      return;
    }

    preloader.classList.remove('hidden', 'fade-out', 'expand');
    preloader.style.display = 'flex';
    preloader.style.opacity = '1';

    setTimeout(() => {
      preloader.classList.add('expand');
    }, 200);

    setTimeout(() => {
      preloader.classList.add('fade-out');
      if (onComplete) onComplete();
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600);
    }, 1150);
  }

  // -------------------------------------------------------------
  // Theme Manager (Dark / Light Mode)
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

  // -------------------------------------------------------------
  // Navigation & ScrollSpy
  // -------------------------------------------------------------
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
      toggle.innerHTML = '<i data-lucide="menu"></i>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    toggle?.addEventListener('click', () => {
      const open = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
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
  // Dual-Role Switcher ("Business Analyst" vs "Marketing & Branding")
  // -------------------------------------------------------------
  function initRoleSwitcher() {
    const baBtn = document.getElementById('role-btn-ba');
    const marketingBtn = document.getElementById('role-btn-marketing');

    if (baBtn) {
      baBtn.addEventListener('click', () => {
        if (currentRole !== 'ba') {
          handleSelectPersona('ba');
        }
      });
    }

    if (marketingBtn) {
      marketingBtn.addEventListener('click', () => {
        if (currentRole !== 'marketing') {
          handleSelectPersona('marketing');
        }
      });
    }
  }

  function setRole(role) {
    currentRole = role;
    localStorage.setItem('portfolio_persona', role);

    const baBtn = document.getElementById('role-btn-ba');
    const marketingBtn = document.getElementById('role-btn-marketing');
    const navBadge = document.getElementById('nav-role-badge');
    const heroTag = document.getElementById('hero-role-tag');
    const heroTitle = document.getElementById('hero-role-title');
    const heroTagline = document.getElementById('hero-role-tagline');
    const bioText = document.getElementById('hero-bio-text');
    const credFocus = document.getElementById('credentials-focus');
    const contactSeeking = document.getElementById('contact-seeking-text');
    const compHeading = document.getElementById('competency-heading');
    const projDesc = document.getElementById('projects-section-desc');

    const roleData = data.roles[role];

    if (role === 'ba') {
      if (baBtn) baBtn.classList.add('active');
      if (marketingBtn) marketingBtn.classList.remove('active');
      if (navBadge) navBadge.textContent = "// BUSINESS ANALYST";
      if (heroTag) heroTag.textContent = roleData.heroTag;
      if (heroTitle) heroTitle.textContent = roleData.heroTitle;
      if (heroTagline) heroTagline.textContent = roleData.heroTagline;
      if (bioText) bioText.textContent = data.profile.bioBA;
      if (credFocus) credFocus.innerHTML = `<strong class="text-main">Focus:</strong> Power BI, SQL, Process Re-Engineering, AppSheet`;
      if (contactSeeking) contactSeeking.textContent = "Seeking Business Analyst, Data Analytics, and Operations Optimization opportunities.";
      if (compHeading) compHeading.textContent = "Data Analytics & Operational Foundations";
      if (projDesc) projDesc.textContent = "A structured archive of data analytics, process re-engineering, and operational systems.";
      updateFocusBullets(roleData.focus);
    } else {
      if (marketingBtn) marketingBtn.classList.add('active');
      if (baBtn) baBtn.classList.remove('active');
      if (navBadge) navBadge.textContent = "// MARKETING & BRANDING";
      if (heroTag) heroTag.textContent = roleData.heroTag;
      if (heroTitle) heroTitle.textContent = roleData.heroTitle;
      if (heroTagline) heroTagline.textContent = roleData.heroTagline;
      if (bioText) bioText.textContent = data.profile.bioMarketing;
      if (credFocus) credFocus.innerHTML = `<strong class="text-main">Focus:</strong> Brand Strategy, Consumer Insights, GTM Funnels, Content`;
      if (contactSeeking) contactSeeking.textContent = "Seeking Brand Strategy, Growth Marketing, and Creative Direction opportunities.";
      if (compHeading) compHeading.textContent = "Brand Architecture & Growth Foundations";
      if (projDesc) projDesc.textContent = "A curated showcase of brand development, qualitative field studies, and digital acquisition funnels.";
      updateFocusBullets(roleData.focus);
    }

    const mobBaBtn = document.getElementById('mobile-role-btn-ba');
    const mobMktBtn = document.getElementById('mobile-role-btn-marketing');
    if (mobBaBtn && mobMktBtn) {
      if (role === 'ba') {
        mobBaBtn.className = "py-2 px-3 rounded font-mono text-[11px] font-bold border border-emerald-500/50 bg-emerald-500/20 text-emerald-400 text-center";
        mobMktBtn.className = "py-2 px-3 rounded font-mono text-[11px] font-bold border border-zinc-700 text-sub hover:text-main text-center";
      } else {
        mobMktBtn.className = "py-2 px-3 rounded font-mono text-[11px] font-bold border border-purple-500/50 bg-purple-500/20 text-purple-400 text-center";
        mobBaBtn.className = "py-2 px-3 rounded font-mono text-[11px] font-bold border border-zinc-700 text-sub hover:text-main text-center";
      }
    }

    renderHeroStats();
    renderCompetencies();
    renderMarquee();
    renderProjects('all');

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function updateFocusBullets(list) {
    const container = document.getElementById('role-focus-bullets');
    if (!container) return;
    container.innerHTML = list.map(item => `
      <div class="flex items-start gap-3 py-2 border-b border-zinc-800/40 last:border-0 text-xs md:text-sm">
        <span class="font-mono text-emerald-400 font-bold">/</span>
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
    const stats = currentRole === 'ba' ? data.profile.statsBA : data.profile.statsMarketing;

    grid.innerHTML = stats.map((s, idx) => `
      <div class="py-4 px-3 border-r border-zinc-800/60 last:border-0 text-center sm:text-left">
        <div class="text-3xl md:text-4xl font-extrabold text-main font-mono flex items-center justify-center sm:justify-start">
          <span id="stat-val-${idx}">0</span><span>${s.suffix}</span>
        </div>
        <div class="text-xs font-semibold text-sub mt-1 leading-tight">${s.label}</div>
      </div>
    `).join('');

    hasCountedStats = false;
    triggerStatsCounter();
  }

  function triggerStatsCounter() {
    if (hasCountedStats) return;
    hasCountedStats = true;

    const stats = currentRole === 'ba' ? data.profile.statsBA : data.profile.statsMarketing;

    stats.forEach((s, idx) => {
      const el = document.getElementById(`stat-val-${idx}`);
      if (!el) return;

      const target = s.num;
      const duration = 1200;
      const steps = 25;
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
    const marquee = data.roles[currentRole].marquee;

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
        <span class="section-tag mb-4 block">[ TECHNOLOGIES & COMPETENCIES MATRIX ]</span>
        ${buildTrack(marquee.line1, 'marquee-left')}
        ${buildTrack(marquee.line2, 'marquee-right')}
        ${buildTrack(marquee.line3, 'marquee-left')}
      </div>
    `;
  }

  // -------------------------------------------------------------
  // Render Competency Pillars
  // -------------------------------------------------------------
  function renderCompetencies() {
    const container = document.getElementById('competencies-grid');
    if (!container) return;
    const comps = data.roles[currentRole].competencies;

    container.innerHTML = comps.map(c => `
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
  // Interactive PRD Document Viewer
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
            backgroundColor: isDark ? 'rgba(52, 211, 153, 0.65)' : 'rgba(16, 185, 129, 0.65)',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 40, right: 4, bottom: 0, left: 0 }
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
              drawTicks: true
            },
            ticks: { color: isDark ? '#d4d4d8' : '#3f3f46', font: { family: 'JetBrains Mono', size: 10, weight: 'bold' } }
          },
          y: {
            grid: {
              color: isDark ? '#27272a' : '#e4e4e7',
              drawOnChartArea: true,
              drawTicks: true
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
    chartInstance.data.datasets[1].backgroundColor = isDark ? 'rgba(52, 211, 153, 0.65)' : 'rgba(16, 185, 129, 0.65)';
    chartInstance.options.plugins.legend.labels.color = isDark ? '#f4f4f5' : '#09090b';
    chartInstance.options.scales.x.grid.color = isDark ? '#27272a' : '#e4e4e7';
    chartInstance.options.scales.x.ticks.color = isDark ? '#d4d4d8' : '#3f3f46';
    chartInstance.options.scales.y.grid.color = isDark ? '#27272a' : '#e4e4e7';
    chartInstance.options.scales.y.ticks.color = isDark ? '#d4d4d8' : '#3f3f46';
    chartInstance.update();
  }

  // -------------------------------------------------------------
  // Render Projects Grid (Restored Iconic Graphic Visual Cards)
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

    const projectPool = currentRole === 'ba' ? data.projectsBA : data.projectsMarketing;

    const items = filter === 'all'
      ? projectPool
      : projectPool.filter(p => {
          const typeStr = (p.type + ' ' + (p.tags || []).join(' ')).toLowerCase();
          if (filter === 'analytics') return typeStr.includes('analytics') || typeStr.includes('sql') || typeStr.includes('power bi') || typeStr.includes('data');
          if (filter === 'brand') return typeStr.includes('brand') || typeStr.includes('gtm') || typeStr.includes('strategy') || typeStr.includes('marketing');
          if (filter === 'operations') return typeStr.includes('operation') || typeStr.includes('workflow') || typeStr.includes('crm') || typeStr.includes('process');
          return true;
        });

    if (!items.length) {
      grid.innerHTML = `<div class="col-span-full py-12 text-center text-dim font-mono">No projects found for this category.</div>`;
      return;
    }

    const projectIcons = {
      'avionic-crm-product': 'workflow',
      'ecommerce-performance-analytics': 'bar-chart-3',
      'power-plant-analytics': 'activity',
      'bookstore-sql-project': 'database',
      'vyndo-market-strategy': 'megaphone',
      'ravivari-retail-study': 'store',
      'drishti-brand-web': 'clapperboard',
      'student-media-lead': 'film',
      'eventsphere-app': 'calendar-days',
      'pinkcity-parichay': 'map'
    };

    grid.innerHTML = items.map(p => {
      const isDedicated = Boolean(p.dedicatedPage);
      const clickAction = isDedicated 
        ? `window.location.href='${p.dedicatedPage}'`
        : `openCaseModal('${p.id}')`;

      const badgeHtml = p.badge 
        ? `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">${p.badge}</span>`
        : `<span class="project-type">${p.type}</span>`;

      const initialChar = p.title.replace(/[^a-zA-Z]/g, '').charAt(0) || 'P';
      const iconName = projectIcons[p.id] || 'sparkles';

      return `
        <article class="project-card cursor-pointer group reveal-on-scroll" onclick="${clickAction}">
          
          <!-- Iconic Graphic Visual Header with Integrated Headings & Badges -->
          <div class="project-card-visual" aria-hidden="true">
            <!-- Top Integrated Row: Project Number + Heading Pill + Arrow -->
            <div class="project-visual-top">
              <div class="project-visual-tags">
                <span class="visual-badge-num">#${p.num}</span>
                <span class="visual-heading-pill ${p.badge ? 'is-dedicated' : ''}">${p.badge || p.type}</span>
              </div>
              <span class="visual-arrow-btn">
                <i data-lucide="${isDedicated ? 'arrow-up-right' : 'maximize-2'}"></i>
              </span>
            </div>

            <!-- Bottom Integrated Row: Case Identifier + Category Icon Mark -->
            <div class="project-visual-bottom">
              <span class="project-visual-label">CASE // ${p.num}</span>
              <span class="project-visual-mark"><i data-lucide="${iconName}"></i></span>
            </div>

            <!-- Abstract Background Artwork Elements -->
            <span class="project-visual-initial">${initialChar}</span>
            <span class="project-visual-line"></span>
          </div>

          <!-- Card Content Body -->
          <div class="project-card-content p-5 space-y-2 flex-1 flex flex-col justify-between">
            <div>
              <div class="project-card-meta text-dim text-xs font-mono mb-1">
                <span>${p.role}</span>
                <span>${(p.tags || []).length} competencies</span>
              </div>
              <h3 class="font-bold text-main text-base group-hover:text-emerald-400 transition-colors leading-snug">
                ${p.title}
              </h3>
              <p class="text-xs text-sub mt-2 leading-relaxed">
                ${p.summary}
              </p>
            </div>

            <!-- Tags & CTA -->
            <div class="project-card-bottom border-t border-[var(--border)] mt-4 flex items-center justify-between text-xs font-mono">
              <div class="project-tags flex flex-wrap gap-1">
                ${(p.tags || []).slice(0, 3).map(t => `<span>${t}</span>`).join('')}
              </div>
              <span class="project-view flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                ${isDedicated ? 'DEEP DIVE →' : 'VIEW CASE →'}
              </span>
            </div>
          </div>

        </article>
      `;
    }).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();

    filterBtns.forEach(b => {
      b.onclick = () => renderProjects(b.dataset.filter);
    });

    initScrollAnimations();
  }

  // -------------------------------------------------------------
  // Case Study Modal Window (Restored Original Expansion Design)
  // -------------------------------------------------------------
  window.openCaseModal = (id) => {
    const projectPool = currentRole === 'ba' ? data.projectsBA : data.projectsMarketing;
    const item = projectPool.find(p => p.id === id);
    if (!item) return;

    // E-Commerce Analytics and RWMS remain unchanged (dedicated case study pages)
    if (item.dedicatedPage) {
      window.location.href = item.dedicatedPage;
      return;
    }

    const modal = document.getElementById('case-modal');
    const body = document.getElementById('case-modal-body');
    if (!modal || !body) return;

    const totalProjects = String(projectPool.length).padStart(2, '0');

    // Restored Original Project Expansion Design with original image and layout
    body.innerHTML = `
      <div class="case-study">
        <!-- Header (Title & Kicker Left, Real Project Image Right) -->
        <header class="case-study-header">
          <div class="case-study-heading">
            <div class="case-study-kicker">
              <span>CASE ${item.num} / ${totalProjects}</span>
              <span>${item.type}</span>
            </div>
            <h2 class="case-study-title">${item.title}</h2>
            <p class="case-study-role">${item.role}</p>
          </div>
          <div class="case-study-image">
            <img src="${item.image}" alt="${item.title}" onerror="this.onerror=null; this.src='dev.png';" />
          </div>
          <button onclick="closeCaseModal()" class="case-study-close" aria-label="Close case study">&times;</button>
        </header>

        <!-- Stats Bar -->
        <div class="case-study-stats">
          <div>
            <span>TRACK / DOMAIN</span>
            <strong>${item.type}</strong>
          </div>
          <div>
            <span>ROLE</span>
            <strong>${item.role}</strong>
          </div>
          <div>
            <span>MEASURED IMPACT</span>
            <strong>${item.impact}</strong>
          </div>
        </div>

        <!-- 2-Column Problem & Solution Grid -->
        <div class="case-study-content">
          <div class="case-study-section">
            <span class="section-tag">[ PROBLEM & CONTEXT ]</span>
            <p>${item.problem}</p>
          </div>
          <div class="case-study-section">
            <span class="section-tag">[ SOLUTION & METHODOLOGY ]</span>
            <p>${item.solution}</p>
          </div>
        </div>

        <!-- Tags -->
        <div class="case-study-tags">
          ${(item.tags || []).map(t => `<span>${t}</span>`).join('')}
        </div>

        <!-- Action Link -->
        <div class="case-study-actions">
          <a href="${item.link}" target="_blank" class="case-study-primary btn-solid">
            <span>EXPLORE ARTIFACT / CODE</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    `;

    if (typeof lucide !== 'undefined') lucide.createIcons();

    modal.classList.remove('hidden');
    modal.classList.add('flex', 'is-open');
  };

  window.closeCaseModal = () => {
    const modal = document.getElementById('case-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }, 200);
  };

  const caseModal = document.getElementById('case-modal');
  caseModal?.addEventListener('click', (e) => {
    if (e.target === caseModal) closeCaseModal();
  });

  // -------------------------------------------------------------
  // Render Experience & Leadership Timeline
  // -------------------------------------------------------------
  function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    container.innerHTML = data.experiences.map((exp, idx) => `
      <div class="relative pl-6 border-l-2 border-zinc-800/80 space-y-2 reveal-on-scroll">
        <div class="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[var(--bg)]"></div>
        <div class="font-mono text-xs text-dim">${exp.period}</div>
        <h3 class="text-base font-bold text-main">${exp.role}</h3>
        <div class="font-mono text-xs text-emerald-400 font-semibold">${exp.organization}</div>
        <ul class="list-disc list-inside space-y-1.5 text-xs text-sub pt-1 leading-relaxed">
          ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
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
        <div class="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] space-y-1 reveal-on-scroll">
          <div class="font-mono text-[11px] text-dim">${e.year}</div>
          <h4 class="font-bold text-xs text-main">${e.degree}</h4>
          <div class="font-mono text-[11px] text-sub">${e.detail}</div>
          <div class="font-mono text-[11px] text-dim">${e.institution}</div>
          <div class="font-mono text-[11px] text-emerald-400 font-bold pt-1">Score: ${e.score}</div>
        </div>
      `).join('');
    }

    if (certGrid) {
      certGrid.innerHTML = data.certifications.map(c => `
        <a href="${c.link}" target="_blank" class="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-emerald-500/60 transition-all flex flex-col justify-between group reveal-on-scroll">
          <div>
            <div class="flex items-center justify-between text-xs font-mono text-dim mb-2">
              <span>${c.issuer}</span>
              <i data-lucide="external-link" class="w-3.5 h-3.5 group-hover:text-emerald-400 transition-colors"></i>
            </div>
            <h4 class="font-bold text-xs text-main group-hover:text-emerald-400 transition-colors leading-snug">
              ${c.title}
            </h4>
          </div>
          <div class="pt-3 font-mono text-[10px] text-dim border-t border-[var(--border)] mt-3 flex justify-between">
            <span>ID: ${c.id}</span>
            <span class="text-emerald-400 font-bold">VERIFY CERTIFICATE ↗</span>
          </div>
        </a>
      `).join('');
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // -------------------------------------------------------------
  // Scroll Reveal Animations
  // -------------------------------------------------------------
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  }
});
