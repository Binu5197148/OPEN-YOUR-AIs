
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, ShieldCheck, Globe, Cpu, Award, ChevronRight } from 'lucide-react';
import { Card, SectionTitle, AdUnit, SmartImage, FAQ } from '../components/Components';
import { TOOLS, PLAYBOOKS, ARTICLES } from '../constants';

const HomeFAQ = [
  { q: "What is the mission of Open Your AIs?", a: "Our mission is to decode complex technological shifts and provide actionable intelligence to ensure digital sovereignty. We focus on AI automation, decentralized finance, and future-proof monetization strategies." },
  { q: "Are the monetization playbooks verified?", a: "Yes. Every playbook published in our directory undergoes a theoretical and practical audit. We analyze ROI, time-to-market, and technical feasibility before listing any strategy." },
  { q: "How often is the intelligence feed updated?", a: "Our analysts monitor the neural frontier 24/7. High-priority intelligence reports are released daily, while deep-dive playbooks are updated on a weekly basis." },
  { q: "Is this platform suitable for beginners?", a: "Absolutely. We provide tiered content ranging from 'Entry Level' crypto guides to 'Hard Difficulty' technical playbooks, ensuring a clear learning path for all tech levels." }
];

const Hero = () => (
  <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-10">
    <div className="absolute inset-0 bg-cyber-bg z-[-1]"></div>
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyber-primary/20 blur-[150px] rounded-full z-[-1] animate-pulse"></div>
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
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 container mx-auto px-4">
    <SectionTitle title="Core Specializations" subtitle="Systematic frameworks for the post-work era." />
    <div className="grid md:grid-cols-3 gap-10">
      <Card className="text-center p-10 border-b-4 border-b-cyber-primary hover:bg-cyber-primary/5 transition-all">
        <div className="w-20 h-20 mx-auto bg-cyber-primary/10 rounded-3xl flex items-center justify-center mb-8 text-cyber-primary border border-cyber-primary/20">
          <Zap className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">AI & LLMs</h3>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">Deep analysis of LLM architectures, visual generators, and agentic workflows to augment human output.</p>
        <Link to="/tools" className="inline-flex items-center gap-2 text-cyber-primary font-black text-[10px] uppercase tracking-[0.2em] hover:text-white transition-all">Connect to Node <ChevronRight className="w-3 h-3" /></Link>
      </Card>
      <Card className="text-center p-10 border-b-4 border-b-cyber-secondary hover:bg-cyber-secondary/5 transition-all">
        <div className="w-20 h-20 mx-auto bg-cyber-secondary/10 rounded-3xl flex items-center justify-center mb-8 text-cyber-secondary border border-cyber-secondary/20">
          <TrendingUp className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">Digital Capital</h3>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">Actionable, validated playbooks for capital generation using automated systems and artificial intelligence.</p>
        <Link to="/playbooks" className="inline-flex items-center gap-2 text-cyber-secondary font-black text-[10px] uppercase tracking-[0.2em] hover:text-white transition-all">Start Execution <ChevronRight className="w-3 h-3" /></Link>
      </Card>
      <Card className="text-center p-10 border-b-4 border-b-cyber-success hover:bg-cyber-success/5 transition-all">
        <div className="w-20 h-20 mx-auto bg-cyber-success/10 rounded-3xl flex items-center justify-center mb-8 text-cyber-success border border-cyber-success/20">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">Web3 Protocol</h3>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">Security-first documentation for digital asset self-custody and blockchain market fundamentals.</p>
        <Link to="/crypto" className="inline-flex items-center gap-2 text-cyber-success font-black text-[10px] uppercase tracking-[0.2em] hover:text-white transition-all">Access Vault <ChevronRight className="w-3 h-3" /></Link>
      </Card>
    </div>
  </section>
);

const RecentArticles = () => {
  const recent = ARTICLES.slice(0, 3);
  return (
    <section className="py-24 bg-black/20">
      <div className="container mx-auto px-4">
        <SectionTitle title="Neural Intel Updates" subtitle="Direct transmission from the technical frontlines." />
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {recent.map(article => (
            <Link to={`/blog/${article.slug}`} key={article.id} className="group">
              <Card className="h-full flex flex-col p-0 rounded-3xl overflow-hidden border-white/5 hover:border-cyber-primary/20">
                <div className="aspect-video w-full overflow-hidden relative border-b border-white/5 bg-gray-900">
                   <SmartImage src={article.image} alt={article.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-700" />
                   <div className="absolute top-4 left-4 bg-cyber-bg/90 backdrop-blur px-3 py-1 text-[9px] font-black uppercase rounded-sm border border-white/10 text-cyber-primary tracking-widest">{article.category}</div>
                </div>
                <div className="p-8">
                   <h3 className="text-xl font-black text-white mb-4 line-clamp-2 uppercase tracking-wide leading-tight group-hover:text-cyber-primary transition-colors">{article.title}</h3>
                   <p className="text-gray-500 text-sm line-clamp-2 font-light leading-relaxed">{article.excerpt}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center">
           <Link to="/blog" className="inline-block px-10 py-4 border border-white/10 rounded-full text-gray-500 font-black uppercase text-[10px] tracking-widest hover:border-cyber-primary transition-all">Browse Intelligence Archive</Link>
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
      <div className="container mx-auto px-4">
         <AdUnit slot="home-top" />
         <Features />
         <RecentArticles />
         <FAQ items={HomeFAQ} />
         
         <div className="py-24 border-t border-white/5">
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-cyber-primary/5 to-transparent border-cyber-primary/10 p-16 rounded-[40px] text-center">
               <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-widest">Neural Stream</h2>
               <p className="text-gray-400 mb-12 max-w-xl mx-auto text-lg font-light">Join the vanguard. Receive technical deep-dives and market alerts directly to your inbox.</p>
               <div className="max-w-md mx-auto relative group">
                  <input type="email" placeholder="NEURAL_ID@EMAIL.COM" className="w-full bg-black/60 border border-white/10 rounded-full py-6 px-10 text-xs focus:outline-none focus:border-cyber-primary transition-all uppercase font-black tracking-widest" />
                  <button className="absolute right-2 top-2 bg-cyber-primary text-cyber-bg px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_25px_#00E5FF] transition-all">Connect</button>
               </div>
            </Card>
         </div>
      </div>
    </>
  );
};
