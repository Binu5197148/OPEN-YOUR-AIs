
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ExternalLink, Clock, DollarSign, ChevronRight, TrendingUp, ShieldCheck, Zap, Award, Target, Info, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { Card, SectionTitle, AdUnit, SmartImage } from '../components/Components';
import { TOOLS, PLAYBOOKS, ALL_ARTICLES, CRYPTO_GUIDES } from '../constants';

// --- TOOLS PAGE ---
export const ToolsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "AI Intelligence Directory | Open Your AIs";
  }, []);

  const filteredTools = TOOLS.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Best AI Tools Directory 2026 | Open Your AIs</title>
        <meta name="description" content="Discover the best AI tools for 2026. Expert reviews of ChatGPT, Claude, Midjourney, Runway, and more. Find the perfect AI tool for your workflow." />
        <meta name="keywords" content="AI tools, artificial intelligence, ChatGPT, Claude AI, Midjourney, Runway, ElevenLabs, best AI software 2026" />
        <link rel="canonical" href="https://www.openyourais.com/tools" />
        <meta property="og:title" content="Best AI Tools Directory 2026 | Open Your AIs" />
        <meta property="og:description" content="Discover the best AI tools for 2026. Expert reviews and comparisons of cutting-edge AI software." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.openyourais.com/tools" />
        <meta name="twitter:title" content="Best AI Tools Directory 2026 | Open Your AIs" />
        <meta name="twitter:description" content="Discover the best AI tools for 2026. Expert reviews and comparisons." />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.openyourais.com/" }, { "@type": "ListItem", "position": 2, "name": "AI Tools", "item": "https://www.openyourais.com/tools" }] })}</script>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-cyber-primary" aria-current="page">AI Tools</li>
          </ol>
        </nav>
        <SectionTitle title="AI Intelligence Nodes" subtitle="An audited directory of frontier technologies for the high-frequency economy." />

        <div className="max-w-xl mx-auto mb-16 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Intelligence Nodes..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-cyber-primary transition-all uppercase font-black tracking-widest text-cyber-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map(tool => (
            <Card key={tool.id} className="flex flex-col border-white/5 hover:border-cyber-primary/30 group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1 group-hover:text-cyber-primary transition-colors">{tool.name}</h3>
                  <span className="text-[10px] font-black text-cyber-primary uppercase tracking-widest opacity-60">{tool.category}</span>
                </div>
                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${tool.priceModel === 'Free' ? 'border-green-500/30 text-green-400 bg-green-500/5' : tool.priceModel === 'Paid' ? 'border-red-500/30 text-red-400 bg-red-500/5' : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5'}`}>
                  {tool.priceModel}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-6 leading-relaxed font-light">{tool.shortDesc}</p>

              <div className={`overflow-hidden transition-all duration-500 ${expandedId === tool.id ? 'max-h-[1000px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl text-xs text-gray-300 leading-relaxed italic font-light">
                  {tool.fullDesc}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {tool.features.slice(0, 3).map((f, i) => (
                  <span key={i} className="text-[8px] font-black bg-white/5 px-2.5 py-1 rounded border border-white/5 text-gray-500 uppercase tracking-[0.15em]">{f}</span>
                ))}
              </div>

              <div className="mt-auto grid grid-cols-2 gap-4">
                <button
                  onClick={() => setExpandedId(expandedId === tool.id ? null : tool.id)}
                  className="flex items-center justify-center gap-2 py-3 border border-white/10 text-white font-black rounded-xl hover:bg-white/5 transition-all uppercase tracking-widest text-[9px]"
                >
                  {expandedId === tool.id ? <><ChevronUp className="w-3 h-3" /> Hide Intel</> : <><ChevronDown className="w-3 h-3" /> Tech Review</>}
                </button>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 text-white font-black rounded-xl hover:bg-cyber-primary hover:text-cyber-bg transition-all uppercase tracking-widest text-[9px]">
                  Deploy <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Card>
          ))}
        </div>
        <AdUnit slot="tools-bottom" />
      </div>
    </>
  );
};

// --- PLAYBOOKS PAGE ---
export const PlaybooksPage: React.FC = () => {
  useEffect(() => {
    document.title = "Monetization Playbooks | Open Your AIs";
  }, []);

  return (
    <>
      <Helmet>
        <title>Digital Monetization Playbooks 2026 | Open Your AIs</title>
        <meta name="description" content="Proven strategies to make money online with AI and automation. Step-by-step playbooks for digital entrepreneurs and content creators." />
        <meta name="keywords" content="make money online, digital monetization, passive income, AI business, online revenue, digital entrepreneurship" />
        <link rel="canonical" href="https://www.openyourais.com/playbooks" />
        <meta property="og:title" content="Digital Monetization Playbooks 2026 | Open Your AIs" />
        <meta property="og:description" content="Proven strategies to make money online with AI and automation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.openyourais.com/playbooks" />
        <meta name="twitter:title" content="Digital Monetization Playbooks 2026 | Open Your AIs" />
        <meta name="twitter:description" content="Proven strategies to make money online with AI and automation." />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.openyourais.com/" }, { "@type": "ListItem", "position": 2, "name": "Playbooks", "item": "https://www.openyourais.com/playbooks" }] })}</script>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-cyber-primary" aria-current="page">Playbooks</li>
          </ol>
        </nav>
        <SectionTitle title="Revenue Frameworks" subtitle="Battle-tested execution plans for the digital sovereignty age." />
        <div className="grid gap-12 max-w-5xl mx-auto">
          {PLAYBOOKS.map((pb, index) => (
            <Link to={`/playbooks/${pb.id}`} key={pb.id} className="group">
              <Card className="border-white/5 group-hover:border-cyber-secondary/40 transition-all p-0 overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-72 h-48 md:h-auto overflow-hidden bg-gray-900 border-r border-white/5 relative">
                  <SmartImage src={pb.image || ''} alt={pb.title} className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-[9px] font-black text-cyber-secondary uppercase tracking-[0.2em] italic">Playbook 0{index + 1}</div>
                </div>
                <div className="p-10 flex-grow flex flex-col">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-cyber-secondary transition-colors leading-none">{pb.title}</h3>
                    <div className={`text-[8px] font-black px-3 py-1 rounded-full border uppercase tracking-widest ${pb.difficulty === 'Easy' ? 'border-green-500/30 text-green-500' : pb.difficulty === 'Medium' ? 'border-yellow-500/30 text-yellow-500' : 'border-red-500/30 text-red-500'}`}>
                      {pb.difficulty} EXECUTION
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-8 font-light leading-relaxed max-w-2xl">{pb.tldr}</p>
                  <div className="flex flex-wrap gap-8 mt-auto pt-6 border-t border-white/5 items-center">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-cyber-secondary" />
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">{pb.roi}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{pb.timeline}</span>
                    </div>
                    <div className="ml-auto flex items-center gap-1 text-[10px] font-black text-cyber-secondary uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      Open Playbook <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <AdUnit slot="playbooks-bottom" className="mt-20" />
      </div>
    </>
  );
};

// --- CRYPTO PAGE ---
export const CryptoPage: React.FC = () => {
  useEffect(() => {
    document.title = "Crypto Protocol Hub | Open Your AIs";
  }, []);

  return (
    <>
      <Helmet>
        <title>Crypto Guide &amp; Blockchain Intelligence 2026 | Open Your AIs</title>
        <meta name="description" content="Expert cryptocurrency guides and blockchain analysis. Learn about DeFi, NFTs, and digital asset strategies for 2026." />
        <meta name="keywords" content="cryptocurrency, blockchain, DeFi, NFT, crypto trading, digital assets, Web3, crypto guide 2026" />
        <link rel="canonical" href="https://www.openyourais.com/crypto" />
        <meta property="og:title" content="Crypto Guide & Blockchain Intelligence 2026 | Open Your AIs" />
        <meta property="og:description" content="Expert cryptocurrency guides and blockchain analysis. Learn about DeFi, NFTs, and digital asset strategies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.openyourais.com/crypto" />
        <meta name="twitter:title" content="Crypto Guide & Blockchain Intelligence 2026 | Open Your AIs" />
        <meta name="twitter:description" content="Expert cryptocurrency guides and blockchain analysis." />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.openyourais.com/" }, { "@type": "ListItem", "position": 2, "name": "Crypto", "item": "https://www.openyourais.com/crypto" }] })}</script>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-cyber-primary" aria-current="page">Crypto</li>
          </ol>
        </nav>
        <SectionTitle title="The Crypto Vault" subtitle="Institutional-grade analysis for digital asset self-sovereignty." />

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {CRYPTO_GUIDES.map(guide => (
            <Link to={`/crypto/${guide.id}`} key={guide.id} className="group">
              <Card className="h-full border-white/5 group-hover:border-cyber-success/30 transition-all flex flex-col relative overflow-hidden bg-cyber-success/[0.01]">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <ShieldCheck className="w-16 h-16" />
                </div>
                <div className="text-[8px] font-black text-cyber-success uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> {guide.level} Intel Level
                </div>
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-cyber-success transition-colors leading-tight">{guide.title}</h3>
                <p className="text-gray-500 text-sm mb-8 font-light leading-relaxed flex-grow">{guide.summary}</p>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">
                  Decrypt Data <ChevronRight className="w-3 h-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="border-cyber-success/10 bg-cyber-success/[0.02] p-12 rounded-[40px]">
            <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-widest flex items-center gap-3">
              <TrendingUp className="text-cyber-success w-6 h-6" /> Sentiment Engine
            </h3>
            <div className="space-y-8">
              <div className="flex justify-between items-end border-b border-white/5 pb-6">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em]">Current Market State</span>
                  <span className="text-gray-200 font-bold">Fear & Greed Index</span>
                </div>
                <span className="text-4xl font-black text-cyber-success">74 / 100</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-6">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em]">Trend Analysis</span>
                  <span className="text-gray-200 font-bold">Alpha Stream Sentiment</span>
                </div>
                <span className="text-xl font-black text-white uppercase italic">Extreme Bullish</span>
              </div>
            </div>
          </Card>
          <Card className="border-cyber-primary/10 bg-cyber-primary/[0.02] p-12 rounded-[40px]">
            <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-widest flex items-center gap-3">
              <Award className="text-cyber-primary w-6 h-6" /> Security Advisory
            </h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-8 italic">Our automated safety protocols have scanned 45+ smart contracts today. Zero high-criticality vulnerabilities found in listed vault protocols. Asset custody is currently optimal.</p>
            <div className="flex gap-4">
              <div className="px-6 py-3 bg-black/40 rounded-xl text-[9px] font-black text-cyber-primary uppercase tracking-widest border border-cyber-primary/20 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Verified Protocol Layer
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

// --- BLOG PAGE ---
export const BlogPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'AI' | 'Crypto' | 'Monetization'>('All');

  useEffect(() => {
    document.title = "Neural Intel Feed | Open Your AIs";
  }, []);

  const savedArticles = JSON.parse(localStorage.getItem('openyourais_new_articles') || '[]');
  const allArticles = [...savedArticles, ...ALL_ARTICLES];

  const filteredArticles = filter === 'All'
    ? allArticles
    : allArticles.filter(a => a.category === filter);

  return (
    <>
      <Helmet>
        <title>AI &amp; Tech Blog | Latest Intelligence 2026 | Open Your AIs</title>
        <meta name="description" content="Latest AI news, cryptocurrency updates, and digital monetization strategies. Expert analysis and guides for the future of technology." />
        <meta name="keywords" content="AI blog, tech news, artificial intelligence, cryptocurrency news, tech guides, digital trends 2026" />
        <link rel="canonical" href="https://www.openyourais.com/blog" />
        <meta property="og:title" content="AI & Tech Blog | Latest Intelligence 2026 | Open Your AIs" />
        <meta property="og:description" content="Latest AI news, cryptocurrency updates, and digital monetization strategies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.openyourais.com/blog" />
        <meta name="twitter:title" content="AI & Tech Blog | Latest Intelligence 2026 | Open Your AIs" />
        <meta name="twitter:description" content="Latest AI news, cryptocurrency updates, and digital monetization strategies." />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.openyourais.com/" }, { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.openyourais.com/blog" }] })}</script>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-cyber-primary" aria-current="page">Blog</li>
          </ol>
        </nav>
        <SectionTitle title="Neural Feed" subtitle="High-frequency intelligence stream and archival reporting." />

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 md:mb-20">
          {['All', 'AI', 'Crypto', 'Monetization'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-4 md:px-10 py-2 md:py-3 rounded-full border transition-all text-[8px] md:text-[9px] font-black tracking-wider md:tracking-[0.2em] uppercase ${filter === cat ? 'bg-cyber-primary text-cyber-bg border-cyber-primary shadow-[0_0_25px_rgba(0,229,255,0.3)]' : 'bg-transparent border-white/10 text-gray-500 hover:text-white hover:border-white/30'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {filteredArticles.map((article, index) => (
            <React.Fragment key={article.id}>
              <Link to={`/blog/${article.slug}`} className="group">
                <Card className="h-full flex flex-col p-0 rounded-2xl md:rounded-[40px] overflow-hidden border-white/5 group-hover:border-cyber-primary/20 transition-all bg-white/[0.01]">
                  <div className="aspect-video w-full overflow-hidden relative border-b border-white/5 bg-gray-900">
                    <SmartImage src={article.image || article.imageUrl} alt={article.title} className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000" />
                    <div className="absolute top-3 left-3 md:top-6 md:left-6 bg-cyber-bg/90 backdrop-blur px-2 md:px-4 py-1 md:py-1.5 text-[7px] md:text-[8px] font-black uppercase rounded-sm border border-white/10 text-cyber-primary tracking-wider md:tracking-[0.2em] italic">{article.category}</div>
                  </div>
                  <div className="p-4 md:p-10 flex flex-col flex-grow">
                    <h3 className="text-base md:text-2xl font-black text-white mb-3 md:mb-6 line-clamp-2 uppercase tracking-tight group-hover:text-cyber-primary transition-colors leading-tight">{article.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-10 line-clamp-2 font-light leading-relaxed flex-grow">{article.excerpt}</p>
                    <div className="flex justify-between items-center text-[8px] md:text-[9px] font-black text-gray-700 mt-auto pt-4 md:pt-8 border-t border-white/5 uppercase tracking-wider md:tracking-[0.3em]">
                      <span>{article.date}</span>
                      <span className="text-cyber-primary">Read →</span>
                    </div>
                  </div>
                </Card>
              </Link>
              {(index + 1) % 6 === 0 && <div className="md:col-span-2 lg:col-span-3"><AdUnit slot="in-feed" /></div>}
            </React.Fragment>
          ))}
        </div>
        <AdUnit slot="blog-footer" className="mt-24" />
      </div>
    </>
  );
};
