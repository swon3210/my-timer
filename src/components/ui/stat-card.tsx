import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Card } from "./card"

const statCardVariants = cva("", {
  variants: {
    variant: {
      default: "",
      success: "",
      warning: "",
      info: "",
      destructive: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const statIconVariants = cva(
  "flex items-center justify-center rounded-lg p-2",
  {
    variants: {
      variant: {
        default: "bg-primary-light text-primary",
        success: "bg-success-light text-success",
        warning: "bg-warning-light text-warning",
        info: "bg-info-light text-info",
        destructive: "bg-destructive-light text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const statValueVariants = cva("text-heading-3 font-bold", {
  variants: {
    variant: {
      default: "text-foreground",
      success: "text-success",
      warning: "text-warning",
      info: "text-info",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  icon?: React.ReactNode
  label: string
  value: string | number
  subValue?: string
  trend?: {
    value: number
    label?: string
  }
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    { className, variant, icon, label, value, subValue, trend, ...props },
    ref
  ) => (
    <Card
      ref={ref}
      className={cn("p-4", statCardVariants({ variant, className }))}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-label text-muted-foreground">{label}</p>
          <p className={cn(statValueVariants({ variant }))}>{value}</p>
          {subValue && (
            <p className="text-caption text-muted-foreground">{subValue}</p>
          )}
        </div>
        {icon && (
          <div className={cn(statIconVariants({ variant }))}>{icon}</div>
        )}
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <span
            className={cn(
              "text-caption font-medium",
              trend.value >= 0 ? "text-success" : "text-destructive"
            )}
          >
            {trend.value >= 0 ? "+" : ""}
            {trend.value}%
          </span>
          {trend.label && (
            <span className="text-caption text-muted-foreground">
              {trend.label}
            </span>
          )}
        </div>
      )}
    </Card>
  )
)
StatCard.displayName = "StatCard"

export { StatCard, statCardVariants }

