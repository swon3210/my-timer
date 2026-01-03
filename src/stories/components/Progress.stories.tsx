import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Progress } from "@/components/ui/progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "진행률을 표시하는 프로그레스 바 컴포넌트입니다. 다양한 variants와 sizes를 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "success",
        "warning",
        "destructive",
        "info",
        "muted",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "xl"],
    },
    value: {
      control: { type: "range", min: 0, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-[400px]">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Default</span>
          <span>60%</span>
        </div>
        <Progress value={60} variant="default" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Success</span>
          <span>100%</span>
        </div>
        <Progress value={100} variant="success" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Warning</span>
          <span>75%</span>
        </div>
        <Progress value={75} variant="warning" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Destructive</span>
          <span>90%</span>
        </div>
        <Progress value={90} variant="destructive" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Info</span>
          <span>45%</span>
        </div>
        <Progress value={45} variant="info" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-[400px]">
      <div className="space-y-2">
        <span className="text-caption">Extra Small (xs)</span>
        <Progress value={60} size="xs" />
      </div>
      <div className="space-y-2">
        <span className="text-caption">Small (sm)</span>
        <Progress value={60} size="sm" />
      </div>
      <div className="space-y-2">
        <span className="text-caption">Default</span>
        <Progress value={60} size="default" />
      </div>
      <div className="space-y-2">
        <span className="text-caption">Large (lg)</span>
        <Progress value={60} size="lg" />
      </div>
      <div className="space-y-2">
        <span className="text-caption">Extra Large (xl)</span>
        <Progress value={60} size="xl" />
      </div>
    </div>
  ),
};

export const BudgetUsageExample: Story = {
  name: "예산 사용량 예시",
  render: () => {
    const budgetUsed = 1500000;
    const budgetTotal = 2000000;
    const percentage = Math.round((budgetUsed / budgetTotal) * 100);

    const getVariant = (pct: number) => {
      if (pct >= 100) return "destructive";
      if (pct >= 80) return "warning";
      return "default";
    };

    return (
      <div className="w-[350px] p-4 border rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-label">이번 달 예산</span>
          <span className="text-caption text-muted-foreground">
            {budgetUsed.toLocaleString()}원 / {budgetTotal.toLocaleString()}원
          </span>
        </div>
        <Progress value={percentage} variant={getVariant(percentage)} size="lg" />
        <div className="flex justify-between text-sm">
          <span className={percentage >= 80 ? "text-warning" : "text-muted-foreground"}>
            {percentage}% 사용
          </span>
          <span className="text-muted-foreground">
            {(budgetTotal - budgetUsed).toLocaleString()}원 남음
          </span>
        </div>
      </div>
    );
  },
};

export const GoalProgressExample: Story = {
  name: "목표 진행률 예시",
  render: () => {
    const goals = [
      { name: "여행 저금", current: 800000, target: 1000000 },
      { name: "비상금", current: 3000000, target: 5000000 },
      { name: "자동차 구매", current: 15000000, target: 30000000 },
    ];

    return (
      <div className="w-[350px] space-y-4">
        {goals.map((goal) => {
          const percentage = Math.round((goal.current / goal.target) * 100);
          return (
            <div key={goal.name} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-label">{goal.name}</span>
                <span className="text-caption text-muted-foreground">
                  {percentage}%
                </span>
              </div>
              <Progress 
                value={percentage} 
                variant={percentage >= 100 ? "success" : "default"} 
              />
              <div className="flex justify-between text-caption text-muted-foreground">
                <span>{goal.current.toLocaleString()}원</span>
                <span>{goal.target.toLocaleString()}원</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

