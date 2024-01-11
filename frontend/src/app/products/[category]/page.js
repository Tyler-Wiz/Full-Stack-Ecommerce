import React from "react";
import ClientLayout from "@/components/client/shared/ClientLayout";
import RenderProductList from "@/components/client/product/RenderProductList";
import { getProducts } from "@/services/api/fetch/fetchAll";

const page = async ({ params }) => {
  const { category } = params;
  const products = await getProducts();
  let productsInCategory;
  if (category === "women" || category === "men") {
    productsInCategory = products.filter(
      (product) => product.category[1].toLowerCase() === category.toLowerCase()
    );
  } else {
    productsInCategory = products.filter(
      (product) => product.category[0].toLowerCase() === category.toLowerCase()
    );
  }

  return (
    <ClientLayout>
      <section className="container flex-col">
        <h1 className="text-4xl font-bold montserrat my-6 ">{category}</h1>
        <div className="flex flex-wrap gap-4 w-full my-10">
          {productsInCategory.map((item, index) => (
            <div key={index} className="w-[24%]">
              <RenderProductList product={item} />
            </div>
          ))}
        </div>
      </section>
    </ClientLayout>
  );
};

export default page;
