import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const ColorSwatch = ({
  name,
  cssVar,
  className,
}: {
  name: string;
  cssVar: string;
  className: string;
}) => (
  <div className="flex items-center gap-3">
    <div
      className={`w-16 h-16 rounded-lg shadow-sm border border-border ${className}`}
    />
    <div>
      <p className="font-medium text-sm">{name}</p>
      <p className="text-xs text-muted-foreground font-mono">{cssVar}</p>
    </div>
  </div>
);

const ColorSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <h3 className="text-heading-4 border-b pb-2">{title}</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {children}
    </div>
  </div>
);

const ColorsShowcase = () => {
  return (
    <div className="space-y-10 p-6 max-w-5xl">
      <div>
        <h1 className="text-heading-1 mb-2">컬러 시스템</h1>
        <p className="text-body text-muted-foreground">
          My Timer 프로젝트의 색상 체계입니다. 모든 색상은 CSS 변수로 정의되어
          있으며 다크 모드를 지원합니다.
        </p>
      </div>

      <ColorSection title="Core Colors">
        <ColorSwatch
          name="Background"
          cssVar="--background"
          className="bg-background"
        />
        <ColorSwatch
          name="Foreground"
          cssVar="--foreground"
          className="bg-foreground"
        />
        <ColorSwatch name="Card" cssVar="--card" className="bg-card" />
        <ColorSwatch name="Border" cssVar="--border" className="bg-border" />
        <ColorSwatch name="Input" cssVar="--input" className="bg-input" />
        <ColorSwatch name="Ring" cssVar="--ring" className="bg-ring" />
      </ColorSection>

      <ColorSection title="Brand Colors (Primary)">
        <ColorSwatch
          name="Primary"
          cssVar="--primary"
          className="bg-primary"
        />
        <ColorSwatch
          name="Primary Heavy"
          cssVar="--primary-heavy"
          className="bg-primary-heavy"
        />
        <ColorSwatch
          name="Primary Light"
          cssVar="--primary-light"
          className="bg-primary-light"
        />
        <ColorSwatch
          name="Primary Foreground"
          cssVar="--primary-foreground"
          className="bg-primary-foreground"
        />
      </ColorSection>

      <ColorSection title="Secondary & Muted">
        <ColorSwatch
          name="Secondary"
          cssVar="--secondary"
          className="bg-secondary"
        />
        <ColorSwatch
          name="Secondary Foreground"
          cssVar="--secondary-foreground"
          className="bg-secondary-foreground"
        />
        <ColorSwatch name="Muted" cssVar="--muted" className="bg-muted" />
        <ColorSwatch
          name="Muted Foreground"
          cssVar="--muted-foreground"
          className="bg-muted-foreground"
        />
        <ColorSwatch name="Accent" cssVar="--accent" className="bg-accent" />
        <ColorSwatch
          name="Accent Foreground"
          cssVar="--accent-foreground"
          className="bg-accent-foreground"
        />
      </ColorSection>

      <ColorSection title="Semantic Colors">
        <ColorSwatch
          name="Success"
          cssVar="--success"
          className="bg-success"
        />
        <ColorSwatch
          name="Success Light"
          cssVar="--success-light"
          className="bg-success-light"
        />
        <ColorSwatch
          name="Warning"
          cssVar="--warning"
          className="bg-warning"
        />
        <ColorSwatch
          name="Warning Light"
          cssVar="--warning-light"
          className="bg-warning-light"
        />
        <ColorSwatch
          name="Destructive"
          cssVar="--destructive"
          className="bg-destructive"
        />
        <ColorSwatch
          name="Destructive Light"
          cssVar="--destructive-light"
          className="bg-destructive-light"
        />
        <ColorSwatch name="Info" cssVar="--info" className="bg-info" />
        <ColorSwatch
          name="Info Light"
          cssVar="--info-light"
          className="bg-info-light"
        />
      </ColorSection>

      <ColorSection title="가계부 서비스 (Income/Expense)">
        <ColorSwatch
          name="Income"
          cssVar="--income"
          className="bg-income"
        />
        <ColorSwatch
          name="Income Light"
          cssVar="--income-light"
          className="bg-income-light"
        />
        <ColorSwatch
          name="Expense"
          cssVar="--expense"
          className="bg-expense"
        />
        <ColorSwatch
          name="Expense Light"
          cssVar="--expense-light"
          className="bg-expense-light"
        />
      </ColorSection>

      <ColorSection title="갤러리 서비스 (Mint)">
        <ColorSwatch
          name="Mint Light"
          cssVar="--mint-light"
          className="bg-mint-light"
        />
        <ColorSwatch
          name="Mint Medium"
          cssVar="--mint-medium"
          className="bg-mint-medium"
        />
        <ColorSwatch
          name="Mint Dark"
          cssVar="--mint-dark"
          className="bg-mint-dark"
        />
      </ColorSection>

      <ColorSection title="Chart Colors">
        <ColorSwatch
          name="Chart 1"
          cssVar="--chart-1"
          className="bg-chart-1"
        />
        <ColorSwatch
          name="Chart 2"
          cssVar="--chart-2"
          className="bg-chart-2"
        />
        <ColorSwatch
          name="Chart 3"
          cssVar="--chart-3"
          className="bg-chart-3"
        />
        <ColorSwatch
          name="Chart 4"
          cssVar="--chart-4"
          className="bg-chart-4"
        />
        <ColorSwatch
          name="Chart 5"
          cssVar="--chart-5"
          className="bg-chart-5"
        />
      </ColorSection>
    </div>
  );
};

const meta: Meta = {
  title: "Foundations/Colors",
  component: ColorsShowcase,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "My Timer 프로젝트의 컬러 시스템입니다. 모든 색상은 CSS 변수로 정의되어 다크 모드를 지원합니다.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ColorsShowcase>;

export const Default: Story = {};

