import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Calendar, Clock, User, DollarSign, Target, ShieldCheck, ChevronRight } from 'lucide-react';
import { Card, SectionTitle, AdUnit, SmartImage } from '../components/Components';
import { ARTICLES, PLAYBOOKS, CRYPTO_GUIDES } from '../constants';

export const NotFoundPage: React.FC = () => {
  useEffect(() => { document.title = "404 Not Found | Open Your AIs"; }, []);
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary mb-4 animate-pulse">404</h1>
      <h2 className="text-2xl text-white mb-6">Page Not Found</h2>
      <Link to="/" className="px-8 py-3 bg-cyber-primary text-black font-bold rounded hover:bg-white transition-colors">Return to Base</Link>
    </div>
  );
};

export const SitemapPage: React.FC = () => {
  useEffect(() => { document.title = "Sitemap | Open Your AIs"; }, []);
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle title="HTML Sitemap" subtitle="Index of all content." />
      <Card>
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="text-cyber-primary font-bold mb-4 border-b border-gray-700 pb-2">Main Pages</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/tools" className="hover:text-white">AI Tools Directory</Link></li>
              <li><Link to="/playbooks" className="hover:text-white">Monetization Playbooks</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog & News</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-cyber-primary font-bold mb-4 border-b border-gray-700 pb-2">Latest Insights</h3>
            <ul className="space-y-2 text-gray-400">
              {ARTICLES.map(a => (<li key={a.id}><Link to={`/blog/${a.slug}`} className="hover:text-white">{a.title}</Link></li>))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const ArticleReader: React.FC = () => {
  const { slug } = useParams();
  const article = ARTICLES.find(a => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (article) document.title = `${article.title} | Open Your AIs`;
  }, [slug, article]);

  if (!article) return <NotFoundPage />;

  const relatedArticles = ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 2);

  return (
    <article className="container mx-auto px-4 py-12 max-w-5xl">
      <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
      </Link>
      
      <header className="mb-12">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-cyber-bg bg-cyber-primary rounded uppercase">{article.category}</div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
           <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.date}</div>
           <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime}</div>
           <div className="flex items-center gap-2"><User className="w-4 h-4" /> Expert Contributor</div>
        </div>
      </header>

      <div className="w-full h-[450px] rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
         <SmartImage src={article.image} alt={article.title} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="lead text-xl text-gray-300 mb-8 font-light italic border-l-4 border-cyber-primary pl-6">
            {article.excerpt}
          </p>
          <AdUnit slot="article-top" />
          <div className="content-render" dangerouslySetInnerHTML={{ __html: article.content }} />
          <AdUnit slot="article-bottom" />
        </div>
        
        <aside className="space-y-8">
           <div className="sticky top-24">
              <Card className="mb-6">
                <h4 className="font-bold text-white mb-4">Quick Share</h4>
                <div className="flex gap-2">
                   <button className="flex-1 py-2 bg-blue-600 rounded text-white text-xs font-bold">X (Twitter)</button>
                   <button className="flex-1 py-2 bg-blue-800 rounded text-white text-xs font-bold">LinkedIn</button>
                </div>
              </Card>
              <AdUnit slot="sidebar-sticky" className="min-h-[300px]" />
              <div className="mt-8">
                <h4 className="font-bold text-white mb-4 text-sm uppercase">Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400 border border-white/5 hover:border-cyber-primary/50 transition-colors">{tag}</span>
                  ))}
                </div>
              </div>
           </div>
        </aside>
      </div>

      <div className="mt-20 border-t border-white/10 pt-12">
        <SectionTitle title="Related Analysis" />
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

export const PlaybookReader: React.FC = () => {
  const { id } = useParams();
  const playbook = PLAYBOOKS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (playbook) document.title = `${playbook.title} | Open Your AIs`;
  }, [id, playbook]);

  if (!playbook) return <NotFoundPage />;

  return (
    <article className="container mx-auto px-4 py-12 max-w-5xl">
      <Link to="/playbooks" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Playbooks
      </Link>
      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <div>
           <header className="mb-8">
             <div className="flex items-center gap-3 mb-4">
               <span className="px-3 py-1 text-xs font-bold text-cyber-bg bg-cyber-secondary rounded uppercase">Playbook</span>
               <span className="text-xs px-2 py-1 rounded border border-yellow-500 text-yellow-500">{playbook.difficulty} Difficulty</span>
             </div>
             <h1 className="text-4xl font-bold text-white mb-4">{playbook.title}</h1>
             <p className="text-xl text-gray-300 italic">{playbook.tldr}</p>
           </header>
           <div className="w-full h-[300px] rounded-xl overflow-hidden mb-8 border border-white/10">
              <SmartImage src={playbook.image || ''} alt={playbook.title} className="w-full h-full object-cover opacity-80" />
           </div>
           <div className="prose prose-invert prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: playbook.content || '' }} />
        </div>
        <aside className="space-y-6">
           <Card className="border-cyber-secondary/30">
             <h3 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Metrics</h3>
             <div className="space-y-6">
               <div><div className="flex items-center gap-2 text-cyber-secondary mb-1"><DollarSign className="w-5 h-5" /> <span className="font-bold">Estimated ROI</span></div><p className="text-2xl text-white font-bold">{playbook.roi}</p></div>
               <div><div className="flex items-center gap-2 text-cyber-primary mb-1"><Clock className="w-5 h-5" /> <span className="font-bold">Timeline</span></div><p className="text-2xl text-white font-bold">{playbook.timeline}</p></div>
             </div>
           </Card>
           <AdUnit slot="playbook-sidebar" />
        </aside>
      </div>
    </article>
  );
};

export const CryptoReader: React.FC = () => {
  const { id } = useParams();
  const guide = CRYPTO_GUIDES.find(g => g.id === id);
  useEffect(() => { if (guide) document.title = `${guide.title} | Open Your AIs`; }, [id, guide]);
  if (!guide) return <NotFoundPage />;
  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/crypto" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Link>
      <header className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold text-black bg-cyber-success rounded uppercase"><ShieldCheck className="w-3 h-3" /> {guide.level} Guide</div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{guide.title}</h1>
      </header>
      <div className="prose prose-invert prose-lg max-w-none border-l-2 border-cyber-success/30 pl-12" dangerouslySetInnerHTML={{ __html: guide.content }} />
    </article>
  );
};

export const AboutPage: React.FC = () => {
  useEffect(() => { document.title = "About Us | Open Your AIs"; }, []);
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <SectionTitle title="About Open Your AIs" />
      <Card>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg">Open Your AIs is a dedicated research platform focused on the intersection of Artificial Intelligence, Blockchain technology, and Digital Asset Management.</p>
          <h3 className="text-white mt-6 mb-2 text-xl font-bold">Our Editorial Methodology</h3>
          <p>We do not use raw AI output. Every article published is a result of deep technical research, verified against current market data, and refined by experts to ensure practical utility for our readers.</p>
          <h3 className="text-white mt-6 mb-2 text-xl font-bold">Contact</h3>
          <p>Inquiries: <a href="mailto:openyourais888@gmail.com" className="text-cyber-primary hover:underline">openyourais888@gmail.com</a>.</p>
        </div>
      </Card>
    </div>
  );
};

export const LegalPage: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  useEffect(() => { document.title = type === 'privacy' ? "Privacy Policy" : "Terms of Use"; }, [type]);
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <SectionTitle title={type === 'privacy' ? 'Privacy Policy' : 'Terms of Use'} />
      <Card>
        <div className="prose prose-invert max-w-none text-sm text-gray-400">
          <p>Last Updated: May 20, 2025</p>
          {type === 'privacy' ? (
            <>
              <h3 className="text-white font-bold text-lg mt-4">Data Collection</h3>
              <p>We use Google AdSense to serve ads. AdSense uses the DoubleClick cookie to serve more relevant ads across the web and limit the number of times a given ad is shown to you.</p>
              <h3 className="text-white font-bold text-lg mt-4">Your Rights</h3>
              <p>You can opt out of personalized advertising by visiting Ads Settings in your Google Account.</p>
            </>
          ) : (
            <>
              <h3 className="text-white font-bold text-lg mt-4">Disclaimer</h3>
              <p>All content is for educational purposes. We are not financial advisors. Investing in digital assets involves high risk.</p>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};