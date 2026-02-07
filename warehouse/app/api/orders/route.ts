import { faker } from "@faker-js/faker";

export async function GET() {
  const count = 50;
  const results = Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    order_number: faker.string.alphanumeric({ length: 8, casing: "upper" }),
    customer_name: faker.person.fullName(),
    total_amount: faker.number.int({ min: 50, max: 2000 }),
    status: faker.helpers.arrayElement([
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ]),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  }));

  return Response.json({ count: count, results: results });
}
