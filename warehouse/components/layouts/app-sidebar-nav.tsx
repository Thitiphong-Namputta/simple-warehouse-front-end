"use client";

import Link from "next/link";
import {
  ChartNoAxesCombined,
  Store,
  ClipboardList,
  Wallet,
  Settings,
  ChevronRight,
  Package,
  Tag,
  History,
  SlidersHorizontal,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/warehouse",
    icon: ChartNoAxesCombined,
    sub_items: [],
  },
  {
    title: "Inventory",
    url: "/warehouse/inventory",
    icon: Store,
    sub_items: [
      {
        title: "Products",
        url: "/warehouse/inventory",
        icon: Package,
      },
      {
        title: "Category",
        url: "/warehouse/inventory/category",
        icon: Tag,
      },
    ],
  },
  {
    title: "Orders",
    url: "/warehouse/orders",
    icon: ClipboardList,
    sub_items: [],
  },
  {
    title: "Payments",
    url: "/warehouse/transaction",
    icon: Wallet,
    sub_items: [],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    sub_items: [
      {
        title: "History",
        url: "/warehouse/settings/history",
        icon: History,
      },
      {
        title: "Advanced",
        url: "/warehouse/settings/advanced",
        icon: SlidersHorizontal,
      },
    ],
  },
];

export function AppSidebarNav() {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <div key={item.title}>
          {item.sub_items.length > 0 ? (
            <Collapsible asChild>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.sub_items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            <subItem.icon className="size-4 shrink-0" />
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </div>
      ))}
    </SidebarMenu>
  );
}
