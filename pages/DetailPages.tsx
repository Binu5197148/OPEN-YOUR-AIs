
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Calendar, Clock, User, DollarSign, Target, ShieldCheck, ChevronRight, Mail, Globe, Award, BookOpen, Shield, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Card, SectionTitle, AdUnit, SmartImage } from '../components/Components';
import { ARTICLES, PLAYBOOKS, CRYPTO_GUIDES, CONTACT_EMAIL } from '../constants';

// --- NOT FOUND PAGE (404) ---
export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = "404 Not Found | Open Your AIs";
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary mb-4 animate-pulse">404</h1>
      <h2 className="text-2xl text-white mb-6">Page Not Found in Neural Net</h2>
      <p className="text-gray-400 mb-8 max-w-md">The requested data fragment could not be retrieved. It may have been deleted or moved to a different sector.</p>
      <Link to="/" className="px-8 py-3 bg-cyber-primary text-black font-bold rounded hover:bg-white transition-colors">
        Return to Base
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
      <SectionTitle title="HTML Sitemap" subtitle="Index of all content on the platform." />
      <Card>
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="text-cyber-primary font-bold mb-4 border-b border-gray-700 pb-2">Main Pages</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/tools" className="hover:text-white">AI Tools Directory</Link></li>
              <li><Link to="/playbooks" className="hover:text-white">Monetization Playbooks</Link></li>
              <li><Link to="/crypto" className="hover:text-white">Crypto Intelligence</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog & News</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Use</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-cyber-primary font-bold mb-4 border-b border-gray-700 pb-2">Playbooks</h3>
            <ul className="space-y-2 text-gray-400">
              {PLAYBOOKS.map(p => (
                <li key={p.id}><Link to={`/playbooks/${p.id}`} className="hover:text-white">{p.title}</Link></li>
              ))}
            </ul>
            <h3 className="text-cyber-primary font-bold mb-4 border-b border-gray-700 pb-2 mt-8">Crypto Guides</h3>
            <ul className="space-y-2 text-gray-400">
              {CRYPTO_GUIDES.map(g => (
                <li key={g.id}><Link to={`/crypto/${g.id}`} className="hover:text-white">{g.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-cyber-primary font-bold mb-4 border-b border-gray-700 pb-2">Latest Articles</h3>
            <ul className="space-y-2 text-gray-400">
              {ARTICLES.map(a => (
                <li key={a.id}><Link to={`/blog/${a.slug}`} className="hover:text-white">{a.title}</Link></li>
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
  const article = ARTICLES.find(a => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (article) {
      document.title = `${article.title} | Open Your AIs Intelligence`;
    }
  }, [slug, article]);

  if (!article) {
    return <NotFoundPage />;
  }

  const relatedArticles = ARTICLES
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 4);

  return (
    <article className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors text-xs font-black uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 mr-2" /> Neural Feed
          </Link>
          
          <header className="mb-10">
            <div className="flex items-center gap-4 mb-6">
               <span className="px-4 py-1.5 text-[10px] font-black tracking-widest text-cyber-bg bg-cyber-primary rounded-sm uppercase">
                {article.category}
              </span>
              <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3 h-3" /> {article.readTime} reading
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 p-6 bg-white/[0.03] rounded-2xl border border-white/5 mb-8">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyber-primary to-cyber-secondary flex items-center justify-center font-black text-cyber-bg text-xl">
                    OA
                  </div>
                  <div>
                    <p className="text-sm font-black text-white uppercase tracking-tighter">Editorial Intelligence Team</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Verified Technical Analyst</p>
                  </div>
               </div>
               <div className="h-8 w-px bg-white/10 hidden md:block"></div>
               <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Last Update</p>
                  <p className="text-xs text-white font-bold">{article.date}</p>
               </div>
               <div className="ml-auto flex gap-2">
                  <button className="p-2 bg-white/5 hover:bg-cyber-primary hover:text-black rounded-full transition-all border border-white/5"><Twitter className="w-4 h-4" /></button>
                  <button className="p-2 bg-white/5 hover:bg-cyber-secondary hover:text-white rounded-full transition-all border border-white/5"><Facebook className="w-4 h-4" /></button>
               </div>
            </div>
          </header>

          <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl relative group">
             <SmartImage src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent opacity-60"></div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="p-8 bg-cyber-primary/5 border-l-4 border-cyber-primary rounded-r-2xl mb-12 text-gray-200 text-xl font-light leading-relaxed italic">
               "{article.excerpt}"
            </div>
            
            <AdUnit slot="article-top" />
            
            <div className="article-content leading-relaxed space-y-8 text-gray-300 font-normal" dangerouslySetInnerHTML={{ __html: article.content }} />
            
            <AdUnit slot="article-bottom" />
          </div>

          {/* Author Box - Critical for E-E-A-T */}
          <div className="mt-20 p-10 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><Award className="w-24 h-24" /></div>
             <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">Editorial Standards</h3>
             <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-24 h-24 rounded-2xl bg-cyber-primary/20 flex items-center justify-center flex-shrink-0 border border-cyber-primary/30">
                   <ShieldCheck className="w-12 h-12 text-cyber-primary" />
                </div>
                <div>
                   <p className="text-white font-black text-lg mb-3 uppercase tracking-tighter">Open Your AIs Intelligence Division</p>
                   <p className="text-gray-400 leading-relaxed text-sm mb-4">
                     This intelligence report was compiled by our multi-disciplinary team of blockchain architects, AI researchers, and financial analysts. Every data point is cross-referenced with primary sources to ensure the highest fidelity of information. Our mission is to provide objective, actionable data for the modern technologist.
                   </p>
                   <div className="flex gap-4">
                      <span className="flex items-center gap-1 text-[10px] font-black text-cyber-primary uppercase tracking-widest"><CheckCircle className="w-3 h-3"/> Fact-Checked</span>
                      <span className="flex items-center gap-1 text-[10px] font-black text-cyber-secondary uppercase tracking-widest"><Globe className="w-3 h-3"/> Global Data</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
        
        <aside className="lg:w-1/3 space-y-10">
           <div className="sticky top-24">
              <div className="mb-10">
                 <h4 className="font-black text-white uppercase tracking-[0.2em] text-[10px] mb-6 border-b border-white/10 pb-2">Trending Intel</h4>
                 <div className="space-y-6">
                    {relatedArticles.map(rel => (
                      <Link to={`/blog/${rel.slug}`} key={rel.id} className="block group">
                         <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/5 bg-gray-900">
                               <SmartImage src={rel.image} alt={rel.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <div className="flex flex-col justify-center">
                               <h5 className="text-sm font-black text-gray-300 group-hover:text-cyber-primary transition-colors line-clamp-2 uppercase leading-tight tracking-wide">{rel.title}</h5>
                               <span className="text-[9px] font-black text-gray-600 mt-2 uppercase tracking-widest">{rel.category}</span>
                            </div>
                         </div>
                      </Link>
                    ))}
                 </div>
              </div>

              <AdUnit slot="sidebar-ad" className="mb-10" />
              
              <Card className="bg-cyber-primary/5 border-cyber-primary/20 p-8">
                 <h4 className="font-black text-white mb-4 uppercase tracking-widest text-xs">Join the Network</h4>
                 <p className="text-xs text-gray-500 mb-6 leading-relaxed">Receive high-frequency updates on AI breakthroughs and market shifts.</p>
                 <input type="email" placeholder="NEURAL_ID@EMAIL.COM" className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-[10px] focus:outline-none focus:border-cyber-primary mb-3 uppercase font-black" />
                 <button className="w-full py-3 bg-cyber-primary text-cyber-bg font-black rounded-lg text-xs uppercase tracking-widest hover:brightness-110 transition-all">Subscribe</button>
              </Card>
           </div>
        </aside>
      </div>
    </article>
  );
};

// --- PLAYBOOK READER ---
// Fixed: Added PlaybookReader component to handle playbook detail views
export const PlaybookReader: React.FC = () => {
  const { id } = useParams();
  const playbook = PLAYBOOKS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (playbook) {
      document.title = `${playbook.title} | Playbook`;
    }
  }, [id, playbook]);

  if (!playbook) {
    return <NotFoundPage />;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/playbooks" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors text-xs font-black uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4 mr-2" /> All Playbooks
      </Link>
      
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight leading-tight">
          {playbook.title}
        </h1>
        <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest">
           <div className="flex items-center gap-2 text-cyber-secondary px-4 py-2 bg-cyber-secondary/5 rounded-lg border border-cyber-secondary/20">
              <DollarSign className="w-4 h-4" /> ROI: {playbook.roi}
           </div>
           <div className="flex items-center gap-2 text-gray-400 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
              <Clock className="w-4 h-4" /> Timeline: {playbook.timeline}
           </div>
           <div className={`px-4 py-2 rounded-lg border ${playbook.difficulty === 'Easy' ? 'border-green-500/30 text-green-500 bg-green-500/5' : playbook.difficulty === 'Medium' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/5' : 'border-red-500/30 text-red-500 bg-red-500/5'}`}>
              DIFFICULTY: {playbook.difficulty}
           </div>
        </div>
      </header>

      {playbook.image && (
        <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10">
          <SmartImage src={playbook.image} alt={playbook.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose prose-invert prose-lg max-w-none">
        <div className="p-8 bg-cyber-secondary/5 border-l-4 border-cyber-secondary rounded-r-2xl mb-12 text-gray-300 italic">
           {playbook.tldr}
        </div>
        <div className="article-content leading-relaxed space-y-8 text-gray-300" dangerouslySetInnerHTML={{ __html: playbook.content || '' }} />
      </div>
      
      <AdUnit slot="playbook-footer" className="mt-12" />
    </div>
  );
};

// --- CRYPTO READER ---
// Fixed: Added CryptoReader component to handle crypto guide detail views
export const CryptoReader: React.FC = () => {
  const { id } = useParams();
  const guide = CRYPTO_GUIDES.find(g => g.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (guide) {
      document.title = `${guide.title} | Crypto Intel`;
    }
  }, [id, guide]);

  if (!guide) {
    return <NotFoundPage />;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/crypto" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors text-xs font-black uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4 mr-2" /> Crypto Hub
      </Link>
      
      <header className="mb-12">
        <div className="inline-block px-3 py-1 bg-cyber-success/10 border border-cyber-success/30 text-cyber-success text-[10px] font-black uppercase tracking-[0.2em] rounded mb-4">
          {guide.level} LEVEL INTEL
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight leading-tight">
          {guide.title}
        </h1>
        <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl">{guide.summary}</p>
      </header>

      <Card className="p-10 mb-12 bg-gradient-to-br from-cyber-bg to-white/[0.03] border-white/5">
         <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 leading-relaxed whitespace-pre-wrap">{guide.content}</p>
         </div>
      </Card>
      
      <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-2xl mb-12">
        <div className="flex items-start gap-4">
          <Shield className="text-red-500 w-6 h-6 flex-shrink-0" />
          <p className="text-xs text-gray-400">
            <strong>Security Disclaimer:</strong> Digital asset management involves significant risk. This intelligence is provided for educational purposes only and does not constitute financial advice. Always verify smart contract addresses and maintain multi-factor authentication on all exchange and wallet platforms.
          </p>
        </div>
      </div>

      <AdUnit slot="crypto-guide-footer" />
    </div>
  );
};

// --- ABOUT PAGE (High Authority Manifesto) ---
export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "About Our Intelligence Hub | Open Your AIs";
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <SectionTitle title="The Neural Frontier Manifesto" subtitle="Architecting human-centric technical education for the 21st century." />
      
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
         <div className="relative">
            <div className="absolute -inset-6 bg-cyber-primary/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
            <SmartImage src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" alt="Platform Vision" className="rounded-3xl border border-white/10 relative z-10 shadow-2xl" />
         </div>
         <div className="space-y-8">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Who We Are</h3>
            <p className="text-gray-400 leading-relaxed text-lg font-light">
               Open Your AIs is a premier technical intelligence hub dedicated to demystifying the intersection of Artificial Intelligence, Blockchain technology, and Digital Economics. We operate at the bleeding edge of the information economy, providing high-fidelity analysis that bypasses the noise of mainstream media.
            </p>
            <div className="grid grid-cols-2 gap-6">
               <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                  <p className="text-cyber-primary font-black text-3xl mb-1">40+</p>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Active Intel Nodes</p>
               </div>
               <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5">
                  <p className="text-cyber-secondary font-black text-3xl mb-1">100%</p>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Fact-Checked Accuracy</p>
               </div>
            </div>
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
         <Card className="text-center p-10 border-b-2 border-cyber-primary">
            <BookOpen className="w-12 h-12 text-cyber-primary mx-auto mb-6" />
            <h4 className="font-black text-white mb-4 uppercase tracking-widest">High-Fidelity Intel</h4>
            <p className="text-sm text-gray-400 leading-relaxed">Our researchers specialize in technical documentation and whitepaper analysis, bringing you the core truths of every project.</p>
         </Card>
         <Card className="text-center p-10 border-b-2 border-cyber-success">
            <Shield className="w-12 h-12 text-cyber-success mx-auto mb-6" />
            <h4 className="font-black text-white mb-4 uppercase tracking-widest">Security Focused</h4>
            <p className="text-sm text-gray-400 leading-relaxed">In an era of digital volatility, we prioritize asset protection and secure protocols above speculative gains.</p>
         </Card>
         <Card className="text-center p-10 border-b-2 border-cyber-secondary">
            <Globe className="w-12 h-12 text-cyber-secondary mx-auto mb-6" />
            <h4 className="font-black text-white mb-4 uppercase tracking-widest">Global Reach</h4>
            <p className="text-sm text-gray-400 leading-relaxed">Digital wealth knows no borders. We empower a global community of innovators with universal tools.</p>
         </Card>
      </div>

      <div className="bg-gradient-to-br from-cyber-bg to-white/[0.05] border border-white/10 p-12 rounded-[40px] text-center">
         <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-widest">Editorial Inquiries</h3>
            <p className="text-gray-400 mb-10 text-lg">Have a technical tip, a press release, or an inquiry regarding our data sets? Connect with our analytical lead.</p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
               <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center justify-center gap-3 px-10 py-5 bg-cyber-primary text-cyber-bg font-black rounded-full hover:shadow-[0_0_25px_#00E5FF] transition-all uppercase tracking-widest text-sm">
                  <Mail className="w-5 h-5" /> {CONTACT_EMAIL}
               </a>
               <div className="flex items-center justify-center gap-3 px-10 py-5 border border-white/10 rounded-full text-white font-black uppercase tracking-widest text-sm bg-white/5">
                  <Globe className="w-5 h-5" /> Verified HQ
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- LEGAL PAGES (Privacy & Terms) ---
export const LegalPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  useEffect(() => {
    document.title = type === 'privacy' ? "Privacy Policy | Open Your AIs" : "Terms of Use | Open Your AIs";
  }, [type]);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <SectionTitle title={type === 'privacy' ? 'Data Sovereignty & Privacy' : 'Platform Terms of Use'} />
      <Card className="p-12 leading-relaxed text-gray-300">
        <div className="prose prose-invert max-w-none">
          <p className="text-cyber-primary font-black uppercase tracking-widest text-xs mb-8">Platform Protocol V1.0 - Dec 2025</p>
          
          {type === 'privacy' ? (
            <div className="space-y-12">
              <section>
                <h3 className="text-white font-black text-xl uppercase tracking-widest border-l-4 border-cyber-primary pl-6 mb-4">1. Information Architecture</h3>
                <p>Open Your AIs operates on a principle of data minimization. We collect only the telemetry data necessary to optimize your educational journey. This includes site navigation metrics via Google Analytics and secure ad-serving preferences via the Google AdSense network.</p>
              </section>
              <section>
                <h3 className="text-white font-black text-xl uppercase tracking-widest border-l-4 border-cyber-primary pl-6 mb-4">2. Technical Cookies</h3>
                <p>We utilize browser-based cookies to maintain session integrity, personalize interface preferences, and analyze neural traffic patterns. By continuing to navigate this platform, you consent to our use of these optimization fragments as detailed in our Cookie Policy.</p>
              </section>
              <section>
                <h3 className="text-white font-black text-xl uppercase tracking-widest border-l-4 border-cyber-primary pl-6 mb-4">3. AdSense Compliance Disclosure</h3>
                <p>In accordance with Google AdSense program policies, we disclose that third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</p>
              </section>
              <section>
                <h3 className="text-white font-black text-xl uppercase tracking-widest border-l-4 border-cyber-primary pl-6 mb-4">4. Global Compliance</h3>
                <p>We adhere to the highest international standards of data protection. For any inquiries regarding your data rights or to request a deletion of your digital history, please transmit your request to: {CONTACT_EMAIL}.</p>
              </section>
            </div>
          ) : (
            <div className="space-y-12">
              <section>
                <h3 className="text-white font-black text-xl uppercase tracking-widest border-l-4 border-cyber-secondary pl-6 mb-4">1. Educational Purpose</h3>
                <p>All data and intelligence provided on Open Your AIs are for strictly educational and informational purposes. We are an intelligence publisher, not a financial advisor. Nothing on this platform constitutes professional financial, legal, or investment advice.</p>
              </section>
              <section>
                <h3 className="text-white font-black text-xl uppercase tracking-widest border-l-4 border-cyber-secondary pl-6 mb-4">2. Intellectual Property Protocols</h3>
                <p>The code architecture, design systems, and original editorial content of this platform are protected under global copyright law. Unauthorized extraction or reproduction of our intellectual assets is a violation of these terms.</p>
              </section>
              <section>
                <h3 className="text-white font-black text-xl uppercase tracking-widest border-l-4 border-cyber-secondary pl-6 mb-4">3. Risk Acknowledgement</h3>
                <p>Digital asset management involves significant technical and financial risk. Open Your AIs is not liable for any financial losses or system failures resulting from the implementation of strategies discussed herein. Users must perform their own due diligence.</p>
              </section>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// Internal Helper for DetailPages.tsx
const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
