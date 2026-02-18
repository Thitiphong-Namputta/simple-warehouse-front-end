"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
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
import { getColumns, type Category } from "./columns";
import { DataTable } from "../data-table";
import { AddCategoryDialog } from "@/components/products/add-category-dialog";
import { EditCategoryDialog } from "@/components/products/edit-category-dialog";

export default function CategoryPage() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const getCategories = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((response) => {
        if (response.data) {
          setCategories(response.data.results);
        }
      })
      .catch((error) => {
        console.log("Get categories fail : ", error);
        setCategories([]);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deletingCategory) return;
    setIsDeleting(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${deletingCategory._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setDeletingCategory(null);
      getCategories();
    } catch (error) {
      console.log("Delete category fail : ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const tableColumns = getColumns(
    (category) => setEditingCategory(category),
    (category) => setDeletingCategory(category)
  );

  return (
    <div>
      <AppHeader title={"Category"} />
      <div className="mx-auto px-4 py-4">
        <Breadcrumb className="pb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/warehouse/inventory">
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Category</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Button onClick={() => setOpenDialog(true)}>
          <Plus /> ADD CATEGORY
        </Button>

        <AddCategoryDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          onSuccess={getCategories}
        />
        <EditCategoryDialog
          open={!!editingCategory}
          onOpenChange={(open) => { if (!open) setEditingCategory(null); }}
          category={editingCategory}
          onSuccess={getCategories}
        />
        <Dialog
          open={!!deletingCategory}
          onOpenChange={(open) => { if (!open) setDeletingCategory(null); }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Category</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold">{deletingCategory?.name}</span>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setDeletingCategory(null)}
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
          <DataTable columns={tableColumns} data={categories} />
        </Suspense>
      </div>
    </div>
  );
}
