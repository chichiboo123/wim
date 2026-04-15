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

function renderMind() {
  const data = getModuleData('mind');
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
          ${data.length === 0 ? `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--text-secondary);font-size:0.85rem;opacity:0.7;gap:8px;text-align:center;padding:16px;">
            <span class="material-icons" style="font-size:48px;">favorite_border</span>
            <span>${t('emptyMindHint')}</span>
          </div>` : ''}
          ${data.map((item, i) => `
            <div class="mind-chip-inside" style="background:${item.color};color:#333;transform:scale(${Math.min(1 + ((item.count || 1) - 1) * 0.12, 2)});">
              ${escapeHtml(item.text)}${item.count > 1 ? ` (${item.count})` : ''}
              <span class="delete-handle" onclick="deleteMindItem(${i})">&times;</span>
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
  data.push({
    text: emotion,
    color: EMOTION_COLORS[colorIndex % EMOTION_COLORS.length],
    count: 1
  });
  saveModuleData('mind', data);
  renderCurrentPage();
}

function deleteMindItem(index) {
  const data = getModuleData('mind');
  data.splice(index, 1);
  saveModuleData('mind', data);
  renderCurrentPage();
}
