import Link from "next/link";
import { Warehouse } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Warehouse className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">Warehouse co.</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Modern warehouse management system for businesses of all sizes.
              Streamline your inventory, orders, and logistics.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#features" className="transition-colors hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-foreground">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-foreground">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-foreground">
                  Acceptable Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@warehouse-co.com</li>
              <li>+66 2-123-4567</li>
              <li className="leading-relaxed">
                123 Sukhumvit Road, Klongtoey,
                <br />
                Bangkok 10110, Thailand
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Warehouse co. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="#" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
