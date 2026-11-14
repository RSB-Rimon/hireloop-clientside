import type { ComponentPropsWithoutRef, ElementType } from "react"
import { cn } from "cn"

type TypographyVariant =
  | "hero"
  | "pageTitle"
  | "authTitle"
  | "sectionTitle"
  | "body"
  | "support"
  | "note"
  | "lead"
  | "label"
  | "small"
  | "control"
  | "micro"
  | "data"
  | "componentTitle"

type TypographyProps<T extends ElementType> = {
  as?: T
  variant: TypographyVariant
} & Omit<ComponentPropsWithoutRef<T>, "as" | "variant">

const variantClasses: Record<TypographyVariant, string> = {
  hero: "type-hero",
  pageTitle: "type-page-title",
  authTitle: "type-auth-title",
  sectionTitle: "type-section-title",
  body: "type-body",
  support: "type-support",
  note: "type-note",
  lead: "type-lead",
  label: "type-label",
  small: "type-small",
  control: "type-control",
  micro: "type-micro",
  data: "type-data",
  componentTitle: "type-component-title",
}

export function Typography<T extends ElementType = "p">({
  as,
  variant,
  className,
  ...props
}: TypographyProps<T>) {
  const Component = as ?? "p"

  return (
    <Component className={cn(variantClasses[variant], className)} {...props} />
  )
}
