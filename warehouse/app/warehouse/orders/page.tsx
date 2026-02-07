"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Suspense } from "react";
import { AppHeader } from "@/components/layouts/app-header";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
      .then(async (response) => {
        if (response.data) {
          console.log(response);
          setOrders(response.data.results);
        }
      })
      .catch((error) => {
        console.log("Get orders fail : ", error);
        setOrders([]);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <AppHeader title={"Orders"} />
      <div className="mx-auto px-4 py-4">
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={orders} />
        </Suspense>
      </div>
    </div>
  );
}
