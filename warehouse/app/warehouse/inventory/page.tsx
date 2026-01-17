import { AppHeader } from "@/components/layouts/app-header";
import { columns, Product } from "./columns";
import { DataTable } from "./data-table";
import { faker } from "@faker-js/faker";

async function getData(): Promise<Product[]> {
  // Fetch data from your API here.
  const data = Array.from({ length: 20 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.product(),
    price: parseFloat(faker.commerce.price()),
    status: faker.helpers.arrayElement(["stock", "out of stock"]),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  }));

  return data;
}

async function Inventory() {
  const data = await getData();
  return (
    <div>
      <AppHeader title={"Inventory"} />
      <div className="mx-auto px-4 py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default Inventory;
