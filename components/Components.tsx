
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu, BookOpen, Coins, ChevronDown, Lock, Globe, Mail, Shield, Cookie, Plus, Minus } from 'lucide-react';
import { ADSENSE_PUB_ID, CONTACT_EMAIL } from '../constants';
import { useAuth } from '../context/AuthContext';

// --- AD SENSE UNIT ---
export const AdUnit: React.FC<{ slot: string; format?: string, className?: string }> = ({ slot, format = 'auto', className = '' }) => {
  return (
    <div className={`w-full overflow-hidden my-8 bg-cyber-bg/50 border border-cyber-primary/10 rounded-2xl flex items-center justify-center min-h-[120px] ${className}`}>
      <div className="text-center p-6">
         <span className="text-[10px] text-cyber-primary/40 uppercase tracking-[0.2em] block mb-2">Intelligence Stream Support</span>
         <div className="w-full h-full bg-black/30 animate-pulse rounded-lg text-cyber-primary/10 text-[10px] flex items-center justify-center uppercase font-black">
            Transmission Channel: {slot}
         </div>
      </div>
    </div>
  );
};

// --- FAQ COMPONENT ---
export const FAQ: React.FC<{ items: { q: string, a: string }[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 max-w-4xl mx-auto my-16">
      <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-widest text-center">Frequently Asked Intel</h3>
      {items.map((item, index) => (
        <div key={index} className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02]">
          <button 
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.03] transition-all"
          >
            <span className="font-bold text-gray-200">{item.q}</span>
            {openIndex === index ? <Minus className="w-4 h-4 text-cyber-primary" /> : <Plus className="w-4 h-4 text-gray-500" />}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// --- SMART IMAGE ---
export const SmartImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80');
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

// --- COOKIE CONSENT ---
export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('openyourais_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('openyourais_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] md:max-w-xl md:left-auto p-6 bg-black/90 backdrop-blur-2xl border border-cyber-primary/20 rounded-[32px] shadow-2xl">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-cyber-primary/10 p-3 rounded-2xl">
             <Cookie className="text-cyber-primary w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-black text-sm uppercase">Data Consent Protocol</h4>
            <p className="text-[10px] text-gray-400 leading-tight mt-1">
              We utilize cookies to optimize your neural interface experience and maintain the intelligence stream.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleAccept}
            className="flex-1 py-3 bg-cyber-primary text-cyber-bg font-black rounded-xl hover:brightness-110 transition-all text-[10px] uppercase tracking-widest"
          >
            Acknowledge
          </button>
          <Link 
            to="/privacy"
            className="flex-1 py-3 border border-white/10 text-white font-black rounded-xl hover:bg-white/5 transition-all text-[10px] uppercase tracking-widest text-center"
          >
            Review Data
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- NAVBAR ---
export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'TOOLS', path: '/tools' },
    { name: 'PLAYBOOKS', path: '/playbooks' },
    { name: 'CRYPTO', path: '/crypto' },
    { name: 'INTEL', path: '/blog' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/5 bg-cyber-bg/80 backdrop-blur-xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 bg-cyber-primary rounded-xl flex items-center justify-center group-hover:shadow-[0_0_20px_#00E5FF] transition-all duration-500 overflow-hidden">
            <Cpu className="text-cyber-bg w-6 h-6 z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50"></div>
          </div>
          <span className="self-center text-xl font-black whitespace-nowrap tracking-tighter text-white uppercase italic">
            OPEN YOUR <span className="text-cyber-primary">AIS</span>
          </span>
        </Link>
        
        <div className="flex md:order-2 space-x-3 md:space-x-0">
          <Link to="/admin" className="px-6 py-2.5 text-[10px] font-black text-cyber-bg bg-cyber-primary rounded-full hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all uppercase tracking-widest">
            {isAuthenticated ? 'TERMINAL' : 'CONNECT'}
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-white md:hidden"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col p-6 md:p-0 mt-6 md:space-x-12 md:flex-row md:mt-0 font-black text-[10px] tracking-[0.2em] uppercase">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={`block py-2 rounded transition-all ${isActive(link.path) ? 'text-cyber-primary' : 'text-gray-500 hover:text-white'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// --- FOOTER ---
export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/60 border-t border-white/5 mt-32 py-20">
      <div className="mx-auto w-full max-w-screen-xl px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-cyber-primary rounded-lg flex items-center justify-center">
                 <Cpu className="text-cyber-bg w-4 h-4" />
              </div>
              <span className="text-xl font-black text-white uppercase italic">OPEN YOUR AIS</span>
            </Link>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed font-light">
              The premier intelligence hub for the digital vanguard. We decode the future of AI, decentralized assets, and monetization protocols to ensure human sovereignty in the post-work era.
            </p>
          </div>
          <div>
            <h2 className="mb-6 text-[10px] font-black text-white uppercase tracking-[0.3em]">Network</h2>
            <ul className="text-gray-500 text-xs space-y-4 font-bold uppercase tracking-widest">
              <li><Link to="/tools" className="hover:text-cyber-primary transition-colors">AI Directory</Link></li>
              <li><Link to="/playbooks" className="hover:text-cyber-primary transition-colors">Revenue Ops</Link></li>
              <li><Link to="/crypto" className="hover:text-cyber-primary transition-colors">Crypto Vault</Link></li>
              <li><Link to="/sitemap" className="hover:text-cyber-primary transition-colors">Site Map</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-[10px] font-black text-white uppercase tracking-[0.3em]">Legal</h2>
            <ul className="text-gray-500 text-xs space-y-4 font-bold uppercase tracking-widest">
              <li><Link to="/privacy" className="hover:text-cyber-primary transition-colors">Privacy Protocol</Link></li>
              <li><Link to="/terms" className="hover:text-cyber-primary transition-colors">Terms of Entry</Link></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-cyber-primary transition-colors">Transmission Support</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black text-gray-700 uppercase tracking-[0.4em]">
          <span>© 2026 OPEN YOUR AIS. ALL PROTOCOLS RESERVED.</span>
          <div className="flex gap-8">
             <span>SECURE DATA TRANSMISSION</span>
             <span>HIGH-FIDELITY INTEL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- LAYOUT ---
export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-cyber-primary selection:text-cyber-bg">
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <Navbar />
      <main className="flex-grow pt-24 px-4 md:px-0">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

// --- CARD ---
export const Card: React.FC<{ children: React.ReactNode; className?: string; hoverEffect?: boolean }> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div className={`glass-panel rounded-[32px] p-8 border border-white/5 relative overflow-hidden group ${hoverEffect ? 'hover:border-cyber-primary/40 transition-all duration-500' : ''} ${className}`}>
      {hoverEffect && <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />}
      {children}
    </div>
  );
};

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-[1.1]">
      {title}
    </h2>
    {subtitle && <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light tracking-wide">{subtitle}</p>}
  </div>
);

// --- LEAD MAGNET ---
export { LeadMagnet } from './LeadMagnet';
