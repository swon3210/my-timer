import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FormField, FormActions } from "@/components/ui/form-field";

const GuidelinesPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div>
        <h1 className="text-heading-1 mb-2">사용 가이드라인</h1>
        <p className="text-body text-muted-foreground">
          컴포넌트를 효과적으로 사용하기 위한 가이드라인입니다.
        </p>
      </div>

      {/* 1. Color Usage */}
      <section className="space-y-4">
        <h2 className="text-heading-2">1. 색상 사용 규칙</h2>

        <Card className="p-6">
          <h3 className="text-heading-5 text-success mb-4">✅ 올바른 사용</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-body-sm w-24">긍정/증가:</span>
              <Badge variant="success">+50,000원</Badge>
              <Badge variant="soft-success">수입</Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-body-sm w-24">부정/감소:</span>
              <Badge variant="destructive">-30,000원</Badge>
              <Badge variant="soft-destructive">지출</Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-body-sm w-24">상태:</span>
              <Badge variant="success">완료</Badge>
              <Badge variant="warning">진행중</Badge>
              <Badge variant="destructive">실패</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-destructive">
          <h3 className="text-heading-5 text-destructive mb-4">
            ❌ 잘못된 사용
          </h3>
          <div className="space-y-2 text-body-sm text-muted-foreground">
            <p>• 색상만으로 정보를 전달하지 마세요</p>
            <p>• 시맨틱 의미에 맞지 않는 색상 사용 금지</p>
            <p>• 같은 맥락에서 다른 색상 체계를 혼용하지 마세요</p>
          </div>
        </Card>
      </section>

      {/* 2. Button Hierarchy */}
      <section className="space-y-4">
        <h2 className="text-heading-2">2. 버튼 계층 구조</h2>
        <p className="text-body-sm text-muted-foreground">
          한 화면에서 버튼은 중요도에 따라 구분해서 사용합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <h3 className="text-heading-5 mb-2">주요 액션 (Primary)</h3>
            <p className="text-caption text-muted-foreground mb-4">
              화면에서 가장 중요한 액션. 한 화면에 1개만 권장.
            </p>
            <Button>저장하기</Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-heading-5 mb-2">보조 액션 (Secondary)</h3>
            <p className="text-caption text-muted-foreground mb-4">
              주요 액션의 대안 또는 보조 역할.
            </p>
            <div className="flex gap-2">
              <Button variant="outline">취소</Button>
              <Button variant="secondary">임시저장</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-heading-5 mb-2">부가 액션 (Tertiary)</h3>
            <p className="text-caption text-muted-foreground mb-4">
              덜 중요하거나 자주 사용하지 않는 액션.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost">더보기</Button>
              <Button variant="link">도움말</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. Card Pattern */}
      <section className="space-y-4">
        <h2 className="text-heading-2">3. 카드 사용 패턴</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h3 className="text-label">목록 아이템</h3>
            <p className="text-caption text-muted-foreground">
              클릭 가능한 아이템에는 interactive 사용
            </p>
            <Card interactive className="p-4 cursor-pointer">
              <p className="text-body-sm">클릭 가능한 아이템</p>
              <p className="text-caption text-muted-foreground">hover me!</p>
            </Card>
          </div>

          <div className="space-y-2">
            <h3 className="text-label">정보 표시</h3>
            <p className="text-caption text-muted-foreground">
              단순 정보는 기본 variant 사용
            </p>
            <Card className="p-4">
              <p className="text-body-sm">정보 표시용</p>
              <p className="text-caption text-muted-foreground">읽기 전용</p>
            </Card>
          </div>

          <div className="space-y-2">
            <h3 className="text-label">강조 정보</h3>
            <p className="text-caption text-muted-foreground">
              중요 정보는 semantic variant 사용
            </p>
            <Card variant="success" className="p-4">
              <p className="text-body-sm text-success">성공/완료 강조</p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Form Pattern */}
      <section className="space-y-4">
        <h2 className="text-heading-2">4. 폼 패턴</h2>
        <p className="text-body-sm text-muted-foreground">
          폼은 일관된 구조를 유지합니다.
        </p>

        <Card className="p-6 max-w-md">
          <div className="space-y-4">
            <FormField label="필수 필드" required>
              <Input placeholder="입력하세요" />
            </FormField>

            <FormField
              label="선택 필드"
              description="추가 설명이 필요한 경우"
            >
              <Input placeholder="선택 입력" />
            </FormField>

            <FormField label="오류가 있는 필드" error="오류 메시지">
              <Input error placeholder="잘못된 입력" />
            </FormField>

            <FormActions>
              <Button variant="outline">취소</Button>
              <Button>저장</Button>
            </FormActions>
          </div>
        </Card>
      </section>

      {/* 5. Page Layout Pattern */}
      <section className="space-y-4">
        <h2 className="text-heading-2">5. 페이지 레이아웃 패턴</h2>

        <Card className="p-6">
          <h3 className="text-heading-5 mb-4">기본 페이지 구조</h3>
          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
{`export default function Page() {
  return (
    <Container>
      <PageHeader 
        title="페이지 제목"
        showBackButton
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
}`}
            </pre>
          </div>
        </Card>
      </section>

      {/* 6. Accessibility */}
      <section className="space-y-4">
        <h2 className="text-heading-2">6. 접근성 고려사항</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <h3 className="text-heading-5 mb-3">레이블 제공</h3>
            <p className="text-body-sm text-muted-foreground mb-3">
              모든 인터랙티브 요소에는 레이블을 제공합니다.
            </p>
            <div className="bg-muted p-3 rounded text-sm font-mono">
              {`<Button size="icon" aria-label="설정">`}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-heading-5 mb-3">색상만으로 정보 전달 금지</h3>
            <p className="text-body-sm text-muted-foreground mb-3">
              색상과 함께 텍스트나 아이콘을 사용합니다.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="success">✓ 완료</Badge>
                <span className="text-caption text-success">좋은 예</span>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

const meta: Meta = {
  title: "Overview/Guidelines",
  component: GuidelinesPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: null,
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

