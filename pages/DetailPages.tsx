
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Calendar, Clock, User, DollarSign, Target, ShieldCheck, ChevronRight } from 'lucide-react';
import { Card, SectionTitle, AdUnit, SmartImage } from '../components/Components';
import { ARTICLES, PLAYBOOKS, CRYPTO_GUIDES } from '../constants';

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
      document.title = `${article.title} | Open Your AIs`;
    }
  }, [slug, article]);

  if (!article) {
    return <NotFoundPage />;
  }

  // Find related articles (same category, excluding current)
  const relatedArticles = ARTICLES
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 2);

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
      </Link>
      
      <header className="mb-12 text-center">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-cyber-bg bg-cyber-primary rounded-full uppercase">
          {article.category}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
           <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.date}</div>
           <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime}</div>
           <div className="flex items-center gap-2"><User className="w-4 h-4" /> Editorial Team</div>
        </div>
      </header>

      <div className="w-full h-[400px] rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
         <SmartImage src={article.image} alt={article.title} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="lead text-xl text-gray-300 mb-8 font-light italic border-l-4 border-cyber-primary pl-4">
            {article.excerpt}
          </p>
          
          <AdUnit slot="article-top" />
          
          {/* Rendering the HTML content safely */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
          
          <AdUnit slot="article-middle" />
        </div>
        
        {/* Sidebar */}
        <aside className="space-y-8">
           <div className="sticky top-24">
              <Card className="mb-6">
                <h4 className="font-bold text-white mb-4">Share this Article</h4>
                <div className="flex gap-2">
                   <button className="p-2 bg-blue-600 rounded hover:bg-blue-700 text-white"><Share2 className="w-4 h-4"/></button>
                   {/* Mock Social Buttons */}
                   <button className="p-2 bg-sky-500 rounded hover:bg-sky-600 text-white font-bold text-xs flex items-center">TW</button>
                   <button className="p-2 bg-blue-800 rounded hover:bg-blue-900 text-white font-bold text-xs flex items-center">FB</button>
                </div>
              </Card>
              
              <AdUnit slot="sidebar-sticky" className="min-h-[300px]" />

              <div className="mt-8">
                <h4 className="font-bold text-white mb-4 text-sm uppercase">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400 border border-white/5 hover:border-cyber-primary/50 cursor-pointer transition-colors">{tag}</span>
                  ))}
                </div>
              </div>
           </div>
        </aside>
      </div>

      {/* Related Articles Section */}
      <div className="mt-20 border-t border-white/10 pt-12">
        <SectionTitle title="Related Articles" subtitle="Continue your learning journey." />
        <div className="grid md:grid-cols-2 gap-6">
          {relatedArticles.map(rel => (
            <Link to={`/blog/${rel.slug}`} key={rel.id}>
              <Card className="hover:border-cyber-primary/40 h-full">
                <h4 className="font-bold text-white text-lg mb-2">{rel.title}</h4>
                <p className="text-sm text-gray-400 line-clamp-2">{rel.excerpt}</p>
                <span className="text-xs text-cyber-primary mt-4 inline-block">Read More &rarr;</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
};

// --- PLAYBOOK READER ---
export const PlaybookReader: React.FC = () => {
  const { id } = useParams();
  const playbook = PLAYBOOKS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (playbook) {
      document.title = `${playbook.title} | Open Your AIs`;
    }
  }, [id, playbook]);

  if (!playbook) {
    return <NotFoundPage />;
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-5xl">
      <Link to="/playbooks" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Playbooks
      </Link>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <div>
           <header className="mb-8">
             <div className="flex items-center gap-3 mb-4">
               <span className="px-3 py-1 text-xs font-bold text-cyber-bg bg-cyber-secondary rounded-full uppercase">Playbook</span>
               <span className={`text-xs px-2 py-1 rounded border ${playbook.difficulty === 'Easy' ? 'border-green-500 text-green-500' : playbook.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-500' : 'border-red-500 text-red-500'}`}>
                 {playbook.difficulty} Difficulty
               </span>
             </div>
             <h1 className="text-4xl font-bold text-white mb-4">{playbook.title}</h1>
             <p className="text-xl text-gray-300 italic">{playbook.tldr}</p>
           </header>

           <div className="w-full h-[300px] rounded-xl overflow-hidden mb-8 border border-white/10">
              <SmartImage src={playbook.image || ''} alt={playbook.title} className="w-full h-full object-cover opacity-80" />
           </div>

           <div className="prose prose-invert prose-lg max-w-none">
             {/* Fallback if content isn't fully generated yet */}
             {playbook.content ? (
               <div dangerouslySetInnerHTML={{ __html: playbook.content }} />
             ) : (
               <div className="p-8 border border-dashed border-gray-600 rounded text-center">
                 <p>Detailed guide content is loading...</p>
               </div>
             )}
           </div>
        </div>

        {/* Sidebar stats */}
        <aside className="space-y-6">
           <Card className="border-cyber-secondary/30">
             <h3 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Metrics</h3>
             <div className="space-y-6">
               <div>
                  <div className="flex items-center gap-2 text-cyber-secondary mb-1">
                     <DollarSign className="w-5 h-5" /> <span className="font-bold">Estimated ROI</span>
                  </div>
                  <p className="text-2xl text-white font-bold">{playbook.roi}</p>
               </div>
               <div>
                  <div className="flex items-center gap-2 text-cyber-primary mb-1">
                     <Clock className="w-5 h-5" /> <span className="font-bold">Timeline</span>
                  </div>
                  <p className="text-2xl text-white font-bold">{playbook.timeline}</p>
               </div>
               <div>
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                     <Target className="w-5 h-5" /> <span className="font-bold">Key Focus</span>
                  </div>
                  <p className="text-sm text-gray-300">Execution Speed & Quality</p>
               </div>
             </div>
           </Card>
           <AdUnit slot="playbook-sidebar" />
        </aside>
      </div>
    </article>
  );
};

// --- CRYPTO READER ---
export const CryptoReader: React.FC = () => {
  const { id } = useParams();
  const guide = CRYPTO_GUIDES.find(g => g.id === id);
  // Get a random crypto image for the header since guides might not have one defined in the basic type, 
  // or use a reliable one based on ID to be consistent.
  const headerImage = "https://images.unsplash.com/photo-1621416894512-5363b933b243?auto=format&fit=crop&w=1200&q=80";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (guide) {
      document.title = `${guide.title} | Open Your AIs`;
    }
  }, [id, guide]);

  if (!guide) {
    return <NotFoundPage />;
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/crypto" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Crypto Hub
      </Link>

      <header className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-wider text-black bg-cyber-success rounded-full uppercase">
          <ShieldCheck className="w-3 h-3" /> {guide.level} Guide
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {guide.title}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{guide.summary}</p>
      </header>

      <div className="w-full h-[300px] rounded-2xl overflow-hidden mb-12 border border-cyber-success/20 shadow-[0_0_30px_rgba(0,230,128,0.1)]">
         <SmartImage src={headerImage} alt={guide.title} className="w-full h-full object-cover" />
      </div>

      <div className="prose prose-invert prose-lg max-w-none border-l-2 border-cyber-success/30 pl-6 md:pl-12">
        {/* Render HTML content */}
        <div dangerouslySetInnerHTML={{ __html: guide.content }} />
      </div>

      <div className="mt-16 bg-gray-900/50 p-8 rounded-2xl border border-gray-800 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to dive deeper?</h3>
        <p className="text-gray-400 mb-6">Explore our full list of tools to help you analyze the market.</p>
        <Link to="/tools" className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-primary text-black font-bold rounded hover:bg-white transition-colors">
          Explore Tools <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};

// --- ABOUT PAGE ---
export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "About Us | Open Your AIs";
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <SectionTitle title="About Open Your AIs" />
      <Card>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg">
            Welcome to <strong>Open Your AIs</strong>, your premier destination for navigating the convergence of Artificial Intelligence, Cryptocurrency, and Digital Economy.
          </p>
          <h3 className="text-white mt-6 mb-2 text-xl font-bold">Our Mission</h3>
          <p>
            We aim to democratize access to advanced technology knowledge. We believe that the tools of the future should not be reserved for the elite, but available to anyone willing to learn.
          </p>
          <h3 className="text-white mt-6 mb-2 text-xl font-bold">What We Offer</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Deep Dive Analysis:</strong> Original research on the latest AI models.</li>
            <li><strong>Monetization Playbooks:</strong> Step-by-step guides to turning skills into income.</li>
            <li><strong>Crypto Education:</strong> Safe, sane, and secure introduction to Web3.</li>
          </ul>
          <h3 className="text-white mt-6 mb-2 text-xl font-bold">Contact</h3>
          <p>
            Have questions or partnership inquiries? Reach out to us at <a href="mailto:openyourais888@gmail.com" className="text-cyber-primary hover:underline">openyourais888@gmail.com</a>.
          </p>
        </div>
      </Card>
    </div>
  );
};

// --- PRIVACY & TERMS ---
export const LegalPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  useEffect(() => {
    document.title = type === 'privacy' ? "Privacy Policy | Open Your AIs" : "Terms of Use | Open Your AIs";
  }, [type]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <SectionTitle title={type === 'privacy' ? 'Privacy Policy' : 'Terms of Use'} />
      <Card>
        <div className="prose prose-invert max-w-none text-sm text-gray-400">
          <p>Last Updated: October 26, 2024</p>
          {type === 'privacy' ? (
            <>
              <h3 className="text-white font-bold text-lg mt-4">1. Information Collection</h3>
              <p>We use Google Analytics and Google AdSense to analyze traffic and serve advertisements. These services may use cookies to collect anonymous data about your visit.</p>
              <h3 className="text-white font-bold text-lg mt-4">2. Cookies</h3>
              <p>Cookies are small text files stored on your device. You can disable them in your browser settings, though this may affect site functionality. We use cookies to personalize content and ads, to provide social media features and to analyze our traffic.</p>
              <h3 className="text-white font-bold text-lg mt-4">3. Data Protection</h3>
              <p>We do not sell your personal data to third parties. Data collected is used solely for improving user experience and site performance.</p>
              <h3 className="text-white font-bold text-lg mt-4">4. Contact</h3>
              <p>For privacy concerns, contact openyourais888@gmail.com.</p>
            </>
          ) : (
            <>
              <h3 className="text-white font-bold text-lg mt-4">1. Acceptance of Terms</h3>
              <p>By accessing this website, you agree to these terms. If you do not agree with any part of these terms, you must not use this website.</p>
              <h3 className="text-white font-bold text-lg mt-4">2. Educational Purpose</h3>
              <p>Content on this site is for educational purposes only. Nothing constitutes financial advice. Cryptocurrency investments and business ventures carry inherent risks.</p>
              <h3 className="text-white font-bold text-lg mt-4">3. Intellectual Property</h3>
              <p>All original content is property of Open Your AIs. You may not reproduce content without explicit permission.</p>
              <h3 className="text-white font-bold text-lg mt-4">4. Disclaimer</h3>
              <p>We make no warranties regarding the accuracy of information provided. Users are responsible for their own due diligence.</p>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};
