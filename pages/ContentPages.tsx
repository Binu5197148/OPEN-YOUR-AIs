
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Clock, DollarSign, ChevronRight } from 'lucide-react';
import { Card, SectionTitle, AdUnit, SmartImage } from '../components/Components';
import { TOOLS, PLAYBOOKS, ARTICLES, CRYPTO_GUIDES } from '../constants';
import { Article } from '../types';

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
                {/* Use a thematic image for the tool if available, or a generic AI one */}
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

// --- CRYPTO PAGE ---
export const CryptoPage: React.FC = () => {
  useEffect(() => {
    document.title = "Crypto Intelligence Hub | Open Your AIs";
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle title="Crypto Intelligence" subtitle="Navigate the blockchain ecosystem with confidence." />
      
      {/* Featured Educational Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {CRYPTO_GUIDES.map(guide => (
          <Card key={guide.id} className="border-t-4 border-t-cyber-success flex flex-col">
             <div className="h-32 mb-4 rounded overflow-hidden -mx-6 -mt-6 mb-4 relative">
                <SmartImage src="https://images.unsplash.com/photo-1621416894512-5363b933b243?auto=format&fit=crop&w=600&q=80" alt={guide.title} className="w-full h-full object-cover" />
                <div className="absolute top-0 right-0 bg-cyber-success text-black text-xs font-bold px-3 py-1 uppercase tracking-wider">{guide.level}</div>
             </div>
             <h3 className="text-xl font-bold text-white mb-3">{guide.title}</h3>
             <p className="text-gray-400 text-sm mb-4 flex-grow">{guide.summary}</p>
             <Link to={`/crypto/${guide.id}`} className="text-white hover:text-cyber-success flex items-center gap-1 text-sm font-medium mt-auto">
               Read Guide <ChevronRight className="w-4 h-4" />
             </Link>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
           <h3 className="text-2xl font-bold text-white mb-6">Market Overview</h3>
           <Card className="h-64 flex items-center justify-center bg-black/40">
              <div className="text-center">
                 <p className="text-gray-500 mb-2">Live Market Data Visualization</p>
                 <div className="w-full h-32 flex items-end gap-1 px-8 opacity-50">
                    {[40, 65, 45, 70, 55, 80, 60, 90, 75, 100].map((h, i) => (
                      <div key={i} style={{height: `${h}%`}} className="w-4 bg-cyber-success/50 rounded-t"></div>
                    ))}
                 </div>
                 <p className="text-xs text-gray-600 mt-2">*Mock visualization for demo</p>
              </div>
           </Card>
        </div>
        <div>
           <h3 className="text-2xl font-bold text-white mb-6">Safety First</h3>
           <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                 <div className="mt-1 min-w-[24px] text-red-500">⚠</div>
                 <div>
                    <h4 className="font-bold text-white">Never share your seed phrase</h4>
                    <p className="text-sm text-gray-400">No support team will ever ask for it.</p>
                 </div>
              </li>
              <li className="flex gap-4 items-start">
                 <div className="mt-1 min-w-[24px] text-cyber-success">✓</div>
                 <div>
                    <h4 className="font-bold text-white">Use Hardware Wallets</h4>
                    <p className="text-sm text-gray-400">Cold storage is the safest way to hold long term.</p>
                 </div>
              </li>
              <li className="flex gap-4 items-start">
                 <div className="mt-1 min-w-[24px] text-yellow-500">?</div>
                 <div>
                    <h4 className="font-bold text-white">DYOR (Do Your Own Research)</h4>
                    <p className="text-sm text-gray-400">Don't trust influencers blindly.</p>
                 </div>
              </li>
           </ul>
        </div>
      </div>
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
