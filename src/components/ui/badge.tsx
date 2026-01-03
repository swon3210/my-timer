import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Core variants
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline: 
          "text-foreground border-border",
        ghost:
          "border-transparent bg-transparent text-foreground",
        
        // Semantic variants (solid)
        success:
          "border-transparent bg-success text-success-foreground shadow-sm",
        warning:
          "border-transparent bg-warning text-warning-foreground shadow-sm",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm",
        info:
          "border-transparent bg-info text-info-foreground shadow-sm",
        
        // Semantic variants (soft/light)
        "soft-primary":
          "border-transparent bg-primary-light text-primary",
        "soft-success":
          "border-transparent bg-success-light text-success",
        "soft-warning":
          "border-transparent bg-warning-light text-warning",
        "soft-destructive":
          "border-transparent bg-destructive-light text-destructive",
        "soft-info":
          "border-transparent bg-info-light text-info",
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded",
        default: "px-2.5 py-0.5 text-xs rounded-md",
        lg: "px-3 py-1 text-sm rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
