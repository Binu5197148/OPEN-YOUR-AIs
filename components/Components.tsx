
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu, BookOpen, Coins, ChevronDown, Lock, Globe, Mail, Shield, Cookie } from 'lucide-react';
import { ADSENSE_PUB_ID, CONTACT_EMAIL } from '../constants';
import { useAuth } from '../context/AuthContext';

// --- AD SENSE UNIT ---
export const AdUnit: React.FC<{ slot: string; format?: string, className?: string }> = ({ slot, format = 'auto', className = '' }) => {
  return (
    <div className={`w-full overflow-hidden my-6 bg-cyber-bg/50 border border-cyber-primary/10 rounded-lg flex items-center justify-center min-h-[100px] ${className}`}>
      {/* In a real app, the script would run here. For demo, we show a placeholder styling */}
      <div className="text-center p-4">
         <span className="text-xs text-cyber-primary/40 uppercase tracking-widest block mb-1">Advertisement</span>
         <div className="w-full h-full bg-black/20 animate-pulse rounded text-cyber-text/20 text-xs flex items-center justify-center">
            Ad Space ({slot})
         </div>
      </div>
    </div>
  );
};

// --- SMART IMAGE ---
// Handles image load errors gracefully by switching to a reliable fallback
export const SmartImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Reliable Fallback: Cyberpunk Cityscape
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
      // Delay showing slightly for better UX
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
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-black/90 backdrop-blur-xl border-t border-cyber-primary/20 animate-float">
      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-cyber-primary/10 p-2 rounded-full">
             <Cookie className="text-cyber-primary w-6 h-6" />
          </div>
          <p className="text-sm text-gray-300">
            We use cookies to enhance your experience, analyze traffic, and serve relevant ads. 
            By using this site, you agree to our <Link to="/privacy" className="text-cyber-primary hover:underline">Privacy Policy</Link>.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2 bg-cyber-primary text-cyber-bg font-bold rounded hover:bg-white transition-colors"
          >
            Accept
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="px-6 py-2 border border-gray-600 text-gray-400 rounded hover:text-white transition-colors"
          >
            Close
          </button>
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
    { name: 'Tools', path: '/tools' },
    { name: 'Playbooks', path: '/playbooks' },
    { name: 'Crypto', path: '/crypto' },
    { name: 'Blog', path: '/blog' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-cyber-primary/20 bg-cyber-bg/80 backdrop-blur-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
          <div className="relative w-8 h-8 bg-cyber-primary rounded-lg flex items-center justify-center group-hover:shadow-[0_0_15px_#00E5FF] transition-all duration-300">
            <Cpu className="text-cyber-bg w-5 h-5" />
          </div>
          <span className="self-center text-xl font-bold whitespace-nowrap tracking-tighter text-white">
            OPEN YOUR <span className="text-cyber-primary">AIS</span>
          </span>
        </Link>
        
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isAuthenticated ? (
            <Link to="/admin" className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all">
              <Shield className="w-4 h-4" /> Admin
            </Link>
          ) : (
            <Link to="/admin" className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyber-bg bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded-lg hover:brightness-110 transition-all shadow-[0_0_10px_rgba(0,229,255,0.3)]">
              <Lock className="w-4 h-4" /> Login
            </Link>
          )}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyber-primary"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-800 rounded-lg bg-gray-900/50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={`block py-2 px-3 rounded md:p-0 transition-colors ${isActive(link.path) ? 'text-cyber-primary font-bold shadow-[0_2px_0_0_#00E5FF]' : 'text-gray-300 hover:text-cyber-primary'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
                <Link to="/about" className="block py-2 px-3 text-gray-300 hover:text-cyber-primary md:p-0" onClick={() => setIsOpen(false)}>About</Link>
            </li>
            <li className="md:hidden mt-4 pt-4 border-t border-gray-700">
               <Link to="/admin" onClick={() => setIsOpen(false)} className="block py-2 text-cyber-primary">Admin Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// --- FOOTER ---
export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-cyber-primary/10 mt-20">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Cpu className="text-cyber-primary w-6 h-6" />
              <span className="text-xl font-bold text-white">OPEN YOUR AIS</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Navigating the future of technology. Educational resources for Artificial Intelligence, Cryptocurrency, and Digital Monetization.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-cyber-primary uppercase tracking-wider">Resources</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4"><Link to="/tools" className="hover:text-white transition-colors">AI Tools</Link></li>
                <li className="mb-4"><Link to="/playbooks" className="hover:text-white transition-colors">Playbooks</Link></li>
                <li className="mb-4"><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-cyber-primary uppercase tracking-wider">Legal</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4"><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-cyber-primary uppercase tracking-wider">Connect</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">Contact Us</a>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>English / Portuguese</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-800 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between text-xs text-gray-500">
          <span>© 2024 Open Your AIs. All Rights Reserved.</span>
          <div className="mt-4 sm:mt-0">
             Disclaimer: Content is for educational purposes only. Not financial advice.
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
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      
      {/* Ambient Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyber-primary/10 blur-[120px] rounded-full pointer-events-none z-[-1]" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyber-secondary/10 blur-[120px] rounded-full pointer-events-none z-[-1]" />

      <Navbar />
      <main className="flex-grow pt-20 px-4 md:px-0">
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
    <div className={`glass-panel rounded-2xl p-6 border border-white/5 relative overflow-hidden group ${hoverEffect ? 'hover:-translate-y-2 hover:border-cyber-primary/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all duration-300' : ''} ${className}`}>
      {hoverEffect && <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />}
      {children}
    </div>
  );
};

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyber-primary to-white mb-3">
      {title}
    </h2>
    {subtitle && <p className="text-gray-400 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);
