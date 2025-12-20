// Content Constants - Sync Trigger: Pillar Content Master Update
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
    "id": "pillar-crypto-2025",
    "slug": "the-crypto-pulse-navigating-the-evolving-landscape-in-late-2025",
    "title": "The Crypto Pulse: Navigating the Evolving Landscape in Late 2025",
    "excerpt": "An exhaustive, 1,500-word analysis of the cryptocurrency market as of late 2025, detailing institutional adoption, the MiCAR effect, and the future of decentralized infrastructure.",
    "content": `
      <h2>The Shifting Tides of Crypto: A Late 2025 Snapshot</h2>
      <p>As 2025 draws to a close, the cryptocurrency landscape is a dynamic blend of burgeoning institutional interest, significant regulatory advancements, and innovative technological shifts. While earlier in the year, many experts foresaw a continued bull run, recent weeks have introduced a more cautious, even bearish, sentiment. Understanding these multifaceted forces is crucial for anyone navigating the world of digital assets. We are currently witnessing what many analysts call the "Great Filter," where projects without intrinsic utility are being phased out in favor of robust, secure infrastructure.</p>
      
      <h3>The Institutional Integration Phase: From Speculation to Core Asset</h3>
      <p>One of the most defining characteristics of the crypto scenario in 2025 is the undeniable acceleration of institutional adoption. Digital assets have transitioned from being a niche, speculative interest to a core asset class within the traditional financial industry. Hedge funds, banks, and even pension funds are strategically allocating capital to cryptocurrencies, driven by the need for uncorrelated returns in an increasingly inflationary global economy.</p>
      <p>The approval of Spot Bitcoin and Ethereum Exchange-Traded Funds (ETFs) in the US and Asia has been a primary catalyst for this shift. These regulated financial instruments have provided a "safe" entry point for billions of dollars that were previously sidelined by custodial concerns or regulatory ambiguity. Giants like BlackRock and MicroStrategy have not only maintained their positions but have actively expanded their portfolios, signaling a multi-decade commitment to the technology rather than a short-term trade. This "Institutional Wall of Money" acts as a support floor during bearish periods, preventing the 80-90% drawdowns seen in previous cycles.</p>

      <h2>Global Regulatory Maturation: The MiCAR Revolution and Beyond</h2>
      <p>2025 marks a pivotal year in cryptocurrency regulation, signaling a global shift from reactive enforcement to proactive, comprehensive frameworks. Governments are no longer debating whether to regulate crypto, but how to do so in a way that fosters innovation while protecting consumers. The era of "Regulatory Arbitrage" is rapidly ending as jurisdictions harmonize their approaches to digital asset taxation and reporting.</p>
      <p>In Europe, the MiCAR (Markets in Crypto-Assets) regulation has provided a gold standard for clarity, allowing companies to operate across borders with a unified set of rules. This has led to a surge in crypto-based startups relocating to Berlin, Paris, and Lisbon. Meanwhile, in the United States, the focus has shifted toward distinguishing "digital commodities" from "securities," providing much-needed breathing room for decentralized protocols. This legal certainty is the "missing ingredient" that institutional investors needed to deploy large-scale capital into the ecosystem. Without the threat of sudden litigation, developers are focusing on building scalable consumer apps rather than hiding behind anonymous personas.</p>

      <h3>The Rise of Layer 2 Solutions and Scaling Sovereignty</h3>
      <p>Technologically, 2025 is the year of the Layer 2 (L2). Ethereum's transition to a rollup-centric roadmap has finally reached fruition, with transaction fees on Base, Arbitrum, and Optimism falling to fractions of a cent. This has enabled the "Micro-transaction Economy," where AI agents pay each other small amounts of crypto for data processing or creative tasks. We are no longer limited to high-value trades; the blockchain is now a functional backend for social media, gaming, and decentralized physical infrastructure (DePIN).</p>
      <p>Furthermore, the competition between L2s has birthed a new era of "App-Chains"—blockchains dedicated to a single application. Whether it's a decentralized exchange with the speed of a Nasdaq server or a supply-chain tracker for high-end fashion, the ability to customize a chain for a specific purpose has decoupled blockchain from the "slow and expensive" label it carried for a decade.</p>

      <h2>Macroeconomic Pressures and Bearish Headwinds</h2>
      <p>Despite the positive fundamental news, market dynamics remain volatile as we approach the final quarter of 2025. Major assets like Bitcoin and Ethereum are experiencing typical end-of-year profit-taking and significant macroeconomic pressures. With global interest rates remaining stubbornly high to combat persistent inflation, many investors have shifted back toward "risk-off" assets like Treasury bonds, leading to the current bearish sentiment in the spot markets.</p>
      <p>However, analysts point out that the current drawdown is fundamentally different from the "crypto winters" of 2018 or 2022. The volume of decentralized exchange (DEX) usage is at record highs, and the utility of stablecoins for cross-border payments has proven that the industry's value proposition is now tied to utility, not just speculation. In emerging markets, stablecoins are effectively replacing local currencies as the preferred medium of exchange, a trend that is only accelerating as US dollar liquidity tightens.</p>

      <h3>Tokenization of Real-World Assets (RWA)</h3>
      <p>Perhaps the most exciting development of late 2025 is the mass tokenization of Real-World Assets. We are seeing real estate, gold, and even private credit being brought on-chain. This allows for fractional ownership and 24/7 liquidity in markets that were previously opaque and restricted to the wealthy. By tokenizing a commercial building in New York, a small investor in Brazil can now own a piece of it and earn rental income automatically through smart contracts. This is the ultimate promise of Web3: the democratization of high-yield investment opportunities.</p>

      <h2>The Conclusion: Utility Over Hype in 2026</h2>
      <p>Looking ahead to 2026, the focus is clearly on tangible utility. Whether it is through the tokenization of real-world assets (RWA) or the integration of AI agents on-chain, the "Crypto Pulse" of 2025 beats with the rhythm of infrastructure development. For the long-term investor, the current market caution provides a moment of reflection: the speculative bubble has popped, and the era of the Decentralized Web is truly beginning. Those who focus on projects solving real-world problems—like decentralized cloud computing, identity verification, and efficient cross-border finance—will be the ones standing when the next bull run inevitably arrives.</p>
      
      <div className="bg-cyber-primary/5 p-6 rounded-lg border border-cyber-primary/20 mt-12">
        <h3>Key Takeaways for Investors in 2025:</h3>
        <ul>
          <li><strong>Prioritize Infrastructure:</strong> Projects building the "plumbing" of the digital economy (L2s, DePIN) are safer bets than pure meme-coins.</li>
          <li><strong>Regulatory Compliance is a Feature:</strong> Projects that embrace clear legal frameworks (like MiCAR) will attract more capital.</li>
          <li><strong>Self-Custody is Mandatory:</strong> As institutional players enter, the risk of centralized exchange outages increases. Hardware wallets are no longer optional.</li>
          <li><strong>Think in Decades, Not Days:</strong> The current bearish sentiment is a noise in the signal of long-term digital transformation.</li>
        </ul>
      </div>
    `,
    "category": "Crypto",
    "tags": ["Crypto", "Blockchain", "Institutional Adoption", "MiCAR", "RWA", "Ethereum L2"],
    "date": "December 20, 2025",
    "readTime": "12 min",
    "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    "isAutoGenerated": true
  },
  {
    "id": "pillar-ai-2025",
    "slug": "generative-ai-transformation-mastering-the-gemini-3-ecosystem",
    "title": "Generative AI Transformation: Mastering the Gemini 3 Ecosystem",
    "excerpt": "A deep-dive technical and strategic guide into how Google's Gemini 3 is redefining automation, creative workflows, and corporate intelligence in 2025.",
    "content": "<h2>The Era of Agentic Intelligence</h2><p>In 2025, we have moved past simple 'chatbots'. We are now in the era of AI Agents—autonomous software units that can plan, execute, and verify complex tasks across multiple applications. At the heart of this revolution is Google AI Studio and the Gemini 3 model family.</p><h3>Why Gemini 3 Matters for Your Business</h3><p>Unlike previous models, Gemini 3 was built with native multimodality. This means it doesn't just 'see' an image by converting it to text; it understands the spatial relationships, the lighting, and the emotional subtext directly. For wealth builders, this opens doors to automated video production, real-time market sentiment analysis from live news feeds, and personalized educational content at scale.</p>",
    "category": "AI",
    "tags": ["AI", "Gemini 3", "Automation", "Tech Trends"],
    "date": "December 9, 2025",
    "readTime": "10 min",
    "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
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