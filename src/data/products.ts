// Estrutura centralizada de produtos para Ser Essência
// Aqui você pode gerenciar todos os produtos em um único lugar

// Imports das imagens
import escaldaPesLavanda from '@/assets/escalda-pes-lavanda.jpg';
import sprayMelissa from '@/assets/spray-melissa.jpg';
import rollOnDorCabeca from '@/assets/roll-on-dor-cabeca.jpg';
import kitBemEstar from '@/assets/kit-bem-estar.jpg';
import sprayProtecao from '@/assets/spray-protecao.jpg';
import esp501 from '@/assets/esp501.jpg';
import esp502 from '@/assets/esp502.jpg';
import esp503 from '@/assets/esp503.jpg';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // Imagem principal (para compatibilidade)
  images?: string[]; // Array de imagens para galeria
  category: ProductCategory [];
  featured: boolean; // Para controlar quais aparecem no carrossel
  ingredients?: string[];
  benefits?: string[];
  howToUse?: string;
  inStock: boolean;
}

export type ProductCategory = 'escalda-pes' | 'spray-terapeutico' | 'roll-on' | 'kits';

export const categoryNames: Record<ProductCategory, string> = {
  'escalda-pes': 'Escalda-Pés',
  'spray-terapeutico': 'Spray Terapêutico', 
  'roll-on': 'Roll-on Terapêutico',
  'kits': 'Kits',
};

export const categoryDescriptions: Record<ProductCategory, string> = {
  'escalda-pes': 'O poder de realizar um ritual milenar na sua rotina',
  'spray-terapeutico': 'Óleos essenciais em forma de spray para seu bem-estar diário',
  'roll-on': 'Alívio natural e prático para levar onde quiser',
  'kits' : 'Aqui você encontra os nossos queridinhos em conjuntos especiais'
};

// Base de dados dos produtos - EDITE AQUI PARA GERENCIAR TODOS OS PRODUTOS
export const products: Product[] = [

  {
    id: 'eprelaxar50',
    name: 'Escalda-Pés Relaxar 50g',
    description: 'Uma pausa merecida para os seus pés e sua mente. Nosso Escalda-Pés Relaxar é feito com sal rosa do Himalaia, lavanda, camomila e hibiscos — ingredientes naturais que aliviam o cansaço físico e mental. Ao entrar em contato com a água morna, liberam um aroma suave e terapêutico que acalma, relaxa e ajuda a desacelerar depois de um dia corrido. Ideal para momentos de autocuidado e conexão com o presente. Uso único.',
    price: 9.90,
    image: esp501,
    images: [esp501, esp502, esp503], // Múltiplas imagens para galeria
    category: ['escalda-pes',],
    featured: false, // PRODUTO EM DESTAQUE
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
    category: ['escalda-pes',],
    featured: true,
    ingredients: ['Óleo Essencial de Lavanda', 'Camomila', 'Hibiscos', 'Sal grosso rosa'],
    benefits: ['Relaxamento', 'Alívio do estresse', 'Melhora a circulação'],
    howToUse: 'Dissolva 50g do conteúdo em água morna, deixe os pés de molho por 15-20 minutos',
    inStock: true
  },

   {
    id: 'kitequi30',
    name: 'Linha Equílibrio - Sprays Terapêuticos Acalmar, Conectar e Despertar 30ml',
    description: 'Três momentos, uma jornada. A Linha Equilíbrio foi pensada para te acompanhar nos diferentes estados do dia — do despertar ao relaxar, passando pelo reencontro com você mesma. Cada spray terapêutico deste kit atua em uma dimensão essencial do bem-estar: energia, presença e calma.Despertar ativa corpo e mente, clareia os pensamentos e traz ânimo para o dia. Conectar te reconecta com o presente, estimula a criatividade e desperta alegria interior. Acalmar suaviza a ansiedade, relaxa as emoções e prepara para um sono mais tranquilo. Com óleos essenciais puros e combinações aromáticas harmoniosas, esse trio foi criado para restaurar o equilíbrio entre o fazer, o sentir e o simplesmente ser.',
    price: 62.00,
    image: sprayMelissa,
    category: ['kits','spray-terapeutico',],
    featured: true,
    ingredients: ['Acalmar - Óleo essencial de Lavanda, Copaíba e Olíbano ', 'Conectar - Óleo essencial de Bergamota, Laranja-Selvagem e Limão Siciliano', 'Despertar - Óleo essencial de Hortelã-Pimenta, Menta Verde e Ciprestre'],
    benefits: ['Acalmar - Reduz ansiedade, Melhora a qualidade do sono ',  'Conectar - Promove presença e reconexão interior,Desperta a criatividade', 'Despertar - Estimula o foco e a clareza mental, Ajuda a sair da estagnação e do cansaço mental'],
    howToUse: 'Borrife no ambiente e inale profundamente o aroma',
    inStock: true
  },
  {
    id: 'kitequi60',
    name: 'Linha Equílibrio - Sprays Terapêuticos Acalmar, Conectar e Despertar 60ml',
    description: 'Três momentos, uma jornada. A Linha Equilíbrio foi pensada para te acompanhar nos diferentes estados do dia — do despertar ao relaxar, passando pelo reencontro com você mesma. Cada spray terapêutico deste kit atua em uma dimensão essencial do bem-estar: energia, presença e calma.Despertar ativa corpo e mente, clareia os pensamentos e traz ânimo para o dia. Conectar te reconecta com o presente, estimula a criatividade e desperta alegria interior. Acalmar suaviza a ansiedade, relaxa as emoções e prepara para um sono mais tranquilo. Com óleos essenciais puros e combinações aromáticas harmoniosas, esse trio foi criado para restaurar o equilíbrio entre o fazer, o sentir e o simplesmente ser.',
    price: 98.00,
    image: sprayMelissa,
    category: ['kits','spray-terapeutico',],
    featured: false,
    ingredients: ['Acalmar - Óleo essencial de Lavanda, Copaíba e Olíbano ', 'Conectar - Óleo essencial de Bergamota, Laranja-Selvagem e Limão Siciliano', 'Despertar - Óleo essencial de Hortelã-Pimenta, Menta Verde e Ciprestre'],
    benefits: ['Acalmar - Reduz ansiedade, Melhora a qualidade do sono ',  'Conectar - Promove presença e reconexão interior,Desperta a criatividade', 'Despertar - Estimula o foco e a clareza mental, Ajuda a sair da estagnação e do cansaço mental'],
    howToUse: 'Borrife no ambiente e inale profundamente o aroma',
    inStock: true
  },
  {
    id: 'stacal60',
    name: 'Spray Terapêutico Acalmar 60ml',
    description: 'Um convite para desacelerar e cuidar de si. O Spray Terapêutico Acalmar foi desenvolvido com óleos essenciais puros e naturais que auxiliam na redução da ansiedade, promovendo serenidade e bem-estar. Ideal para incorporar à rotina noturna: borrife no travesseiro, lençóis ou no ambiente antes de dormir e permita-se relaxar profundamente. Também pode ser usado ao longo do dia, sempre que sentir o emocional sobrecarregado ou precisar se recentrar. Um gesto simples que acalma corpo, mente e coração.',
    price: 38.00,
    image: sprayMelissa,
    category: ['spray-terapeutico',],
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
    category: ['spray-terapeutico',],
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
    category: ['spray-terapeutico',],
    featured: false,
    ingredients: ['Óleo essencial de Hortelã-Pimenta', 'Óleo essencial de Menta Verde', 'Óleo essencial de Cipreste'],
    benefits: ['Estimula o foco e a clareza mental', 'Melhora a respiração', 'Ativa o corpo', 'Ajuda a sair da estagnação e do cansaço mental'],
    howToUse: 'Borrife no ambiente e inale profundamente o aroma',
    inStock: true
  },
  {
    id: 'stacal30',
    name: 'Spray Terapêutico Acalmar 30ml',
    description: 'Um convite para desacelerar e cuidar de si. O Spray Terapêutico Acalmar foi desenvolvido com óleos essenciais puros e naturais que auxiliam na redução da ansiedade, promovendo serenidade e bem-estar. Ideal para incorporar à rotina noturna: borrife no travesseiro, lençóis ou no ambiente antes de dormir e permita-se relaxar profundamente. Também pode ser usado ao longo do dia, sempre que sentir o emocional sobrecarregado ou precisar se recentrar. Um gesto simples que acalma corpo, mente e coração.',
    price: 22.90,
    image: sprayMelissa,
    category: ['spray-terapeutico',],
    featured: false, // PRODUTO EM DESTAQUE
    ingredients: ['Óleo essencial de Lavanda', 'Óleo essencial de Copaíba', 'Óleo essencial de Olíbano'],
    benefits: ['Reduz ansiedade', 'Promove calma','Melhora a qualidade do sono', 'Aromaterapia natural'],
    howToUse: 'Borrife no ambiente ou nas roupas sempre que precisar de tranquilidade',
    inStock: true
  },
  {
    id: 'stcon30',
    name: 'Spray Terapêutico Conectar 30ml',
    description: 'Um respiro profundo para voltar ao seu centro. O Spray Terapêutico Conectar foi criado para momentos em que você deseja se reconectar consigo mesma, cultivar presença e nutrir seu universo interior. Com uma sinergia especial de óleos essenciais que atuam no campo emocional e sutil, ele favorece a introspecção, a espiritualidade e o autoconhecimento. Ao mesmo tempo, desperta a leveza, o bom humor e a criatividade — sentimentos que florescem quando estamos verdadeiramente conectadas com quem somos. Use em práticas como meditação, yoga ou sempre que precisar de acolhimento, inspiração e equilíbrio emocional.',
    price: 22.90,
    image: sprayMelissa,
    category: ['spray-terapeutico',],
    featured: false,
    ingredients: ['Óleo essencial de Bergamota', 'Óleo essencial de Laranja-Selvagem', 'Óleo essencial de Limão-Siciliano'],
    benefits: ['Promove presença e reconexão interior', 'Estimula o bom humor e a leveza emocional', 'Desperta a criatividade'],
    howToUse: 'Borrife no ambiente e inale profundamente o aroma',
    inStock: true
  },
  {
    id: 'stdes30',
    name: 'Spray Terapêutico Despertar 30ml',
    description: 'Para começar o dia com clareza, energia e vitalidade. O Spray Terapêutico Despertar é uma sinergia vibrante de hortelã-pimenta, menta verde e cipreste — óleos essenciais reconhecidos por estimularem a mente, melhorarem a respiração e ativarem a circulação. Ideal para usar ao acordar, durante o trabalho ou antes de se exercitar, ele refresca, anima e desperta corpo e mente para um novo ciclo. Uma borrifada e você já sente a diferença.',
    price: 22.90,
    image: sprayMelissa,
    category: ['spray-terapeutico',],
    featured: false,
    ingredients: ['Óleo essencial de Hortelã-Pimenta', 'Óleo essencial de Menta Verde', 'Óleo essencial de Cipreste'],
    benefits: ['Estimula o foco e a clareza mental', 'Melhora a respiração', 'Ativa o corpo', 'Ajuda a sair da estagnação e do cansaço mental'],
    howToUse: 'Borrife no ambiente e inale profundamente o aroma',
    inStock: true
  },
  {
    id: 'stflor60',
    name: 'Spray Terapêutico Florescer 60ml',
    description: 'Para expandir, encantar e se abrir para o novo. O Spray Terapêutico Florescer é delicado, floral e inspirador. Criado com óleos essenciais que despertam a autoestima, a criatividade e a energia feminina. Pode ser usado no ambiente, em objetos pessoais ou como um perfume terapêutico. Ideal para quando você deseja florescer por dentro e por fora.',
    price: 38.60,
    image: sprayMelissa,
    category: ['spray-terapeutico',],
    featured: false,
    ingredients: ['Óleo essencial de Gerânio', 'Óleo essencial de Ylang-Ylang', 'Óleo essencial de Limão Siciliano'],
    benefits: ['Estímulo à autoestima e amor-próprio', 'Sensação de acolhimento e leveza', 'Cria um ritual de reconexão consigo mesma'],
    howToUse: 'Borrife no ambiente e inale profundamente o aroma',
    inStock: true
  },
  {
    id: 'stflor30',
    name: 'Spray Terapêutico Florescer 30ml',
    description: 'Para expandir, encantar e se abrir para o novo. O Spray Terapêutico Florescer é delicado, floral e inspirador. Criado com óleos essenciais que despertam a autoestima, a criatividade e a energia feminina. Pode ser usado no ambiente, em objetos pessoais ou como um perfume terapêutico. Ideal para quando você deseja florescer por dentro e por fora.',
    price: 22.60,
    image: sprayMelissa,
    category: ['spray-terapeutico',],
    featured: false,
    ingredients: ['Óleo essencial de Gerânio', 'Óleo essencial de Ylang-Ylang', 'Óleo essencial de Limão Siciliano'],
    benefits: ['Estímulo à autoestima e amor-próprio', 'Sensação de acolhimento e leveza', 'Cria um ritual de reconexão consigo mesma'],
    howToUse: 'Borrife no ambiente e inale profundamente o aroma',
    inStock: true
  },
  {
    id: 'stshield60',
    name: 'Spray Terapêutico HomeShield 60ml',
    description: 'O Spray Terapêutico Homeshield é um escudo natural que protege e purifica seu lar. Feito com os óleos essenciais de citronela e lavanda, ele afasta energias densas e também mantém longe os insetos indesejados — inclusive mosquitos transmissores como o da dengue — de forma suave, segura e natural. Ideal para borrifar em portas, janelas, cortinas e ambientes, ele cria uma atmosfera mais leve, protegida e acolhedora, cuidando da sua casa com o poder da natureza.',
    price: 29.90,
    image: sprayMelissa,
    category: ['spray-terapeutico',],
    featured: false,
    ingredients: ['Óleo essencial de Critronela', 'Óleo essencial de Lavanda'],
    benefits: ['Proteção do ambiente', 'Purificação', 'Proteção contra insetos'],
    howToUse: 'Borrife no ambiente focando nas cortinas e janelas ',
    inStock: true
  },   
  {
    id: 'stenvol30',
    name: 'Spray Terapêutico Envolver 30ml',
    description: 'Criado para despertar os sentidos e envolver o corpo e a mente em uma atmosfera de carinho, sensualidade e conexão. Com uma combinação marcante de Canela-Cássia, Ylang Ylang e Gerânio, esse spray terapêutico é ideal para preparar o ambiente em momentos íntimos ou de autocuidado profundo. Pode ser usado na rotina noturna, no quarto, no banho ou sempre que quiser ativar o magnetismo pessoal e se conectar com o prazer de estar presente no seu corpo.',
    price: 21.50,
    image: sprayMelissa,
    category: ['spray-terapeutico',],
    featured: false,
    ingredients: ['Óleo essencial de Canela-Cássia', 'Óleo essencial de Gerânio', 'Óleo essencial de Ylang Ylang'],
    benefits: ['Estimula a sensualidade e o autocuidado', 'Cria um ambiente acolhedor e envolvente', 'Auxilia na conexão emocional e afetiva'],
    howToUse: 'Borrife no ambiente momentos antes de iniciar o momento intimo, aplicando na roupa de cama, cortinas e ambiente geral',
    inStock: true
  },
  {
    id: 'epenvol50',
    name: 'Escalda-Pés Envolver 50g',
    description: 'Um convite ao relaxamento com um toque de encanto e presença. O Escalda Pés Envolver combina sal grosso rosa do Himalaia, flores secas e óleo essencial de Gerânio — conhecido por equilibrar emoções e elevar o astral. A experiência é potencializada com o sabonete de cereja e avelã, que traz um aroma doce e envolvente para tornar seu momento de descanso ainda mais especial. Ideal para encerrar o dia com carinho e presença.',
    price: 8.50,
    image: sprayMelissa,
    category: ['escalda-pes',],
    featured: false,
    ingredients: ['Óleo Essencial de Gerânio', 'Camomila', 'Hibiscos', 'Sal grosso rosa','Sabonete de Cereja com Avelã'],
    benefits: ['Relaxa e desperta o feminino com suavidade', 'Traz conforto e equilíbrio emocional'],
    howToUse: 'Dissolva o conteúdo completo em água morna, deixe os pés de molho por 15-20 minutos',
    inStock: true
  },
  {
    id: 'rolenvol10',
    name: 'Roll-on Sensorial Envolver 10ml',
    description: 'Com um blend especial de Canela-Cássia, Ylang Ylang e Gerânio, esse roll-on é perfeito para aplicar em pontos de circulação como pulsos, pescoço e virilha, despertando os sentidos e a presença no corpo. Além de perfumar de forma natural e marcante, ele é um aliado em momentos íntimos e massagens, criando um ritual sensorial envolvente e cheio de conexão. Leve com você para despertar o seu magnetismo a qualquer momento.',
    price: 29.90,
    image: sprayMelissa,
    category: ['roll-on',],
    featured: false,
    ingredients: ['Óleo essencial de Canela-Cássia', 'Óleo essencial de Gerânio', 'Óleo essencial de Ylang Ylang'],
    benefits: ['Aumenta a conexão com o corpo e o momento presente', 'Potencializa rituais de autocuidado e massagem','Desperta os sentidos com um aroma marcante e acolhedor'],
    howToUse: 'Aplique o produto em áreas de circulação como pescoço e virilha, ao aplicar o produto faça uma massagem',
    inStock: true
  },
  {
    id: 'kitenvol',
    name: 'Kit Linha Envolver com Spray Terapêutico, Escalda-Pés e Roll-on Sensorial',
    description: 'O Kit Envolver foi pensado para despertar os sentidos, nutrir o corpo com carinho e transformar momentos cotidianos em verdadeiros rituais de presença. Composto por três produtos — Spray Terapêutico, Escalda Pés e Roll-on Sensorial — todos com a combinação envolvente dos óleos essenciais de Canela-Cássia, Ylang Ylang e Gerânio, essa linha convida você a se reconectar com o seu corpo, sua sensualidade e sua essência afetiva. Ideal para criar um ambiente acolhedor, relaxar ao final do dia ou intensificar momentos íntimos de autocuidado e conexão.',
    price: 55.90,
    image: sprayMelissa,
    category: ['kits','roll-on','spray-terapeutico','escalda-pes'],
    featured: false,
    ingredients: ['Spray Terapêutico - Óleo essencial de Canela-Cássia, Gerânio, Ylang Ylang', 'Escalda-Pés - Óleo essencial de Gerânio, Camomila, Hibiscos, Sal grosso rosa,Sabonete de Cereja com Avelã ', 'Roll-on Sensorial - Óleo essencial de Canela-Cássia, Gerânio e Ylang Ylang '],
    benefits: ['Aumenta a conexão com o corpo e o momento presente', 'Potencializa rituais de autocuidado e massagem','Desperta os sentidos com um aroma marcante e acolhedor'],
    howToUse: 'Spray Terapêutico - Aplique no ambiente. Escalda-Pés - Diluia o conteúdo em água morna e aproveite por 15-20min. Roll-on - Aplique o produto em áreas de circulação como pescoço e virilha, ao aplicar o produto faça uma massagem.',
    inStock: true
  }
  
];

// Funções utilitárias para facilitar o uso
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured && product.inStock).slice(0, 5);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(product => product.category.includes(category) && product.inStock);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getAllCategories = (): ProductCategory[] => {
  return ['escalda-pes', 'spray-terapeutico', 'roll-on', 'kits'];
};