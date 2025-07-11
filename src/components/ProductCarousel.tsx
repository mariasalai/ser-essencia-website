import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { getFeaturedProducts, type Product } from "@/data/products";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const featuredProducts = getFeaturedProducts();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-cream/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="h-6 w-6 text-nature fill-nature" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Produtos em Destaque
            </h2>
            <Star className="h-6 w-6 text-nature fill-nature" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça nossa seleção especial de produtos mais queridos pelos nossos clientes
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-2 border-nature/20 hover:border-nature hover:bg-nature hover:text-primary-foreground shadow-soft"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-2 border-nature/20 hover:border-nature hover:bg-nature hover:text-primary-foreground shadow-soft"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Products Display */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="w-full flex-shrink-0 px-4">
                  <Card className="overflow-hidden border-2 border-nature/10 hover:border-nature/30 transition-all duration-300 hover:shadow-natural group">
                    <div className="aspect-square relative overflow-hidden bg-cream/50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-nature text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          Destaque
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-nature transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-nature">
                          {formatPrice(product.price)}
                        </span>
                        <Button 
                          asChild
                          className="bg-gradient-nature hover:bg-primary-dark transition-all duration-300"
                        >
                          <Link to={`/produto/${product.id}`}>
                            Ver Produto
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-nature scale-110' 
                    : 'bg-nature/30 hover:bg-nature/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-nature text-nature hover:bg-nature hover:text-primary-foreground transition-all duration-300"
          >
            <Link to="/catalogo">
              Ver Todos os Produtos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;