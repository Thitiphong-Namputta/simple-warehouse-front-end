import { AppHeader } from "@/components/layouts/app-header";
import { ProductForm } from "../form";

export default function createProduct() {
  return (
    <div>
      <AppHeader title={"Add Product"} />
      <div className="mx-auto px-4 py-10">
        <ProductForm />
      </div>
    </div>
  );
}
