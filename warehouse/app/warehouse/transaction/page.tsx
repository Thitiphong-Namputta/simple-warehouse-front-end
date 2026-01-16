import { AppHeader } from "@/components/layouts/app-header";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "c1a1c7d4-1c2b-4c39-9b7f-1f0b0e1c01a1",
      amount: 120,
      status: "pending",
      email: "user1@example.com",
    },
    {
      id: "f5e8d6c2-2a4e-4b7a-8f3e-3c9a2e6b02b2",
      amount: 250,
      status: "success",
      email: "user2@example.com",
    },
    {
      id: "a9d2f1e4-7c5b-4d6a-9e21-8a7c3f4d03c3",
      amount: 80,
      status: "failed",
      email: "user3@example.com",
    },
    {
      id: "b4e6c8d1-3f7a-4c9b-9d2e-5f1a0b4e04d4",
      amount: 300,
      status: "pending",
      email: "user4@example.com",
    },
    {
      id: "e2a7f9c4-8b1d-4f3a-9c6e-7d5b1a2f05e5",
      amount: 150,
      status: "success",
      email: "user5@example.com",
    },
    {
      id: "9f4b2e7a-5c1d-4e8f-a0b1-3d6c2a9e06f6",
      amount: 90,
      status: "failed",
      email: "user6@example.com",
    },
    {
      id: "3a7c9e1b-6d4f-4a5e-8b2c-1f0d9e7a07a7",
      amount: 500,
      status: "pending",
      email: "user7@example.com",
    },
    {
      id: "7e2a9c4d-1b6f-4f8e-9a3c-5d0b1e2a08b8",
      amount: 60,
      status: "success",
      email: "user8@example.com",
    },
    {
      id: "4c1d7a9e-5f3b-4e2a-8d6c-9b0f1a7c09c9",
      amount: 220,
      status: "failed",
      email: "user9@example.com",
    },
    {
      id: "8b9e3d2c-4a7f-4c1a-9e5d-0f6b2a1c10d0",
      amount: 175,
      status: "pending",
      email: "user10@example.com",
    },

    {
      id: "d1a4c6f7-8e2b-4f9c-a5d3-1e0b2c7a11e1",
      amount: 410,
      status: "success",
      email: "user11@example.com",
    },
    {
      id: "2f9e8b7d-1a6c-4c3f-9e5a-d0b4c1a712f2",
      amount: 95,
      status: "failed",
      email: "user12@example.com",
    },
    {
      id: "5e1d2a7c-9b8f-4f3c-8a6e-0d4b1c9e13a3",
      amount: 130,
      status: "pending",
      email: "user13@example.com",
    },
    {
      id: "a6f2e9b3-4c1d-4a7f-9c8e-5b0d1e2a14b4",
      amount: 260,
      status: "success",
      email: "user14@example.com",
    },
    {
      id: "7b4c9e1a-2f6d-4e8c-a3b5-0d1f2e9a15c5",
      amount: 70,
      status: "failed",
      email: "user15@example.com",
    },
    {
      id: "c9a1b4e7-5d2f-4c6a-8e3b-0f1d9a7c16d6",
      amount: 340,
      status: "pending",
      email: "user16@example.com",
    },
    {
      id: "1e7f2c9b-4a6d-4e5c-9a3b-0d8f1c7a17e7",
      amount: 180,
      status: "success",
      email: "user17@example.com",
    },
    {
      id: "9c3b1e2f-7a6d-4c4a-8e5b-0f1d9a7c18f8",
      amount: 55,
      status: "failed",
      email: "user18@example.com",
    },
    {
      id: "6a9e7c1d-2b4f-4e3a-9c5b-0d1f8a7c19a9",
      amount: 290,
      status: "pending",
      email: "user19@example.com",
    },
    {
      id: "f2c4e9b7-1a6d-4c3a-8e5b-0d9f1a7c20b0",
      amount: 210,
      status: "success",
      email: "user20@example.com",
    },

    {
      id: "3b7a9c1e-2d6f-4e4a-8c5b-0d1f9a7c21c1",
      amount: 85,
      status: "failed",
      email: "user21@example.com",
    },
    {
      id: "e9f1a7c2-4b6d-4c3a-8e5b-0d9f1a7c22d2",
      amount: 460,
      status: "pending",
      email: "user22@example.com",
    },
    {
      id: "7c2e9a1f-4b6d-4e3a-9c5b-0d1f8a7c23e3",
      amount: 195,
      status: "success",
      email: "user23@example.com",
    },
    {
      id: "1a9c7e3b-2f6d-4c4a-8e5b-0d1f9a7c24f4",
      amount: 110,
      status: "failed",
      email: "user24@example.com",
    },
    {
      id: "9e2c1a7f-4b6d-4e3a-8c5b-0d1f9a7c25a5",
      amount: 330,
      status: "pending",
      email: "user25@example.com",
    },
    {
      id: "4f7e2c9a-1b6d-4c3a-9e5b-0d1f8a7c26b6",
      amount: 140,
      status: "success",
      email: "user26@example.com",
    },
    {
      id: "2c9a7e1f-4b6d-4e3a-8c5b-0d1f9a7c27c7",
      amount: 65,
      status: "failed",
      email: "user27@example.com",
    },
    {
      id: "7e9c1a2f-4b6d-4c3a-8e5b-0d1f9a7c28d8",
      amount: 275,
      status: "pending",
      email: "user28@example.com",
    },
    {
      id: "1c7a9e2f-4b6d-4e3a-9c5b-0d1f8a7c29e9",
      amount: 390,
      status: "success",
      email: "user29@example.com",
    },
    {
      id: "9a1e7c2f-4b6d-4c3a-8e5b-0d1f9a7c30f0",
      amount: 100,
      status: "failed",
      email: "user30@example.com",
    },

    {
      id: "7c9e1a2f-4b6d-4e3a-9c5b-0d1f8a7c31a1",
      amount: 160,
      status: "pending",
      email: "user31@example.com",
    },
    {
      id: "2f1a9e7c-4b6d-4c3a-8e5b-0d1f9a7c32b2",
      amount: 420,
      status: "success",
      email: "user32@example.com",
    },
    {
      id: "9e7c1a2f-4b6d-4e3a-8c5b-0d1f9a7c33c3",
      amount: 75,
      status: "failed",
      email: "user33@example.com",
    },
    {
      id: "1a2f9e7c-4b6d-4c3a-9e5b-0d1f8a7c34d4",
      amount: 240,
      status: "pending",
      email: "user34@example.com",
    },
  ];
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
