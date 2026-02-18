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
import { CalendarDays, DollarSign, Layers, Package, Tag } from "lucide-react";

type Product = {
  _id: string;
  id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  category: {
    _id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
};

export default function ProductDetail() {
  const { data: session } = useSession();
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.accessToken) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      })
      .then((response) => {
        if (response.data) {
          setProduct(response.data.data);
        }
      })
      .catch((error) => {
        console.log("Get product fail : ", error);
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, session?.accessToken]);

  if (loading) {
    return (
      <div>
        <AppHeader title="Product Details" />
        <div className="mx-auto px-4 py-10">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <AppHeader title="Product Details" />
        <div className="mx-auto px-4 py-10">
          <p className="text-muted-foreground">Product not found.</p>
        </div>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div>
      <AppHeader title="Product Details" />
      <div className="mx-auto px-4 py-4">
        <Breadcrumb className="pb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/warehouse/inventory">
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Main Info */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Package className="size-5 text-muted-foreground" />
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                </div>
                <Badge variant="secondary">
                  <Tag className="size-3 mr-1" />
                  {product.category?.name ?? "—"}
                </Badge>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Description
                </p>
                {product.description?.trim() ? (
                  <p className="text-sm">{product.description}</p>
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    No description provided.
                  </p>
                )}
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 shrink-0" />
                  <span>Created: {formatDateTime(product.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 shrink-0" />
                  <span>Updated: {formatDateTime(product.updated_at)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formattedPrice}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Layers className="size-4" />
                  Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{product.stock}</p>
                <Badge
                  variant={product.stock > 0 ? "default" : "destructive"}
                  className="mt-2"
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
