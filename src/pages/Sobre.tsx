import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Cart } from "@/components/Cart";

const Sobre = () => {

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <section className="py-12 px-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">🌿 Sobre a Ser Essência</h1>
                
                <p className="mb-4 text-lg leading-relaxed">
                    A Ser Essência nasceu do desejo de viver com mais presença, calma e conexão. Em meio à correria do dia a dia, percebemos o quanto é precioso parar, respirar e se reconectar com o que realmente importa: a nossa essência.
                </p>
                
                <p className="mb-4 text-lg leading-relaxed">
                    Criamos cada produto com a intenção de transformar pequenos momentos em verdadeiros rituais de cuidado. Acreditamos no poder da natureza para restaurar, equilibrar e acolher — e é por isso que escolhemos trabalhar com óleos essenciais puros, ingredientes naturais e um processo artesanal cheio de carinho.
                </p>
                
                <p className="mb-8 text-lg leading-relaxed">
                    Nosso propósito vai além de oferecer produtos: queremos te inspirar a criar pausas, viver com mais intenção e sentir o bem-estar em sua forma mais simples e verdadeira.
                </p>

                <div className="mb-10">
                    <h2 className="text-2xl font-semibold mb-2">🌱 Nossa missão</h2>
                    <p className="text-lg leading-relaxed">
                    Levar bem-estar e qualidade de vida através de experiências sensoriais que aproximam as pessoas de si mesmas e da natureza.
                    </p>
                </div>

                <div className="mb-10">
                    <h2 className="text-2xl font-semibold mb-2">💚 Nossos valores</h2>
                    <ul className="list-disc pl-6 text-lg leading-relaxed">
                    <li>Cuidado com as pessoas e com o planeta</li>
                    <li>Respeito à natureza</li>
                    <li>Simplicidade</li>
                    <li>Autenticidade</li>
                    <li>Amor pelo processo</li>
                    </ul>
                </div>

                <div>
                <h2 className="text-2xl font-semibold mb-4">✨ Quem somos</h2>
                
                <p className="mb-4 text-lg leading-relaxed">
                    Somos a <strong>Maria</strong> e a <strong>Priscila</strong> (ou <em>Prii</em>, como carinhosamente é chamada), amigas, cunhadas, sócias e mulheres que encontraram na natureza e no cuidado uma forma de viver com mais verdade e intenção.
                </p>

                <p className="mb-4 text-lg leading-relaxed">
                    A <strong>Maria</strong> vem da área de tecnologia, mas foi na aromaterapia que encontrou uma paixão que toca o coração — e também uma forma de encantar, criar e cuidar. É ela quem elabora cada fórmula com técnica e sensibilidade, desenvolve as etiquetas, cuida das redes sociais e está por trás de toda a criatividade da marca.
                </p>

                <p className="mb-4 text-lg leading-relaxed">
                    A <strong>Priscila</strong> é mãe, psicóloga e amante genuína da natureza. Adora uma boa caminhada ao ar livre e tem uma conexão especial com tudo que envolve o natural e o humano. É ela quem traz ideias cheias de propósito, acolhe com leveza e tem o dom de se conectar com as pessoas. No dia a dia, é quem comanda a produção artesanal com muito carinho e dedicação.
                </p>

                <p className="text-lg leading-relaxed">
                    Juntas, somos a mistura de técnica e intuição, criatividade e sensibilidade. Cada produto da Ser Essência nasce dessa união — com intenção, cuidado e o desejo sincero de levar bem-estar e presença para a sua vida.
                </p>
                </div>
            </section>
        </div>
    );
};

export default Sobre;


