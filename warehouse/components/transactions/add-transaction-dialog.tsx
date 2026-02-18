"use client";

import { useState, useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Loader2, Banknote, CreditCard, Landmark, QrCode } from "lucide-react";
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
import {
  createTransactionSchema,
  type CreateTransactionInput,
} from "@/lib/schemas/transactions";

interface Order {
  _id: string;
  order_number: string;
  customer_name: string;
  total_amount: number;
}

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const PAYMENT_METHODS = [
  { value: "cash", label: "Cash", icon: Banknote },
  { value: "credit_card", label: "Credit Card", icon: CreditCard },
  { value: "bank_transfer", label: "Bank Transfer", icon: Landmark },
  { value: "promptpay", label: "PromptPay", icon: QrCode },
] as const;

const TRANSACTION_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "success", label: "Success" },
  { value: "failed", label: "Failed" },
] as const;

export function AddTransactionDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddTransactionDialogProps) {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionInput>({
    resolver: zodResolver(
      createTransactionSchema
    ) as Resolver<CreateTransactionInput>,
    defaultValues: {
      order: "",
      amount: 0,
      payment_method: undefined,
      status: "pending",
      email: "",
    },
  });

  useEffect(() => {
    if (open) {
      setValue("email", session?.user?.email ?? "");

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
        .then((res) => res.json())
        .then((data) => setOrders(data.results || []))
        .catch(() => setOrders([]));
    }
  }, [open, session?.user?.email, setValue]);

  const handleOrderChange = (orderId: string) => {
    setValue("order", orderId, { shouldValidate: true });
    const selected = orders.find((o) => o._id === orderId);
    if (selected) {
      setValue("amount", selected.total_amount, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: CreateTransactionInput) => {
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok || !result.success) {
        setError(result.message || "Failed to create transaction");
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Create a payment transaction for an existing order.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Order */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="txn-order">Order</Label>
            <Select onValueChange={handleOrderChange} disabled={isSubmitting}>
              <SelectTrigger id="txn-order">
                <SelectValue placeholder="Select an order" />
              </SelectTrigger>
              <SelectContent>
                {orders.map((o) => (
                  <SelectItem key={o._id} value={o._id}>
                    #{o.order_number} — {o.customer_name} (${o.total_amount})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.order && (
              <p className="text-sm text-destructive">{errors.order.message}</p>
            )}
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="txn-amount">Amount</Label>
            <Input
              id="txn-amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              disabled={isSubmitting}
              {...register("amount")}
            />
            {errors.amount && (
              <p className="text-sm text-destructive">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="txn-payment-method">Payment Method</Label>
            <Select
              onValueChange={(value) =>
                setValue(
                  "payment_method",
                  value as CreateTransactionInput["payment_method"],
                  { shouldValidate: true }
                )
              }
              disabled={isSubmitting}
            >
              <SelectTrigger id="txn-payment-method">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    <span className="flex items-center gap-2">
                      <m.icon className="size-4 shrink-0" />
                      {m.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.payment_method && (
              <p className="text-sm text-destructive">
                {errors.payment_method.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="txn-status">Status</Label>
            <Select
              defaultValue="pending"
              onValueChange={(value) =>
                setValue(
                  "status",
                  value as CreateTransactionInput["status"],
                  { shouldValidate: true }
                )
              }
              disabled={isSubmitting}
            >
              <SelectTrigger id="txn-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {TRANSACTION_STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-destructive">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="txn-email">Email</Label>
            <Input
              id="txn-email"
              type="email"
              placeholder="email@example.com"
              disabled={isSubmitting}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
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
                "Save Transaction"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
