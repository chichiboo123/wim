/* ===== MIND MODULE ===== */

// Plutchik's Wheel of Emotions – 8 primary categories, child-friendly vocabulary
const EMOTION_CATEGORIES = {
  ko: [
    { label: '기쁨',      color: '#FFD700', range: [0,  6]  },
    { label: '신뢰·편안', color: '#72CC72', range: [6,  11] },
    { label: '두려움',    color: '#4AA84A', range: [11, 16] },
    { label: '놀라움',    color: '#87CEEB', range: [16, 20] },
    { label: '슬픔',      color: '#6488CC', range: [20, 25] },
    { label: '불쾌함',    color: '#9870CC', range: [25, 29] },
    { label: '화남',      color: '#FF6B5A', range: [29, 34] },
    { label: '기대·설렘', color: '#FFB347', range: [34, 38] },
  ],
  en: [
    { label: 'Joy',           color: '#FFD700', range: [0,  6]  },
    { label: 'Trust & Calm',  color: '#72CC72', range: [6,  11] },
    { label: 'Fear',          color: '#4AA84A', range: [11, 16] },
    { label: 'Surprise',      color: '#87CEEB', range: [16, 20] },
    { label: 'Sadness',       color: '#6488CC', range: [20, 25] },
    { label: 'Disgust',       color: '#9870CC', range: [25, 29] },
    { label: 'Anger',         color: '#FF6B5A', range: [29, 34] },
    { label: 'Anticipation',  color: '#FFB347', range: [34, 38] },
  ],
  ja: [
    { label: '喜び',       color: '#FFD700', range: [0,  6]  },
    { label: '信頼・安心', color: '#72CC72', range: [6,  11] },
    { label: '恐れ',       color: '#4AA84A', range: [11, 16] },
    { label: '驚き',       color: '#87CEEB', range: [16, 20] },
    { label: '悲しみ',     color: '#6488CC', range: [20, 25] },
    { label: '嫌悪',       color: '#9870CC', range: [25, 29] },
    { label: '怒り',       color: '#FF6B5A', range: [29, 34] },
    { label: '期待・設定', color: '#FFB347', range: [34, 38] },
  ],
};

// 38 child-friendly emotion words grouped by Plutchik category
const EMOTIONS = {
  ko: [
    // Joy [0-6)
    '기쁨', '행복', '신남', '즐거움', '뿌듯함', '감사',
    // Trust [6-11)
    '안심', '편안', '믿음', '친근함', '포근함',
    // Fear [11-16)
    '무서움', '불안', '긴장', '떨림', '조마조마',
    // Surprise [16-20)
    '깜짝놀람', '신기함', '어리둥절', '당황함',
    // Sadness [20-25)
    '슬픔', '외로움', '그리움', '속상함', '눈물',
    // Disgust [25-29)
    '싫음', '찝찝함', '불쾌함', '기분나쁨',
    // Anger [29-34)
    '화남', '억울함', '답답함', '짜증', '분함',
    // Anticipation [34-38)
    '기대', '두근두근', '궁금함', '기다림',
  ],
  en: [
    // Joy [0-6)
    'Joy', 'Happiness', 'Excitement', 'Fun', 'Proud', 'Thankful',
    // Trust [6-11)
    'Safe', 'Calm', 'Trust', 'Friendly', 'Cozy',
    // Fear [11-16)
    'Scared', 'Worried', 'Tense', 'Shaky', 'Nervous',
    // Surprise [16-20)
    'Shocked', 'Amazed', 'Puzzled', 'Flustered',
    // Sadness [20-25)
    'Sad', 'Lonely', 'Missing', 'Upset', 'Tearful',
    // Disgust [25-29)
    'Dislike', 'Uneasy', 'Disgusted', 'Uncomfortable',
    // Anger [29-34)
    'Angry', 'Wronged', 'Frustrated', 'Annoyed', 'Furious',
    // Anticipation [34-38)
    'Hopeful', 'Fluttery', 'Curious', 'Eager',
  ],
  ja: [
    // Joy [0-6)
    '嬉しい', '幸せ', 'ワクワク', '楽しい', '誇らしい', 'ありがたい',
    // Trust [6-11)
    '安心', '穏やか', '信頼', '親しみ', 'ぬくもり',
    // Fear [11-16)
    '怖い', '不安', '緊張', '震える', 'ドキドキ',
    // Surprise [16-20)
    'びっくり', '不思議', '戸惑い', '困惑',
    // Sadness [20-25)
    '悲しい', '寂しい', '恋しい', '辛い', '泣きたい',
    // Disgust [25-29)
    '嫌い', 'モヤモヤ', '不快', '嫌な気持ち',
    // Anger [29-34)
    '怒り', '悔しい', 'もどかしい', 'イライラ', '憤り',
    // Anticipation [34-38)
    '楽しみ', 'ドキドキ', '好奇心', '待ち遠しい',
  ],
};

// 38 colors aligned with the 8 Plutchik categories (same-hue groups)
const EMOTION_COLORS = [
  // Joy – yellows [0-6)
  '#FFD700', '#FFDF30', '#F9CC20', '#FFD840', '#F5D060', '#FFCD00',
  // Trust – greens [6-11)
  '#78D878', '#68C868', '#80DC80', '#70D070', '#88E088',
  // Fear – dark greens [11-16)
  '#4AA84A', '#3E9C3E', '#56AA56', '#44A044', '#4CAC4C',
  // Surprise – sky blues [16-20)
  '#87CEEB', '#76C4E6', '#90D8F4', '#6ABADE',
  // Sadness – blues [20-25)
  '#6890D8', '#5880C8', '#7098DC', '#5078C0', '#6888D0',
  // Disgust – purples [25-29)
  '#A070CC', '#9060BA', '#A878CC', '#9868C0',
  // Anger – reds [29-34)
  '#FF6B5A', '#F05040', '#FF7060', '#F04838', '#E84030',
  // Anticipation – oranges [34-38)
  '#FFB347', '#FFA030', '#F09020', '#FFB848',
];

const PLUTCHIK_NOTE = {
  ko: '로버트 플루치크의 감정의 바퀴(Plutchik\'s Wheel of Emotions)를 기반으로 어린이 눈높이에 맞게 구성했습니다',
  en: 'Emotion categories are based on Plutchik\'s Wheel of Emotions, adapted for children',
  ja: 'プルチックの感情の輪（Plutchik\'s Wheel of Emotions）を基に、子ども向けにアレンジしました',
};

function mindChipStyle(item) {
  const sz = Math.min(item.count || 1, 12);
  const fontSize = (0.88 + (sz - 1) * 0.2).toFixed(2);
  const padV = 7 + (sz - 1) * 5;
  const padH = 13 + (sz - 1) * 9;
  const weight = sz > 1 ? 700 : 500;
  return `background:${item.color};color:#333;font-size:${fontSize}rem;padding:${padV}px ${padH}px;font-weight:${weight};`;
}

/* Assign default grid positions to items that don't have coordinates */
function ensureMindPositions(data) {
  let changed = false;
  data.forEach((item, i) => {
    if (item.x === undefined || item.y === undefined) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      item.x = col * 30 + 5 + (Math.random() * 4 - 2);
      item.y = row * 22 + 5 + (Math.random() * 4 - 2);
      changed = true;
    }
  });
  if (changed) saveModuleData('mind', data);
}

function renderMind() {
  const data = getModuleData('mind');
  ensureMindPositions(data);
  const emotions = EMOTIONS[currentLang] || EMOTIONS.ko;
  const categories = EMOTION_CATEGORIES[currentLang] || EMOTION_CATEGORIES.ko;
  const selectedEmotions = new Set(data.map(d => d.text));

  const pickerHtml = categories.map(cat => {
    const [start, end] = cat.range;
    const chips = emotions.slice(start, end).map((em, j) => {
      const gi = start + j;
      const sel = selectedEmotions.has(em) ? ' selected' : '';
      return `<button class="chip${sel}" onclick="addMindEmotion('${em}',${gi})" aria-pressed="${sel ? 'true' : 'false'}">${em}</button>`;
    }).join('');
    return `
      <div class="emotion-category">
        <div class="emotion-cat-header">
          <span class="emotion-cat-dot" style="background:${cat.color};"></span>
          <span class="emotion-cat-label">${cat.label}</span>
        </div>
        <div class="emotion-chips-row">${chips}</div>
      </div>`;
  }).join('');

  const note = PLUTCHIK_NOTE[currentLang] || PLUTCHIK_NOTE.ko;
  const hintLang = { ko: '탭하여 강도 조절 · 드래그하여 이동', en: 'Tap to adjust · Drag to move', ja: 'タップで調整 · ドラッグで移動' };
  const hint = hintLang[currentLang] || hintLang.ko;

  return `
    <div class="module-page">
      <h2 class="module-title">${t('mindPageTitle')}</h2>
      <p style="text-align:center;color:var(--text-secondary);font-size:0.85rem;margin-bottom:12px;">
        ${t('selectEmotion')}
      </p>
      <div class="emotion-picker">
        ${pickerHtml}
      </div>
      <p class="plutchik-note">* ${note}</p>
      <div class="work-area" style="padding:0;overflow:hidden;">
        <div class="mind-room" id="mind-room">
          ${data.length === 0 ? `
            <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--text-secondary);font-size:0.85rem;opacity:0.7;gap:8px;text-align:center;padding:16px;">
              <span class="material-icons" style="font-size:48px;">favorite_border</span>
              <span>${t('emptyMindHint')}</span>
            </div>` : ''}
          ${data.map((item, i) => `
            <div class="mind-chip-inside${mindActiveIndex === i ? ' mind-active' : ''}" style="${mindChipStyle(item)}left:${item.x}%;top:${item.y}%;"
                 data-index="${i}"
                 onmousedown="startDragMind(event,${i})" ontouchstart="startDragMind(event,${i})">
              <span class="mind-chip-text">${escapeHtml(item.text)}${(item.count || 1) > 1 ? ` ×${item.count}` : ''}</span>
              <div class="mind-chip-controls">
                <button class="mind-ctrl" onclick="event.stopPropagation();decreaseMindItem(${i})" ontouchend="event.stopPropagation();event.preventDefault();decreaseMindItem(${i})">−</button>
                <button class="mind-ctrl mind-ctrl-del" onclick="event.stopPropagation();deleteMindItem(${i})" ontouchend="event.stopPropagation();event.preventDefault();deleteMindItem(${i})">✕</button>
                <button class="mind-ctrl" onclick="event.stopPropagation();increaseMindItem(${i})" ontouchend="event.stopPropagation();event.preventDefault();increaseMindItem(${i})">+</button>
              </div>
            </div>
          `).join('')}
          <div class="mind-room-hint">${hint}</div>
        </div>
      </div>
    </div>
  `;
}

function addMindEmotion(emotion, colorIndex) {
  const data = getModuleData('mind');
  const existing = data.find(item => item.text === emotion);
  if (existing) {
    existing.count = (existing.count || 1) + 1;
    saveModuleData('mind', data);
    renderCurrentPage();
    return;
  }
  const room = document.getElementById('mind-room');
  const rW = room ? room.offsetWidth : 420;
  const rH = room ? room.offsetHeight : 420;
  const newChipWPx = 100, newChipHPx = 50;
  const maxX = Math.max(0, (rW - newChipWPx) / rW * 100);
  const maxY = Math.max(0, (rH - newChipHPx) / rH * 100);
  let x = Math.random() * maxX;
  let y = Math.random() * maxY;
  const domRects = [];
  if (room) {
    const roomRect = room.getBoundingClientRect();
    room.querySelectorAll('.mind-chip-inside').forEach(el => {
      const r = el.getBoundingClientRect();
      domRects.push({
        x: (r.left - roomRect.left) / rW * 100,
        y: (r.top - roomRect.top) / rH * 100,
        w: r.width / rW * 100,
        h: r.height / rH * 100
      });
    });
  }
  const newW = newChipWPx / rW * 100, newH = newChipHPx / rH * 100;
  for (let attempt = 0; attempt < 60; attempt++) {
    const cx = Math.random() * maxX;
    const cy = Math.random() * maxY;
    const overlap = domRects.some(r =>
      !(cx + newW + 1 < r.x || cx > r.x + r.w + 1 || cy + newH + 1 < r.y || cy > r.y + r.h + 1)
    );
    if (!overlap) { x = cx; y = cy; break; }
  }
  data.push({ text: emotion, color: EMOTION_COLORS[colorIndex % EMOTION_COLORS.length], count: 1, x, y });
  saveModuleData('mind', data);
  renderCurrentPage();
}

function increaseMindItem(index) {
  const data = getModuleData('mind');
  if (!data[index]) return;
  data[index].count = (data[index].count || 1) + 1;
  saveModuleData('mind', data);
  renderCurrentPage();
}

function decreaseMindItem(index) {
  const data = getModuleData('mind');
  if (!data[index]) return;
  const current = data[index].count || 1;
  if (current <= 1) {
    deleteMindItem(index);
    return;
  }
  data[index].count = current - 1;
  saveModuleData('mind', data);
  renderCurrentPage();
}

function deleteMindItem(index) {
  if (mindOutsideClickHandler) {
    document.removeEventListener('click', mindOutsideClickHandler);
    document.removeEventListener('touchstart', mindOutsideClickHandler);
    mindOutsideClickHandler = null;
  }
  if (mindActiveIndex === index) mindActiveIndex = null;
  else if (mindActiveIndex !== null && mindActiveIndex > index) mindActiveIndex--;
  const data = getModuleData('mind');
  data.splice(index, 1);
  saveModuleData('mind', data);
  renderCurrentPage();
}

let mindDragging = null;
let mindActiveIndex = null;
let mindOutsideClickHandler = null;

function setMindActive(index) {
  if (mindOutsideClickHandler) {
    document.removeEventListener('click', mindOutsideClickHandler);
    document.removeEventListener('touchstart', mindOutsideClickHandler);
    mindOutsideClickHandler = null;
  }
  mindActiveIndex = index;
  document.querySelectorAll('.mind-chip-inside').forEach(c => c.classList.remove('mind-active'));
  if (index !== null) {
    const chip = document.querySelector(`.mind-chip-inside[data-index="${index}"]`);
    if (chip) chip.classList.add('mind-active');
    setTimeout(() => {
      mindOutsideClickHandler = function(e) {
        if (!e.target.closest('.mind-chip-inside')) {
          setMindActive(null);
        }
      };
      document.addEventListener('click', mindOutsideClickHandler);
      document.addEventListener('touchstart', mindOutsideClickHandler, { passive: true });
    }, 0);
  }
}

function startDragMind(e, index) {
  if (e.target.closest('.mind-ctrl')) return;
  const isTouchEvent = e.type === 'touchstart';
  if (isTouchEvent) e.preventDefault();

  mindDragging = index;
  const room = document.getElementById('mind-room');
  const rect = room.getBoundingClientRect();
  const startX = isTouchEvent ? e.touches[0].clientX : e.clientX;
  const startY = isTouchEvent ? e.touches[0].clientY : e.clientY;
  const data = getModuleData('mind');
  const startItemX = data[index]?.x ?? 0;
  const startItemY = data[index]?.y ?? 0;
  const startPointerX = ((startX - rect.left) / rect.width) * 100;
  const startPointerY = ((startY - rect.top) / rect.height) * 100;
  const dragOffsetX = startPointerX - startItemX;
  const dragOffsetY = startPointerY - startItemY;
  let moved = false;
  const chipEl = document.querySelector(`.mind-chip-inside[data-index="${index}"]`);
  const chipW = chipEl ? chipEl.offsetWidth : 80;
  const chipH = chipEl ? chipEl.offsetHeight : 40;
  const maxPx = Math.max(0, (1 - chipW / rect.width) * 100);
  const maxPy = Math.max(0, (1 - chipH / rect.height) * 100);
  const chipElRect = chipEl ? chipEl.getBoundingClientRect() : null;
  const offsetX = chipElRect ? (startX - chipElRect.left) / rect.width * 100 : 0;
  const offsetY = chipElRect ? (startY - chipElRect.top) / rect.height * 100 : 0;

  const onMove = (ev) => {
    if (mindDragging === null) return;
    const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
    const cy = ev.touches ? ev.touches[0].clientY : ev.clientY;
    if (!moved && (Math.abs(cx - startX) > 3 || Math.abs(cy - startY) > 3)) moved = true;
    if (!moved) return;
    ev.preventDefault();
    const chip = document.querySelector(`.mind-chip-inside[data-index="${mindDragging}"]`);
    if (chip) {
      const rawX = (cx - rect.left) / rect.width * 100 - offsetX;
      const rawY = (cy - rect.top) / rect.height * 100 - offsetY;
      chip.style.left = Math.max(0, Math.min(rawX, maxPx)) + '%';
      chip.style.top = Math.max(0, Math.min(rawY, maxPy)) + '%';
    }
  };

  const onUp = () => {
    if (mindDragging !== null) {
      if (moved) {
        const chip = document.querySelector(`.mind-chip-inside[data-index="${mindDragging}"]`);
        if (chip) {
          const d = getModuleData('mind');
          d[mindDragging].x = parseFloat(chip.style.left);
          d[mindDragging].y = parseFloat(chip.style.top);
          saveModuleData('mind', d);
        }
      } else {
        setMindActive(mindDragging === mindActiveIndex ? null : mindDragging);
      }
    }
    mindDragging = null;
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
