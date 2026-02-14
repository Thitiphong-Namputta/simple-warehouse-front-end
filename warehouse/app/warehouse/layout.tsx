import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/app-sidebar";

export default async function WarehouseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <section>{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
