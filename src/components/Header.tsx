import { Button } from "@/components/ui/button";
import { Leaf, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-nature" />
          <span className="text-2xl font-bold text-nature">Ser Essência</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-foreground/80 hover:text-nature transition-colors"
          >
            Início
          </Link>
          <Link 
            to="/catalogo" 
            className="text-foreground/80 hover:text-nature transition-colors"
          >
            Catálogo
          </Link>
          <Link 
            to="/sobre" 
            className="text-foreground/80 hover:text-nature transition-colors"
          >
            Sobre
          </Link>
          <Link 
            to="/contato" 
            className="text-foreground/80 hover:text-nature transition-colors"
          >
            Contato
          </Link>
        </nav>

        {/* CTA */}
        <Button 
          asChild
          className="bg-gradient-nature hover:bg-primary-dark transition-all duration-300 shadow-natural"
        >
          <Link to="/catalogo" className="flex items-center space-x-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Todos os produtos</span>
            <span className="sm:hidden">Catálogo</span>
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;