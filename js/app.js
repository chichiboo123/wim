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
  const resetModuleBtn = document.getElementById('reset-module-btn');
  const resetAllBtn = document.getElementById('reset-all-btn');

  closeFab();

  if (currentPage === 'home') {
    content.innerHTML = renderDashboard();
    backBtn.style.display = 'none';
    fab.style.display = 'none';
    title.textContent = t('appTitle');
    if (resetModuleBtn) resetModuleBtn.style.display = 'none';
    if (resetAllBtn) resetAllBtn.style.display = 'flex';
  } else {
    content.innerHTML = renderModule(currentPage);
    backBtn.style.display = 'inline-flex';
    fab.style.display = 'flex';
    const mod = MODULES.find(m => m.id === currentPage);
    title.textContent = mod ? t(mod.titleKey) : t('appTitle');
    if (resetModuleBtn) resetModuleBtn.style.display = 'flex';
    if (resetAllBtn) resetAllBtn.style.display = 'none';

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
  const allData = loadAllData();

  function heroBtn(m) {
    const count = (allData[m.id] || []).length;
    return `
      <button class="hero-module-btn" onclick="navigateTo('${m.id}')" aria-label="${t(m.titleKey)}">
        <span class="material-icons">${m.icon}</span>
        <span class="btn-label">${t(m.titleKey)}</span>
        ${count > 0 ? `<span class="card-badge">${count}</span>` : ''}
      </button>
    `;
  }

  return `
    <div class="hero-layout">
      <div class="hero-side-modules">
        ${MODULES.slice(0, 4).map(heroBtn).join('')}
      </div>
      <div class="hero-center">
        <h1 class="hero-title" data-i18n="appTitle">What's In My</h1>
        <p class="hero-subtitle" data-i18n="subtitle">${t('subtitle')}</p>
        <img class="hero-image" src="https://i.ibb.co/n88DvYjk/Chat-GPT-Image-2026-4-18-08-49-39.png" alt="">
      </div>
      <div class="hero-side-modules">
        ${MODULES.slice(4).map(heroBtn).join('')}
      </div>
    </div>
    <div class="module-grid module-grid-mobile">
      ${MODULES.map(m => {
        const count = (allData[m.id] || []).length;
        return `
          <button class="module-card" onclick="navigateTo('${m.id}')" aria-label="${t(m.titleKey)}">
            <span class="material-icons">${m.icon}</span>
            <h3 data-i18n="${m.titleKey}">${t(m.titleKey)}</h3>
            <p data-i18n="${m.descKey}">${t(m.descKey)}</p>
            ${count > 0 ? `<span class="card-badge">${count}</span>` : ''}
          </button>
        `;
      }).join('')}
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

function openBackupMenu() {
  const menu = document.getElementById('backup-menu-dropdown');
  if (menu) menu.classList.add('open');
}

function closeBackupMenu() {
  const menu = document.getElementById('backup-menu-dropdown');
  if (menu) menu.classList.remove('open');
}

function toggleBackupMenu(event) {
  event.stopPropagation();
  const menu = document.getElementById('backup-menu-dropdown');
  if (!menu) return;
  menu.classList.toggle('open');
}

function toggleThemeMenu() {
  const menu = document.getElementById('theme-menu');
  if (!menu) return;
  menu.classList.toggle('open');
}

function setThemeFromMenu(theme) {
  setTheme(theme);
  const menu = document.getElementById('theme-menu');
  if (menu) menu.classList.remove('open');
}

function triggerBackupDownload() {
  exportJSON();
  closeBackupMenu();
}

function resetCurrentModule() {
  if (currentPage === 'home') return;
  if (!confirm(t('confirmResetCurrent'))) return;
  saveModuleData(currentPage, []);
  showToast(t('toastResetDone'));
  renderCurrentPage();
}

function resetAllData() {
  if (!confirm(t('confirmResetAll'))) return;
  saveAllData(getDefaultData());
  showToast(t('toastResetAllDone'));
  renderCurrentPage();
}

/* ===== Init ===== */
function initApp() {
  initTheme();
  setLang(currentLang);

  // Handle hash routing
  const hash = window.location.hash.slice(1);
  if (hash && MODULES.some(m => m.id === hash)) {
    currentPage = hash;
  }

  // ESC 키로 모달/FAB 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const modal = document.getElementById('help-modal');
    if (modal && modal.style.display !== 'none') {
      closeHelp();
    } else if (fabOpen) {
      closeFab();
    }
  });

  document.addEventListener('click', (e) => {
    const backup = document.getElementById('backup-menu-dropdown');
    const backupWrap = e.target.closest('.backup-picker-wrap');
    if (backup && !backupWrap) backup.classList.remove('open');
    const themeMenu = document.getElementById('theme-menu');
    const themeWrap = e.target.closest('.theme-picker-wrap');
    if (themeMenu && !themeWrap) themeMenu.classList.remove('open');
  });

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
