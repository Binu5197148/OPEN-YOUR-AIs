
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, ShieldCheck, Globe, Cpu, Award, ChevronRight } from 'lucide-react';
import { Card, SectionTitle, AdUnit, SmartImage } from '../components/Components';
import { TOOLS, PLAYBOOKS, ARTICLES } from '../constants';

const Hero = () => (
  <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-10">
    {/* Animated Background Gradients */}
    <div className="absolute inset-0 bg-cyber-bg z-[-1]"></div>
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyber-primary/20 blur-[150px] rounded-full z-[-1] animate-pulse"></div>
    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyber-secondary/20 blur-[150px] rounded-full z-[-1] animate-pulse" style={{ animationDelay: '2s' }}></div>

    <div className="container mx-auto px-4 text-center z-10">
      <div className="inline-flex items-center gap-3 mb-8 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-cyber-primary text-[10px] font-black tracking-[0.3em] uppercase">
        <Award className="w-4 h-4" /> Leading Tech Intelligence Hub 2025
      </div>
      <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] uppercase">
        <span className="block text-white">RECODE YOUR</span>
        <span className="bg-clip-text text-transparent bg-gradient-neon">
          DIGITAL FUTURE
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
        High-fidelity intelligence for the modern elite. Master <span className="text-white font-bold">Generative AI</span>, secure <span className="text-white font-bold">Crypto Protocols</span>, and automated <span className="text-white font-bold">Revenue Frameworks</span>.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <Link to="/tools" className="group px-12 py-6 bg-cyber-primary text-cyber-bg font-black rounded-full hover:bg-white transition-all shadow-[0_0_40px_rgba(0,229,255,0.4)] flex items-center justify-center gap-3 uppercase tracking-widest text-sm">
          Access Tools <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/playbooks" className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm backdrop-blur-md">
          Monetization
        </Link>
      </div>
      
      {/* Real-time Stats */}
      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto border-t border-white/10 pt-16">
        <div className="text-center group cursor-default">
           <div className="text-4xl font-black text-white group-hover:text-cyber-primary transition-colors">45+</div>
           <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-2">Intel Nodes</div>
        </div>
        <div className="text-center group cursor-default">
           <div className="text-4xl font-black text-white group-hover:text-cyber-secondary transition-colors">12+</div>
           <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-2">Revenue Frameworks</div>
        </div>
        <div className="text-center group cursor-default">
           <div className="text-4xl font-black text-white group-hover:text-cyber-success transition-colors">100%</div>
           <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-2">Fact-Checked</div>
        </div>
        <div className="text-center group cursor-default">
           <div className="text-4xl font-black text-white group-hover:text-white transition-colors">24/7</div>
           <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-2">Neural Stream</div>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 container mx-auto px-4">
    <SectionTitle title="Core Intelligence Pillars" subtitle="Systematic frameworks for the post-work era." />
    <div className="grid md:grid-cols-3 gap-10">
      <Card className="text-center p-10 border-b-4 border-b-cyber-primary hover:bg-cyber-primary/5 transition-all">
        <div className="w-20 h-20 mx-auto bg-cyber-primary/10 rounded-3xl flex items-center justify-center mb-8 text-cyber-primary border border-cyber-primary/20 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
          <Zap className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">AI & LLMs</h3>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">Deep analysis of LLM architectures, visual generators, and agentic workflows to augment human output.</p>
        <Link to="/tools" className="inline-flex items-center gap-2 text-cyber-primary font-black text-[10px] uppercase tracking-[0.2em] hover:text-white transition-all">Connect to Node <ChevronRight className="w-3 h-3" /></Link>
      </Card>
      <Card className="text-center p-10 border-b-4 border-b-cyber-secondary hover:bg-cyber-secondary/5 transition-all">
        <div className="w-20 h-20 mx-auto bg-cyber-secondary/10 rounded-3xl flex items-center justify-center mb-8 text-cyber-secondary border border-cyber-secondary/20 shadow-[0_0_20px_rgba(191,0,255,0.1)]">
          <TrendingUp className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">Digital Capital</h3>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">Actionable, validated playbooks for capital generation using automated systems and artificial intelligence.</p>
        <Link to="/playbooks" className="inline-flex items-center gap-2 text-cyber-secondary font-black text-[10px] uppercase tracking-[0.2em] hover:text-white transition-all">Start Execution <ChevronRight className="w-3 h-3" /></Link>
      </Card>
      <Card className="text-center p-10 border-b-4 border-b-cyber-success hover:bg-cyber-success/5 transition-all">
        <div className="w-20 h-20 mx-auto bg-cyber-success/10 rounded-3xl flex items-center justify-center mb-8 text-cyber-success border border-cyber-success/20 shadow-[0_0_20px_rgba(0,230,128,0.1)]">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">Web3 Protocol</h3>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">Security-first documentation for digital asset self-custody and blockchain market fundamentals.</p>
        <Link to="/crypto" className="inline-flex items-center gap-2 text-cyber-success font-black text-[10px] uppercase tracking-[0.2em] hover:text-white transition-all">Access Vault <ChevronRight className="w-3 h-3" /></Link>
      </Card>
    </div>
  </section>
);

const AuthoritySection = () => (
  <section className="py-24 border-y border-white/5 bg-white/[0.01]">
    <div className="container mx-auto px-4">
       <div className="flex flex-col items-center text-center">
          <Globe className="text-cyber-primary w-14 h-14 mb-8 opacity-40 animate-spin-slow" />
          <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-[0.4em]">Verified Intelligence Stream</h2>
          <p className="text-gray-500 text-base max-w-2xl mb-16 font-light">Our intelligence hub cross-references multi-dimensional data sets from the industry's most trusted technological authorities.</p>
          <div className="flex flex-wrap justify-center gap-16 md:gap-24 grayscale opacity-20 hover:opacity-50 transition-all duration-1000">
             <div className="flex items-center gap-3 font-black text-2xl text-white tracking-tighter"><Cpu className="w-8 h-8"/> MIT_TECH_REVIEW</div>
             <div className="flex items-center gap-3 font-black text-2xl text-white tracking-tighter"><Award className="w-8 h-8"/> REUTERS_INTEL</div>
             <div className="flex items-center gap-3 font-black text-2xl text-white tracking-tighter"><ShieldCheck className="w-8 h-8"/> CRYPTO_SAFETY_ORG</div>
             <div className="flex items-center gap-3 font-black text-2xl text-white tracking-tighter"><TrendingUp className="w-8 h-8"/> BLOOMBERG_TERMINAL</div>
          </div>
       </div>
    </div>
    <style>{`
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        animation: spin-slow 15s linear infinite;
      }
    `}</style>
  </section>
);

const RecentArticles = () => {
  const recent = ARTICLES.slice(0, 6);
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <SectionTitle title="Neural Intel Updates" subtitle="Direct transmission from the technical frontlines." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recent.map(article => (
            <Link to={`/blog/${article.slug}`} key={article.id} className="group">
              <Card className="h-full flex flex-col group-hover:border-cyber-primary/30 transition-all overflow-hidden p-0 rounded-3xl">
                <div className="aspect-video w-full overflow-hidden relative border-b border-white/5 bg-gray-900">
                   <SmartImage src={article.image} alt={article.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" />
                   <div className="absolute top-4 left-4 bg-cyber-bg/90 backdrop-blur px-3 py-1 text-[9px] font-black uppercase rounded-sm border border-white/10 text-cyber-primary tracking-widest">{article.category}</div>
                   <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg to-transparent opacity-60"></div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                   <h3 className="text-xl font-black text-white mb-4 line-clamp-2 group-hover:text-cyber-primary transition-colors leading-tight uppercase tracking-wide">{article.title}</h3>
                   <p className="text-gray-500 text-sm mb-8 line-clamp-3 flex-grow leading-relaxed font-light">{article.excerpt}</p>
                   <div className="flex justify-between items-center text-[10px] font-black text-gray-600 mt-auto pt-6 border-t border-white/5 uppercase tracking-[0.2em]">
                     <span>{article.date}</span>
                     <span className="text-cyber-primary group-hover:translate-x-1 transition-transform">Read Intel &rarr;</span>
                   </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-20">
          <Link to="/blog" className="inline-block px-12 py-5 border border-white/10 rounded-full hover:border-cyber-primary hover:text-cyber-primary text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] transition-all bg-white/[0.02]">
            Browse Full Intelligence Feed
          </Link>
        </div>
      </div>
    </section>
  );
};

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "Open Your AIs | The Neural Frontier Intelligence Hub";
  }, []);

  return (
    <>
      <Hero />
      <AuthoritySection />
      <AdUnit slot="home-top" />
      <Features />
      <RecentArticles />
      <div className="container mx-auto px-4 pb-32 mt-24">
         <Card className="max-w-4xl mx-auto bg-gradient-to-br from-cyber-primary/10 to-transparent border-cyber-primary/20 p-16 rounded-[40px] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-primary to-transparent"></div>
            <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-widest">Subscribe to the Stream</h2>
            <p className="text-gray-400 mb-12 max-w-xl mx-auto text-lg font-light">Join the digital vanguard. Receive high-fidelity intelligence and monetization alerts directly to your terminal.</p>
            <div className="max-w-md mx-auto relative group">
               <input type="email" placeholder="NEURAL_ID@EMAIL.COM" className="w-full bg-black/60 border border-white/10 rounded-full py-6 px-10 text-xs focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-all uppercase font-black tracking-widest" />
               <button className="absolute right-2 top-2 bg-cyber-primary text-cyber-bg px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_25px_#00E5FF] transition-all">Connect</button>
            </div>
            <p className="text-[9px] text-gray-600 mt-8 uppercase tracking-[0.4em] font-black">Encrypted Neural Transmission • No Spam Protocol</p>
         </Card>
      </div>
    </>
  );
};
