import type { ReactNode } from "react"
import { cn } from "cn"

type AuthSubmitButtonProps = {
  children: ReactNode
  disabled?: boolean
  className?: string
}

export function AuthSubmitButton({
  children,
  disabled = false,
  className,
}: AuthSubmitButtonProps) {
  return (
    <button
      className={cn("auth-submit", className)}
      disabled={disabled}
      type="submit"
    >
      {children}
    </button>
  )
}
