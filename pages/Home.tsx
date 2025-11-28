
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { Card, SectionTitle, AdUnit, SmartImage } from '../components/Components';
import { TOOLS, PLAYBOOKS, ARTICLES } from '../constants';

const Hero = () => (
  <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-primary/10 via-cyber-bg to-cyber-bg z-[-1]"></div>
    <div className="container mx-auto px-4 text-center z-10">
      <div className="inline-block mb-4 px-4 py-1 rounded-full border border-cyber-primary/30 bg-cyber-primary/10 text-cyber-primary text-xs font-semibold tracking-wider uppercase animate-pulse">
        The Future is Now
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
        <span className="block text-white">Master the Age of</span>
        <span className="bg-clip-text text-transparent bg-gradient-neon animate-pulse-glow">
          Artificial Intelligence
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Discover top-tier AI tools, actionable monetization playbooks, and secure cryptocurrency strategies. Elevate your digital potential.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/tools" className="px-8 py-4 bg-cyber-primary text-cyber-bg font-bold rounded-xl hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2">
          Explore Tools <ArrowRight className="w-5 h-5" />
        </Link>
        <Link to="/playbooks" className="px-8 py-4 bg-transparent border border-cyber-secondary text-cyber-secondary font-bold rounded-xl hover:bg-cyber-secondary/10 transition-colors flex items-center justify-center gap-2">
          Start Monetizing
        </Link>
      </div>
      
      {/* Stats/Trust */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
        <div>
           <div className="text-3xl font-bold text-white">29+</div>
           <div className="text-sm text-gray-500">Expert Articles</div>
        </div>
        <div>
           <div className="text-3xl font-bold text-white">10+</div>
           <div className="text-sm text-gray-500">Curated Tools</div>
        </div>
        <div>
           <div className="text-3xl font-bold text-white">5+</div>
           <div className="text-sm text-gray-500">Monetization Guides</div>
        </div>
        <div>
           <div className="text-3xl font-bold text-white">100%</div>
           <div className="text-sm text-gray-500">Free Content</div>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-20 container mx-auto px-4">
    <div className="grid md:grid-cols-3 gap-8">
      <Card className="text-center">
        <div className="w-14 h-14 mx-auto bg-cyber-primary/20 rounded-full flex items-center justify-center mb-6 text-cyber-primary">
          <Zap className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">AI Tools</h3>
        <p className="text-gray-400 mb-4">Curated selection of the most powerful AI tools to 10x your productivity.</p>
        <Link to="/tools" className="text-cyber-primary hover:underline text-sm">Browse Directory &rarr;</Link>
      </Card>
      <Card className="text-center border-cyber-secondary/20 hover:border-cyber-secondary/50">
        <div className="w-14 h-14 mx-auto bg-cyber-secondary/20 rounded-full flex items-center justify-center mb-6 text-cyber-secondary">
          <TrendingUp className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">Monetization</h3>
        <p className="text-gray-400 mb-4">Step-by-step playbooks to turn AI skills into revenue streams.</p>
        <Link to="/playbooks" className="text-cyber-secondary hover:underline text-sm">View Playbooks &rarr;</Link>
      </Card>
      <Card className="text-center border-cyber-success/20 hover:border-cyber-success/50">
        <div className="w-14 h-14 mx-auto bg-cyber-success/20 rounded-full flex items-center justify-center mb-6 text-cyber-success">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">Crypto Security</h3>
        <p className="text-gray-400 mb-4">Learn blockchain basics and how to invest safely in the decentralized web.</p>
        <Link to="/crypto" className="text-cyber-success hover:underline text-sm">Start Learning &rarr;</Link>
      </Card>
    </div>
  </section>
);

const RecentArticles = () => {
  const recent = ARTICLES.slice(0, 6);
  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <SectionTitle title="Latest Insights" subtitle="Stay ahead of the curve with our newest research." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map(article => (
            <Link to={`/blog/${article.slug}`} key={article.id}>
              <Card className="h-full flex flex-col hover:border-cyber-primary/40">
                <div className="bg-gray-800 h-40 w-full mb-4 rounded-lg overflow-hidden relative">
                   <SmartImage src={article.image} alt={article.title} className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-1 text-xs rounded border border-white/10">{article.category}</div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4 border-t border-white/5">
                  <span>{article.date}</span>
                  <span>{article.readTime} read</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/blog" className="inline-block px-6 py-3 border border-gray-600 rounded-lg hover:border-white hover:text-white text-gray-300 transition-colors">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "Open Your AIs | AI, Crypto & Monetization";
  }, []);

  return (
    <>
      <Hero />
      <AdUnit slot="home-top" />
      <Features />
      <RecentArticles />
      <div className="container mx-auto px-4 pb-20">
         <SectionTitle title="Subscribe to Our Newsletter" />
         <div className="max-w-md mx-auto relative">
            <input type="email" placeholder="Enter your email" className="w-full bg-cyber-bg border border-gray-700 rounded-full py-4 px-6 focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary" />
            <button className="absolute right-2 top-2 bg-cyber-primary text-cyber-bg px-6 py-2 rounded-full font-bold hover:brightness-110">Join</button>
         </div>
         <p className="text-center text-xs text-gray-500 mt-4">Join 5,000+ futurists. No spam, ever.</p>
      </div>
    </>
  );
};
