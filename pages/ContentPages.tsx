
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Clock, DollarSign, ChevronRight, TrendingUp, ShieldCheck, AlertCircle, BarChart3, Zap } from 'lucide-react';
import { Card, SectionTitle, AdUnit, SmartImage } from '../components/Components';
import { TOOLS, PLAYBOOKS, ARTICLES, CRYPTO_GUIDES } from '../constants';
import { Article } from '../types';

// --- HELPERS ---
const getGuideImage = (id: string) => {
  switch(id) {
    case 'cg1': return "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=600&q=80"; // Bitcoin
    case 'cg2': return "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80"; // DeFi
    case 'cg3': return "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80"; // Security
    default: return "https://images.unsplash.com/photo-1621416894512-5363b933b243?auto=format&fit=crop&w=600&q=80";
  }
};

// --- TOOLS PAGE ---
export const ToolsPage: React.FC = () => {
  useEffect(() => {
    document.title = "AI Tools Directory | Open Your AIs";
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle title="AI Tools Directory" subtitle="The best AI software curated for professionals." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map(tool => (
          <Card key={tool.id} className="flex flex-col">
            <div className="h-32 mb-4 rounded overflow-hidden relative border-b border-white/5">
                <SmartImage src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80" alt={tool.name} className="w-full h-full object-cover opacity-60" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{tool.name}</h3>
              <span className={`text-xs px-2 py-1 rounded ${tool.priceModel === 'Free' ? 'bg-green-500/20 text-green-400' : tool.priceModel === 'Paid' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {tool.priceModel}
              </span>
            </div>
            <div className="text-sm text-cyber-primary mb-2">{tool.category}</div>
            <p className="text-gray-400 text-sm mb-4 flex-grow">{tool.shortDesc}</p>
            <div className="space-y-2 mb-6">
               <h4 className="text-xs font-semibold uppercase text-gray-500">Key Features:</h4>
               <div className="flex flex-wrap gap-2">
                 {tool.features.slice(0, 3).map((f, i) => (
                   <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">{f}</span>
                 ))}
               </div>
            </div>
            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="mt-auto w-full flex items-center justify-center gap-2 py-2 border border-cyber-primary/50 text-cyber-primary rounded hover:bg-cyber-primary hover:text-cyber-bg transition-colors">
              Visit Website <ExternalLink className="w-4 h-4" />
            </a>
          </Card>
        ))}
      </div>
      <AdUnit slot="tools-bottom" />
    </div>
  );
};

// --- PLAYBOOKS PAGE ---
export const PlaybooksPage: React.FC = () => {
  useEffect(() => {
    document.title = "Monetization Playbooks | Open Your AIs";
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle title="Monetization Playbooks" subtitle="Actionable guides to generating revenue with AI." />
      <div className="space-y-6">
        {PLAYBOOKS.map((pb, index) => (
          <React.Fragment key={pb.id}>
          {index === 2 && <AdUnit slot="playbooks-interstitial" />}
          <Card className="border-l-4 border-l-cyber-secondary">
            <div className="md:flex justify-between items-start">
              <div className="mb-4 md:mb-0 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">{pb.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded border ${pb.difficulty === 'Easy' ? 'border-green-500 text-green-500' : pb.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-500' : 'border-red-500 text-red-500'}`}>
                    {pb.difficulty}
                  </span>
                </div>
                <div className="flex gap-4 mb-4">
                    <div className="w-full md:w-32 h-20 rounded overflow-hidden flex-shrink-0">
                         <SmartImage src={pb.image || ''} alt={pb.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                        <p className="text-gray-300 mb-4 max-w-2xl">{pb.tldr}</p>
                         <div className="flex gap-6 text-sm">
                          <div className="flex items-center gap-2 text-cyber-secondary">
                            <DollarSign className="w-4 h-4" /> ROI: {pb.roi}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4" /> Timeline: {pb.timeline}
                          </div>
                        </div>
                    </div>
                </div>
              </div>
              <Link to={`/playbooks/${pb.id}`} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors whitespace-nowrap inline-block text-center text-white mt-4 md:mt-0">
                Read Guide
              </Link>
            </div>
            
            {/* Steps Preview */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Preview Steps</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
                {pb.steps.slice(0, 3).map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
                <li className="list-none text-cyber-secondary italic pt-1">...Unlock full playbook to see all steps</li>
              </ol>
            </div>
          </Card>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// --- CRYPTO HUB COMPONENTS ---
const MarketTicker = () => {
  const assets = [
    { name: 'BTC', price: '$96,432', change: '+2.4%' },
    { name: 'ETH', price: '$2,845', change: '-0.8%' },
    { name: 'SOL', price: '$184.20', change: '+5.1%' },
    { name: 'BNB', price: '$612', change: '+1.2%' }
  ];

  return (
    <div className="w-full bg-cyber-bg border-y border-cyber-success/20 overflow-hidden mb-12 py-3">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...assets, ...assets].map((asset, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="font-bold text-white">{asset.name}</span>
            <span className="text-cyber-success/80 font-mono">{asset.price}</span>
            <span className={`text-xs ${asset.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {asset.change}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

// --- CRYPTO PAGE ---
export const CryptoPage: React.FC = () => {
  useEffect(() => {
    document.title = "Crypto Intelligence Hub | Open Your AIs";
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle title="Crypto Intelligence" subtitle="Safe protocols and strategic insights for the digital asset era." />
      
      <MarketTicker />

      {/* Featured Educational Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {CRYPTO_GUIDES.map(guide => (
          <Card key={guide.id} className="border-t-4 border-t-cyber-success flex flex-col group">
             <div className="h-40 mb-4 rounded overflow-hidden -mx-6 -mt-6 mb-4 relative">
                <SmartImage src={getGuideImage(guide.id)} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-cyber-success text-black text-[10px] font-black px-2 py-0.5 uppercase tracking-widest rounded-sm">{guide.level}</div>
             </div>
             <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-success transition-colors">{guide.title}</h3>
             <p className="text-gray-400 text-sm mb-4 flex-grow leading-relaxed">{guide.summary}</p>
             <Link to={`/crypto/${guide.id}`} className="text-cyber-success hover:text-white flex items-center gap-1 text-xs font-bold uppercase tracking-wider mt-auto">
               Access Intelligence <ChevronRight className="w-4 h-4" />
             </Link>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
        <div>
           <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-cyber-success w-6 h-6" />
              <h3 className="text-2xl font-bold text-white">Sentiment & Trends</h3>
           </div>
           <Card className="bg-black/40 border-cyber-success/10 relative overflow-hidden">
              <div className="text-center py-6">
                 <p className="text-gray-500 text-sm mb-4 uppercase tracking-tighter">Fear & Greed Index</p>
                 <div className="relative w-48 h-24 mx-auto overflow-hidden">
                    {/* Semicircle Gauge */}
                    <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-gray-800"></div>
                    <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-l-orange-500 border-t-yellow-500 border-r-cyber-success rotate-[45deg]"></div>
                    <div className="absolute top-0 left-1/2 w-1 h-24 bg-white origin-bottom -translate-x-1/2 rotate-[35deg] shadow-[0_0_10px_white]"></div>
                 </div>
                 <div className="mt-4">
                    <span className="text-4xl font-black text-white">72</span>
                    <p className="text-cyber-success font-bold text-xs uppercase">Greed</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                 <div className="text-center">
                    <p className="text-[10px] text-gray-500 uppercase">24h Volatility</p>
                    <p className="text-sm font-bold text-white">Low</p>
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] text-gray-500 uppercase">Trend Strength</p>
                    <p className="text-sm font-bold text-cyber-success">Strong Buy</p>
                 </div>
              </div>
           </Card>
        </div>
        <div>
           <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="text-cyber-success w-6 h-6" />
              <h3 className="text-2xl font-bold text-white">Ironclad Security</h3>
           </div>
           <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-cyber-success/30 transition-all flex gap-4">
                 <div className="w-10 h-10 bg-cyber-success/20 rounded flex items-center justify-center flex-shrink-0">
                    <Zap className="text-cyber-success w-5 h-5" />
                 </div>
                 <div>
                    <h4 className="font-bold text-white text-sm">Self-Custody Priority</h4>
                    <p className="text-xs text-gray-400">If you don't hold your private keys, you don't own your assets. Learn cold storage.</p>
                 </div>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-red-500/30 transition-all flex gap-4">
                 <div className="w-10 h-10 bg-red-500/20 rounded flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="text-red-500 w-5 h-5" />
                 </div>
                 <div>
                    <h4 className="font-bold text-white text-sm">Zero-Trust Verification</h4>
                    <p className="text-xs text-gray-400">Never click links in DMs or emails. Verify every smart contract interaction.</p>
                 </div>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-cyber-primary/30 transition-all flex gap-4">
                 <div className="w-10 h-10 bg-cyber-primary/20 rounded flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="text-cyber-primary w-5 h-5" />
                 </div>
                 <div>
                    <h4 className="font-bold text-white text-sm">Multi-Factor Everything</h4>
                    <p className="text-xs text-gray-400">Avoid SMS 2FA. Use hardware keys (Yubikey) or app-based authenticators.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
      
      <AdUnit slot="crypto-hub-bottom" />
    </div>
  );
};

// --- BLOG PAGE ---
export const BlogPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'AI' | 'Crypto' | 'Monetization'>('All');
  
  useEffect(() => {
    document.title = "Blog & Insights | Open Your AIs";
  }, []);

  const filteredArticles = filter === 'All' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === filter);

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle title="The Blog" subtitle="In-depth articles and analysis." />
      
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['All', 'AI', 'Crypto', 'Monetization'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-6 py-2 rounded-full border transition-all ${filter === cat ? 'bg-cyber-primary text-cyber-bg border-cyber-primary font-bold shadow-[0_0_10px_#00E5FF]' : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article, index) => (
          <React.Fragment key={article.id}>
             <Link to={`/blog/${article.slug}`}>
                <Card className="h-full flex flex-col group hover:shadow-2xl hover:shadow-cyber-primary/10">
                  <div className="h-48 rounded-lg overflow-hidden mb-4 relative">
                     <SmartImage src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="mb-2 flex items-center justify-between">
                     <span className="text-xs font-bold text-cyber-primary uppercase">{article.category}</span>
                     <span className="text-xs text-gray-500">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyber-primary transition-colors">{article.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                </Card>
             </Link>
             {/* Insert Ad every 6 items */}
             {(index + 1) % 6 === 0 && <div className="md:col-span-2 lg:col-span-3"><AdUnit slot="in-feed" /></div>}
          </React.Fragment>
        ))}
      </div>
      <AdUnit slot="blog-footer" />
    </div>
  );
};
