import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Upload, Download, Settings, Heart } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "다양한 variants, sizes, states를 지원하는 버튼 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
        "success",
        "warning",
        "info",
        "soft-primary",
        "soft-destructive",
        "soft-success",
        "soft-warning",
        "soft-info",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "xl", "icon", "icon-sm", "icon-lg"],
    },
    rounded: {
      control: "select",
      options: ["default", "full", "none"],
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Core Variants */}
      <div className="space-y-2">
        <h3 className="text-label text-muted-foreground">Core Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      {/* Semantic Variants */}
      <div className="space-y-2">
        <h3 className="text-label text-muted-foreground">Semantic Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="info">Info</Button>
        </div>
      </div>

      {/* Soft Variants */}
      <div className="space-y-2">
        <h3 className="text-label text-muted-foreground">Soft Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="soft-primary">Soft Primary</Button>
          <Button variant="soft-success">Soft Success</Button>
          <Button variant="soft-warning">Soft Warning</Button>
          <Button variant="soft-destructive">Soft Destructive</Button>
          <Button variant="soft-info">Soft Info</Button>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button size="icon-sm" variant="outline">
          <Settings className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline">
          <Settings className="h-4 w-4" />
        </Button>
        <Button size="icon-lg" variant="outline">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <Button size="icon" variant="default">
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="success">
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="info">
          <Upload className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>
        <Plus className="h-4 w-4" />
        추가하기
      </Button>
      <Button variant="destructive">
        <Trash2 className="h-4 w-4" />
        삭제
      </Button>
      <Button variant="outline">
        <Download className="h-4 w-4" />
        다운로드
      </Button>
      <Button variant="info">
        <Upload className="h-4 w-4" />
        업로드
      </Button>
    </div>
  ),
};

export const RoundedFull: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button rounded="full">Rounded Full</Button>
      <Button rounded="full" variant="outline">
        Outline
      </Button>
      <Button rounded="full" size="icon">
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button loading>저장 중...</Button>
      <Button loading variant="outline">
        처리 중...
      </Button>
      <Button loading variant="destructive">
        삭제 중...
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">
        Disabled
      </Button>
      <Button disabled variant="destructive">
        Disabled
      </Button>
    </div>
  ),
};

export const ButtonHierarchy: Story = {
  name: "Button Hierarchy (사용 가이드)",
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-label mb-3">주요 액션 (Primary)</h3>
        <p className="text-caption text-muted-foreground mb-3">
          화면에서 가장 중요한 액션 (1개만 권장)
        </p>
        <Button>저장하기</Button>
      </div>
      <div>
        <h3 className="text-label mb-3">보조 액션 (Secondary)</h3>
        <p className="text-caption text-muted-foreground mb-3">
          주요 액션의 대안 또는 보조
        </p>
        <div className="flex gap-2">
          <Button variant="outline">취소</Button>
          <Button variant="secondary">임시저장</Button>
        </div>
      </div>
      <div>
        <h3 className="text-label mb-3">부가 액션 (Tertiary)</h3>
        <p className="text-caption text-muted-foreground mb-3">
          덜 중요하거나 자주 사용하지 않는 액션
        </p>
        <div className="flex gap-2">
          <Button variant="ghost">더보기</Button>
          <Button variant="link">도움말</Button>
        </div>
      </div>
    </div>
  ),
};

