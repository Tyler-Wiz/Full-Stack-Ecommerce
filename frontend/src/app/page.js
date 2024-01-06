import Footer from "@/components/client/Footer";
import Header from "@/components/client/Header";
import Category from "@/components/client/Home/Category";
import Hero from "@/components/client/Home/Hero";
import QuestionsSection from "@/components/client/Home/QuestionsSection";
import Trending from "@/components/client/Home/Trending";
import ClientLayout from "@/components/client/shared/ClientLayout";
export default function Home() {
  return (
    <ClientLayout>
      <Hero />
      <Category />
      <Trending />
      <QuestionsSection />
    </ClientLayout>
  );
}
