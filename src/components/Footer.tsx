import { Leaf, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-nature text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                <Leaf className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">Ser Essência</span>
            </Link>
            <p className="text-primary-foreground/80 max-w-md leading-relaxed">
              Produtos naturais criados com carinho para trazer bem-estar, 
              conexão e presença para a sua vida.
            </p>
          </div>

          {/* Links de Navegação */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navegação</h3>
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Início
              </Link>
              <Link 
                to="/catalogo" 
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Catálogo
              </Link>
              <Link 
                to="/sobre" 
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Sobre
              </Link>
              <Link 
                to="/contato" 
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Contato
              </Link>
            </nav>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Fale conosco</h3>
            <div className="space-y-3">
              <a 
                href="https://instagram.com/byseressencia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
              >
                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>@byseressencia</span>
              </a>
              <a 
                href="https://wa.me/5547999382587" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
              >
                <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>(47) 9 9938-2587</span>
              </a>
            </div>
          </div>
        </div>

        {/* Linha divisória e copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-primary-foreground/60">
            © {currentYear} Ser Essência. Feito com ❤️ para conectar você com sua essência.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;