"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, type RegisterInput } from "@/lib/schemas/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Warehouse } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(data: RegisterInput) {
    setIsLoading(true);
    // TODO: POST to registration API when backend is available
    console.log("Register data:", data);
    toast.success("Registration successful! Please sign in.");
    setIsLoading(false);
    router.push("/auth/login");
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Warehouse className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>
          Register for a new warehouse account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="register-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="register-name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="register-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="register-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="register-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="register-password"
                    type="password"
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="register-confirm">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-confirm"
                    type="password"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          form="register-form"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
