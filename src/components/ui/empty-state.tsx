import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "py-8 gap-2",
        default: "py-12 gap-3",
        lg: "py-16 gap-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, size, icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(emptyStateVariants({ size, className }))}
      {...props}
    >
      {icon && (
        <div className="text-muted-foreground mb-2">{icon}</div>
      )}
      <div className="space-y-1">
        <h3 className="text-heading-5 text-foreground">{title}</h3>
        {description && (
          <p className="text-body-sm text-muted-foreground max-w-sm">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
)
EmptyState.displayName = "EmptyState"

export { EmptyState, emptyStateVariants }

