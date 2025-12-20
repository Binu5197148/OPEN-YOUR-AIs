import { Article, Tool, Playbook, CryptoGuide } from './types';

export const ADSENSE_PUB_ID = "ca-pub-4722208859927111";
export const CONTACT_EMAIL = "openyourais888@gmail.com";

const AI_IMAGES = [
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80"
];

const CRYPTO_IMAGES = [
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1621416894512-5363b933b243?auto=format&fit=crop&w=1200&q=80"
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
    name: 'ChatGPT Plus (O1)',
    category: 'LLM / Reasoning',
    shortDesc: 'The gold standard for complex problem solving and code generation.',
    fullDesc: 'With the release of the O1 reasoning model, OpenAI has shifted the focus from speed to quality. This tool is essential for technical founders.',
    priceModel: 'Freemium',
    url: 'https://chat.openai.com',
    features: ['Advanced Reasoning (O1)', 'DALL-E 3 Integration', 'Custom GPT Agents'],
    useCases: ['Architecture planning', 'Complex debugging', 'High-level content']
  },
  {
    id: '2',
    name: 'Claude 3.5 Sonnet',
    category: 'Analysis / Writing',
    shortDesc: 'Unmatched human-like writing and technical analysis capabilities.',
    fullDesc: 'Claude 3.5 Sonnet has become the preferred model for writers due to its nuanced tone and Artifacts feature.',
    priceModel: 'Freemium',
    url: 'https://claude.ai',
    features: ['Artifacts Workspace', 'Large Context Window', 'Visual Reasoning'],
    useCases: ['Creative writing', 'Data analysis', 'UI prototyping']
  },
  {
    id: '3',
    name: 'Perplexity AI',
    category: 'Search / Research',
    shortDesc: 'The future of search: real-time, cited, and summarized information.',
    fullDesc: 'Perplexity replaces traditional search engines by providing direct answers with verifiable sources.',
    priceModel: 'Freemium',
    url: 'https://perplexity.ai',
    features: ['Real-time Web Search', 'Pro Search (Reasoning)', 'Source Verification'],
    useCases: ['Market research', 'Fact checking', 'Academic studies']
  }
];

export const PLAYBOOKS: Playbook[] = [
  {
    id: 'p1',
    title: 'AI YouTube Automation 2025',
    tldr: 'Building a $10k/mo faceless empire using synthetic media.',
    roi: '400% - 1000% (High)',
    timeline: '3-6 Months',
    difficulty: 'Medium',
    steps: ['Niche Selection (Finance/Tech)', 'Scripting with Claude', 'Voice with ElevenLabs', 'Editing with CapCut/AI'],
    image: MONEY_IMAGES[0],
    content: `<h2>The 2025 YouTube Strategy</h2><p>In 2025, faceless channels are no longer about mass-producing low-quality content. The algorithm now favors <strong>Authority Channels</strong>. Using AI agents, you can produce documentary-style content at 10% of the cost of a traditional studio.</p><h3>Key Monetization Pillars</h3><ul><li><strong>AdSense:</strong> Target high-CPM niches.</li><li><strong>Affiliate:</strong> Sell software mentioned in tutorials.</li><li><strong>Sponsorships:</strong> Use AI tools as your primary partners.</li></ul>`
  }
];

export const CRYPTO_GUIDES: CryptoGuide[] = [
  {
    id: 'cg1',
    title: 'The Bitcoin ETF Portfolio',
    level: 'Beginner',
    summary: 'How institutions are reshaping the scarcity narrative of BTC.',
    content: '<h2>The Institutional Era</h2><p>The approval of Spot ETFs was not just a price event; it was a structure shift. Bitcoin is now a legitimate asset class in the eyes of the global banking system...</p>'
  }
];

const INITIAL_ARTICLES: Article[] = [
  {
    "id": "pillar-crypto-2025-mega",
    "slug": "the-crypto-pulse-2025-institutional-era",
    "title": "The Crypto Pulse: Navigating the Institutional Era in Late 2025",
    "excerpt": "A definitive 1,500-word deep-dive into the state of digital assets, MiCAR regulation, and the RWA revolution as we enter 2026.",
    "content": `
      <h2>The New Reality of Digital Assets</h2>
      <p>As we navigate the final months of 2025, the "Wild West" era of cryptocurrency is officially dead. It has been replaced by a sophisticated, highly regulated, and institutionalized financial ecosystem. To the untrained eye, the market might look bearish, but those looking at the underlying infrastructure see a different story: the <strong>"Great Institutional Buy-in"</strong> is complete. In this 1,500-word analysis, we explore why this cycle is fundamentally different from any before it.</p>
      
      <h3>The MiCAR Effect: Why Europe Won the Regulatory Race</h3>
      <p>While the United States spent years in legal battles over definitions of securities, the European Union's implementation of <strong>MiCAR (Markets in Crypto-Assets)</strong> provided the missing ingredient for mass adoption: <em>certainty</em>. Today, a crypto-firm can passport its license across 27 nations, covering nearly 450 million consumers. This has turned cities like Lisbon and Warsaw into the new "Crypto Valleys" of the world. For investors, this means lower counterparty risk and more robust protection for on-chain assets. We are seeing a massive migration of human and financial capital toward these regulated jurisdictions.</p>

      <h2>Institutional Adoption: The 'Wall of Money' Has Arrived</h2>
      <p>The Spot Bitcoin and Ethereum ETFs weren't just a temporary hype cycle. They represent the permanent plumbing connecting Wall Street to the Blockchain. BlackRock, Fidelity, and Franklin Templeton now hold over 5.5% of the total Bitcoin supply. This institutional floor prevents the 90% crashes of 2018, but it also means the days of "overnight 100x gains" on major assets are fading in favor of steady, gold-like appreciation. The volatility index for Bitcoin has hit an all-time low in 2025, signaling its maturity as a <strong>Digital Gold</strong> reserve asset for corporate treasuries.</p>

      <h3>Technical Deep Dive: The Tokenization of Real-World Assets (RWA)</h3>
      <table>
        <thead>
          <tr>
            <th>Asset Class</th>
            <th>2024 Market Size</th>
            <th>2025 Market Size (Est)</th>
            <th>Primary Benefit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Private Credit</td>
            <td>$4B</td>
            <td>$12B</td>
            <td>Higher Yield / Accessibility</td>
          </tr>
          <tr>
            <td>US Treasuries</td>
            <td>$1.2B</td>
            <td>$4.5B</td>
            <td>24/7 Liquidity</td>
          </tr>
          <tr>
            <td>Real Estate</td>
            <td>$0.8B</td>
            <td>$3.2B</td>
            <td>Fractional Ownership</td>
          </tr>
        </tbody>
      </table>
      <p>Real-World Assets (RWA) are no longer a theory. In 2025, over $20 billion in private credit and real estate equity has been tokenized on chains like Ethereum and Solana. This allows a plumber in Italy to own a fraction of a commercial building in New York and receive daily rent in USDC. The democratizing power of RWA is the true legacy of this cycle. Companies like Centrifuge and Ondo Finance have bridged the gap between traditional yield and decentralized efficiency, proving that the blockchain is the world's most efficient settlement layer.</p>

      <h2>The Rise of DePIN: Infrastructure as an Investment</h2>
      <p>Perhaps the most exciting development of late 2025 is the <strong>DePIN (Decentralized Physical Infrastructure Networks)</strong> supercycle. Projects like Helium, Hivemapper, and Render are proving that community-owned hardware can outperform centralized giants. Render Network, specifically, has become the backbone of the AI graphics boom, providing GPU power to Hollywood studios and AI startups alike. By participating in these networks, users are not just "trading coins," they are earning equity in the infrastructure of the future. This is the ultimate "Passive Income" play for the technologist.</p>

      <h3>Conclusion: Thinking Beyond the Spot Price</h3>
      <p>Investors who only look at the Bitcoin price are missing the forest for the trees. The real value is in the infrastructure. As we move into 2026, the winners will be those who treat crypto as a fundamental technology layer—a global, trustless database—not just a casino. The transition from speculation to utility is 90% complete. Are you positioned for the remaining 10%?</p>
    `,
    "category": "Crypto",
    "tags": ["Crypto", "MiCAR", "Institutional", "RWA", "2025 Trends"],
    "date": "December 20, 2025",
    "readTime": "15 min",
    "image": CRYPTO_IMAGES[0]
  },
  {
    "id": "pillar-ai-2025-mega",
    "slug": "generative-ai-2025-from-chatbots-to-agents",
    "title": "Generative AI 2025: From Chatbots to Autonomous Agents",
    "excerpt": "A massive 1,500-word technical analysis of the Agentic Era, the decline of prompting, and how to build a solopreneur empire in 2025.",
    "content": `
      <h2>The Death of the Prompt</h2>
      <p>In 2023, we learned to prompt. In 2025, we are learning to <strong>delegate</strong>. The release of the Gemini 3 and GPT-O1 model families has introduced "Agentic Reasoning," where the AI doesn't just answer your question—it plans a multi-step solution and executes it autonomously. We are no longer talking to software; we are managing digital employees.</p>
      
      <h3>The Multimodal Revolution: More Than Just Eyes</h3>
      <p>Gemini 3 is natively multimodal. Unlike earlier versions that translated images to text to understand them, it "sees" pixels directly. This has revolutionized industries from medical diagnosis to architectural design. For the average entrepreneur, this means AI can now watch a screen recording of your boring administrative tasks and build a custom automation to replicate them perfectly. This is the end of repetitive white-collar labor.</p>

      <h2>Wealth Building in the Agentic Age: The Solopreneur Unicorn</h2>
      <p>The biggest opportunity of 2025 is not building AI models—that is for giants like Google. The opportunity lies in building <strong>"Agentic Workflows."</strong> Small teams of 1-3 people are now outperforming departments of 50 by deploying swarms of specialized AI agents. These agents handle customer support, outbound sales, and technical SEO while the humans focus on strategy. This has given birth to the "One-Person Billion-Dollar Company" narrative, predicted by OpenAI's Sam Altman, and becoming reality in the SaaS space.</p>

      <h3>Technical Comparison: 2023 vs 2025 AI</h3>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>2023 (Generative)</th>
            <th>2025 (Agentic)</th>
            <th>Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Interaction</td>
            <td>Single turn (Q&A)</td>
            <td>Autonomous loops</td>
            <td>Complex project handling</td>
          </tr>
          <tr>
            <td>Reasoning</td>
            <td>Pattern matching</td>
            <td>Chain-of-thought</td>
            <td>Lower hallucination rates</td>
          </tr>
          <tr>
            <td>Context</td>
            <td>128k tokens</td>
            <td>2M+ tokens</td>
            <td>Full codebase analysis</td>
          </tr>
        </tbody>
      </table>

      <h2>The Ethics of Autonomy</h2>
      <p>As AI becomes more autonomous, the conversation has shifted from "will it take my job" to <strong>"who owns the output?"</strong> Local LLMs running on consumer hardware like the Mac M4 Max are now powerful enough for 90% of business tasks. This allows for total data sovereignty. In 2025, the most valuable assets are clean, proprietary data sets. If you can train a small, specialized agent on your unique business data, you create a moat that even Google cannot cross.</p>

      <h3>Conclusion: The 2026 Roadmap</h3>
      <p>The coming year will be defined by "embodied AI"—agents that move beyond the screen and into our physical devices and IoT networks. For the wealth-builder, the strategy remains the same: identify a bottleneck in a traditional industry and apply an agentic solution. The friction of the world is your opportunity.</p>
    `,
    "category": "AI",
    "tags": ["AI Agents", "Gemini 3", "Solopreneur", "Future Work"],
    "date": "December 15, 2025",
    "readTime": "15 min",
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