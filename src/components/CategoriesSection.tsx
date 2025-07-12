import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Droplets, Sparkles, Circle, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllCategories, categoryNames, categoryDescriptions, type ProductCategory } from "@/data/products";

const categoryIcons: Record<ProductCategory, any> = {
  'escalda-pes': Droplets,
  'spray-terapeutico': Sparkles,
  'roll-on': Circle,
  'lembrancinhas': Gift
};

const CategoriesSection = () => {
  const categories = getAllCategories();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossas Categorias
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Descubra nossa linha completa de produtos naturais, cada um desenvolvido para atender às suas necessidades de bem-estar e qualidade de vida.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category];
            return (
              <Card 
                key={category}
                className="border-2 border-border hover:border-nature/30 transition-all duration-300 hover:shadow-natural group cursor-pointer overflow-hidden"
              >
                <CardContent className="p-6 text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-nature rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>

                  {/* Category Name */}
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-nature transition-colors">
                    {categoryNames[category]}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {categoryDescriptions[category]}
                  </p>

                  {/* CTA */}
                  <Button 
                    asChild
                    variant="outline"
                    className="w-full border-nature/20 text-nature hover:bg-nature hover:text-primary-foreground transition-all duration-300 group/btn"
                  >
                    <Link to={`/catalogo?categoria=${category}`} className="flex items-center justify-center space-x-2">
                      <span>Ver produtos</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;