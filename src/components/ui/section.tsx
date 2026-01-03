import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "",
      sm: "py-4",
      default: "py-6",
      lg: "py-8",
      xl: "py-12",
    },
    background: {
      default: "",
      muted: "bg-muted",
      card: "bg-card",
      primary: "bg-primary-light",
    },
  },
  defaultVariants: {
    spacing: "default",
    background: "default",
  },
})

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, background, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ spacing, background, className }))}
      {...props}
    />
  )
)
Section.displayName = "Section"

// Section Header Component
const sectionHeaderVariants = cva("flex items-center justify-between", {
  variants: {
    spacing: {
      sm: "mb-3",
      default: "mb-4",
      lg: "mb-6",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
})

export interface SectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionHeaderVariants> {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, spacing, title, subtitle, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(sectionHeaderVariants({ spacing, className }))}
      {...props}
    >
      <div>
        <h2 className="text-heading-4">{title}</h2>
        {subtitle && (
          <p className="text-body-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
)
SectionHeader.displayName = "SectionHeader"

export { Section, SectionHeader, sectionVariants, sectionHeaderVariants }

