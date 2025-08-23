-- Migração para inserir dados reais de categorias, produtos e cupons

-- Inserir categorias reais
INSERT INTO public.categories (id, name, description, slug, active) VALUES
(gen_random_uuid(), 'Escalda-Pés', 'O poder de realizar um ritual milenar na sua rotina', 'escalda-pes', true),
(gen_random_uuid(), 'Spray Terapêutico', 'Óleos essenciais em forma de spray para seu bem-estar diário', 'spray-terapeutico', true),
(gen_random_uuid(), 'Roll-on Terapêutico', 'Alívio natural e prático para levar onde quiser', 'roll-on', true),
(gen_random_uuid(), 'Kits', 'Aqui você encontra os nossos queridinhos em conjuntos especiais', 'kits', true),
(gen_random_uuid(), 'Brinde', 'Produtos especiais oferecidos gratuitamente', 'brinde', true);

-- Inserir produtos reais com categoria correta
WITH category_mapping AS (
  SELECT 
    'escalda-pes' as slug, id as category_id FROM categories WHERE slug = 'escalda-pes'
  UNION ALL
  SELECT 
    'spray-terapeutico' as slug, id as category_id FROM categories WHERE slug = 'spray-terapeutico'
  UNION ALL
  SELECT 
    'roll-on' as slug, id as category_id FROM categories WHERE slug = 'roll-on'
  UNION ALL
  SELECT 
    'kits' as slug, id as category_id FROM categories WHERE slug = 'kits'
  UNION ALL
  SELECT 
    'brinde' as slug, id as category_id FROM categories WHERE slug = 'brinde'
)
INSERT INTO public.products (
  name, description, price, category_id, featured, in_stock, stock_quantity,
  ingredients, benefits, how_to_use, images, sku
) VALUES
-- Escalda-Pés
('Escalda-Pés Relaxar 50g', 
 'Uma pausa merecida para os seus pés e sua mente. Nosso Escalda-Pés Relaxar é feito com sal rosa do Himalaia, lavanda, camomila e hibiscos — ingredientes naturais que aliviam o cansaço físico e mental. Ao entrar em contato com a água morna, liberam um aroma suave e terapêutico que acalma, relaxa e ajuda a desacelerar depois de um dia corrido. Ideal para momentos de autocuidado e conexão com o presente. Uso único.',
 9.90, (SELECT category_id FROM category_mapping WHERE slug = 'escalda-pes' LIMIT 1), false, true, 100,
 ARRAY['Óleo Essencial de Lavanda', 'Camomila', 'Hibiscos', 'Sal grosso rosa'],
 ARRAY['Relaxamento', 'Alívio do estresse', 'Melhora a circulação'],
 'Dissolva o conteúdo completo em água morna, deixe os pés de molho por 15-20 minutos',
 ARRAY['esp505.jpg', 'esp501.jpg', 'esp502-new.jpg', 'esp503-new.jpg'],
 'eprelaxar50'),

('Escalda-Pés Relaxar 200g',
 'Uma pausa merecida para os seus pés e sua mente. Nosso Escalda-Pés Relaxar é feito com sal rosa do Himalaia, lavanda, camomila e hibiscos — ingredientes naturais que aliviam o cansaço físico e mental. Ao entrar em contato com a água morna, liberam um aroma suave e terapêutico que acalma, relaxa e ajuda a desacelerar depois de um dia corrido. Ideal para momentos de autocuidado e conexão com o presente. Rende até 5 usos.',
 26.90, (SELECT category_id FROM category_mapping WHERE slug = 'escalda-pes' LIMIT 1), true, true, 50,
 ARRAY['Óleo Essencial de Lavanda', 'Camomila', 'Hibiscos', 'Sal grosso rosa'],
 ARRAY['Relaxamento', 'Alívio do estresse', 'Melhora a circulação'],
 'Dissolva 50g do conteúdo em água morna, deixe os pés de molho por 15-20 minutos',
 ARRAY['escalda-pes-lavanda.jpg'],
 'eprelaxar200'),

('Escalda-Pés Envolver 50g',
 'Um convite ao relaxamento com um toque de encanto e presença. O Escalda Pés Envolver combina sal grosso rosa do Himalaia, flores secas e óleo essencial de Gerânio — conhecido por equilibrar emoções e elevar o astral. A experiência é potencializada com o sabonete de cereja e avelã, que traz um aroma doce e envolvente para tornar seu momento de descanso ainda mais especial. Ideal para encerrar o dia com carinho e presença.',
 8.50, (SELECT category_id FROM category_mapping WHERE slug = 'escalda-pes' LIMIT 1), false, true, 80,
 ARRAY['Óleo Essencial de Gerânio', 'Camomila', 'Hibiscos', 'Sal grosso rosa','Sabonete de Cereja com Avelã'],
 ARRAY['Relaxa e desperta o feminino com suavidade', 'Traz conforto e equilíbrio emocional'],
 'Dissolva o conteúdo completo em água morna, deixe os pés de molho por 15-20 minutos',
 ARRAY['spray-melissa.jpg'],
 'epenvol50'),

-- Sprays Terapêuticos
('Spray Terapêutico Acalmar 60ml',
 'Um convite para desacelerar e cuidar de si. O Spray Terapêutico Acalmar foi desenvolvido com óleos essenciais puros e naturais que auxiliam na redução da ansiedade, promovendo serenidade e bem-estar. Ideal para incorporar à rotina noturna: borrife no travesseiro, lençóis ou no ambiente antes de dormir e permita-se relaxar profundamente. Também pode ser usado ao longo do dia, sempre que sentir o emocional sobrecarregado ou precisar se recentrar. Um gesto simples que acalma corpo, mente e coração.',
 38.00, (SELECT category_id FROM category_mapping WHERE slug = 'spray-terapeutico' LIMIT 1), true, true, 75,
 ARRAY['Óleo essencial de Lavanda', 'Óleo essencial de Copaíba', 'Óleo essencial de Olíbano'],
 ARRAY['Reduz ansiedade', 'Promove calma','Melhora a qualidade do sono', 'Aromaterapia natural'],
 'Borrife no ambiente ou nas roupas sempre que precisar de tranquilidade',
 ARRAY['spray-melissa.jpg'],
 'stacal60'),

('Spray Terapêutico Conectar 60ml',
 'Um respiro profundo para voltar ao seu centro. O Spray Terapêutico Conectar foi criado para momentos em que você deseja se reconectar consigo mesma, cultivar presença e nutrir seu universo interior. Com uma sinergia especial de óleos essenciais que atuam no campo emocional e sutil, ele favorece a introspecção, a espiritualidade e o autoconhecimento. Ao mesmo tempo, desperta a leveza, o bom humor e a criatividade — sentimentos que florescem quando estamos verdadeiramente conectadas com quem somos. Use em práticas como meditação, yoga ou sempre que precisar de acolhimento, inspiração e equilíbrio emocional.',
 38.00, (SELECT category_id FROM category_mapping WHERE slug = 'spray-terapeutico' LIMIT 1), false, true, 60,
 ARRAY['Óleo essencial de Bergamota', 'Óleo essencial de Laranja-Selvagem', 'Óleo essencial de Limão-Siciliano'],
 ARRAY['Promove presença e reconexão interior', 'Estimula o bom humor e a leveza emocional', 'Desperta a criatividade'],
 'Borrife no ambiente e inale profundamente o aroma',
 ARRAY['spray-melissa.jpg'],
 'stcon60'),

('Spray Terapêutico Despertar 60ml',
 'Para começar o dia com clareza, energia e vitalidade. O Spray Terapêutico Despertar é uma sinergia vibrante de hortelã-pimenta, menta verde e cipreste — óleos essenciais reconhecidos por estimularem a mente, melhorarem a respiração e ativarem a circulação. Ideal para usar ao acordar, durante o trabalho ou antes de se exercitar, ele refresca, anima e desperta corpo e mente para um novo ciclo. Uma borrifada e você já sente a diferença.',
 38.00, (SELECT category_id FROM category_mapping WHERE slug = 'spray-terapeutico' LIMIT 1), false, true, 45,
 ARRAY['Óleo essencial de Hortelã-Pimenta', 'Óleo essencial de Menta Verde', 'Óleo essencial de Cipreste'],
 ARRAY['Estimula o foco e a clareza mental', 'Melhora a respiração', 'Ativa o corpo', 'Ajuda a sair da estagnação e do cansaço mental'],
 'Borrife no ambiente e inale profundamente o aroma',
 ARRAY['spray-melissa.jpg'],
 'stdes60'),

-- Roll-on
('Roll-on Sensorial Envolver 10ml',
 'Com um blend especial de Canela-Cássia, Ylang Ylang e Gerânio, esse roll-on é perfeito para aplicar em pontos de circulação como pulsos, pescoço e virilha, despertando os sentidos e a presença no corpo. Além de perfumar de forma natural e marcante, ele é um aliado em momentos íntimos e massagens, criando um ritual sensorial envolvente e cheio de conexão. Leve com você para despertar o seu magnetismo a qualquer momento.',
 29.90, (SELECT category_id FROM category_mapping WHERE slug = 'roll-on' LIMIT 1), false, true, 30,
 ARRAY['Óleo essencial de Canela-Cássia', 'Óleo essencial de Gerânio', 'Óleo essencial de Ylang Ylang'],
 ARRAY['Aumenta a conexão com o corpo e o momento presente', 'Potencializa rituais de autocuidado e massagem','Desperta os sentidos com um aroma marcante e acolhedor'],
 'Aplique o produto em áreas de circulação como pescoço e virilha, ao aplicar o produto faça uma massagem',
 ARRAY['spray-melissa.jpg'],
 'rolenvol10'),

-- Kits
('Linha Equílibrio - Sprays Terapêuticos Acalmar, Conectar e Despertar 30ml',
 'Três momentos, uma jornada. A Linha Equilíbrio foi pensada para te acompanhar nos diferentes estados do dia — do despertar ao relaxar, passando pelo reencontro com você mesma. Cada spray terapêutico deste kit atua em uma dimensão essencial do bem-estar: energia, presença e calma.Despertar ativa corpo e mente, clareia os pensamentos e traz ânimo para o dia. Conectar te reconecta com o presente, estimula a criatividade e desperta alegria interior. Acalmar suaviza a ansiedade, relaxa as emoções e prepara para um sono mais tranquilo. Com óleos essenciais puros e combinações aromáticas harmoniosas, esse trio foi criado para restaurar o equilíbrio entre o fazer, o sentir e o simplesmente ser.',
 62.00, (SELECT category_id FROM category_mapping WHERE slug = 'kits' LIMIT 1), true, true, 25,
 ARRAY['Acalmar - Óleo essencial de Lavanda, Copaíba e Olíbano ', 'Conectar - Óleo essencial de Bergamota, Laranja-Selvagem e Limão Siciliano', 'Despertar - Óleo essencial de Hortelã-Pimenta, Menta Verde e Cipreste'],
 ARRAY['Acalmar - Reduz ansiedade, Melhora a qualidade do sono ',  'Conectar - Promove presença e reconexão interior,Desperta a criatividade', 'Despertar - Estimula o foco e a clareza mental, Ajuda a sair da estagnação e do cansaço mental'],
 'Borrife no ambiente e inale profundamente o aroma',
 ARRAY['spray-melissa.jpg'],
 'kitequi30');

-- Inserir cupons reais
INSERT INTO public.coupons (code, type, discount_percentage, gift_product_name, gift_product_description, active, max_usage) VALUES
('10OFF', 'discount', 10, NULL, NULL, true, NULL),
('ESSENCIA', 'discount', 20, NULL, NULL, true, NULL),
('PRIMEIRACOMPRA', 'gift', NULL, 'Escalda Pés Relaxar 50g', 'Brinde especial para primeira compra', true, NULL);