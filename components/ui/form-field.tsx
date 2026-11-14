import type { ReactNode } from "react"
import { cn } from "cn"

type FormFieldProps = {
  label: ReactNode
  children: ReactNode
  layout?: "stacked" | "auth"
  className?: string
}

export function FormField({
  label,
  children,
  layout = "stacked",
  className,
}: FormFieldProps) {
  return (
    <label
      className={cn(
        "type-label text-zinc-200",
        layout === "auth" ? "block space-y-2" : "grid gap-2",
        className
      )}
    >
      {label}
      {children}
    </label>
  )
}
