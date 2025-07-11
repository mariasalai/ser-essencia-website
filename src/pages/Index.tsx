import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import CategoriesSection from "@/components/CategoriesSection";
import BenefitsSection from "@/components/BenefitsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductCarousel />
      <CategoriesSection />
      <BenefitsSection />
    </div>
  );
};

export default Index;
