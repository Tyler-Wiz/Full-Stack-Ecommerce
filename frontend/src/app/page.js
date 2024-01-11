import Category from "@/components/client/Home/Category";
import Hero from "@/components/client/Home/Hero";
import QuestionsSection from "@/components/client/Home/QuestionsSection";
import Trending from "@/components/client/Home/Trending";
import ClientLayout from "@/components/client/shared/ClientLayout";
import { getProducts } from "@/services/api/fetch/fetchAll";

export default async function Home() {
  const products = await getProducts();
  return (
    <ClientLayout>
      <Hero />
      <Category />
      <Trending products={products} />
      <QuestionsSection />
    </ClientLayout>
  );
}
