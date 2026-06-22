/* ===== Internationalization (i18n) System ===== */
const TRANSLATIONS = {
  ko: {
    appTitle: "What's In My",
    subtitle: "나를 탐색하는 10가지 방법",
    helpTitle: "사용법 안내",
    backupTitle: "백업 / 복원",
    backupDownload: "백업 다운로드 (JSON)",
    backupUpload: "백업 업로드 (JSON)",
    clipboard: "복사",
    reportTitle: "성찰 보고서",
    reportExportTitle: "보고서 내보내기",
    reportNameLabel: "이름",
    reportNamePh: "이름을 입력하세요",
    reportEmpty: "아직 작성된 성찰 글이 없어요. 각 활동에서 성찰 글쓰기를 채워보세요.",
    reportDownloadJpg: "JPG 다운로드",
    reportCopyJpg: "JPG 복사",
    reportCopyText: "텍스트 복사",
    reportDownloadTxt: "TXT 다운로드",
    reportNoName: "이름 없음",
    reportDate: "작성일",
    manuscriptMode: "원고지 모드",

    // Reflection labels per module
    bagReflect: "내 가방으로 보는 나",
    bagReflectPh: "가방 안의 물건들이 나의 어떤 모습을 보여주나요?",
    timeReflect: "내 시간 사용으로 보는 나",
    timeReflectPh: "하루 시간을 어떻게 쓰는 나는 어떤 사람인가요?",
    brainReflect: "내 머릿속으로 보는 나",
    brainReflectPh: "이 생각들에서 나의 어떤 모습이 보이나요?",
    mindReflect: "내 감정으로 보는 나",
    mindReflectPh: "지금 이 감정들이 나에게 무엇을 말해주나요?",
    colorReflect: "내 색깔로 보는 나",
    colorReflectPh: "내가 고른 색들은 나의 어떤 면을 닮았나요?",
    musicReflect: "내 음악으로 보는 나",
    musicReflectPh: "내가 좋아하는 음악들은 나의 어떤 모습을 보여주나요?",
    wordReflect: "내 단어로 보는 나",
    wordReflectPh: "이 단어들이 모여 만들어진 '나'는 어떤 사람인가요?",
    relReflect: "내 관계로 보는 나",
    relReflectPh: "내 곁의 사람들 속에서 나는 어떻게 살아가고 있나요?",
    relationshipReflect: "내 관계로 보는 나",
    relationshipReflectPh: "내 곁의 사람들 속에서 나는 어떻게 살아가고 있나요?",

    // Dashboard
    bagTitle: "가방",
    bagDesc: "내 가방 안",
    timeTitle: "시간",
    timeDesc: "나의 24시간",
    brainTitle: "브레인",
    brainDesc: "내 머릿속",
    mindTitle: "감정",
    mindDesc: "내 감정의 방",
    colorTitle: "색깔",
    colorDesc: "나만의 색 팔레트",
    musicTitle: "음악",
    musicDesc: "나만의 플레이리스트",
    wordTitle: "단어",
    wordDesc: "나를 이루는 단어들",
    relTitle: "관계",
    relDesc: "나를 이루는 관계",
    moneyTitle: "돈",
    moneyDesc: "나의 소비 계획",
    appTitleMod: "앱",
    appDesc: "나의 스마트폰 라이프",

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
    mindPageTitle: "감정의 방",
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
    wordDef: "나만의 뜻 풀이",
    addWord: "추가",
    saveEdit: "수정 저장",
    cancelEdit: "취소",

    // App file upload
    appFileSelect: "파일 선택",
    appNoFile: "선택된 파일 없음",

    // Relationship
    relPageTitle: "나의 인간관계",
    personName: "이름",
    addPerson: "추가",
    me: "나",

    // Money
    moneyPageTitle: "나의 소비 계획",
    moneyBudget: "예산",
    moneyRemaining: "잔액",
    moneyUsed: "지출",
    moneyItemLabel: "항목 이름",
    moneyItemAmount: "금액",
    moneyItemIcon: "아이콘",
    moneyAdd: "추가",
    moneyReflect: "나의 돈 사용 계획을 통해 본 나",
    moneyReflectPh: "이번 예산을 어떻게 나누면서 어떤 가치관이 보였나요?",
    moneyOverBudget: "예산을 초과했어요",
    moneyNeedAmount: "유효한 금액을 입력해 주세요",
    moneyNeedLabel: "항목 이름을 입력해 주세요",
    moneyCustomBudget: "직접 입력",
    moneyCustomApply: "적용",
    moneyEmptyHint: "항목을 추가해 나만의 소비 계획을 세워보세요",
    moneyLedgerTitle: "소비 내역",
    edit: "수정",
    delete: "삭제",

    // App (smartphone module)
    appPageTitle: "나의 스마트폰 라이프",
    appAddIcon: "앱 추가",
    appTabPreset: "Top 100",
    appTabImage: "이미지 업로드",
    appTabText: "텍스트 아이콘",
    appNamePh: "앱 이름",
    appAdd: "추가",
    appUploadHint: "이미지를 선택하면 정사각형 아이콘으로 가공됩니다",
    appBoxPh: "이 앱을 사용하는 나만의 방식이나 철학",
    appReflect: "나의 앱으로 본 나",
    appReflectPh: "내가 자주 쓰는 앱들은 나의 어떤 모습을 보여주나요?",
    appSearch: "검색",
    appCancel: "취소",
    appEditTitle: "앱 수정",

    // Help
    helpContent: `
      <h3>10가지 활동</h3>
      <p>홈에서 가방·시간·브레인·감정·색깔·음악·단어·관계·돈·앱 활동을 선택해 나를 탐색하세요.</p>
      <h3>활동별 사용 방법</h3>
      <ul>
        <li><b>가방</b>: 텍스트·이모지·이미지를 추가하고 드래그로 배치, 클릭으로 크기·색 조정</li>
        <li><b>시간</b>: 24h 원형 차트를 클릭해 시작/종료 시간을 잡고 할 일 입력</li>
        <li><b>브레인</b>: 생각 풍선을 추가해 머릿속을 시각화 (드래그·크기조절)</li>
        <li><b>감정</b>: 플루치크 8감정 중 단어를 선택해 칩 추가, [+/−]로 강도 조절</li>
        <li><b>색깔</b>: 60가지 프리셋 또는 사용자 색을 팔레트에 추가</li>
        <li><b>음악</b>: 곡명·아티스트·이유·URL을 입력해 나만의 플레이리스트</li>
        <li><b>단어</b>: 나를 이루는 단어와 나만의 뜻 풀이를 사전처럼 정리</li>
        <li><b>관계</b>: 사람을 추가하고 거리를 드래그로 표현</li>
        <li><b>돈</b>: 예산을 정하고 항목별 지출 계획을 가계부 형식으로 기록</li>
        <li><b>앱</b>: Top 100 앱 또는 사용자 아이콘을 폰 화면에 배치, 목록에서 미리 설명을 확인할 수 있어요!</li>
      </ul>
      <h3>성찰 글쓰기</h3>
      <p>각 활동 하단의 "~로 보는 나" 칸에 자기 성찰 글을 작성하세요. 자동 저장됩니다.</p>
      <h3>보고서</h3>
      <p>상단의 <span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">description</span> 아이콘을 누르면 작성한 성찰 글만 모아 한 페이지로 정리되며, JPG·텍스트로 내보내기/복사할 수 있습니다.</p>
      <h3>테마·언어·백업</h3>
      <p>우측 상단에서 색상 테마, 언어(한/영/일), JSON 백업·복원을 관리합니다.</p>
      <h3>내보내기</h3>
      <p>각 활동 화면 오른쪽 아래 버튼으로 현재 화면을 JPG·PDF·클립보드로 내보낼 수 있습니다.</p>
      <h3>초기화</h3>
      <p>현재 탭만 또는 전체 데이터를 한 번에 초기화할 수 있습니다.</p>
    `,

    // Empty state hints
    emptyMusicHint: "음악을 추가해서 나만의 플레이리스트를 만들어 보세요",
    emptyWordHint: "나를 이루는 단어와 나만의 뜻 풀이를 추가해 보세요",
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
    toastNeedWordFields: "단어와 뜻 풀이를 모두 입력해 주세요",
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
    subtitle: "10 ways to explore yourself",
    helpTitle: "How to Use",
    backupTitle: "Backup / Restore",
    backupDownload: "Download Backup (JSON)",
    backupUpload: "Upload Backup (JSON)",
    clipboard: "Copy",
    reportTitle: "Reflection Report",
    reportExportTitle: "Export Report",
    reportNameLabel: "Name",
    reportNamePh: "Enter your name",
    reportEmpty: "No reflections yet. Try writing one in any activity.",
    reportDownloadJpg: "Download JPG",
    reportCopyJpg: "Copy JPG",
    reportCopyText: "Copy Text",
    reportDownloadTxt: "Download TXT",
    reportNoName: "No name",
    reportDate: "Date",
    manuscriptMode: "Grid paper",

    bagReflect: "What my bag says about me",
    bagReflectPh: "What do the things in your bag reveal about you?",
    timeReflect: "What my time says about me",
    timeReflectPh: "What does the way you spend your day say about you?",
    brainReflect: "What my mind says about me",
    brainReflectPh: "What do these thoughts reveal about you?",
    mindReflect: "What my emotions say about me",
    mindReflectPh: "What are these emotions telling you?",
    colorReflect: "What my colors say about me",
    colorReflectPh: "How do your chosen colors reflect you?",
    musicReflect: "What my music says about me",
    musicReflectPh: "What do your favorite songs reveal about you?",
    wordReflect: "What my words say about me",
    wordReflectPh: "Who are you, made up of these words?",
    relReflect: "What my relationships say about me",
    relReflectPh: "Among the people around you, how do you live?",
    relationshipReflect: "What my relationships say about me",
    relationshipReflectPh: "Among the people around you, how do you live?",

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
    moneyTitle: "Money",
    moneyDesc: "Plan my spending",
    appTitleMod: "App",
    appDesc: "My smartphone life",

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
    wordDef: "My own meaning",
    addWord: "Add",
    saveEdit: "Save Edit",
    cancelEdit: "Cancel",

    // App file upload
    appFileSelect: "Choose file",
    appNoFile: "No file chosen",

    relPageTitle: "My Relationships",
    personName: "Name",
    addPerson: "Add",
    me: "Me",

    moneyPageTitle: "My Spending Plan",
    moneyBudget: "Budget",
    moneyRemaining: "Remaining",
    moneyUsed: "Spent",
    moneyItemLabel: "Item name",
    moneyItemAmount: "Amount",
    moneyItemIcon: "Icon",
    moneyAdd: "Add",
    moneyReflect: "What my spending plan tells about me",
    moneyReflectPh: "What values came up while dividing this budget?",
    moneyOverBudget: "You went over budget",
    moneyNeedAmount: "Please enter a valid amount",
    moneyNeedLabel: "Please enter an item name",
    moneyCustomBudget: "Custom amount",
    moneyCustomApply: "Apply",
    moneyEmptyHint: "Add items to build your spending plan",
    moneyLedgerTitle: "Transaction Log",
    edit: "Edit",
    delete: "Delete",

    appPageTitle: "My Smartphone Life",
    appAddIcon: "Add app",
    appTabPreset: "Top 100",
    appTabImage: "Upload image",
    appTabText: "Text icon",
    appNamePh: "App name",
    appAdd: "Add",
    appUploadHint: "Image is cropped to a square icon",
    appBoxPh: "Your unique way of using this app",
    appReflect: "What my apps say about me",
    appReflectPh: "What do your most-used apps reveal about you?",
    appSearch: "Search",
    appCancel: "Cancel",
    appEditTitle: "Edit App",

    helpContent: `
      <h3>10 activities</h3>
      <p>From the home screen pick Bag, Time, Brain, Emotion, Color, Music, Word, Relationship, Money, or App to explore yourself.</p>
      <h3>Activity guide</h3>
      <ul>
        <li><b>Bag</b>: Add text/emoji/image and drag to arrange; click to resize</li>
        <li><b>Time</b>: Click the 24h clock to set start/end and add a task</li>
        <li><b>Brain</b>: Add thought bubbles, drag and resize freely</li>
        <li><b>Emotion</b>: Pick from 8 Plutchik emotion groups; use [+/−] for intensity</li>
        <li><b>Color</b>: Add from 60 presets or pick a custom color</li>
        <li><b>Music</b>: Add songs with title/artist/reason/URL</li>
        <li><b>Word</b>: Define words that make up who you are</li>
        <li><b>Relationship</b>: Add people and drag to express closeness</li>
        <li><b>Money</b>: Set a budget and log items in a bankbook style</li>
        <li><b>App</b>: See app descriptions in the list before adding — place icons on a phone screen!</li>
      </ul>
      <h3>Reflection writing</h3>
      <p>Each activity has a "What ... says about me" box at the bottom. Your text is auto-saved.</p>
      <h3>Report</h3>
      <p>Click the <span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">description</span> icon in the header to gather all your reflections into one page; export as JPG or text.</p>
      <h3>Theme · Language · Backup</h3>
      <p>Use the icons on the top-right for theme color, language (KO/EN/JP), and JSON backup/restore.</p>
      <h3>Export</h3>
      <p>Use the export button on each activity page to save as JPG, PDF, or copy to clipboard.</p>
      <h3>Reset</h3>
      <p>You can reset just the current tab or all data at once.</p>
    `,

    // Empty state hints
    emptyMusicHint: "Add songs to build your playlist",
    emptyWordHint: "Add words and your own meanings that describe you",
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
    subtitle: "自分を探る10のテーマ",
    helpTitle: "使い方ガイド",
    backupTitle: "バックアップ / 復元",
    backupDownload: "バックアップをダウンロード (JSON)",
    backupUpload: "バックアップをアップロード (JSON)",
    clipboard: "コピー",
    reportTitle: "ふりかえりレポート",
    reportExportTitle: "レポートを出力",
    reportNameLabel: "名前",
    reportNamePh: "名前を入力",
    reportEmpty: "ふりかえりがまだありません。各活動で書いてみましょう。",
    reportDownloadJpg: "JPGダウンロード",
    reportCopyJpg: "JPGコピー",
    reportCopyText: "テキストコピー",
    reportDownloadTxt: "TXTダウンロード",
    reportNoName: "名前なし",
    reportDate: "作成日",
    manuscriptMode: "原稿用紙",

    bagReflect: "私のバッグから見えた私",
    bagReflectPh: "バッグの中身からあなたのどんな姿が見えますか？",
    timeReflect: "私の時間の使い方から見えた私",
    timeReflectPh: "1日の過ごし方からあなたはどんな人ですか？",
    brainReflect: "私の頭の中から見えた私",
    brainReflectPh: "これらの考えからあなたの何が見えますか？",
    mindReflect: "私の感情から見えた私",
    mindReflectPh: "今の感情はあなたに何を伝えていますか？",
    colorReflect: "私の色から見えた私",
    colorReflectPh: "選んだ色たちはあなたのどんな面を表していますか？",
    musicReflect: "私の音楽から見えた私",
    musicReflectPh: "好きな音楽からあなたのどんな姿が見えますか？",
    wordReflect: "私の言葉から見えた私",
    wordReflectPh: "これらの言葉でできた「私」はどんな人ですか？",
    relReflect: "私の人間関係から見えた私",
    relReflectPh: "周りの人々の中であなたはどう生きていますか？",
    relationshipReflect: "私の人間関係から見えた私",
    relationshipReflectPh: "周りの人々の中であなたはどう生きていますか？",

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
    moneyTitle: "お金 (Money)",
    moneyDesc: "私の消費プラン",
    appTitleMod: "アプリ (App)",
    appDesc: "私のスマホ生活",

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
    wordDef: "自分なりの意味",
    addWord: "追加",
    saveEdit: "編集を保存",
    cancelEdit: "キャンセル",

    // App file upload
    appFileSelect: "ファイルを選択",
    appNoFile: "ファイルが選択されていません",

    relPageTitle: "人間関係マップ",
    personName: "名前",
    addPerson: "追加",
    me: "私",

    moneyPageTitle: "私の消費プラン",
    moneyBudget: "予算",
    moneyRemaining: "残額",
    moneyUsed: "支出",
    moneyItemLabel: "項目名",
    moneyItemAmount: "金額",
    moneyItemIcon: "アイコン",
    moneyAdd: "追加",
    moneyReflect: "お金の使い方から見えた私",
    moneyReflectPh: "予算を分けながらどんな価値観が見えましたか？",
    moneyOverBudget: "予算を超えました",
    moneyNeedAmount: "有効な金額を入力してください",
    moneyNeedLabel: "項目名を入力してください",
    moneyCustomBudget: "直接入力",
    moneyCustomApply: "適用",
    moneyEmptyHint: "項目を追加して消費プランを作りましょう",
    moneyLedgerTitle: "取引明細",
    edit: "編集",
    delete: "削除",

    appPageTitle: "私のスマホ生活",
    appAddIcon: "アプリ追加",
    appTabPreset: "Top 100",
    appTabImage: "画像アップロード",
    appTabText: "テキストアイコン",
    appNamePh: "アプリ名",
    appAdd: "追加",
    appUploadHint: "画像を選ぶと正方形アイコンに加工されます",
    appBoxPh: "このアプリの自分なりの使い方や哲学",
    appReflect: "アプリから見えた私",
    appReflectPh: "よく使うアプリは私のどんな姿を映しますか？",
    appSearch: "検索",
    appCancel: "キャンセル",
    appEditTitle: "アプリ編集",

    helpContent: `
      <h3>10の活動</h3>
      <p>ホームでバッグ・タイム・ブレイン・感情・カラー・ミュージック・ワード・関係・お金・アプリを選んで自分を探りましょう。</p>
      <h3>活動ガイド</h3>
      <ul>
        <li><b>バッグ</b>: テキスト・絵文字・画像を追加してドラッグで配置</li>
        <li><b>タイム</b>: 24h円形チャートで開始/終了を選び、タスクを入力</li>
        <li><b>ブレイン</b>: 思考バブルを追加・ドラッグ・サイズ調整</li>
        <li><b>感情</b>: プルチックの8感情から言葉を選び、[+/−]で強度調整</li>
        <li><b>カラー</b>: 60プリセットまたは自由色をパレットに追加</li>
        <li><b>ミュージック</b>: 曲名・アーティスト・理由・URLでプレイリスト作成</li>
        <li><b>ワード</b>: 自分を作る言葉と自分なりの意味を辞書のように整理</li>
        <li><b>関係</b>: 人を追加し距離をドラッグで表現</li>
        <li><b>お金</b>: 予算を決めて項目別の支出計画を家計簿形式で記録</li>
        <li><b>アプリ</b>: リストで説明を確認してからTop 100アプリをスマホ画面に配置！</li>
      </ul>
      <h3>ふりかえり書き込み</h3>
      <p>各活動下部の「〜から見えた私」欄にふりかえりを書きます。自動保存されます。</p>
      <h3>レポート</h3>
      <p>ヘッダーの<span class="material-icons" style="vertical-align:-4px;font-size:1.1em;">description</span>アイコンを押すと、ふりかえりだけを集めた1ページに整理され、JPG・テキストでエクスポート/コピーできます。</p>
      <h3>テーマ・言語・バックアップ</h3>
      <p>右上のアイコンでテーマ色、言語、JSONバックアップ・復元ができます。</p>
      <h3>エクスポート</h3>
      <p>各活動画面右下のボタンで現在の画面をJPG・PDF・クリップボードにエクスポートできます。</p>
      <h3>リセット</h3>
      <p>現在のタブだけ、または全データを一度にリセットできます。</p>
    `,

    // Empty state hints
    emptyMusicHint: "曲を追加してプレイリストを作ろう",
    emptyWordHint: "自分を作る言葉と自分なりの意味を追加しよう",
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
    toastNeedWordFields: "言葉と意味の両方を入力してください",
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
