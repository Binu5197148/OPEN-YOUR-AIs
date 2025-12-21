
import { Article, Tool, Playbook, CryptoGuide } from './types';

export const ADSENSE_PUB_ID = "ca-pub-4722208859927111";
export const CONTACT_EMAIL = "openyourais888@gmail.com";

export const getRandomImageRandom = (category: string) => {
  const AI_IMAGES = [
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
  ];
  const MONEY_IMAGES = [
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  ];
  return category === 'AI' ? AI_IMAGES[Math.floor(Math.random() * AI_IMAGES.length)] : MONEY_IMAGES[Math.floor(Math.random() * MONEY_IMAGES.length)];
};

export const saveNewArticle = (article: Article): Article[] => {
  const saved = localStorage.getItem('openyourais_new_articles');
  let articles: Article[] = saved ? JSON.parse(saved) : [];
  if (!articles.find(a => a.id === article.id)) {
    articles = [article, ...articles];
    localStorage.setItem('openyourais_new_articles', JSON.stringify(articles));
  }
  return articles;
};

// --- DIRECTORY OF 10 HIGH-VALUE TOOLS (EXPANDED FOR ADSENSE) ---
export const TOOLS: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT Plus (o1-Preview)',
    category: 'LLM / Reasoning',
    shortDesc: 'A fronteira final do raciocínio computacional com capacidades Chain-of-Thought.',
    fullDesc: 'O modelo o1 da OpenAI representa uma mudança de paradigma. Ao contrário dos modelos anteriores que previam a próxima palavra instantaneamente, o o1 utiliza um processo de "Chain-of-Thought" oculto para verificar sua própria lógica antes de responder. Isso reduz drasticamente as alucinações em tarefas de codificação complexa e matemática avançada. No Open Your AIs, consideramos esta a ferramenta central para planejamento estratégico de negócios e automação de fluxos de trabalho que exigem precisão absoluta.',
    priceModel: 'Freemium',
    url: 'https://chat.openai.com',
    features: ['Logical Verification', 'Advanced Math Solving', 'Code Refactoring', 'Data Synthesis'],
    useCases: ['Engenharia de Prompt', 'Análise de Mercado', 'Desenvolvimento de Software']
  },
  {
    id: '2',
    name: 'Claude 3.5 Sonnet',
    category: 'LLM / Coding',
    shortDesc: 'Precisão técnica e interface de artefatos para desenvolvimento acelerado.',
    fullDesc: 'Desenvolvido pela Anthropic, o Claude 3.5 Sonnet superou o GPT-4o em diversos benchmarks de programação. Sua maior força reside nos "Artifacts", uma interface que permite renderizar sites, diagramas e códigos em tempo real ao lado da conversa. Sua janela de contexto de 200k tokens permite que você carregue bibliotecas inteiras de documentação para análise imediata, tornando-o indispensável para desenvolvedores front-end e redatores técnicos.',
    priceModel: 'Freemium',
    url: 'https://claude.ai',
    features: ['Artifacts UI', 'Massive Context', 'Human-like Nuance'],
    useCases: ['Prototipagem Rápida', 'Escrita Criativa', 'Análise de Documentos']
  },
  {
    id: '3',
    name: 'Midjourney v6.1',
    category: 'Visual / Art',
    shortDesc: 'O padrão ouro em geração de imagens ultra-realistas.',
    fullDesc: 'O Midjourney v6.1 é a ferramenta definitiva para diretores de arte. Com capacidades de renderização que beiram a perfeição fotográfica, ele introduziu o "Style Reference" (SREF), permitindo que marcas mantenham uma identidade visual consistente em milhares de gerações. Seja para criar assets de marketing de luxo ou interfaces de usuário futuristas, o Midjourney oferece um nível de controle de textura e iluminação que nenhum outro competidor alcançou.',
    priceModel: 'Paid',
    url: 'https://midjourney.com',
    features: ['Style Reference', 'Ultra-High Res', 'Pan & Zoom Tools'],
    useCases: ['Branding', 'Social Media Assets', 'UI Concepting']
  },
  {
    id: '4',
    name: 'Runway Gen-3 Alpha',
    category: 'Video / AI',
    shortDesc: 'Vídeo cinematográfico com física e luz realistas.',
    fullDesc: 'A Runway revolucionou a produção de vídeo com o Gen-3 Alpha. Esta IA é capaz de gerar clipes de 10 segundos com uma consistência temporal impressionante. Suas ferramentas de "Motion Brush" permitem que você anime partes específicas de uma imagem, dando aos criadores de conteúdo o poder de um estúdio de efeitos visuais de Hollywood em seus navegadores. Essencial para anúncios de alto impacto e produção de conteúdo viral.',
    priceModel: 'Paid',
    url: 'https://runwayml.com',
    features: ['Motion Brush', 'Text-to-Video', 'Image-to-Video'],
    useCases: ['Publicidade Digital', 'Storyboarding', 'VFX']
  },
  {
    id: '5',
    name: 'ElevenLabs',
    category: 'Audio / Voice',
    shortDesc: 'O ápice da síntese vocal e clonagem de voz emocional.',
    fullDesc: 'A ElevenLabs utiliza Deep Learning para criar as vozes mais realistas do mundo. Sua tecnologia de "Speech-to-Speech" permite que você grave uma narração amadora e a transforme na voz de um locutor profissional, mantendo toda a entonação e emoção original. Para automação do YouTube e criação de audiolivros, esta ferramenta elimina a necessidade de estúdios caros e dubladores físicos.',
    priceModel: 'Freemium',
    url: 'https://elevenlabs.io',
    features: ['Instant Voice Cloning', 'Emotional Inflection', '29+ Languages'],
    useCases: ['Narração de Vídeos', 'Dublagem Internacional', 'Audiolivros']
  },
  {
    id: '6',
    name: 'Perplexity AI',
    category: 'Search / Research',
    shortDesc: 'A morte do motor de busca tradicional.',
    fullDesc: 'Perplexity AI combina a capacidade de resposta das LLMs com o acesso em tempo real à internet. Ao contrário do Google, ela fornece uma resposta consolidada e cita todas as fontes, permitindo que pesquisadores verifiquem a veracidade instantaneamente. Seu modo "Pro Search" realiza pesquisas multi-etapa, agindo como um analista de dados humano para encontrar informações obscuras ou tendências de mercado emergentes.',
    priceModel: 'Freemium',
    url: 'https://perplexity.ai',
    features: ['Pro Search', 'Citation Index', 'File Upload Analysis'],
    useCases: ['Pesquisa Acadêmica', 'Análise de Tendências', 'Fact Checking']
  },
  {
    id: '7',
    name: 'Notion AI',
    category: 'Productivity',
    shortDesc: 'O cérebro organizacional que escreve e pensa por você.',
    fullDesc: 'Notion AI integra inteligência diretamente no seu banco de dados de conhecimento. Ele pode resumir meses de notas de reuniões, extrair planos de ação de rascunhos confusos e até mesmo traduzir documentação técnica complexa. No Open Your AIs, usamos o Notion AI como a "memória central" para organizar todos os playbooks e estratégias de monetização.',
    priceModel: 'Paid',
    url: 'https://notion.so',
    features: ['Auto-Summarization', 'Table Generation', 'Writing Assistant'],
    useCases: ['Gestão de Conhecimento', 'Wiki Corporativa', 'Copywriting']
  },
  {
    id: '8',
    name: 'Jasper AI',
    category: 'Marketing',
    shortDesc: 'Escala industrial de conteúdo focado em conversão.',
    fullDesc: 'Jasper é a plataforma de IA para equipes de marketing sérias. Ele aprende a voz da sua marca e garante que cada post de blog, anúncio no Facebook e e-mail de vendas siga exatamente o mesmo tom. Sua integração com o SurferSEO permite criar conteúdo que não apenas soa bem, mas que realmente ranqueia na primeira página do Google, sendo vital para qualquer estratégia de AdSense.',
    priceModel: 'Paid',
    url: 'https://jasper.ai',
    features: ['Brand Voice Training', 'Campaign Workflows', 'SEO Integration'],
    useCases: ['Marketing de Conteúdo', 'Copy de Vendas', 'Ads Manager']
  },
  {
    id: '9',
    name: 'Synthesia',
    category: 'Video / Avatars',
    shortDesc: 'Apresentadores humanos virtuais em escala global.',
    fullDesc: 'Com a Synthesia, você cria vídeos de treinamento profissional apenas digitando texto. Seus avatares de IA falam mais de 120 idiomas com sincronia labial perfeita. É a solução ideal para empresas que precisam atualizar vídeos de suporte ou treinamento constantemente sem ter que regravar com atores reais toda vez que um detalhe muda.',
    priceModel: 'Paid',
    url: 'https://synthesia.io',
    features: ['AI Avatars', 'Multi-Language Support', 'Built-in Editor'],
    useCases: ['Treinamento Corporativo', 'Vídeos de Onboarding', 'Educação Online']
  },
  {
    id: '10',
    name: 'Descript',
    category: 'Audio / Video Editing',
    shortDesc: 'Edite mídia deletando palavras do texto transcrito.',
    fullDesc: 'Descript transformou a edição de vídeo em algo tão simples quanto editar um documento do Word. Ele transcreve o áudio automaticamente e, se você deletar uma palavra do texto, ela é removida do vídeo. Sua função "Studio Sound" transforma áudios gravados no celular em qualidade de podcast profissional, tornando-o essencial para criadores de conteúdo ágeis.',
    priceModel: 'Freemium',
    url: 'https://descript.com',
    features: ['Text-Based Editing', 'Overdub Voice', 'Studio Sound Cleanup'],
    useCases: ['Podcasting', 'Edição de Redes Sociais', 'Entrevistas']
  }
];

// --- MONETIZATION PLAYBOOKS (5 DEEP COURSES) ---
export const PLAYBOOKS: Playbook[] = [
  {
    id: 'p1',
    title: 'High-Ticket YouTube Automation',
    tldr: 'Aprenda a construir impérios digitais usando pipelines de IA para dominar nichos de alto CPM.',
    roi: 'Potencial de $5k-$20k/mês',
    timeline: '90-180 Dias',
    difficulty: 'Medium',
    steps: ['Niche Selection (Finance/Tech)', 'Script Gen via Claude 3.5', 'Voice via ElevenLabs', 'Visuals via Midjourney/Runway', 'SEO & Title Engineering'],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    content: `
      <h2>Fase 1: O Poder dos Nichos de Alto CPM</h2>
      <p>O segredo da automação do YouTube não está nas visualizações, mas no valor dos anunciantes. Nichos como Finanças, SaaS e Seguros pagam até 10x mais que entretenimento genérico. Nosso método foca em criar canais de "Autoridade Invisível".</p>
      <h3>Fase 2: O Pipeline Tecnológico</h3>
      <ul>
        <li><strong>Roteiro:</strong> Usamos o Claude 3.5 para criar roteiros educacionais que retêm o público por mais de 8 minutos.</li>
        <li><strong>Visual:</strong> Integração de Midjourney para thumbnails impossíveis de ignorar e Runway para clipes cinematográficos.</li>
      </ul>
      <div class="bg-cyber-primary/10 border-l-4 border-cyber-primary p-4 my-6">
        <strong>DICA PRO:</strong> O algoritmo do YouTube em 2025 prioriza "Satisfação" sobre "Clique". Seu vídeo deve entregar o que promete nos primeiros 30 segundos.
      </div>
    `
  },
  {
    id: 'p2',
    title: 'AI Micro-SaaS Accelerator',
    tldr: 'Desenvolva e venda ferramentas micro-SaaS que resolvem dores específicas usando APIs de IA.',
    roi: 'Equity & Receita Recorrente',
    timeline: '30-60 Dias',
    difficulty: 'Hard',
    steps: ['Pain Point Identification', 'API Integration (Gemini/OpenAI)', 'MVP No-Code/Low-Code', 'Subscription Setup via Stripe', 'Launch on Product Hunt'],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    content: `<h2>O Mercado de Soluções Únicas</h2><p>Micro-SaaS são pequenas aplicações que resolvem UM problema muito bem. Exemplo: "Um gerador de descrições de produtos para joalherias usando IA". Este guia ensina como usar o Google AI Studio para prototipar essas ferramentas sem precisar de um time de engenharia.</p>`
  },
  {
    id: 'p3',
    title: 'Premium AI Copywriting Agency',
    tldr: 'Transforme a escrita de marketing em um processo industrial de alta margem.',
    roi: 'Retorno Imediato ($2k-$5k/mês)',
    timeline: '15-30 Dias',
    difficulty: 'Easy',
    steps: ['Niche Focus (E-commerce/B2B)', 'Custom GPT Training', 'Outreach via LinkedIn', 'Batch Content Delivery'],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    content: `<h2>Escalando a Criatividade</h2><p>Com as ferramentas certas como Jasper e Claude, um único operador pode fazer o trabalho de uma agência de 10 redatores. O segredo é vender "estratégia de conteúdo" e não apenas "palavras".</p>`
  },
  { id: 'p4', title: 'AI-Driven Branding Agency', tldr: 'Criação de identidades visuais completas em tempo recorde.', roi: 'Alta Margem por Projeto', timeline: '7-14 Dias', difficulty: 'Medium', steps: ['Concept Ideation', 'Midjourney Style Reference', 'Logo Vectorization', 'Brand Guidelines Gen'], image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80", content: `<h2>Branding na Velocidade da Luz</h2><p>Utilize o Midjourney v6.1 para criar conceitos visuais que deixariam agências tradicionais no chinelo. Aprenda a transformar prompts em vetores escaláveis.</p>` },
  { id: 'p5', title: 'Automated AI Newsletters', tldr: 'Construa uma audiência valiosa com curadoria automatizada de IA.', roi: 'Crescimento Composto', timeline: '6-12 Meses', difficulty: 'Medium', steps: ['Niche Selection', 'Beehiiv/Substack Setup', 'AI News Aggregation', 'Sponsorship Management'], image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80", content: `<h2>O Poder da Atenção</h2><p>Newsletters são ativos de mídia proprietários. Use IA para ler 100 artigos por dia e resumir os 5 melhores para sua audiência. Monetize com patrocínios premium.</p>` }
];

// --- CRYPTO GUIDES (3 PILLARS) ---
export const CRYPTO_GUIDES: CryptoGuide[] = [
  {
    id: 'cg1',
    title: 'Ironclad Security: Digital Custody',
    level: 'Beginner',
    summary: 'O guia definitivo sobre como proteger seu patrimônio contra ataques e falhas de exchanges.',
    content: `<h2>A Regra de Ouro: Not Your Keys, Not Your Coins</h2><p>Deixar cripto em exchanges é como deixar dinheiro na mão de estranhos. Este guia ensina a usar Hardware Wallets (Ledger/Trezor) e a gerenciar Seed Phrases com segurança militar. Abordamos também a higiene digital básica para evitar phishing e drenadores de carteira.</p>`
  },
  {
    id: 'cg2',
    title: 'Market Cycles & Macro Intelligence',
    level: 'Intermediate',
    summary: 'Entenda como o fluxo de capital se move entre Bitcoin e Altcoins.',
    content: `<h2>A Dança da Liquidez</h2><p>O mercado de cripto é cíclico. Aprenda a ler indicadores como BTC Dominance, o ciclo de Halving e o MVRV Z-Score. Saber quando o capital sai do Bitcoin para as "Alts" é o que diferencia os investidores de sucesso dos jogadores de sorte.</p>`
  },
  {
    id: 'cg3',
    title: 'Advanced DeFi: Yield & Governance',
    level: 'Advanced',
    summary: 'Estratégias avançadas de geração de renda passiva em protocolos descentralizados.',
    content: `<h2>Engenharia Financeira Web3</h2><p>Explore pools de liquidez, staking e empréstimos colateralizados. Saiba como mitigar riscos de "Impermanent Loss" e como identificar protocolos legítimos em meio a esquemas Ponzi. O DeFi é o novo sistema financeiro, e você é o banco.</p>`
  }
];

// --- INITIAL ARTICLES (AUTHORITY BASELINE - RESTORED) ---
export const ARTICLES: Article[] = [
  {
    id: 'art-001',
    slug: 'adsense-approval-masterclass-2025',
    title: 'Como Ser Aprovado no AdSense em 2025: O Guia de Autoridade Final',
    excerpt: 'O Google mudou as regras. Saiba como o conceito de E-E-A-T é agora o fator decisivo para a monetização de sites.',
    content: `
      <h2>1. A Morte do Conteúdo Raso (Thin Content)</h2>
      <p>O maior erro dos novos editores é publicar textos genéricos de 300 palavras. O Google AdSense agora exige que seu site seja uma "Autoridade de Destino". Isso significa que cada página deve oferecer uma resposta completa e profunda.</p>
      <h3>2. O Pilar E-E-A-T</h3>
      <p>E-E-A-T significa Experiência, Expertise, Autoridade e Confiança. Você prova isso através de uma navegação impecável, páginas legais claras e bios de autores que demonstram conhecimento técnico.</p>
      <div class="bg-cyber-primary/10 border-l-4 border-cyber-primary p-4 my-6">
        <strong>CHECKLIST:</strong> Mínimo de 20 artigos de alta qualidade, navegação intuitiva e zero links quebrados.
      </div>
    `,
    category: 'Monetization',
    tags: ['AdSense', 'SEO', 'Digital Business'],
    date: 'Dez 22, 2025',
    readTime: '18 min',
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'art-002',
    slug: 'google-ai-studio-gemini-2-5-deep-dive',
    title: 'Google AI Studio: Desbloqueando o Poder do Gemini 2.5 Pro',
    excerpt: 'Um guia técnico sobre como a nova infraestrutura de IA do Google está vencendo a guerra dos modelos.',
    content: `<p>O Google AI Studio não é apenas um playground; é o motor da nova economia de IA. Com o Gemini 2.5 Pro, o Google oferece uma janela de contexto que permite analisar bibliotecas inteiras de código ou livros de 1000 páginas em segundos.</p>`,
    category: 'AI',
    tags: ['Google AI', 'Gemini', 'LLM'],
    date: 'Dez 18, 2025',
    readTime: '15 min',
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'art-003',
    slug: 'ltx-2-future-of-ai-video',
    title: 'LTX-2: A Revolução do Vídeo em 4K Gerado por IA',
    excerpt: 'Análise da nova arquitetura de vídeo que está mudando a produção cinematográfica independente.',
    content: `<p>A qualidade do LTX-2 é assustadora. Pela primeira vez, temos consistência temporal que permite criar curtas-metragens inteiros sem as flutuações bizarras de modelos anteriores.</p>`,
    category: 'AI',
    tags: ['Video AI', 'LTX-2', 'Future Tech'],
    date: 'Dez 15, 2025',
    readTime: '12 min',
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'art-004',
    slug: 'crypto-5-bull-market-pillars',
    title: 'Crypto 5: Os Pilares do Próximo Super Ciclo das Criptomoedas',
    excerpt: 'Quais narrativas realmente importarão em 2025? De RWA a DePIN, analisamos os fundamentos.',
    content: `<p>O mercado de cripto não é mais apenas sobre moedas meme. O valor real está sendo construído em infraestrutura descentralizada e ativos do mundo real (RWA) tokenizados.</p>`,
    category: 'Crypto',
    tags: ['Crypto', 'Bull Market', 'Investment'],
    date: 'Dez 10, 2025',
    readTime: '20 min',
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80"
  }
];
