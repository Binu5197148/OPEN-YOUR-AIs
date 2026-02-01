
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, DollarSign, ShieldCheck, ChevronRight, Award, BookOpen, Shield, Zap, AlertTriangle, ExternalLink, CheckCircle, Share2, Bookmark, Terminal, Play, Loader2 } from 'lucide-react';
import { Card, SectionTitle, AdUnit, SmartImage } from '../components/Components';
import { ALL_ARTICLES, PLAYBOOKS, CRYPTO_GUIDES, CONTACT_EMAIL } from '../constants';

// --- NOT FOUND PAGE (404) ---
export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = "404 Not Found | Open Your AIs";
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary mb-4 animate-pulse">404</h1>
      <h2 className="text-2xl text-white mb-6 tracking-widest uppercase font-black">Transmission Lost in Neural Net</h2>
      <Link to="/" className="px-12 py-4 bg-cyber-primary text-cyber-bg font-black rounded-full hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all uppercase tracking-widest text-xs">
        Return to Nexus
      </Link>
    </div>
  );
};

// --- SITEMAP PAGE ---
export const SitemapPage: React.FC = () => {
  useEffect(() => {
    document.title = "Sitemap | Open Your AIs";
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle title="System Sitemap" subtitle="Systematic Index of all published intelligence protocols." />
      <Card>
        <div className="grid md:grid-cols-3 gap-12 text-sm uppercase font-black tracking-widest">
          <div>
            <h3 className="text-cyber-primary mb-6 border-b border-white/10 pb-2">Navigation</h3>
            <ul className="space-y-4 text-gray-500 text-[10px]">
              <li><Link to="/" className="hover:text-white transition-colors">Home Terminal</Link></li>
              <li><Link to="/tools" className="hover:text-white transition-colors">AI Directory</Link></li>
              <li><Link to="/playbooks" className="hover:text-white transition-colors">Revenue Frameworks</Link></li>
              <li><Link to="/crypto" className="hover:text-white transition-colors">Crypto Vault</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Intelligence Feed</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-cyber-secondary mb-6 border-b border-white/10 pb-2">Playbooks</h3>
            <ul className="space-y-4 text-gray-500 text-[10px]">
              {PLAYBOOKS.map(p => (
                <li key={p.id}><Link to={`/playbooks/${p.id}`} className="hover:text-white transition-colors">{p.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-cyber-success mb-6 border-b border-white/10 pb-2">Recent Intel</h3>
            <ul className="space-y-4 text-gray-500 text-[10px]">
              {ALL_ARTICLES.map(a => (
                <li key={a.id}><Link to={`/blog/${a.slug}`} className="hover:text-white transition-colors">{a.title}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

// --- ARTICLE READER ---
export const ArticleReader: React.FC = () => {
  const { slug } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const savedArticles = JSON.parse(localStorage.getItem('openyourais_new_articles') || '[]');
  const allArticles = [...savedArticles, ...ALL_ARTICLES];
  const article = allArticles.find(a => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (article) document.title = `${article.title} | Open Your AIs`;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug, article]);

  if (!article) return <NotFoundPage />;

  return (
    <div className="relative">
      <div className="fixed top-[88px] left-0 w-full h-1 bg-white/5 z-[60]">
        <div 
          className="h-full bg-cyber-primary shadow-[0_0_10px_#00E5FF] transition-all duration-300" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-3/4">
            <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-white mb-10 transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
              <ArrowLeft className="w-4 h-4 mr-2" /> Intelligence Feed
            </Link>
            
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <span className="px-4 py-1.5 text-[9px] font-black tracking-[0.2em] text-cyber-bg bg-cyber-primary rounded-sm uppercase italic">
                  {article.category} Protocol
                </span>
                <span className="text-gray-500 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> {article.readTime} cycle
                </span>
                <span className="text-cyber-success text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border border-cyber-success/20 px-3 py-1 rounded">
                  <ShieldCheck className="w-3.5 h-3.5" /> Data Verified
                </span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[0.95] tracking-tighter uppercase italic">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                 <div className="w-10 h-10 rounded-full bg-cyber-primary/20 flex items-center justify-center text-cyber-primary font-black italic text-xs border border-cyber-primary/30">OY</div>
                 <div className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                    <span className="text-white">Admin Analyst</span> • Feb 2026 • Alpha Priority
                 </div>
              </div>
            </header>

            <div className="w-full aspect-video rounded-[40px] overflow-hidden mb-16 border border-white/5 bg-gray-900 group shadow-2xl">
               <SmartImage src={article.image} alt={article.title} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-1000" />
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="p-12 bg-white/[0.02] border-l-8 border-cyber-primary rounded-r-[40px] mb-16 text-gray-300 text-2xl font-light leading-relaxed italic border border-white/5 shadow-xl">
                 "{article.excerpt}"
              </div>
              
              <AdUnit slot="article-top" />
              
              <div className="article-content leading-[1.9] space-y-12 text-gray-300 font-normal prose-h2:text-white prose-h2:font-black prose-h2:uppercase prose-h2:text-4xl prose-h2:mt-24 prose-h2:mb-8 prose-h3:text-cyber-primary prose-h3:font-bold prose-h3:text-2xl prose-p:mb-8 prose-ul:mb-8 prose-li:mb-2" dangerouslySetInnerHTML={{ __html: article.content }} />
              
              <div className="mt-24 pt-12 border-t border-white/10">
                 <div className="flex flex-wrap gap-4">
                    {article.tags.map(tag => (
                       <span key={tag} className="text-[10px] font-black bg-white/5 px-4 py-2 rounded-lg text-gray-400 uppercase tracking-widest border border-white/5">#{tag}</span>
                    ))}
                 </div>
              </div>

              <AdUnit slot="article-bottom" />
            </div>

            <div className="mt-24 p-12 bg-gradient-to-br from-cyber-primary/10 to-transparent border border-cyber-primary/20 rounded-[48px] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <ShieldCheck className="w-32 h-32" />
               </div>
               <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                 <ShieldCheck className="text-cyber-primary w-8 h-8" /> Neural Integrity Protocol
               </h3>
               <p className="text-gray-400 leading-relaxed text-base font-light mb-8 italic">
                 This documentation was compiled through a high-frequency intelligence network. Every technical claim was cross-referenced with primary market sources to ensure human sovereignty in the age of total automation.
               </p>
               <div className="flex gap-4">
                  <button className="px-8 py-3 bg-cyber-primary text-cyber-bg font-black rounded-xl text-[10px] uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Broadcast Intel
                  </button>
                  <button className="px-8 py-3 border border-white/10 text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-2">
                    <Bookmark className="w-4 h-4" /> Save to Vault
                  </button>
               </div>
            </div>
          </div>
          
          <aside className="lg:w-1/4">
             <div className="sticky top-32 space-y-12">
                <div>
                   <h4 className="font-black text-white uppercase tracking-[0.3em] text-[9px] mb-8 border-b border-white/10 pb-2">Transmission Status</h4>
                   <div className="space-y-6">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                         <span>Stream</span>
                         <span className="text-cyber-success flex items-center gap-1 font-black underline decoration-cyber-success/30 decoration-2 underline-offset-4">OPTIMIZED</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                         <span>Expertise</span>
                         <span className="text-white">SENIOR ANALYST</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                         <span>Analysis</span>
                         <span className="text-cyber-primary">DEEP DIVE</span>
                      </div>
                   </div>
                </div>

                <div className="p-8 bg-cyber-primary/5 rounded-[32px] border border-cyber-primary/10">
                   <h4 className="font-black text-white uppercase tracking-widest text-[10px] mb-4">Neural Pulse</h4>
                   <p className="text-[11px] text-gray-500 leading-relaxed mb-6 italic">Join 15,000+ vanguard thinkers receiving daily high-frequency technical alerts.</p>
                   <input type="email" placeholder="NEURAL_ID@HOST.COM" className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 text-[10px] font-black uppercase tracking-widest text-cyber-primary focus:outline-none focus:border-cyber-primary mb-3" />
                   <button className="w-full py-3 bg-cyber-primary text-cyber-bg font-black rounded-xl text-[10px] uppercase tracking-widest hover:shadow-[0_0_15px_#00E5FF]">Subscribe</button>
                </div>

                <AdUnit slot="sidebar-ad" className="min-h-[400px]" />
             </div>
          </aside>
        </div>
      </article>
    </div>
  );
};

// --- PLAYBOOK READER ---
export const PlaybookReader: React.FC = () => {
  const { id } = useParams();
  const playbook = PLAYBOOKS.find(p => p.id === id);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (playbook) document.title = `${playbook.title} | Playbook`;
    
    // Load local mission progress
    const progress = localStorage.getItem(`mission_${id}`);
    if (progress === 'active') setIsLaunched(true);

    const savedChecked = localStorage.getItem(`checked_${id}`);
    if (savedChecked) setCheckedSteps(JSON.parse(savedChecked));
  }, [id, playbook]);

  const handleLaunch = () => {
    setIsLaunching(true);
    const messages = [
      "Establishing Neural Link...",
      "Encrypting Revenue Channel...",
      "Bypassing Market Latency...",
      "Syncing with o1 Reasoning Engine...",
      "Protocol Phase 1: INITIALIZED",
      "Protocol Phase 2: READY",
      "ALL SYSTEMS GO."
    ];
    
    messages.forEach((msg, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
        if (i === messages.length - 1) {
          setTimeout(() => {
            setIsLaunching(false);
            setIsLaunched(true);
            localStorage.setItem(`mission_${id}`, 'active');
          }, 1000);
        }
      }, i * 600);
    });
  };

  const toggleStep = (index: number) => {
    const newChecked = checkedSteps.includes(index) 
      ? checkedSteps.filter(i => i !== index) 
      : [...checkedSteps, index];
    setCheckedSteps(newChecked);
    localStorage.setItem(`checked_${id}`, JSON.stringify(newChecked));
  };

  if (!playbook) return <NotFoundPage />;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl relative">
      {/* Neural Launch Overlay */}
      {isLaunching && (
        <div className="fixed inset-0 z-[100] bg-cyber-bg flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-black border border-cyber-primary/30 p-8 rounded-[32px] shadow-[0_0_100px_rgba(0,229,255,0.2)]">
            <div className="flex items-center gap-3 mb-8 text-cyber-primary">
              <Terminal className="w-6 h-6" />
              <h2 className="font-black uppercase tracking-[0.3em] text-sm">System Intelligence Executive</h2>
            </div>
            <div className="space-y-2 font-mono text-[10px] text-cyber-primary/80 mb-8 h-40 overflow-y-auto">
              {logs.map((log, i) => <div key={i} className="animate-fadeIn">{log}</div>)}
              <div className="animate-pulse">_</div>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
               <div className="h-full bg-cyber-primary animate-[progressBar_4s_linear]" />
            </div>
          </div>
        </div>
      )}

      <Link to="/playbooks" className="inline-flex items-center text-gray-500 hover:text-white mb-10 transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
        <ArrowLeft className="w-4 h-4 mr-2" /> Playbook Archives
      </Link>
      
      <header className="mb-20">
        <div className="flex items-center gap-4 mb-8">
           <span className="bg-cyber-secondary text-white text-[9px] font-black px-5 py-2 rounded-sm uppercase tracking-[0.2em] italic">Revenue Ops</span>
           <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] border border-white/10 px-5 py-2 rounded-sm">{playbook.difficulty} Execution</span>
           {isLaunched && (
             <span className="bg-cyber-success/20 text-cyber-success text-[9px] font-black px-5 py-2 rounded-sm uppercase tracking-[0.2em] italic animate-pulse flex items-center gap-2">
                <CheckCircle className="w-3 h-3" /> Mission Active
             </span>
           )}
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white mb-10 uppercase tracking-tighter leading-[0.8] italic">
          {playbook.title}
        </h1>
        <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-4xl border-l-2 border-cyber-secondary pl-8">{playbook.tldr}</p>
      </header>

      <div className="grid lg:grid-cols-[1fr_380px] gap-20">
         <div className="space-y-16">
            <div className="w-full aspect-video rounded-[60px] overflow-hidden border border-white/5 bg-gray-900 shadow-2xl">
               <SmartImage src={playbook.image || ''} alt={playbook.title} className="w-full h-full object-cover opacity-70" />
            </div>

            <div className="prose prose-invert prose-xl max-w-none">
               <div className="article-content leading-relaxed space-y-12 text-gray-300 font-normal prose-h2:text-white prose-h2:font-black prose-h2:uppercase prose-h2:text-4xl prose-h3:text-cyber-secondary prose-h3:text-2xl" dangerouslySetInnerHTML={{ __html: playbook.content || '' }} />
            </div>
         </div>

         <aside className="space-y-10">
            <Card className="border-cyber-secondary/20 bg-cyber-secondary/5 sticky top-32 p-10 rounded-[48px]">
               <h3 className="font-black text-white mb-10 uppercase text-[10px] tracking-[0.3em] flex items-center gap-2">
                 <Zap className="text-cyber-secondary w-4 h-4" /> Intel Dashboard
               </h3>
               <div className="space-y-10">
                  <div className="group">
                     <div className="flex items-center gap-2 text-cyber-secondary mb-3 font-black text-[9px] uppercase tracking-widest">
                        <DollarSign className="w-4 h-4" /> Yield Potential
                     </div>
                     <p className="text-4xl text-white font-black italic tracking-tighter group-hover:text-cyber-secondary transition-colors">{playbook.roi}</p>
                  </div>
                  <div className="h-px bg-white/10"></div>
                  <div>
                     <div className="flex items-center gap-2 text-gray-600 mb-3 font-black text-[9px] uppercase tracking-widest">
                        <Clock className="w-4 h-4" /> Execution Cycle
                     </div>
                     <p className="text-3xl text-white font-black italic tracking-tighter">{playbook.timeline}</p>
                  </div>
                  <div className="h-px bg-white/10"></div>
                  <div>
                     <h4 className="font-black text-white mb-6 uppercase text-[9px] tracking-[0.2em] italic">Protocol Phases</h4>
                     <ul className="space-y-5">
                        {playbook.steps.map((step, i) => (
                           <li 
                            key={i} 
                            onClick={() => isLaunched && toggleStep(i)}
                            className={`flex gap-4 text-xs font-bold group transition-all p-3 rounded-xl border border-transparent ${isLaunched ? 'cursor-pointer hover:bg-white/[0.03] hover:border-white/5' : ''} ${checkedSteps.includes(i) ? 'opacity-30' : 'text-gray-400'}`}
                           >
                              {isLaunched ? (
                                <div className={`w-5 h-5 border rounded flex-shrink-0 flex items-center justify-center transition-colors ${checkedSteps.includes(i) ? 'bg-cyber-success border-cyber-success' : 'border-white/20'}`}>
                                  {checkedSteps.includes(i) && <CheckCircle className="w-3.5 h-3.5 text-black" />}
                                </div>
                              ) : (
                                <span className="text-cyber-secondary font-black italic">0{i+1}</span>
                              )}
                              <span className={`${isLaunched && !checkedSteps.includes(i) ? 'group-hover:text-white' : ''} ${checkedSteps.includes(i) ? 'line-through' : ''}`}>{step}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
                  
                  {!isLaunched ? (
                    <button 
                      onClick={handleLaunch}
                      className="w-full py-5 bg-cyber-secondary text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:brightness-110 transition-all shadow-xl flex items-center justify-center gap-2 group"
                    >
                      <Play className="w-4 h-4 group-hover:scale-110 transition-transform" /> Launch Protocol
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyber-success transition-all duration-500" 
                          style={{ width: `${(checkedSteps.length / playbook.steps.length) * 100}%` }}
                        />
                      </div>
                      <p className="text-[9px] font-black text-cyber-success uppercase text-center tracking-widest">
                        Mission Progress: {Math.round((checkedSteps.length / playbook.steps.length) * 100)}%
                      </p>
                      <button 
                        onClick={() => { if(confirm('Reset Protocol?')) { setIsLaunched(false); setCheckedSteps([]); localStorage.removeItem(`mission_${id}`); localStorage.removeItem(`checked_${id}`); } }}
                        className="w-full py-3 border border-white/5 text-gray-600 font-black uppercase text-[8px] tracking-widest rounded-xl hover:text-red-400 transition-all"
                      >
                        Abort Mission
                      </button>
                    </div>
                  )}
               </div>
            </Card>
         </aside>
      </div>
    </div>
  );
};

// --- CRYPTO READER ---
export const CryptoReader: React.FC = () => {
  const { id } = useParams();
  const guide = CRYPTO_GUIDES.find(g => g.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (guide) document.title = `${guide.title} | Crypto Intel`;
  }, [id, guide]);

  if (!guide) return <NotFoundPage />;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/crypto" className="inline-flex items-center text-gray-500 hover:text-white mb-10 transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
        <ArrowLeft className="w-4 h-4 mr-2" /> Asset Nexus
      </Link>
      
      <header className="mb-20">
        <div className="inline-block px-6 py-2 bg-cyber-success/10 border border-cyber-success/20 text-cyber-success text-[9px] font-black uppercase tracking-[0.3em] rounded-sm mb-10 italic">
          THREAT LEVEL: {guide.level}
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white mb-10 uppercase tracking-tighter leading-[0.85] italic text-balance">
          {guide.title}
        </h1>
        <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-3xl">{guide.summary}</p>
      </header>

      <div className="prose prose-invert prose-xl max-w-none">
         <div className="article-content leading-[1.8] space-y-12 text-gray-300 font-normal prose-h2:text-white prose-h2:font-black prose-h2:uppercase" dangerouslySetInnerHTML={{ __html: guide.content }} />
      </div>
      
      <div className="mt-24 p-12 border border-cyber-success/20 rounded-[48px] bg-cyber-success/5 flex flex-col md:flex-row gap-10 items-center group">
         <div className="w-20 h-20 rounded-[28px] bg-cyber-success/20 flex items-center justify-center flex-shrink-0 border border-cyber-success/30 group-hover:scale-110 transition-transform">
            <Shield className="text-cyber-success w-10 h-10" />
         </div>
         <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-lg mb-3 italic">Custody Verification Protocol</h4>
            <p className="text-sm text-gray-500 leading-relaxed font-light">This technical documentation was reviewed by blockchain security auditors. Remember: in Web3, security is an individual responsibility. Never share your Private Keys or Seed Phrases with third parties.</p>
         </div>
      </div>
    </div>
  );
};

// --- ABOUT PAGE ---
export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "Manifesto | Open Your AIs";
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <SectionTitle title="Neural Frontier Manifesto" subtitle="Decode. Secure. Monetize. The three pillars of human sovereignty." />
      <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
         <div className="relative group">
            <div className="absolute -inset-10 bg-cyber-primary/10 blur-[100px] rounded-full group-hover:bg-cyber-primary/20 transition-all duration-1000"></div>
            <SmartImage src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" alt="Intelligence" className="rounded-[60px] border border-white/5 relative z-10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
         </div>
         <div className="space-y-10">
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic">Intelligence Vanguard</h3>
            <p className="text-gray-400 leading-relaxed text-xl font-light">
               Open Your AIs is a specialized intelligence hub dedicated to narrowing the gap between rapid technological frontiers and human application. We track the trinity of the 21st century: Generative Intelligence, Decentralized Assets, and Automated Monetization.
            </p>
            <div className="grid grid-cols-2 gap-8">
               <div className="p-8 bg-white/[0.02] rounded-[32px] border border-white/5">
                  <p className="text-cyber-primary font-black text-4xl mb-2 italic">100%</p>
                  <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.3em]">Verified Intel</p>
               </div>
               <div className="p-8 bg-white/[0.02] rounded-[32px] border border-white/5">
                  <p className="text-cyber-secondary font-black text-4xl mb-2 italic">24/7</p>
                  <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.3em]">Neural Stream</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- LEGAL PAGES ---
export const LegalPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  useEffect(() => {
    document.title = type === 'privacy' ? "Privacy | Open Your AIs" : "Terms | Open Your AIs";
  }, [type]);

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <SectionTitle title={type === 'privacy' ? 'Privacy Protocol' : 'Platform Terms'} />
      <Card className="p-16 rounded-[48px] border-white/5 bg-white/[0.01]">
        <div className="prose prose-invert max-w-none text-gray-400 font-light">
          <p className="text-cyber-primary font-black uppercase tracking-[0.3em] text-[10px] mb-16 italic underline decoration-cyber-primary/30 underline-offset-8">V1.1 - REVISED FEB 2026</p>
          {type === 'privacy' ? (
            <div className="space-y-16">
              <section>
                <h3 className="text-white font-black text-2xl uppercase tracking-widest mb-6">1. Data Sovereignty</h3>
                <p className="leading-relaxed">We only collect essential telemetry via high-performance analytics to optimize the flow of technical information. Your data remains encrypted and is never sold to third-party aggregators.</p>
              </section>
              <section>
                <h3 className="text-white font-black text-2xl uppercase tracking-widest mb-6">2. AdSense Network</h3>
                <p className="leading-relaxed">We utilize cookies from the Google AdSense network to deliver high-relevance advertisements. These cookies help us maintain the intelligence stream for free public access.</p>
              </section>
            </div>
          ) : (
            <div className="space-y-16">
              <section>
                <h3 className="text-white font-black text-2xl uppercase tracking-widest mb-6">1. Intelligence Disclaimer</h3>
                <p className="leading-relaxed">All information provided on Open Your AIs is for technical educational purposes. We are not financial advisors. The deployment of AI automations and investments in digital assets involve inherent market risks.</p>
              </section>
              <section>
                <h3 className="text-white font-black text-2xl uppercase tracking-widest mb-6">2. IP Protocols</h3>
                <p className="leading-relaxed">The architectural design and original reports of this hub are protected by intellectual property laws. Unauthorized extraction or replication is monitored.</p>
              </section>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
