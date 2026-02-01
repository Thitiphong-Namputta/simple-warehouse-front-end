import { z } from "zod";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .trim()
    .optional(),
  file: z
    .instanceof(File, { message: "Please select a file" })
    .refine((file) => file.size > 0, "File cannot be empty")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size must be less than 100MB",
    ),
});

export const editProductSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .trim()
    .optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type EditProductInput = z.infer<typeof editProductSchema>;
