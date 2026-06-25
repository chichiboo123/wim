/* ===== MONEY MODULE ===== */
const MONEY_BUDGETS = [1000, 10000, 100000, 1000000, 10000000, 100000000];

const MONEY_CURRENCY = {
  ko: { symbol: '원', factor: 1,    suffix: true,  label: 'KRW' },
  en: { symbol: '$', factor: 0.001, suffix: false, label: 'USD' },
  ja: { symbol: '¥', factor: 0.1,   suffix: false, label: 'JPY' }
};

const MONEY_EMOJIS = [
  '💰','💵','💴','💶','💷','💸','🏦','💳','💎','🪙',
  '💹','📈','💱','🏧','💲','🛒','🛍️','🎁','💼','🏠',
  '🍕','🍔','☕','🍰','🍜','🍣','🥗','🥤','🍱','🍿',
  '🚗','✈️','🚇','🛵','🚂','🚕','🛺','🚁','⛵','🚴',
  '🎮','🎬','🎵','🎭','📚','🎨','🎲','📺','🎤','🎸',
  '💻','📱','⌨️','🖥️','🎧','📷','📡','🔋','💡','🔧',
  '💊','🏃','🧘','🏋️','🦷','🩺','🧬','🌿','🏥','🧴',
  '🏖️','⛺','🗺️','🧳','🏔️','🌏','🗼','🎡','🎢','🏕️',
  '👗','👠','👟','🧥','👔','🧢','🧣','💍','👒','🥾',
  '🐶','🐱','🐟','🌸','🌳','⚽','🎂','🧁','🍦','🌈'
];

let moneyEditingIndex = -1;
let moneySelectedEmoji = '💰';
let moneyEmojiOpen = false;

function getMoneyState() {
  const d = getModuleData('money');
  if (Array.isArray(d) || !d) return { budget: 10000, items: [], reflection: '' };
  return {
    budget: d.budget ?? 10000,
    items: Array.isArray(d.items) ? d.items : [],
    reflection: d.reflection || ''
  };
}

function saveMoneyState(state) { saveModuleData('money', state); }

function moneyCurrency() { return MONEY_CURRENCY[currentLang] || MONEY_CURRENCY.ko; }

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
  return state.items.reduce((s, it) => s + (Number(it.amount) || 0), 0);
}

/* ----- Render ----- */
function renderMoney() {
  const state = getMoneyState();
  const used = moneyTotalUsed(state);
  const remaining = state.budget - used;
  const pct = state.budget > 0 ? Math.min(100, (used / state.budget) * 100) : 0;
  const over = used > state.budget;
  const isEditing = moneyEditingIndex !== -1;
  const c = moneyCurrency();

  const budgetButtons = MONEY_BUDGETS.map(b => `
    <button class="money-budget-btn ${state.budget === b ? 'active' : ''}"
            onclick="setMoneyBudget(${b})">${formatMoney(b)}</button>
  `).join('');

  /* Bankbook rows with running balance */
  let runningBalance = state.budget;
  const rows = state.items.map((it, i) => {
    runningBalance -= Number(it.amount) || 0;
    const isRowEditing = moneyEditingIndex === i;
    return `
      <tr class="money-ledger-row ${isRowEditing ? 'editing' : ''}">
        <td class="money-ledger-icon">${escapeHtml(it.icon || '💰')}</td>
        <td class="money-ledger-label">${escapeHtml(it.label)}</td>
        <td class="money-ledger-amount">
          <span class="money-debit">${formatMoney(it.amount)}</span>
        </td>
        <td class="money-ledger-balance ${runningBalance < 0 ? 'negative' : ''}">${formatMoney(runningBalance)}</td>
        <td class="money-ledger-actions">
          <button class="icon-btn" onclick="editMoneyItem(${i})" title="${t('edit')}">
            <span class="material-icons" style="font-size:16px;">edit</span>
          </button>
          <button class="icon-btn" onclick="deleteMoneyItem(${i})" title="${t('delete')}">
            <span class="material-icons" style="font-size:16px;color:#f87171;">delete</span>
          </button>
        </td>
      </tr>`;
  }).join('');

  const emojiGrid = MONEY_EMOJIS.map(e => `
    <button class="money-emoji-cell ${moneySelectedEmoji === e ? 'selected' : ''}"
            onclick="selectMoneyEmoji('${e}')">${e}</button>
  `).join('');

  return `
    <div class="module-page">
      <h2 class="module-title">${t('moneyPageTitle')}</h2>

      <!-- Budget row -->
      <div class="money-budget-row">
        <span class="money-budget-label">${t('moneyBudget')}:</span>
        ${budgetButtons}
        <div class="money-custom-budget">
          <input type="number" class="form-input money-custom-input" id="money-custom-amt"
                 placeholder="${t('moneyCustomBudget')}" min="1">
          <button class="btn btn-secondary btn-sm" onclick="applyCustomBudget()">${t('moneyCustomApply')}</button>
        </div>
      </div>

      <!-- Summary -->
      <div class="money-summary ${over ? 'over' : ''}">
        <div class="money-summary-line">
          <div class="money-summary-chip">
            <span class="money-summary-chip-label">${t('moneyBudget')}</span>
            <span class="money-summary-chip-value">${formatMoney(state.budget)}</span>
          </div>
          <div class="money-summary-chip">
            <span class="money-summary-chip-label">${t('moneyUsed')}</span>
            <span class="money-summary-chip-value used">${formatMoney(used)}</span>
          </div>
          <div class="money-summary-chip">
            <span class="money-summary-chip-label">${t('moneyRemaining')}</span>
            <span class="money-summary-chip-value ${over ? 'over-text' : 'remain'}">${formatMoney(remaining)}</span>
          </div>
        </div>
        <div class="money-progress">
          <div class="money-progress-fill" style="width:${pct}%;"></div>
        </div>
        ${over ? `<div class="money-over-msg">⚠️ ${t('moneyOverBudget')}</div>` : ''}
      </div>

      <!-- Add / Edit form -->
      <div class="money-form-card">
        <div class="money-form">
          <!-- Emoji picker trigger -->
          <div class="money-emoji-wrap" id="money-emoji-wrap">
            <button class="money-emoji-trigger" onclick="toggleMoneyEmojiPicker(event)"
                    id="money-emoji-trigger" title="${t('moneyItemIcon')}">
              <span id="money-emoji-display">${moneySelectedEmoji}</span>
              <span class="material-icons" style="font-size:14px;opacity:0.6;">expand_more</span>
            </button>
            <div class="money-emoji-dropdown" id="money-emoji-dropdown" style="display:none;">
              <div class="money-emoji-grid">${emojiGrid}</div>
            </div>
          </div>
          <input type="text" class="form-input money-input-label" id="money-label"
                 placeholder="${t('moneyItemLabel')}" maxlength="20"
                 onkeydown="if(event.key==='Enter')document.getElementById('money-amount').focus()">
          <input type="number" class="form-input money-input-amount" id="money-amount"
                 placeholder="${t('moneyItemAmount')} (${c.label})" min="0"
                 onkeydown="if(event.key==='Enter')saveMoneyItem()">
          <button class="btn btn-primary btn-sm" onclick="saveMoneyItem()">
            ${isEditing ? t('saveEdit') : t('moneyAdd')}
          </button>
          ${isEditing ? `<button class="btn btn-secondary btn-sm" onclick="cancelMoneyEdit()">${t('cancelEdit')}</button>` : ''}
        </div>
      </div>

      <!-- Bankbook ledger -->
      <div class="work-area money-ledger-wrap">
        ${state.items.length === 0 ? `
          <div class="money-empty">
            <span class="material-icons">payments</span>
            <p>${t('moneyEmptyHint')}</p>
          </div>` : `
        <div class="money-ledger-header">
          <span class="money-ledger-title">📒 ${t('moneyLedgerTitle')}</span>
          <span class="money-ledger-date">${t('moneyBudget')}: ${formatMoney(state.budget)}</span>
        </div>
        <div class="money-ledger-scroll">
          <table class="money-ledger-table">
            <thead>
              <tr>
                <th></th>
                <th>${t('moneyItemLabel')}</th>
                <th>${t('moneyItemAmount')}</th>
                <th>${t('moneyRemaining')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div class="money-ledger-footer">
          <span>${t('moneyUsed')}: <b>${formatMoney(used)}</b></span>
          <span class="${over ? 'over-text' : ''}">${t('moneyRemaining')}: <b>${formatMoney(remaining)}</b></span>
        </div>`}
      </div>

      <div class="reflection-block">
        <div class="reflection-head">
          <label class="reflection-label">${t('moneyReflect')}</label>
          ${reflectionModeToggleHtml()}
        </div>
        <textarea class="form-input reflection-textarea${reflectionModeClass()}" id="money-reflect"
                  placeholder="${t('moneyReflectPh')}"
                  oninput="saveMoneyReflection(reflectionStoreValue(this, event && event.isComposing)); autoGrowTextarea(this)">${escapeHtml(manuscriptDisplay(state.reflection))}</textarea>
      </div>
    </div>
  `;
}

/* ----- Emoji picker ----- */
function toggleMoneyEmojiPicker(e) {
  e?.stopPropagation();
  const dd = document.getElementById('money-emoji-dropdown');
  if (!dd) return;
  moneyEmojiOpen = !moneyEmojiOpen;
  dd.style.display = moneyEmojiOpen ? 'block' : 'none';
}

function selectMoneyEmoji(emoji) {
  moneySelectedEmoji = emoji;
  const display = document.getElementById('money-emoji-display');
  if (display) display.textContent = emoji;
  // refresh selected cell
  document.querySelectorAll('.money-emoji-cell').forEach(b => {
    b.classList.toggle('selected', b.textContent === emoji);
  });
  // close
  moneyEmojiOpen = false;
  const dd = document.getElementById('money-emoji-dropdown');
  if (dd) dd.style.display = 'none';
}

/* ----- Budget ----- */
function setMoneyBudget(value) {
  const state = getMoneyState();
  state.budget = value;
  saveMoneyState(state);
  renderCurrentPage();
}

function applyCustomBudget() {
  const el = document.getElementById('money-custom-amt');
  const val = parseFloat(el?.value);
  if (!isFinite(val) || val <= 0) { showToast(t('moneyNeedAmount')); return; }
  // Custom input is in display currency → convert to KRW base
  const krw = Math.round(val / moneyCurrency().factor);
  setMoneyBudget(krw);
}

/* ----- Add / Edit / Delete ----- */
function saveMoneyItem() {
  const labelEl = document.getElementById('money-label');
  const amountEl = document.getElementById('money-amount');
  const label = labelEl?.value.trim();
  const amount = parseFloat(amountEl?.value);
  const c = moneyCurrency();

  if (!label) { showToast(t('moneyNeedLabel')); return; }
  if (!isFinite(amount) || amount <= 0) { showToast(t('moneyNeedAmount')); return; }

  const krw = Math.round(amount / c.factor);
  const state = getMoneyState();

  if (moneyEditingIndex !== -1) {
    state.items[moneyEditingIndex] = {
      ...state.items[moneyEditingIndex],
      label, amount: krw, icon: moneySelectedEmoji
    };
    moneyEditingIndex = -1;
  } else {
    state.items.push({ label, amount: krw, icon: moneySelectedEmoji });
  }
  saveMoneyState(state);
  moneySelectedEmoji = '💰';
  moneyEmojiOpen = false;
  labelEl.value = '';
  amountEl.value = '';
  renderCurrentPage();
}

function editMoneyItem(index) {
  const state = getMoneyState();
  const it = state.items[index];
  if (!it) return;
  moneyEditingIndex = index;
  moneySelectedEmoji = it.icon || '💰';
  renderCurrentPage();
  setTimeout(() => {
    const c = moneyCurrency();
    const labelEl = document.getElementById('money-label');
    const amountEl = document.getElementById('money-amount');
    if (labelEl) labelEl.value = it.label;
    if (amountEl) amountEl.value = +(it.amount * c.factor).toFixed(4);
    labelEl?.focus();
  }, 50);
}

function cancelMoneyEdit() {
  moneyEditingIndex = -1;
  moneySelectedEmoji = '💰';
  moneyEmojiOpen = false;
  renderCurrentPage();
}

function deleteMoneyItem(index) {
  const state = getMoneyState();
  state.items.splice(index, 1);
  saveMoneyState(state);
  if (moneyEditingIndex === index) { moneyEditingIndex = -1; moneySelectedEmoji = '💰'; }
  renderCurrentPage();
}

function saveMoneyReflection(text) {
  const state = getMoneyState();
  state.reflection = text;
  saveMoneyState(state);
}

/* Close emoji picker on outside click */
document.addEventListener('click', (e) => {
  if (!e.target.closest('#money-emoji-wrap') && moneyEmojiOpen) {
    moneyEmojiOpen = false;
    const dd = document.getElementById('money-emoji-dropdown');
    if (dd) dd.style.display = 'none';
  }
});
