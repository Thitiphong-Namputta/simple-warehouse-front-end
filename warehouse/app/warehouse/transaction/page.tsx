import { Suspense } from "react";
import { AppHeader } from "@/components/layouts/app-header";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Sheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCards } from "./section-cards";

async function getTransaction() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction`);
    const json = await res.json();
    return json.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function Transaction() {
  const data = await getTransaction();
  return (
    <div>
      <AppHeader title={"Payments"} />
      <div className="mx-auto px-4 py-4">
        <div className="@container/main flex flex-1 flex-col">
          <div className="flex flex-col pb-4">
            <SectionCards />
          </div>
        </div>
        <Button>
          <Sheet /> EXPORT XSLX.
        </Button>
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={data} />
        </Suspense>
      </div>
    </div>
  );
}

export default Transaction;
