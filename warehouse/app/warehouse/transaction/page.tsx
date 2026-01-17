import { AppHeader } from "@/components/layouts/app-header";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";
import { faker } from "@faker-js/faker";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  const data = Array.from({ length: 34 }).map(() => ({
    id: faker.string.uuid(),
    amount: faker.number.int({ min: 50, max: 500 }),
    status: faker.helpers.arrayElement(["pending", "success", "failed"]),
    email: faker.internet.email(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  }));

  return data;
}

async function Transaction() {
  const data = await getData();
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
