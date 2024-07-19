# React Product Order

## 개요

본 저장소는 FE 카카오 선물하기 4주차 과제 (2024-07-15 ~ 2024-07-19)를 위한 상품 주문 구현을 담고 있습니다. 상세한 학습 내용은 [Notion 노트](https://www.notion.so/TIL-FE-25dbeb894e884b889eca0fa3e4e13904)에서 확인할 수 있습니다.

---

## 상품 주문 프로세스

### 0단계 - 기본 코드 준비

---

### 1단계 - 상품 상세 페이지 & 상품 결제하기 폼 구현

- **UI 프레임워크:** `chakra-ui` 또는 직접 구현한 UI 컴포넌트만 사용 (외부 라이브러리 사용 금지)
- **폼 상태 관리:** React 기본 기능 (`form`, `ref`, `state`)으로 폼 상태 관리 (외부 라이브러리 사용 금지)

- **상품 상세 페이지 (`@/pages/ProductDetail`)**
  - [x] `/components/features/Theme/ThemeGoodsSection` 또는 `/components/features/Home/GoodsRankingSection/List`에서 상품 ID (productId)를 전달받아 페이지 이동
  - [x] 유효하지 않은 productId일 경우 메인 페이지 (/)로 리다이렉트
  - **상품 정보 표시**
    - [x] `/v1/products/{productId}/detail` API 호출하여 데이터 불러오기
      - [x] 상품 ID (id)
      - [x] 상품명 (name)
      - [x] 이미지 URL (imageURL)
      - [x] 브랜드 정보 (brand)
      - [x] 기본 가격 (basicPrice)
  - **상품 옵션 선택**
    - [ ] `/v1/products/{productId}/options` API 호출하여 데이터 불러오기
      - [ ] 옵션 목록 (`optionId`, `optionName`, `optionPrice`, `subOptions`)
  - **"나에게 선물하기" 버튼**
    - [x] 로그인 상태: 주문 결제 페이지 (`@/pages/Payment`)로 이동하며, productId 전달
    - [x] 비로그인 상태: 로그인 페이지 (`@/pages/Login`)로 이동

- **상품 결제 페이지(`@/pages/Payment`)**
  - [x] "선물과 함께 보낼 메세지" 입력란
  - [x] `/v1/products/{productId}/detail` API 호출하여 주문 상품 정보 표시 (이미지, 브랜드, 이름)
  - [x] 결제 정보 입력 (현금영수증, 소득공제 등)
  - [x] 최종 결제 금액 표시
  - [x] "결제하기" 버튼 (클릭 시 "주문이 완료되었습니다" 알림)

---

### 2단계 - 유효성 검사 구현

- **상품 상세 페이지 (`@/pages/ProductDetail`)**
  - **상품 옵션 선택**
    - [ ] 상품 옵션을 선택할 때, `giftOrderLimit`을 초과할 수 없도록 제한

- **상품 결제 페이지 (`@/pages/Payment`)**
  - **카드 메시지**
    - [x] 카드 메시지를 입력하지 않은 경우, 안내 메시지를 표시
    - [x] 카드 메시지가 100자를 초과할 경우, 안내 메시지를 표시
  - **현금영수증**
    - [x] 현금영수증 체크 시, 현금영수증 번호 입력 여부를 확인
    - [x] 현금영수증 번호는 숫자만 입력 가능하도록 제한

---

### 3단계 - React Hook Form 리팩터링

- [x] 기존 폼을 React Hook Form으로 변경
- [x] 폼 필드와 유효성 검사를 관리

---

### 4단계 - 질문 답변

- 질문 1: 제어 컴포넌트 vs. 비제어 컴포넌트의 차이점, 제어 컴포넌트 사용 시나리오

- 질문 2: 다양한 input type의 종류와 특징

- 질문 3: label 태그의 역할, input field를 label로 감쌀 때의 동작 방식