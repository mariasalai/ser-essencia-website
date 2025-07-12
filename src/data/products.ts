// Estrutura centralizada de produtos para Ser Essência
// Aqui você pode gerenciar todos os produtos em um único lugar

// Imports das imagens
import escaldaPesLavanda from '@/assets/escalda-pes-lavanda.jpg';
import sprayMelissa from '@/assets/spray-melissa.jpg';
import rollOnDorCabeca from '@/assets/roll-on-dor-cabeca.jpg';
import kitBemEstar from '@/assets/kit-bem-estar.jpg';
import sprayProtecao from '@/assets/spray-protecao.jpg';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  featured: boolean; // Para controlar quais aparecem no carrossel
  ingredients?: string[];
  benefits?: string[];
  howToUse?: string;
  inStock: boolean;
}

export type ProductCategory = 'escalda-pes' | 'spray-terapeutico' | 'roll-on' | 'lembrancinhas';

export const categoryNames: Record<ProductCategory, string> = {
  'escalda-pes': 'Escalda-Pés',
  'spray-terapeutico': 'Spray Terapêutico', 
  'roll-on': 'Roll-on Terapêutico',
  'lembrancinhas': 'Lembrancinhas'
};

export const categoryDescriptions: Record<ProductCategory, string> = {
  'escalda-pes': 'O poder de realizar um ritual milenar na sua rotina',
  'spray-terapeutico': 'Óleos essenciais em forma de spray para seu bem-estar diário',
  'roll-on': 'Alívio natural e prático para levar onde quiser',
  'lembrancinhas': 'Presentes especiais com o carinho da natureza'
};

// Base de dados dos produtos - EDITE AQUI PARA GERENCIAR TODOS OS PRODUTOS
export const products: Product[] = [
  // Escalda-Pés
  {
    id: 'eprelaxar50',
    name: 'Escalda-Pés Relaxar 50g',
    description: 'Uma pausa merecida para os seus pés e sua mente. Nosso Escalda-Pés Relaxar é feito com sal rosa do Himalaia, lavanda, camomila e hibiscos — ingredientes naturais que aliviam o cansaço físico e mental. Ao entrar em contato com a água morna, liberam um aroma suave e terapêutico que acalma, relaxa e ajuda a desacelerar depois de um dia corrido. Ideal para momentos de autocuidado e conexão com o presente. Uso único.',
    price: 9.90,
    image: escaldaPesLavanda,
    category: 'escalda-pes',
    featured: true, // PRODUTO EM DESTAQUE
    ingredients: ['Óleo Essencial de Lavanda', 'Camomila', 'Hibiscos', 'Sal grosso rosa'],
    benefits: ['Relaxamento', 'Alívio do estresse', 'Melhora a circulação'],
    howToUse: 'Dissolva o conteúdo completo em água morna, deixe os pés de molho por 15-20 minutos',
    inStock: true
  },
  {
    id: 'eprelaxar200', 
    name: 'Escalda-Pés Relaxar 200g',
    description: 'Uma pausa merecida para os seus pés e sua mente. Nosso Escalda-Pés Relaxar é feito com sal rosa do Himalaia, lavanda, camomila e hibiscos — ingredientes naturais que aliviam o cansaço físico e mental. Ao entrar em contato com a água morna, liberam um aroma suave e terapêutico que acalma, relaxa e ajuda a desacelerar depois de um dia corrido. Ideal para momentos de autocuidado e conexão com o presente. Rende até 5 usos.',
    price: 26.90,
    image: escaldaPesLavanda,
    category: 'escalda-pes',
    featured: false,
    ingredients: ['Óleo Essencial de Lavanda', 'Camomila', 'Hibiscos', 'Sal grosso rosa'],
    benefits: ['Relaxamento', 'Alívio do estresse', 'Melhora a circulação'],
    howToUse: 'Dissolva 50g do conteúdo em água morna, deixe os pés de molho por 15-20 minutos',
    inStock: true
  },

  // Spray Terapêutico
  {
    id: 'stacal60',
    name: 'Spray Terapêutico Acalmar 60ml',
    description: 'Um convite para desacelerar e cuidar de si. O Spray Terapêutico Acalmar foi desenvolvido com óleos essenciais puros e naturais que auxiliam na redução da ansiedade, promovendo serenidade e bem-estar. Ideal para incorporar à rotina noturna: borrife no travesseiro, lençóis ou no ambiente antes de dormir e permita-se relaxar profundamente. Também pode ser usado ao longo do dia, sempre que sentir o emocional sobrecarregado ou precisar se recentrar. Um gesto simples que acalma corpo, mente e coração.',
    price: 38.00,
    image: sprayMelissa,
    category: 'spray-terapeutico',
    featured: true, // PRODUTO EM DESTAQUE
    ingredients: ['Óleo essencial de Lavanda', 'Óleo essencial de Copaíba', 'Óleo essencial de Olíbano'],
    benefits: ['Reduz ansiedade', 'Promove calma','Melhora a qualidade do sono', 'Aromaterapia natural'],
    howToUse: 'Borrife no ambiente ou nas roupas sempre que precisar de tranquilidade',
    inStock: true
  },
  {
    id: 'stcon60',
    name: 'Spray Terapêutico Conectar 60ml',
    description: 'Um respiro profundo para voltar ao seu centro. O Spray Terapêutico Conectar foi criado para momentos em que você deseja se reconectar consigo mesma, cultivar presença e nutrir seu universo interior. Com uma sinergia especial de óleos essenciais que atuam no campo emocional e sutil, ele favorece a introspecção, a espiritualidade e o autoconhecimento. Ao mesmo tempo, desperta a leveza, o bom humor e a criatividade — sentimentos que florescem quando estamos verdadeiramente conectadas com quem somos. Use em práticas como meditação, yoga ou sempre que precisar de acolhimento, inspiração e equilíbrio emocional.',
    price: 38.00,
    image: sprayMelissa,
    category: 'spray-terapeutico',
    featured: false,
    ingredients: ['Óleo essencial de Bergamota', 'Óleo essencial de Laranja-Selvagem', 'Óleo essencial de Limão-Siciliano'],
    benefits: ['Promove presença e reconexão interior', 'Estimula o bom humor e a leveza emocional', 'Desperta a criatividade'],
    howToUse: 'Borrife no ambiente e inale profundamente o aroma',
    inStock: true
  },
  {
    id: 'stdes60',
    name: 'Spray Terapêutico Despertar 60ml',
    description: 'Para começar o dia com clareza, energia e vitalidade. O Spray Terapêutico Despertar é uma sinergia vibrante de hortelã-pimenta, menta verde e cipreste — óleos essenciais reconhecidos por estimularem a mente, melhorarem a respiração e ativarem a circulação. Ideal para usar ao acordar, durante o trabalho ou antes de se exercitar, ele refresca, anima e desperta corpo e mente para um novo ciclo. Uma borrifada e você já sente a diferença.',
    price: 38.00,
    image: sprayMelissa,
    category: 'spray-terapeutico',
    featured: false,
    ingredients: ['Óleo essencial de Hortelã-Pimenta', 'Óleo essencial de Menta Verde', 'Óleo essencial de Cipreste'],
    benefits: ['Estimula o foco e a clareza mental', 'Melhora a respiração', 'Ativa o corpo', 'Ajuda a sair da estagnação e do cansaço mental'],
    howToUse: 'Borrife no ambiente e inale profundamente o aroma',
    inStock: true
  },

  // Roll-on Terapêutico
  {
    id: 'ro001',
    name: 'Roll-on Dor de Cabeça',
    description: 'Alívio natural para dores de cabeça com óleos essenciais terapêuticos',
    price: 22.90,
    image: rollOnDorCabeca,
    category: 'roll-on',
    featured: true, // PRODUTO EM DESTAQUE
    ingredients: ['Óleo de Hortelã-pimenta', 'Eucalipto', 'Óleo de coco'],
    benefits: ['Alívio rápido', 'Efeito refrescante', 'Portátil'],
    howToUse: 'Aplique nas têmporas e nuca em movimentos circulares suaves',
    inStock: true
  },
  {
    id: 'ro002',
    name: 'Roll-on Ansiedade',
    description: 'Blend calmante para momentos de ansiedade e estresse',
    price: 24.90,
    image: '/api/placeholder/300/300',
    category: 'roll-on',
    featured: false,
    ingredients: ['Lavanda', 'Bergamota', 'Ylang-ylang'],
    benefits: ['Reduz ansiedade', 'Promove equilíbrio', 'Efeito imediato'],
    howToUse: 'Aplique nos pulsos e respire profundamente',
    inStock: true
  },

  // Lembrancinhas
  {
    id: 'lb001',
    name: 'Kit Bem-Estar Mini',
    description: 'Kit presente com miniatures de nossos produtos mais queridos',
    price: 45.90,
    image: kitBemEstar,
    category: 'lembrancinhas',
    featured: true, // PRODUTO EM DESTAQUE
    ingredients: ['Vários produtos em tamanho mini'],
    benefits: ['Presente ideal', 'Conhecer a linha', 'Tamanho viagem'],
    howToUse: 'Conjunto perfeito para presentear ou experimentar nossa linha',
    inStock: true
  },
  {
    id: 'lb002',
    name: 'Sachê Aromatizador Natural',
    description: 'Sachês aromáticos naturais para gavetas e armários',
    price: 15.90,
    image: '/api/placeholder/300/300',
    category: 'lembrancinhas',
    featured: false,
    ingredients: ['Ervas secas naturais', 'Tecido de algodão'],
    benefits: ['Aroma duradouro', 'Natural', 'Decorativo'],
    howToUse: 'Coloque em gavetas, armários ou ambientes pequenos',
    inStock: true
  },
];

// Funções utilitárias para facilitar o uso
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured && product.inStock).slice(0, 5);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(product => product.category === category && product.inStock);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getAllCategories = (): ProductCategory[] => {
  return ['escalda-pes', 'spray-terapeutico', 'roll-on', 'lembrancinhas'];
};