import Link from "next/link";
import { auth } from "@/auth";
import { Warehouse } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AppUser } from "./app-user";
import { AppSidebarNav } from "./app-sidebar-nav";

export async function AppSidebar() {
  const session = await auth();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Warehouse />
                <span className="text-base font-semibold">Warehouse co.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <AppSidebarNav />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AppUser
          user={{
            name: session?.user?.name ?? "Unknown",
            email: session?.user?.email ?? "",
            avatar: session?.user?.image ?? "/avatar.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
