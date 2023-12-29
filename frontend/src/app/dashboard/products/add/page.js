import React from "react";
import { DateTimeComponent } from "@/utils/DateTime";
import AdminLayout from "@/components/dashboard/shared/Layout";
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import {
  getCategories,
  getBrands,
  getProducts,
  getDiscounts,
} from "@/services/api/fetch/fetchAll";

const page = async () => {
  const currentDate = DateTimeComponent();
  const categories = await getCategories();
  const brands = await getBrands();
  const products = await getProducts();
  const discounts = await getDiscounts();

  return (
    <AdminLayout title="Add Products" currentDate={currentDate}>
      <div className="flex text-sm my-3 ml-2 gap-3">
        <p>Products:</p>
        <p>All({products.length})</p>
        <p>|</p>
        <p>
          Published <span>({products.length})</span>
        </p>
      </div>
      <AddProductForm
        categories={categories}
        brands={brands}
        discounts={discounts}
      />
    </AdminLayout>
  );
};

export default page;
