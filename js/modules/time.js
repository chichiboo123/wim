/* ===== TIME MODULE ===== */
let timeMode24 = true;

function renderTime() {
  const data = getModuleData('time');
  const maxHour = timeMode24 ? 24 : 12;
  return `
    <div class="module-page">
      <h2 class="module-title">${t('timePageTitle')}</h2>
      <div class="toggle-container" style="justify-content:center;">
        <span style="font-size:0.9rem;font-weight:600;">${t('mode24h')}</span>
        <button class="toggle-switch ${!timeMode24 ? 'active' : ''}" role="switch" aria-checked="${!timeMode24}" onclick="toggleTimeMode()" aria-label="${t('timeModeToggle')}"></button>
        <span style="font-size:0.9rem;font-weight:600;">${t('mode12h')}</span>
      </div>
      <div class="work-area">
        <div class="time-container">
          <div class="time-chart-wrap">
            <div class="time-chart">
              <svg viewBox="0 0 300 300" id="time-svg">
                ${renderTimeSvg(data, maxHour)}
              </svg>
            </div>
          </div>
          <div class="time-list-wrap">
            <div class="time-form">
              <div class="form-row">
                <div class="time-input-group">
                  <label>${t('startTime')}</label>
                  <div class="time-boxes">
                    <input type="number" class="form-input time-box" id="time-start-h" min="0" max="${maxHour - 1}" placeholder="HH">
                    <span>:</span>
                    <input type="number" class="form-input time-box" id="time-start-m" min="0" max="59" placeholder="MM">
                  </div>
                </div>
                <div class="time-input-group">
                  <label>${t('endTime')}</label>
                  <div class="time-boxes">
                    <input type="number" class="form-input time-box" id="time-end-h" min="0" max="${maxHour}" placeholder="HH">
                    <span>:</span>
                    <input type="number" class="form-input time-box" id="time-end-m" min="0" max="59" placeholder="MM">
                  </div>
                </div>
              </div>
              <div class="form-row">
                <input type="text" class="form-input" id="time-task" placeholder="${t('taskName')}" maxlength="30" onkeydown="if(event.key==='Enter') addTimeTask()">
                <button class="btn btn-primary btn-sm" onclick="addTimeTask()">${t('addTask')}</button>
              </div>
            </div>
            <div class="list-container" id="time-list">
              ${data.map((item, i) => `
                <div class="list-item">
                  <div style="width:12px;height:12px;border-radius:50%;background:${item.color};flex-shrink:0;"></div>
                  <div class="list-item-content">
                    <strong>${formatTimeRange(item.start, item.end, maxHour)}</strong>
                    <div style="font-size:0.85rem;color:var(--text-secondary)">${escapeHtml(item.task)}</div>
                  </div>
                  <div class="list-item-actions">
                    <button class="icon-btn" onclick="deleteTimeTask(${i})"><span class="material-icons" style="color:#f87171;">delete</span></button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTimeSvg(data, maxHour) {
  const cx = 150, cy = 150, r = 120;
  let svg = '';

  // Background circle
  svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--primary-pale)" stroke="var(--border)" stroke-width="1"/>`;

  // Data wedges
  data.forEach(item => {
    const segments = splitTimeSegments(item.start, item.end, maxHour);
    segments.forEach(seg => {
      const startAngle = (seg.start / maxHour) * 360 - 90;
      const endAngle = (seg.end / maxHour) * 360 - 90;
      const path = describeArc(cx, cy, r, startAngle, endAngle);
      svg += `<path d="${path}" fill="${item.color}" opacity="0.7" stroke="white" stroke-width="1"/>`;

      const midAngle = (startAngle + endAngle) / 2;
      const labelR = r * 0.65;
      const lx = cx + labelR * Math.cos(midAngle * Math.PI / 180);
      const ly = cy + labelR * Math.sin(midAngle * Math.PI / 180);
      const span = Math.abs(endAngle - startAngle);
      if (span > 18) {
        svg += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle"
                  font-size="${span > 30 ? 10 : 8}" fill="var(--text)" font-weight="600">${escapeHtml(item.task)}</text>`;
      }
    });
  });

  // Hour marks
  for (let h = 0; h < maxHour; h++) {
    const angle = (h / maxHour) * 360 - 90;
    const rad = angle * Math.PI / 180;
    const x1 = cx + (r - 8) * Math.cos(rad);
    const y1 = cy + (r - 8) * Math.sin(rad);
    const x2 = cx + r * Math.cos(rad);
    const y2 = cy + r * Math.sin(rad);
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--text-secondary)" stroke-width="1" opacity="0.5"/>`;

    const tx = cx + (r + 14) * Math.cos(rad);
    const ty = cy + (r + 14) * Math.sin(rad);
    if (h % (maxHour === 24 ? 3 : 1) === 0) {
      svg += `<text x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="middle"
                font-size="9" fill="var(--text-secondary)">${h}</text>`;
    }
  }

  // Center dot
  svg += `<circle cx="${cx}" cy="${cy}" r="4" fill="var(--primary)"/>`;

  return svg;
}

function splitTimeSegments(start, end, maxHour) {
  const startNorm = ((start % maxHour) + maxHour) % maxHour;
  const endNorm = ((end % maxHour) + maxHour) % maxHour;
  if (end <= maxHour && end > start) return [{ start, end }];
  if (endNorm === startNorm) return [{ start: 0, end: maxHour }];
  if (endNorm > startNorm) return [{ start: startNorm, end: endNorm }];
  return [
    { start: startNorm, end: maxHour },
    { start: 0, end: endNorm }
  ];
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = angleDeg * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function formatTimeRange(start, end, maxHour) {
  const fmt = (v) => {
    const h = Math.floor(v % maxHour);
    const m = (v % 1) * 60;
    return `${String(h).padStart(2, '0')}:${String(Math.round(m)).padStart(2, '0')}`;
  };
  const overnight = end > maxHour ? ' (+1)' : '';
  return `${fmt(start)} ~ ${fmt(end)}${overnight}`;
}

const TIME_COLORS = [
  '#A8D8EA', '#F4B6C2', '#B5E8C3', '#FDE68A', '#DDA0DD', '#F0A8A8',
  '#A8E0D0', '#E8C8A8', '#C8A8E8', '#A8C8F0', '#F0D8A8', '#A8F0C8',
  '#D8A8F0', '#F0A8D8', '#A8F0E8', '#E8F0A8'
];

function addTimeTask() {
  const start = readTimeValue('time-start-h', 'time-start-m');
  const rawEnd = readTimeValue('time-end-h', 'time-end-m');
  const task = document.getElementById('time-task').value.trim();
  const maxHour = timeMode24 ? 24 : 12;
  let end = rawEnd;

  if (isNaN(start) || isNaN(rawEnd)) {
    showToast(t('toastTimeNeedNumber'));
    return;
  }
  if (!task) {
    showToast(t('toastNeedTaskName'));
    return;
  }
  if (start < 0 || start >= maxHour || rawEnd < 0 || rawEnd > maxHour) {
    showToast(t('toastTimeOutOfRange'));
    return;
  }
  if (rawEnd <= start) end = rawEnd + maxHour;

  const data = getModuleData('time');
  const expectedStart = data.length ? (data[data.length - 1].end % maxHour) : 0;
  if (Math.abs(start - expectedStart) > 0.001) {
    showToast(t('toastTimeMustBeContinuous'));
    return;
  }

  data.push({
    start, end, task,
    color: TIME_COLORS[data.length % TIME_COLORS.length]
  });
  saveModuleData('time', data);
  renderCurrentPage();
}

function readTimeValue(hourId, minId) {
  const h = parseInt(document.getElementById(hourId).value, 10);
  const m = parseInt(document.getElementById(minId).value, 10);
  if (isNaN(h) || isNaN(m)) return NaN;
  return h + (m / 60);
}

function deleteTimeTask(index) {
  const data = getModuleData('time');
  data.splice(index, 1);
  saveModuleData('time', data);
  renderCurrentPage();
}

function toggleTimeMode() {
  timeMode24 = !timeMode24;
  renderCurrentPage();
}
