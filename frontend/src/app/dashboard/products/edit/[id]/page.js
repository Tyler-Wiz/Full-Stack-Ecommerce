import AdminLayout from "@/components/dashboard/shared/Layout";
import React from "react";
import { DateTimeComponent } from "@/utils/DateTime";
import EditProductForm from "@/components/dashboard/products/EditProductForm";
import { getSingleProduct } from "@/services/api/fetch/fetchAll";
const currentDate = DateTimeComponent();

const page = async ({ params }) => {
  const product = await getSingleProduct(params.id);
  return (
    <AdminLayout currentDate={currentDate} title="Edit Product">
      <EditProductForm product={product} />
    </AdminLayout>
  );
};

export default page;
