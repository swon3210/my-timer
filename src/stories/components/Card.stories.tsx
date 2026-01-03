import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "다양한 variants와 interactive 상태를 지원하는 카드 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "elevated",
        "outline",
        "ghost",
        "filled",
        "success",
        "warning",
        "destructive",
        "info",
      ],
    },
    interactive: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드에 대한 설명이 들어갑니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body-sm">카드 컨텐츠가 이 영역에 표시됩니다.</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">취소</Button>
        <Button>확인</Button>
      </CardFooter>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
      <Card variant="default" className="p-4">
        <p className="text-label">Default</p>
        <p className="text-caption text-muted-foreground">기본 카드</p>
      </Card>
      <Card variant="elevated" className="p-4">
        <p className="text-label">Elevated</p>
        <p className="text-caption text-muted-foreground">높은 그림자</p>
      </Card>
      <Card variant="outline" className="p-4">
        <p className="text-label">Outline</p>
        <p className="text-caption text-muted-foreground">테두리만</p>
      </Card>
      <Card variant="ghost" className="p-4">
        <p className="text-label">Ghost</p>
        <p className="text-caption text-muted-foreground">배경 없음</p>
      </Card>
      <Card variant="filled" className="p-4">
        <p className="text-label">Filled</p>
        <p className="text-caption text-muted-foreground">채워진 배경</p>
      </Card>
    </div>
  ),
};

export const SemanticVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      <Card variant="success" className="p-4">
        <p className="text-label">Success</p>
        <p className="text-caption">작업이 완료되었습니다.</p>
      </Card>
      <Card variant="warning" className="p-4">
        <p className="text-label">Warning</p>
        <p className="text-caption">주의가 필요합니다.</p>
      </Card>
      <Card variant="destructive" className="p-4">
        <p className="text-label">Destructive</p>
        <p className="text-caption">오류가 발생했습니다.</p>
      </Card>
      <Card variant="info" className="p-4">
        <p className="text-label">Info</p>
        <p className="text-caption">참고 정보입니다.</p>
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-caption text-muted-foreground">
        클릭 가능한 카드는 호버 시 그림자가 커지고 클릭 시 살짝 눌리는 효과가
        있습니다.
      </p>
      <div className="flex gap-4">
        <Card interactive className="p-6 w-48 cursor-pointer">
          <p className="text-label">클릭 가능</p>
          <p className="text-caption text-muted-foreground">hover me!</p>
        </Card>
        <Card interactive variant="success" className="p-6 w-48 cursor-pointer">
          <p className="text-label text-success">완료된 항목</p>
          <p className="text-caption">클릭해서 상세보기</p>
        </Card>
      </div>
    </div>
  ),
};

export const WithSizes: Story = {
  name: "Card Sizes (패딩)",
  render: () => (
    <div className="space-y-4">
      <Card className="w-[300px]">
        <CardHeader size="sm">
          <CardTitle>Small Padding</CardTitle>
        </CardHeader>
        <CardContent size="sm">
          <p className="text-body-sm">size=&quot;sm&quot; 적용</p>
        </CardContent>
      </Card>
      <Card className="w-[300px]">
        <CardHeader size="default">
          <CardTitle>Default Padding</CardTitle>
        </CardHeader>
        <CardContent size="default">
          <p className="text-body-sm">size=&quot;default&quot; 적용</p>
        </CardContent>
      </Card>
      <Card className="w-[300px]">
        <CardHeader size="lg">
          <CardTitle>Large Padding</CardTitle>
        </CardHeader>
        <CardContent size="lg">
          <p className="text-body-sm">size=&quot;lg&quot; 적용</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const ComplexExample: Story = {
  name: "실제 사용 예시",
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>이번 달 지출</CardTitle>
          <Badge variant="soft-destructive">초과</Badge>
        </div>
        <CardDescription>2024년 1월 1일 ~ 31일</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-caption text-muted-foreground">총 지출</p>
          <p className="text-heading-3 text-destructive">2,150,000원</p>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">예산</span>
          <span>2,000,000원</span>
        </div>
        <div className="h-2 bg-destructive-light rounded-full overflow-hidden">
          <div className="h-full bg-destructive w-[107%]" />
        </div>
        <p className="text-caption text-destructive">예산 대비 107.5% 사용</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          상세 내역 보기
        </Button>
      </CardFooter>
    </Card>
  ),
};

