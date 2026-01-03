# 디자인 시스템 가이드

이 문서는 My Timer 프로젝트의 디자인 시스템을 정의합니다. 갤러리 서비스와 가계부 서비스 모두에서 일관된 UI/UX를 제공하기 위한 규칙과 컴포넌트를 설명합니다.

## 목차

1. [디자인 토큰](#디자인-토큰)
2. [컬러 시스템](#컬러-시스템)
3. [타이포그래피](#타이포그래피)
4. [간격 시스템](#간격-시스템)
5. [UI 컴포넌트](#ui-컴포넌트)
6. [레이아웃 컴포넌트](#레이아웃-컴포넌트)
7. [사용 가이드라인](#사용-가이드라인)

---

## 디자인 토큰

모든 디자인 토큰은 CSS 변수로 정의되어 있으며, `globals.css`에서 관리됩니다.

### 파일 위치
- **CSS 변수**: `src/app/globals.css`
- **Tailwind 설정**: `tailwind.config.ts`
- **UI 컴포넌트**: `src/components/ui/`

---

## 컬러 시스템

### Core Colors

| 토큰 | 용도 | Tailwind 클래스 |
|------|------|-----------------|
| `--background` | 페이지 배경 | `bg-background` |
| `--foreground` | 기본 텍스트 | `text-foreground` |
| `--card` | 카드 배경 | `bg-card` |
| `--border` | 테두리 | `border-border` |
| `--input` | 입력 필드 테두리 | `border-input` |

### Brand Colors (Primary)

| 토큰 | 용도 | Tailwind 클래스 |
|------|------|-----------------|
| `--primary` | 주요 버튼, 링크 | `bg-primary`, `text-primary` |
| `--primary-heavy` | 호버 상태 | `bg-primary-heavy` |
| `--primary-light` | 연한 배경 | `bg-primary-light` |

### Semantic Colors

```tsx
// 성공 (초록)
<Badge variant="success">완료</Badge>
<Badge variant="soft-success">완료</Badge>

// 경고 (노랑)
<Badge variant="warning">주의</Badge>
<Badge variant="soft-warning">주의</Badge>

// 오류 (빨강)
<Badge variant="destructive">오류</Badge>
<Badge variant="soft-destructive">오류</Badge>

// 정보 (파랑)
<Badge variant="info">정보</Badge>
<Badge variant="soft-info">정보</Badge>
```

---

## 타이포그래피

### 텍스트 스타일

| 클래스 | 크기 | 용도 |
|--------|------|------|
| `text-heading-1` | 36px / Bold | 페이지 메인 타이틀 |
| `text-heading-2` | 30px / Bold | 섹션 타이틀 |
| `text-heading-3` | 24px / Semibold | 서브 섹션 |
| `text-heading-4` | 20px / Semibold | 카드 타이틀 |
| `text-heading-5` | 18px / Semibold | 작은 헤딩 |
| `text-body-lg` | 18px / Normal | 큰 본문 |
| `text-body` | 16px / Normal | 기본 본문 |
| `text-body-sm` | 14px / Normal | 작은 본문 |
| `text-caption` | 12px / Normal | 캡션, 메타 정보 |
| `text-label` | 14px / Medium | 폼 라벨 |
| `text-overline` | 12px / Semibold | 오버라인 텍스트 |

### 사용 예시

```tsx
<h1 className="text-heading-1">페이지 타이틀</h1>
<h2 className="text-heading-3">섹션 타이틀</h2>
<p className="text-body text-muted-foreground">설명 텍스트</p>
<span className="text-caption text-muted-foreground">2024.01.15</span>
```

---

## 간격 시스템

### Spacing Scale (4px 기반)

| 토큰 | 값 | Tailwind |
|------|-----|----------|
| `--space-1` | 4px | `p-1`, `m-1`, `gap-1` |
| `--space-2` | 8px | `p-2`, `m-2`, `gap-2` |
| `--space-3` | 12px | `p-3`, `m-3`, `gap-3` |
| `--space-4` | 16px | `p-4`, `m-4`, `gap-4` |
| `--space-5` | 20px | `p-5`, `m-5`, `gap-5` |
| `--space-6` | 24px | `p-6`, `m-6`, `gap-6` |
| `--space-8` | 32px | `p-8`, `m-8`, `gap-8` |
| `--space-10` | 40px | `p-10`, `m-10`, `gap-10` |
| `--space-12` | 48px | `p-12`, `m-12`, `gap-12` |
| `--space-16` | 64px | `p-16`, `m-16`, `gap-16` |

### Border Radius

| 토큰 | 값 | Tailwind |
|------|-----|----------|
| `--radius-sm` | 4px | `rounded-sm` |
| `--radius` | 8px | `rounded-md` |
| `--radius-lg` | 12px | `rounded-lg` |
| `--radius-xl` | 16px | `rounded-xl` |
| `--radius-2xl` | 24px | `rounded-2xl` |
| `--radius-full` | 9999px | `rounded-full` |

### Shadows

| 토큰 | Tailwind | 용도 |
|------|----------|------|
| `--shadow-xs` | `shadow-xs` | 미세한 그림자 |
| `--shadow-sm` | `shadow-sm` | 기본 카드 |
| `--shadow-md` | `shadow-md` | 호버 상태 |
| `--shadow-lg` | `shadow-lg` | 모달, 드롭다운 |
| `--shadow-xl` | `shadow-xl` | 큰 오버레이 |

---

## UI 컴포넌트

### Button

```tsx
import { Button } from "@/components/ui/button"

// Variants
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Semantic
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>

// Soft (연한 배경)
<Button variant="soft-primary">Soft Primary</Button>
<Button variant="soft-success">Soft Success</Button>

// Sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon">🔍</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

// Rounded
<Button rounded="full">Rounded Full</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// Variants
<Card variant="default">기본 카드</Card>
<Card variant="elevated">높은 그림자</Card>
<Card variant="outline">테두리만</Card>
<Card variant="ghost">배경 없음</Card>
<Card variant="filled">채워진 배경</Card>

// Semantic
<Card variant="success">성공 카드</Card>
<Card variant="warning">경고 카드</Card>
<Card variant="destructive">오류 카드</Card>
<Card variant="info">정보 카드</Card>

// Interactive (클릭 가능)
<Card interactive>클릭 가능한 카드</Card>

// Size
<Card>
  <CardHeader size="sm">작은 패딩</CardHeader>
  <CardContent size="sm">작은 패딩</CardContent>
</Card>
```

### Input

```tsx
import { Input } from "@/components/ui/input"

// Variants
<Input variant="default" placeholder="기본 입력" />
<Input variant="filled" placeholder="채워진 배경" />
<Input variant="ghost" placeholder="테두리 없음" />
<Input error placeholder="오류 상태" />

// Sizes
<Input inputSize="sm" placeholder="작은 입력" />
<Input inputSize="default" placeholder="기본 입력" />
<Input inputSize="lg" placeholder="큰 입력" />
```

### Badge

```tsx
import { Badge } from "@/components/ui/badge"

// Variants
<Badge variant="default">기본</Badge>
<Badge variant="secondary">보조</Badge>
<Badge variant="outline">테두리</Badge>

// Semantic (Solid)
<Badge variant="success">성공</Badge>
<Badge variant="warning">경고</Badge>
<Badge variant="destructive">오류</Badge>
<Badge variant="info">정보</Badge>

// Semantic (Soft)
<Badge variant="soft-success">성공</Badge>
<Badge variant="soft-warning">경고</Badge>
<Badge variant="soft-destructive">오류</Badge>
<Badge variant="soft-info">정보</Badge>

// Sizes
<Badge size="sm">작은</Badge>
<Badge size="default">기본</Badge>
<Badge size="lg">큰</Badge>
```

### Progress

```tsx
import { Progress } from "@/components/ui/progress"

// Variants
<Progress value={60} variant="default" />
<Progress value={80} variant="success" />
<Progress value={40} variant="warning" />
<Progress value={90} variant="destructive" />
<Progress value={50} variant="info" />

// Sizes
<Progress value={60} size="xs" />
<Progress value={60} size="sm" />
<Progress value={60} size="default" />
<Progress value={60} size="lg" />
<Progress value={60} size="xl" />
```

---

## 레이아웃 컴포넌트

### Container

```tsx
import { Container } from "@/components/ui/container"

// 페이지 기본 레이아웃
<Container>
  컨텐츠
</Container>

// Sizes
<Container size="sm">좁은 컨테이너</Container>
<Container size="default">기본 (1024px)</Container>
<Container size="lg">넓은 컨테이너</Container>
<Container size="full">전체 너비</Container>

// Padding
<Container padding="none">패딩 없음</Container>
<Container padding="sm">작은 패딩</Container>
<Container padding="default">기본 패딩</Container>
<Container padding="lg">큰 패딩</Container>
```

### PageHeader

```tsx
import { PageHeader } from "@/components/ui/page-header"
import { useRouter } from "next/navigation"

// 기본 사용
<PageHeader title="페이지 제목" />

// 뒤로가기 버튼 (onBack 핸들러 필수)
const router = useRouter()
<PageHeader 
  title="상세 페이지" 
  showBackButton
  onBack={() => router.back()}
/>

// 부제목 포함
<PageHeader 
  title="거래 내역" 
  subtitle="2024년 1월"
/>

// 오른쪽 액션 버튼
<PageHeader 
  title="목록"
  rightSlot={
    <Button size="sm">추가</Button>
  }
/>

// 왼쪽 커스텀 슬롯
<PageHeader 
  leftSlot={<Badge>3개 선택</Badge>}
  rightSlot={<Button variant="destructive" size="sm">삭제</Button>}
/>

// 스타일 옵션
<PageHeader title="제목" border shadow />
```

> **Note**: `PageHeader`는 순수 UI 컴포넌트입니다. 뒤로가기 버튼 사용 시 `onBack` 핸들러를 직접 전달해야 합니다.

### Section

```tsx
import { Section, SectionHeader } from "@/components/ui/section"

// 기본 섹션
<Section>
  <SectionHeader title="최근 거래" />
  컨텐츠
</Section>

// 부제목과 액션
<Section>
  <SectionHeader 
    title="예산 현황"
    subtitle="이번 달 지출 현황입니다"
    action={<Button size="sm">자세히</Button>}
  />
  컨텐츠
</Section>

// 배경색
<Section background="muted">회색 배경</Section>
<Section background="primary">주요 색상 배경</Section>

// 간격
<Section spacing="sm">작은 간격</Section>
<Section spacing="lg">큰 간격</Section>
```

### EmptyState

```tsx
import { EmptyState } from "@/components/ui/empty-state"
import { Inbox, Plus } from "lucide-react"

<EmptyState
  icon={<Inbox className="h-12 w-12" />}
  title="거래 내역이 없습니다"
  description="첫 번째 거래를 추가해보세요"
  action={
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      거래 추가
    </Button>
  }
/>
```

### StatCard

```tsx
import { StatCard } from "@/components/ui/stat-card"
import { TrendingUp, TrendingDown, Wallet } from "lucide-react"

// 기본 통계 카드
<StatCard
  icon={<Wallet className="h-5 w-5" />}
  label="총 자산"
  value="1,500,000원"
/>

// 성공/긍정 통계 카드
<StatCard
  variant="success"
  icon={<TrendingUp className="h-5 w-5" />}
  label="이번 달 수입"
  value="3,000,000원"
  trend={{ value: 12.5, label: "지난 달 대비" }}
/>

// 위험/부정 통계 카드
<StatCard
  variant="destructive"
  icon={<TrendingDown className="h-5 w-5" />}
  label="이번 달 지출"
  value="2,100,000원"
  subValue="예산의 70%"
  trend={{ value: -5.2, label: "지난 달 대비" }}
/>
```

### FormField

```tsx
import { FormField, FormActions } from "@/components/ui/form-field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

<form>
  <FormField 
    label="이름" 
    required
    htmlFor="name"
    description="실명을 입력해주세요"
  >
    <Input id="name" placeholder="홍길동" />
  </FormField>

  <FormField 
    label="이메일" 
    error="올바른 이메일 형식이 아닙니다"
  >
    <Input type="email" error />
  </FormField>

  <FormActions align="end">
    <Button variant="outline">취소</Button>
    <Button>저장</Button>
  </FormActions>
</form>
```

---

## 사용 가이드라인

### 1. 색상 사용 규칙

```tsx
// ✅ 올바른 사용 - 시맨틱 색상 활용
<Badge variant="success">+50,000원</Badge>  // 긍정/증가에는 success 색상
<Badge variant="destructive">-30,000원</Badge> // 부정/감소에는 destructive 색상

// ❌ 잘못된 사용
<Badge variant="success">오류</Badge> // 시맨틱 의미에 맞지 않는 사용 금지
```

### 2. 버튼 계층 구조

```tsx
// 한 화면에서 버튼의 중요도
<Button variant="default">주요 액션 (1개)</Button>
<Button variant="outline">보조 액션</Button>
<Button variant="ghost">부가 액션</Button>
```

### 3. 카드 사용 패턴

```tsx
// 목록 아이템 - interactive 카드
<Card interactive onClick={handleClick}>
  클릭 가능한 아이템
</Card>

// 정보 표시 - 기본 카드
<Card>
  정보 표시용
</Card>

// 강조 정보 - semantic 카드
<Card variant="success">
  긍정적인 정보
</Card>
```

### 4. 폼 패턴

```tsx
<form className="space-y-4">
  <FormField label="필드명" required>
    <Input />
  </FormField>
  
  <FormField label="선택 필드">
    <Input />
  </FormField>

  <FormActions>
    <Button variant="outline" type="button">취소</Button>
    <Button type="submit">저장</Button>
  </FormActions>
</form>
```

### 5. 페이지 레이아웃 패턴

```tsx
"use client"

import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  
  return (
    <Container>
      <PageHeader 
        title="페이지 제목"
        showBackButton
        onBack={() => router.back()}
        rightSlot={<Button size="sm">액션</Button>}
      />
      
      <Section>
        <SectionHeader title="섹션 1" />
        {/* 컨텐츠 */}
      </Section>
      
      <Section background="muted">
        <SectionHeader title="섹션 2" />
        {/* 컨텐츠 */}
      </Section>
    </Container>
  )
}
```

---

## 다크 모드

모든 컴포넌트는 다크 모드를 지원합니다. `globals.css`의 `.dark` 클래스에 정의된 색상이 자동으로 적용됩니다.

```tsx
// 다크 모드 토글은 Tailwind의 darkMode: ["class"] 설정 사용
document.documentElement.classList.toggle('dark')
```

---

## 컴포넌트 Import 경로

```tsx
// UI 컴포넌트
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// 레이아웃 컴포넌트
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Section, SectionHeader } from "@/components/ui/section"
import { EmptyState } from "@/components/ui/empty-state"
import { StatCard } from "@/components/ui/stat-card"
import { FormField, FormActions } from "@/components/ui/form-field"
```

---

## 변경 이력

| 날짜 | 버전 | 내용 |
|------|------|------|
| 2024.01 | 1.0.0 | 디자인 시스템 초기 구축 |

