// Content Constants - Pillar Content Authority Update
import { Article, Tool, Playbook, CryptoGuide } from './types';

export const ADSENSE_PUB_ID = "ca-pub-4722208859927111";
export const CONTACT_EMAIL = "openyourais888@gmail.com";

// --- RELIABLE IMAGE COLLECTIONS ---
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
  "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80"
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
    "id": "pillar-crypto-2025-v2",
    "slug": "the-crypto-pulse-navigating-the-evolving-landscape-in-late-2025",
    "title": "The Crypto Pulse: Navigating the Evolving Landscape in Late 2025",
    "excerpt": "An exhaustive, 1,500-word analysis of the cryptocurrency market as of late 2025, detailing institutional adoption, the MiCAR effect, and the future of decentralized infrastructure.",
    "content": `
      <h2>The Shifting Tides of Crypto: A Late 2025 Snapshot</h2>
      <p>As 2025 draws to a close, the cryptocurrency landscape is a dynamic blend of burgeoning institutional interest, significant regulatory advancements, and innovative technological shifts. While earlier in the year, many experts foresaw a continued bull run, recent weeks have introduced a more cautious, even bearish, sentiment. Understanding these multifaceted forces is crucial for anyone navigating the world of digital assets. We are currently witnessing what many analysts call the "Great Filter," where projects without intrinsic utility are being phased out in favor of robust, secure infrastructure.</p>
      
      <h3>The Institutional Integration Phase: From Speculation to Core Asset</h3>
      <p>One of the most defining characteristics of the crypto scenario in 2025 is the undeniable acceleration of institutional adoption. Digital assets have transitioned from being a niche, speculative interest to a core asset class within the traditional financial industry. Hedge funds, banks, and even pension funds are strategically allocating capital to cryptocurrencies, driven by the need for uncorrelated returns in an increasingly inflationary global economy.</p>
      <p>The approval of Spot Bitcoin and Ethereum Exchange-Traded Funds (ETFs) in the US and Asia has been a primary catalyst for this shift. These regulated financial instruments have provided a "safe" entry point for billions of dollars that were previously sidelined by custodial concerns or regulatory ambiguity. Giants like BlackRock and MicroStrategy have not only maintained their positions but have actively expanded their portfolios, signaling a multi-decade commitment to the technology rather than a short-term trade.</p>

      <h2>Global Regulatory Maturation: The MiCAR Revolution and Beyond</h2>
      <p>2025 marks a pivotal year in cryptocurrency regulation, signaling a global shift from reactive enforcement to proactive, comprehensive frameworks. Governments are no longer debating whether to regulate crypto, but how to do so in a way that fosters innovation while protecting consumers. The era of "Regulatory Arbitrage" is rapidly ending as jurisdictions harmonize their approaches to digital asset taxation and reporting.</p>
      <p>In Europe, the MiCAR (Markets in Crypto-Assets) regulation has provided a gold standard for clarity, allowing companies to operate across borders with a unified set of rules. Meanwhile, in the United States, the focus has shifted toward distinguishing "digital commodities" from "securities," providing much-needed breathing room for decentralized protocols. This legal certainty is the "missing ingredient" that institutional investors needed to deploy large-scale capital into the ecosystem.</p>

      <h3>Technical Deep Dive: DePIN and the Tokenization of Real-World Assets (RWA)</h3>
      <p>Perhaps the most transformative trend of 2025 is the rise of DePIN (Decentralized Physical Infrastructure Networks). Projects are now using blockchain to incentivize the creation of real-world wireless networks, cloud storage, and even energy grids. By distributing rewards in tokens, these protocols bypass the need for massive upfront capital expenditure from centralized telcos or tech giants.</p>
      <p>Simultaneously, the Tokenization of Real-World Assets (RWA) has brought real estate, private equity, and government bonds on-chain. This 24/7 liquidity and fractional ownership model are dismantling traditional barriers to wealth. Imagine owning 0.001% of a commercial skyscraper in London and receiving rent in USDC daily. This is no longer a futuristic dream; it is the 2025 reality for savvy investors using the protocols we detail in our tool directory.</p>

      <h2>The Rise of Layer 2 Solutions and Scaling Sovereignty</h2>
      <p>Technologically, 2025 is the year of the Layer 2 (L2). Ethereum's transition to a rollup-centric roadmap has finally reached fruition, with transaction fees on Base, Arbitrum, and Optimism falling to fractions of a cent. This has enabled the "Micro-transaction Economy," where AI agents pay each other small amounts of crypto for data processing or creative tasks.</p>
      <p>Furthermore, the competition between L2s has birthed a new era of "App-Chains"—blockchains dedicated to a single application. Whether it's a decentralized exchange with the speed of a Nasdaq server or a supply-chain tracker for high-end fashion, the ability to customize a chain for a specific purpose has decoupled blockchain from the "slow and expensive" label it carried for a decade.</p>

      <h3>Market Analysis: Navigating Bearish Headwinds</h3>
      <p>Despite the positive fundamental news, market dynamics remain volatile as we approach the final quarter of 2025. Major assets like Bitcoin and Ethereum are experiencing typical end-of-year profit-taking and significant macroeconomic pressures. With global interest rates remaining stubbornly high to combat persistent inflation, many investors have shifted back toward "risk-off" assets, leading to the current bearish sentiment in the spot markets.</p>
      <p>However, analysts point out that the current drawdown is fundamentally different from previous winters. The volume of decentralized exchange (DEX) usage is at record highs, and the utility of stablecoins for cross-border payments has proven that the industry's value proposition is now tied to utility, not just speculation. In emerging markets, stablecoins are effectively replacing local currencies, a trend that is only accelerating as US dollar liquidity tightens.</p>

      <h2>The Conclusion: Utility Over Hype in 2026</h2>
      <p>Looking ahead to 2026, the focus is clearly on tangible utility. Whether it is through the tokenization of real-world assets (RWA) or the integration of AI agents on-chain, the "Crypto Pulse" of 2025 beats with the rhythm of infrastructure development. For the long-term investor, the current market caution provides a moment of reflection: the speculative bubble has popped, and the era of the Decentralized Web is truly beginning.</p>
      
      <div class="bg-cyber-primary/5 p-8 rounded-2xl border border-cyber-primary/20 mt-12 shadow-inner">
        <h3 class="text-white mt-0">Strategic Takeaways for 2025:</h3>
        <ul class="space-y-4">
          <li><strong>Infrastructure Focus:</strong> Avoid high-leverage meme-coins; focus on the "plumbing" of the web (L2s, DePIN).</li>
          <li><strong>Regulatory Moats:</strong> Projects that are MiCAR-compliant have a significant competitive advantage for institutional capital.</li>
          <li><strong>Self-Custody is Safety:</strong> As traditional finance enters the space, the risk of centralized exchange "gatekeeping" grows. Cold storage is mandatory.</li>
          <li><strong>Macro-Signal over Noise:</strong> Bearish spot markets often hide the strongest development cycles. Build in the red, harvest in the green.</li>
        </ul>
      </div>
    `,
    "category": "Crypto",
    "tags": ["Crypto", "Blockchain", "Institutional Adoption", "MiCAR", "RWA", "Ethereum L2", "DePIN"],
    "date": "December 20, 2025",
    "readTime": "15 min",
    "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
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