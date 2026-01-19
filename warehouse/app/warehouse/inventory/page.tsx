import { Suspense } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layouts/app-header";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { SectionCards } from "./section-cards";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const json = await res.json();
    return json.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function Inventory() {
  const data = await getProducts();
  return (
    <div>
      <AppHeader title={"Inventory"} />
      <div className="mx-auto px-4 py-4">
        <Breadcrumb className="pb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/warehouse/inventory/create">
                Add Products
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="@container/main flex flex-1 flex-col">
          <div className="flex flex-col pb-4">
            <SectionCards />
          </div>
        </div>
        <Link href="/warehouse/inventory/create">
          <Button>
            <Plus /> ADD PRODUCT
          </Button>
        </Link>
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={data} />
        </Suspense>
      </div>
    </div>
  );
}
