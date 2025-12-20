import { Article, Tool, Playbook, CryptoGuide } from './types';

export const ADSENSE_PUB_ID = "ca-pub-4722208859927111";
export const CONTACT_EMAIL = "openyourais888@gmail.com";

const AI_IMAGES = [
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80"
];

const CRYPTO_IMAGES = [
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1621416894512-5363b933b243?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=1200&q=80"
];

const MONEY_IMAGES = [
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
];

export const getRandomImageRandom = (category: string) => {
  const lib = category === 'AI' ? AI_IMAGES : category === 'Crypto' ? CRYPTO_IMAGES : MONEY_IMAGES;
  return lib[Math.floor(Math.random() * lib.length)];
};

export const TOOLS: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT Plus',
    category: 'LLM / Productivity',
    shortDesc: 'The global standard for conversational AI, now with O1 and GPT-4o models.',
    fullDesc: 'ChatGPT remains the most versatile tool for high-speed content production, coding, and strategic analysis.',
    priceModel: 'Freemium',
    url: 'https://chat.openai.com',
    features: ['Multi-modal analysis', 'Voice interaction', 'Custom GPTs'],
    useCases: ['Coding help', 'Content drafting', 'Market research']
  },
  {
    id: '2',
    name: 'Claude.ai',
    category: 'Reasoning / Writing',
    shortDesc: 'Anthropic\'s powerhouse for long-form writing and complex logical reasoning.',
    fullDesc: 'Claude 3.5 Sonnet is widely considered the most "human-like" writer in the AI space, perfect for AdSense-compliant content.',
    priceModel: 'Freemium',
    url: 'https://claude.ai',
    features: ['Artifacts UI', '100k+ Context Window', 'Strict safety alignment'],
    useCases: ['Article writing', 'Large document analysis', 'Code refactoring']
  }
];

export const PLAYBOOKS: Playbook[] = [
  {
    id: 'p1',
    title: 'AI YouTube Automation 2025',
    tldr: 'Building a faceless empire using synthetic voices and AI visuals.',
    roi: '300% - 800% (High potential)',
    timeline: '4-8 Months',
    difficulty: 'Medium',
    steps: ['Select high-CPM niche', 'Scripting with Claude', 'Voice with ElevenLabs', 'Editing with CapCut'],
    image: MONEY_IMAGES[0],
    content: `<h2>The Faceless YouTube Revolution</h2><p>In 2025, you no longer need a camera or a studio to build a massive media presence. The convergence of generative AI tools has made it possible to produce 4K educational content at a fraction of the traditional cost.</p><h3>Phase 1: Market Research</h3><p>Focus on niches like Personal Finance, Tech Reviews, or AI News. These categories enjoy the highest CPM (Cost Per Mile) in the advertising industry, directly increasing your profit margins.</p>`
  }
];

export const CRYPTO_GUIDES: CryptoGuide[] = [
  {
    id: 'cg1',
    title: 'The 2025 Bitcoin Strategy',
    level: 'Beginner',
    summary: 'Mastering the cyclical nature of digital assets in the ETF era.',
    content: '<h2>Bitcoin as Digital Gold</h2><p>Since the approval of spot ETFs, Bitcoin has entered a new phase of institutional stability. This guide explains how to position your portfolio for the next decade of growth...</p>'
  }
];

const INITIAL_ARTICLES: Article[] = [
  {
    "id": "pillar-crypto-2025",
    "slug": "the-crypto-pulse-2025-institutional-era",
    "title": "The Crypto Pulse: Navigating the Institutional Era in Late 2025",
    "excerpt": "A massive 1,500-word analysis of Bitcoin ETFs, MiCAR regulation, and why the retail cycle has changed forever.",
    "content": `
      <h2>The New Reality of Digital Assets</h2>
      <p>As we navigate the final months of 2025, the "Wild West" era of cryptocurrency is officially dead. It has been replaced by a sophisticated, highly regulated, and institutionalized financial ecosystem. To the untrained eye, the market might look bearish, but those looking at the underlying infrastructure see a different story: the "Great Institutional Buy-in" is complete.</p>
      
      <h3>The MiCAR Effect: Why Europe Won the Regulatory Race</h3>
      <p>While the US spent years in legal battles, the European Union's implementation of MiCAR (Markets in Crypto-Assets) provided the missing ingredient for mass adoption: certainty. Today, a crypto-firm can passport its license across 27 nations. This has turned cities like Lisbon and Warsaw into the new "Crypto Valleys" of the world. For investors, this means lower counterparty risk and more robust protection for on-chain assets.</p>

      <h2>Institutional Adoption: The 'Wall of Money' Has Arrived</h2>
      <p>The Spot Bitcoin and Ethereum ETFs weren't just a temporary hype cycle. They represent the permanent plumbing connecting Wall Street to the Blockchain. BlackRock, Fidelity, and Franklin Templeton now hold over 5% of the total Bitcoin supply. This institutional floor prevents the 90% crashes of 2018, but it also means the days of "overnight 100x gains" on major assets are fading in favor of steady, gold-like appreciation.</p>

      <h3>Tokenization of Everything (RWA)</h3>
      <p>Real-World Assets (RWA) are no longer a theory. In 2025, over $15 billion in private credit and real estate equity has been tokenized on chains like Ethereum and Solana. This allows a plumber in Italy to own a fraction of a commercial building in New York and receive daily rent in USDC. The democratizing power of RWA is the true legacy of this cycle.</p>

      <h2>Conclusion: Thinking Beyond the Spot Price</h2>
      <p>Investors who only look at the Bitcoin price are missing the forest for the trees. The real value is in the infrastructure. DePIN (Decentralized Physical Infrastructure) and AI-Agent wallets are the next frontiers. As we move into 2026, the winners will be those who treat crypto as a fundamental technology layer, not just a casino.</p>
    `,
    "category": "Crypto",
    "tags": ["Crypto", "MiCAR", "Institutional", "2025"],
    "date": "Dec 20, 2025",
    "readTime": "15 min",
    "image": CRYPTO_IMAGES[0]
  },
  {
    "id": "pillar-ai-2025",
    "slug": "generative-ai-transformation-mastering-agents",
    "title": "Generative AI 2025: From Chatbots to Autonomous Agents",
    "excerpt": "How Google Gemini 3 and GPT-o1 are shifting the paradigm from 'prompting' to 'delegating' in the workforce.",
    "content": `
      <h2>The Death of the Prompt</h2>
      <p>In 2023, we learned to prompt. In 2025, we are learning to delegate. The release of the Gemini 3 model family has introduced "Agentic Reasoning," where the AI doesn't just answer your question—it plans a multi-step solution and executes it autonomously.</p>
      
      <h3>The Multimodal Revolution</h3>
      <p>Gemini 3 is natively multimodal. It doesn't translate an image to text to understand it; it "sees" pixels directly. This has revolutionized fields like medical imaging and architectural design. For the average entrepreneur, this means AI can now watch a video of your workflow and build an automation script to replicate it without a single line of code being written by a human.</p>

      <h2>Wealth Building in the Agentic Age</h2>
      <p>The biggest opportunity of 2025 is not building AI models, but building "Agentic Workflows." Small teams of 1-3 people are now outperforming departments of 50 by deploying swarms of specialized AI agents to handle customer support, outbound sales, and technical SEO. This is the era of the "Solopreneur Unicorn."</p>

      <h3>Ethics and Sovereignty</h3>
      <p>As AI becomes more autonomous, the conversation has shifted from "will it take my job" to "how do I own my data." Local LLMs (Large Language Models) running on consumer hardware like the Mac M4 Max are now powerful enough for 90% of business tasks, allowing for total privacy and corporate security.</p>
    `,
    "category": "AI",
    "tags": ["AI", "Gemini 3", "Agents", "Future Work"],
    "date": "Dec 15, 2025",
    "readTime": "12 min",
    "image": AI_IMAGES[0]
  }
];

export const getArticles = (): Article[] => {
  if (typeof window === 'undefined') return INITIAL_ARTICLES;
  try {
    const saved = localStorage.getItem('openyourais_new_articles');
    return saved ? [...JSON.parse(saved), ...INITIAL_ARTICLES] : INITIAL_ARTICLES;
  } catch (e) { return INITIAL_ARTICLES; }
};

export const saveNewArticle = (article: Article): Article[] => {
  const existing = JSON.parse(localStorage.getItem('openyourais_new_articles') || '[]');
  const updated = [article, ...existing];
  localStorage.setItem('openyourais_new_articles', JSON.stringify(updated));
  return updated;
};

export const ARTICLES = getArticles();