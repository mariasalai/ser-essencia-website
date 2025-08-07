import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  products, 
  getAllCategories, 
  categoryNames, 
  getProductsByCategory,
  type ProductCategory,
  type Product 
} from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { ArrowRight, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";

const Catalogo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<Set<ProductCategory>>(new Set());
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const categories = getAllCategories();

  useEffect(() => {
    const categoria = searchParams.get('categoria') as ProductCategory;
    if (categoria && categories.includes(categoria)) {
      setSelectedCategories(new Set([categoria]));
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedCategories.size === 0) {
      setFilteredProducts(products.filter(p => p.inStock));
    } else {
      const filtered = products.filter(product => 
        product.inStock && 
        product.category && 
        product.category.some(cat => selectedCategories.has(cat))
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategories]);

  const handleCategoryFilter = (category: ProductCategory) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
    
    if (newCategories.size === 0) {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: Array.from(newCategories).join(',') });
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories(new Set());
    setSearchParams({});
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Catálogo de produtos
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Descubra todos os nossos produtos, feitos especialmente para trazer mais conexão a sua vida
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-nature" />
            <span className="font-medium text-foreground">Filtrar por categoria:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategories.size === 0 ? 'default' : 'outline'}
              onClick={handleClearFilters}
              className={`${
                selectedCategories.size === 0 
                  ? 'bg-gradient-nature hover:bg-primary-dark' 
                  : 'border-nature/20 text-nature hover:bg-nature hover:text-primary-foreground'
              } transition-all duration-300`}
            >
              Todos os produtos
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategories.has(category) ? 'default' : 'outline'}
                onClick={() => handleCategoryFilter(category)}
                className={`${
                  selectedCategories.has(category) 
                    ? 'bg-gradient-nature hover:bg-primary-dark' 
                    : 'border-nature/20 text-nature hover:bg-nature hover:text-primary-foreground'
                } transition-all duration-300`}
              >
                {categoryNames[category]}
              </Button>
            ))}
          </div>

          {selectedCategories.size > 0 && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Filtrando por:</span>
              {Array.from(selectedCategories).map((category) => (
                <Badge key={category} variant="outline" className="border-nature text-nature">
                  {categoryNames[category]}
                  <button
                    onClick={() => handleCategoryFilter(category)}
                    className="ml-2 hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-muted-foreground hover:text-destructive"
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id}
              className="overflow-hidden border-2 border-border hover:border-nature/30 transition-all duration-300 hover:shadow-natural group cursor-pointer"
            >
              <Link to={`/produto/${product.id}`} className="block">
                <div className="aspect-square relative overflow-hidden bg-cream/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                {product.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gradient-nature text-primary-foreground">
                      Destaque
                    </Badge>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  {product.category?.[0] && categoryNames[product.category[0]] && (
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      {categoryNames[product.category[0]]}
                    </Badge>
                  )}
                </div>
                </div>
              </Link>
              
              <CardContent className="p-4">
                <Link to={`/produto/${product.id}`}>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-nature transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                </Link>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-nature">
                    {formatPrice(product.price)}
                  </span>
                  <Button 
                    asChild
                    size="sm"
                    className="bg-gradient-nature hover:bg-primary-dark transition-all duration-300 group/btn"
                  >
                    <Link to={`/produto/${product.id}`} className="flex items-center space-x-1">
                      <span>Ver</span>
                      <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              Nenhum produto encontrado nesta categoria.
            </p>
            <Button 
              onClick={handleClearFilters}
              variant="outline"
              className="border-nature text-nature hover:bg-nature hover:text-primary-foreground"
            >
              Ver todos os produtos
            </Button>
          </div>
        )}

        {/* Product Count */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-8 text-muted-foreground">
            {filteredProducts.length === 1 
              ? '1 produto encontrado' 
              : `${filteredProducts.length} produtos encontrados`
            }
          </div>
        )}
      </main>
      <Footer />
      <Cart />
    </div>
  );
};

export default Catalogo;