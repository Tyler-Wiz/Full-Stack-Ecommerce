import React from "react";
import ClientLayout from "@/components/client/shared/ClientLayout";
import RenderProductList from "@/components/client/product/RenderProductList";
import Image from "next/image";
import { getProducts } from "@/services/api/fetch/fetchAll";

const page = async ({ params }) => {
  const { query } = params;
  const allProducts = await getProducts();
  const products = allProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ClientLayout>
      <section className="container flex-col">
        {products.length <= 0 ? (
          <div className="my-6 mx-auto">
            <div className="relative w-96 h-96">
              <Image
                src="/img/client/ProductNotFound.png"
                fill
                alt="product not found"
              />
            </div>
            <h3 className="text-2xl font-bold jost my-6">
              No Product found with the name "{query}"
            </h3>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold montserrat my-6 ">{query}</h1>
            <div className="flex flex-wrap gap-4 w-full my-10">
              {products.map((item, index) => (
                <div key={index} className="w-[24%]">
                  <RenderProductList product={item} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </ClientLayout>
  );
};

export default page;
