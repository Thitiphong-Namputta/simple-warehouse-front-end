"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
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
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "../data-table";
import { AddCategoryDialog } from "@/components/products/add-category-dialog";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

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

        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={categories} />
        </Suspense>
      </div>
    </div>
  );
}
