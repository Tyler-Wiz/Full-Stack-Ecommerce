import React from "react";
import RenderProductPage from "@/components/client/product/RenderProductPage";
import { getProducts } from "@/services/api/fetch/fetchAll";

const page = async () => {
  const products = await getProducts();
  return <RenderProductPage products={products} />;
};

export default page;
