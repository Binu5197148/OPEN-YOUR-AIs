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
  { id: '1', name: 'ChatGPT Plus (O1)', category: 'LLM / Reasoning', shortDesc: 'The global standard for AI interaction.', fullDesc: 'The O1 model introduces advanced reasoning for complex technical tasks.', priceModel: 'Freemium', url: 'https://chat.openai.com', features: ['Reasoning', 'DALL-E 3'], useCases: ['Coding', 'Analysis'] },
  { id: '2', name: 'Claude 3.5 Sonnet', category: 'LLM / Writing', shortDesc: 'Best for human-like creative writing.', fullDesc: 'Artifacts workspace for live coding and UI preview.', priceModel: 'Freemium', url: 'https://claude.ai', features: ['Artifacts', 'Visual Analysis'], useCases: ['UI Prototyping', 'Content'] },
  { id: '3', name: 'Perplexity Pro', category: 'Search / Research', shortDesc: 'The future of real-time search.', fullDesc: 'Direct access to multiple LLMs with cited web sources.', priceModel: 'Freemium', url: 'https://perplexity.ai', features: ['Pro Search', 'Citations'], useCases: ['Market Research'] },
  { id: '4', name: 'ElevenLabs', category: 'Audio / Voice', shortDesc: 'Professional AI voice cloning.', fullDesc: 'Highest quality text-to-speech with emotional depth.', priceModel: 'Paid', url: 'https://elevenlabs.io', features: ['Voice Cloning', 'Dubbing'], useCases: ['YouTube Automation'] },
  { id: '5', name: 'Midjourney v6', category: 'Image Generation', shortDesc: 'Highest quality AI art generator.', fullDesc: 'Advanced prompt control for professional artistic output.', priceModel: 'Paid', url: 'https://midjourney.com', features: ['Upscaling', 'Styles'], useCases: ['Visual Design'] },
  { id: '6', name: 'Cursor IDE', category: 'Development', shortDesc: 'The AI-first code editor.', fullDesc: 'VS Code fork with deep LLM indexing of your entire codebase.', priceModel: 'Freemium', url: 'https://cursor.com', features: ['Chat', 'Composer'], useCases: ['Software Engineering'] },
  { id: '7', name: 'Gamma.app', category: 'Productivity', shortDesc: 'AI-driven decks and websites.', fullDesc: 'Generate polished presentations and one-pagers in seconds.', priceModel: 'Freemium', url: 'https://gamma.app', features: ['AI Templates', 'One-click site'], useCases: ['Business Pitches'] },
  { id: '8', name: 'Jasper AI', category: 'Marketing', shortDesc: 'Enterprise-grade copy generation.', fullDesc: 'Maintain brand voice consistency across all marketing channels.', priceModel: 'Paid', url: 'https://jasper.ai', features: ['Brand Voice', 'Campaigns'], useCases: ['Enterprise Content'] },
  { id: '9', name: 'Pika Art', category: 'Video', shortDesc: 'Advanced text-to-video tools.', fullDesc: 'Cinematic movement and LIP sync for AI characters.', priceModel: 'Freemium', url: 'https://pika.art', features: ['Region edit', 'Sound FX'], useCases: ['Social Media Video'] },
  { id: '10', name: 'v0.dev', category: 'UI/UX', shortDesc: 'Generative UI for React.', fullDesc: 'From text/image to production-ready Tailwind components.', priceModel: 'Freemium', url: 'https://v0.dev', features: ['React/Next.js', 'Themeable'], useCases: ['Frontend Dev'] },
  { id: '11', name: 'Canva Magic', category: 'Design', shortDesc: 'AI suite for creators.', fullDesc: 'Integrated AI editing, background removal, and magic layout.', priceModel: 'Freemium', url: 'https://canva.com', features: ['Magic Eraser', 'Translate'], useCases: ['Graphic Design'] },
  { id: '12', name: 'Luma Dream Machine', category: 'Video', shortDesc: 'Realistic video generation.', fullDesc: 'High-fidelity physics and movement in AI video.', priceModel: 'Freemium', url: 'https://lumalabs.ai', features: ['720p HQ', 'Physics aware'], useCases: ['B-Roll Generation'] }
];

export const PLAYBOOKS: Playbook[] = [
  { id: 'p1', title: 'YouTube Automation 2.0', tldr: 'Build a faceless media empire using AI swarms.', roi: '500%', timeline: '4-8 Months', difficulty: 'Medium', steps: ['Niche Selection', 'Scripting with Claude', 'ElevenLabs Voiceover', 'CapCut AI Editing'], image: MONEY_IMAGES[0], content: '<h2>Scaling Faceless Channels</h2><p>In 2025, high-CPM niches like Finance and Tech are the gold mine. Use AI to produce 5 videos a week at the cost of 1.</p>' },
  { id: 'p2', title: 'AI SaaS Micro-Agency', tldr: 'Deploying custom LLM solutions for local SMEs.', roi: '800%', timeline: '1-3 Months', difficulty: 'Easy', steps: ['Identify Business Bottleneck', 'Build custom GPT/Assistant', 'API Integration', 'Monthly Maintenance Retainer'], image: MONEY_IMAGES[1], content: '<h2>Solving Real Business Problems</h2><p>SMEs don\'t need "AI", they need more time. Build assistants that handle their specific data.</p>' },
  { id: 'p3', title: 'AI-Enhanced Newsletter', tldr: 'Curated high-value insights for niche industries.', roi: '300%', timeline: '6-12 Months', difficulty: 'Medium', steps: ['Identify High-Value Niche', 'Beehiiv Setup', 'AI Curation Loop', 'Sponsorship Outreach'], image: MONEY_IMAGES[2], content: '<h2>Building Audience Equity</h2><p>Newsletters are the only platform you own. Use AI to curate the signal from the noise.</p>' },
  { id: 'p4', title: 'B2B Prompt Consultant', tldr: 'Optimizing corporate AI workflows.', roi: '1000%', timeline: '1 Month', difficulty: 'Hard', steps: ['Audit Corporate Workflows', 'Develop Prompt Library', 'Team Training', 'Token Cost Optimization'], image: AI_IMAGES[2], content: '<h2>The Efficiency Arbitrage</h2><p>Corporations are wasting millions in tokens. Show them how to get better results for 1/10th the cost.</p>' },
  { id: 'p5', title: 'Digital Asset Flipping', tldr: 'Acquiring and AI-optimizing niche websites.', roi: '200%', timeline: '3-6 Months', difficulty: 'Hard', steps: ['Asset Acquisition', 'Content Refresh with AI', 'SEO Optimization', 'Exit Sale'], image: CRYPTO_IMAGES[2], content: '<h2>Modern Real Estate</h2><p>Digital assets are the new property. Use AI to increase the "yield" of your traffic.</p>' },
  { id: 'p6', title: 'AI Voice Cloning Studio', tldr: 'Voice services for podcasts and ads.', roi: '400%', timeline: '2 Months', difficulty: 'Medium', steps: ['Voice Licensing', 'ElevenLabs Pro Setup', 'Marketplace Listing', 'Client Fulfillment'], image: MONEY_IMAGES[0], content: '<h2>Synthetic Audio Economy</h2><p>Create a library of licensed voices for global distribution.</p>' }
];

export const CRYPTO_GUIDES: CryptoGuide[] = [
  { id: 'cg1', title: 'Bitcoin: The 2025 Outlook', level: 'Beginner', summary: 'Understanding scarcity in the institutional age.', content: '<h2>Institutional Floor</h2><p>Bitcoin has matured from a retail asset to a corporate treasury reserve.</p>' },
  { id: 'cg2', title: 'Ethereum & L2 Scaling', level: 'Intermediate', summary: 'The infrastructure of the new web.', content: '<h2>The Settlement Layer</h2><p>Ethereum is the backbone of the RWA and DeFi ecosystem.</p>' }
];

const INITIAL_ARTICLES: Article[] = [
  {
    "id": "pillar-depin-2025",
    "slug": "the-2025-depin-supercycle-guide",
    "title": "The 2025 DePIN Supercycle: An Authoritative Guide",
    "excerpt": "A master-class analysis of Decentralized Physical Infrastructure. Discover actionable wealth strategies.",
    "content": `
      <h2>Executive Summary</h2>
      <p>By late 2025, the Decentralized Physical Infrastructure Network (DePIN) sector has graduated to a foundational pillar of the global economy. With a market cap exceeding <strong>$50 billion</strong>, DePIN is blockchain's killer use case.</p>
      <h3>The Rationale Behind DePIN</h3>
      <p>Traditional infrastructure is centralized, expensive, and slow to scale. DePIN utilizes crypto-economic incentives to deploy real-world hardware—from 5G antennas to GPU clusters—at lightning speed.</p>
      <table>
        <thead><tr><th>Category</th><th>Example Project</th><th>Asset Required</th><th>Avg Yield</th></tr></thead>
        <tbody>
          <tr><td>Wireless</td><td>Helium / Geodnet</td><td>Miner/Antenna</td><td>Medium</td></tr>
          <tr><td>Compute</td><td>Render / Akash</td><td>GPU / Server</td><td>High</td></tr>
          <tr><td>Storage</td><td>Filecoin / Arweave</td><td>Hard Drive</td><td>Low/Stable</td></tr>
        </tbody>
      </table>
      <h3>Strategy for 2026</h3>
      <p>Investors should focus on "Verified Compute". Projects like <strong>Fluence</strong> and <strong>Gensyn</strong> use zk-proofs to ensure integrity, a requirement for enterprise adoption.</p>
    `,
    "category": "Monetization",
    "tags": ["DePIN", "Crypto", "Passive Income", "Infrastructure"],
    "date": "Dec 20, 2025",
    "readTime": "15 min",
    "image": MONEY_IMAGES[0]
  },
  {
    "id": "pillar-ai-agents-2025",
    "slug": "from-chatbots-to-agentic-workforces",
    "title": "Generative AI 2025: Building Agentic Workforces",
    "excerpt": "Moving beyond single prompts into autonomous execution loops. The 2025 efficiency playbook.",
    "content": `
      <h2>The Paradigm Shift</h2>
      <p>In 2023, we learned to prompt. In 2025, we learn to <strong>delegate</strong>. The emergence of Gemini 3 and GPT-O1 has turned LLMs into planners, not just predictors.</p>
      <h3>Autonomous Execution Loops</h3>
      <p>An agentic workflow doesn't just write a draft; it researches, writes, checks for facts, creates images, and schedules the post. This is the "Zero-Touch" business model.</p>
      <ul>
        <li><strong>Reasoning:</strong> Chains of thought to solve complex logic.</li>
        <li><strong>Tool Use:</strong> Searching the web, writing code, and hitting APIs.</li>
        <li><strong>Memory:</strong> Remembering context across weeks of work.</li>
      </ul>
      <h2>Actionable Wealth Strategy</h2>
      <p>The biggest opportunity is "Process-as-a-Service". Find a manual corporate process and replace it with a specialized agent swarm.</p>
    `,
    "category": "AI",
    "tags": ["AI Agents", "Workforce", "Efficiency"],
    "date": "Dec 18, 2025",
    "readTime": "12 min",
    "image": AI_IMAGES[1]
  },
  {
    "id": "pillar-rwa-crypto",
    "slug": "rwa-tokenization-the-trillion-dollar-bridge",
    "title": "RWA Tokenization: The Trillion Dollar Bridge",
    "excerpt": "How real-world assets like treasury bills and real estate are moving on-chain.",
    "content": `
      <h2>Bringing Reality to the Chain</h2>
      <p>Real-World Asset (RWA) tokenization is the single biggest trend in institutional crypto for 2025. BlackRock's BUIDL fund was just the beginning.</p>
      <table>
        <thead><tr><th>Asset Class</th><th>Tokenization Benefit</th><th>Current Growth</th></tr></thead>
        <tbody>
          <tr><td>US Treasuries</td><td>24/7 Liquidity</td><td>Exponential</td></tr>
          <tr><td>Real Estate</td><td>Fractional Ownership</td><td>Steady</td></tr>
          <tr><td>Private Equity</td><td>Democratic Access</td><td>Emerging</td></tr>
        </tbody>
      </table>
    `,
    "category": "Crypto",
    "tags": ["RWA", "Institutional", "BlackRock", "Finance"],
    "date": "Dec 22, 2025",
    "readTime": "18 min",
    "image": CRYPTO_IMAGES[1]
  }
];

export const getArticles = (): Article[] => {
  if (typeof window === 'undefined') return INITIAL_ARTICLES;
  try {
    const saved = localStorage.getItem('openyourais_new_articles');
    if (saved) {
      const localArticles = JSON.parse(saved);
      // Mescla os salvos pelo usuário com os iniciais, removendo duplicatas por ID
      const all = [...localArticles, ...INITIAL_ARTICLES];
      const unique = all.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
      return unique;
    }
    return INITIAL_ARTICLES;
  } catch (e) { return INITIAL_ARTICLES; }
};

export const saveNewArticle = (article: Article): Article[] => {
  const existing = JSON.parse(localStorage.getItem('openyourais_new_articles') || '[]');
  const updated = [article, ...existing];
  localStorage.setItem('openyourais_new_articles', JSON.stringify(updated));
  return updated;
};

export const ARTICLES = getArticles();