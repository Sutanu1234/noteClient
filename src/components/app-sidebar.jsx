"use client"

import {
  Crown,
  Home,
  NotepadTextIcon,
  Users,
} from "lucide-react"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  projects: [
    { name: "Home", url: "/", icon: Home },
    { name: "All Notes", url: "/notes", icon: NotepadTextIcon },
    { name: "Members", url: "/members", icon: Users },
    { name: "Subscription", url: "/sub", icon: Crown },
  ],
}

export function AppSidebar({ role, ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} role={role} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
