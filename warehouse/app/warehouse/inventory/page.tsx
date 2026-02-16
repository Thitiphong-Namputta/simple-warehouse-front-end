"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Suspense } from "react";
import { AppHeader } from "@/components/layouts/app-header";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { SectionCards } from "./section-cards";
import { AddProductDialog } from "@/components/products/add-product-dialog";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

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

  return (
    <div>
      <AppHeader title={"Inventory"} />
      <div className="mx-auto px-4 py-4">
        <Breadcrumb className="pb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
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
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={products} />
        </Suspense>
      </div>
    </div>
  );
}
