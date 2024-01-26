import RenderSingleProduct from "@/components/client/product/RenderSingleProduct";
import ClientLayout from "@/components/client/shared/ClientLayout";
import { getSingleProduct, getProducts } from "@/services/api/fetch/fetchAll";

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = params;
  // fetch data
  const product = await getSingleProduct(slug);
  return {
    title: `${product.name} | Sportzy `,
    openGraph: {
      title: product.name,
      description: product.description,
    },
  };
}

const page = async ({ params }) => {
  const { slug } = params;
  const product = await getSingleProduct(slug);
  const allProducts = await getProducts();
  const productsInCategory = allProducts.filter(
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
