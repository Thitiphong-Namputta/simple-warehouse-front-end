"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";

export function AppHeader({ title }: { title?: string }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex items-center w-full px-1">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1>{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Link href="https://github.com/Thitiphong-Namputta/simple-warehouse-front-end">
            <Button variant="ghost" size="icon">
              <Github />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
