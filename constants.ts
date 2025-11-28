import { Article, Tool, Playbook, CryptoGuide } from './types';

export const ADSENSE_PUB_ID = "ca-pub-4722208859927111";
export const CONTACT_EMAIL = "openyourais888@gmail.com";

// --- RELIABLE IMAGE COLLECTIONS (Manually Verified) ---
const AI_IMAGES = [
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80", // Cyber Face
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80", // Cyborg
  "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80", // AI Chip
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", // Cyber City
  "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=800&q=80", // Neon Text
  "https://images.unsplash.com/photo-1676299081847-824d16b91d6c?auto=format&fit=crop&w=800&q=80", // Robot Hand
  "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=800&q=80", // Data Abstract
  "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=800&q=80", // Robot Reading
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", // Matrix Code
  "https://images.unsplash.com/photo-1589254065878-a0598c93eb58?auto=format&fit=crop&w=800&q=80"  // Robot White
];

const CRYPTO_IMAGES = [
  "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80", // Bitcoin
  "https://images.unsplash.com/photo-1621416894512-5363b933b243?auto=format&fit=crop&w=800&q=80", // Ethereum
  "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80", // Chart
  "https://images.unsplash.com/photo-1622630998477-20aa696fab05?auto=format&fit=crop&w=800&q=80", // Graph
  "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=800&q=80", // Hardware Wallet
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80", // Blockchain
  "https://images.unsplash.com/photo-1516245834210-c4c14278733f?auto=format&fit=crop&w=800&q=80", // Mining
  "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=800&q=80", // ETH Coin
  "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&w=800&q=80", // Tokens
  "https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&w=800&q=80"  // Coins
];

const MONEY_IMAGES = [
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80", // Money Plant
  "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80", // Cash
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", // Analytics
  "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=800&q=80", // Trading Screen
  "https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&w=800&q=80", // Digital Nomad
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80", // Dashboard
  "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80", // Stock
  "https://images.unsplash.com/photo-1565514020176-dbf2277e38a2?auto=format&fit=crop&w=800&q=80", // Pie Chart
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80", // Chart Paper
  "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80"  // Payment
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

// --- CONTENT GENERATORS ---
const generatePlaybookContent = (title: string, steps: string[], roi: string, timeline: string) => `
  <p class="lead">Unlock the potential of <strong>${title}</strong>. This playbook provides a structured, step-by-step approach to monetizing this strategy, offering a projected ROI of ${roi} within a ${timeline} timeline.</p>

  <h2>Executive Summary</h2>
  <p>In the rapidly evolving digital landscape, speed of execution is everything. This playbook is designed for entrepreneurs who want to leverage AI and modern tech stacks to bypass traditional hurdles. By following this guide, you will set up a scalable system that works for you 24/7.</p>

  <h2>Prerequisites</h2>
  <ul>
    <li>Basic understanding of digital tools.</li>
    <li>Willingness to iterate based on feedback.</li>
    <li>Consistency in execution.</li>
  </ul>

  <h2>Step-by-Step Execution Plan</h2>
  <div class="steps-container">
    ${steps.map((step, i) => `
      <div class="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
        <h3 class="text-xl font-bold text-cyber-primary mb-2">Phase ${i + 1}: ${step}</h3>
        <p>This phase is critical. Focus on quality and speed. Utilizing AI tools here can reduce the workload by up to 80%. Ensure you validate your output before moving to the next phase.</p>
      </div>
    `).join('')}
  </div>

  <h2>Tools & Tech Stack</h2>
  <p>To execute this playbook efficiently, we recommend the following stack:</p>
  <ul>
    <li><strong>ChatGPT / Claude:</strong> For strategy, copy, and coding assistance.</li>
    <li><strong>Midjourney:</strong> For all visual assets and branding.</li>
    <li><strong>Automation Tools (Zapier/Make):</strong> To connect your workflows.</li>
  </ul>

  <h2>Risk Mitigation</h2>
  <p>Every business venture carries risk. Common pitfalls in this specific model include market saturation and platform policy changes. Diversify your traffic sources to mitigate platform risk.</p>

  <h2>Conclusion</h2>
  <p>The path to ${roi} starts with the first step. This playbook gives you the map; now you must walk the path. Start today.</p>
`;

export const TOOLS: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    category: 'LLM / Chat',
    shortDesc: 'The industry standard for conversational AI and content generation.',
    fullDesc: 'ChatGPT by OpenAI is a versatile language model capable of drafting emails, writing code, creating content, and solving complex problems. It features multimodal capabilities including vision and voice.',
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
    fullDesc: 'Claude 3.5 Sonnet and Opus are top-tier models from Anthropic. They excel at coding, creative writing, and processing large documents due to their 200k+ token context window.',
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
    fullDesc: 'Midjourney operates via Discord (and now web) to generate stunning, photorealistic, or artistic images from text prompts. It is the gold standard for AI art.',
    priceModel: 'Paid',
    url: 'https://midjourney.com',
    features: ['Photorealism', 'Style Reference', 'Character Consistency', 'In-painting', 'Zoom Out'],
    useCases: ['Web design assets', 'Marketing visuals', 'Concept art', 'Social media content', 'Book covers']
  },
  {
    id: '4',
    name: 'Runway ML',
    category: 'Video Generation',
    shortDesc: 'Professional grade AI video generation and editing tools.',
    fullDesc: 'Runway provides Gen-3 Alpha, a powerful text-to-video model. It also offers a suite of video editing tools like background removal and motion tracking.',
    priceModel: 'Freemium',
    url: 'https://runwayml.com',
    features: ['Gen-3 Video Generation', 'Motion Brush', 'Green Screen', 'In-painting', 'Custom Model Training'],
    useCases: ['Film production', 'Ad creation', 'Music videos', 'Social shorts', 'VFX workflows']
  },
  {
    id: '5',
    name: 'ElevenLabs',
    category: 'Audio / Voice',
    shortDesc: 'Hyper-realistic AI voice synthesis and cloning.',
    fullDesc: 'ElevenLabs offers the most realistic text-to-speech and voice cloning technology, supporting multiple languages and emotional intonation.',
    priceModel: 'Freemium',
    url: 'https://elevenlabs.io',
    features: ['Voice Cloning', 'Dubbing Studio', 'Sound Effects Gen', 'Long-form Speech', '29 Languages'],
    useCases: ['Audiobooks', 'Video narration', 'Game characters', 'Accessibility', 'Podcast intros']
  },
  {
    id: '6',
    name: 'Perplexity AI',
    category: 'Search / Research',
    shortDesc: 'AI-powered search engine that provides cited answers.',
    fullDesc: 'Perplexity replaces traditional search by giving concise answers with citations to sources. It uses various models like GPT-4 and Claude to synthesize information.',
    priceModel: 'Freemium',
    url: 'https://perplexity.ai',
    features: ['Real-time Web Search', 'Source Citations', 'Pro Search (Deep Research)', 'File Uploads', 'Collection Organization'],
    useCases: ['Academic research', 'Market analysis', 'Fact checking', 'News summary', 'Topic exploration']
  },
  {
    id: '7',
    name: 'Notion AI',
    category: 'Productivity',
    shortDesc: 'Integrated AI assistant within your Notion workspace.',
    fullDesc: 'Notion AI allows you to summarize notes, generate action items, and write drafts directly inside your documents and databases.',
    priceModel: 'Paid',
    url: 'https://notion.so',
    features: ['Q&A across workspace', 'Text generation', 'Translation', 'Tone adjustment', 'Table filling'],
    useCases: ['Meeting summaries', 'Project management', 'Wiki organization', 'Content drafting', 'Brainstorming']
  },
  {
    id: '8',
    name: 'Jasper AI',
    category: 'Marketing / Copy',
    shortDesc: 'AI copywriter built specifically for enterprise marketing teams.',
    fullDesc: 'Jasper is designed to maintain brand voice and create high-converting marketing copy across blogs, emails, and ads.',
    priceModel: 'Paid',
    url: 'https://jasper.ai',
    features: ['Brand Voice Memory', 'Marketing Templates', 'SEO Mode', 'Art Generation', 'Campaign workflows'],
    useCases: ['Ad copy', 'SEO blog posts', 'Email sequences', 'Landing pages', 'Social captions']
  },
  {
    id: '9',
    name: 'Synthesia',
    category: 'Video / Avatars',
    shortDesc: 'Create AI videos with digital avatars from text.',
    fullDesc: 'Synthesia allows you to create professional videos using AI avatars that speak your text in 120+ languages. No cameras needed.',
    priceModel: 'Paid',
    url: 'https://synthesia.io',
    features: ['140+ AI Avatars', '120+ Languages', 'Screen Recorder', 'Custom Avatars', 'Video Templates'],
    useCases: ['Training videos', 'Customer support', 'Sales outreach', 'Marketing explainers', 'Internal comms']
  },
  {
    id: '10',
    name: 'Descript',
    category: 'Audio / Video Edit',
    shortDesc: 'Edit video and audio by editing text.',
    fullDesc: 'Descript transcribes your media and allows you to edit it like a doc. Delete text to delete the clip. Includes Studio Sound AI for audio enhancement.',
    priceModel: 'Freemium',
    url: 'https://descript.com',
    features: ['Text-based Editing', 'Overdub (Voice Clone)', 'Studio Sound', 'Green Screen', 'Filler Word Removal'],
    useCases: ['Podcasting', 'Video essays', 'Social clips', 'Transcription', 'Audio cleaning']
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
    steps: ['Niche Selection (High CPM)', 'Script with Claude/ChatGPT', 'Voiceover with ElevenLabs', 'Visuals with Midjourney/Stock', 'Editing with CapCut/Premiere', 'Thumbnail Design', 'SEO Optimization']
  },
  {
    id: 'p2',
    title: 'AI Copywriting Service for E-commerce',
    tldr: 'Offer product description and ad copy services to Shopify owners using Jasper/Copy.ai.',
    roi: 'Immediate cash flow',
    timeline: '1-2 Weeks',
    difficulty: 'Easy',
    steps: ['Prospecting on LinkedIn/Instagram', 'Offer Free Sample Audit', 'Use Jasper for Bulk Descriptions', 'Refine with Human Touch', 'Deliver and Retain']
  },
  {
    id: 'p3',
    title: 'Process Automation Consulting',
    tldr: 'Help small businesses save time by connecting apps with Zapier + OpenAI API.',
    roi: 'High Ticket ($1k-$5k per setup)',
    timeline: '1 Month to learn',
    difficulty: 'Hard',
    steps: ['Learn Zapier/Make.com', 'Learn OpenAI API basics', 'Identify bottlenecks in businesses', 'Build demo automations', 'Pitch efficiency savings']
  },
  {
    id: 'p4',
    title: 'Scalable Design Agency',
    tldr: 'Sell logo packs and branding kits using Midjourney + Vectorizers.',
    roi: 'High volume, low margin',
    timeline: '1 Month',
    difficulty: 'Medium',
    steps: ['Master Midjourney Prompting', 'Use Vectorizer.ai', 'Create Gig on Fiverr/Upwork', 'Build Portfolio', 'Upsell Brand Guidelines']
  },
  {
    id: 'p5',
    title: 'AI Audiobook Production',
    tldr: 'Convert public domain or indie books into audiobooks using Neural Voice.',
    roi: 'Passive Royalties',
    timeline: '2-3 Months',
    difficulty: 'Medium',
    steps: ['Find Rights/Public Domain', 'Edit Text for Audio', 'Generate Audio (ElevenLabs)', 'Mastering/Editing', 'Distribute via ACX/Findaway']
  }
] as Playbook[]).map((pb, index) => ({
  ...pb,
  image: getRandomImage('Money', index),
  content: generatePlaybookContent(pb.title, pb.steps, pb.roi, pb.timeline)
}));

export const CRYPTO_GUIDES: CryptoGuide[] = [
  {
    id: 'cg1',
    title: 'Bitcoin for Beginners',
    level: 'Beginner',
    summary: 'The absolute basics of the world\'s first cryptocurrency.',
    content: 'Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries. Transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain. Bitcoin was invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.'
  },
  {
    id: 'cg2',
    title: 'DeFi Explained',
    level: 'Intermediate',
    summary: 'Understanding decentralized finance protocols.',
    content: 'DeFi uses emerging technology to remove third parties in financial transactions. The components of DeFi are stablecoins, software, and hardware that enables the development of applications. Unlike traditional finance, DeFi is open, permissionless, and transparent.'
  },
  {
    id: 'cg3',
    title: 'Safe Investing',
    level: 'Beginner',
    summary: 'Security practices for holding assets.',
    content: 'Not your keys, not your coins. Learn about cold storage, hardware wallets, and seed phrase security. Never share your 12 or 24-word recovery phrase with anyone, not even support staff.'
  }
];

const generateAIContent = (title: string) => `
  <p class="lead">Artificial Intelligence is no longer just a buzzword; it is a fundamental shift in how we work, create, and interact with the digital world. In this comprehensive guide, we explore <strong>${title}</strong> and what it means for the future of technology.</p>
  <h2>The Evolution of AI</h2>
  <p>To understand the significance of ${title}, we must first look at the trajectory of AI development. From simple rule-based systems to the complex Neural Networks and Large Language Models (LLMs) we see today, the pace of innovation has been exponential.</p>
  <p>Tools like ChatGPT, Claude, and Midjourney have democratized access to capabilities that were previously reserved for tech giants. This democratization is the core of what we call the "AI Revolution."</p>
  <h2>Key Benefits and Applications</h2>
  <p>Efficiency at scale, data-driven decisions, and creative expansion are just the tip of the iceberg.</p>
  <h2>Deep Dive: ${title}</h2>
  <p>When specificially looking at ${title}, we notice several critical trends. First, the barrier to entry has lowered. You no longer need a PhD in Computer Science to leverage these tools. Second, the integration into daily workflows is becoming seamless.</p>
  <p>However, with great power comes great responsibility. Ethical considerations regarding data privacy, bias, and job displacement are central to the conversation surrounding ${title}.</p>
  <h2>Practical Implementation Steps</h2>
  <ol>
    <li><strong>Audit Your Needs:</strong> Don't just use AI for the sake of it. Identify bottlenecks in your current workflow.</li>
    <li><strong>Select the Right Tool:</strong> As discussed, different models excel at different tasks. Use Claude for reading, ChatGPT for reasoning, and Midjourney for visuals.</li>
    <li><strong>Iterate and Refine:</strong> AI output is rarely perfect on the first try. Prompt engineering is a skill that must be practiced.</li>
  </ol>
  <h2>The Future Outlook</h2>
  <p>Experts predict that ${title} will continue to evolve. We are moving towards "Agentic AI" – systems that can not only generate text or images but actually execute complex chains of actions on your behalf.</p>
  <div class="bg-blue-900/30 border-l-4 border-cyber-primary p-4 my-6">
    <strong>Pro Tip:</strong> Stay updated. The AI landscape changes weekly. Subscribe to our newsletter to keep up with the latest developments in ${title}.
  </div>
  <h2>Conclusion</h2>
  <p>Embracing ${title} is not just about staying relevant; it's about unlocking new potential. The tools are here, and they are powerful. The only limit is your imagination and willingness to learn.</p>
`;

const generateCryptoContent = (title: string) => `
  <p class="lead">The world of cryptocurrency can be volatile and confusing, but it also presents unprecedented opportunities for financial sovereignty. This article breaks down <strong>${title}</strong> to help you navigate the blockchain ecosystem safely.</p>
  <h2>Understanding the Fundamentals</h2>
  <p>Before diving deep into ${title}, it is crucial to grasp the underlying technology: Blockchain. A blockchain is a distributed ledger that records transactions across many computers so that the record cannot be altered retroactively without the alteration of all subsequent blocks and the consensus of the network.</p>
  <h2>Why ${title} Matters</h2>
  <p>Decentralization is the key theme here. Traditional finance (TradFi) relies on intermediaries like banks and governments. Crypto aims to remove these middlemen, reducing fees and increasing speed.</p>
  <p>In the context of ${title}, this means you have total control over your assets. However, this also means you have total responsibility for their security.</p>
  <h2>Risks and Security Measures</h2>
  <p>The phrase "Not your keys, not your coins" is the mantra of the industry. If you leave your assets on an exchange, you do not truly own them.</p>
  <ul>
    <li><strong>Volatility:</strong> Crypto markets move fast. 20% swings in a single day are common.</li>
    <li><strong>Security:</strong> Always use Two-Factor Authentication (2FA) and consider a hardware wallet for long-term storage.</li>
    <li><strong>Scams:</strong> Be wary of phishing links and "guaranteed returns."</li>
  </ul>
  <h2>Strategic Approach to ${title}</h2>
  <p>Successful navigation of ${title} requires patience and research. Do not succumb to FOMO (Fear Of Missing Out). Dollar Cost Averaging (DCA) is often recommended as a safer strategy than trying to time the market.</p>
  <div class="bg-red-900/20 border border-red-500 p-4 rounded my-6 text-sm">
    <strong>Disclaimer:</strong> This content is for educational purposes only. Cryptocurrency investments carry high risk. Never invest money you cannot afford to lose. We are not financial advisors.
  </div>
  <h2>Conclusion</h2>
  <p>${title} represents a shift in how we perceive value and trust. Whether you are a maximalist or a skeptic, understanding these mechanics is essential for the modern economy.</p>
`;

const generateMoneyContent = (title: string) => `
  <p class="lead">In the digital age, creating multiple streams of income has never been more accessible. This guide focuses on <strong>${title}</strong> and how you can leverage modern tools to build sustainable revenue.</p>
  <h2>The New Economy</h2>
  <p>The internet has dissolved geographical barriers. You can now serve clients or sell products to anyone, anywhere, 24/7. ${title} fits perfectly into this paradigm of scalable digital entrepreneurship.</p>
  <h2>Strategy Breakdown</h2>
  <p>To succeed with ${title}, you need three things: an Offer, Traffic, and a Conversion mechanism.</p>
  <ul>
    <li><strong>The Offer:</strong> What value are you providing? Is it entertainment, education, or a service?</li>
    <li><strong>Traffic:</strong> How do people find you? SEO, Social Media, or Paid Ads?</li>
    <li><strong>Conversion:</strong> How do you turn a visitor into a customer?</li>
  </ul>
  <h2>Leveraging AI for ${title}</h2>
  <p>This is where "Open Your AIs" comes in. You can drastically reduce the time required to execute ${title} by using AI tools.</p>
  <p>For example, use ChatGPT to draft your copy, Midjourney to create your branding assets, and automation tools to handle customer service. What used to take a team of five can now be done by one person with the right tech stack.</p>
  <h2>Step-by-Step Execution</h2>
  <ol>
    <li><strong>Research:</strong> Validate that there is market demand for ${title}.</li>
    <li><strong>Build MVP:</strong> Launch a Minimum Viable Product fast. Don't wait for perfection.</li>
    <li><strong>Feedback Loop:</strong> Listen to your audience and iterate.</li>
  </ol>
  <h2>Scaling Up</h2>
  <p>Once you have validated ${title}, the next step is scale. This involves building systems and perhaps hiring help to manage the growing volume.</p>
  <h2>Conclusion</h2>
  <p>${title} is a viable path to financial independence, but it requires work. There is no "get rich quick" button, but there are "get rich smarter" tools. Start today.</p>
`;

const INITIAL_ARTICLES: Article[] = [];
  
const aiTitles = [
  'How AI Can Monetize Your Site Today',
  '10 Essential AI Tools for Content Creators',
  'ChatGPT vs Claude: Which LLM Should You Choose?',
  'Marketing Automation: The AI Revolution',
  'Boosting Workplace Productivity with AI',
  'Video Creation 2.0: Runway & Synthesia',
  'The Ethics of Voice Cloning with ElevenLabs',
  'Data Analysis Made Easy with AI Tools',
  'Midjourney: A Complete Beginner Guide',
  'The Future of Work in an AI-First World'
];

aiTitles.forEach((title, i) => {
  INITIAL_ARTICLES.push({
    id: `ai-${i}`,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title,
    excerpt: `Discover deep insights about ${title} and how it impacts the current landscape of artificial intelligence technology.`,
    content: generateAIContent(title),
    category: 'AI',
    tags: ['AI', 'Tech', 'Guide', 'Future'],
    date: getRecentDate(30),
    readTime: '8 min',
    image: getRandomImage('AI', i)
  });
});

const cryptoTitles = [
  'Introduction to Blockchain for Beginners',
  'How to Invest in Bitcoin Safely',
  'DeFi Explained Simply: Finance Without Banks',
  'NFTs: Opportunities, Risks, and Reality',
  'Crypto Trading: Basic Strategies 101',
  'Staking Guide: Earn Passive Income with Crypto',
  'Wallets: Protecting Your Digital Assets',
  'Ethereum 2.0 and the Future of Altcoins',
  'Crypto Taxes in Brazil: What You Need to Know',
  'Common Crypto Scams and How to Avoid Them'
];

cryptoTitles.forEach((title, i) => {
  INITIAL_ARTICLES.push({
    id: `crypto-${i}`,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title,
    excerpt: `Learn the fundamentals of ${title}. Essential knowledge for navigating the cryptocurrency market safely.`,
    content: generateCryptoContent(title),
    category: 'Crypto',
    tags: ['Blockchain', 'Finance', 'Security', 'Web3'],
    date: getRecentDate(30),
    readTime: '10 min',
    image: getRandomImage('Crypto', i)
  });
});

const moneyTitles = [
  '5 Ways to Monetize a Blog in 2024',
  'Affiliate Marketing: A Beginner Guide',
  'Creating Info-Products with AI Assistance',
  'YouTube Monetization via AdSense Explained',
  'Freelancing in the Age of AI Tools',
  'Automated Dropshipping Strategies',
  'Online Consulting: How to Start',
  'E-commerce Optimization with AI',
  'Building Passive Income with Digital Assets'
];

moneyTitles.forEach((title, i) => {
  INITIAL_ARTICLES.push({
    id: `money-${i}`,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title,
    excerpt: `Unlock financial potential with our guide on ${title}. Practical steps to increase your revenue streams.`,
    content: generateMoneyContent(title),
    category: 'Monetization',
    tags: ['Business', 'Money', 'Growth', 'Entrepreneurship'],
    date: getRecentDate(30),
    readTime: '7 min',
    image: getRandomImage('Money', i)
  });
});

export const getArticles = (): Article[] => {
  if (typeof window === 'undefined') return INITIAL_ARTICLES;
  
  const savedArticlesStr = localStorage.getItem('openyourais_new_articles');
  if (savedArticlesStr) {
    const savedArticles = JSON.parse(savedArticlesStr);
    return [...savedArticles, ...INITIAL_ARTICLES];
  }
  return INITIAL_ARTICLES;
};

export const saveNewArticle = (article: Article) => {
  const existingSavedStr = localStorage.getItem('openyourais_new_articles');
  let existingSaved: Article[] = existingSavedStr ? JSON.parse(existingSavedStr) : [];
  
  existingSaved = [article, ...existingSaved];
  localStorage.setItem('openyourais_new_articles', JSON.stringify(existingSaved));
  window.location.reload();
};

export const ARTICLES = getArticles();