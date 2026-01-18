import { faker } from "@faker-js/faker";

export async function GET() {
  const count = 34;
  const results = Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    amount: faker.number.int({ min: 50, max: 500 }),
    status: faker.helpers.arrayElement(["pending", "success", "failed"]),
    email: faker.internet.email(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  }));

  const data = { count: count, results: results };

  return Response.json({
    data,
  });
}
