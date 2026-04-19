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
    bagTitle: "가방",
    bagDesc: "내 가방 안에는 무엇이 있을까?",
    timeTitle: "시간",
    timeDesc: "나의 24시간을 계획해 보자",
    brainTitle: "브레인 (Brain)",
    brainDesc: "내 머릿속에는 무엇이 있을까?",
    mindTitle: "감정 (Emotion)",
    mindDesc: "내 감정의 크기를 시각화해 보자",
    colorTitle: "색깔",
    colorDesc: "나만의 색 팔레트를 만들어 보자",
    musicTitle: "음악",
    musicDesc: "나만의 플레이리스트를 만들어 보자",
    wordTitle: "단어",
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
    mindPageTitle: "감정 (Emotion)",
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
    youtubeUrl: "YouTube URL (선택)",

    // Word
    wordPageTitle: "나를 이루는 단어",
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
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">apps</span> 테마 선택</h3>
      <p>메인 화면의 8가지 테마 버튼 중 하나를 클릭하여 해당 탭으로 이동하세요.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">shopping_bag</span> 백 (Bag)</h3>
      <p>텍스트·이모지·이미지를 가방 안에 자유롭게 배치하세요. 요소를 탭하면 크기 조절과 삭제 핸들이 나타나고, 드래그로 위치를 이동할 수 있습니다.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">psychology</span> 브레인 (Brain)</h3>
      <p>[추가] 버튼으로 생각 풍선을 만들고, 탭하면 크기 조절·삭제 툴바가 나타납니다. 드래그로 위치를 자유롭게 이동하세요.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">favorite</span> 감정 (Emotion)</h3>
      <p>로버트 플루치크의 감정의 바퀴를 기반으로 한 8가지 감정 카테고리에서 단어를 선택하면 마음의 방에 칩이 추가됩니다. [+][−]로 감정 강도를 조절하고, [✕]로 삭제합니다. 드래그로 위치도 바꿀 수 있어요.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">palette</span> 컬러 (Color)</h3>
      <p>[+ 색상 추가]를 눌러 60가지 프리셋 색상 또는 직접 지정한 색을 팔레트에 추가하세요. 각 색상 카드를 클릭하면 색을 바꿀 수 있고, 색 이름란을 직접 클릭하여 나만의 이름을 붙일 수 있습니다.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">headphones</span> 뮤직 (Music)</h3>
      <p>상단 커버 이미지를 클릭하여 플레이리스트 대표 이미지를 추가하세요 (원본 비율로 표시됩니다). 각 곡마다 썸네일·곡명·아티스트·추천 이유·YouTube URL을 입력하고, ▲▼ 버튼으로 트랙 순서를 바꿀 수 있습니다.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">group</span> 관계 (Relationship)</h3>
      <p>이름을 입력하고 [추가]하면 관계 맵에 나타납니다. 드래그로 거리를 조절하고, [✕] 버튼으로 삭제하세요.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">palette</span> 테마 색상 변경</h3>
      <p>우측 상단의 컬러 도트를 클릭하여 앱 전체 색상(파랑·초록·분홍·노랑)을 변경할 수 있습니다.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">language</span> 언어 변경</h3>
      <p>우측 상단의 언어 선택 드롭다운으로 한국어/영어/일본어를 전환합니다.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">save</span> 데이터 백업 & 복원</h3>
      <p>우측 상단 저장 아이콘으로 JSON 백업 다운로드 및 업로드 복원이 가능합니다.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">ios_share</span> 내보내기</h3>
      <p>각 모듈 페이지 우측 하단 버튼으로 현재 화면을 JPG, PDF로 저장하거나 클립보드에 복사할 수 있습니다.</p>
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
    toastTimeHalfHour: "시간은 30분 단위(00, 30)로 입력해 주세요",
    toastTimeMustBeContinuous: "시간은 앞 일정 종료 시각부터 이어서 입력해 주세요",
    toastNeedTaskName: "할 일을 입력해 주세요",
    toastNeedWordFields: "단어와 정의를 모두 입력해 주세요",
    toastNeedSongName: "곡명을 입력해 주세요",
    toastAlreadyAdded: "이미 추가된 항목입니다",
    toastPaletteFull: "팔레트 슬롯이 가득 찼습니다. 슬롯 수를 늘리거나 기존 색상을 수정해 주세요",
    toastInvalidBackup: "유효하지 않은 백업 파일입니다",
    timeModeToggle: "12시간/24시간 모드 전환",
    timeChartHint: "원 클릭 → 시작 시간 | 재클릭 → 종료 시간 (30분 단위)",
    toastTimeSelectEnd: "시작 {time} → 종료 시간을 클릭하세요",
    toastTimeFillTask: "종료 {time} — 할 일을 입력하고 추가하세요",
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
    mindTitle: "Emotion",
    mindDesc: "Visualize the intensity of your emotions",
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

    mindPageTitle: "Emotion",
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
    youtubeUrl: "YouTube URL (optional)",

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
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">apps</span> Select Theme</h3>
      <p>Click one of the 8 theme buttons on the main screen to open that section.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">shopping_bag</span> Bag</h3>
      <p>Place text, emoji, or images inside the bag. Tap an item to show resize/delete handles; drag to move. Tap empty space to deselect.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">psychology</span> Brain</h3>
      <p>Use [Add] to create thought bubbles. Tap a bubble to show the resize/delete toolbar. Drag to move freely.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">favorite</span> Emotion</h3>
      <p>Choose words from 8 emotion categories based on Plutchik's Wheel of Emotions. Selected words appear as chips in your mind room. Use [+][−] to adjust intensity and [✕] to remove. Drag to reposition.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">palette</span> Color</h3>
      <p>Press [+ Add Color] to pick from 60 preset swatches or enter a custom color. Click any color card to change it, and click the name to rename it with your own label.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">headphones</span> Music</h3>
      <p>Click the cover image area at the top to upload a playlist thumbnail (shown at its natural proportions). Add each song with a thumbnail, title, artist, reason, and optional YouTube URL. Use ▲▼ to reorder tracks.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">group</span> Relationship</h3>
      <p>Add people by name to build your relationship map. Drag nodes to adjust distance; tap [✕] to remove.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">palette</span> Change Theme Color</h3>
      <p>Click the color dot in the top right to switch the app color (blue, green, pink, or yellow).</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">language</span> Switch Language</h3>
      <p>Use the language dropdown to switch between Korean, English, and Japanese.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">save</span> Backup & Restore</h3>
      <p>Use the save icon in the top right to download or restore a JSON backup.</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">ios_share</span> Export</h3>
      <p>Use the FAB button on each module page to export the current view as JPG, PDF, or copy it to the clipboard.</p>
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
    toastTimeHalfHour: "Use 30-minute increments only (00 or 30)",
    toastTimeMustBeContinuous: "Time blocks must be continuous from the previous end time",
    toastNeedTaskName: "Please enter a task name",
    toastNeedWordFields: "Please enter both word and definition",
    toastNeedSongName: "Please enter a song name",
    toastAlreadyAdded: "This item is already added",
    toastPaletteFull: "Palette is full. Increase slots or edit an existing color",
    toastInvalidBackup: "Invalid backup file",
    timeModeToggle: "Toggle 12/24-hour mode",
    timeChartHint: "Click ring → start time | click again → end time (30-min steps)",
    toastTimeSelectEnd: "Start {time} → click an end time",
    toastTimeFillTask: "End {time} — enter a task and add it",
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
    mindTitle: "感情 (Emotion)",
    mindDesc: "感情の強さを可視化しよう",
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

    mindPageTitle: "感情 (Emotion)",
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
    youtubeUrl: "YouTube URL (任意)",

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
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">apps</span> テーマ選択</h3>
      <p>メイン画面の8つのテーマボタンの一つをクリックして、各セクションに移動してください。</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">shopping_bag</span> バッグ (Bag)</h3>
      <p>テキスト・絵文字・画像をバッグに配置できます。タップするとサイズ調整・削除ハンドルが表示されます。ドラッグで移動し、空白をタップすると選択解除されます。</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">psychology</span> ブレイン (Brain)</h3>
      <p>[追加]ボタンで思考バブルを作成します。タップするとサイズ調整・削除ツールバーが表示されます。ドラッグで自由に移動できます。</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">favorite</span> 感情 (Emotion)</h3>
      <p>プルチックの感情の輪に基づく8つのカテゴリから感情の言葉を選んでチップを追加します。[+][−]で強度を調整し、[✕]で削除します。ドラッグで位置を移動できます。</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">palette</span> カラー (Color)</h3>
      <p>[+ 色を追加]を押して60色のプリセットまたは自由入力で色をパレットに追加します。色カードをクリックして色を変更し、名前欄をクリックして自分だけの名前をつけましょう。</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">headphones</span> ミュージック (Music)</h3>
      <p>上部のカバー画像エリアをクリックしてプレイリストのサムネイルを追加できます（元の縦横比で表示されます）。曲ごとにサムネイル・曲名・アーティスト・推薦理由・YouTube URLを入力し、▲▼でトラック順を変更できます。</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">group</span> 関係 (Relationship)</h3>
      <p>名前を入力して[追加]すると関係マップに表示されます。ドラッグで距離を調整し、[✕]で削除します。</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">palette</span> カラー変更</h3>
      <p>右上のカラードットをクリックしてアプリのテーマ（青・緑・ピンク・黄）を変更できます。</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">language</span> 言語切替</h3>
      <p>言語ドロップダウンで韓国語/英語/日本語を切り替えます。</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">save</span> バックアップ＆復元</h3>
      <p>右上の保存アイコンでJSONバックアップのダウンロードと復元ができます。</p>
      <h3><span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">ios_share</span> エクスポート</h3>
      <p>各モジュールページのFABボタンで現在の画面をJPG、PDFで保存したり、クリップボードにコピーしたりできます。</p>
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
    toastTimeHalfHour: "時刻は30分単位（00/30）で入力してください",
    toastTimeMustBeContinuous: "時間は前の終了時刻から連続して入力してください",
    toastNeedTaskName: "タスク名を入力してください",
    toastNeedWordFields: "言葉と定義の両方を入力してください",
    toastNeedSongName: "曲名を入力してください",
    toastAlreadyAdded: "すでに追加されています",
    toastPaletteFull: "パレットのスロットがいっぱいです。数を増やすか既存色を編集してください",
    toastInvalidBackup: "無効なバックアップファイルです",
    timeModeToggle: "12時間/24時間モード切替",
    timeChartHint: "円をクリック→開始時刻 | 再クリック→終了時刻（30分単位）",
    toastTimeSelectEnd: "開始 {time} → 終了時刻をクリックしてください",
    toastTimeFillTask: "終了 {time} — タスクを入力して追加してください",
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
