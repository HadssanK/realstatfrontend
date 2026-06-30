import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProperties from "@/components/FeaturedProperties";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProperties />
      <Stats />
      <HowItWorks />
      <Footer />
    </>
  );
}
