import AdminLayout from "@/components/dashboard/shared/Layout";
import React from "react";
import { DateTimeComponent } from "@/utils/DateTime";
import TopProducts from "@/components/dashboard/products/TopProducts";

const getProducts = async () => {
  const res = await fetch(`http://localhost:4002/api/products/`, {
    next: { revalidate: 0 },
  });
  const data = await res.json();
  return data;
};

const page = async () => {
  const currentDate = DateTimeComponent();

  const products = await getProducts();

  return (
    <AdminLayout title="Top Products" currentDate={currentDate}>
      <TopProducts products={products} />
    </AdminLayout>
  );
};

export default page;
