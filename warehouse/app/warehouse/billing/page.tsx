"use client";

import { AppHeader } from "@/components/layouts/app-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  Check,
  Download,
  Zap,
  Building2,
  Sparkles,
} from "lucide-react";

const CURRENT_PLAN = "pro";

const PACKAGES = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "For individuals getting started",
    icon: Zap,
    features: ["Up to 100 products", "1 user", "Basic reports", "Email support"],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    description: "For growing businesses",
    icon: Sparkles,
    features: [
      "Unlimited products",
      "Up to 10 users",
      "Advanced analytics",
      "Priority support",
      "API access",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    description: "For large organizations",
    icon: Building2,
    features: [
      "Unlimited everything",
      "Unlimited users",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Custom reporting",
    ],
    highlighted: false,
  },
] as const;

const INVOICES = [
  { id: "INV-2025-005", date: "Jan 1, 2025", amount: "$29.00", status: "Paid", item: "Pro Plan — Monthly" },
  { id: "INV-2024-012", date: "Dec 1, 2024", amount: "$29.00", status: "Paid", item: "Pro Plan — Monthly" },
  { id: "INV-2024-011", date: "Nov 1, 2024", amount: "$29.00", status: "Paid", item: "Pro Plan — Monthly" },
  { id: "INV-2024-010", date: "Oct 1, 2024", amount: "$29.00", status: "Paid", item: "Pro Plan — Monthly" },
  { id: "INV-2024-009", date: "Sep 1, 2024", amount: "$0.00", status: "Free", item: "Free Plan" },
];

export default function BillingPage() {
  const currentPkg = PACKAGES.find((p) => p.id === CURRENT_PLAN)!;
  const CurrentIcon = currentPkg.icon;

  return (
    <div>
      <AppHeader title="Billing" />
      <div className="mx-auto px-4 py-4 space-y-6 max-w-4xl">

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="size-4" />
              Current Plan
            </CardTitle>
            <CardDescription>Your active subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <CurrentIcon className="size-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{currentPkg.name}</p>
                    <Badge>Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ${currentPkg.price}/month · Renews Feb 1, 2026
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" disabled>
                Manage Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Packages */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-0.5">Available Plans</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {PACKAGES.map((pkg) => {
              const Icon = pkg.icon;
              const isCurrent = pkg.id === CURRENT_PLAN;
              return (
                <Card
                  key={pkg.id}
                  className={pkg.highlighted ? "border-primary shadow-sm" : ""}
                >
                  {pkg.highlighted && (
                    <div className="bg-primary text-primary-foreground text-xs text-center py-1 rounded-t-xl font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="size-4 text-muted-foreground" />
                      <CardTitle className="text-base">{pkg.name}</CardTitle>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">
                        {pkg.price === 0 ? "Free" : `$${pkg.price}`}
                      </span>
                      {pkg.price > 0 && (
                        <span className="text-sm text-muted-foreground">/mo</span>
                      )}
                    </div>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <ul className="space-y-1.5">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <Check className="size-3.5 text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={isCurrent ? "outline" : pkg.highlighted ? "default" : "outline"}
                      disabled={isCurrent}
                      size="sm"
                    >
                      {isCurrent ? "Current Plan" : "Upgrade"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Invoice History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Download className="size-4" />
              Invoice History
            </CardTitle>
            <CardDescription>Your past billing records</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INVOICES.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                    <TableCell className="text-sm">{inv.date}</TableCell>
                    <TableCell className="text-sm">{inv.item}</TableCell>
                    <TableCell className="text-sm font-medium">{inv.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={inv.status === "Paid" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-7 w-7" disabled>
                        <Download className="size-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
