import { Suspense } from "react";
import { AppHeader } from "@/components/layouts/app-header";
import { columns } from "./columns";
import { DataTable } from "./data-table";

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
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mx-auto px-4 py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </Suspense>
    </div>
  );
}
