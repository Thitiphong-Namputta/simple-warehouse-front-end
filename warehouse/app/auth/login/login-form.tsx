"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, type LoginInput } from "@/lib/schemas/auth";
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
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/warehouse");
    router.refresh();
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Warehouse className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access the warehouse.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="login-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="login-email"
                    type="email"
                    placeholder="admin@warehouse.com"
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
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
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
          form="login-form"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-primary underline underline-offset-4"
          >
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
