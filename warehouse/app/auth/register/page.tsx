import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { RegisterForm } from "./register-form";

export default async function RegisterPage() {
  const session = await auth();

  if (session) {
    redirect("/warehouse");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <RegisterForm />
    </div>
  );
}
