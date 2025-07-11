import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Leaf,
      title: "Ingredientes Naturais",
      description: "Selecionamos apenas os melhores ingredientes da natureza"
    },
    {
      icon: Heart,
      title: "Feito com Carinho",
      description: "Cada produto é preparado com amor e dedicação"
    },
    {
      icon: CheckCircle,
      title: "Resultados Eficazes",
      description: "Comprovados benefícios para seu bem-estar"
    }
  ];

  return (
    <section className="py-16 bg-gradient-soft">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por Que Escolher a Ser Essência?
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card 
                key={index}
                className="text-center border-2 border-border hover:border-nature/30 transition-all duration-300 hover:shadow-natural group"
              >
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-nature rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-nature transition-colors">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-card rounded-2xl p-8 shadow-soft border border-border">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Pronto para Transformar Sua Rotina?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Descubra como nossos produtos naturais podem fazer a diferença em sua vida
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-gradient-nature hover:bg-primary-dark transition-all duration-300 shadow-natural group"
          >
            <Link to="/catalogo" className="flex items-center space-x-2">
              <span>Explorar Produtos</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;