import AdminLayout from "@/components/dashboard/shared/Layout";
import React from "react";
import { DateTimeComponent } from "@/utils/DateTime";

// const getProduct = async (id) => {
//   const res = await fetch(`http://localhost:4002/api/products/${id}`, {
//     next: { revalidate: 0 },
//   });
//   const data = await res.json();
//   return data;
// };

// const getProducts = async () => {
//   const res = await fetch(`http://localhost:4002/api/products/`);
//   const data = await res.json();
//   const resultArray = [];
//   await Promise.all(
//     data.map(async (item) => {
//       const result = await getProduct(item.id);
//       resultArray.push(result);
//     })
//   );
//   return resultArray;
// };

const page = async () => {
  const currentDate = DateTimeComponent();

  return <AdminLayout title="Products" currentDate={currentDate}></AdminLayout>;
};

export default page;
