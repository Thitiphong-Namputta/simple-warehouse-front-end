"use client";

import React, { useRef, useState } from "react";
import { Upload, FileText, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  createProductSchema,
  type CreateProductInput,
} from "@/lib/schemas/products";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (data: { name: string; description: string; file: File }) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function AddProductDialog({
  open,
  onOpenChange,
  onUpload,
}: UploadDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      file: undefined,
    },
  });

  const onSubmit = async (data: CreateProductInput) => {
    setError(null);
    try {
      onUpload({
        name: data.name,
        description: data.description || "",
        file: data.file,
      });
      reset();
      setSelectedFile(null);
      onOpenChange(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload document",
      );
    }
  };

  const handleFileChange = async (file: File | undefined) => {
    if (!file) return;

    setError(null);
    setIsLoading(true);

    try {
      const maxFileSizeMB = 100;
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxFileSizeMB) {
        setError(
          `File size too large! Maximum allowed size is ${maxFileSizeMB} MB (Your file: ${fileSizeMB.toFixed(2)} MB)`,
        );
        return;
      }

      setValue("file", file, { shouldValidate: true });
      setSelectedFile(file);

      const currentName = (document.getElementById("name") as HTMLInputElement)
        ?.value;
      if (!currentName) {
        setValue("name", file.name.replace(/\.[^/.]+$/, ""));
      }
    } catch (err) {
      setError("Failed to process file");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setValue("file", undefined as unknown as File, { shouldValidate: true });
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
      setSelectedFile(null);
      setError(null);
    }
    onOpenChange(isOpen);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setValue("file", droppedFile, { shouldValidate: true });
      setSelectedFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            create a new product to your inventory
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div
            className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {selectedFile ? (
              <div className="flex items-center gap-3 rounded-md border bg-muted/50 p-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-background">
                  <FileText className="size-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  disabled={isSubmitting}
                >
                  <X className="size-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            ) : (
              <>
                <Upload
                  className="mb-2 size-8 text-muted-foreground cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                />
                <p className="mb-1 text-sm font-medium text-foreground">
                  Drop your file here or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports all file types
                </p>
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files?.[0])}
                />
                {errors.file && (
                  <p className="text-sm text-destructive">
                    {errors.file.message}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Product Name</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Enter document name..."
                className="pl-9"
                disabled={isSubmitting}
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <div className="flex items-center justify-center gap-2 py-2">
              <Loader2 className="size-4 animate-spin" />
              <span className="text-sm text-muted-foreground">
                Processing file...
              </span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a description..."
              rows={3}
              disabled={isSubmitting}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
