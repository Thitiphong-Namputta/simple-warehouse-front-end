import { AppHeader } from "@/components/layouts/app-header";
import { columns } from "./columns";
import { DataTable } from "./data-table";

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
      <div className="mx-auto px-4 py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default Transaction;
