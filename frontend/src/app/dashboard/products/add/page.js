import React from "react";
import { DateTimeComponent } from "@/utils/DateTime";
import AdminLayout from "@/components/dashboard/shared/Layout";
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import {
  getCategories,
  getBrands,
  getDiscounts,
} from "@/services/api/fetch/fetchAll";

const page = async () => {
  const currentDate = DateTimeComponent();
  const categories = await getCategories();
  const brands = await getBrands();
  const discounts = await getDiscounts();

  return (
    <AdminLayout title="Add Products" currentDate={currentDate}>
      <AddProductForm
        categories={categories}
        brands={brands}
        discounts={discounts}
      />
    </AdminLayout>
  );
};

export default page;
