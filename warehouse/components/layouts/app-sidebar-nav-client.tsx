"use client";

import dynamic from "next/dynamic";

const AppSidebarNav = dynamic(
  () => import("./app-sidebar-nav").then((mod) => mod.AppSidebarNav),
  { ssr: false }
);

export function AppSidebarNavClient() {
  return <AppSidebarNav />;
}
