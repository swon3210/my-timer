import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { StatCard } from "@/components/ui/stat-card";
import { FormField, FormActions } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Inbox,
  Plus,
  Settings,
  TrendingUp,
  TrendingDown,
  Wallet,
  Image,
} from "lucide-react";

// Container Stories
const ContainerMeta: Meta<typeof Container> = {
  title: "Components/Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "페이지 콘텐츠의 최대 너비와 패딩을 관리하는 컨테이너 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
};

export default ContainerMeta;

type ContainerStory = StoryObj<typeof Container>;

export const ContainerDefault: ContainerStory = {
  name: "Container",
  render: () => (
    <div className="bg-muted min-h-[300px]">
      <Container className="bg-card py-8">
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <p className="text-label">Container (max-width: 1024px)</p>
          <p className="text-caption text-muted-foreground">
            기본 앱 컨테이너 너비
          </p>
        </div>
      </Container>
    </div>
  ),
};

export const ContainerSizes: ContainerStory = {
  name: "Container Sizes",
  render: () => (
    <div className="space-y-4 bg-muted py-8">
      <Container size="sm" className="bg-card py-4">
        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
          <p className="text-label">Small (max-w-2xl)</p>
        </div>
      </Container>
      <Container size="default" className="bg-card py-4">
        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
          <p className="text-label">Default (max-w-app-container)</p>
        </div>
      </Container>
      <Container size="lg" className="bg-card py-4">
        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
          <p className="text-label">Large (max-w-6xl)</p>
        </div>
      </Container>
    </div>
  ),
};

// PageHeader Story
export const PageHeaderDefault: StoryObj = {
  name: "PageHeader",
  render: () => (
    <div className="w-[600px] border rounded-lg overflow-hidden">
      <PageHeader title="페이지 제목" border />
      <div className="p-4 h-[200px] bg-muted">
        <p className="text-caption text-muted-foreground">페이지 컨텐츠</p>
      </div>
    </div>
  ),
};

export const PageHeaderWithBackButton: StoryObj = {
  name: "PageHeader with Back Button",
  render: () => (
    <div className="w-[600px] border rounded-lg overflow-hidden">
      <PageHeader 
        title="상세 페이지" 
        subtitle="2024년 1월" 
        showBackButton 
        onBack={() => alert("뒤로가기 클릭!")}
        border 
      />
      <div className="p-4 h-[200px] bg-muted">
        <p className="text-caption text-muted-foreground">페이지 컨텐츠</p>
      </div>
    </div>
  ),
};

export const PageHeaderWithActions: StoryObj = {
  name: "PageHeader with Actions",
  render: () => (
    <div className="w-[600px] border rounded-lg overflow-hidden">
      <PageHeader
        title="거래 내역"
        showBackButton
        onBack={() => alert("뒤로가기 클릭!")}
        border
        rightSlot={
          <div className="flex gap-2">
            <Button variant="outline" size="icon-sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              추가
            </Button>
          </div>
        }
      />
      <div className="p-4 h-[200px] bg-muted">
        <p className="text-caption text-muted-foreground">페이지 컨텐츠</p>
      </div>
    </div>
  ),
};

export const PageHeaderSelectionMode: StoryObj = {
  name: "PageHeader Selection Mode",
  render: () => (
    <div className="w-[600px] border rounded-lg overflow-hidden">
      <PageHeader
        border
        leftSlot={<Badge variant="soft-primary">3개 선택됨</Badge>}
        rightSlot={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              취소
            </Button>
            <Button variant="destructive" size="sm">
              삭제
            </Button>
          </div>
        }
      />
      <div className="p-4 h-[200px] bg-muted">
        <p className="text-caption text-muted-foreground">선택 모드 컨텐츠</p>
      </div>
    </div>
  ),
};

// Section Story
export const SectionDefault: StoryObj = {
  name: "Section",
  render: () => (
    <div className="w-[600px]">
      <Section>
        <SectionHeader title="최근 거래" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-3">
              <p className="text-body-sm">거래 항목 {i}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  ),
};

export const SectionWithSubtitleAndAction: StoryObj = {
  name: "Section with Subtitle & Action",
  render: () => (
    <div className="w-[600px]">
      <Section>
        <SectionHeader
          title="예산 현황"
          subtitle="이번 달 지출 현황입니다"
          action={<Button variant="link" size="sm">자세히</Button>}
        />
        <Card className="p-4">
          <p className="text-body-sm">예산 차트가 여기에 표시됩니다</p>
        </Card>
      </Section>
    </div>
  ),
};

export const SectionWithBackground: StoryObj = {
  name: "Section Backgrounds",
  render: () => (
    <div className="w-[600px] space-y-0">
      <Section background="default" spacing="lg">
        <SectionHeader title="Default Background" />
        <p className="text-body-sm text-muted-foreground">기본 배경</p>
      </Section>
      <Section background="muted" spacing="lg">
        <SectionHeader title="Muted Background" />
        <p className="text-body-sm text-muted-foreground">회색 배경</p>
      </Section>
      <Section background="primary" spacing="lg">
        <SectionHeader title="Primary Background" />
        <p className="text-body-sm">주요 색상 배경</p>
      </Section>
    </div>
  ),
};

// EmptyState Story
export const EmptyStateDefault: StoryObj = {
  name: "EmptyState",
  render: () => (
    <div className="w-[400px] border rounded-lg">
      <EmptyState
        icon={<Inbox className="h-12 w-12" />}
        title="거래 내역이 없습니다"
        description="첫 번째 거래를 추가해보세요"
        action={
          <Button>
            <Plus className="h-4 w-4" />
            거래 추가
          </Button>
        }
      />
    </div>
  ),
};

export const EmptyStateGallery: StoryObj = {
  name: "EmptyState - Gallery",
  render: () => (
    <div className="w-[400px] border rounded-lg">
      <EmptyState
        icon={<Image className="h-12 w-12" />}
        title="이미지가 없습니다"
        description="사진을 업로드하여 갤러리를 채워보세요"
        action={
          <Button>
            <Plus className="h-4 w-4" />
            이미지 업로드
          </Button>
        }
      />
    </div>
  ),
};

// StatCard Story
export const StatCardDefault: StoryObj = {
  name: "StatCard",
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[500px]">
      <StatCard
        icon={<Wallet className="h-5 w-5" />}
        label="총 자산"
        value="15,000,000원"
      />
      <StatCard
        variant="success"
        icon={<TrendingUp className="h-5 w-5" />}
        label="이번 달 수입"
        value="3,500,000원"
        trend={{ value: 12.5, label: "지난 달 대비" }}
      />
      <StatCard
        variant="destructive"
        icon={<TrendingDown className="h-5 w-5" />}
        label="이번 달 지출"
        value="2,100,000원"
        subValue="예산의 70%"
        trend={{ value: -5.2, label: "지난 달 대비" }}
      />
      <StatCard
        variant="info"
        label="저축 목표 달성률"
        value="85%"
        trend={{ value: 10, label: "지난 달 대비" }}
      />
    </div>
  ),
};

// FormField Story
export const FormFieldDefault: StoryObj = {
  name: "FormField",
  render: () => (
    <div className="w-[350px] space-y-4 p-6 border rounded-lg">
      <FormField label="이름" required htmlFor="name">
        <Input id="name" placeholder="홍길동" />
      </FormField>
      <FormField
        label="이메일"
        description="알림을 받을 이메일 주소를 입력하세요"
        htmlFor="email"
      >
        <Input id="email" type="email" placeholder="example@email.com" />
      </FormField>
      <FormField
        label="비밀번호"
        error="비밀번호는 8자 이상이어야 합니다"
        htmlFor="password"
      >
        <Input id="password" type="password" error />
      </FormField>
      <FormActions>
        <Button variant="outline">취소</Button>
        <Button>저장</Button>
      </FormActions>
    </div>
  ),
};

// Full Page Layout Example
export const FullPageExample: StoryObj = {
  name: "Full Page Layout Example",
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="가계부"
        subtitle="2024년 1월"
        border
        shadow
        rightSlot={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            추가
          </Button>
        }
      />
      <Container className="py-6">
        <Section>
          <SectionHeader title="이번 달 요약" />
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              variant="success"
              icon={<TrendingUp className="h-5 w-5" />}
              label="수입"
              value="3,500,000원"
            />
            <StatCard
              variant="destructive"
              icon={<TrendingDown className="h-5 w-5" />}
              label="지출"
              value="2,100,000원"
            />
            <StatCard
              icon={<Wallet className="h-5 w-5" />}
              label="잔액"
              value="1,400,000원"
            />
          </div>
        </Section>

        <Section background="muted" className="mt-6 -mx-4 px-4 rounded-t-xl">
          <SectionHeader
            title="최근 거래"
            action={<Button variant="link" size="sm">전체보기</Button>}
          />
          <div className="space-y-2">
            <Card interactive className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-label">점심 식사</p>
                  <p className="text-caption text-muted-foreground">
                    1월 15일 · 식비
                  </p>
                </div>
                <Badge variant="destructive">-15,000원</Badge>
              </div>
            </Card>
            <Card interactive className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-label">급여</p>
                  <p className="text-caption text-muted-foreground">
                    1월 10일 · 급여
                  </p>
                </div>
                <Badge variant="success">+3,500,000원</Badge>
              </div>
            </Card>
          </div>
        </Section>
      </Container>
    </div>
  ),
};

