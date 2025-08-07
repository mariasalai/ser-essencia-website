import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProductById, categoryNames } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, ShoppingCart, Heart, Share2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProdutoDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Produto não encontrado</h1>
            <Button asChild variant="outline">
              <Link to="/catalogo">Voltar ao catálogo</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "O link do produto foi copiado para a área de transferência.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-nature transition-colors">Início</Link>
          <span>/</span>
          <Link to="/catalogo" className="hover:text-nature transition-colors">Catálogo</Link>
          <span>/</span>
          <Link 
            to={`/catalogo?categoria=${product.category}`} 
            className="hover:text-nature transition-colors"
          >
            {product.category?.[0] && categoryNames[product.category[0]]}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Back Button */}
        <Button 
          asChild
          variant="outline" 
          className="mb-6 border-nature/20 text-nature hover:bg-nature hover:text-primary-foreground"
        >
          <Link to="/catalogo" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao catálogo</span>
          </Link>
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-cream/30 border-2 border-border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gradient-nature text-primary-foreground">
                  {product.category?.[0] && categoryNames[product.category[0]]}
                </Badge>
                {product.featured && (
                  <Badge variant="outline" className="border-nature text-nature">
                    Produto em destaque
                  </Badge>
                )}
                <Badge variant="outline" className="border-green-500 text-green-600">
                  <Check className="h-3 w-3 mr-1" />
                  Em Estoque
                </Badge>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleShare}
                className="text-muted-foreground hover:text-nature p-1 h-auto"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-3xl font-bold text-nature">
              {formatPrice(product.price)}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-gradient-nature hover:bg-primary-dark transition-all duration-300 shadow-natural"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Product Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <Card className="border-2 border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Ingredientes</h3>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-nature" />
                      <span className="text-muted-foreground">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <Card className="border-2 border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Benefícios</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-nature" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* How to Use */}
          {product.howToUse && (
            <Card className="border-2 border-border md:col-span-2 lg:col-span-1">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Como usar</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.howToUse}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-gradient-soft rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Gostou deste produto?
          </h3>
          <p className="text-muted-foreground mb-6">
            Explore outros produtos da categoria {product.category?.[0] && categoryNames[product.category[0]]}
          </p>
          <Button 
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-nature text-nature hover:bg-nature hover:text-primary-foreground transition-all duration-300"
          >
            <Link to={`/catalogo?categoria=${product.category}`}>
              Ver similares
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
      <Cart />
    </div>
  );
};

export default ProdutoDetalhes;