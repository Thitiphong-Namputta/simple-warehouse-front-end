"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Suspense } from "react";
import { AppHeader } from "@/components/layouts/app-header";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Sheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCards } from "./section-cards";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);

  const getTransaction = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/transaction`)
      .then(async (response) => {
        if (response.data) {
          console.log(response);
          setTransactions(response.data.results);
        }
      })
      .catch((error) => {
        console.log("Get transactions fail : ", error);
        setTransactions([]);
      });
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <div>
      <AppHeader title={"Payments"} />
      <div className="mx-auto px-4 py-4">
        <div className="@container/main flex flex-1 flex-col">
          <div className="flex flex-col pb-4">
            <SectionCards />
          </div>
        </div>
        <Button>
          <Sheet /> EXPORT XSLX.
        </Button>
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={transactions} />
        </Suspense>
      </div>
    </div>
  );
}
