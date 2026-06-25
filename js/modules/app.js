/* ===== APP (Smartphone) MODULE ===== */

/* Brand data: en name, ko name, brand hex color, ko/en short descriptions */
const APP_TOP100 = [
  { en:'YouTube',         ko:'유튜브',           brand:'#FF0000', descKo:'세계 최대 동영상 플랫폼', descEn:"World's biggest video platform" },
  { en:'KakaoTalk',       ko:'카카오톡',          brand:'#FEE500', descKo:'한국 대표 메신저 앱', descEn:'Top messenger in Korea' },
  { en:'Instagram',       ko:'인스타그램',        brand:'#E1306C', descKo:'사진·릴스 공유 SNS', descEn:'Photo & reels social network' },
  { en:'TikTok',          ko:'틱톡',              brand:'#69C9D0', descKo:'짧은 영상 공유 SNS', descEn:'Short-form video social app' },
  { en:'WhatsApp',        ko:'왓츠앱',            brand:'#25D366', descKo:'글로벌 메시징 앱', descEn:'Global messaging app' },
  { en:'Facebook',        ko:'페이스북',          brand:'#1877F2', descKo:'대표 SNS 플랫폼', descEn:'Classic social network' },
  { en:'Messenger',       ko:'메신저',            brand:'#0084FF', descKo:'페이스북의 채팅 앱', descEn:"Facebook's chat app" },
  { en:'Snapchat',        ko:'스냅챗',            brand:'#FFFC00', descKo:'사라지는 사진/영상 SNS', descEn:'Disappearing photo/video chat' },
  { en:'X (Twitter)',     ko:'X (트위터)',         brand:'#1DA1F2', descKo:'짧은 글 SNS (구 트위터)', descEn:'Microblogging (formerly Twitter)' },
  { en:'Threads',         ko:'스레드',            brand:'#8E8E8E', descKo:'인스타가 만든 텍스트 SNS', descEn:'Text-based SNS by Instagram' },
  { en:'Discord',         ko:'디스코드',          brand:'#5865F2', descKo:'커뮤니티·게임 채팅', descEn:'Community & gaming chat' },
  { en:'Telegram',        ko:'텔레그램',          brand:'#2AABEE', descKo:'보안 메시징 앱', descEn:'Secure messaging app' },
  { en:'LINE',            ko:'라인',              brand:'#00B900', descKo:'일본·아시아 메신저', descEn:'Messenger popular in Japan/Asia' },
  { en:'WeChat',          ko:'위챗',              brand:'#07C160', descKo:'중국 종합 메신저 앱', descEn:'All-in-one Chinese messenger' },
  { en:'Reddit',          ko:'레딧',              brand:'#FF4500', descKo:'주제별 커뮤니티 게시판', descEn:'Topic-based community forum' },
  { en:'Pinterest',       ko:'핀터레스트',        brand:'#E60023', descKo:'이미지 영감 보드', descEn:'Visual inspiration board' },
  { en:'LinkedIn',        ko:'링크드인',          brand:'#0A66C2', descKo:'직장인 네트워크 SNS', descEn:'Professional networking' },
  { en:'Tumblr',          ko:'텀블러',            brand:'#35465C', descKo:'블로그형 SNS', descEn:'Microblogging platform' },
  { en:'Spotify',         ko:'스포티파이',        brand:'#1DB954', descKo:'글로벌 음악 스트리밍', descEn:'Global music streaming' },
  { en:'Apple Music',     ko:'애플 뮤직',         brand:'#FC3C44', descKo:'애플의 음악 스트리밍', descEn:"Apple's music streaming" },
  { en:'SoundCloud',      ko:'사운드클라우드',    brand:'#FF5500', descKo:'아티스트 음원 공유', descEn:'Artist music sharing' },
  { en:'YouTube Music',   ko:'유튜브 뮤직',       brand:'#FF0000', descKo:'유튜브의 음악 스트리밍', descEn:"YouTube's music streaming" },
  { en:'Melon',           ko:'멜론',              brand:'#00CD3C', descKo:'국내 1위 음악 스트리밍', descEn:'Top Korean music streaming' },
  { en:'Genie Music',     ko:'지니뮤직',          brand:'#00C4FF', descKo:'KT의 음악 스트리밍', descEn:"KT's music streaming" },
  { en:'Bugs',            ko:'벅스',              brand:'#FF4F00', descKo:'고음질 음악 스트리밍', descEn:'High-quality music streaming' },
  { en:'Netflix',         ko:'넷플릭스',          brand:'#E50914', descKo:'글로벌 OTT 영화·드라마', descEn:'Global OTT movies & shows' },
  { en:'Disney+',         ko:'디즈니+',           brand:'#113CCF', descKo:'디즈니·마블·픽사 OTT', descEn:'Disney·Marvel·Pixar OTT' },
  { en:'Tving',           ko:'티빙',              brand:'#FF153C', descKo:'CJ ENM 국내 OTT', descEn:"CJ ENM's Korean OTT" },
  { en:'Wavve',           ko:'웨이브',            brand:'#1A40C8', descKo:'국내 방송사 OTT', descEn:'Korean broadcasters OTT' },
  { en:'Coupang Play',    ko:'쿠팡플레이',        brand:'#C0392B', descKo:'쿠팡의 OTT 서비스', descEn:"Coupang's OTT service" },
  { en:'Watcha',          ko:'왓챠',              brand:'#E30C1C', descKo:'영화 평점·OTT 서비스', descEn:'Movie rating & OTT' },
  { en:'Prime Video',     ko:'프라임 비디오',     brand:'#00A8E0', descKo:'아마존의 OTT 서비스', descEn:"Amazon's OTT service" },
  { en:'HBO Max',         ko:'Max',               brand:'#5822B5', descKo:'HBO·워너 콘텐츠 OTT', descEn:'HBO/Warner content OTT' },
  { en:'Hulu',            ko:'훌루',              brand:'#1CE783', descKo:'미국 OTT 서비스', descEn:'US OTT service' },
  { en:'Twitch',          ko:'트위치',            brand:'#9146FF', descKo:'게임·라이브 스트리밍', descEn:'Live game streaming' },
  { en:'Naver',           ko:'네이버',            brand:'#03C75A', descKo:'한국 1위 포털 검색', descEn:'Top Korean portal & search' },
  { en:'Daum',            ko:'다음',              brand:'#006EB4', descKo:'카카오의 포털 사이트', descEn:"Kakao's web portal" },
  { en:'Google',          ko:'구글',              brand:'#4285F4', descKo:'세계 1위 검색 엔진', descEn:'Top global search engine' },
  { en:'Chrome',          ko:'크롬',              brand:'#4285F4', descKo:'구글의 웹 브라우저', descEn:"Google's web browser" },
  { en:'Safari',          ko:'사파리',            brand:'#006CFF', descKo:'애플의 웹 브라우저', descEn:"Apple's web browser" },
  { en:'Edge',            ko:'엣지',              brand:'#0078D4', descKo:'MS의 웹 브라우저', descEn:"Microsoft's web browser" },
  { en:'Firefox',         ko:'파이어폭스',        brand:'#FF7139', descKo:'개방형 웹 브라우저', descEn:'Open-source web browser' },
  { en:'Gmail',           ko:'지메일',            brand:'#EA4335', descKo:'구글의 이메일 서비스', descEn:"Google's email service" },
  { en:'Outlook',         ko:'아웃룩',            brand:'#0078D4', descKo:'MS의 이메일 서비스', descEn:"Microsoft's email" },
  { en:'Naver Mail',      ko:'네이버 메일',       brand:'#03C75A', descKo:'네이버의 이메일', descEn:"Naver's email service" },
  { en:'Google Maps',     ko:'구글 지도',         brand:'#4285F4', descKo:'세계 표준 지도/길찾기', descEn:'Global maps & directions' },
  { en:'Naver Map',       ko:'네이버 지도',       brand:'#03C75A', descKo:'국내 1위 지도 앱', descEn:'Top map app in Korea' },
  { en:'Kakao Map',       ko:'카카오맵',          brand:'#FEE500', descKo:'카카오의 지도/길찾기', descEn:"Kakao's map & directions" },
  { en:'Apple Maps',      ko:'애플 지도',         brand:'#007AFF', descKo:'애플의 지도 앱', descEn:"Apple's map app" },
  { en:'Waze',            ko:'웨이즈',            brand:'#33CCFF', descKo:'운전자 실시간 내비', descEn:'Real-time driver navigation' },
  { en:'Uber',            ko:'우버',              brand:'#000000', descKo:'글로벌 차량 호출', descEn:'Global ride-hailing' },
  { en:'Kakao T',         ko:'카카오T',           brand:'#FEE500', descKo:'국내 택시 호출 앱', descEn:'Korean taxi-hailing app' },
  { en:'Tada',            ko:'타다',              brand:'#0D1B2A', descKo:'국내 모빌리티 앱', descEn:'Korean mobility app' },
  { en:'Lyft',            ko:'리프트',            brand:'#FF00BF', descKo:'미국 차량 호출', descEn:'US ride-hailing' },
  { en:'Grab',            ko:'그랩',              brand:'#00B14F', descKo:'동남아 슈퍼 앱', descEn:'Southeast Asia super app' },
  { en:'Coupang',         ko:'쿠팡',              brand:'#C0392B', descKo:'국내 1위 이커머스', descEn:'Top Korean e-commerce' },
  { en:'Gmarket',         ko:'G마켓',             brand:'#FF6000', descKo:'국내 오픈마켓 쇼핑', descEn:'Korean open-market shopping' },
  { en:'11st',            ko:'11번가',            brand:'#FF0000', descKo:'SK의 오픈마켓 쇼핑', descEn:"SK's open-market shopping" },
  { en:'Auction',         ko:'옥션',              brand:'#E10A14', descKo:'국내 경매·쇼핑', descEn:'Korean auction & shopping' },
  { en:'SSG',             ko:'SSG닷컴',           brand:'#CC0000', descKo:'신세계의 종합 쇼핑', descEn:"Shinsegae's online mall" },
  { en:'AliExpress',      ko:'알리익스프레스',    brand:'#FF6A00', descKo:'중국발 글로벌 직구', descEn:'Global shopping from China' },
  { en:'Amazon',          ko:'아마존',            brand:'#FF9900', descKo:'세계 최대 이커머스', descEn:"World's largest e-commerce" },
  { en:'Shopee',          ko:'쇼피',              brand:'#EE4D2D', descKo:'동남아 인기 쇼핑몰', descEn:'Popular Southeast Asia shop' },
  { en:'eBay',            ko:'이베이',            brand:'#E53238', descKo:'글로벌 경매·쇼핑', descEn:'Global auction & shopping' },
  { en:'Temu',            ko:'테무',              brand:'#FF5A1F', descKo:'초저가 글로벌 쇼핑', descEn:'Ultra-low-price shopping' },
  { en:'Daiso',           ko:'다이소',            brand:'#E40012', descKo:'생활용품 균일가 매장', descEn:'Daily goods value shop' },
  { en:'Musinsa',         ko:'무신사',            brand:'#3D3D3D', descKo:'국내 패션 쇼핑몰', descEn:'Korean fashion store' },
  { en:'Zigzag',          ko:'지그재그',          brand:'#FF6AC1', descKo:'여성 패션 쇼핑 앱', descEn:"Women's fashion shop app" },
  { en:'Toss',            ko:'토스',              brand:'#0064FF', descKo:'국내 간편 송금·금융', descEn:'Korean fintech & transfer' },
  { en:'Kakao Pay',       ko:'카카오페이',        brand:'#FEE500', descKo:'카카오의 간편 결제', descEn:"Kakao's easy payment" },
  { en:'Naver Pay',       ko:'네이버페이',        brand:'#03C75A', descKo:'네이버의 간편 결제', descEn:"Naver's easy payment" },
  { en:'Samsung Pay',     ko:'삼성페이',          brand:'#1428A0', descKo:'삼성의 모바일 결제', descEn:"Samsung's mobile pay" },
  { en:'Apple Pay',       ko:'애플페이',          brand:'#555555', descKo:'애플의 모바일 결제', descEn:"Apple's mobile pay" },
  { en:'PayPal',          ko:'페이팔',            brand:'#003087', descKo:'글로벌 송금·결제', descEn:'Global payments' },
  { en:'Venmo',           ko:'벤모',              brand:'#3D95CE', descKo:'미국 친구간 송금 앱', descEn:'US peer-to-peer pay' },
  { en:'Wise',            ko:'와이즈',            brand:'#9FE870', descKo:'저렴한 해외 송금', descEn:'Low-fee global transfer' },
  { en:'Robinhood',       ko:'로빈후드',          brand:'#00C805', descKo:'미국 무료 주식 거래', descEn:'US free stock trading' },
  { en:'Banksalad',       ko:'뱅크샐러드',        brand:'#B124FF', descKo:'자산·가계부 통합 관리', descEn:'Personal finance manager' },
  { en:'Notion',          ko:'노션',              brand:'#505050', descKo:'올인원 메모·문서·DB', descEn:'All-in-one notes & docs' },
  { en:'Evernote',        ko:'에버노트',          brand:'#00A82D', descKo:'클라우드 메모·노트', descEn:'Cloud notes app' },
  { en:'OneNote',         ko:'원노트',            brand:'#7719AA', descKo:'MS의 디지털 노트', descEn:"Microsoft's digital notebook" },
  { en:'Google Keep',     ko:'구글 킵',           brand:'#FBBC04', descKo:'구글의 간단 메모', descEn:"Google's quick notes" },
  { en:'Slack',           ko:'슬랙',              brand:'#4A154B', descKo:'팀 채팅·협업 도구', descEn:'Team chat & collab tool' },
  { en:'Teams',           ko:'MS 팀즈',           brand:'#6264A7', descKo:'MS의 협업 메신저', descEn:"Microsoft's team collab" },
  { en:'Zoom',            ko:'줌',                brand:'#2D8CFF', descKo:'화상회의 솔루션', descEn:'Video meeting platform' },
  { en:'Google Meet',     ko:'구글 미트',         brand:'#00897B', descKo:'구글의 화상회의', descEn:"Google's video meet" },
  { en:'Webex',           ko:'웹엑스',            brand:'#00BCEB', descKo:'시스코의 화상회의', descEn:"Cisco's video conferencing" },
  { en:'ChatGPT',         ko:'ChatGPT',           brand:'#10A37F', descKo:'OpenAI의 대화형 AI', descEn:"OpenAI's chat AI" },
  { en:'Claude',          ko:'Claude',            brand:'#D4763B', descKo:'Anthropic의 AI 챗봇', descEn:"Anthropic's AI chatbot" },
  { en:'Gemini',          ko:'Gemini',            brand:'#4285F4', descKo:'구글의 대화형 AI', descEn:"Google's chat AI" },
  { en:'Copilot',         ko:'Copilot',           brand:'#0078D4', descKo:'MS의 AI 보조 도구', descEn:"Microsoft's AI assistant" },
  { en:'Perplexity',      ko:'퍼플렉시티',        brand:'#1FB8CD', descKo:'검색 기반 AI 답변', descEn:'AI search & answers' },
  { en:'Canva',           ko:'캔바',              brand:'#8B3DFF', descKo:'쉬운 디자인 도구', descEn:'Easy design tool' },
  { en:'Figma',           ko:'피그마',            brand:'#F24E1E', descKo:'협업 UI 디자인 도구', descEn:'Collaborative UI design' },
  { en:'Adobe Express',   ko:'어도비 익스프레스', brand:'#FF0000', descKo:'어도비 빠른 디자인', descEn:"Adobe's quick design" },
  { en:'VSCO',            ko:'VSCO',              brand:'#3A3A3A', descKo:'감성 사진 편집 앱', descEn:'Aesthetic photo editing' },
  { en:'Lightroom',       ko:'라이트룸',          brand:'#31A8FF', descKo:'어도비 사진 보정', descEn:"Adobe's photo editor" },
  { en:'GoodNotes',       ko:'굿노트',            brand:'#FFCA2F', descKo:'아이패드 필기 노트 앱', descEn:'iPad handwriting notes' },
  { en:'Procreate',       ko:'프로크리에이트',    brand:'#5C7AEA', descKo:'아이패드 그림 앱', descEn:'iPad drawing app' },
  { en:'Duolingo',        ko:'듀오링고',          brand:'#58CC02', descKo:'게임처럼 배우는 외국어', descEn:'Gamified language learning' },
  { en:'Class101',        ko:'클래스101',         brand:'#7C3AED', descKo:'국내 온라인 클래스', descEn:'Korean online classes' },
];

function appDescFor(entry) {
  if (!entry) return '';
  return (currentLang === 'ko' && entry.descKo) ? entry.descKo : (entry.descEn || '');
}

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
    const presetEntry = ic.enName ? APP_TOP100.find(e => e.en === ic.enName) : null;
    const desc = presetEntry ? appDescFor(presetEntry) : '';
    const tipAttr = desc ? ` data-tip="${escapeHtml(desc)}"` : '';
    return `
      <div class="app-icon${desc ? ' has-tip' : ''}" data-id="${ic.id}"${tipAttr}
           style="left:${ic.x}%;top:${ic.y}%;"
           onmousedown="startAppDrag(event,'${ic.id}','icon')"
           ontouchstart="startAppDrag(event,'${ic.id}','icon')">
        ${inner}
        <div class="app-icon-label">${escapeHtml(ic.label)}</div>
        ${desc ? `<div class="app-icon-tip">${escapeHtml(desc)}</div>` : ''}
        <div class="app-icon-controls">
          ${desc ? `<button class="app-icon-ctrl-btn app-icon-info"
                  onclick="event.stopPropagation();showAppIconTip('${ic.id}')"
                  ontouchend="event.stopPropagation();event.preventDefault();showAppIconTip('${ic.id}')">i</button>` : ''}
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
                oninput="onAppBoxInput('${ic.id}', this)">${escapeHtml(ic.boxText || '')}</textarea>
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
        <div class="reflection-head">
          <label class="reflection-label">${t('appReflect')}</label>
          ${reflectionModeToggleHtml()}
        </div>
        <textarea class="form-input reflection-textarea${reflectionModeClass()}" id="app-reflect"
                  placeholder="${t('appReflectPh')}"
                  oninput="onAppReflectionInput(this, event)">${escapeHtml(manuscriptDisplay(state.reflection))}</textarea>
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
            <div class="app-file-row">
              <label class="btn btn-secondary btn-sm app-file-label" for="app-image-file">
                <span class="material-icons" style="font-size:16px;vertical-align:-3px;">folder_open</span>
                ${t('appFileSelect')}
              </label>
              <span class="app-file-name" id="app-file-name">${t('appNoFile')}</span>
              <input type="file" id="app-image-file" accept="image/*" style="display:none;"
                     onchange="updateAppFileName(this)">
            </div>
            <button class="btn btn-primary app-upload-add-btn" onclick="addAppImageIcon()">
              <span class="material-icons" style="font-size:16px;vertical-align:-3px;">add_circle_outline</span>
              ${t('appAdd')}
            </button>
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
  autoSizeAppArea();
  drawAppLines();
  if (appResizeHandler) window.removeEventListener('resize', appResizeHandler);
  appResizeHandler = () => { autoSizeAppArea(); scheduleAppLines(); };
  window.addEventListener('resize', appResizeHandler);
  // Re-run once layout/fonts settle so initial box heights are measured correctly
  setTimeout(() => { autoSizeAppArea(); drawAppLines(); }, 120);
}

function autoGrowAppText(el) {
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

function autoSizeAppArea() {
  const wrap = document.getElementById('app-work-area');
  if (!wrap) return;
  // Let every description box grow to fit its text (no inner scrollbar while typing)
  wrap.querySelectorAll('.app-box-text').forEach(autoGrowAppText);
  // Mobile uses a static stacked layout that flows naturally
  if (window.innerWidth <= 760) { wrap.style.minHeight = ''; return; }
  // Grow the work area so taller boxes are never clipped (keeps the JPG export complete)
  const wRect = wrap.getBoundingClientRect();
  let maxBottom = 0;
  wrap.querySelectorAll('.app-box, .app-phone').forEach((el) => {
    const r = el.getBoundingClientRect();
    maxBottom = Math.max(maxBottom, r.bottom - wRect.top);
  });
  wrap.style.minHeight = Math.ceil(maxBottom + 24) + 'px';
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
    const desc = (entry.descKo || '').toLowerCase();
    return !q || name.includes(q) || enName.includes(q) || desc.includes(q);
  });
  list.innerHTML = filtered.map(entry => {
    const label = appLabelFor(entry);
    const bg = lightenBrand(entry.brand);
    const initial = appInitial(label);
    const enc = encodeURIComponent(entry.en);
    const desc = appDescFor(entry);
    return `
      <button class="app-preset-item" onclick="addAppPresetIcon('${enc}')">
        <span class="app-preset-icon" style="background:${bg}">${escapeHtml(initial)}</span>
        <span class="app-preset-item-info">
          <span class="app-preset-name">${escapeHtml(label)}</span>
          ${desc ? `<span class="app-preset-desc">${escapeHtml(desc)}</span>` : ''}
        </span>
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
      <div class="app-file-row">
        <label class="btn btn-secondary btn-sm app-file-label" for="app-edit-image-file">
          <span class="material-icons" style="font-size:16px;vertical-align:-3px;">folder_open</span>
          ${t('appFileSelect')}
        </label>
        <span class="app-file-name" id="app-edit-file-name">${t('appNoFile')}</span>
        <input type="file" id="app-edit-image-file" accept="image/*" style="display:none;"
               onchange="document.getElementById('app-edit-file-name').textContent=this.files[0]?this.files[0].name:t('appNoFile')">
      </div>
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

function updateAppFileName(input) {
  const el = document.getElementById('app-file-name');
  if (el) el.textContent = input.files[0] ? input.files[0].name : t('appNoFile');
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

function onAppBoxInput(id, el) {
  updateAppBoxText(id, el.value);
  autoGrowAppText(el);
  autoSizeAppArea();
  scheduleAppLines();
}

function onAppReflectionInput(el, ev) {
  saveAppReflection(reflectionStoreValue(el, ev && ev.isComposing));
  autoGrowAppText(el);
}

function showAppIconTip(id) {
  const node = document.querySelector(`.app-icon[data-id="${id}"]`);
  if (!node) return;
  const tip = node.querySelector('.app-icon-tip');
  if (!tip) return;
  document.querySelectorAll('.app-icon-tip.show').forEach(el => { if (el !== tip) el.classList.remove('show'); });
  tip.classList.add('show');
  clearTimeout(node._tipTimer);
  node._tipTimer = setTimeout(() => tip.classList.remove('show'), 3000);
}

/* ----- Drag ----- */
function startAppDrag(e, id, kind) {
  if (kind === 'icon' && (e.target.closest('.app-icon-del') || e.target.closest('.app-icon-edit') || e.target.closest('.app-icon-controls'))) return;
  if (kind === 'box' && (e.target.closest('textarea') || e.target.closest('button'))) return;
  e.preventDefault();
  appDragging = { id, kind };

  const refEl = kind === 'icon'
    ? document.getElementById('app-phone-screen')
    : document.getElementById('app-boxes-layer');
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
    } else if (appDragging && !moved && kind === 'icon') {
      // Tap (no drag) on icon → show tooltip if available
      const node = document.querySelector(sel);
      if (node && node.classList.contains('has-tip')) {
        showAppIconTip(id);
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
