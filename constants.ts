// Content Constants - Sync Trigger: Updated with The Crypto Pulse
import { Article, Tool, Playbook, CryptoGuide } from './types';

export const ADSENSE_PUB_ID = "ca-pub-4722208859927111";
export const CONTACT_EMAIL = "openyourais888@gmail.com";

// --- RELIABLE IMAGE COLLECTIONS (Manually Verified) ---
const AI_IMAGES = [
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1676299081847-824d16b91d6c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1589254065878-a0598c93eb58?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1625314897517-742718a24c25?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1535378437327-b71280684398?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80"
];

const CRYPTO_IMAGES = [
  "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1621416894512-5363b933b243?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1622630998477-20aa696fab05?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516245834210-c4c14278733f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1621504450168-38f647115e2f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1622630998477-20aa696fab05?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=800&q=80"
];

const MONEY_IMAGES = [
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1565514020176-dbf2277e38a2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1604594849806-d52e7010a5d5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80"
];

export const getRandomImage = (category: string, index: number) => {
  if (category === 'AI') return AI_IMAGES[index % AI_IMAGES.length];
  if (category === 'Crypto') return CRYPTO_IMAGES[index % CRYPTO_IMAGES.length];
  return MONEY_IMAGES[index % MONEY_IMAGES.length];
};

export const getRandomImageRandom = (category: string) => {
  if (category === 'AI') return AI_IMAGES[Math.floor(Math.random() * AI_IMAGES.length)];
  if (category === 'Crypto') return CRYPTO_IMAGES[Math.floor(Math.random() * CRYPTO_IMAGES.length)];
  return MONEY_IMAGES[Math.floor(Math.random() * MONEY_IMAGES.length)];
};

const getRecentDate = (daysBack: number) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const TOOLS: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    category: 'LLM / Chat',
    shortDesc: 'The industry standard for conversational AI and content generation.',
    fullDesc: 'ChatGPT by OpenAI is a versatile language model capable of drafting emails, writing code, creating content, and solving complex problems.',
    priceModel: 'Freemium',
    url: 'https://chat.openai.com',
    features: ['GPT-4o access', 'DALL-E 3 image generation', 'Data Analysis', 'Custom GPTs', 'Voice Mode'],
    useCases: ['Blog post writing', 'Coding assistance', 'Summarization', 'Translation', 'Brainstorming']
  },
  {
    id: '2',
    name: 'Claude AI',
    category: 'LLM / Chat',
    shortDesc: 'Known for safety, nuance, and a massive context window.',
    fullDesc: 'Claude 3.5 Sonnet and Opus are top-tier models from Anthropic. They excel at coding, creative writing, and processing large documents.',
    priceModel: 'Freemium',
    url: 'https://claude.ai',
    features: ['200k Context Window', 'Artifacts UI', 'Superior Coding', 'Nuanced Writing', 'Document Analysis'],
    useCases: ['Book analysis', 'Large codebase refactoring', 'Creative fiction', 'Legal document review', 'Data extraction']
  },
  {
    id: '3',
    name: 'Midjourney',
    category: 'Image Generation',
    shortDesc: 'The highest quality artistic image generation model available.',
    fullDesc: 'Midjourney operates via Discord to generate stunning, photorealistic, or artistic images from text prompts.',
    priceModel: 'Paid',
    url: 'https://midjourney.com',
    features: ['Photorealism', 'Style Reference', 'Character Consistency', 'In-painting', 'Zoom Out'],
    useCases: ['Web design assets', 'Marketing visuals', 'Concept art', 'Social media content', 'Book covers']
  }
];

export const PLAYBOOKS: Playbook[] = ([
  {
    id: 'p1',
    title: 'Educational YouTube Automation',
    tldr: 'Create faceless educational channels using AI for script, voice, and visuals.',
    roi: '200-500% after 6 months',
    timeline: '3-6 Months',
    difficulty: 'Medium',
    steps: ['Niche Selection', 'Script with Claude/ChatGPT', 'Voiceover with ElevenLabs', 'Visuals with Midjourney/Stock', 'Editing with CapCut/Premiere', 'Thumbnail Design', 'SEO Optimization']
  },
  {
    id: 'p2',
    title: 'AI Copywriting Service for E-commerce',
    tldr: 'Offer product description and ad copy services to Shopify owners.',
    roi: 'Immediate cash flow',
    timeline: '1-2 Weeks',
    difficulty: 'Easy',
    steps: ['Prospecting on LinkedIn/Instagram', 'Offer Free Sample Audit', 'Use Jasper for Bulk Descriptions', 'Refine with Human Touch', 'Deliver and Retain']
  }
] as Playbook[]).map((pb, index) => ({
  ...pb,
  image: getRandomImage('Money', index),
  content: `<p class="lead">Unlock the potential of <strong>${pb.title}</strong>.</p><h2>Steps:</h2><ul>${pb.steps.map(s => `<li>${s}</li>`).join('')}</ul>`
}));

export const CRYPTO_GUIDES: CryptoGuide[] = [
  {
    id: 'cg1',
    title: 'Bitcoin for Beginners',
    level: 'Beginner',
    summary: 'The absolute basics of the world\'s first cryptocurrency.',
    content: 'Bitcoin is a decentralized digital currency, without a central bank or single administrator...'
  }
];

const INITIAL_ARTICLES: Article[] = [
  {
    "id": "auto-1766266924737",
    "slug": "the-crypto-pulse-navigating-the-evolving-landscape-in-late-2025",
    "title": "The Crypto Pulse: Navigating the Evolving Landscape in Late 2025",
    "excerpt": "The cryptocurrency market in late 2025 presents a complex picture of accelerated institutional adoption and groundbreaking technological advancements, yet it also grapples with recent bearish market sentiment.",
    "content": "<h2>The Shifting Tides of Crypto: A Late 2025 Snapshot</h2><p>As 2025 draws to a close, the cryptocurrency landscape is a dynamic blend of burgeoning institutional interest, significant regulatory advancements, and innovative technological shifts.</p><h2>Institutional Embrace: The New Norm</h2><p>One of the most defining characteristics of the crypto scenario in 2025 is the undeniable acceleration of institutional adoption.</p><ul><li><strong>ETFs Paving the Way:</strong> The approval of Spot Bitcoin and Ethereum ETFs has been a game-changer.</li><li><strong>Major Players Deepen Involvement:</strong> Giants like BlackRock and MicroStrategy are significantly expanding their crypto holdings.</li></ul><h2>A Global Regulatory Awakening</h2><p>2025 marks a pivotal year in cryptocurrency regulation, signaling a global shift from reactive enforcement actions to comprehensive frameworks.</p><h2>Looking Ahead</h2><p>The cryptocurrency scenario in late 2025 is characterized by a mature and increasingly regulated industry that is attracting significant institutional capital.</p>",
    "category": "Crypto",
    "tags": ["Crypto", "Blockchain", "DeFi", "Regulations", "Bitcoin"],
    "date": "December 20, 2025",
    "readTime": "7 min",
    "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    "isAutoGenerated": true
  },
  {
    "id": "auto-1765310095373",
    "slug": "unlock-the-future-a-deep-dive-into-google-ai-studio",
    "title": "Unlock the Future: A Deep Dive into Google AI Studio",
    "excerpt": "Google AI Studio is your free, web-based playground for prototyping and deploying generative AI applications, powered by the cutting-edge Gemini models.",
    "content": "<h2>What is Google AI Studio?</h2><p>Google AI Studio emerges as a pivotal platform, offering a powerful yet accessible environment for building with generative AI.</p>",
    "category": "AI",
    "tags": ["Google AI Studio", "Gemini API", "AI Development"],
    "date": "December 9, 2025",
    "readTime": "7 min",
    "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    "isAutoGenerated": true
  },
  {
    "id": "auto-1764366690105",
    "slug": "ltx-2-the-4k-ai-video-generator-that-s-revolutionizing-content-creation",
    "title": "LTX-2: The 4K AI Video Generator That's Revolutionizing Content Creation",
    "excerpt": "Lightricks' new LTX-2 AI video generator is here, boasting native 4K resolution, synchronized audio, and open-source flexibility.",
    "content": "<h2>The Dawn of a New Era: LTX-2 Arrives</h2><p>Lightricks has officially unveiled LTX-2, an AI video generator that delivers native 4K resolution with synchronized audio.</p>",
    "category": "AI",
    "tags": ["AI Video", "4K", "Lightricks"],
    "date": "November 28, 2025",
    "readTime": "6 min",
    "image": "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=800&q=80",
    "isAutoGenerated": true
  }
];

export const getArticles = (): Article[] => {
  if (typeof window === 'undefined') return INITIAL_ARTICLES;
  try {
    const savedArticlesStr = localStorage.getItem('openyourais_new_articles');
    if (savedArticlesStr) {
      const savedArticles = JSON.parse(savedArticlesStr);
      if (Array.isArray(savedArticles)) {
        return [...savedArticles, ...INITIAL_ARTICLES];
      }
    }
  } catch (error) {
    console.error("Failed to parse local articles:", error);
  }
  return INITIAL_ARTICLES;
};

export const saveNewArticle = (article: Article): Article[] => {
  try {
    const existingSavedStr = localStorage.getItem('openyourais_new_articles');
    let existingSaved: Article[] = existingSavedStr ? JSON.parse(existingSavedStr) : [];
    const updated = [article, ...existingSaved];
    localStorage.setItem('openyourais_new_articles', JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Failed to save article:", error);
  }
  return [];
};

export const ARTICLES = getArticles();