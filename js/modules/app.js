/* ===== APP (Smartphone) MODULE ===== */

/* Brand data: en name, ko name, brand hex color */
const APP_TOP100 = [
  { en:'YouTube',         ko:'유튜브',           brand:'#FF0000' },
  { en:'KakaoTalk',       ko:'카카오톡',          brand:'#FEE500' },
  { en:'Instagram',       ko:'인스타그램',        brand:'#E1306C' },
  { en:'TikTok',          ko:'틱톡',              brand:'#69C9D0' },
  { en:'WhatsApp',        ko:'왓츠앱',            brand:'#25D366' },
  { en:'Facebook',        ko:'페이스북',          brand:'#1877F2' },
  { en:'Messenger',       ko:'메신저',            brand:'#0084FF' },
  { en:'Snapchat',        ko:'스냅챗',            brand:'#FFFC00' },
  { en:'X (Twitter)',     ko:'X (트위터)',         brand:'#1DA1F2' },
  { en:'Threads',         ko:'스레드',            brand:'#8E8E8E' },
  { en:'Discord',         ko:'디스코드',          brand:'#5865F2' },
  { en:'Telegram',        ko:'텔레그램',          brand:'#2AABEE' },
  { en:'LINE',            ko:'라인',              brand:'#00B900' },
  { en:'WeChat',          ko:'위챗',              brand:'#07C160' },
  { en:'Reddit',          ko:'레딧',              brand:'#FF4500' },
  { en:'Pinterest',       ko:'핀터레스트',        brand:'#E60023' },
  { en:'LinkedIn',        ko:'링크드인',          brand:'#0A66C2' },
  { en:'Tumblr',          ko:'텀블러',            brand:'#35465C' },
  { en:'Spotify',         ko:'스포티파이',        brand:'#1DB954' },
  { en:'Apple Music',     ko:'애플 뮤직',         brand:'#FC3C44' },
  { en:'SoundCloud',      ko:'사운드클라우드',    brand:'#FF5500' },
  { en:'YouTube Music',   ko:'유튜브 뮤직',       brand:'#FF0000' },
  { en:'Melon',           ko:'멜론',              brand:'#00CD3C' },
  { en:'Genie Music',     ko:'지니뮤직',          brand:'#00C4FF' },
  { en:'Bugs',            ko:'벅스',              brand:'#FF4F00' },
  { en:'Netflix',         ko:'넷플릭스',          brand:'#E50914' },
  { en:'Disney+',         ko:'디즈니+',           brand:'#113CCF' },
  { en:'Tving',           ko:'티빙',              brand:'#FF153C' },
  { en:'Wavve',           ko:'웨이브',            brand:'#1A40C8' },
  { en:'Coupang Play',    ko:'쿠팡플레이',        brand:'#C0392B' },
  { en:'Watcha',          ko:'왓챠',              brand:'#E30C1C' },
  { en:'Prime Video',     ko:'프라임 비디오',     brand:'#00A8E0' },
  { en:'HBO Max',         ko:'Max',               brand:'#5822B5' },
  { en:'Hulu',            ko:'훌루',              brand:'#1CE783' },
  { en:'Twitch',          ko:'트위치',            brand:'#9146FF' },
  { en:'Naver',           ko:'네이버',            brand:'#03C75A' },
  { en:'Daum',            ko:'다음',              brand:'#006EB4' },
  { en:'Google',          ko:'구글',              brand:'#4285F4' },
  { en:'Chrome',          ko:'크롬',              brand:'#4285F4' },
  { en:'Safari',          ko:'사파리',            brand:'#006CFF' },
  { en:'Edge',            ko:'엣지',              brand:'#0078D4' },
  { en:'Firefox',         ko:'파이어폭스',        brand:'#FF7139' },
  { en:'Gmail',           ko:'지메일',            brand:'#EA4335' },
  { en:'Outlook',         ko:'아웃룩',            brand:'#0078D4' },
  { en:'Naver Mail',      ko:'네이버 메일',       brand:'#03C75A' },
  { en:'Google Maps',     ko:'구글 지도',         brand:'#4285F4' },
  { en:'Naver Map',       ko:'네이버 지도',       brand:'#03C75A' },
  { en:'Kakao Map',       ko:'카카오맵',          brand:'#FEE500' },
  { en:'Apple Maps',      ko:'애플 지도',         brand:'#007AFF' },
  { en:'Waze',            ko:'웨이즈',            brand:'#33CCFF' },
  { en:'Uber',            ko:'우버',              brand:'#000000' },
  { en:'Kakao T',         ko:'카카오T',           brand:'#FEE500' },
  { en:'Tada',            ko:'타다',              brand:'#0D1B2A' },
  { en:'Lyft',            ko:'리프트',            brand:'#FF00BF' },
  { en:'Grab',            ko:'그랩',              brand:'#00B14F' },
  { en:'Coupang',         ko:'쿠팡',              brand:'#C0392B' },
  { en:'Gmarket',         ko:'G마켓',             brand:'#FF6000' },
  { en:'11st',            ko:'11번가',            brand:'#FF0000' },
  { en:'Auction',         ko:'옥션',              brand:'#E10A14' },
  { en:'SSG',             ko:'SSG닷컴',           brand:'#CC0000' },
  { en:'AliExpress',      ko:'알리익스프레스',    brand:'#FF6A00' },
  { en:'Amazon',          ko:'아마존',            brand:'#FF9900' },
  { en:'Shopee',          ko:'쇼피',              brand:'#EE4D2D' },
  { en:'eBay',            ko:'이베이',            brand:'#E53238' },
  { en:'Temu',            ko:'테무',              brand:'#FF5A1F' },
  { en:'Daiso',           ko:'다이소',            brand:'#E40012' },
  { en:'Musinsa',         ko:'무신사',            brand:'#3D3D3D' },
  { en:'Zigzag',          ko:'지그재그',          brand:'#FF6AC1' },
  { en:'Toss',            ko:'토스',              brand:'#0064FF' },
  { en:'Kakao Pay',       ko:'카카오페이',        brand:'#FEE500' },
  { en:'Naver Pay',       ko:'네이버페이',        brand:'#03C75A' },
  { en:'Samsung Pay',     ko:'삼성페이',          brand:'#1428A0' },
  { en:'Apple Pay',       ko:'애플페이',          brand:'#555555' },
  { en:'PayPal',          ko:'페이팔',            brand:'#003087' },
  { en:'Venmo',           ko:'벤모',              brand:'#3D95CE' },
  { en:'Wise',            ko:'와이즈',            brand:'#9FE870' },
  { en:'Robinhood',       ko:'로빈후드',          brand:'#00C805' },
  { en:'Banksalad',       ko:'뱅크샐러드',        brand:'#B124FF' },
  { en:'Notion',          ko:'노션',              brand:'#505050' },
  { en:'Evernote',        ko:'에버노트',          brand:'#00A82D' },
  { en:'OneNote',         ko:'원노트',            brand:'#7719AA' },
  { en:'Google Keep',     ko:'구글 킵',           brand:'#FBBC04' },
  { en:'Slack',           ko:'슬랙',              brand:'#4A154B' },
  { en:'Teams',           ko:'MS 팀즈',           brand:'#6264A7' },
  { en:'Zoom',            ko:'줌',                brand:'#2D8CFF' },
  { en:'Google Meet',     ko:'구글 미트',         brand:'#00897B' },
  { en:'Webex',           ko:'웹엑스',            brand:'#00BCEB' },
  { en:'ChatGPT',         ko:'ChatGPT',           brand:'#10A37F' },
  { en:'Claude',          ko:'Claude',            brand:'#D4763B' },
  { en:'Gemini',          ko:'Gemini',            brand:'#4285F4' },
  { en:'Copilot',         ko:'Copilot',           brand:'#0078D4' },
  { en:'Perplexity',      ko:'퍼플렉시티',        brand:'#1FB8CD' },
  { en:'Canva',           ko:'캔바',              brand:'#8B3DFF' },
  { en:'Figma',           ko:'피그마',            brand:'#F24E1E' },
  { en:'Adobe Express',   ko:'어도비 익스프레스', brand:'#FF0000' },
  { en:'VSCO',            ko:'VSCO',              brand:'#3A3A3A' },
  { en:'Lightroom',       ko:'라이트룸',          brand:'#31A8FF' },
  { en:'GoodNotes',       ko:'굿노트',            brand:'#FFCA2F' },
  { en:'Procreate',       ko:'프로크리에이트',    brand:'#5C7AEA' },
  { en:'Duolingo',        ko:'듀오링고',          brand:'#58CC02' },
  { en:'Class101',        ko:'클래스101',         brand:'#7C3AED' },
];

let appResizeHandler = null;
let appDragging = null;
let appLineRaf = 0;
let appEditingId = null; // null = add mode, string = editing that id

/* ----- Helpers ----- */
function lightenBrand(hex, ratio = 0.52) {
  const r = parseInt(hex.slice(1,3), 16) || 0;
  const g = parseInt(hex.slice(3,5), 16) || 0;
  const b = parseInt(hex.slice(5,7), 16) || 0;
  const lr = Math.round(r + (255-r) * ratio);
  const lg = Math.round(g + (255-g) * ratio);
  const lb = Math.round(b + (255-b) * ratio);
  return `rgb(${lr},${lg},${lb})`;
}

function appLabelFor(entry) {
  /* Show Korean name in KO mode */
  return (currentLang === 'ko' && entry.ko) ? entry.ko : entry.en;
}

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
  const PASTELS = ['#A8D8EA','#B5E8C3','#F4B6C2','#FDE68A','#C5B4E3',
                   '#FFD3B6','#B8E0D2','#F7C8E0','#D6EDF8','#FFE5B4',
                   '#C8E6C9','#FFCDD2','#E1BEE7','#FFF9C4','#B3E5FC'];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PASTELS[h % PASTELS.length];
}

function appInitial(name) {
  const chars = Array.from((name || '').trim());
  if (!chars.length) return '?';
  return chars[0].toUpperCase();
}

function nextAppId() {
  return 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function nextIconPos(count) {
  const cols = 4, col = count % cols, row = Math.floor(count / cols);
  return { x: Math.min(82, 8 + col * 23), y: Math.min(80, 8 + row * 20) };
}

function nextBoxPos(count) {
  const side = count % 2 === 0 ? 'left' : 'right';
  const stack = Math.floor(count / 2);
  return { x: side === 'left' ? 4 : 73, y: Math.min(80, 6 + stack * 22) };
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
        <div class="app-icon-controls">
          <button class="app-icon-ctrl-btn app-icon-edit"
                  onclick="event.stopPropagation();openAppEditModal('${ic.id}')"
                  ontouchend="event.stopPropagation();event.preventDefault();openAppEditModal('${ic.id}')">✏️</button>
          <button class="app-icon-ctrl-btn app-icon-del"
                  onclick="event.stopPropagation();deleteAppIcon('${ic.id}')"
                  ontouchend="event.stopPropagation();event.preventDefault();deleteAppIcon('${ic.id}')">✕</button>
        </div>
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
        <div class="app-boxes-layer" id="app-boxes-layer">${boxesHtml}</div>
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

      <!-- ADD modal -->
      <div id="app-add-modal" class="modal-overlay" style="display:none;"
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
                   oninput="renderAppPresetList(this.value)" style="margin-bottom:8px;">
            <div class="app-preset-list" id="app-preset-list"></div>
          </div>
          <div class="app-tab-panel" data-panel="image" style="display:none;">
            <p class="app-modal-hint">${t('appUploadHint')}</p>
            <input type="text" class="form-input" id="app-image-name" placeholder="${t('appNamePh')}" maxlength="20" style="margin-bottom:8px;">
            <input type="file" id="app-image-file" accept="image/*" style="margin-bottom:8px;">
            <button class="btn btn-primary" onclick="addAppImageIcon()">${t('appAdd')}</button>
          </div>
          <div class="app-tab-panel" data-panel="text" style="display:none;">
            <input type="text" class="form-input" id="app-text-name" placeholder="${t('appNamePh')}" maxlength="20"
                   style="margin-bottom:8px;" onkeydown="if(event.key==='Enter')addAppTextIcon()">
            <button class="btn btn-primary" onclick="addAppTextIcon()">${t('appAdd')}</button>
          </div>
        </div>
      </div>

      <!-- EDIT modal -->
      <div id="app-edit-modal" class="modal-overlay" style="display:none;"
           onclick="if(event.target===event.currentTarget)closeAppEditModal()">
        <div class="modal-content app-modal-content">
          <div class="modal-header">
            <h2>${t('appEditTitle')}</h2>
            <button class="icon-btn" onclick="closeAppEditModal()"><span class="material-icons">close</span></button>
          </div>
          <div id="app-edit-body"></div>
        </div>
      </div>
    </div>
  `;
}

function renderAppIconInner(ic) {
  if (ic.type === 'image' && ic.src) {
    return `<div class="app-icon-img" style="background-image:url('${ic.src}')"></div>`;
  }
  const bg = ic.brand ? lightenBrand(ic.brand) : (ic.color || appColorFor(ic.label));
  const initial = appInitial(ic.label);
  return `<div class="app-icon-text" style="background:${bg}">${escapeHtml(initial)}</div>`;
}

/* ----- Init / lines ----- */
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
  let html = '';
  state.icons.forEach((ic) => {
    const iconEl = document.querySelector(`.app-icon[data-id="${ic.id}"]`);
    const boxEl  = document.querySelector(`.app-box[data-id="${ic.id}"]`);
    if (!iconEl || !boxEl) return;
    const ir = iconEl.getBoundingClientRect();
    const br = boxEl.getBoundingClientRect();
    const x1 = ir.left + ir.width / 2 - wRect.left;
    const y1 = ir.top  + ir.height / 2 - wRect.top;
    const bCx = br.left + br.width / 2 - wRect.left;
    const x2 = (x1 < bCx) ? br.left - wRect.left : br.right - wRect.left;
    const y2 = Math.max(br.top - wRect.top + 8, Math.min(br.bottom - wRect.top - 8, y1));
    const mx = (x1 + x2) / 2;
    const path = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
    html += `<path d="${path}" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" opacity="0.6"/>`;
    html += `<circle cx="${x1}" cy="${y1}" r="3" fill="var(--primary)"/>`;
  });
  svg.innerHTML = html;
}

/* ----- Add Modal ----- */
function openAppAddModal() {
  appEditingId = null;
  const modal = document.getElementById('app-add-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  appSwitchTab('preset');
  renderAppPresetList('');
  const search = document.getElementById('app-preset-search');
  if (search) search.value = '';
}

function closeAppAddModal() {
  const modal = document.getElementById('app-add-modal');
  if (modal) modal.style.display = 'none';
}

function appSwitchTab(tab) {
  document.querySelectorAll('.app-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.app-tab-panel').forEach(p => { p.style.display = p.dataset.panel === tab ? 'block' : 'none'; });
}

function renderAppPresetList(filter) {
  const list = document.getElementById('app-preset-list');
  if (!list) return;
  const q = (filter || '').trim().toLowerCase();
  const filtered = APP_TOP100.filter(entry => {
    const name = appLabelFor(entry).toLowerCase();
    const enName = entry.en.toLowerCase();
    return !q || name.includes(q) || enName.includes(q);
  });
  list.innerHTML = filtered.map(entry => {
    const label = appLabelFor(entry);
    const bg = lightenBrand(entry.brand);
    const initial = appInitial(label);
    const enc = encodeURIComponent(entry.en);
    return `
      <button class="app-preset-item" onclick="addAppPresetIcon('${enc}')">
        <span class="app-preset-icon" style="background:${bg}">${escapeHtml(initial)}</span>
        <span class="app-preset-name">${escapeHtml(label)}</span>
      </button>`;
  }).join('') || `<div class="app-preset-empty">—</div>`;
}

/* ----- Edit Modal ----- */
function openAppEditModal(id) {
  appEditingId = id;
  const state = getAppState();
  const ic = state.icons.find(c => c.id === id);
  if (!ic) return;
  const modal = document.getElementById('app-edit-modal');
  const body  = document.getElementById('app-edit-body');
  if (!modal || !body) return;

  const imageExtra = ic.type === 'image' ? `
    <div style="margin-bottom:10px;">
      <p class="app-modal-hint">${t('appUploadHint')}</p>
      <input type="file" id="app-edit-image-file" accept="image/*">
    </div>` : '';

  body.innerHTML = `
    <input type="text" class="form-input" id="app-edit-name" value="${escapeHtml(ic.label)}"
           maxlength="20" style="margin-bottom:10px;"
           onkeydown="if(event.key==='Enter')saveAppEdit()">
    ${imageExtra}
    <div style="display:flex;gap:8px;">
      <button class="btn btn-primary" onclick="saveAppEdit()">${t('saveEdit')}</button>
      <button class="btn btn-secondary" onclick="closeAppEditModal()">${t('cancelEdit')}</button>
    </div>`;

  modal.style.display = 'flex';
}

function closeAppEditModal() {
  appEditingId = null;
  const modal = document.getElementById('app-edit-modal');
  if (modal) modal.style.display = 'none';
}

async function saveAppEdit() {
  if (!appEditingId) return;
  const nameEl = document.getElementById('app-edit-name');
  const newName = (nameEl?.value || '').trim();
  if (!newName) { showToast(t('moneyNeedLabel')); return; }

  const state = getAppState();
  const ic = state.icons.find(c => c.id === appEditingId);
  if (!ic) { closeAppEditModal(); return; }

  ic.label = newName;

  const fileEl = document.getElementById('app-edit-image-file');
  if (fileEl?.files?.[0]) {
    try {
      ic.src = await cropImageToSquare(fileEl.files[0], 256);
      ic.type = 'image';
    } catch {
      showToast(t('toastError'));
      return;
    }
  }

  saveAppState(state);
  closeAppEditModal();
  renderCurrentPage();
}

/* ----- Add handlers ----- */
function addAppPresetIcon(encodedName) {
  const enName = decodeURIComponent(encodedName);
  const entry = APP_TOP100.find(e => e.en === enName) || { en: enName, ko: enName, brand: '#A8D8EA' };
  const label = appLabelFor(entry);
  appPushIcon({ type: 'preset', label, brand: entry.brand, enName: entry.en });
  closeAppAddModal();
}

function addAppTextIcon() {
  const el = document.getElementById('app-text-name');
  const name = (el?.value || '').trim();
  if (!name) { showToast(t('moneyNeedLabel')); return; }
  appPushIcon({ type: 'text', label: name });
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
        const sx = (img.width - sw) / 2, sy = (img.height - sw) / 2;
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
  const ipos = nextIconPos(idx), bpos = nextBoxPos(idx);
  state.icons.push({
    id: nextAppId(),
    type: partial.type,
    label: partial.label,
    src: partial.src || null,
    brand: partial.brand || null,
    color: partial.color || null,
    enName: partial.enName || null,
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

/* ----- Drag ----- */
function startAppDrag(e, id, kind) {
  if (kind === 'icon' && (e.target.closest('.app-icon-del') || e.target.closest('.app-icon-edit') || e.target.closest('.app-icon-controls'))) return;
  if (kind === 'box' && (e.target.closest('textarea') || e.target.closest('button'))) return;
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
  const startPY = ((startCY - refRect.top)  / refRect.height) * 100;
  const offX = startPX - startItemX, offY = startPY - startItemY;
  let moved = false;
  const sel = kind === 'icon' ? `.app-icon[data-id="${id}"]` : `.app-box[data-id="${id}"]`;

  const onMove = (ev) => {
    if (!appDragging) return;
    ev.preventDefault();
    const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
    const cy = ev.touches ? ev.touches[0].clientY : ev.clientY;
    if (!moved && (Math.abs(cx-startCX)>4 || Math.abs(cy-startCY)>4)) moved = true;
    if (!moved) return;
    const node = document.querySelector(sel);
    if (node) {
      const px = ((cx - refRect.left) / refRect.width) * 100;
      const py = ((cy - refRect.top)  / refRect.height) * 100;
      node.style.left = Math.max(2, Math.min(88, px - offX)).toFixed(1) + '%';
      node.style.top  = Math.max(2, Math.min(88, py - offY)).toFixed(1) + '%';
      scheduleAppLines();
    }
  };

  const onUp = () => {
    if (appDragging && moved) {
      const node = document.querySelector(sel);
      if (node) {
        const s = getAppState();
        const target = s.icons.find(c => c.id === id);
        if (target) {
          if (kind === 'icon') { target.x = parseFloat(node.style.left); target.y = parseFloat(node.style.top); }
          else { target.boxX = parseFloat(node.style.left); target.boxY = parseFloat(node.style.top); }
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
