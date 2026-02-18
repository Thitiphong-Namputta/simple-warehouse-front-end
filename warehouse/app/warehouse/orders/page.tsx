"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AppHeader } from "@/components/layouts/app-header";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { getColumns, type Order } from "./columns";
import { DataTable } from "./data-table";
import { AddOrderDialog } from "@/components/orders/add-order-dialog";
import { EditOrderDialog } from "@/components/orders/edit-order-dialog";

export default function Orders() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<Order | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const getOrders = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
      .then((response) => {
        if (response.data) {
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

  const handleDeleteConfirm = async () => {
    if (!deletingOrder) return;
    setIsDeleting(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${deletingOrder._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setDeletingOrder(null);
      getOrders();
    } catch (error) {
      console.log("Delete order fail : ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const tableColumns = getColumns(
    (order) => setEditingOrder(order),
    (order) => setDeletingOrder(order)
  );

  return (
    <div>
      <AppHeader title={"Orders"} />
      <div className="mx-auto px-4 py-4">
        <Breadcrumb className="pb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Button onClick={() => setOpenDialog(true)}>
          <Plus /> ADD ORDER
        </Button>

        <AddOrderDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          onSuccess={getOrders}
        />
        <EditOrderDialog
          open={!!editingOrder}
          onOpenChange={(open) => { if (!open) setEditingOrder(null); }}
          order={editingOrder}
          onSuccess={getOrders}
        />
        <Dialog
          open={!!deletingOrder}
          onOpenChange={(open) => { if (!open) setDeletingOrder(null); }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Order</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete order{" "}
                <span className="font-semibold">#{deletingOrder?.order_number}</span>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setDeletingOrder(null)}
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
          <DataTable columns={tableColumns} data={orders} />
        </Suspense>
      </div>
    </div>
  );
}
