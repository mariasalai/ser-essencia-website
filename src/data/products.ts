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
  'escalda-pes': 'Escalda Pés',
  'spray-terapeutico': 'Spray Terapêutico', 
  'roll-on': 'Roll-on Terapêutico',
  'lembrancinhas': 'Lembrancinhas'
};

export const categoryDescriptions: Record<ProductCategory, string> = {
  'escalda-pes': 'Relaxamento profundo para seus pés com ervas naturais',
  'spray-terapeutico': 'Óleos essenciais para seu bem-estar diário',
  'roll-on': 'Alívio natural e prático para levar onde quiser',
  'lembrancinhas': 'Presentes especiais com o carinho da natureza'
};

// Base de dados dos produtos - EDITE AQUI PARA GERENCIAR TODOS OS PRODUTOS
export const products: Product[] = [
  // Escalda Pés
  {
    id: 'ep001',
    name: 'Escalda Pés Relaxante Lavanda',
    description: 'Mistura especial de ervas naturais com lavanda para um relaxamento profundo dos pés',
    price: 25.90,
    image: escaldaPesLavanda,
    category: 'escalda-pes',
    featured: true, // PRODUTO EM DESTAQUE
    ingredients: ['Lavanda', 'Camomila', 'Hortelã', 'Sal marinho'],
    benefits: ['Relaxamento', 'Alívio do estresse', 'Melhora a circulação'],
    howToUse: 'Dissolva 2 colheres em água morna e deixe os pés de molho por 15-20 minutos',
    inStock: true
  },
  {
    id: 'ep002', 
    name: 'Escalda Pés Energizante Eucalipto',
    description: 'Fórmula revigorante com eucalipto para revitalizar e energizar',
    price: 28.90,
    image: '/api/placeholder/300/300',
    category: 'escalda-pes',
    featured: false,
    ingredients: ['Eucalipto', 'Alecrim', 'Mentol natural'],
    benefits: ['Energização', 'Alívio de tensões', 'Sensação refrescante'],
    howToUse: 'Dissolva 2 colheres em água morna pela manhã para energizar o dia',
    inStock: true
  },

  // Spray Terapêutico
  {
    id: 'st001',
    name: 'Spray Calmante Melissa',
    description: 'Spray natural com melissa para momentos de tranquilidade e bem-estar',
    price: 35.90,
    image: sprayMelissa,
    category: 'spray-terapeutico',
    featured: true, // PRODUTO EM DESTAQUE
    ingredients: ['Óleo essencial de Melissa', 'Água destilada', 'Álcool de cereais'],
    benefits: ['Reduz ansiedade', 'Promove calma', 'Aromaterapia natural'],
    howToUse: 'Borrife no ambiente ou nas roupas sempre que precisar de tranquilidade',
    inStock: true
  },
  {
    id: 'st002',
    name: 'Spray Purificador Tea Tree',
    description: 'Spray antibacteriano natural com tea tree para purificar ambientes',
    price: 32.90,
    image: '/api/placeholder/300/300',
    category: 'spray-terapeutico',
    featured: false,
    ingredients: ['Tea Tree', 'Alecrim', 'Álcool 70%'],
    benefits: ['Purifica o ar', 'Propriedades antibacterianas', 'Aroma revigorante'],
    howToUse: 'Borrife no ambiente para purificar e aromatizar',
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

  // Produto adicional para completar o carrossel
  {
    id: 'st003',
    name: 'Spray Proteção Energética',
    description: 'Blend especial para limpeza energética e proteção do ambiente',
    price: 38.90,
    image: sprayProtecao,
    category: 'spray-terapeutico',
    featured: true, // PRODUTO EM DESTAQUE - 5º produto
    ingredients: ['Arruda', 'Guiné', 'Alecrim', 'Água energizada'],
    benefits: ['Proteção energética', 'Limpeza de ambientes', 'Paz interior'],
    howToUse: 'Borrife no ambiente e em sua aura para proteção energética',
    inStock: true
  }
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