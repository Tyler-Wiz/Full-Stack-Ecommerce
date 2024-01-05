import Categories from "@/components/dashboard/home/Categories";
import AdminLayout from "@/components/dashboard/shared/Layout";
import React from "react";
import {
  getCategories,
  getBrands,
  getProducts,
} from "@/services/api/fetch/fetchAll";
import Brands from "@/components/dashboard/home/Brands";
import RenderProduct from "@/components/dashboard/home/RenderProduct";
import { FaShop } from "react-icons/fa6";

const page = async () => {
  const categories = await getCategories();
  const brands = await getBrands();
  const products = await getProducts();
  return (
    <AdminLayout title="Dashboard">
      <div className="my-10">
        <RenderProduct
          data={products}
          title="Latest products"
          rating={5}
          background="bg-button"
          icon={<FaShop color="white" />}
        />
      </div>
      <section className="flex first-line:justify-between w-full gap-10">
        <Categories categories={categories} />
        <Brands brands={brands} />
      </section>
    </AdminLayout>
  );
};

export default page;
