import { faker } from "@faker-js/faker";

export async function GET() {
  const count = 20;
  const results = Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.product(),
    price: parseFloat(faker.commerce.price()),
    status: faker.helpers.arrayElement(["stock", "out of stock"]),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  }));

  const data = { count: count, results: results };

  return Response.json({
    data,
  });
}
