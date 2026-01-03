import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import TailwindCSSAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        "app-container": "1024px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          heavy: "hsl(var(--primary-heavy))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        // Semantic Colors
        success: {
          DEFAULT: "hsl(var(--success))",
          light: "hsl(var(--success-light))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          light: "hsl(var(--warning-light))",
          foreground: "hsl(var(--warning-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          light: "hsl(var(--destructive-light))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          light: "hsl(var(--info-light))",
          foreground: "hsl(var(--info-foreground))",
        },
        // Account Book Specific
        income: {
          DEFAULT: "hsl(var(--income))",
          light: "hsl(var(--income-light))",
          foreground: "hsl(var(--income-foreground))",
        },
        expense: {
          DEFAULT: "hsl(var(--expense))",
          light: "hsl(var(--expense-light))",
          foreground: "hsl(var(--expense-foreground))",
        },
        // Gallery Theme
        mint: {
          light: "hsl(var(--mint-light))",
          medium: "hsl(var(--mint-medium))",
          dark: "hsl(var(--mint-dark))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },
      spacing: {
        "space-1": "var(--space-1)",
        "space-2": "var(--space-2)",
        "space-3": "var(--space-3)",
        "space-4": "var(--space-4)",
        "space-5": "var(--space-5)",
        "space-6": "var(--space-6)",
        "space-8": "var(--space-8)",
        "space-10": "var(--space-10)",
        "space-12": "var(--space-12)",
        "space-16": "var(--space-16)",
      },
      fontSize: {
        xs: ["var(--font-size-xs)", { lineHeight: "var(--line-height-normal)" }],
        sm: ["var(--font-size-sm)", { lineHeight: "var(--line-height-normal)" }],
        base: ["var(--font-size-base)", { lineHeight: "var(--line-height-normal)" }],
        lg: ["var(--font-size-lg)", { lineHeight: "var(--line-height-normal)" }],
        xl: ["var(--font-size-xl)", { lineHeight: "var(--line-height-tight)" }],
        "2xl": ["var(--font-size-2xl)", { lineHeight: "var(--line-height-tight)" }],
        "3xl": ["var(--font-size-3xl)", { lineHeight: "var(--line-height-tight)" }],
        "4xl": ["var(--font-size-4xl)", { lineHeight: "var(--line-height-tight)" }],
      },
      zIndex: {
        dropdown: "var(--z-dropdown)",
        sticky: "var(--z-sticky)",
        fixed: "var(--z-fixed)",
        "modal-backdrop": "var(--z-modal-backdrop)",
        modal: "var(--z-modal)",
        popover: "var(--z-popover)",
        tooltip: "var(--z-tooltip)",
      },
    },
  },
  plugins: [
    TailwindCSSAnimate,
    plugin(({ addUtilities }) => {
      const newUtilities = {
        ".scrollbar-hidden::-webkit-scrollbar": {
          display: "none",
        },
        ".scrollbar-hidden": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };

      addUtilities(newUtilities);
    }),
    // Typography Plugin for consistent text styles
    plugin(({ addComponents }) => {
      addComponents({
        // Headings
        ".text-heading-1": {
          fontSize: "var(--font-size-4xl)",
          fontWeight: "var(--font-weight-bold)",
          lineHeight: "var(--line-height-tight)",
          letterSpacing: "-0.02em",
        },
        ".text-heading-2": {
          fontSize: "var(--font-size-3xl)",
          fontWeight: "var(--font-weight-bold)",
          lineHeight: "var(--line-height-tight)",
          letterSpacing: "-0.01em",
        },
        ".text-heading-3": {
          fontSize: "var(--font-size-2xl)",
          fontWeight: "var(--font-weight-semibold)",
          lineHeight: "var(--line-height-tight)",
        },
        ".text-heading-4": {
          fontSize: "var(--font-size-xl)",
          fontWeight: "var(--font-weight-semibold)",
          lineHeight: "var(--line-height-tight)",
        },
        ".text-heading-5": {
          fontSize: "var(--font-size-lg)",
          fontWeight: "var(--font-weight-semibold)",
          lineHeight: "var(--line-height-normal)",
        },
        // Body
        ".text-body-lg": {
          fontSize: "var(--font-size-lg)",
          fontWeight: "var(--font-weight-normal)",
          lineHeight: "var(--line-height-relaxed)",
        },
        ".text-body": {
          fontSize: "var(--font-size-base)",
          fontWeight: "var(--font-weight-normal)",
          lineHeight: "var(--line-height-normal)",
        },
        ".text-body-sm": {
          fontSize: "var(--font-size-sm)",
          fontWeight: "var(--font-weight-normal)",
          lineHeight: "var(--line-height-normal)",
        },
        // Caption & Label
        ".text-caption": {
          fontSize: "var(--font-size-xs)",
          fontWeight: "var(--font-weight-normal)",
          lineHeight: "var(--line-height-normal)",
        },
        ".text-label": {
          fontSize: "var(--font-size-sm)",
          fontWeight: "var(--font-weight-medium)",
          lineHeight: "var(--line-height-normal)",
        },
        ".text-overline": {
          fontSize: "var(--font-size-xs)",
          fontWeight: "var(--font-weight-semibold)",
          lineHeight: "var(--line-height-normal)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        },
      });
    }),
  ],
};
export default config;
