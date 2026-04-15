/* ===== Main App Controller ===== */
let currentPage = 'home';

const MODULES = [
  { id: 'bag',          icon: 'shopping_bag',    titleKey: 'bagTitle',   descKey: 'bagDesc' },
  { id: 'time',         icon: 'schedule',        titleKey: 'timeTitle',  descKey: 'timeDesc' },
  { id: 'brain',        icon: 'psychology',       titleKey: 'brainTitle', descKey: 'brainDesc' },
  { id: 'mind',         icon: 'favorite',         titleKey: 'mindTitle',  descKey: 'mindDesc' },
  { id: 'color',        icon: 'palette',          titleKey: 'colorTitle', descKey: 'colorDesc' },
  { id: 'music',        icon: 'headphones',       titleKey: 'musicTitle', descKey: 'musicDesc' },
  { id: 'word',         icon: 'menu_book',        titleKey: 'wordTitle',  descKey: 'wordDesc' },
  { id: 'relationship', icon: 'group',            titleKey: 'relTitle',   descKey: 'relDesc' },
];

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ===== Routing ===== */
function navigateTo(page) {
  currentPage = page;
  window.location.hash = page === 'home' ? '' : page;
  renderCurrentPage();
}

function renderCurrentPage() {
  const content = document.getElementById('app-content');
  const backBtn = document.getElementById('header-back');
  const fab = document.getElementById('fab-container');
  const title = document.getElementById('header-title');

  closeFab();

  if (currentPage === 'home') {
    content.innerHTML = renderDashboard();
    backBtn.style.display = 'none';
    fab.style.display = 'none';
    title.textContent = t('appTitle');
  } else {
    content.innerHTML = renderModule(currentPage);
    backBtn.style.display = 'flex';
    fab.style.display = 'flex';
    const mod = MODULES.find(m => m.id === currentPage);
    title.textContent = mod ? t(mod.titleKey) : t('appTitle');

    // Module-specific init
    if (currentPage === 'brain') {
      initBrainCanvas();
    }
  }

  applyI18n();
  window.scrollTo(0, 0);
}

/* ===== Dashboard ===== */
function renderDashboard() {
  return `
    <div class="dashboard-header">
      <h1 data-i18n="appTitle">What's In My</h1>
      <p data-i18n="subtitle">${t('subtitle')}</p>
    </div>
    <div class="module-grid">
      ${MODULES.map(m => `
        <div class="module-card" onclick="navigateTo('${m.id}')">
          <span class="material-icons">${m.icon}</span>
          <h3 data-i18n="${m.titleKey}">${t(m.titleKey)}</h3>
          <p data-i18n="${m.descKey}">${t(m.descKey)}</p>
        </div>
      `).join('')}
    </div>
  `;
}

/* ===== Module Renderer ===== */
function renderModule(id) {
  switch (id) {
    case 'bag': return renderBag();
    case 'time': return renderTime();
    case 'brain': return renderBrain();
    case 'mind': return renderMind();
    case 'color': return renderColor();
    case 'music': return renderMusic();
    case 'word': return renderWord();
    case 'relationship': return renderRelationship();
    default: return renderDashboard();
  }
}

/* ===== Help Modal ===== */
function showHelp() {
  const modal = document.getElementById('help-modal');
  const body = document.getElementById('help-body');
  body.innerHTML = t('helpContent');
  modal.style.display = 'flex';
}

function closeHelp() {
  document.getElementById('help-modal').style.display = 'none';
}

function closeHelpOutside(event) {
  if (event.target === event.currentTarget) closeHelp();
}

/* ===== Init ===== */
function initApp() {
  initTheme();

  // Set initial language label
  const labels = { ko: 'KO', en: 'EN', ja: 'JP' };
  document.getElementById('lang-label').textContent = labels[currentLang] || 'KO';

  // Handle hash routing
  const hash = window.location.hash.slice(1);
  if (hash && MODULES.some(m => m.id === hash)) {
    currentPage = hash;
  }

  renderCurrentPage();
}

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1);
  if (!hash || hash === 'home') {
    currentPage = 'home';
  } else if (MODULES.some(m => m.id === hash)) {
    currentPage = hash;
  }
  renderCurrentPage();
});

document.addEventListener('DOMContentLoaded', initApp);
