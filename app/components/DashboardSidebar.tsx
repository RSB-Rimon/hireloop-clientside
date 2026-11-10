"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Banknote,
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  LayoutGrid,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "../lib/auth-client"

type UserRole = "seeker" | "recruiter" | "admin"

type MenuItem = {
  name: string
  url: string
  icon: LucideIcon
}

const menuItemsByRole: Record<UserRole, MenuItem[]> = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutGrid },
    { name: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
    { name: "Saved Jobs", url: "/dashboard/seeker/saved", icon: Bookmark },
    {
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    { name: "Billing", url: "/dashboard/seeker/billing", icon: Banknote },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutGrid },
    {
      name: "My Company",
      url: "/dashboard/recruiter/company",
      icon: Building2,
    },
    { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
    {
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutGrid },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    {
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { name: "Payments", url: "/dashboard/admin/payments", icon: Banknote },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const role: UserRole = session?.user?.role ?? "seeker"

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role]?.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  isActive={pathname === item.url}
                  render={<Link href={item.url} />}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
