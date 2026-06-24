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
  { id: 'money',        icon: 'payments',         titleKey: 'moneyTitle', descKey: 'moneyDesc' },
  { id: 'app',          icon: 'smartphone',       titleKey: 'appTitleMod', descKey: 'appDesc' },
];

function getModuleCount(id, allData) {
  const d = allData[id];
  if (!d) return 0;
  if (Array.isArray(d)) return d.length;
  if (id === 'money') return (d.items || []).length;
  if (id === 'app') return (d.icons || []).length;
  return 0;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ===== 원고지 (manuscript) full-width conversion =====
 * Korean manuscript paper puts one character per square cell. To make every
 * glyph advance exactly one cell — including the space bar, latin letters,
 * digits and punctuation, which are normally half-width — we display the text
 * using full-width (CJK) Unicode forms. Hangul is already full-width. The value
 * stored/exported is always normalised back to normal width, so plain mode,
 * reports and backups are unaffected. The mapping is 1:1 per character, so the
 * caret index is preserved when we rewrite a field's value in place. */
function toFullWidth(s) {
  return String(s).replace(/[ -~]/g, (c) =>
    c === ' ' ? '　' : String.fromCharCode(c.charCodeAt(0) + 0xFEE0));
}
function toHalfWidth(s) {
  return String(s).replace(/[　！-～]/g, (c) =>
    c === '　' ? ' ' : String.fromCharCode(c.charCodeAt(0) - 0xFEE0));
}

// Text to show inside a reflection field: full-width while manuscript mode is on.
function manuscriptDisplay(text) {
  const on = (typeof getManuscriptMode === 'function') && getManuscriptMode();
  return on ? toFullWidth(text || '') : (text || '');
}

// Handle typing in a manuscript field: rewrite the visible value to full-width
// (keeping the caret put) and return the normal-width text to persist. Skips the
// rewrite mid-IME-composition so Hangul input isn't interrupted. Returns the
// plain value to store for any field/mode.
function reflectionStoreValue(el, isComposing) {
  const on = (typeof getManuscriptMode === 'function') && getManuscriptMode();
  if (on && !isComposing) {
    const start = el.selectionStart, end = el.selectionEnd;
    const full = toFullWidth(el.value);
    if (full !== el.value) {
      el.value = full;
      el.selectionStart = start;
      el.selectionEnd = end;
    }
  }
  return on ? toHalfWidth(el.value) : el.value;
}

/* Shared reflection block (used by every module).
 * For money/app the reflection is stored inside the module object
 * (handled by their own save functions). For all other modules,
 * we use the unified `reflections` map on the root data. */
function reflectionBlockHtml(moduleId) {
  const labelKey = moduleId + 'Reflect';
  const phKey = moduleId + 'ReflectPh';
  const text = (typeof getReflection === 'function') ? getReflection(moduleId) : '';
  return `
    <div class="reflection-block">
      <div class="reflection-head">
        <label class="reflection-label" for="reflect-${moduleId}">${t(labelKey)}</label>
        ${reflectionModeToggleHtml()}
      </div>
      <textarea class="form-input reflection-textarea${reflectionModeClass()}" id="reflect-${moduleId}"
                placeholder="${t(phKey)}"
                oninput="onReflectionInput('${moduleId}', this, event)">${escapeHtml(manuscriptDisplay(text))}</textarea>
    </div>
  `;
}

// Extra class applied to reflection fields when manuscript (원고지) mode is on.
function reflectionModeClass() {
  return (typeof getManuscriptMode === 'function' && getManuscriptMode()) ? ' manuscript' : '';
}

// The "plain / 원고지" toggle shown above every reflection field.
function reflectionModeToggleHtml() {
  const on = (typeof getManuscriptMode === 'function') && getManuscriptMode();
  return `
    <button type="button" class="manuscript-toggle${on ? ' active' : ''}"
            onclick="toggleManuscriptMode()" aria-pressed="${on}">
      <span class="material-icons">grid_on</span>
      <span>${t('manuscriptMode')}</span>
    </button>`;
}

// Flip manuscript mode for all reflection fields and re-render the page.
function toggleManuscriptMode() {
  setManuscriptMode(!getManuscriptMode());
  renderCurrentPage();
}

// Grow a textarea to fit its content so long entries stay fully visible while
// typing (no inner scrollbar) and are captured completely on export.
function autoGrowTextarea(el) {
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

// Size every reflection/auto-grow textarea on the current page after a render.
function autoGrowAllTextareas() {
  document.querySelectorAll('.reflection-textarea').forEach(autoGrowTextarea);
}

// Lay out manuscript fields as a grid: a fixed square cell, a whole number of
// columns across the available width, so each character lands in one cell.
const MANUSCRIPT_CELL = 34;       // desktop cell size (px)
const MANUSCRIPT_CELL_SM = 28;    // narrow-screen cell size (px)

function layoutManuscript() {
  const cell = window.innerWidth <= 600 ? MANUSCRIPT_CELL_SM : MANUSCRIPT_CELL;
  document.querySelectorAll('.reflection-textarea.manuscript').forEach((el) => {
    const avail = (el.parentElement ? el.parentElement.clientWidth : el.clientWidth);
    const cols = Math.max(6, Math.floor((avail - 2) / cell)); // -2 for the 1px borders
    el.style.setProperty('--ms-cell', cell + 'px');
    el.style.width = (cols * cell) + 'px';
    autoGrowTextarea(el);
  });
}

// Re-fit reflection fields after layout changes (render, viewport resize).
function refitReflectionFields() {
  autoGrowAllTextareas();
  layoutManuscript();
}

window.addEventListener('resize', refitReflectionFields);

// The manuscript font changes glyph advance once it loads; re-fit when ready.
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(refitReflectionFields);
}

function onReflectionInput(moduleId, el, ev) {
  saveReflection(moduleId, reflectionStoreValue(el, ev && ev.isComposing));
  autoGrowTextarea(el);
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
    } else if (currentPage === 'app') {
      initAppModule();
    }

    // Fit reflection fields to any saved text so nothing is hidden behind a scrollbar.
    refitReflectionFields();
  }

  applyI18n();
  window.scrollTo(0, 0);
}

/* ===== Dashboard ===== */
function renderDashboard() {
  const allData = loadAllData();

  function heroBtn(m) {
    const count = getModuleCount(m.id, allData);
    const label = t(m.titleKey);
    const splitIdx = label.indexOf(' (');
    const labelHtml = splitIdx !== -1
      ? `${escapeHtml(label.slice(0, splitIdx))}<br><span class="btn-label-sub">${escapeHtml(label.slice(splitIdx + 1))}</span>`
      : escapeHtml(label);
    return `
      <button class="hero-module-btn" onclick="navigateTo('${m.id}')" aria-label="${escapeHtml(label)}">
        <span class="material-icons">${m.icon}</span>
        <span class="btn-label">${labelHtml}</span>
        ${count > 0 ? `<span class="card-badge">${count}</span>` : ''}
      </button>
    `;
  }

  return `
    <div class="hero-layout">
      <div class="hero-side-modules">
        ${MODULES.slice(0, 5).map(heroBtn).join('')}
      </div>
      <div class="hero-center">
        <h1 class="hero-title" data-i18n="appTitle">What's In My</h1>
        <p class="hero-subtitle" data-i18n="subtitle">${t('subtitle')}</p>
        <img class="hero-image" src="https://i.ibb.co/n88DvYjk/Chat-GPT-Image-2026-4-18-08-49-39.png" alt="">
      </div>
      <div class="hero-side-modules">
        ${MODULES.slice(5).map(heroBtn).join('')}
      </div>
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
    case 'money': return renderMoney();
    case 'app': return renderAppModule();
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

function closeBackupOutside(event) {
  if (event.target === event.currentTarget) {
    document.getElementById('backup-modal').style.display = 'none';
  }
}

function resetCurrentModule() {
  if (currentPage === 'home') return;
  if (!confirm(t('confirmResetCurrent'))) return;
  const defaults = getDefaultData();
  saveModuleData(currentPage, defaults[currentPage] !== undefined ? defaults[currentPage] : []);
  // Also clear this module's reflection (money/app store it inside their object,
  // which is already covered by the line above).
  if (currentPage !== 'money' && currentPage !== 'app') {
    saveReflection(currentPage, '');
  }
  showToast(t('toastResetDone'));
  renderCurrentPage();
}

function resetAllData() {
  if (!confirm(t('confirmResetAll'))) return;
  saveAllData(getDefaultData());
  showToast(t('toastResetAllDone'));
  renderCurrentPage();
}

/* ===== Report Modal ===== */
function reportCollect() {
  return MODULES.map(m => ({
    id: m.id,
    icon: m.icon,
    title: t(m.titleKey),
    text: getReflection(m.id) || ''
  }));
}

function showReport() {
  const modal = document.getElementById('report-modal');
  const body = document.getElementById('report-body');
  if (!modal || !body) return;

  const items = reportCollect();
  const filled = items.filter(i => i.text.trim());
  const today = new Date();
  const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
  const savedName = getReportName();

  body.innerHTML = `
    <div class="report-sheet" id="report-sheet">
      <div class="report-sheet-header">
        <h1 class="report-sheet-title">${t('reportTitle')}</h1>
        <p class="report-sheet-subtitle">${t('subtitle')}</p>
        <div class="report-sheet-divider"></div>
      </div>
      <div class="report-sheet-meta">
        <div class="report-meta-row">
          <label class="report-meta-label">${t('reportNameLabel')}</label>
          <input type="text" class="form-input report-name-input" id="report-name-input"
                 placeholder="${t('reportNamePh')}" maxlength="30"
                 value="${escapeHtml(savedName)}"
                 oninput="onReportNameInput(this.value)">
        </div>
        <div class="report-meta-row">
          <span class="report-meta-label">${t('reportDate')}</span>
          <span class="report-meta-value">${dateStr}</span>
        </div>
      </div>
      ${filled.length === 0 ? `
        <div class="report-empty">${t('reportEmpty')}</div>
      ` : `
        <div class="report-sections">
          ${filled.map(it => `
            <div class="report-section">
              <div class="report-section-head">
                <span class="material-icons report-section-icon">${it.icon}</span>
                <span class="report-section-title">${escapeHtml(it.title)}</span>
              </div>
              <div class="report-section-text">${escapeHtml(it.text).replace(/\n/g, '<br>')}</div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
  modal.style.display = 'flex';
}

function closeReport() {
  const modal = document.getElementById('report-modal');
  if (modal) modal.style.display = 'none';
}

function closeReportOutside(event) {
  if (event.target === event.currentTarget) closeReport();
}

function onReportNameInput(name) {
  saveReportName(name);
}

function reportPlainText() {
  const items = reportCollect().filter(i => i.text.trim());
  const today = new Date();
  const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
  const name = (getReportName() || '').trim() || t('reportNoName');
  const lines = [];
  lines.push(`[${t('reportTitle')}]`);
  lines.push(`${t('reportNameLabel')}: ${name}`);
  lines.push(`${t('reportDate')}: ${dateStr}`);
  lines.push('');
  if (items.length === 0) {
    lines.push(t('reportEmpty'));
  } else {
    items.forEach(it => {
      lines.push(`■ ${it.title}`);
      lines.push(it.text);
      lines.push('');
    });
  }
  return lines.join('\n').trim() + '\n';
}

async function captureReportCanvas() {
  const sheet = document.getElementById('report-sheet');
  if (!sheet) throw new Error('no sheet');

  // Clone into a fixed-width off-screen container so modal scroll-clipping
  // does not distort the output dimensions.
  const CAPTURE_WIDTH = 720;
  const wrapper = document.createElement('div');
  wrapper.style.cssText = [
    'position:fixed', 'top:-9999px', 'left:-9999px',
    `width:${CAPTURE_WIDTH}px`, 'background:#ffffff', 'z-index:-1',
  ].join(';');
  const clone = sheet.cloneNode(true);
  clone.style.cssText = 'width:100%;border-radius:0;box-shadow:none;';
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  try {
    return await html2canvas(wrapper, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      scale: 2,
      width: CAPTURE_WIDTH,
      windowWidth: CAPTURE_WIDTH,
      imageTimeout: 0,
    });
  } finally {
    document.body.removeChild(wrapper);
  }
}

async function reportDownloadJpg() {
  try {
    const canvas = await captureReportCanvas();
    const link = document.createElement('a');
    link.download = `reflection-report-${Date.now()}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
    showToast(t('toastExported'));
  } catch {
    showToast(t('toastError'));
  }
}

async function reportCopyJpg() {
  try {
    const canvas = await captureReportCanvas();
    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        showToast(t('toastCopied'));
      } catch {
        showToast(t('toastError'));
      }
    }, 'image/png');
  } catch {
    showToast(t('toastError'));
  }
}

async function reportCopyText() {
  try {
    await navigator.clipboard.writeText(reportPlainText());
    showToast(t('toastCopied'));
  } catch {
    showToast(t('toastError'));
  }
}

function reportDownloadTxt() {
  try {
    const blob = new Blob([reportPlainText()], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.download = `reflection-report-${Date.now()}.txt`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    showToast(t('toastExported'));
  } catch {
    showToast(t('toastError'));
  }
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
    const help = document.getElementById('help-modal');
    const report = document.getElementById('report-modal');
    if (report && report.style.display !== 'none') {
      closeReport();
    } else if (help && help.style.display !== 'none') {
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
