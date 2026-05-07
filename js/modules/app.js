/* ===== APP (Smartphone) MODULE ===== */

const APP_PASTELS = [
  '#A8D8EA', '#B5E8C3', '#F4B6C2', '#FDE68A', '#C5B4E3',
  '#FFD3B6', '#B8E0D2', '#F7C8E0', '#D6EDF8', '#FFE5B4',
  '#C8E6C9', '#FFCDD2', '#E1BEE7', '#FFF9C4', '#B3E5FC'
];

const APP_TOP100 = [
  'YouTube','KakaoTalk','Instagram','TikTok','WhatsApp','Facebook','Messenger','Snapchat',
  'X (Twitter)','Threads','Discord','Telegram','LINE','WeChat','Reddit','Pinterest',
  'LinkedIn','Tumblr','Spotify','Apple Music','SoundCloud','YouTube Music','Melon','Genie Music',
  'Bugs','Netflix','Disney+','Tving','Wavve','Coupang Play','Watcha','Prime Video',
  'HBO Max','Hulu','Twitch','Naver','Daum','Google','Chrome','Safari',
  'Edge','Firefox','Gmail','Outlook','Naver Mail','Google Maps','Naver Map','Kakao Map',
  'Apple Maps','Waze','Uber','Kakao T','Tada','Lyft','Grab','Coupang',
  'Gmarket','11st','Auction','SSG','Ali Express','Amazon','Shopee','eBay',
  'Temu','Daiso','Musinsa','Zigzag','Toss','Kakao Pay','Naver Pay','Samsung Pay',
  'Apple Pay','PayPal','Venmo','Wise','Robinhood','Banksalad','Mint','Notion',
  'Evernote','OneNote','Google Keep','Slack','Teams','Zoom','Google Meet','Webex',
  'ChatGPT','Claude','Gemini','Copilot','Perplexity','Midjourney','Canva','Figma',
  'Adobe Express','Photoshop','VSCO','Lightroom','GoodNotes','Procreate','Duolingo','Class101'
];

let appBoxesEl = null;
let appResizeHandler = null;
let appDragging = null;
let appLineRaf = 0;

function getAppState() {
  const d = getModuleData('app');
  if (Array.isArray(d) || !d) return { icons: [], reflection: '' };
  return {
    icons: Array.isArray(d.icons) ? d.icons : [],
    reflection: d.reflection || ''
  };
}

function saveAppState(state) { saveModuleData('app', state); }

function appColorFor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return APP_PASTELS[h % APP_PASTELS.length];
}

function appInitial(name) {
  const trimmed = (name || '').trim();
  if (!trimmed) return '?';
  // For multi-byte characters (emoji, hangul, etc.) use Array.from
  const chars = Array.from(trimmed);
  return chars[0].toUpperCase();
}

function nextAppId() {
  return 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/* ----- Layout helpers ----- */

function nextIconPos(iconCount) {
  // 4-column grid inside the phone screen
  const cols = 4;
  const col = iconCount % cols;
  const row = Math.floor(iconCount / cols);
  const x = 12 + col * 24;   // %
  const y = 8 + row * 18;    // %
  return { x: Math.min(88, x), y: Math.min(82, y) };
}

function nextBoxPos(iconCount) {
  // Alternate left/right around phone, stack vertically
  const side = iconCount % 2 === 0 ? 'left' : 'right';
  const stackIdx = Math.floor(iconCount / 2);
  const x = side === 'left' ? 4 : 74;
  const y = 6 + stackIdx * 20;
  return { x, y: Math.min(80, y) };
}

/* ----- Render ----- */

function renderAppModule() {
  const state = getAppState();

  const iconsHtml = state.icons.map((ic) => {
    const inner = renderAppIconInner(ic);
    return `
      <div class="app-icon" data-id="${ic.id}"
           style="left:${ic.x}%;top:${ic.y}%;"
           onmousedown="startAppDrag(event,'${ic.id}','icon')"
           ontouchstart="startAppDrag(event,'${ic.id}','icon')">
        ${inner}
        <div class="app-icon-label">${escapeHtml(ic.label)}</div>
        <button class="app-icon-del"
                onclick="event.stopPropagation();deleteAppIcon('${ic.id}')"
                ontouchend="event.stopPropagation();event.preventDefault();deleteAppIcon('${ic.id}')">✕</button>
      </div>`;
  }).join('');

  const boxesHtml = state.icons.map((ic) => `
    <div class="app-box" data-id="${ic.id}"
         style="left:${ic.boxX}%;top:${ic.boxY}%;">
      <div class="app-box-handle"
           onmousedown="startAppDrag(event,'${ic.id}','box')"
           ontouchstart="startAppDrag(event,'${ic.id}','box')">
        <span class="material-icons">drag_indicator</span>
        <span class="app-box-title">${escapeHtml(ic.label)}</span>
      </div>
      <textarea class="app-box-text" placeholder="${t('appBoxPh')}"
                oninput="updateAppBoxText('${ic.id}', this.value)">${escapeHtml(ic.boxText || '')}</textarea>
    </div>
  `).join('');

  return `
    <div class="module-page">
      <h2 class="module-title">${t('appPageTitle')}</h2>

      <div class="work-area app-work-area" id="app-work-area">
        <svg class="app-svg" id="app-svg"></svg>

        <div class="app-boxes-layer" id="app-boxes-layer">
          ${boxesHtml}
        </div>

        <div class="app-phone" id="app-phone">
          <div class="app-phone-notch"></div>
          <div class="app-phone-screen" id="app-phone-screen">
            ${iconsHtml}
            <button class="app-add-btn" onclick="openAppAddModal()" aria-label="${t('appAddIcon')}">
              <span class="material-icons">add</span>
            </button>
          </div>
          <div class="app-phone-home"></div>
        </div>
      </div>

      <div class="reflection-block">
        <label class="reflection-label">${t('appReflect')}</label>
        <textarea class="form-input reflection-textarea" id="app-reflect"
                  placeholder="${t('appReflectPh')}"
                  oninput="saveAppReflection(this.value)">${escapeHtml(state.reflection)}</textarea>
      </div>

      <div id="app-add-modal" class="modal-overlay app-modal" style="display:none;"
           onclick="if(event.target===event.currentTarget)closeAppAddModal()">
        <div class="modal-content app-modal-content">
          <div class="modal-header">
            <h2>${t('appAddIcon')}</h2>
            <button class="icon-btn" onclick="closeAppAddModal()"><span class="material-icons">close</span></button>
          </div>
          <div class="app-modal-tabs">
            <button class="app-tab active" data-tab="preset" onclick="appSwitchTab('preset')">${t('appTabPreset')}</button>
            <button class="app-tab" data-tab="image" onclick="appSwitchTab('image')">${t('appTabImage')}</button>
            <button class="app-tab" data-tab="text" onclick="appSwitchTab('text')">${t('appTabText')}</button>
          </div>
          <div class="app-tab-panel" data-panel="preset">
            <input type="text" class="form-input" id="app-preset-search" placeholder="${t('appSearch')}"
                   oninput="renderAppPresetList(this.value)">
            <div class="app-preset-list" id="app-preset-list"></div>
          </div>
          <div class="app-tab-panel" data-panel="image" style="display:none;">
            <p class="app-modal-hint">${t('appUploadHint')}</p>
            <input type="text" class="form-input" id="app-image-name" placeholder="${t('appNamePh')}" maxlength="20">
            <input type="file" id="app-image-file" accept="image/*">
            <button class="btn btn-primary" onclick="addAppImageIcon()">${t('appAdd')}</button>
          </div>
          <div class="app-tab-panel" data-panel="text" style="display:none;">
            <input type="text" class="form-input" id="app-text-name" placeholder="${t('appNamePh')}" maxlength="20"
                   onkeydown="if(event.key==='Enter')addAppTextIcon()">
            <button class="btn btn-primary" onclick="addAppTextIcon()">${t('appAdd')}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAppIconInner(ic) {
  if (ic.type === 'image' && ic.src) {
    return `<div class="app-icon-img" style="background-image:url('${ic.src}')"></div>`;
  }
  const color = ic.color || appColorFor(ic.label);
  const initial = appInitial(ic.label);
  return `<div class="app-icon-text" style="background:${color}">${escapeHtml(initial)}</div>`;
}

/* ----- Init / line drawing ----- */

function initAppModule() {
  drawAppLines();
  if (appResizeHandler) window.removeEventListener('resize', appResizeHandler);
  appResizeHandler = () => scheduleAppLines();
  window.addEventListener('resize', appResizeHandler);
}

function scheduleAppLines() {
  if (appLineRaf) cancelAnimationFrame(appLineRaf);
  appLineRaf = requestAnimationFrame(() => { appLineRaf = 0; drawAppLines(); });
}

function drawAppLines() {
  const svg = document.getElementById('app-svg');
  const wrap = document.getElementById('app-work-area');
  if (!svg || !wrap) return;
  const wRect = wrap.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${wRect.width} ${wRect.height}`);
  svg.setAttribute('width', wRect.width);
  svg.setAttribute('height', wRect.height);

  const state = getAppState();
  const ns = 'http://www.w3.org/2000/svg';
  let html = '';
  state.icons.forEach((ic) => {
    const iconEl = document.querySelector(`.app-icon[data-id="${ic.id}"]`);
    const boxEl = document.querySelector(`.app-box[data-id="${ic.id}"]`);
    if (!iconEl || !boxEl) return;
    const ir = iconEl.getBoundingClientRect();
    const br = boxEl.getBoundingClientRect();
    const x1 = ir.left + ir.width / 2 - wRect.left;
    const y1 = ir.top + ir.height / 2 - wRect.top;
    // Connect to nearest edge of box
    const bx = br.left + br.width / 2 - wRect.left;
    const by = br.top + br.height / 2 - wRect.top;
    const x2 = (x1 < bx) ? br.left - wRect.left : br.right - wRect.left;
    const y2 = Math.max(br.top - wRect.top + 8, Math.min(br.bottom - wRect.top - 8, y1));
    // Curved bezier
    const mx = (x1 + x2) / 2;
    const path = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
    html += `<path d="${path}" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" opacity="0.65"/>`;
    html += `<circle cx="${x1}" cy="${y1}" r="3" fill="var(--primary)"/>`;
  });
  svg.innerHTML = html;
}

/* ----- Modal / tabs ----- */

function openAppAddModal() {
  const modal = document.getElementById('app-add-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  appSwitchTab('preset');
  renderAppPresetList('');
}

function closeAppAddModal() {
  const modal = document.getElementById('app-add-modal');
  if (modal) modal.style.display = 'none';
}

function appSwitchTab(tab) {
  document.querySelectorAll('.app-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });
  document.querySelectorAll('.app-tab-panel').forEach(p => {
    p.style.display = (p.dataset.panel === tab) ? 'block' : 'none';
  });
}

function renderAppPresetList(filter) {
  const list = document.getElementById('app-preset-list');
  if (!list) return;
  const q = (filter || '').trim().toLowerCase();
  const items = APP_TOP100.filter(n => !q || n.toLowerCase().includes(q));
  list.innerHTML = items.map(name => {
    const color = appColorFor(name);
    const initial = appInitial(name);
    return `
      <button class="app-preset-item" onclick="addAppPresetIcon('${escapeHtml(name).replace(/'/g, "&#39;")}')">
        <span class="app-preset-icon" style="background:${color}">${escapeHtml(initial)}</span>
        <span class="app-preset-name">${escapeHtml(name)}</span>
      </button>`;
  }).join('') || `<div class="app-preset-empty">—</div>`;
}

/* ----- Add handlers ----- */

function addAppPresetIcon(name) {
  // name comes back HTML-escaped; convert known entities
  const decoded = name
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  appPushIcon({ type: 'preset', label: decoded, color: appColorFor(decoded) });
  closeAppAddModal();
}

function addAppTextIcon() {
  const el = document.getElementById('app-text-name');
  const name = (el?.value || '').trim();
  if (!name) { showToast(t('moneyNeedLabel')); return; }
  appPushIcon({ type: 'text', label: name, color: appColorFor(name) });
  closeAppAddModal();
}

function addAppImageIcon() {
  const nameEl = document.getElementById('app-image-name');
  const fileEl = document.getElementById('app-image-file');
  const name = (nameEl?.value || '').trim() || 'App';
  const file = fileEl?.files?.[0];
  if (!file) { showToast(t('toastError')); return; }
  cropImageToSquare(file, 256).then(dataUrl => {
    appPushIcon({ type: 'image', label: name, src: dataUrl });
    closeAppAddModal();
  }).catch(() => showToast(t('toastError')));
}

function cropImageToSquare(file, size) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d');
        const sw = Math.min(img.width, img.height);
        const sx = (img.width - sw) / 2;
        const sy = (img.height - sw) / 2;
        ctx.drawImage(img, sx, sy, sw, sw, 0, 0, size, size);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function appPushIcon(partial) {
  const state = getAppState();
  const idx = state.icons.length;
  const ipos = nextIconPos(idx);
  const bpos = nextBoxPos(idx);
  state.icons.push({
    id: nextAppId(),
    type: partial.type,
    label: partial.label,
    src: partial.src || null,
    color: partial.color || null,
    x: ipos.x, y: ipos.y,
    boxText: '',
    boxX: bpos.x, boxY: bpos.y
  });
  saveAppState(state);
  renderCurrentPage();
}

function deleteAppIcon(id) {
  const state = getAppState();
  state.icons = state.icons.filter(ic => ic.id !== id);
  saveAppState(state);
  renderCurrentPage();
}

function updateAppBoxText(id, text) {
  const state = getAppState();
  const ic = state.icons.find(c => c.id === id);
  if (!ic) return;
  ic.boxText = text;
  saveAppState(state);
}

function saveAppReflection(text) {
  const state = getAppState();
  state.reflection = text;
  saveAppState(state);
}

/* ----- Drag (icon within phone screen, box within work area) ----- */

function startAppDrag(e, id, kind) {
  if (e.target.closest('.app-icon-del') || e.target.closest('textarea') || e.target.closest('button')) {
    if (kind === 'icon' && e.target.closest('.app-icon-del')) return;
    if (kind === 'box' && (e.target.closest('textarea') || e.target.closest('button'))) return;
  }
  e.preventDefault();
  appDragging = { id, kind };

  const refEl = kind === 'icon'
    ? document.getElementById('app-phone-screen')
    : document.getElementById('app-work-area');
  if (!refEl) { appDragging = null; return; }
  const refRect = refEl.getBoundingClientRect();

  const state = getAppState();
  const ic = state.icons.find(c => c.id === id);
  if (!ic) { appDragging = null; return; }

  const startItemX = kind === 'icon' ? ic.x : ic.boxX;
  const startItemY = kind === 'icon' ? ic.y : ic.boxY;
  const startCX = e.touches ? e.touches[0].clientX : e.clientX;
  const startCY = e.touches ? e.touches[0].clientY : e.clientY;
  const startPX = ((startCX - refRect.left) / refRect.width) * 100;
  const startPY = ((startCY - refRect.top) / refRect.height) * 100;
  const offX = startPX - startItemX;
  const offY = startPY - startItemY;
  let moved = false;
  const targetSel = kind === 'icon' ? `.app-icon[data-id="${id}"]` : `.app-box[data-id="${id}"]`;

  const onMove = (ev) => {
    if (!appDragging) return;
    ev.preventDefault();
    const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
    const cy = ev.touches ? ev.touches[0].clientY : ev.clientY;
    if (!moved && (Math.abs(cx - startCX) > 4 || Math.abs(cy - startCY) > 4)) moved = true;
    if (!moved) return;
    const node = document.querySelector(targetSel);
    if (node) {
      const px = ((cx - refRect.left) / refRect.width) * 100;
      const py = ((cy - refRect.top) / refRect.height) * 100;
      const nx = Math.max(2, Math.min(kind === 'icon' ? 88 : 88, px - offX));
      const ny = Math.max(2, Math.min(kind === 'icon' ? 84 : 88, py - offY));
      node.style.left = nx.toFixed(1) + '%';
      node.style.top = ny.toFixed(1) + '%';
      scheduleAppLines();
    }
  };

  const onUp = () => {
    if (appDragging && moved) {
      const node = document.querySelector(targetSel);
      if (node) {
        const s = getAppState();
        const target = s.icons.find(c => c.id === id);
        if (target) {
          if (kind === 'icon') {
            target.x = parseFloat(node.style.left);
            target.y = parseFloat(node.style.top);
          } else {
            target.boxX = parseFloat(node.style.left);
            target.boxY = parseFloat(node.style.top);
          }
          saveAppState(s);
        }
      }
    }
    appDragging = null;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
    scheduleAppLines();
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onUp);
}
