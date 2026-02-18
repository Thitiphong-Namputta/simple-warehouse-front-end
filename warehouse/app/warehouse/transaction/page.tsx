"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AppHeader } from "@/components/layouts/app-header";
import { getColumns, type Payment } from "./columns";
import { DataTable } from "./data-table";
import { Sheet, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionCards } from "./section-cards";
import { AddTransactionDialog } from "@/components/transactions/add-transaction-dialog";
import { EditTransactionDialog } from "@/components/transactions/edit-transaction-dialog";

export default function Transaction() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [deletingPayment, setDeletingPayment] = useState<Payment | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteConfirm = async () => {
    if (!deletingPayment) return;
    setIsDeleting(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/${deletingPayment._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setDeletingPayment(null);
      getTransaction();
    } catch (error) {
      console.log("Delete transaction fail : ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const tableColumns = getColumns(
    (payment) => setEditingPayment(payment),
    (payment) => setDeletingPayment(payment)
  );

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
        <EditTransactionDialog
          open={!!editingPayment}
          onOpenChange={(open) => { if (!open) setEditingPayment(null); }}
          payment={editingPayment}
          onSuccess={getTransaction}
        />
        <Dialog
          open={!!deletingPayment}
          onOpenChange={(open) => { if (!open) setDeletingPayment(null); }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Transaction</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete transaction for{" "}
                <span className="font-semibold">{deletingPayment?.email}</span>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setDeletingPayment(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={tableColumns} data={transactions} />
        </Suspense>
      </div>
    </div>
  );
}
