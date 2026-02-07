import { Suspense } from "react";
import { AppHeader } from "@/components/layouts/app-header";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getOrders() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json.results;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

async function Orders() {
  const data = await getOrders();
  return (
    <div>
      <AppHeader title={"Orders"} />
      <div className="mx-auto px-4 py-4">
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={data} />
        </Suspense>
      </div>
    </div>
  );
}

export default Orders;
