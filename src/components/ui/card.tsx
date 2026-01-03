import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-xl border text-card-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-card shadow-sm",
        elevated: "bg-card shadow-md hover:shadow-lg",
        outline: "bg-transparent border-2",
        ghost: "bg-transparent border-0 shadow-none",
        filled: "bg-muted border-0",
        
        // Semantic variants
        success: "bg-success-light border-success/20",
        warning: "bg-warning-light border-warning/20",
        destructive: "bg-destructive-light border-destructive/20",
        info: "bg-info-light border-info/20",
      },
      size: {
        sm: "",
        default: "",
        lg: "",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-md active:scale-[0.99]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, interactive, className }))}
      {...props}
    />
  )
)
Card.displayName = "Card"

const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    size: {
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ size, className }))}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-heading-5", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-body-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const cardContentVariants = cva("", {
  variants: {
    size: {
      sm: "p-4 pt-0",
      default: "p-6 pt-0",
      lg: "p-8 pt-0",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, ...props }, ref) => (
    <div ref={ref} className={cn(cardContentVariants({ size, className }))} {...props} />
  )
)
CardContent.displayName = "CardContent"

const cardFooterVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "p-4 pt-0",
      default: "p-6 pt-0",
      lg: "p-8 pt-0",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ size, className }))}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  cardVariants,
  cardHeaderVariants,
  cardContentVariants,
  cardFooterVariants,
}
