"use client";

import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Moon, User } from "lucide-react";

export function NavigationMenuNavBar() {
  const isMobile = useIsMobile();

  return (
    <nav className="flex justify-between py-2 px-4">
      <NavigationMenu viewport={isMobile}>
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/blog">Blog</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/about">About</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu
        viewport={isMobile}
        className="flex items-center space-x-4"
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="https://github.com/Thitiphong-Namputta/simple-warehouse-front-end">
              <Button variant="ghost" size="icon">
                <Github />
              </Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <Separator orientation="vertical" />
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button variant="ghost" size="icon">
              <Moon />
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
        <Separator orientation="vertical" />
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button>
              <User /> Demo@mail...
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
