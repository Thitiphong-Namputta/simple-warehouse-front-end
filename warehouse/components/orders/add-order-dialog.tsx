"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { createOrderSchema, type CreateOrderInput } from "@/lib/schemas/orders";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
}

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const ORDER_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export function AddOrderDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddOrderDialogProps) {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema) as Resolver<CreateOrderInput>,
    defaultValues: {
      customer_name: "",
      status: "pending",
      items: [{ product: "", quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    if (open) {
      setValue("customer_name", session?.user?.name ?? "");

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
        .then((res) => res.json())
        .then((data) => setProducts(data.results || []))
        .catch(() => setProducts([]));
    }
  }, [open, session?.user?.name, setValue]);

  const onSubmit = async (data: CreateOrderInput) => {
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message || "Failed to create order");
        return;
      }

      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
      setError(null);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
          <DialogDescription>
            Create a new order. Customer name is pre-filled from your account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Customer Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="order-customer-name">Customer Name</Label>
            <Input
              id="order-customer-name"
              placeholder="Customer name"
              disabled={isSubmitting}
              {...register("customer_name")}
            />
            {errors.customer_name && (
              <p className="text-sm text-destructive">
                {errors.customer_name.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="order-status">Status</Label>
            <Select
              defaultValue="pending"
              onValueChange={(value) =>
                setValue("status", value as CreateOrderInput["status"], {
                  shouldValidate: true,
                })
              }
              disabled={isSubmitting}
            >
              <SelectTrigger id="order-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {ORDER_STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-destructive">{errors.status.message}</p>
            )}
          </div>

          <Separator />

          {/* Items */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Label>Order Items</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ product: "", quantity: 1 })}
                disabled={isSubmitting}
              >
                <Plus className="size-4 mr-1" />
                Add Item
              </Button>
            </div>

            {errors.items?.root && (
              <p className="text-sm text-destructive">
                {errors.items.root.message}
              </p>
            )}

            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                {/* Product Select */}
                <div className="flex-1 flex flex-col gap-1">
                  <Select
                    onValueChange={(value) =>
                      setValue(`items.${index}.product`, value, {
                        shouldValidate: true,
                      })
                    }
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p._id} value={p._id}>
                          {p.name} (${p.price})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.items?.[index]?.product && (
                    <p className="text-xs text-destructive">
                      {errors.items[index]?.product?.message}
                    </p>
                  )}
                </div>

                {/* Quantity Input */}
                <div className="w-24 flex flex-col gap-1">
                  <Input
                    type="number"
                    min="1"
                    placeholder="Qty"
                    disabled={isSubmitting}
                    {...register(`items.${index}.quantity`)}
                  />
                  {errors.items?.[index]?.quantity && (
                    <p className="text-xs text-destructive">
                      {errors.items[index]?.quantity?.message}
                    </p>
                  )}
                </div>

                {/* Remove Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => remove(index)}
                  disabled={isSubmitting || fields.length === 1}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Order"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
