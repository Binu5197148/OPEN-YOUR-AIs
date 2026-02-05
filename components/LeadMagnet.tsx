import React, { useState } from 'react';
import { ArrowRight, Download, CheckCircle } from 'lucide-react';

interface LeadMagnetProps {
  title: string;
  description: string;
  magnetTitle: string;
  magnetDescription: string;
  buttonText?: string;
  className?: string;
}

export const LeadMagnet: React.FC<LeadMagnetProps> = ({
  title,
  description,
  magnetTitle,
  magnetDescription,
  buttonText = "Get Free Guide",
  className = ""
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to local storage + analytics
      const leads = JSON.parse(localStorage.getItem('lead-magnets') || '[]');
      if (!leads.find((lead: any) => lead.email === email)) {
        const newLead = {
          email,
          timestamp: Date.now(),
          magnet: magnetTitle,
          source: 'article_lead_magnet',
          page: window.location.pathname
        };
        leads.push(newLead);
        localStorage.setItem('lead-magnets', JSON.stringify(leads));
        
        // Analytics tracking
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'lead_magnet_signup', {
            magnet_name: magnetTitle,
            page_path: window.location.pathname
          });
        }
      }
      
      setStatus('success');
      setMessage('Check your email! Download link sent.');
      setEmail('');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
      
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  if (status === 'success') {
    return (
      <div className={`bg-gradient-to-br from-cyber-primary/10 to-cyber-secondary/10 border border-cyber-primary/20 rounded-3xl p-8 text-center ${className}`}>
        <CheckCircle className="w-16 h-16 mx-auto text-cyber-success mb-4" />
        <h3 className="text-2xl font-black text-white mb-4">Success! 🎉</h3>
        <p className="text-gray-300 mb-4">{message}</p>
        <p className="text-sm text-gray-400">Check your spam folder if you don't see it in a few minutes.</p>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-cyber-primary/5 to-cyber-secondary/5 border border-cyber-primary/10 rounded-3xl p-8 ${className}`}>
      <div className="text-center mb-6">
        <Download className="w-12 h-12 mx-auto text-cyber-primary mb-4" />
        <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-wide">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
      
      <div className="bg-black/40 rounded-2xl p-6 border border-white/10">
        <h4 className="text-lg font-bold text-cyber-primary mb-2">📥 FREE DOWNLOAD:</h4>
        <h5 className="text-xl font-black text-white mb-2">{magnetTitle}</h5>
        <p className="text-gray-300 text-sm mb-6">{magnetDescription}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@domain.com"
              disabled={status === 'loading'}
              className="w-full bg-black/60 border border-white/10 rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-cyber-primary transition-all disabled:opacity-50"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full py-4 px-6 rounded-xl font-black text-sm uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${
              status === 'loading' 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                : 'bg-cyber-primary text-cyber-bg hover:shadow-[0_0_25px_#00E5FF] hover:scale-105'
            }`}
          >
            {status === 'loading' ? (
              'SENDING...'
            ) : (
              <>
                {buttonText}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
        
        {message && (
          <div className={`mt-4 text-center text-sm font-medium ${
            status === 'error' ? 'text-red-400' : 'text-cyber-success'
          }`}>
            {message}
          </div>
        )}
        
        <p className="text-xs text-gray-500 text-center mt-4">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  );
};