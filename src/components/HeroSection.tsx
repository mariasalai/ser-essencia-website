import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-soft overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-nature/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-earth/10 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Conecte-se com a sua verdadeira{" "}
            <span className="text-transparent bg-gradient-nature bg-clip-text">
              Essência
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Na <strong className="text-nature">Ser Essência</strong>, acreditamos que o bem-estar vem da conexão com a natureza. 
            Nossos produtos são cuidadosamente elaborados com ingredientes naturais para 
            proporcionar momentos de relaxamento, equilíbrio e renovação em sua rotina.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-10 text-sm md:text-base">
            <div className="flex items-center space-x-2 text-nature">
              <Leaf className="h-5 w-5" />
              <span className="font-medium">100% Natural</span>
            </div>
            <div className="flex items-center space-x-2 text-nature">
              <Heart className="h-5 w-5" />
              <span className="font-medium">Feito com amor</span>
            </div>
            <div className="flex items-center space-x-2 text-nature">
              <Shield className="h-5 w-5" />
              <span className="font-medium">Bem-estar garantido</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            asChild
            size="lg"
            className="bg-gradient-nature hover:bg-primary-dark transition-all duration-300 shadow-natural text-lg px-8 py-6 group"
          >
            <Link to="/catalogo" className="flex items-center space-x-2">
              <span>Conheça nossos produtos</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;