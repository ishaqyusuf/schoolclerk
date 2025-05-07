"use client";

import { Suspense } from "react";
import Link from "next/link";
import { GlobalSheets } from "@/components/sheets/global-sheets";
import { SideBar } from "@/components/sidebar/sidebar";

export default function Layout({ children, params }) {
  return (
    <>
      <SideBar>
        <div className="p-2">{children}</div>
        <Suspense>
          <GlobalSheets />
        </Suspense>
      </SideBar>
    </>
  );
}
