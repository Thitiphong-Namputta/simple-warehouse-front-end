"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import { AppHeader } from "@/components/layouts/app-header";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { getColumns, type Product } from "./columns";
import { DataTable } from "./data-table";
import { SectionCards } from "./section-cards";
import { AddProductDialog } from "@/components/products/add-product-dialog";
import { EditProductDialog } from "@/components/products/edit-product-dialog";

export default function Inventory() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const getProducts = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(async (response) => {
        if (response.data) {
          console.log(response);
          setProducts(response.data.results);
        }
      })
      .catch((error) => {
        console.log("Get products fail : ", error);
        setProducts([]);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deletingProduct) return;
    setIsDeleting(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${deletingProduct._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setDeletingProduct(null);
      getProducts();
    } catch (error) {
      console.log("Delete product fail : ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const tableColumns = getColumns(
    (product) => setEditingProduct(product),
    (product) => setDeletingProduct(product)
  );

  return (
    <div>
      <AppHeader title={"Inventory"} />
      <div className="mx-auto px-4 py-4">
        <Breadcrumb className="pb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/warehouse/inventory/summary">Summary</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="@container/main flex flex-1 flex-col">
          <div className="flex flex-col pb-4">
            <SectionCards />
          </div>
        </div>
        <Button className="ms-2" onClick={() => setOpenDialog(true)}>
          <Plus /> ADD PRODUCT
        </Button>
        <AddProductDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          onSuccess={getProducts}
        />
        <EditProductDialog
          open={!!editingProduct}
          onOpenChange={(open) => { if (!open) setEditingProduct(null); }}
          product={editingProduct}
          onSuccess={getProducts}
        />
        <Dialog
          open={!!deletingProduct}
          onOpenChange={(open) => { if (!open) setDeletingProduct(null); }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold">{deletingProduct?.name}</span>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setDeletingProduct(null)}
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
          <DataTable columns={tableColumns} data={products} />
        </Suspense>
      </div>
    </div>
  );
}
