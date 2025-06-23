import { Suspense } from "react";
import Link from "next/link";
import { GlobalSheets } from "@/components/sheets/global-sheets";
import { SideBar } from "@/components/sidebar/sidebar";
import { HydrateClient } from "@/trpc/server";

export default async function Layout({ children, params }) {
  return (
    <HydrateClient>
      <SideBar>
        <div className="p-2">{children}</div>
        {/*  */}
        <Suspense>
          <GlobalSheets />
        </Suspense>
      </SideBar>
    </HydrateClient>
  );
}
