"use client";

import { AppHeader } from "@/components/layouts/app-header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductForm } from "../form";

export default function CreateProduct() {
  return (
    <div>
      <AppHeader title={"Add Product"} />
      <div className="mx-auto px-4 py-4">
        <Breadcrumb className="pb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/warehouse/inventory">
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>Add Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ProductForm />
      </div>
    </div>
  );
}
