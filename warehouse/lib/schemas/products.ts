import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  price: z.coerce
    .number({ error: "Price must be a number" })
    .min(0, "Price must be a positive number"),
  stock: z.coerce
    .number({ error: "Stock must be a number" })
    .min(0, "Stock must be a non-negative number")
    .int("Stock must be a whole number"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .trim()
    .optional(),
  category: z.string().min(1, "Category is required"),
});

export const editProductSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  price: z.coerce
    .number({ error: "Price must be a number" })
    .min(0, "Price must be a positive number"),
  stock: z.coerce
    .number({ error: "Stock must be a number" })
    .min(0, "Stock must be a non-negative number")
    .int("Stock must be a whole number"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .trim()
    .optional(),
  category: z.string().min(1, "Category is required"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type EditProductInput = z.infer<typeof editProductSchema>;
