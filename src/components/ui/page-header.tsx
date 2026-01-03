import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

const pageHeaderVariants = cva(
  "sticky top-0 z-sticky flex items-center justify-between bg-background transition-all duration-300",
  {
    variants: {
      size: {
        sm: "h-12 px-3",
        default: "h-14 px-4",
        lg: "h-16 px-6",
      },
      border: {
        true: "border-b border-border",
        false: "",
      },
      shadow: {
        true: "shadow-sm",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      border: false,
      shadow: false,
    },
  }
)

export interface PageHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pageHeaderVariants> {
  title?: string
  subtitle?: string
  showBackButton?: boolean
  onBack?: () => void
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
}

const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  (
    {
      className,
      size,
      border,
      shadow,
      title,
      subtitle,
      showBackButton = false,
      onBack,
      leftSlot,
      rightSlot,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={cn(pageHeaderVariants({ size, border, shadow, className }))}
        {...props}
      >
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onBack}
              className="mr-1"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">뒤로 가기</span>
            </Button>
          )}
          {leftSlot}
          {(title || subtitle) && (
            <div className="flex flex-col">
              {title && (
                <h1 className="text-heading-5 truncate">{title}</h1>
              )}
              {subtitle && (
                <p className="text-caption text-muted-foreground truncate">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
        
        {children}
        
        {rightSlot && (
          <div className="flex items-center gap-2">{rightSlot}</div>
        )}
      </header>
    )
  }
)
PageHeader.displayName = "PageHeader"

export { PageHeader, pageHeaderVariants }

