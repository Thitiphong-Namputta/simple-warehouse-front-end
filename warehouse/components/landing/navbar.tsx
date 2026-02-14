"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Warehouse, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Warehouse className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Warehouse co.</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/register">Try Free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
