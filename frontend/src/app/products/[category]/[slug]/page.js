import RenderSingleProduct from "@/components/client/product/RenderSingleProduct";
import ClientLayout from "@/components/client/shared/ClientLayout";
import { productData } from "@/services/data/product";

const page = ({ params }) => {
  const { slug } = params;
  const product = productData.find(
    (product) => product.slug.toLowerCase() === slug.toLowerCase()
  );
  const productsInCategory = productData.filter(
    (products) =>
      products.category[0].toLowerCase() === product.category[0].toLowerCase()
  );

  return (
    <ClientLayout>
      <RenderSingleProduct
        product={product}
        productsInCategory={productsInCategory}
      />
    </ClientLayout>
  );
};

export default page;
