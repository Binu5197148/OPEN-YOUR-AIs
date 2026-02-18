
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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

  // SEO: Generate meta description from excerpt (truncated to 160 chars)
  const metaDescription = article.excerpt ?
    (article.excerpt.length > 160 ? article.excerpt.substring(0, 157) + '...' : article.excerpt) :
    `Read ${article.title} - High-fidelity intelligence on ${article.category} from Open Your AIs.`;

  // SEO: Generate keywords from tags and category
  const keywords = [article.category, ...(article.tags || []), 'AI', 'technology', 'guide'].join(', ');

  // SEO: Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": metaDescription,
    "image": article.image,
    "author": {
      "@type": "Organization",
      "name": "Open Your AIs"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Open Your AIs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.openyourais.com/logo.png"
      }
    },
    "datePublished": article.date || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.openyourais.com/blog/${article.slug}`
    }
  };

  return (
    <div className="relative">
      <Helmet>
        <title>{`${article.title} | Open Your AIs`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={`https://www.openyourais.com/blog/${article.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={`${article.title} | Open Your AIs`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.openyourais.com/blog/${article.slug}`} />
        <meta property="og:image" content={article.image} />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:section" content={article.category} />
        {(article.tags || []).map((tag: string) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Twitter */}
        <meta name="twitter:title" content={`${article.title} | Open Your AIs`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={article.image} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>
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
                  {(article.tags || []).map((tag: string) => (
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
                        <span className="text-cyber-secondary font-black italic">0{i + 1}</span>
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
                    onClick={() => { if (confirm('Reset Protocol?')) { setIsLaunched(false); setCheckedSteps([]); localStorage.removeItem(`mission_${id}`); localStorage.removeItem(`checked_${id}`); } }}
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
    document.title = "About | Open Your AIs";
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <Helmet>
        <title>About Us | Open Your AIs - Tech Intelligence Hub</title>
        <meta name="description" content="Learn about Open Your AIs mission to decode AI, crypto, and digital monetization. Founded by industry experts to provide actionable tech intelligence." />
        <meta name="keywords" content="about open your ais, tech blog mission, AI intelligence hub, digital monetization experts" />
        <link rel="canonical" href="https://www.openyourais.com/about" />
      </Helmet>
      
      <SectionTitle title="Neural Frontier Manifesto" subtitle="Decode. Secure. Monetize. The three pillars of human sovereignty." />
      
      {/* Mission Section */}
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
          <p className="text-gray-400 leading-relaxed text-lg font-light">
            Founded in 2025 by Ulisses Balbino, a visionary at the intersection of audiovisual production, creative entrepreneurship, and artificial intelligence, our platform emerges from the real need to decode complex technological shifts into actionable intelligence. With over a decade of experience working with global brands like Disney, Starbucks, and Nestlé, we bring enterprise-grade analysis to individual creators and entrepreneurs.
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

      {/* What We Do Section */}
      <Card className="p-12 md:p-16 rounded-[48px] border-white/5 bg-white/[0.01] mb-20">
        <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-8">Our Mission</h3>
        <div className="space-y-6 text-gray-400 leading-relaxed">
          <p className="text-lg">
            In an era where artificial intelligence evolves faster than traditional education can adapt, we serve as your technical translator and strategic partner. Our mission is threefold:
          </p>
          <ul className="space-y-4 ml-6">
            <li className="flex items-start gap-3">
              <span className="text-cyber-primary font-black">01.</span>
              <span><strong className="text-white">Decode Complexity:</strong> Transform cutting-edge AI developments, blockchain protocols, and automation frameworks into understandable, actionable intelligence.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-secondary font-black">02.</span>
              <span><strong className="text-white">Verify Accuracy:</strong> Every piece of content undergoes rigorous fact-checking against primary sources, technical documentation, and real-world testing.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyber-success font-black">03.</span>
              <span><strong className="text-white">Enable Sovereignty:</strong> Provide the knowledge and tools necessary for digital independence—whether through AI-powered workflows, decentralized finance, or automated revenue systems.</span>
            </li>
          </ul>
        </div>
      </Card>

      {/* Content Standards */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <Card className="p-10 text-center border-b-4 border-b-cyber-primary">
          <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4">AI Intelligence</h4>
          <p className="text-gray-400 text-sm leading-relaxed">Deep technical analysis of Large Language Models, generative AI tools, and autonomous agent frameworks. From GPT-4 to Claude, from Midjourney to Runway—we test, compare, and explain.</p>
        </Card>
        <Card className="p-10 text-center border-b-4 border-b-cyber-secondary">
          <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4">Digital Capital</h4>
          <p className="text-gray-400 text-sm leading-relaxed">Battle-tested monetization playbooks leveraging automation and AI. Not theory—practical frameworks with verified ROI, timeline estimates, and step-by-step execution guides.</p>
        </Card>
        <Card className="p-10 text-center border-b-4 border-b-cyber-success">
          <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4">Web3 Security</h4>
          <p className="text-gray-400 text-sm leading-relaxed">Security-first documentation for digital asset self-custody, DeFi protocols, and blockchain fundamentals. Protecting your capital in the decentralized economy.</p>
        </Card>
      </div>

      {/* Editorial Standards */}
      <Card className="p-12 md:p-16 rounded-[48px] border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
        <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-8">Editorial Standards</h3>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-cyber-primary font-black uppercase tracking-widest mb-4 text-sm">Verification Protocol</h4>
            <p className="text-gray-400 leading-relaxed mb-6">Every article, playbook, and guide published on Open Your AIs undergoes a multi-stage verification process. We cross-reference technical claims against official documentation, test tools and strategies where possible, and clearly distinguish between verified facts and analytical projections.</p>
            <h4 className="text-cyber-secondary font-black uppercase tracking-widest mb-4 text-sm">Transparency</h4>
            <p className="text-gray-400 leading-relaxed">We disclose affiliate relationships where they exist, clearly label sponsored content, and maintain editorial independence. Our recommendations are based on merit and testing, not compensation.</p>
          </div>
          <div>
            <h4 className="text-cyber-success font-black uppercase tracking-widest mb-4 text-sm">Continuous Updates</h4>
            <p className="text-gray-400 leading-relaxed mb-6">Technology moves fast. We regularly update our content to reflect new developments, deprecated features, and evolving best practices. Each article includes a last-updated timestamp for transparency.</p>
            <h4 className="text-white font-black uppercase tracking-widest mb-4 text-sm">Community Feedback</h4>
            <p className="text-gray-400 leading-relaxed">We actively engage with our community through comments, social media, and direct email. Reader corrections and suggestions are not just welcomed—they're essential to maintaining accuracy in a rapidly changing field.</p>
          </div>
        </div>
      </Card>

      {/* Contact CTA */}
      <div className="text-center mt-20">
        <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-6">Connect With Us</h3>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Have questions, suggestions, or corrections? We believe in open dialogue with our community. Reach out through our contact page or connect on social media.</p>
        <Link to="/contact" className="inline-block px-12 py-4 bg-cyber-primary text-cyber-bg font-black rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all uppercase tracking-widest text-sm">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

// --- CONTACT PAGE ---
export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact | Open Your AIs";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <Helmet>
        <title>Contact Us | Open Your AIs - Get In Touch</title>
        <meta name="description" content="Contact Open Your AIs team for questions, suggestions, or collaboration opportunities. We respond within 24-48 hours." />
        <meta name="keywords" content="contact open your ais, tech support, ai questions, crypto inquiry" />
        <link rel="canonical" href="https://www.openyourais.com/contact" />
      </Helmet>

      <SectionTitle title="Establish Connection" subtitle="Direct channel to our intelligence team." />

      <div className="grid md:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <Card className="p-10 border-l-4 border-l-cyber-primary">
            <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-6">Communication Channels</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyber-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-cyber-primary" />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">Primary Email</h4>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-cyber-primary hover:text-white transition-colors font-bold">
                    {CONTACT_EMAIL}
                  </a>
                  <p className="text-gray-500 text-xs mt-1">Response time: 24-48 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyber-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-cyber-secondary" />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">Availability</h4>
                  <p className="text-gray-400 text-sm">Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
                  <p className="text-gray-500 text-xs mt-1">Weekend inquiries answered on Mondays</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyber-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-cyber-success" />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">Social Channels</h4>
                  <p className="text-gray-400 text-sm">Connect on Twitter/X and LinkedIn for real-time updates</p>
                  <div className="flex gap-4 mt-2">
                    <a href="https://twitter.com/openyourais" target="_blank" rel="noopener noreferrer" className="text-cyber-primary hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">Twitter/X</a>
                    <a href="https://linkedin.com/company/openyourais" target="_blank" rel="noopener noreferrer" className="text-cyber-primary hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-10 bg-gradient-to-br from-cyber-primary/5 to-transparent">
            <h3 className="text-xl font-black text-white uppercase tracking-widest mb-4">What We Can Help With</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyber-primary flex-shrink-0" />
                <span>Technical questions about AI tools and implementation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyber-primary flex-shrink-0" />
                <span>Clarifications on crypto guides and DeFi protocols</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyber-primary flex-shrink-0" />
                <span>Corrections or updates to published content</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyber-primary flex-shrink-0" />
                <span>Partnership and collaboration opportunities</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyber-primary flex-shrink-0" />
                <span>General feedback and suggestions</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-10">
          <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-8">Send Transmission</h3>

          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-cyber-success mx-auto mb-4" />
              <h4 className="text-xl font-black text-white uppercase tracking-widest mb-2">Message Received</h4>
              <p className="text-gray-400">We'll respond within 24-48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-black uppercase tracking-widest text-xs mb-2">Designation</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyber-primary transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-black uppercase tracking-widest text-xs mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyber-primary transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-black uppercase tracking-widest text-xs mb-2">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyber-primary transition-all"
                  required
                >
                  <option value="" className="bg-cyber-bg">Select subject...</option>
                  <option value="general" className="bg-cyber-bg">General Inquiry</option>
                  <option value="technical" className="bg-cyber-bg">Technical Question</option>
                  <option value="content" className="bg-cyber-bg">Content Correction/Update</option>
                  <option value="partnership" className="bg-cyber-bg">Partnership Opportunity</option>
                  <option value="feedback" className="bg-cyber-bg">Feedback/Suggestion</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-black uppercase tracking-widest text-xs mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyber-primary transition-all h-32 resize-none"
                  placeholder="Describe your inquiry..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-cyber-primary text-cyber-bg font-black rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all uppercase tracking-widest text-sm"
              >
                Transmit Message
              </button>

              <p className="text-gray-500 text-xs text-center">
                By submitting, you agree to our <Link to="/privacy" className="text-cyber-primary hover:text-white transition-colors">Privacy Policy</Link>.
              </p>
            </form>
          )}
        </Card>
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
