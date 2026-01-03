import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const SpacingBlock = ({
  name,
  value,
  cssVar,
}: {
  name: string;
  value: string;
  cssVar: string;
}) => (
  <div className="flex items-center gap-4">
    <div
      className="bg-primary h-8 rounded"
      style={{ width: value }}
    />
    <div className="flex-1">
      <p className="text-label">{name}</p>
      <p className="text-caption text-muted-foreground font-mono">
        {cssVar} = {value}
      </p>
    </div>
  </div>
);

const RadiusBlock = ({
  name,
  cssVar,
  className,
}: {
  name: string;
  cssVar: string;
  className: string;
}) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className={`w-20 h-20 bg-primary ${className}`}
    />
    <div className="text-center">
      <p className="text-label">{name}</p>
      <p className="text-caption text-muted-foreground font-mono">{cssVar}</p>
    </div>
  </div>
);

const ShadowBlock = ({
  name,
  className,
}: {
  name: string;
  className: string;
}) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className={`w-24 h-24 bg-card rounded-lg ${className}`}
    />
    <p className="text-label">{name}</p>
  </div>
);

const SpacingShowcase = () => {
  return (
    <div className="space-y-12 p-6 max-w-4xl">
      <div>
        <h1 className="text-heading-1 mb-2">간격 & 크기</h1>
        <p className="text-body text-muted-foreground">
          4px 기반의 간격 시스템과 일관된 border-radius, shadow 스케일입니다.
        </p>
      </div>

      {/* Spacing */}
      <div className="space-y-4">
        <h2 className="text-heading-3">Spacing Scale (4px 기반)</h2>
        <p className="text-body-sm text-muted-foreground mb-4">
          모든 간격은 4px의 배수로 구성되어 있습니다. padding, margin, gap 등에
          사용하세요.
        </p>
        <div className="space-y-3">
          <SpacingBlock name="space-1" value="4px" cssVar="--space-1" />
          <SpacingBlock name="space-2" value="8px" cssVar="--space-2" />
          <SpacingBlock name="space-3" value="12px" cssVar="--space-3" />
          <SpacingBlock name="space-4" value="16px" cssVar="--space-4" />
          <SpacingBlock name="space-5" value="20px" cssVar="--space-5" />
          <SpacingBlock name="space-6" value="24px" cssVar="--space-6" />
          <SpacingBlock name="space-8" value="32px" cssVar="--space-8" />
          <SpacingBlock name="space-10" value="40px" cssVar="--space-10" />
          <SpacingBlock name="space-12" value="48px" cssVar="--space-12" />
          <SpacingBlock name="space-16" value="64px" cssVar="--space-16" />
        </div>
      </div>

      {/* Border Radius */}
      <div className="space-y-4">
        <h2 className="text-heading-3">Border Radius</h2>
        <p className="text-body-sm text-muted-foreground mb-4">
          일관된 둥글기 시스템입니다. 컴포넌트 크기에 따라 적절한 radius를
          선택하세요.
        </p>
        <div className="flex flex-wrap gap-6">
          <RadiusBlock name="rounded-sm" cssVar="--radius-sm (4px)" className="rounded-sm" />
          <RadiusBlock name="rounded-md" cssVar="--radius (8px)" className="rounded-md" />
          <RadiusBlock name="rounded-lg" cssVar="--radius-lg (12px)" className="rounded-lg" />
          <RadiusBlock name="rounded-xl" cssVar="--radius-xl (16px)" className="rounded-xl" />
          <RadiusBlock name="rounded-2xl" cssVar="--radius-2xl (24px)" className="rounded-2xl" />
          <RadiusBlock name="rounded-full" cssVar="--radius-full" className="rounded-full" />
        </div>
      </div>

      {/* Shadows */}
      <div className="space-y-4">
        <h2 className="text-heading-3">Shadows</h2>
        <p className="text-body-sm text-muted-foreground mb-4">
          5단계 그림자 스케일입니다. UI 요소의 깊이와 계층을 나타냅니다.
        </p>
        <div className="flex flex-wrap gap-8 py-8">
          <ShadowBlock name="shadow-xs" className="shadow-xs" />
          <ShadowBlock name="shadow-sm" className="shadow-sm" />
          <ShadowBlock name="shadow-md" className="shadow-md" />
          <ShadowBlock name="shadow-lg" className="shadow-lg" />
          <ShadowBlock name="shadow-xl" className="shadow-xl" />
        </div>
      </div>

      {/* Z-Index */}
      <div className="space-y-4">
        <h2 className="text-heading-3">Z-Index Scale</h2>
        <p className="text-body-sm text-muted-foreground mb-4">
          레이어 관리를 위한 z-index 시스템입니다.
        </p>
        <div className="bg-muted p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-label">Name</th>
                <th className="text-left py-2 text-label">Value</th>
                <th className="text-left py-2 text-label">Usage</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              <tr className="border-b border-border">
                <td className="py-2">z-dropdown</td>
                <td className="py-2">100</td>
                <td className="py-2 font-sans">드롭다운 메뉴</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">z-sticky</td>
                <td className="py-2">200</td>
                <td className="py-2 font-sans">고정 헤더</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">z-fixed</td>
                <td className="py-2">300</td>
                <td className="py-2 font-sans">고정 요소</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">z-modal-backdrop</td>
                <td className="py-2">400</td>
                <td className="py-2 font-sans">모달 배경</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">z-modal</td>
                <td className="py-2">500</td>
                <td className="py-2 font-sans">모달</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">z-popover</td>
                <td className="py-2">600</td>
                <td className="py-2 font-sans">팝오버</td>
              </tr>
              <tr>
                <td className="py-2">z-tooltip</td>
                <td className="py-2">700</td>
                <td className="py-2 font-sans">툴팁</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const meta: Meta = {
  title: "Foundations/Spacing & Sizing",
  component: SpacingShowcase,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "4px 기반의 간격 시스템과 border-radius, shadow, z-index 스케일입니다.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SpacingShowcase>;

export const Default: Story = {};

