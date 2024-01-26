import React from "react";
import ClientLayout from "@/components/client/shared/ClientLayout";
import RenderProductList from "@/components/client/product/RenderProductList";
import { getProducts } from "@/services/api/fetch/fetchAll";

export async function generateMetadata({ params }) {
  // read route params
  const { category } = params;
  return {
    title: `${category} | Sportzy `,
    openGraph: {
      title: category,
    },
  };
}

const page = async ({ params }) => {
  const { category } = params;
  const products = await getProducts();
  let productsInCategory;
  if (category === "women" || category === "men" || category === "children") {
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
      <section className="lg:container flex-col px-6 lg:px-0">
        <h1 className="lg:text-4xl font-bold montserrat my-6 capitalize">
          {category}
        </h1>
        <div className="flex flex-wrap lg:gap-4 gap-2 w-full my-10">
          {productsInCategory.map((item, index) => (
            <div key={index} className="lg:w-[24%] w-[48%]">
              <RenderProductList product={item} />
            </div>
          ))}
        </div>
      </section>
    </ClientLayout>
  );
};

export default page;
