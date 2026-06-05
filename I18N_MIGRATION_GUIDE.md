# i18n JSON 마이그레이션 가이드

향후 별도 폴더 구조(/en/)를 단일 HTML + JSON 구조로 전환하는 절차.

## 현재 구조 (Phase 1)
- /index.html, /about.html, ... (한국어, data-i18n 부착됨)
- /en/index.html, /en/about.html, ... (영어, 동일한 data-i18n 키)

## 목표 구조 (Phase 2)
- /index.html, /about.html, ... (HTML 한 벌)
- /locales/ko.json
- /locales/en.json
- /assets/js/i18n.js (텍스트 갈아끼우는 로직)

## 마이그레이션 단계

### 1. JSON 자동 추출 스크립트 (Python 또는 Node.js)
- 한국어 페이지 순회 → data-i18n 속성과 텍스트 매핑 → ko.json 생성
- 영어 페이지 순회 → en.json 생성

### 2. i18n.js 로직 추가
- 페이지 로드 시 ?lang=en 또는 localStorage에서 언어 결정
- 해당 JSON 파일 fetch
- data-i18n 속성을 가진 모든 요소를 순회하며 텍스트 교체

### 3. /en/ 폴더 삭제
- 단일 HTML로 통합 후 /en/ 제거
- 토글 동작을 JS로 변경 (URL의 ?lang 파라미터 토글)

### 4. SEO 보완
- hreflang 태그는 ?lang=ko / ?lang=en 으로 갱신
- 또는 SSR(Astro 등) 도입하여 정적 생성으로 대응

## 키 추출 예상 결과
- 총 i18n 키 수: 약 300~400개 (5페이지)
- 페이지별 평균: 60~80개

## 주의사항
- HTML 구조가 양쪽 페이지에서 동일해야 자동 추출 가능
- data-i18n 키가 누락된 요소는 수동 처리 필요
- alt, placeholder, title 등 속성 텍스트는 별도 처리
