import React from "react";
import ClientLayout from "@/components/client/shared/ClientLayout";
import RenderProductList from "@/components/client/product/RenderProductList";
import { productData } from "@/services/data/product";

const page = ({ params }) => {
  const { category } = params;
  const productsInCategory = productData.filter(
    (product) => product.category[0].toLowerCase() === category.toLowerCase()
  );

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
