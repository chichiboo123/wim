/* ===== MONEY MODULE ===== */
const MONEY_BUDGETS = [1000, 10000, 100000, 1000000, 10000000, 100000000];

// Display factor relative to KRW (per spec example: 1,000원 → $1 → 100¥)
const MONEY_CURRENCY = {
  ko: { symbol: '원', factor: 1,    suffix: true,  label: 'KRW' },
  en: { symbol: '$', factor: 0.001, suffix: false, label: 'USD' },
  ja: { symbol: '¥', factor: 0.1,   suffix: false, label: 'JPY' }
};

function getMoneyState() {
  const d = getModuleData('money');
  if (Array.isArray(d) || !d) {
    return { budget: 10000, items: [], reflection: '' };
  }
  return {
    budget: d.budget ?? 10000,
    items: Array.isArray(d.items) ? d.items : [],
    reflection: d.reflection || ''
  };
}

function saveMoneyState(state) {
  saveModuleData('money', state);
}

function moneyCurrency() {
  return MONEY_CURRENCY[currentLang] || MONEY_CURRENCY.ko;
}

function formatMoney(krwAmount) {
  const c = moneyCurrency();
  const v = krwAmount * c.factor;
  const isInt = Math.abs(v - Math.round(v)) < 1e-9;
  const text = isInt
    ? Math.round(v).toLocaleString()
    : v.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return c.suffix ? `${text}${c.symbol}` : `${c.symbol}${text}`;
}

function moneyTotalUsed(state) {
  return state.items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0);
}

function renderMoney() {
  const state = getMoneyState();
  const used = moneyTotalUsed(state);
  const remaining = state.budget - used;
  const pct = state.budget > 0 ? Math.min(100, (used / state.budget) * 100) : 0;
  const over = used > state.budget;

  const budgetButtons = MONEY_BUDGETS.map(b => `
    <button class="money-budget-btn ${state.budget === b ? 'active' : ''}"
            onclick="setMoneyBudget(${b})">
      ${formatMoney(b)}
    </button>
  `).join('');

  const items = state.items.map((it, i) => `
    <div class="money-item" data-index="${i}"
         style="left:${it.x}%;top:${it.y}%;"
         onmousedown="startMoneyDrag(event,${i})"
         ontouchstart="startMoneyDrag(event,${i})">
      <span class="money-item-icon">${escapeHtml(it.icon || '💰')}</span>
      <span class="money-item-label">${escapeHtml(it.label)}</span>
      <span class="money-item-amount">${formatMoney(it.amount)}</span>
      <button class="money-item-del"
              onclick="event.stopPropagation();deleteMoneyItem(${i})"
              ontouchend="event.stopPropagation();event.preventDefault();deleteMoneyItem(${i})">✕</button>
    </div>
  `).join('');

  return `
    <div class="module-page">
      <h2 class="module-title">${t('moneyPageTitle')}</h2>

      <div class="money-budget-row">
        <span class="money-budget-label">${t('moneyBudget')}:</span>
        ${budgetButtons}
      </div>

      <div class="money-summary ${over ? 'over' : ''}">
        <div class="money-summary-line">
          <span>${t('moneyUsed')}: <b>${formatMoney(used)}</b></span>
          <span>${t('moneyRemaining')}: <b>${formatMoney(remaining)}</b></span>
        </div>
        <div class="money-progress">
          <div class="money-progress-fill" style="width:${pct}%;"></div>
        </div>
        ${over ? `<div class="money-over-msg">${t('moneyOverBudget')}</div>` : ''}
      </div>

      <div class="money-form">
        <input type="text" class="form-input money-input-icon" id="money-icon"
               placeholder="${t('moneyItemIcon')}" maxlength="2" value="">
        <input type="text" class="form-input money-input-label" id="money-label"
               placeholder="${t('moneyItemLabel')}" maxlength="20"
               onkeydown="if(event.key==='Enter')document.getElementById('money-amount').focus()">
        <input type="number" class="form-input money-input-amount" id="money-amount"
               placeholder="${t('moneyItemAmount')} (${moneyCurrency().label})" min="0"
               onkeydown="if(event.key==='Enter')addMoneyItem()">
        <button class="btn btn-primary btn-sm" onclick="addMoneyItem()">${t('moneyAdd')}</button>
      </div>

      <div class="work-area money-canvas-wrap">
        <div class="money-canvas" id="money-canvas">
          ${items}
          ${state.items.length === 0 ? `
            <div class="money-empty">
              <span class="material-icons">payments</span>
              <p>${t('moneyItemLabel')} → ${t('moneyAdd')}</p>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="reflection-block">
        <label class="reflection-label">${t('moneyReflect')}</label>
        <textarea class="form-input reflection-textarea" id="money-reflect"
                  placeholder="${t('moneyReflectPh')}"
                  oninput="saveMoneyReflection(this.value)">${escapeHtml(state.reflection)}</textarea>
      </div>
    </div>
  `;
}

function setMoneyBudget(value) {
  const state = getMoneyState();
  state.budget = value;
  saveMoneyState(state);
  renderCurrentPage();
}

function addMoneyItem() {
  const labelEl = document.getElementById('money-label');
  const amountEl = document.getElementById('money-amount');
  const iconEl = document.getElementById('money-icon');
  const label = labelEl.value.trim();
  const amount = parseFloat(amountEl.value);
  const c = moneyCurrency();

  if (!label) { showToast(t('moneyNeedLabel')); return; }
  if (!isFinite(amount) || amount <= 0) { showToast(t('moneyNeedAmount')); return; }

  // input is in display currency; store in KRW
  const krw = Math.round(amount / c.factor);

  const state = getMoneyState();
  // Place near a free area: alternate spiral
  const i = state.items.length;
  const angle = (i * 0.6) + 0.3;
  const r = 18 + (i % 5) * 6;
  const x = Math.max(8, Math.min(85, 50 + r * Math.cos(angle)));
  const y = Math.max(8, Math.min(80, 50 + r * Math.sin(angle)));

  state.items.push({
    label,
    amount: krw,
    icon: iconEl.value.trim() || '💰',
    x, y
  });
  saveMoneyState(state);
  labelEl.value = '';
  amountEl.value = '';
  iconEl.value = '';
  renderCurrentPage();
}

function deleteMoneyItem(index) {
  const state = getMoneyState();
  state.items.splice(index, 1);
  saveMoneyState(state);
  renderCurrentPage();
}

function saveMoneyReflection(text) {
  const state = getMoneyState();
  state.reflection = text;
  saveMoneyState(state);
}

let moneyDragging = null;

function startMoneyDrag(e, index) {
  if (e.target.closest('.money-item-del')) return;
  e.preventDefault();
  moneyDragging = index;
  const canvas = document.getElementById('money-canvas');
  const rect = canvas.getBoundingClientRect();
  const state = getMoneyState();
  const startItemX = state.items[index]?.x ?? 50;
  const startItemY = state.items[index]?.y ?? 50;

  const startCX = e.touches ? e.touches[0].clientX : e.clientX;
  const startCY = e.touches ? e.touches[0].clientY : e.clientY;
  const startPX = ((startCX - rect.left) / rect.width) * 100;
  const startPY = ((startCY - rect.top) / rect.height) * 100;
  const offX = startPX - startItemX;
  const offY = startPY - startItemY;
  let moved = false;

  const onMove = (ev) => {
    if (moneyDragging === null) return;
    ev.preventDefault();
    const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
    const cy = ev.touches ? ev.touches[0].clientY : ev.clientY;
    if (!moved && (Math.abs(cx - startCX) > 4 || Math.abs(cy - startCY) > 4)) moved = true;
    if (!moved) return;
    const node = document.querySelector(`.money-item[data-index="${moneyDragging}"]`);
    if (node) {
      const px = ((cx - rect.left) / rect.width) * 100;
      const py = ((cy - rect.top) / rect.height) * 100;
      const nx = Math.max(2, Math.min(92, px - offX));
      const ny = Math.max(2, Math.min(92, py - offY));
      node.style.left = nx.toFixed(1) + '%';
      node.style.top = ny.toFixed(1) + '%';
    }
  };

  const onUp = () => {
    if (moneyDragging !== null && moved) {
      const node = document.querySelector(`.money-item[data-index="${moneyDragging}"]`);
      if (node) {
        const s = getMoneyState();
        s.items[moneyDragging].x = parseFloat(node.style.left);
        s.items[moneyDragging].y = parseFloat(node.style.top);
        saveMoneyState(s);
      }
    }
    moneyDragging = null;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onUp);
}
