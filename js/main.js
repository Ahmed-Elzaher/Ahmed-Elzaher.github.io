// ==================== EmailJS Config — fill these in after creating your EmailJS account ====================
// 1. Go to https://www.emailjs.com → sign in → Email Services → add your Gmail → copy Service ID
// 2. Go to Email Templates → create a template → copy Template ID
// 3. Go to Account → API Keys → copy your Public Key
const EMAILJS_SERVICE_ID  = 'Elzaher_13';
const EMAILJS_TEMPLATE_ID = 'template_yg7p8b6';
const EMAILJS_PUBLIC_KEY  = 'qtQ29ESrVxpyX7ozh';

// ==================== Preloader Signature Dismiss (3 Seconds duration, GPU & Memory Optimized) ====================
window.addEventListener('load', () => {
  // Initialize EmailJS
  if (window.emailjs) {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.remove(); // Remove from DOM completely to release GPU layer and memory
      }, 500);
    }
  }, 3000);
});

// Fallback safety timeout in case load event was already fired
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }
}, 3800);

// ==================== Filter Pills — Technical Arsenal ====================
const pills = document.querySelectorAll('.filter-pills .pill');
const arsenalCards = document.querySelectorAll('#arsenalGrid .arsenal-card');

pills.forEach((pill) => {
  pill.addEventListener('click', (event) => {
    const target = event.currentTarget;
    pills.forEach((p) => p.classList.remove('active'));
    target.classList.add('active');
    const filter = target.getAttribute('data-filter');

    arsenalCards.forEach((card) => {
      const match = filter === 'all' || card.getAttribute('data-category') === filter;
      card.classList.toggle('hide', !match);
    });
  });
});

// ==================== Copy Email ====================
const copyBtn   = document.getElementById('copyBtn');
const emailVal  = document.getElementById('emailVal');
const copyBtnText = document.getElementById('copyBtnText');

if (copyBtn && emailVal) {
  copyBtn.addEventListener('click', async () => {
    const email = emailVal.textContent.trim();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      if (copyBtnText) {
        copyBtnText.textContent = 'Copied!';
      }
      setTimeout(() => {
        if (copyBtnText) {
          copyBtnText.textContent = 'Copy';
        }
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });
}

// ==================== EmailJS Contact Form ====================
const contactForm      = document.getElementById('contactForm');
const submitBtn        = document.getElementById('contactSubmitBtn');
const submitBtnText    = document.getElementById('submitBtnText');
const submitBtnIcon    = document.getElementById('submitBtnIcon');
const submitBtnSpinner = document.getElementById('submitBtnSpinner');
const formStatus       = document.getElementById('formStatus');

function setFormLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtnText.textContent = isLoading ? 'Sending…' : 'Send Message';
  if (submitBtnIcon) {
    submitBtnIcon.hidden = isLoading;
  }
  if (submitBtnSpinner) {
    submitBtnSpinner.hidden = !isLoading;
  }
}

function showFormStatus(message, isError) {
  formStatus.textContent = message;
  formStatus.hidden = false;
  formStatus.className = 'form-status ' + (isError ? 'form-status-error' : 'form-status-success');
  setTimeout(() => {
    formStatus.hidden = true;
  }, 6000);
}

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!window.emailjs) {
      showFormStatus('EmailJS failed to load. Please try refreshing the page.', true);
      return;
    }

    if (
      EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
    ) {
      showFormStatus('EmailJS is not fully configured yet. Please set your credentials.', true);
      return;
    }

    setFormLoading(true);
    formStatus.hidden = true;

    try {
      await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm);
      showFormStatus('✓ Message sent! I\'ll get back to you soon.', false);
      contactForm.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      showFormStatus('Something went wrong. Try emailing me directly at zaskizaski13@gmail.com', true);
    } finally {
      setFormLoading(false);
    }
  });
}

// ==================== Project Showcase Modal ====================
const PROJECTS_DATA = {
  matchin: {
    category: 'AI CAREER PLATFORM',
    badge: 'Team Project',
    title: 'MatchIn (SkillMatch)',
    role: 'Flutter Developer (Auth & Saved Modules)',
    tagline: 'An AI-powered recruitment ecosystem that parses candidate CVs, analyzes technical skills against live job listings, and calculates match scores with tailored roadmaps to bridge skill gaps.',
    githubUrl: 'https://github.com/Team-2-Skill-Project/Flutter',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.app.MatchIn',
    isPlayStoreDisabled: true,
    screenshots: [
      { url: 'screens/matchin/home.jpg', label: 'Job Feed & Recommendations' },
      { url: 'screens/matchin/ai-chat.jpg', label: 'AI Career Mentor' },
      { url: 'screens/matchin/roadmap.jpg', label: 'Personalized Skill Roadmap' },
    ],
    architecture: [
      {
        name: 'Clean Architecture',
        desc: 'Separation of Presentation, Domain, and Data layers with repository contracts and isolated use cases.',
      },
      {
        name: 'BLoC / Cubit',
        desc: 'Predictable state management handling authentication lifecycles and real-time saved collection states.',
      },
      {
        name: 'Dio + RESTful API',
        desc: 'Robust networking layer with custom auth interceptors, token refresh flow, and unified error handling.',
      },
    ],
    contributions: [
      {
        title: 'End-to-End Authentication Architecture',
        desc: 'Engineered a secure multi-provider auth flow covering Login, Registration, OTP verification, Password Reset, and Google Sign-In with persistent session storage.',
      },
      {
        title: 'Saved Jobs & Application Tracking',
        desc: 'Built real-time reactive job bookmarking and application tracking with instant UI feedback and local synchronization.',
      },
      {
        title: 'Modular Dependency Injection',
        desc: 'Utilized GetIt service locator for clean dependency injection, ensuring decoupled and testable codebase across the team.',
      },
    ],
    techStack: ['Flutter', 'Dart', 'Clean Architecture', 'BLoC / Cubit', 'Dio', 'GetIt', 'Firebase', 'RESTful APIs'],
  },
  engipedia: {
    category: 'DIGITAL ACADEMIC HUB',
    badge: 'Mansoura University CCE',
    title: 'Engipedia',
    role: 'Lead Mobile App Developer',
    designer: 'Zeyad Khaled Mohamed',
    tagline: 'A centralized study app and course repository for Communication and Computer Engineering students at Mansoura University, organizing lectures, summaries, and past exams by course.',
    githubUrl: 'https://github.com/Ahmed-Elzaher/engipedia',
    playStoreUrl: null,
    isPlayStoreDisabled: false,
    screenshots: [
      { url: 'screens/engipedia/home.jpg', label: 'Dashboard & Departments' },
      { url: 'screens/engipedia/courses.jpg', label: 'Course Lectures & Materials' },
      { url: 'screens/engipedia/activity.jpg', label: 'Recent Activity & Progress' },
    ],
    architecture: [
      {
        name: 'Clean Architecture + MVVM',
        desc: 'Modular decoupled architecture separating UI from business logic with ViewModels for testable feature growth.',
      },
      {
        name: 'PDF Engine & Offline Storage',
        desc: 'Hardware-accelerated PDF viewing engine with local file caching for seamless offline exam preparation.',
      },
      {
        name: 'Smart Search & Indexing',
        desc: 'Client-side indexed search querying course codes, professors, semesters, and materials with instant filtering.',
      },
    ],
    contributions: [
      {
        title: 'Figma to High-Fidelity Flutter UI',
        desc: 'Translated complex design systems by Zeyad Khaled Mohamed into pixel-accurate Flutter components and responsive layouts.',
      },
      {
        title: 'Academic Repository & Document Viewer',
        desc: 'Architected structured academic resource browsing with deep hierarchy (Year → Semester → Department → Course → Material).',
      },
      {
        title: 'Study Progress & Caching Workflow',
        desc: 'Engineered progress tracking for studied lectures and local document caching ensuring zero friction during exam weeks.',
      },
    ],
    techStack: ['Flutter', 'Dart', 'Clean Architecture', 'MVVM', 'PDF Engine', 'Local Storage', 'Search Indexing'],
  },
};

function renderPlayButton(data) {
  if (!data.playStoreUrl) {
    return '';
  }
  if (data.isPlayStoreDisabled) {
    return `<button type="button" class="btn-primary is-disabled" disabled aria-disabled="true" title="Pending official release permission">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/></svg>
      Google Play ↗
    </button>`;
  }
  return `<a class="btn-primary" href="${data.playStoreUrl}" target="_blank" rel="noopener">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/></svg>
    Google Play ↗
  </a>`;
}

function renderGallery(screenshots) {
  const thumbsHtml = screenshots.map((s, idx) => `
    <button type="button" class="modal-thumb ${idx === 0 ? 'is-active' : ''}" data-idx="${idx}">
      ${s.label}
    </button>
  `).join('');

  return `
    <div class="modal-gallery">
      <h3 class="modal-section-title">App Interface & Walkthrough</h3>
      <div class="modal-gallery-stage">
        <img class="modal-gallery-img" id="modalStageImg" src="${screenshots[0].url}" alt="${screenshots[0].label}">
      </div>
      <div class="modal-thumbs-row" id="modalThumbsRow">
        ${thumbsHtml}
      </div>
    </div>
  `;
}

function renderArchitectureAndChallenges(data) {
  const archCardsHtml = data.architecture.map((a) => `
    <div class="modal-arch-card">
      <span class="modal-arch-name">${a.name}</span>
      <p class="modal-arch-desc">${a.desc}</p>
    </div>
  `).join('');

  const challengesHtml = data.contributions.map((c) => `
    <div class="modal-challenge-item">
      <h4 class="modal-challenge-title">${c.title}</h4>
      <p class="modal-challenge-text">${c.desc}</p>
    </div>
  `).join('');

  return `
    <div>
      <h3 class="modal-section-title">Architecture & System Design</h3>
      <div class="modal-arch-grid">${archCardsHtml}</div>
    </div>
    <div>
      <h3 class="modal-section-title">Key Contributions & Engineering Highlights</h3>
      <div class="modal-challenges-list">${challengesHtml}</div>
    </div>
  `;
}

function renderModalHead(data) {
  const designerHtml = data.designer
    ? `<p style="font-size: 0.88rem; color: var(--dim); margin: -0.2rem 0 0;">UI/UX design credit: <span style="color: var(--muted); font-weight: 600;">${data.designer}</span></p>`
    : '';

  return `
    <div class="modal-head">
      <div class="modal-tag-row">
        <span class="project-tag">${data.category}</span>
        <span class="project-tag team">${data.badge}</span>
      </div>
      <h2 class="modal-title">${data.title}</h2>
      <div style="color: var(--accent); font-family: var(--font-mono); font-size: 0.88rem; font-weight: 600;">Role: ${data.role}</div>
      <p class="modal-tagline">${data.tagline}</p>
      ${designerHtml}
      <div class="modal-cta-row">
        ${renderPlayButton(data)}
        <a class="btn-secondary" href="${data.githubUrl}" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          View Source on GitHub ↗
        </a>
      </div>
    </div>
  `;
}

function renderProjectModal(projectId) {
  const data = PROJECTS_DATA[projectId];
  const modalContent = document.getElementById('modalContent');
  if (!data || !modalContent) {
    return;
  }

  const techChipsHtml = data.techStack.map((t) => `<span class="tech-chip">${t}</span>`).join('');

  modalContent.innerHTML = `
    ${renderModalHead(data)}
    ${renderGallery(data.screenshots)}
    ${renderArchitectureAndChallenges(data)}
    <div>
      <h3 class="modal-section-title">Technologies Used</h3>
      <div class="tech-chips">${techChipsHtml}</div>
    </div>
  `;

  const thumbs = modalContent.querySelectorAll('.modal-thumb');
  const stageImg = document.getElementById('modalStageImg');
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      thumbs.forEach((t) => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
      const idx = parseInt(thumb.getAttribute('data-idx'), 10);
      if (stageImg && data.screenshots[idx]) {
        stageImg.src = data.screenshots[idx].url;
        stageImg.alt = data.screenshots[idx].label;
      }
    });
  });
}

let lastFocusedTrigger = null;

function openProjectModal(projectId) {
  const modal = document.getElementById('projectModal');
  if (!modal) {
    return;
  }
  lastFocusedTrigger = document.activeElement;
  renderProjectModal(projectId);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn) {
    closeBtn.focus();
  }
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal || !modal.classList.contains('is-open')) {
    return;
  }
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
    lastFocusedTrigger.focus();
  }
}

function initProjectModal() {
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const stageExploreBtn = document.getElementById('stageExploreBtn');
  const showcaseBtns = document.querySelectorAll('.showcase-btn');

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeProjectModal);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeProjectModal();
    }
  });

  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const projId = trigger.getAttribute('data-open-modal');
      if (projId) {
        openProjectModal(projId);
      }
    });
  });

  showcaseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const proj = btn.getAttribute('data-proj');
      if (stageExploreBtn && proj) {
        stageExploreBtn.setAttribute('data-open-modal', proj);
      }
    });
  });

  document.addEventListener('open-case-study', (event) => {
    if (event.detail && event.detail.project) {
      openProjectModal(event.detail.project);
    }
  });
}

initProjectModal();

// ==================== Floating Navigation Bar ====================

/** Show/hide the nav pill based on whether the hero section is visible. */
function observeNavVisibility(nav) {
  const heroEl = document.getElementById('about');
  if (!heroEl) {
    return;
  }
  new IntersectionObserver(
    ([entry]) => nav.classList.toggle('is-visible', !entry.isIntersecting),
    { threshold: 0.15 }
  ).observe(heroEl);
}

/** Highlight the nav link matching the currently-intersecting section. */
function observeNavActive(sections, navLinks) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const { id } = entry.target;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('data-section') === id);
        });
      });
    },
    { threshold: 0.25, rootMargin: '-60px 0px -45% 0px' }
  );
  sections.forEach((s) => observer.observe(s.el));
}

/** Wire up the floating nav bar. */
function initFloatingNav() {
  const nav = document.getElementById('floatingNav');
  if (!nav || !('IntersectionObserver' in window)) {
    return;
  }
  const navLinks = nav.querySelectorAll('.nav-link');
  const sections = ['about', 'skills', 'projects', 'credentials', 'contact']
    .map((id) => ({ id, el: document.getElementById(id) }))
    .filter((s) => s.el !== null);
  observeNavVisibility(nav);
  observeNavActive(sections, navLinks);
}

initFloatingNav();


// ==================== Scroll Reveal ====================

/** Add .reveal to target elements, then flip to .is-revealed on viewport entry. */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    return;
  }

  // Elements to reveal with optional stagger index
  const revealTargets = [
    // Section headings
    { selector: '.section .section-head', stagger: false },
    // Arsenal cards
    { selector: '#arsenalGrid .arsenal-card', stagger: true },
    // Feature cards
    { selector: '.feature-cards .feature-card', stagger: true },
    // Stat cards
    { selector: '.stats-grid .stat-card', stagger: true },
    // Project cards
    { selector: '#projects .project-card', stagger: false },
    // Credential cards
    { selector: '.credentials-grid .credential-card', stagger: true },
    // Contact section cards
    { selector: '.contact-info-cards .contact-info-card', stagger: true },
    // Contact form
    { selector: '#contactForm', stagger: false },
  ];

  const allReveal = [];

  revealTargets.forEach(({ selector, stagger }) => {
    const els = document.querySelectorAll(selector);
    els.forEach((el, idx) => {
      el.classList.add('reveal');
      if (stagger) {
        el.style.setProperty('--delay', `${idx * 75}ms`);
      }
      allReveal.push(el);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target); // reveal once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  allReveal.forEach((el) => observer.observe(el));
}

initScrollReveal();

// ==================== Internationalization (Language Switcher) ====================

const I18N = {
  en: {
    langLabel: 'عربي',
    navAbout: 'About',
    navSkills: 'Skills',
    navProjects: 'Projects',
    navCreds: 'Creds',
    navConnect: 'Connect',
    workTogether: "Let's Work Together",
    downloadCv: 'Download CV',
    heroLabel: '<span>FLUTTER</span> · <span>CLEAN ARCHITECTURE</span> · <span>MOBILE</span>',
    heroTitleSolid: 'FLUTTER',
    heroTitleOutline: 'DEVELOPER',
    heroBio:
      '<strong>Flutter Developer</strong> specializing in crafting high-performance, cross-platform applications. Passionate about building production-ready systems leveraging <strong>Clean Architecture</strong>, <strong>BLoC / Cubit</strong> state management, and robust <strong>RESTful APIs</strong>. B.Sc. in <strong>Communication & Computer Engineering</strong>, <strong>Mansoura University</strong> (June 2026 · Very Good).',
    stat1Lbl: 'Featured Apps',
    stat2Sub: 'Mansoura University',
    stat3Title: 'OPEN',
    stat3Lbl: 'Available For Hire',
    portraitTooltip: 'Clean code. Smooth UIs. Zero excuses.',
    badgeText: 'Available For Opportunities',
    feature1Title: 'Cross-Platform Mobile Engineer',
    feature1Desc:
      'From pixel-perfect UI implementation to smooth 60fps animations, delivering unified iOS & Android experiences.',
    feature2Title: 'Clean Architecture & Scalability',
    feature2Desc:
      'Strict decoupling between Presentation, Domain, and Data layers with SOLID principles and Dependency Injection.',
    arsenalTitleSolid: 'TECHNICAL',
    arsenalTitleOutline: 'ARSENAL',
    pillAll: 'ALL',
    pillMobile: 'MOBILE DEV',
    pillArch: 'ARCHITECTURE & STATE',
    pillTools: 'BACKEND & TOOLS',
    phoneTag: 'Interactive Experience',
    phoneTitleSolid: 'DRAG THE',
    phoneTitleOutline: '3D PHONE',
    phoneSubtitle:
      'Pick a project below to preview it live on the 3D phone screen, then turn and explore the phone with your finger or mouse in real-time 3D space.',
    phoneExploreBtn: 'Explore Case Study',
    projectsTitleSolid: 'FEATURED',
    projectsTitleOutline: 'PROJECTS',
    credsTitleSolid: 'CREDENTIALS &',
    credsTitleOutline: 'TRAINING',
    credsSubtitle:
      'Professional certifications, continuous technical development, and hands-on software engineering training.',
    contactTitleSolid: 'GET IN',
    contactTitleOutline: 'TOUCH',
    contactSubtitle:
      'Open to full-time roles, collaborations, and freelance work. Send me a message — it lands directly in my inbox.',
    nameLabel: 'Your Name',
    namePlaceholder: 'Jane Smith',
    emailLabel: 'Your Email',
    emailPlaceholder: 'jane@company.com',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'Flutter project collaboration',
    messageLabel: 'Message',
    messagePlaceholder:
      "Tell me about your project, timeline, and what you're looking to build...",
    submitBtnText: 'Send Message',
    wipTag: 'WIP (Work In Progress)',
    wipText:
      'Portfolio is actively evolving ahead of launch. More live demos, detailed case studies, and mobile experiments are being added. Feedback is warmly welcomed!',
    wipCta: 'Connect on LinkedIn',
    wipPillText: '🚧 WIP (Work In Progress)',
  },
  ar: {
    langLabel: 'EN',
    navAbout: 'عني',
    navSkills: 'المهارات',
    navProjects: 'المشاريع',
    navCreds: 'الشهادات',
    navConnect: 'تواصل',
    workTogether: 'لنعمل معاً',
    downloadCv: 'تحميل الـ CV',
    heroLabel: '<span>فلاتر</span> · <span>CLEAN ARCHITECTURE</span> · <span>تطبيقات الموبايل</span>',
    heroTitleSolid: 'مطور',
    heroTitleOutline: 'فلاتر',
    heroBio:
      '<strong>مطور تطبيقات فلاتر</strong> متخصص في بناء وتطوير تطبيقات عالية الأداء ومتعددة المنصات. شغوف بتطوير أنظمة برمجية جاهزة للإنتاج بالاعتماد على <strong>Clean Architecture</strong>، وإدارة الحالة بـ <strong>BLoC / Cubit</strong>، وتكامل قوي مع <strong>RESTful APIs</strong>. بكالوريوس في <strong>هندسة الحاسبات والاتصالات</strong>، <strong>جامعة المنصورة</strong> (تخرج يونيو 2026 · جيد جداً).',
    stat1Lbl: 'تطبيقات مميزة',
    stat2Sub: 'جامعة المنصورة',
    stat3Title: 'متاح',
    stat3Lbl: 'جاهز للعمل والفرص',
    portraitTooltip: 'كود نظيف. واجهات سلسة. بلا أعذار.',
    badgeText: 'متاح للفرص الوظيفية',
    feature1Title: 'مهندس تطبيقات متعددة المنصات',
    feature1Desc:
      'من واجهات دقيقة بالبكسل لأنيميشن سلس 60 إطار بالثانية، ودمج قوي للـ APIs ومكتبات الـ Native على iOS و Android.',
    feature2Title: 'معمارية نظيفة وقابلية للتوسع',
    feature2Desc:
      'فصل دقيق بين طبقات Presentation و Domain و Data بالاعتماد على مبادئ SOLID وحقن التبعيات GetIt لضمان قابلية الفحص والتوسع.',
    arsenalTitleSolid: 'الترسانة',
    arsenalTitleOutline: 'التقنية',
    pillAll: 'الكل',
    pillMobile: 'تطوير الموبايل',
    pillArch: 'المعمارية وإدارة الحالة',
    pillTools: 'الباك إند والأدوات',
    phoneTag: 'تجربة ثلاثية الأبعاد',
    phoneTitleSolid: 'المختبر',
    phoneTitleOutline: 'التفاعلي 3D',
    phoneSubtitle:
      'اختر مشروعاً لمعاينته حياً على شاشة الهاتف، ثم اسحب الهاتف لتفحصه وتدويره في الفضاء ثلاثي الأبعاد.',
    phoneExploreBtn: 'عرض دراسة الحالة',
    projectsTitleSolid: 'المشاريع',
    projectsTitleOutline: 'المميزة',
    credsTitleSolid: 'الشهادات و',
    credsTitleOutline: 'التدريب',
    credsSubtitle:
      'شهادات مهنية معتمدة، وتطوير تقني مستمر، وتدريب هندسي عملي مكثف.',
    contactTitleSolid: 'تواصل',
    contactTitleOutline: 'معي',
    contactSubtitle:
      'متاح للوظائف بدوام كامل، التعاقدات والمشاريع الحرة. أرسل رسالتك لتصلني فوراً.',
    nameLabel: 'اسمك الكريم',
    namePlaceholder: 'مثال: أحمد محمد',
    emailLabel: 'بريدك الإلكتروني',
    emailPlaceholder: 'name@example.com',
    subjectLabel: 'الموضوع',
    subjectPlaceholder: 'فرصة عمل / استفسار عن مشروع',
    messageLabel: 'الرسالة',
    messagePlaceholder:
      'مرحباً أحمد، نود مناقشة تفاصيل مشروعك أو فرصة العمل...',
    submitBtnText: 'إرسال الرسالة',
    wipTag: 'قيد التطوير والتحديث (WIP)',
    wipText:
      'البورتفوليو قيد التجهيز والتطوير المستمر تمهيداً للإطلاق! جاري إضافة دراسات حالة موسعة وعروض حية إضافية. يسعدنا جداً مشاركتك لرأيك وملاحظاتك.',
    wipCta: 'تواصل وأرسل ملاحظاتك عبر LinkedIn',
    wipPillText: '🚧 قيد التطوير (WIP)',
  },
};

/** Apply translations to elements with data-i18n attribute. */
function applyI18nText(dict) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!dict[key]) {
      return;
    }
    if (dict[key].includes('<')) {
      el.innerHTML = dict[key];
    } else {
      el.textContent = dict[key];
    }
  });
}

/** Apply translations to form inputs and subtitles. */
function applyFormI18n(dict) {
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitText = document.getElementById('submitBtnText');
  const credsSub = document.querySelector('#credentials .section-subtitle');
  const contactSub = document.querySelector('#contact .section-subtitle');

  if (nameInput) {
    nameInput.placeholder = dict.namePlaceholder;
  }
  if (emailInput) {
    emailInput.placeholder = dict.emailPlaceholder;
  }
  if (subjectInput) {
    subjectInput.placeholder = dict.subjectPlaceholder;
  }
  if (messageInput) {
    messageInput.placeholder = dict.messagePlaceholder;
  }
  if (submitText) {
    submitText.textContent = dict.submitBtnText;
  }
  if (credsSub) {
    credsSub.textContent = dict.credsSubtitle;
  }
  if (contactSub) {
    contactSub.textContent = dict.contactSubtitle;
  }
}

/** Set page language, direction, and text contents. */
function setLanguage(lang) {
  const targetLang = lang === 'ar' ? 'ar' : 'en';
  const dict = I18N[targetLang];
  document.documentElement.lang = targetLang;
  document.documentElement.dir = targetLang === 'ar' ? 'rtl' : 'ltr';

  const langBtnLabel = document.getElementById('langBtnLabel');
  const navLangLabel = document.getElementById('navLangLabel');
  if (langBtnLabel) {
    langBtnLabel.textContent = dict.langLabel;
  }
  if (navLangLabel) {
    navLangLabel.textContent = dict.langLabel;
  }

  applyI18nText(dict);
  applyFormI18n(dict);

  try {
    localStorage.setItem('portfolio_lang', targetLang);
  } catch (err) {
    console.error('LocalStorage unavailable:', err);
  }
}

/** Initialize language switcher button handlers. */
function initLanguageSwitcher() {
  const langBtn = document.getElementById('langToggleBtn');
  const navLangBtn = document.getElementById('navLangToggleBtn');

  const toggle = () => {
    const current = document.documentElement.lang === 'ar' ? 'ar' : 'en';
    const next = current === 'ar' ? 'en' : 'ar';
    setLanguage(next);
  };

  if (langBtn) {
    langBtn.addEventListener('click', toggle);
  }
  if (navLangBtn) {
    navLangBtn.addEventListener('click', toggle);
  }

  let savedLang = 'en';
  try {
    savedLang = localStorage.getItem('portfolio_lang') || 'en';
  } catch (err) {
    console.error('Could not read saved lang:', err);
  }

  if (savedLang === 'ar') {
    setLanguage('ar');
  }
}

initLanguageSwitcher();


// ==================== Floating WIP Window ====================

/** Initialize Work In Progress notice minimize/expand controls. */
function initWipBanner() {
  const banner = document.getElementById('wipBanner');
  const minimizeBtn = document.getElementById('wipMinimizeBtn');
  const expandBtn = document.getElementById('wipExpandBtn');

  if (!banner || !minimizeBtn || !expandBtn) {
    return;
  }

  minimizeBtn.addEventListener('click', () => {
    banner.classList.add('is-minimized');
    try {
      sessionStorage.setItem('wip_minimized', 'true');
    } catch (err) {
      console.error('SessionStorage unavailable:', err);
    }
  });

  expandBtn.addEventListener('click', () => {
    banner.classList.remove('is-minimized');
    try {
      sessionStorage.removeItem('wip_minimized');
    } catch (err) {
      console.error('SessionStorage unavailable:', err);
    }
  });

  try {
    if (sessionStorage.getItem('wip_minimized') === 'true') {
      banner.classList.add('is-minimized');
    }
  } catch (err) {
    console.error('SessionStorage unavailable:', err);
  }
}

initWipBanner();