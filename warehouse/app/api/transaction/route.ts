import { faker } from "@faker-js/faker";

export async function GET() {
  const count = 34;
  const results = Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    amount: faker.number.int({ min: 50, max: 500 }),
    status: faker.helpers.arrayElement(["pending", "success", "failed"]),
    payment_method: faker.helpers.arrayElement([
      "cash",
      "credit_card",
      "bank_transfer",
      "promptpay",
    ]),
    email: faker.internet.email(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  }));

  return Response.json({ count: count, results: results });
}
