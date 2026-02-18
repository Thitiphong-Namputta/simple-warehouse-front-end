"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layouts/app-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  AlertTriangle,
  CreditCard,
  Info,
  CheckCheck,
  BellDot,
} from "lucide-react";

type NotificationType = "order" | "stock" | "payment" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const ICON_MAP: Record<NotificationType, React.ElementType> = {
  order: ShoppingCart,
  stock: AlertTriangle,
  payment: CreditCard,
  system: Info,
};

const COLOR_MAP: Record<NotificationType, string> = {
  order: "text-blue-500 bg-blue-50 dark:bg-blue-950",
  stock: "text-amber-500 bg-amber-50 dark:bg-amber-950",
  payment: "text-green-500 bg-green-50 dark:bg-green-950",
  system: "text-slate-500 bg-slate-100 dark:bg-slate-800",
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New Order Received",
    description: "Order #ORD-00142 from John Doe has been placed — $1,250.00",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "stock",
    title: "Low Stock Alert",
    description: "Product \"Wireless Keyboard\" is running low — only 3 units remaining",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Payment Successful",
    description: "Transaction #TXN-00089 has been confirmed via Bank Transfer",
    timestamp: "3 hours ago",
    read: false,
  },
  {
    id: "4",
    type: "order",
    title: "Order Shipped",
    description: "Order #ORD-00138 for Jane Smith has been marked as shipped",
    timestamp: "Yesterday, 4:30 PM",
    read: true,
  },
  {
    id: "5",
    type: "system",
    title: "System Maintenance",
    description: "Scheduled maintenance on Feb 20, 2026 from 2:00–4:00 AM UTC",
    timestamp: "Yesterday, 9:00 AM",
    read: true,
  },
  {
    id: "6",
    type: "payment",
    title: "Payment Failed",
    description: "Transaction #TXN-00084 failed — please review the payment details",
    timestamp: "2 days ago",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  return (
    <div>
      <AppHeader title="Notifications" />
      <div className="mx-auto px-4 py-4 space-y-4 max-w-2xl">

        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellDot className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {unreadCount > 0
                ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "All caught up!"}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="gap-1.5"
          >
            <CheckCheck className="size-3.5" />
            Mark all as read
          </Button>
        </div>

        {/* Notification List */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Recent
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {notifications.map((notif) => {
                const Icon = ICON_MAP[notif.type];
                const colorClass = COLOR_MAP[notif.type];
                return (
                  <li
                    key={notif.id}
                    className={`flex items-start gap-3 px-6 py-4 cursor-pointer transition-colors hover:bg-muted/40 ${
                      !notif.read ? "bg-muted/20" : ""
                    }`}
                    onClick={() => toggleRead(notif.id)}
                  >
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colorClass}`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm ${!notif.read ? "font-semibold" : "font-medium"}`}>
                          {notif.title}
                        </p>
                        <div className="flex items-center gap-2 shrink-0">
                          {!notif.read && (
                            <span className="h-2 w-2 rounded-full bg-primary mt-1" />
                          )}
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {notif.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {notif.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground pb-2">
          Click a notification to toggle read status
        </p>

      </div>
    </div>
  );
}
