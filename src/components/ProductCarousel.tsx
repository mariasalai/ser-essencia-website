import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { Link } from "react-router-dom";

type ProductHighlightsProps = {
  productIds?: string[]; // IDs dos produtos a exibir
};

const ProductHighlights = ({ productIds }: ProductHighlightsProps) => {
  const allProducts = getFeaturedProducts();

  const featuredProducts = productIds?.length
    ? allProducts.filter((product) => productIds.includes(product.id))
    : allProducts.slice(0, 3); // se não passar IDs, exibe os 3 primeiros

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (featuredProducts.length === 0) return null;

  return (
    <section className="py-16 bg-cream/30">
      <div className="container mx-auto px-4">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="h-6 w-6 text-nature fill-nature" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Mais Vendidos
            </h2>
            <Star className="h-6 w-6 text-nature fill-nature" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça os favoritos dos nossos clientes
          </p>
        </div>

        {/* Grade de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden border-2 border-nature/10 hover:border-nature/30 transition-all duration-300 hover:shadow-natural group"
            >
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
                      Ver produto
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botão "Ver todos" */}
        <div className="text-center mt-12">
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-nature text-nature hover:bg-nature hover:text-primary-foreground transition-all duration-300"
          >
            <Link to="/catalogo">
              Ver todos os produtos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
