import type { InputHTMLAttributes } from "react"
import { cn } from "cn"

export function AuthInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("auth-input", className)} {...props} />
}
