import { Suspense } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layouts/app-header";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
      <div className="mx-auto px-4 py-10">
        <Link href="/warehouse/inventory/create">
          <Button>
            <Plus /> Add Product
          </Button>
        </Link>
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={data} />
        </Suspense>
      </div>
    </div>
  );
}
