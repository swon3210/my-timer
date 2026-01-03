import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const TypographyRow = ({
  className,
  name,
  specs,
}: {
  className: string;
  name: string;
  specs: string;
}) => (
  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-4 border-b border-border">
    <div className="w-40 shrink-0">
      <p className="text-label text-muted-foreground">{name}</p>
      <p className="text-caption text-muted-foreground font-mono">{specs}</p>
    </div>
    <div className={className}>
      다람쥐 헌 쳇바퀴에 타고파 The quick brown fox jumps over the lazy dog
    </div>
  </div>
);

const TypographyShowcase = () => {
  return (
    <div className="space-y-10 p-6 max-w-4xl">
      <div>
        <h1 className="text-heading-1 mb-2">타이포그래피</h1>
        <p className="text-body text-muted-foreground">
          Pretendard 폰트를 기반으로 한 타이포그래피 시스템입니다. 일관된 텍스트
          스타일을 위해 미리 정의된 클래스를 사용하세요.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-heading-3 mb-4">Headings</h2>
        <TypographyRow
          className="text-heading-1"
          name="Heading 1"
          specs="36px / Bold"
        />
        <TypographyRow
          className="text-heading-2"
          name="Heading 2"
          specs="30px / Bold"
        />
        <TypographyRow
          className="text-heading-3"
          name="Heading 3"
          specs="24px / Semibold"
        />
        <TypographyRow
          className="text-heading-4"
          name="Heading 4"
          specs="20px / Semibold"
        />
        <TypographyRow
          className="text-heading-5"
          name="Heading 5"
          specs="18px / Semibold"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-heading-3 mb-4">Body</h2>
        <TypographyRow
          className="text-body-lg"
          name="Body Large"
          specs="18px / Normal"
        />
        <TypographyRow
          className="text-body"
          name="Body"
          specs="16px / Normal"
        />
        <TypographyRow
          className="text-body-sm"
          name="Body Small"
          specs="14px / Normal"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-heading-3 mb-4">Utility</h2>
        <TypographyRow
          className="text-caption"
          name="Caption"
          specs="12px / Normal"
        />
        <TypographyRow
          className="text-label"
          name="Label"
          specs="14px / Medium"
        />
        <TypographyRow
          className="text-overline"
          name="Overline"
          specs="12px / Semibold / Uppercase"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-heading-3">사용 예시</h2>
        <div className="bg-muted p-4 rounded-lg">
          <pre className="text-sm font-mono overflow-x-auto">
{`<h1 className="text-heading-1">페이지 타이틀</h1>
<h2 className="text-heading-3">섹션 타이틀</h2>
<p className="text-body text-muted-foreground">설명 텍스트</p>
<span className="text-caption text-muted-foreground">2024.01.15</span>
<label className="text-label">입력 필드 라벨</label>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

const meta: Meta = {
  title: "Foundations/Typography",
  component: TypographyShowcase,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Pretendard 폰트 기반의 타이포그래피 시스템입니다. 헤딩, 본문, 유틸리티 텍스트 스타일을 제공합니다.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TypographyShowcase>;

export const Default: Story = {};

