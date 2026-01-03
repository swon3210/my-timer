import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "상태, 카테고리, 태그 등을 표시하는 뱃지 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "success",
        "warning",
        "destructive",
        "info",
        "soft-primary",
        "soft-success",
        "soft-warning",
        "soft-destructive",
        "soft-info",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Core Variants */}
      <div className="space-y-2">
        <h3 className="text-label text-muted-foreground">Core Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </div>
      </div>

      {/* Semantic Solid */}
      <div className="space-y-2">
        <h3 className="text-label text-muted-foreground">Semantic (Solid)</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">완료</Badge>
          <Badge variant="warning">진행중</Badge>
          <Badge variant="destructive">오류</Badge>
          <Badge variant="info">정보</Badge>
        </div>
      </div>

      {/* Semantic Soft */}
      <div className="space-y-2">
        <h3 className="text-label text-muted-foreground">Semantic (Soft)</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="soft-primary">Primary</Badge>
          <Badge variant="soft-success">완료</Badge>
          <Badge variant="soft-warning">진행중</Badge>
          <Badge variant="soft-destructive">오류</Badge>
          <Badge variant="soft-info">정보</Badge>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  name: "상태 뱃지 예시",
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-body-sm w-20">목표:</span>
        <Badge variant="soft-success">달성</Badge>
        <Badge variant="soft-warning">진행중</Badge>
        <Badge variant="soft-destructive">실패</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-body-sm w-20">예산:</span>
        <Badge variant="soft-success">여유</Badge>
        <Badge variant="soft-warning">주의</Badge>
        <Badge variant="soft-destructive">초과</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-body-sm w-20">거래:</span>
        <Badge variant="success">+500,000원</Badge>
        <Badge variant="destructive">-320,000원</Badge>
      </div>
    </div>
  ),
};

export const CategoryBadges: Story = {
  name: "카테고리 뱃지 예시",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">🍽️ 식비</Badge>
      <Badge variant="outline">🚌 교통</Badge>
      <Badge variant="outline">🏠 주거</Badge>
      <Badge variant="outline">🛒 쇼핑</Badge>
      <Badge variant="outline">🎬 문화</Badge>
      <Badge variant="outline">💊 의료</Badge>
    </div>
  ),
};

