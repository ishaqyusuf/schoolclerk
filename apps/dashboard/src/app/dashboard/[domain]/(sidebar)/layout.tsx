"use client";

import { SideBar } from "@/components/sidebar/sidebar";

export default function Layout({ children, params }) {
  return (
    <SideBar>
      <div className="p-2">{children}</div>
    </SideBar>
  );
}
