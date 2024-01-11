import React from "react";
import { DateTimeComponent } from "@/utils/DateTime";
import AdminLayout from "@/components/dashboard/shared/Layout";
import AddProductForm from "@/components/dashboard/products/AddProductForm";

const page = async () => {
  const currentDate = DateTimeComponent();
  return (
    <AdminLayout title="Add Products" currentDate={currentDate}>
      <AddProductForm />
    </AdminLayout>
  );
};

export default page;
