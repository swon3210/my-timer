# 프로젝트 아키텍처 및 코딩 컨벤션

이 문서는 이 프로젝트의 핵심 아키텍처 원칙, 코딩 컨벤션, 스타일 가이드를 설명합니다. 이 규칙들을 준수하는 것은 코드 품질, 일관성, 유지보수성을 위해 매우 중요합니다.

---

### **1. 핵심 기술 스택**

*   **프레임워크**: [Next.js 14 (App Router)](https://nextjs.org/docs/app)
*   **언어**: [TypeScript](https://www.typescriptlang.org/)
*   **UI**: [Tailwind CSS](https://tailwindcss.com/)와 [shadcn/ui](https://ui.shadcn.com/)
*   **데이터 페칭 및 상태 관리**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
*   **전역 상태 관리**: [Jotai](https://jotai.org/)
*   **백엔드 및 API**: [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) 및 [Firebase](https://firebase.google.com/)

---

### **2. 🚨 중요: `src/domains` 아키텍처**

이것은 이 프로젝트에서 **가장 중요한 아키텍처 패턴**입니다. `src/domains` 디렉토리는 비즈니스 로직과 데이터 페칭을 UI 레이어로부터 분리합니다.

*   **목적**: UI 컴포넌트와 데이터 소스를 분리(decouple)하기 위함입니다. UI 컴포넌트는 데이터가 *어떻게* 가져와지고 변경되는지 알 필요가 없습니다.
*   **구조**: 각 도메인(예: `account-book`, `users`)은 다음을 포함합니다:
    *   `fetchers.ts`: API 호출을 수행하는 순수 함수 (예: `axios` 또는 `src/lib/api.ts`의 API 클라이언트 사용).
    *   `use...Query.ts`: fetcher를 사용하는 TanStack Query 커스텀 훅.
    *   `use...Mutation.ts`: 데이터 생성, 수정, 삭제를 위한 TanStack Query 커스텀 훅.
    *   `types.ts` / `schema.ts`: 도메인 데이터 모델을 위한 TypeScript 타입 또는 Zod 스키마.

---

### **✅ 반드시 해야 할 것: 핵심 규칙**

이 규칙들을 반드시 따르세요.

1.  **데이터 페칭**:
    *   **항상** 데이터 페칭 로직은 `src/domains` 내부에 위치시키세요.
    *   UI 컴포넌트에서 데이터를 가져올 때는 **항상** TanStack Query 커스텀 훅(예: `useBudgetsQuery`)을 사용하세요.
    *   데이터 변경(생성, 수정, 삭제) 시에는 **항상** 해당하는 뮤테이션 훅(예: `useAddBudgetMutation`)을 사용하고, `onSuccess` 콜백에서 관련 쿼리를 무효화(invalidate)하세요.

2.  **컴포넌트 및 UI**:
    *   **항상** 새로운 UI의 기반으로 `src/components/ui`에 있는 `shadcn/ui` 컴포넌트를 사용하세요.
    *   조건부 클래스 이름을 적용할 때는 **항상** `src/lib/utils.ts`의 `cn` 유틸리티를 사용하세요.
    *   특정 페이지에 종속된 컴포넌트는 **항상** 해당 페이지의 `_components` 디렉토리에 위치시키세요 (예: `src/app/account-book/home/_components/Header.tsx`).
    *   전역적으로 재사용 가능한 컴포넌트는 `src/components`에 **생성하세요**.

3.  **상태 관리**:
    *   전역 또는 여러 컴포넌트에 걸친 상태 관리는 **항상** [Jotai](https://jotai.org/)를 사용하세요.
    *   atom은 사용되는 곳에 가깝게 정의하세요. 페이지/레이아웃에 특화된 상태는 로컬 `_atom` 폴더를 사용하세요 (예: `src/app/account-book/home/_atom/useDateAtom.ts`).
    *   진정한 의미의 전역 atom은 `src/lib/atoms.ts`에 정의하세요.

4.  **오버레이 및 모달**:
    *   모든 오버레이 UI(모달, 다이얼로그, 팝업)에는 **항상** `[overlay-kit](https://github.com/josselinbuils/overlay-kit)` 라이브러리를 사용하세요.
    *   **항상** 오버레이 로직을 전용 커스텀 훅(예: `useExpenseFormDialogOverlay`)으로 감싸세요. 이 훅은 필요한 props와 함께 오버레이를 여는 로직을 처리해야 합니다.
    *   훅의 이름은 `use<컴포넌트이름>Overlay.tsx` 형식이어야 합니다. `useExpenseFormDialogOverlay.tsx`를 구현 예시로 참고하세요.

---

### **❌ 절대 하지 말아야 할 것: 안티 패턴**

어떤 경우에도 다음 패턴들은 피해야 합니다.

1.  **컴포넌트에서 직접 데이터 페칭 금지**:
    *   React 컴포넌트 안에서 `fetch`, `axios`, SWR 등을 **절대** 직접 사용하지 마세요. 이는 핵심 아키텍처 원칙에 위배됩니다. `src/domains`의 훅을 사용하세요.

2.  **`shadcn/ui`의 Dialog/AlertDialog 직접 사용 금지**:
    *   `shadcn/ui`의 `Dialog`나 `AlertDialog` 컴포넌트를 **절대** 직접 사용하지 마세요. 모든 오버레이 UI는 일관성을 위해 `overlay-kit` 패턴을 통해 구현되어야 합니다.

3.  **수동 CSS/스타일링 금지**:
    *   레이아웃과 스타일링을 위해 순수 CSS(`.css`, `.scss`)를 작성하거나 `style` prop을 **절대** 사용하지 마세요.
    *   **항상** Tailwind CSS 유틸리티 클래스를 사용하세요. 기존 유틸리티로 원하는 스타일 구현이 불가능할 경우, `tailwind.config.ts`에서 테마 확장을 논의하세요.

4.  **UI에 비즈니스 로직 금지**:
    *   복잡한 데이터 변환, 비즈니스 규칙, API 엔드포인트 로직을 UI 컴포넌트 안에 **절대** 넣지 마세요. 이런 로직은 `src/domains` 훅이나 `src/lib/utils.ts`에 속합니다.

---

### **디렉토리 빠른 참조**

*   `src/app`: 메인 애플리케이션. 각 폴더가 하나의 라우트입니다.
    *   `_components`, `_hooks`, `_utils`, `_atom`: 특정 라우트 세그먼트를 위한 **비공개** 모듈. URL에 포함되지 않습니다.
    *   `api`: Firebase와 상호작용하는 서버 사이드 API 라우트.
*   `src/components`: 전역적으로 재사용되는 컴포넌트 (`<Button>`, `<Card>`).
    *   `ui`: `shadcn/ui` 기본 컴포넌트. 직접 수정하지 말고 `src/components`에서 확장해서 사용하세요.
*   `src/domains`: **(앱의 심장)** 비즈니스 로직, 데이터 페칭 훅, 타입.
*   `src/lib`: 전역 유틸리티, 핵심 atom, 상수, 프로바이더.
*   `src/types`: 전역 TypeScript 타입 정의. 