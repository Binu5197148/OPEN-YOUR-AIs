
import React, { useEffect, useState } from 'react';
import { sanitizeHtml } from '../utils/sanitize';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, DollarSign, ShieldCheck, ChevronRight, Award, BookOpen, Shield, Zap, AlertTriangle, ExternalLink, CheckCircle, Share2, Bookmark, Terminal, Play, Loader2, Mail, Globe } from 'lucide-react';
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
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/tools" className="hover:text-white transition-colors">AI Tools Directory</Link></li>
              <li><Link to="/playbooks" className="hover:text-white transition-colors">Monetization Playbooks</Link></li>
              <li><Link to="/crypto" className="hover:text-white transition-colors">Crypto Intelligence</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
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
      "@type": "Person",
      "name": "Ulisses Balbino",
      "url": "https://www.openyourais.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Open Your AIs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.openyourais.com/logo.svg"
      }
    },
    "datePublished": article.date || new Date().toISOString(),
    "dateModified": article.date || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.openyourais.com/blog/${article.slug}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.openyourais.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.openyourais.com/blog" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://www.openyourais.com/blog/${article.slug}` }
    ]
  };

  return (
    <div className="relative">
      <Helmet>
        <title>{`${article.title} | Open Your AIs`}</title>
        {article.noindex && <meta name="robots" content="noindex,follow" />}
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
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
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
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><ChevronRight className="w-3 h-3" /></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><ChevronRight className="w-3 h-3" /></li>
                <li className="text-cyber-primary truncate max-w-[200px]" aria-current="page">{article.title}</li>
              </ol>
            </nav>

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
                  <span className="text-white">Ulisses Balbino</span> &bull; {article.date} &bull; Open Your AIs
                </div>
              </div>
            </header>

            <div className="w-full aspect-video rounded-[40px] overflow-hidden mb-16 border border-white/5 bg-gray-900 group shadow-2xl">
              <SmartImage src={article.image} alt={article.title} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-1000" width={1200} height={675} />
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="p-12 bg-white/[0.02] border-l-8 border-cyber-primary rounded-r-[40px] mb-16 text-gray-300 text-2xl font-light leading-relaxed italic border border-white/5 shadow-xl">
                "{article.excerpt}"
              </div>

              {/* AI Disclosure — required for AdSense compliance */}
              <div className="flex items-start gap-3 p-5 mb-8 bg-white/[0.03] border border-white/10 rounded-2xl text-[11px] text-gray-500 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-cyber-primary/60 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span><strong className="text-gray-400 font-bold">AI-assisted content:</strong> This article was researched and drafted with the help of artificial intelligence tools, then reviewed and published by a human editor. Information is provided for educational purposes only.</span>
              </div>

              <AdUnit slot="article-top" />

              <div className="article-content leading-[1.9] space-y-12 text-gray-300 font-normal prose-h2:text-white prose-h2:font-black prose-h2:uppercase prose-h2:text-4xl prose-h2:mt-24 prose-h2:mb-8 prose-h3:text-cyber-primary prose-h3:font-bold prose-h3:text-2xl prose-p:mb-8 prose-ul:mb-8 prose-li:mb-2" dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }} />

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
      <Helmet><meta name="robots" content="noindex,follow" /></Helmet>
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
            <SmartImage src={playbook.image || ''} alt={playbook.title} className="w-full h-full object-cover opacity-70" width={1200} height={675} />
          </div>

          <div className="prose prose-invert prose-xl max-w-none">
            <div className="article-content leading-relaxed space-y-12 text-gray-300 font-normal prose-h2:text-white prose-h2:font-black prose-h2:uppercase prose-h2:text-4xl prose-h3:text-cyber-secondary prose-h3:text-2xl" dangerouslySetInnerHTML={{ __html: sanitizeHtml(playbook.content || '') }} />
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
      <Helmet><meta name="robots" content="noindex,follow" /></Helmet>
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
        <div className="article-content leading-[1.8] space-y-12 text-gray-300 font-normal prose-h2:text-white prose-h2:font-black prose-h2:uppercase" dangerouslySetInnerHTML={{ __html: sanitizeHtml(guide.content) }} />
      </div>

      {/* Financial disclaimer — required for AdSense crypto content compliance */}
      <div className="mt-16 p-6 border border-yellow-500/20 rounded-2xl bg-yellow-500/5 flex items-start gap-4">
        <AlertTriangle className="w-5 h-5 text-yellow-500/70 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-[11px] text-gray-500 leading-relaxed">
          <strong className="text-gray-400 font-bold">Financial Disclaimer:</strong> This content is for educational and informational purposes only and does not constitute financial, investment, or legal advice. Cryptocurrency investments carry significant risk, including the possible loss of your entire investment. Past performance is not indicative of future results. Always consult a licensed financial advisor before making investment decisions.
        </p>
      </div>

      <div className="mt-8 p-12 border border-cyber-success/20 rounded-[48px] bg-cyber-success/5 flex flex-col md:flex-row gap-10 items-center group">
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
    document.title = "Sobre Ulisses Balbino | Open Your AIs";
  }, []);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "Sobre Ulisses Balbino — Open Your AIs",
    "description": "Ulisses Balbino é diretor e produtor audiovisual com 14 anos de experiência. Fundador do Open Your AIs, cobre IA aplicada à criação, produção audiovisual e workflows de criadores.",
    "url": "https://www.openyourais.com/about",
    "mainEntity": {
      "@type": "Person",
      "name": "Ulisses Balbino",
      "url": "https://www.openyourais.com/about",
      "image": "https://www.openyourais.com/ulisses-balbino.jpg",
      "email": CONTACT_EMAIL,
      "jobTitle": "Diretor e Produtor Audiovisual",
      "description": "Diretor e produtor audiovisual com 14 anos de experiência. Trabalhou com Disney, Starbucks, Nestlé, Yamaha e Carrefour via Pichorra Filmes. Fundador do Open Your AIs.",
      "foundingDate": "2025",
      "sameAs": [
        "https://www.instagram.com/openyourais",
        "https://www.linkedin.com/in/ulissesbalbino"
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.openyourais.com/" },
      { "@type": "ListItem", "position": 2, "name": "Sobre Ulisses Balbino", "item": "https://www.openyourais.com/about" }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <Helmet>
        <title>Sobre Ulisses Balbino | Open Your AIs</title>
        <meta name="description" content="Ulisses Balbino — diretor e produtor audiovisual com 14 anos de experiência. Fundador do Open Your AIs: IA aplicada à criação, produção audiovisual e workflows de criadores." />
        <link rel="canonical" href="https://www.openyourais.com/about" />
        <meta property="og:title" content="Sobre Ulisses Balbino | Open Your AIs" />
        <meta property="og:description" content="Diretor e produtor audiovisual com 14 anos de experiência. Fundador do Open Your AIs — IA para criação real." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://www.openyourais.com/about" />
        <meta name="twitter:title" content="Sobre Ulisses Balbino | Open Your AIs" />
        <meta name="twitter:description" content="Diretor e produtor audiovisual com 14 anos de experiência. Fundador do Open Your AIs — IA para criação real." />
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
          <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li className="text-cyber-primary" aria-current="page">Sobre Ulisses Balbino</li>
        </ol>
      </nav>

      <SectionTitle title="About Open Your AIs" subtitle="Where 14 years of professional filmmaking meets the AI revolution." />
      
      <h1 className="sr-only">About Open Your AIs - Professional Filmmaker's Perspective on AI</h1>

      <div className="grid md:grid-cols-2 gap-20 items-center mb-24">
        <div className="relative group">
          <div className="absolute -inset-10 bg-cyber-primary/10 blur-[100px] rounded-full group-hover:bg-cyber-primary/20 transition-all duration-1000"></div>
          <div className="rounded-[60px] border border-white/5 relative z-10 shadow-2xl overflow-hidden" style={{aspectRatio: '3/4', maxHeight: '520px'}}>
            <img src="/ulisses-balbino.jpg" alt="Ulisses Balbino - Director, Producer and founder of Open Your AIs" className="w-full h-full object-cover object-top" />
          </div>
        </div>
        <div className="space-y-10">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">The Person Behind This</h2>
          <p className="text-gray-400 leading-relaxed text-lg font-light">
            I'm <strong className="text-white">Ulisses Balbino</strong>. Since 2012, I've directed and produced commercial work for brands like <strong className="text-white">Disney, Starbucks, Nestlé, Yamaha, Carrefour, Kopenhagen, and Benefit</strong> through my production company, Pichorra Filmes.
          </p>
          <p className="text-gray-400 leading-relaxed text-lg font-light">
            I'm also a comedy writer and performer — I wrote and acted in sketches for Ronald Rios' talk show on <strong className="text-white">Paramount, Comedy Central, and MTV</strong>. Before that, I hosted a humor show on Jovem Pan, one of Brazil's biggest radio networks. I compose music, I act, I edit, I direct. I've done every job on a set.
          </p>
          <p className="text-gray-400 leading-relaxed text-lg font-light">
            Now I use AI in my production work — not to replace any of that knowledge, but to <strong className="text-white">amplify all of it</strong>.
          </p>
        </div>
      </div>

      {/* Why This Site Exists */}
      <div className="mb-24">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-12 text-center">Why This Site Exists</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-gray-400 leading-relaxed text-lg font-light">
            In 2015, I produced a 30-second commercial for Nestlé. Budget: $47,000. Crew of 28 people, two shoot days, a week of post-production. Last month, I recreated a similar shot with AI tools in 20 minutes for about $3 in API credits.
          </p>
          <p className="text-gray-400 leading-relaxed text-lg font-light">
            The AI version looked technically impressive but emotionally flat. No soul. No tension. No happy accident. That's the story of AI in creative production right now — and that's exactly what I write about here.
          </p>
          <p className="text-gray-400 leading-relaxed text-lg font-light">
            Open Your AIs isn't another tech blog regurgitating press releases. It's the perspective of someone who's been in the trenches of professional production for 14 years and now works at the intersection of <strong className="text-white">human creativity and artificial intelligence</strong>. Every review, every analysis, every opinion comes from real experience — not theory.
          </p>
        </div>
      </div>

      {/* What We Cover */}
      <div className="mb-24">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-12 text-center">What We Cover</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-10">
            <div className="w-16 h-16 mx-auto bg-cyber-primary/10 rounded-2xl flex items-center justify-center mb-6 text-cyber-primary border border-cyber-primary/20">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white mb-4 uppercase">AI in Production</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Honest reviews of AI tools from a working director's perspective. What actually works in professional workflows — and what's just demo reel material.</p>
          </Card>
          <Card className="text-center p-10">
            <div className="w-16 h-16 mx-auto bg-cyber-success/10 rounded-2xl flex items-center justify-center mb-6 text-cyber-success border border-cyber-success/20">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white mb-4 uppercase">The Hybrid Creator</h3>
            <p className="text-gray-400 text-sm leading-relaxed">How creative professionals are adapting to AI. What changes, what doesn't, and why human experience is more valuable than ever.</p>
          </Card>
          <Card className="text-center p-10">
            <div className="w-16 h-16 mx-auto bg-cyber-secondary/10 rounded-2xl flex items-center justify-center mb-6 text-cyber-secondary border border-cyber-secondary/20">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white mb-4 uppercase">Monetization &amp; Tech</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Real strategies for building income with AI and technology. No fake promises — just honest playbooks from someone figuring it out in public.</p>
          </Card>
        </div>
      </div>

      {/* Our Philosophy */}
      <div className="mb-24">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-12 text-center">Our Philosophy</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 bg-white/[0.02] rounded-[32px] border border-white/5">
            <h3 className="text-lg font-black text-cyber-primary mb-3 uppercase">AI Amplifies, Doesn't Replace</h3>
            <p className="text-gray-400 text-sm leading-relaxed">14 years of directing taught me that creative judgment can't be automated. AI handles the heavy lifting; humans make the decisions that matter.</p>
          </div>
          <div className="p-8 bg-white/[0.02] rounded-[32px] border border-white/5">
            <h3 className="text-lg font-black text-cyber-primary mb-3 uppercase">Honest Reviews Only</h3>
            <p className="text-gray-400 text-sm leading-relaxed">If a tool is impressive, I'll say so. If it's overhyped, I'll say that too. Every review comes from actual professional use, not press releases.</p>
          </div>
          <div className="p-8 bg-white/[0.02] rounded-[32px] border border-white/5">
            <h3 className="text-lg font-black text-cyber-primary mb-3 uppercase">Experience Over Theory</h3>
            <p className="text-gray-400 text-sm leading-relaxed">I've directed for Disney and Starbucks. I've written comedy for MTV. I edit, grade, and deliver. When I review AI tools, it's from inside the craft.</p>
          </div>
          <div className="p-8 bg-white/[0.02] rounded-[32px] border border-white/5">
            <h3 className="text-lg font-black text-cyber-primary mb-3 uppercase">The Hybrid Future</h3>
            <p className="text-gray-400 text-sm leading-relaxed">The future isn't AI vs. Human. It's Human + AI vs. Everyone Else. We document that future from the front lines.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
        <div className="p-8 bg-white/[0.02] rounded-[32px] border border-white/5 text-center">
          <p className="text-cyber-primary font-black text-4xl mb-2 italic">14+</p>
          <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.3em]">Years in Production</p>
        </div>
        <div className="p-8 bg-white/[0.02] rounded-[32px] border border-white/5 text-center">
          <p className="text-cyber-secondary font-black text-4xl mb-2 italic">50+</p>
          <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.3em]">Articles Published</p>
        </div>
        <div className="p-8 bg-white/[0.02] rounded-[32px] border border-white/5 text-center">
          <p className="text-cyber-success font-black text-4xl mb-2 italic">10+</p>
          <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.3em]">AI Tools Tested</p>
        </div>
        <div className="p-8 bg-white/[0.02] rounded-[32px] border border-white/5 text-center">
          <p className="text-white font-black text-4xl mb-2 italic">100%</p>
          <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.3em]">Real Experience</p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center p-12 bg-gradient-to-br from-cyber-primary/10 to-transparent border border-cyber-primary/20 rounded-[48px]">
        <h2 className="text-2xl font-black text-white mb-4 uppercase">Get in Touch</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">Have questions, feedback, or partnership inquiries? We'd love to hear from you.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-cyber-primary text-cyber-bg font-black rounded-full hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all uppercase tracking-widest text-xs">
          <Mail className="w-4 h-4" /> Contact Us
        </Link>
      </div>
    </div>
  );
};

// --- CONTACT PAGE ---
export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact Us | Open Your AIs";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open mailto with form data
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(formData.subject || 'Contact from OpenYourAIs.com')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setIsSubmitted(true);
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Open Your AIs",
    "description": "Get in touch with the Open Your AIs team for questions, feedback, or partnership inquiries.",
    "url": "https://www.openyourais.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Open Your AIs",
      "email": CONTACT_EMAIL,
      "url": "https://www.openyourais.com"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.openyourais.com/" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.openyourais.com/contact" }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <Helmet>
        <title>Contact Us | Open Your AIs</title>
        <meta name="description" content="Contact the Open Your AIs team. Send us your questions, feedback, or partnership inquiries about AI, cryptocurrency, and digital monetization." />
        <link rel="canonical" href="https://www.openyourais.com/contact" />
        <meta property="og:title" content="Contact Us | Open Your AIs" />
        <meta property="og:description" content="Get in touch with the Open Your AIs team for questions, feedback, or partnership inquiries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.openyourais.com/contact" />
        <meta name="twitter:title" content="Contact Us | Open Your AIs" />
        <meta name="twitter:description" content="Get in touch with the Open Your AIs team." />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
          <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li className="text-cyber-primary" aria-current="page">Contact</li>
        </ol>
      </nav>

      <SectionTitle title="Contact Us" subtitle="Have questions, feedback, or partnership inquiries? We'd love to hear from you." />
      
      <h1 className="sr-only">Contact Open Your AIs - Get in Touch</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="p-10 rounded-[48px]">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto bg-cyber-success/10 rounded-2xl flex items-center justify-center mb-6 text-cyber-success border border-cyber-success/20">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white mb-4 uppercase">Message Sent</h3>
              <p className="text-gray-400 text-sm">Your email client should have opened with the message. If not, please email us directly at <a href={`mailto:${CONTACT_EMAIL}`} className="text-cyber-primary hover:underline">{CONTACT_EMAIL}</a>.</p>
              <button onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }} className="mt-8 px-8 py-3 border border-white/10 text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6">Send a Message</h2>
              <div>
                <label htmlFor="contact-name" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Your Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyber-primary transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Your Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyber-primary transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyber-primary transition-all"
                  placeholder="General Inquiry"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Message *</label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-cyber-primary transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-cyber-primary text-cyber-bg font-black rounded-xl uppercase tracking-widest text-xs hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </Card>

        {/* Contact Info */}
        <div className="space-y-8">
          <Card className="p-8 rounded-[32px]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-cyber-primary/10 rounded-xl flex items-center justify-center text-cyber-primary border border-cyber-primary/20">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-black uppercase text-sm">Email</h3>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-cyber-primary text-sm hover:underline">{CONTACT_EMAIL}</a>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">For general inquiries, feedback, corrections, or partnership proposals. We typically respond within 24-48 hours.</p>
          </Card>

          <Card className="p-8 rounded-[32px]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-cyber-secondary/10 rounded-xl flex items-center justify-center text-cyber-secondary border border-cyber-secondary/20">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-black uppercase text-sm">Website</h3>
                <span className="text-cyber-secondary text-sm">www.openyourais.com</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">Browse our full library of AI tools, monetization playbooks, crypto guides, and technology articles.</p>
          </Card>

          <Card className="p-8 rounded-[32px]">
            <h3 className="text-white font-black uppercase text-sm mb-4">Common Inquiries</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-cyber-success mt-0.5 flex-shrink-0" /> Content corrections or updates</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-cyber-success mt-0.5 flex-shrink-0" /> Advertising and sponsorship inquiries</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-cyber-success mt-0.5 flex-shrink-0" /> Guest post and collaboration proposals</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-cyber-success mt-0.5 flex-shrink-0" /> Technical feedback and suggestions</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-cyber-success mt-0.5 flex-shrink-0" /> Privacy and data-related requests</li>
            </ul>
          </Card>
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
              <span><strong className="text-white">Enable Sovereignty:</strong> Provide the knowledge and tools necessary for digital independenceâ€”whether through AI-powered workflows, decentralized finance, or automated revenue systems.</span>
            </li>
          </ul>
        </div>
      </Card>

      {/* Content Standards */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <Card className="p-10 text-center border-b-4 border-b-cyber-primary">
          <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4">AI Intelligence</h4>
          <p className="text-gray-400 text-sm leading-relaxed">Deep technical analysis of Large Language Models, generative AI tools, and autonomous agent frameworks. From GPT-4 to Claude, from Midjourney to Runwayâ€”we test, compare, and explain.</p>
        </Card>
        <Card className="p-10 text-center border-b-4 border-b-cyber-secondary">
          <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4">Digital Capital</h4>
          <p className="text-gray-400 text-sm leading-relaxed">Battle-tested monetization playbooks leveraging automation and AI. Not theoryâ€”practical frameworks with verified ROI, timeline estimates, and step-by-step execution guides.</p>
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
            <p className="text-gray-400 leading-relaxed">We actively engage with our community through comments, social media, and direct email. Reader corrections and suggestions are not just welcomedâ€”they're essential to maintaining accuracy in a rapidly changing field.</p>
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

// --- LEGAL PAGES ---
export const LegalPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  useEffect(() => {
    document.title = type === 'privacy' ? "Privacy Policy | Open Your AIs" : "Terms of Service | Open Your AIs";
  }, [type]);

  const pageTitle = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  const pageUrl = type === 'privacy' ? 'https://www.openyourais.com/privacy' : 'https://www.openyourais.com/terms';
  const pageDescription = type === 'privacy'
    ? 'Read the Open Your AIs Privacy Policy. Learn how we collect, use, and protect your personal information when you visit our website.'
    : 'Read the Open Your AIs Terms of Service. Understand the rules and guidelines for using our website and content.';

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.openyourais.com/" },
      { "@type": "ListItem", "position": 2, "name": pageTitle, "item": pageUrl }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <Helmet>
        <title>{pageTitle} | Open Your AIs</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={`${pageTitle} | Open Your AIs`} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:title" content={`${pageTitle} | Open Your AIs`} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
          <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
          <li><ChevronRight className="w-3 h-3" /></li>
          <li className="text-cyber-primary" aria-current="page">{pageTitle}</li>
        </ol>
      </nav>

      <SectionTitle title={pageTitle} />
      <h1 className="sr-only">{pageTitle} - Open Your AIs</h1>
      <Card className="p-10 md:p-16 rounded-[48px] border-white/5 bg-white/[0.01]">
        <div className="prose prose-invert max-w-none text-gray-400 font-light">
          <p className="text-cyber-primary font-black uppercase tracking-[0.3em] text-[10px] mb-16 italic underline decoration-cyber-primary/30 underline-offset-8">Last Updated: February 19, 2026</p>
          {type === 'privacy' ? (
            <div className="space-y-12">
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">1. Introduction</h2>
                <p className="leading-relaxed">Open Your AIs ("we," "our," or "us") operates the website <a href="https://www.openyourais.com" className="text-cyber-primary hover:underline">www.openyourais.com</a> (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. By using the Service, you agree to the collection and use of information in accordance with this policy.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">2. Information We Collect</h2>
                <h3 className="text-gray-200 font-bold text-lg mb-3">2.1 Automatically Collected Information</h3>
                <p className="leading-relaxed mb-4">When you visit our website, we may automatically collect certain information about your device, including your IP address, browser type, operating system, referring URLs, and pages visited. This data is collected through Google Analytics (GA4) to help us understand how visitors use our site and improve our content.</p>
                <h3 className="text-gray-200 font-bold text-lg mb-3">2.2 Cookies and Tracking Technologies</h3>
                <p className="leading-relaxed mb-4">We use cookies and similar tracking technologies to track activity on our Service. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                <h3 className="text-gray-200 font-bold text-lg mb-3">2.3 Newsletter Subscription</h3>
                <p className="leading-relaxed">If you subscribe to our newsletter, we collect your email address. This information is used solely to send you our newsletter and will not be shared with third parties.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">3. How We Use Your Information</h2>
                <p className="leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>Operate, maintain, and improve our website</li>
                  <li>Understand and analyze usage trends and preferences</li>
                  <li>Send newsletters and updates (with your consent)</li>
                  <li>Display relevant advertisements through Google AdSense</li>
                  <li>Monitor and analyze the effectiveness of our content</li>
                  <li>Detect, prevent, and address technical issues</li>
                </ul>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">4. Google AdSense &amp; Advertising</h2>
                <p className="leading-relaxed mb-4">We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</p>
                <p className="leading-relaxed">You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-cyber-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. Alternatively, you can opt out of third-party vendor cookies by visiting the <a href="https://www.aboutads.info/choices/" className="text-cyber-primary hover:underline" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance opt-out page</a>.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">5. Google Analytics</h2>
                <p className="leading-relaxed">We use Google Analytics 4 (GA4) to monitor and analyze web traffic. Google Analytics collects data such as how often users visit the site, what pages they visit, and what other sites they used prior to coming to our site. We use this information to improve our Service. Google Analytics collects only the IP address assigned to you on the date you visit our site, rather than your name or other identifying information.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">6. Third-Party Links</h2>
                <p className="leading-relaxed">Our website may contain links to third-party websites, including affiliate links. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to read the privacy policies of any third-party site you visit.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">7. Data Security</h2>
                <p className="leading-relaxed">We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">8. Children's Privacy</h2>
                <p className="leading-relaxed">Our Service is not directed to anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete it immediately.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">9. Your Rights</h2>
                <p className="leading-relaxed mb-4">Depending on your location, you may have the following rights regarding your personal data:</p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>The right to access the personal data we hold about you</li>
                  <li>The right to request correction of inaccurate data</li>
                  <li>The right to request deletion of your data</li>
                  <li>The right to opt out of marketing communications</li>
                  <li>The right to lodge a complaint with a supervisory authority</li>
                </ul>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">10. Changes to This Policy</h2>
                <p className="leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">11. Contact Us</h2>
                <p className="leading-relaxed">If you have any questions about this Privacy Policy, please contact us at: <a href={`mailto:${CONTACT_EMAIL}`} className="text-cyber-primary hover:underline">{CONTACT_EMAIL}</a></p>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">1. Acceptance of Terms</h2>
                <p className="leading-relaxed">By accessing and using Open Your AIs (<a href="https://www.openyourais.com" className="text-cyber-primary hover:underline">www.openyourais.com</a>), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">2. Description of Service</h2>
                <p className="leading-relaxed">Open Your AIs is a technology intelligence platform that provides educational content about artificial intelligence, cryptocurrency, blockchain technology, and digital monetization strategies. Our content includes articles, tool reviews, playbooks, and guides.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">3. Educational Disclaimer</h2>
                <p className="leading-relaxed mb-4">All information provided on Open Your AIs is for <strong className="text-white">educational and informational purposes only</strong>. We are not financial advisors, investment advisors, or legal professionals. The content on this website should not be construed as:</p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>Financial advice or investment recommendations</li>
                  <li>Legal or tax advice</li>
                  <li>A guarantee of any specific results or outcomes</li>
                  <li>An endorsement of any specific product, service, or investment</li>
                </ul>
                <p className="leading-relaxed mt-4">Cryptocurrency investments and AI-based business ventures involve significant risk. Always conduct your own research and consult with qualified professionals before making financial decisions.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">4. Intellectual Property</h2>
                <p className="leading-relaxed mb-4">All content on Open Your AIs, including but not limited to text, graphics, logos, images, and software, is the property of Open Your AIs and is protected by intellectual property laws. You may:</p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>View and read content for personal, non-commercial use</li>
                  <li>Share links to our content on social media</li>
                  <li>Quote brief excerpts with proper attribution and a link back to the original article</li>
                </ul>
                <p className="leading-relaxed mt-4">You may not reproduce, distribute, modify, or create derivative works from our content without prior written permission.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">5. User Conduct</h2>
                <p className="leading-relaxed mb-4">When using our website, you agree not to:</p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>Use the Service for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Scrape, crawl, or use automated means to access the Service without permission</li>
                  <li>Transmit any viruses, malware, or harmful code</li>
                </ul>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">6. Third-Party Links &amp; Affiliate Disclosure</h2>
                <p className="leading-relaxed mb-4">Our website may contain links to third-party websites and services. Some of these links may be affiliate links, meaning we may earn a commission if you make a purchase through them, at no additional cost to you.</p>
                <p className="leading-relaxed">We are not responsible for the content, privacy policies, or practices of any third-party websites. We encourage you to review the terms and privacy policies of any third-party site you visit.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">7. Limitation of Liability</h2>
                <p className="leading-relaxed">To the fullest extent permitted by applicable law, Open Your AIs shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses, resulting from your use of or inability to use the Service.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">8. Accuracy of Information</h2>
                <p className="leading-relaxed">While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, reliability, or completeness of any content on our website. Technology and market conditions change rapidly, and information may become outdated. We encourage users to verify information independently.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">9. Modifications to Terms</h2>
                <p className="leading-relaxed">We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of the Service after any changes constitutes acceptance of the new terms.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">10. Governing Law</h2>
                <p className="leading-relaxed">These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</p>
              </section>
              <section>
                <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-6">11. Contact Us</h2>
                <p className="leading-relaxed">If you have any questions about these Terms of Service, please contact us at: <a href={`mailto:${CONTACT_EMAIL}`} className="text-cyber-primary hover:underline">{CONTACT_EMAIL}</a></p>
              </section>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
