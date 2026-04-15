/* ===== Internationalization (i18n) System ===== */
const TRANSLATIONS = {
  ko: {
    appTitle: "What's In My",
    subtitle: "나를 탐색하는 8가지 테마",
    helpTitle: "사용법 안내",
    backupTitle: "백업 / 복원",
    backupDownload: "백업 다운로드 (JSON)",
    backupUpload: "백업 업로드 (JSON)",
    clipboard: "복사",

    // Dashboard
    bagTitle: "백 (Bag)",
    bagDesc: "내 가방 안에는 무엇이 있을까?",
    timeTitle: "타임 (Time)",
    timeDesc: "나의 24시간을 계획해 보자",
    brainTitle: "브레인 (Brain)",
    brainDesc: "내 머릿속에는 무엇이 있을까?",
    mindTitle: "마인드 (Mind)",
    mindDesc: "내 마음의 방을 채워 보자",
    colorTitle: "컬러 (Color)",
    colorDesc: "나만의 색 팔레트를 만들어 보자",
    musicTitle: "뮤직 (Music)",
    musicDesc: "나만의 플레이리스트를 만들어 보자",
    wordTitle: "워드 (Word)",
    wordDesc: "나를 이루는 단어 사전을 만들어 보자",
    relTitle: "관계 (Relationship)",
    relDesc: "나와 주변 사람들의 관계를 그려 보자",

    // Bag
    bagPageTitle: "내 가방 안에는?",
    addText: "텍스트 추가",
    addEmoji: "이모지 추가",
    addImage: "이미지 추가",
    emojiPick: "이모지 고르기",
    textPlaceholder: "텍스트 입력...",
    emojiPlaceholder: "이모지 입력...",

    // Time
    timePageTitle: "나의 24시간",
    startTime: "시작 시간",
    endTime: "종료 시간",
    taskName: "할 일",
    addTask: "추가",
    mode24h: "24시간",
    mode12h: "12시간",

    // Brain
    brainPageTitle: "내 머릿속은?",
    clickToAdd: "빈 곳을 클릭하여 텍스트를 추가하세요",

    // Mind
    mindPageTitle: "마음의 방",
    selectEmotion: "감정 단어를 선택하세요",

    // Color
    colorPageTitle: "나만의 팔레트",
    addColor: "색상 추가",
    colorNamePlaceholder: "나만의 색 이름",
    refPalette: "디지털 팔레트 참고하기",

    // Music
    musicPageTitle: "나의 플레이리스트",
    songName: "곡명",
    artistName: "아티스트",
    reason: "추천 이유",
    addSong: "추가",
    thumbnail: "썸네일",

    // Word
    wordPageTitle: "나만의 사전",
    wordTerm: "나를 이루는 단어",
    wordDef: "나만의 정의",
    addWord: "추가",
    saveEdit: "수정 저장",
    cancelEdit: "취소",

    // Relationship
    relPageTitle: "나의 인간관계",
    personName: "이름",
    addPerson: "추가",
    me: "나",

    // Help
    helpContent: `
      <h3>🎒 테마 선택</h3>
      <p>메인 화면에서 8가지 테마 카드 중 하나를 선택하세요.</p>
      <h3>🎨 테마 색상 변경</h3>
      <p>우측 상단의 컬러 칩을 클릭하여 앱 전체 색상을 변경할 수 있습니다.</p>
      <h3>🌐 언어 변경</h3>
      <p>우측 상단의 번역 아이콘을 클릭하여 한국어/영어/일본어를 전환합니다.</p>
      <h3>💾 데이터 백업 & 복원</h3>
      <p>내보내기 버튼(FAB)의 JSON 저장으로 백업하고, 디스켓 아이콘으로 복원하세요.</p>
      <h3>📤 내보내기</h3>
      <p>각 체험 페이지 우측 하단의 버튼으로 JPG, PDF, 클립보드 복사, JSON 저장이 가능합니다.</p>
    `,

    // Empty state hints
    emptyMusicHint: "음악을 추가해서 나만의 플레이리스트를 만들어 보세요",
    emptyWordHint: "나를 이루는 단어와 나만의 정의를 추가해 보세요",
    emptyMindHint: "위에서 감정 단어를 선택하여 마음의 방을 채워 보세요",

    // Toast messages
    toastSaved: "저장되었습니다",
    toastCopied: "클립보드에 복사되었습니다",
    toastRestored: "데이터가 복원되었습니다",
    toastError: "오류가 발생했습니다",
    toastExported: "내보내기 완료",
    toastTimeNeedNumber: "시작/종료 시간을 숫자로 입력하세요",
    toastTimeRangeInvalid: "시작 시간은 종료 시간보다 빨라야 합니다",
    toastTimeOutOfRange: "시간 범위를 확인해 주세요",
    toastNeedTaskName: "할 일을 입력해 주세요",
    toastNeedWordFields: "단어와 정의를 모두 입력해 주세요",
    toastNeedSongName: "곡명을 입력해 주세요",
    toastAlreadyAdded: "이미 추가된 항목입니다",
    toastInvalidBackup: "유효하지 않은 백업 파일입니다",
    timeModeToggle: "12시간/24시간 모드 전환",
    confirmResetCurrent: "현재 탭의 데이터를 모두 삭제할까요?",
    confirmResetAll: "전체 데이터를 모두 삭제할까요?",
    toastResetDone: "현재 탭 데이터가 초기화되었습니다",
    toastResetAllDone: "전체 데이터가 초기화되었습니다",
  },

  en: {
    appTitle: "What's In My",
    subtitle: "8 themes to explore yourself",
    helpTitle: "How to Use",
    backupTitle: "Backup / Restore",
    backupDownload: "Download Backup (JSON)",
    backupUpload: "Upload Backup (JSON)",
    clipboard: "Copy",

    bagTitle: "Bag",
    bagDesc: "What's in my bag?",
    timeTitle: "Time",
    timeDesc: "Plan my 24 hours",
    brainTitle: "Brain",
    brainDesc: "What's on my mind?",
    mindTitle: "Mind",
    mindDesc: "Fill the room of my heart",
    colorTitle: "Color",
    colorDesc: "Create my own color palette",
    musicTitle: "Music",
    musicDesc: "Build my playlist",
    wordTitle: "Word",
    wordDesc: "Create a dictionary of my words",
    relTitle: "Relationship",
    relDesc: "Map my relationships",

    bagPageTitle: "What's In My Bag?",
    addText: "Add Text",
    addEmoji: "Add Emoji",
    addImage: "Add Image",
    emojiPick: "Pick Emoji",
    textPlaceholder: "Enter text...",
    emojiPlaceholder: "Enter emoji...",

    timePageTitle: "My 24 Hours",
    startTime: "Start",
    endTime: "End",
    taskName: "Task",
    addTask: "Add",
    mode24h: "24H",
    mode12h: "12H",

    brainPageTitle: "What's In My Brain?",
    clickToAdd: "Click empty space to add text",

    mindPageTitle: "Room of My Mind",
    selectEmotion: "Select emotion words",

    colorPageTitle: "My Palette",
    addColor: "Add Color",
    colorNamePlaceholder: "Color name",
    refPalette: "Reference Digital Palette",

    musicPageTitle: "My Playlist",
    songName: "Song",
    artistName: "Artist",
    reason: "Reason",
    addSong: "Add",
    thumbnail: "Thumbnail",

    wordPageTitle: "My Dictionary",
    wordTerm: "A word that defines me",
    wordDef: "My definition",
    addWord: "Add",
    saveEdit: "Save Edit",
    cancelEdit: "Cancel",

    relPageTitle: "My Relationships",
    personName: "Name",
    addPerson: "Add",
    me: "Me",

    helpContent: `
      <h3>🎒 Select Theme</h3>
      <p>Choose one of 8 theme cards on the main screen.</p>
      <h3>🎨 Change Colors</h3>
      <p>Click color chips in the top right to change the app theme.</p>
      <h3>🌐 Switch Language</h3>
      <p>Click the translate icon to switch between Korean/English/Japanese.</p>
      <h3>💾 Backup & Restore</h3>
      <p>Use the JSON export to backup, and the disk icon to restore.</p>
      <h3>📤 Export</h3>
      <p>Use the FAB button on each page to save as JPG, PDF, copy, or JSON.</p>
    `,

    // Empty state hints
    emptyMusicHint: "Add songs to build your playlist",
    emptyWordHint: "Add words and definitions that describe you",
    emptyMindHint: "Select emotion words above to fill your mind room",

    toastSaved: "Saved",
    toastCopied: "Copied to clipboard",
    toastRestored: "Data restored",
    toastError: "An error occurred",
    toastExported: "Export complete",
    toastTimeNeedNumber: "Enter start/end times as numbers",
    toastTimeRangeInvalid: "Start time must be earlier than end time",
    toastTimeOutOfRange: "Check the allowed time range",
    toastNeedTaskName: "Please enter a task name",
    toastNeedWordFields: "Please enter both word and definition",
    toastNeedSongName: "Please enter a song name",
    toastAlreadyAdded: "This item is already added",
    toastInvalidBackup: "Invalid backup file",
    timeModeToggle: "Toggle 12/24-hour mode",
    confirmResetCurrent: "Clear all data in this tab?",
    confirmResetAll: "Clear all app data?",
    toastResetDone: "This tab has been reset",
    toastResetAllDone: "All data has been reset",
  },

  ja: {
    appTitle: "What's In My",
    subtitle: "自分を探る8つのテーマ",
    helpTitle: "使い方ガイド",
    backupTitle: "バックアップ / 復元",
    backupDownload: "バックアップをダウンロード (JSON)",
    backupUpload: "バックアップをアップロード (JSON)",
    clipboard: "コピー",

    bagTitle: "バッグ (Bag)",
    bagDesc: "バッグの中には何がある？",
    timeTitle: "タイム (Time)",
    timeDesc: "24時間を計画しよう",
    brainTitle: "ブレイン (Brain)",
    brainDesc: "頭の中には何がある？",
    mindTitle: "マインド (Mind)",
    mindDesc: "心の部屋を埋めてみよう",
    colorTitle: "カラー (Color)",
    colorDesc: "自分だけのパレットを作ろう",
    musicTitle: "ミュージック (Music)",
    musicDesc: "プレイリストを作ろう",
    wordTitle: "ワード (Word)",
    wordDesc: "自分の言葉の辞書を作ろう",
    relTitle: "関係 (Relationship)",
    relDesc: "人間関係を描いてみよう",

    bagPageTitle: "バッグの中身は？",
    addText: "テキスト追加",
    addEmoji: "絵文字追加",
    addImage: "画像追加",
    emojiPick: "絵文字を選ぶ",
    textPlaceholder: "テキスト入力...",
    emojiPlaceholder: "絵文字入力...",

    timePageTitle: "私の24時間",
    startTime: "開始",
    endTime: "終了",
    taskName: "タスク",
    addTask: "追加",
    mode24h: "24時間",
    mode12h: "12時間",

    brainPageTitle: "頭の中は？",
    clickToAdd: "空白をクリックしてテキストを追加",

    mindPageTitle: "心の部屋",
    selectEmotion: "感情の言葉を選んでください",

    colorPageTitle: "マイパレット",
    addColor: "色を追加",
    colorNamePlaceholder: "色の名前",
    refPalette: "デジタルパレット参考",

    musicPageTitle: "マイプレイリスト",
    songName: "曲名",
    artistName: "アーティスト",
    reason: "推薦理由",
    addSong: "追加",
    thumbnail: "サムネイル",

    wordPageTitle: "マイ辞書",
    wordTerm: "自分を作る言葉",
    wordDef: "自分だけの定義",
    addWord: "追加",
    saveEdit: "編集を保存",
    cancelEdit: "キャンセル",

    relPageTitle: "人間関係マップ",
    personName: "名前",
    addPerson: "追加",
    me: "私",

    helpContent: `
      <h3>🎒 テーマ選択</h3>
      <p>メイン画面で8つのテーマカードの一つを選んでください。</p>
      <h3>🎨 カラー変更</h3>
      <p>右上のカラーチップをクリックしてテーマを変更できます。</p>
      <h3>🌐 言語切替</h3>
      <p>翻訳アイコンをクリックして韓国語/英語/日本語を切り替えます。</p>
      <h3>💾 バックアップ＆復元</h3>
      <p>JSON保存でバックアップし、ディスクアイコンで復元してください。</p>
      <h3>📤 エクスポート</h3>
      <p>各ページのFABボタンでJPG、PDF、コピー、JSON保存ができます。</p>
    `,

    // Empty state hints
    emptyMusicHint: "曲を追加してプレイリストを作ろう",
    emptyWordHint: "自分を作る言葉と定義を追加しよう",
    emptyMindHint: "上の感情の言葉を選んで心の部屋を埋めよう",

    toastSaved: "保存しました",
    toastCopied: "クリップボードにコピーしました",
    toastRestored: "データが復元されました",
    toastError: "エラーが発生しました",
    toastExported: "エクスポート完了",
    toastTimeNeedNumber: "開始/終了時刻を数字で入力してください",
    toastTimeRangeInvalid: "開始時刻は終了時刻より前である必要があります",
    toastTimeOutOfRange: "時刻の範囲を確認してください",
    toastNeedTaskName: "タスク名を入力してください",
    toastNeedWordFields: "言葉と定義の両方を入力してください",
    toastNeedSongName: "曲名を入力してください",
    toastAlreadyAdded: "すでに追加されています",
    toastInvalidBackup: "無効なバックアップファイルです",
    timeModeToggle: "12時間/24時間モード切替",
    confirmResetCurrent: "このタブのデータをすべて削除しますか？",
    confirmResetAll: "アプリの全データを削除しますか？",
    toastResetDone: "このタブを初期化しました",
    toastResetAllDone: "全データを初期化しました",
  }
};

let currentLang = localStorage.getItem('wim-lang') || 'ko';

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS.ko[key] || key;
}

function cycleLang() {
  const langs = ['ko', 'en', 'ja'];
  const idx = langs.indexOf(currentLang);
  setLang(langs[(idx + 1) % langs.length]);
}

function setLang(lang) {
  currentLang = ['ko', 'en', 'ja'].includes(lang) ? lang : 'ko';
  localStorage.setItem('wim-lang', currentLang);
  document.documentElement.lang = currentLang === 'ja' ? 'ja' : currentLang === 'en' ? 'en' : 'ko';
  const select = document.getElementById('lang-select');
  if (select) select.value = currentLang;
  applyI18n();
  if (typeof renderCurrentPage === 'function') renderCurrentPage();
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && t(key)) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t(key);
      } else {
        el.textContent = t(key);
      }
    }
  });
}
