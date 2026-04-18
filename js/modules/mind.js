/* ===== MIND MODULE ===== */
const EMOTIONS = {
  ko: [
    '기쁨', '행복', '설렘', '감사', '평화', '희망', '자신감', '사랑', '만족', '용기',
    '슬픔', '외로움', '그리움', '후회', '실망', '우울', '공허',
    '분노', '짜증', '답답함', '억울함', '질투',
    '불안', '걱정', '두려움', '긴장', '초조',
    '놀라움', '당황', '혼란', '궁금',
    '지루함', '무기력', '피곤', '귀찮음',
    '뿌듯함', '안도감', '신남', '즐거움', '여유'
  ],
  en: [
    'Joy', 'Happiness', 'Excitement', 'Gratitude', 'Peace', 'Hope', 'Confidence', 'Love', 'Satisfaction', 'Courage',
    'Sadness', 'Loneliness', 'Longing', 'Regret', 'Disappointment', 'Depression', 'Emptiness',
    'Anger', 'Irritation', 'Frustration', 'Resentment', 'Jealousy',
    'Anxiety', 'Worry', 'Fear', 'Tension', 'Nervousness',
    'Surprise', 'Embarrassment', 'Confusion', 'Curiosity',
    'Boredom', 'Lethargy', 'Fatigue', 'Laziness',
    'Pride', 'Relief', 'Thrill', 'Pleasure', 'Relaxation'
  ],
  ja: [
    '喜び', '幸せ', 'ときめき', '感謝', '平和', '希望', '自信', '愛', '満足', '勇気',
    '悲しみ', '孤独', '懐かしさ', '後悔', '失望', '憂鬱', '虚しさ',
    '怒り', 'イライラ', 'もどかしさ', '悔しさ', '嫉妬',
    '不安', '心配', '恐怖', '緊張', '焦り',
    '驚き', '戸惑い', '混乱', '好奇心',
    '退屈', '無気力', '疲労', '面倒',
    '誇り', '安堵', 'ワクワク', '楽しさ', 'ゆとり'
  ]
};

const EMOTION_COLORS = [
  '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE',
  '#85C1E9', '#F0B27A', '#82E0AA', '#F1948A', '#AED6F1',
  '#D7BDE2', '#A3E4D7', '#F9E79F', '#FADBD8', '#D5F5E3'
];

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
  const selectedEmotions = new Set(data.map(d => d.text));
  return `
    <div class="module-page">
      <h2 class="module-title">${t('mindPageTitle')}</h2>
      <p style="text-align:center;color:var(--text-secondary);font-size:0.85rem;margin-bottom:12px;">
        ${t('selectEmotion')}
      </p>
      <div class="emotion-picker">
        ${emotions.map((em, i) => `
          <button class="chip ${selectedEmotions.has(em) ? 'selected' : ''}" onclick="addMindEmotion('${em}', ${i})" aria-pressed="${selectedEmotions.has(em)}">${em}</button>
        `).join('')}
      </div>
      <div class="work-area">
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
  // Use actual DOM chip rects for accurate overlap detection
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
  let moved = false;
  // Compute bounds based on actual chip size so chips never overflow the room
  const chipEl = document.querySelector(`.mind-chip-inside[data-index="${index}"]`);
  const chipW = chipEl ? chipEl.offsetWidth : 80;
  const chipH = chipEl ? chipEl.offsetHeight : 40;
  const maxPx = Math.max(0, (1 - chipW / rect.width) * 100);
  const maxPy = Math.max(0, (1 - chipH / rect.height) * 100);
  // Track cursor offset from chip's top-left to prevent jump on drag start
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
        // Toggle active (show controls)
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
