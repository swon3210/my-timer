import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "./label"

const formFieldVariants = cva("space-y-2", {
  variants: {
    size: {
      sm: "space-y-1",
      default: "space-y-2",
      lg: "space-y-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  label?: string
  description?: string
  error?: string
  required?: boolean
  htmlFor?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      className,
      size,
      label,
      description,
      error,
      required,
      htmlFor,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(formFieldVariants({ size, className }))}
      {...props}
    >
      {label && (
        <Label htmlFor={htmlFor} className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      {description && (
        <p className="text-caption text-muted-foreground">{description}</p>
      )}
      {children}
      {error && (
        <p className="text-caption text-destructive">{error}</p>
      )}
    </div>
  )
)
FormField.displayName = "FormField"

// Form Actions Component (for button groups)
const formActionsVariants = cva("flex", {
  variants: {
    align: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    spacing: {
      sm: "gap-2",
      default: "gap-3",
      lg: "gap-4",
    },
    direction: {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      column: "flex-col",
    },
  },
  defaultVariants: {
    align: "end",
    spacing: "default",
    direction: "row",
  },
})

export interface FormActionsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formActionsVariants> {}

const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ className, align, spacing, direction, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(formActionsVariants({ align, spacing, direction, className }))}
      {...props}
    />
  )
)
FormActions.displayName = "FormActions"

export { FormField, FormActions, formFieldVariants, formActionsVariants }

