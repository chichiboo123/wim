# What's In My

`What's In My`는 아동/청소년이 자기 자신을 8가지 관점으로 탐색할 수 있도록 만든 **클라이언트 사이드 자기표현 웹앱**입니다.

- 백(Bag)
- 타임(Time)
- 브레인(Brain)
- 감정(Mind/Emotion)
- 컬러(Color)
- 뮤직(Music)
- 워드(Word)
- 관계(Relationship)

브라우저의 `localStorage`에 데이터가 저장되며, JSON 백업/복원과 JPG/PDF/클립보드 내보내기를 지원합니다.

---

## 주요 기능

### 1) 대시보드
- 8개 테마 카드로 각 모듈 진입
- 모듈별 저장 아이템 수 배지 표시

### 2) 모듈 기능
- **Bag**: 텍스트/이모지/이미지를 캔버스에 배치, 이동, 크기 조절, 삭제
- **Time**: 24시간 일정 입력 및 시각화
- **Brain**: 생각 텍스트 버블 추가/이동/삭제
- **Mind (Emotion)**:
  - 플루치크(Plutchik) 기반 8개 감정 카테고리
  - 감정 칩 추가, 강도(+/-) 조절, 삭제, 드래그 이동
  - 8칸 카테고리 선택 UI
- **Color**:
  - 60개 프리셋 + 사용자 지정 색상 추가
  - 색상명 편집 및 카드 삭제
  - 팔레트 일러스트 우측 영역 컬러 배치
- **Music**: 플레이리스트(썸네일/곡명/아티스트/이유/링크), 순서 변경
- **Word**: 단어-정의 사전 작성
- **Relationship**: 관계 노드 추가/이동/삭제

### 3) 공통 UX
- 다국어: 한국어/영어/일본어
- 테마 컬러: Blue / Green / Pink / Yellow
- 현재 탭 초기화, 전체 데이터 초기화
- 백업/복원(JSON)
- 내보내기: JPG / PDF / Clipboard / JSON

---

## 기술 스택

- HTML5
- Vanilla JavaScript (모듈 파일 분리)
- CSS (공통 + 모듈 스타일)
- 외부 라이브러리(CDN):
  - `html2canvas`
  - `jsPDF`

> 별도 번들러/빌드 단계 없이 정적 파일로 동작합니다.

---

## 프로젝트 구조

```text
.
├── index.html
├── css/
│   ├── style.css
│   ├── themes.css
│   └── modules.css
└── js/
    ├── app.js
    ├── i18n.js
    ├── storage.js
    ├── export.js
    ├── theme.js
    └── modules/
        ├── bag.js
        ├── time.js
        ├── brain.js
        ├── mind.js
        ├── color.js
        ├── music.js
        ├── word.js
        └── relationship.js
```

---

## 로컬 실행 방법

### 방법 A) 파일 바로 열기
1. 저장소를 클론/다운로드합니다.
2. `index.html`을 브라우저로 엽니다.

### 방법 B) 정적 서버로 실행(권장)
```bash
# Python 3
python -m http.server 8000
```
브라우저에서 `http://localhost:8000` 접속.

---

## 데이터 저장/복원

- 저장 위치: 브라우저 `localStorage`
- 키: `wim-data`
- 백업: 우측 상단 저장 아이콘 → JSON 다운로드
- 복원: 우측 상단 저장 아이콘 → JSON 업로드

복원 JSON은 다음 8개 배열 키를 포함해야 합니다.

```json
{
  "bag": [],
  "time": [],
  "brain": [],
  "mind": [],
  "color": [],
  "music": [],
  "word": [],
  "relationship": []
}
```

---

## 내보내기(Export)

모듈 화면 우측 하단 FAB에서 내보내기를 제공합니다.

- JPG 저장
- PDF 저장
- 클립보드 복사(PNG)
- JSON 내보내기

PDF/JPG/Clipboard 이미지는 html2canvas 캡처를 기반으로 생성됩니다.

---

## 접근성/사용성 메모

- 모듈 이동 시 헤더 상태/버튼 표시가 동적으로 변경됩니다.
- 주요 액션은 토스트로 결과를 안내합니다.
- 모바일 뷰를 위한 반응형 스타일이 포함되어 있습니다.

---

## 라이선스

현재 저장소에는 별도 라이선스 파일이 없습니다.
필요 시 `LICENSE` 파일을 추가해 주세요.
