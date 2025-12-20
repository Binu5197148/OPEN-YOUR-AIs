// Content Constants - Sync Trigger: High-Quality AdSense Content Update
import { Article, Tool, Playbook, CryptoGuide } from './types';

export const ADSENSE_PUB_ID = "ca-pub-4722208859927111";
export const CONTACT_EMAIL = "openyourais888@gmail.com";

// --- RELIABLE IMAGE COLLECTIONS ---
const AI_IMAGES = [
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
];

const CRYPTO_IMAGES = [
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1621416894512-5363b933b243?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=800&q=80"
];

const MONEY_IMAGES = [
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
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
    "excerpt": "A comprehensive analysis of the cryptocurrency market as of late 2025, detailing institutional adoption, regulatory shifts, and the long-term outlook for digital assets.",
    "content": `
      <h2>The Shifting Tides of Crypto: A Late 2025 Snapshot</h2>
      <p>As 2025 draws to a close, the cryptocurrency landscape is a dynamic blend of burgeoning institutional interest, significant regulatory advancements, and innovative technological shifts. While earlier in the year, many experts foresaw a continued bull run, recent weeks have introduced a more cautious, even bearish, sentiment. Understanding these multifaceted forces is crucial for anyone navigating the world of digital assets.</p>
      
      <h3>The Institutional Integration Phase</h3>
      <p>One of the most defining characteristics of the crypto scenario in 2025 is the undeniable acceleration of institutional adoption. Digital assets have transitioned from being a niche, speculative interest to a core asset class within the traditional financial industry. Hedge funds, banks, and even pension funds are strategically allocating capital to cryptocurrencies.</p>
      <p>The approval of Spot Bitcoin and Ethereum Exchange-Traded Funds (ETFs) has been a primary catalyst for this shift. These regulated financial instruments have provided a "safe" entry point for billions of dollars that were previously sidelined by custodial concerns or regulatory ambiguity. Giants like BlackRock and MicroStrategy have not only maintained their positions but have actively expanded their portfolios, signaling a multi-decade commitment to the technology rather than a short-term trade.</p>

      <h2>Global Regulatory Maturation: MiCAR and Beyond</h2>
      <p>2025 marks a pivotal year in cryptocurrency regulation, signaling a global shift from reactive enforcement to proactive, comprehensive frameworks. Governments are no longer debating whether to regulate crypto, but how to do so in a way that fosters innovation while protecting consumers.</p>
      <p>In Europe, the MiCAR (Markets in Crypto-Assets) regulation has provided a gold standard for clarity, allowing companies to operate across borders with a unified set of rules. Meanwhile, in the United States, the focus has shifted toward distinguishing "digital commodities" from "securities," providing much-needed breathing room for decentralized protocols. This legal certainty is the "missing ingredient" that institutional investors needed to deploy large-scale capital into the ecosystem.</p>

      <h3>The Bearish Headwinds and Market Cycles</h3>
      <p>Despite the positive fundamental news, market dynamics remain volatile. As of December 2025, major assets like Bitcoin and Ethereum are experiencing typical end-of-year profit-taking and macroeconomic pressures. With interest rates remaining a concern for global liquidity, many investors have shifted back toward "risk-off" assets, leading to the current bearish sentiment in the spot markets.</p>
      <p>However, analysts point out that the current drawdown is significantly different from the "crypto winters" of 2018 or 2022. The volume of decentralized exchange (DEX) usage is at record highs, and the utility of stablecoins for cross-border payments has proven that the industry's value proposition is now tied to utility, not just speculation.</p>

      <h2>The Conclusion: Utility Over Hype</h2>
      <p>Looking ahead to 2026, the focus is clearly on tangible utility. Whether it is through the tokenization of real-world assets (RWA) or the integration of AI agents on-chain, the "Crypto Pulse" of 2025 beats with the rhythm of infrastructure development. For the long-term investor, the current market caution provides a moment of reflection: the speculative bubble has popped, and the era of the Decentralized Web is truly beginning.</p>
    `,
    "category": "Crypto",
    "tags": ["Crypto", "Blockchain", "Institutional Adoption", "Regulations"],
    "date": "December 20, 2025",
    "readTime": "8 min",
    "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    "isAutoGenerated": true
  },
  {
    "id": "auto-1765310095373",
    "slug": "unlock-the-future-a-deep-dive-into-google-ai-studio",
    "title": "Unlock the Future: A Deep Dive into Google AI Studio",
    "excerpt": "Explore how Google AI Studio and the Gemini models are revolutionizing the landscape of generative AI for developers and businesses alike.",
    "content": "<h2>The Paradigm Shift in AI Development</h2><p>Google AI Studio has emerged as the most accessible entry point for developers looking to harness the power of the Gemini models. By providing a low-code environment alongside robust API capabilities, Google is effectively democratizing the creation of complex AI agents.</p><h3>Key Features of the Gemini Ecosystem</h3><p>The latest iterations of Gemini 3 demonstrate unprecedented reasoning capabilities, allowing for multi-modal inputs that include video, audio, and large-scale codebases. This allows for the creation of applications that were previously impossible, such as real-time legal analysis or automated software architectural reviews.</p>",
    "category": "AI",
    "tags": ["Google AI Studio", "Gemini", "AI Agents"],
    "date": "December 9, 2025",
    "readTime": "7 min",
    "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
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