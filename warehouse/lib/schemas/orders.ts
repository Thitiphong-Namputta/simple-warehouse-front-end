import { z } from "zod";

const orderItemSchema = z.object({
  product: z.string().min(1, "Product is required"),
  quantity: z.coerce
    .number({ error: "Quantity must be a number" })
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1"),
});

export const createOrderSchema = z.object({
  customer_name: z
    .string()
    .min(2, "Customer name must be at least 2 characters")
    .max(100, "Customer name must be less than 100 characters")
    .trim(),
  status: z.enum([
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
  items: z
    .array(orderItemSchema)
    .min(1, "Order must contain at least one item"),
});

export const editOrderSchema = z.object({
  customer_name: z
    .string()
    .min(2, "Customer name must be at least 2 characters")
    .max(100, "Customer name must be less than 100 characters")
    .trim(),
  status: z.enum([
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type EditOrderInput = z.infer<typeof editOrderSchema>;
