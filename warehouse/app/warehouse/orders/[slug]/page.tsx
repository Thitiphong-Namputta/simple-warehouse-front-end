"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layouts/app-header";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/utils";
import {
  CalendarDays,
  CircleCheck,
  CircleX,
  Clock,
  DollarSign,
  Loader,
  PackageCheck,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react";

type OrderItem = {
  product: { _id: string; name: string; price: number };
  quantity: number;
  unit_price: number;
};

type Order = {
  _id: string;
  id: string;
  order_number: string;
  customer_name: string;
  total_amount: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  items?: OrderItem[];
  created_at: string;
  updated_at: string;
};

const statusConfig: Record<
  Order["status"],
  { label: string; icon: React.ReactNode }
> = {
  delivered: {
    label: "Delivered",
    icon: (
      <CircleCheck className="size-3 fill-green-500 dark:fill-green-400" />
    ),
  },
  pending: {
    label: "Pending",
    icon: <Clock className="size-3 fill-yellow-500 dark:fill-yellow-400" />,
  },
  confirmed: {
    label: "Confirmed",
    icon: <Loader className="size-3 fill-blue-500 dark:fill-blue-400" />,
  },
  processing: {
    label: "Processing",
    icon: (
      <PackageCheck className="size-3 fill-indigo-500 dark:fill-indigo-400" />
    ),
  },
  shipped: {
    label: "Shipped",
    icon: <Truck className="size-3 fill-purple-500 dark:fill-purple-400" />,
  },
  cancelled: {
    label: "Cancelled",
    icon: <CircleX className="size-3 fill-red-500 dark:fill-red-400" />,
  },
};

export default function OrderDetail() {
  const { data: session } = useSession();
  const params = useParams();
  const slug = params.slug as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.accessToken) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${slug}`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      })
      .then((response) => {
        if (response.data) {
          setOrder(response.data.data);
        }
      })
      .catch((error) => {
        console.log("Get order fail : ", error);
        setOrder(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, session?.accessToken]);

  if (loading) {
    return (
      <div>
        <AppHeader title="Order Details" />
        <div className="mx-auto px-4 py-10">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div>
        <AppHeader title="Order Details" />
        <div className="mx-auto px-4 py-10">
          <p className="text-muted-foreground">Order not found.</p>
        </div>
      </div>
    );
  }

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(order.total_amount);

  const status = statusConfig[order.status];

  return (
    <div>
      <AppHeader title="Order Details" />
      <div className="mx-auto px-4 py-4">
        <Breadcrumb className="pb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/warehouse/orders">Orders</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{order.order_number}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Main Info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="size-5 text-muted-foreground" />
                    <CardTitle className="text-xl">
                      {order.order_number}
                    </CardTitle>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-muted-foreground px-1.5"
                  >
                    {status.icon}
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4 space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="size-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-medium">{order.customer_name}</span>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="size-4 shrink-0" />
                    <span>Created: {formatDateTime(order.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="size-4 shrink-0" />
                    <span>Updated: {formatDateTime(order.updated_at)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            {order.items && order.items.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Order Items</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="font-medium">
                          {item.product?.name ?? "—"}
                        </span>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <span>x{item.quantity}</span>
                          <span>
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(item.unit_price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Stats */}
          <Card className="h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="size-4" />
                Total Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formattedTotal}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
