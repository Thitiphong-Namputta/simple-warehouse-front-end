"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { AppHeader } from "@/components/layouts/app-header";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Sheet, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCards } from "./section-cards";
import { AddTransactionDialog } from "@/components/transactions/add-transaction-dialog";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const getTransaction = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/transaction`)
      .then((response) => {
        if (response.data) {
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
        <div className="flex gap-2 pb-4">
          <Button onClick={() => setOpenDialog(true)}>
            <Plus /> ADD TRANSACTION
          </Button>
          <Button variant="outline">
            <Sheet /> EXPORT XLSX
          </Button>
        </div>

        <AddTransactionDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          onSuccess={getTransaction}
        />

        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={transactions} />
        </Suspense>
      </div>
    </div>
  );
}
