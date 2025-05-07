"use client";

import { Separator } from "@school-clerk/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@school-clerk/ui/sidebar";

import { AppSideBar } from "./app-side-bar";
import { SidebarContext } from "./context";

export function SideBar({ children }) {
  return (
    <SidebarProvider>
      <SidebarContext args={[]}>
        <AppSideBar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1 size-4" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarContext>
    </SidebarProvider>
  );
}
