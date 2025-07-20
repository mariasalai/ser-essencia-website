import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { Leaf, Heart, Users, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Sobre = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            
            <main className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-gradient-nature p-4 rounded-full">
                            <Leaf className="h-8 w-8 text-primary-foreground" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Sobre a Ser Essência
                    </h1>
                    <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed text-muted-foreground">
                        <p>
                            A Ser Essência nasceu do desejo de viver com mais presença, calma e conexão. Em meio à correria do dia a dia, percebemos o quanto é precioso parar, respirar e se reconectar com o que realmente importa: a nossa essência.
                        </p>
                        
                        <p>
                            Criamos cada produto com a intenção de transformar pequenos momentos em verdadeiros rituais de cuidado. Acreditamos no poder da natureza para restaurar, equilibrar e acolher — e é por isso que escolhemos trabalhar com óleos essenciais puros, ingredientes naturais e um processo artesanal cheio de carinho.
                        </p>
                        
                        <p className="text-nature font-medium">
                            Nosso propósito vai além de oferecer produtos: queremos te inspirar a criar pausas, viver com mais intenção e sentir o bem-estar em sua forma mais simples e verdadeira.
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {/* Missão */}
                    <Card className="border-nature/20 hover:border-nature/40 transition-colors">
                        <CardContent className="p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-gradient-nature p-3 rounded-lg mr-4">
                                    <Target className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <h2 className="text-2xl font-semibold text-foreground">🌱 Nossa missão</h2>
                            </div>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                Levar bem-estar e qualidade de vida através de experiências sensoriais que aproximam as pessoas de si mesmas e da natureza.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Valores */}
                    <Card className="border-nature/20 hover:border-nature/40 transition-colors">
                        <CardContent className="p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-gradient-nature p-3 rounded-lg mr-4">
                                    <Heart className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <h2 className="text-2xl font-semibold text-foreground">💚 Nossos valores</h2>
                            </div>
                            <ul className="space-y-3 text-lg text-muted-foreground">
                                <li className="flex items-start">
                                    <span className="text-nature mr-2">•</span>
                                    Cuidado com as pessoas e com o planeta
                                </li>
                                <li className="flex items-start">
                                    <span className="text-nature mr-2">•</span>
                                    Respeito à natureza
                                </li>
                                <li className="flex items-start">
                                    <span className="text-nature mr-2">•</span>
                                    Simplicidade
                                </li>
                                <li className="flex items-start">
                                    <span className="text-nature mr-2">•</span>
                                    Autenticidade
                                </li>
                                <li className="flex items-start">
                                    <span className="text-nature mr-2">•</span>
                                    Amor pelo processo
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Quem Somos Section */}
                <Card className="border-nature/20 mb-8">
                    <CardContent className="p-8 md:p-12">
                        <div className="flex items-center mb-8">
                            <div className="bg-gradient-nature p-3 rounded-lg mr-4">
                                <Users className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <h2 className="text-3xl font-semibold text-foreground">✨ Quem somos</h2>
                        </div>
                        
                        <div className="space-y-8 text-lg leading-relaxed">
                            <p className="text-muted-foreground">
                                Somos a <strong className="text-nature">Maria</strong> e a <strong className="text-nature">Priscila</strong> (ou <em>Prii</em>, como carinhosamente é chamada), amigas, cunhadas, sócias e mulheres que encontraram na natureza e no cuidado uma forma de viver com mais verdade e intenção.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Maria */}
                                <div className="bg-gradient-soft p-6 rounded-lg border border-nature/10">
                                    <h3 className="font-semibold text-nature mb-3 text-xl">Maria</h3>
                                    <p className="text-muted-foreground">
                                        Vem da área de tecnologia, mas foi na aromaterapia que encontrou uma paixão que toca o coração — e também uma forma de encantar, criar e cuidar. É ela quem elabora cada fórmula com técnica e sensibilidade, desenvolve as etiquetas, cuida das redes sociais e está por trás de toda a criatividade da marca.
                                    </p>
                                </div>

                                {/* Priscila */}
                                <div className="bg-gradient-soft p-6 rounded-lg border border-nature/10">
                                    <h3 className="font-semibold text-nature mb-3 text-xl">Priscila</h3>
                                    <p className="text-muted-foreground">
                                        É mãe, psicóloga e amante genuína da natureza. Adora uma boa caminhada ao ar livre e tem uma conexão especial com tudo que envolve o natural e o humano. É ela quem traz ideias cheias de propósito, acolhe com leveza e tem o dom de se conectar com as pessoas. No dia a dia, é quem comanda a produção artesanal com muito carinho e dedicação.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gradient-nature p-6 rounded-lg text-primary-foreground text-center">
                                <p className="text-lg">
                                    Juntas, somos a mistura de técnica e intuição, criatividade e sensibilidade. Cada produto da Ser Essência nasce dessa união — com intenção, cuidado e o desejo sincero de levar bem-estar e presença para a sua vida.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
            
            <Footer />
            <Cart />
        </div>
    );
};

export default Sobre;