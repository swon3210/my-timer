import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Mail, Lock, DollarSign } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "다양한 variants와 sizes를 지원하는 입력 필드 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "filled", "ghost", "error", "success"],
    },
    inputSize: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "입력하세요...",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="space-y-2">
        <Label>Default</Label>
        <Input variant="default" placeholder="기본 스타일" />
      </div>
      <div className="space-y-2">
        <Label>Filled</Label>
        <Input variant="filled" placeholder="채워진 배경" />
      </div>
      <div className="space-y-2">
        <Label>Ghost</Label>
        <Input variant="ghost" placeholder="테두리 없음 (포커스 시 표시)" />
      </div>
      <div className="space-y-2">
        <Label>Success</Label>
        <Input variant="success" placeholder="성공 상태" />
      </div>
      <div className="space-y-2">
        <Label>Error</Label>
        <Input variant="error" placeholder="오류 상태" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="space-y-2">
        <Label>Small</Label>
        <Input inputSize="sm" placeholder="작은 입력" />
      </div>
      <div className="space-y-2">
        <Label>Default</Label>
        <Input inputSize="default" placeholder="기본 입력" />
      </div>
      <div className="space-y-2">
        <Label>Large</Label>
        <Input inputSize="lg" placeholder="큰 입력" />
      </div>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="space-y-2 w-[300px]">
      <Label>이메일</Label>
      <Input error placeholder="이메일을 입력하세요" value="invalid-email" />
      <p className="text-caption text-destructive">
        올바른 이메일 형식이 아닙니다.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-2 w-[300px]">
      <Label>비활성화됨</Label>
      <Input disabled placeholder="수정할 수 없습니다" value="읽기 전용 값" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-10" placeholder="검색..." />
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-10" type="email" placeholder="이메일" />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-10" type="password" placeholder="비밀번호" />
      </div>
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-10" type="number" placeholder="금액" />
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  name: "폼 사용 예시",
  render: () => (
    <div className="space-y-4 w-[350px] p-6 border rounded-lg">
      <h3 className="text-heading-5">회원가입</h3>
      <div className="space-y-2">
        <Label htmlFor="name">이름 *</Label>
        <Input id="name" placeholder="홍길동" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">이메일 *</Label>
        <Input id="email" type="email" placeholder="example@email.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">비밀번호 *</Label>
        <Input id="password" type="password" placeholder="8자 이상 입력" />
        <p className="text-caption text-muted-foreground">
          영문, 숫자, 특수문자를 조합해주세요.
        </p>
      </div>
    </div>
  ),
};

