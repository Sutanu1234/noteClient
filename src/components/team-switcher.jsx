"use client";

import * as React from "react";
import { NotebookTabs } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <div className="flex justify-center gap-2 md:justify-start">
            <a
              href="#"
              className="flex items-center gap-2 font-medium text-[#eb9200]"
            >
              <div className="bg-[#eb9200] text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <NotebookTabs className="size-4" />
              </div>
              TeamScribe
            </a>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
