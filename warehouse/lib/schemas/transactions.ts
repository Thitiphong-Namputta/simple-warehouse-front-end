import { z } from "zod";

export const createTransactionSchema = z.object({
  order: z.string().min(1, "Order is required"),
  amount: z.coerce
    .number({ error: "Amount must be a number" })
    .min(0, "Amount must be a positive number"),
  payment_method: z.enum(["cash", "credit_card", "bank_transfer", "promptpay"], {
    error: "Payment method is required",
  }),
  status: z.enum(["pending", "processing", "success", "failed"]),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
