import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { Instagram, MessageCircle, Mail, Clock, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contato = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Entre em contato
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Adoramos conversar! Entre em contato conosco para tirar dúvidas, fazer pedidos ou apenas trocar uma ideia sobre bem-estar e aromaterapia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Informações de Contato */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Leaf className="h-6 w-6 text-nature mr-2" />
                Nossos canais
              </h2>
              
              <div className="space-y-6">
                {/* WhatsApp */}
                <Card className="border-nature/20 hover:border-nature/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-nature p-3 rounded-lg">
                        <MessageCircle className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
                        <p className="text-muted-foreground mb-3">
                          Nossa forma favorita de conversar! Tire dúvidas, faça pedidos ou receba orientações personalizadas.
                        </p>
                        <Button 
                          asChild
                          className="bg-gradient-nature hover:bg-primary-dark transition-all duration-300"
                        >
                          <a 
                            href="https://wa.me/5547999382587" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>(47) 9 9938-2587</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Instagram */}
                <Card className="border-nature/20 hover:border-nature/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-nature p-3 rounded-lg">
                        <Instagram className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">Instagram</h3>
                        <p className="text-muted-foreground mb-3">
                          Siga-nos para acompanhar nosso dia a dia, dicas de bem-estar e novidades dos produtos.
                        </p>
                        <Button 
                          asChild
                          variant="outline"
                          className="border-nature text-nature hover:bg-nature hover:text-primary-foreground transition-all duration-300"
                        >
                          <a 
                            href="https://instagram.com/byseressencia" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2"
                          >
                            <Instagram className="h-4 w-4" />
                            <span>@byseressencia</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Atendimento */}
                <Card className="border-nature/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-nature p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">Horário de atendimento</h3>
                        <div className="text-muted-foreground space-y-1">
                          <p>Segunda a sexta: 9h às 18h</p>
                          <p>Sábado: 9h às 12h</p>
                          <p className="text-sm mt-2 text-nature">
                            Respondemos todas as mensagens com carinho! ❤️
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Lado direito - Sobre o atendimento */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Como podemos te ajudar?
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-soft p-6 rounded-lg border border-nature/10">
                  <h3 className="font-semibold text-nature mb-3">
                    🌿 Dúvidas sobre produtos
                  </h3>
                  <p className="text-muted-foreground">
                    Quer saber qual produto é ideal para você? Mande uma mensagem e te ajudamos a escolher baseado nas suas necessidades e preferências.
                  </p>
                </div>

                <div className="bg-gradient-soft p-6 rounded-lg border border-nature/10">
                  <h3 className="font-semibold text-nature mb-3">
                    💚 Orientações de uso
                  </h3>
                  <p className="text-muted-foreground">
                    Compartilhamos dicas de como usar nossos produtos da melhor forma para potencializar os benefícios da aromaterapia.
                  </p>
                </div>

                <div className="bg-gradient-soft p-6 rounded-lg border border-nature/10">
                  <h3 className="font-semibold text-nature mb-3">
                    🛍️ Pedidos personalizados
                  </h3>
                  <p className="text-muted-foreground">
                    Temos opções de kits e produtos personalizados. Entre em contato para criar algo especial para você ou para presentear.
                  </p>
                </div>

                <div className="bg-gradient-soft p-6 rounded-lg border border-nature/10">
                  <h3 className="font-semibold text-nature mb-3">
                    ✨ Sobre aromaterapia
                  </h3>
                  <p className="text-muted-foreground">
                    Adoramos conversar sobre os benefícios dos óleos essenciais e como a aromaterapia pode fazer parte da sua rotina de bem-estar.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="bg-gradient-nature p-6 rounded-lg text-primary-foreground text-center">
              <h3 className="text-xl font-semibold mb-3">
                Vamos conversar?
              </h3>
              <p className="mb-4 opacity-90">
                Estamos aqui para te acompanhar nessa jornada de bem-estar e conexão com a natureza.
              </p>
              <Button 
                asChild
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <a 
                  href="https://wa.me/5547999382587" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Iniciar conversa</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Cart />
    </div>
  );
};

export default Contato;