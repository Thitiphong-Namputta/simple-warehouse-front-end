import { faker } from "@faker-js/faker";

export async function GET() {
  const count = 20;
  const results = Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.product(),
    price: parseFloat(faker.commerce.price()),
    stock: faker.number.int({ min: 0, max: 200 }),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  }));

  const data = { count: count, results: results };

  return Response.json({
    data,
  });
}
