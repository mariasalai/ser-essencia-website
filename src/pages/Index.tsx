import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import CategoriesSection from "@/components/CategoriesSection";
import BenefitsSection from "@/components/BenefitsSection";
import { Cart } from "@/components/Cart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductCarousel />
      <CategoriesSection />
      <BenefitsSection />
      <Cart />
    </div>
  );
};

export default Index;
