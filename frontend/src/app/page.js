import Footer from "@/components/client/Footer";
import Header from "@/components/client/Header";
import Category from "@/components/client/Home/Category";
import Hero from "@/components/client/Home/Hero";
import QuestionsSection from "@/components/client/Home/QuestionsSection";
import Trending from "@/components/client/Home/Trending";
export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Category />
      <Trending />
      <QuestionsSection />
      <Footer />
    </main>
  );
}
