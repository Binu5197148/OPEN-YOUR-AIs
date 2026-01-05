
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, SectionTitle } from '../components/Components';
import { GoogleGenAI } from "@google/genai";
import { saveNewArticle, getRandomImageRandom } from '../constants';
import { Article } from '../types';
import { 
  Lock, 
  LogIn, 
  Sparkles, 
  Save, 
  LogOut, 
  CheckCircle, 
  Copy, 
  Trash2, 
  FileText, 
  Loader2, 
  Terminal,
  Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminPage: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Generator State
  const [topic, setTopic] = useState('');
  const [customImage, setCustomImage] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<Article | null>(null);

  // Local Articles State (History)
  const [localArticles, setLocalArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Load locally saved articles
    const saved = localStorage.getItem('openyourais_new_articles');
    if (saved) {
      try {
        setLocalArticles(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse local articles history');
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError('Invalid Access Key');
    }
  };

  const handleGenerate = async () => {
    if (!topic) return;
    
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      setError("CRITICAL ERROR: API Key not detected in environment.");
      return;
    }

    setGenerating(true);
    setError('');

    try {
      // Re-initialize for every call to ensure fresh environment variable access
      const ai = new GoogleGenAI({ apiKey });
      
      const systemPrompt = `
        You are a World-Class Senior Content Architect for "Open Your AIs". 
        Your mission is to produce an exhaustive "Authority Guide" that establishes the site as a top-tier intelligence hub for Google AdSense compliance.

        WORD COUNT TARGET: 1,500 - 2,500 words.
        EDITORIAL DEPTH: PhD-level technical analysis, industry trends, and step-by-step implementation logic.

        ARTICLE STRUCTURE:
        1. Executive Summary: High-impact hook.
        2. Evolution & Architecture: The history and tech stack.
        3. Core Mechanics: Deep dive into how it works.
        4. Practical Execution: Actionable guide for the reader.
        5. Future Implications: Socio-economic impact and 5-year outlook.
        6. Technical Insight Box: Specific technical nuance.
        7. Comprehensive FAQ: 5 complex, multi-layered questions and answers.

        FORMATTING RULES:
        - Use standard HTML tags: <h2>, <h3>, <h4>, <p>, <ul>, <li>, <strong>, <em>.
        - Create a specialized "Technical Insight" container using: <div class="bg-cyber-primary/10 border-l-4 border-cyber-primary p-6 my-8 rounded-r-2xl border border-white/5">...</div>.
        - NO Markdown code blocks (\`\`\`). Output plain text with HTML tags inside.

        OUTPUT PROTOCOL:
        Use these exact markers for parsing:
        
        [[TITLE]]
        (SEO-Optimized Title)

        [[CATEGORY]]
        (AI, Crypto, or Monetization)

        [[EXCERPT]]
        (Technical hook summary)

        [[TAGS]]
        (Comma separated list)

        [[READTIME]]
        (e.g., 22 min)

        [[CONTENT]]
        (The full HTML content body)
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Write a definitive, exhaustive, and highly technical authority article about: "${topic}". Focus on professional terminology, long-form depth (2000 words), and actionable intelligence.`,
        config: {
          systemInstruction: systemPrompt,
          thinkingConfig: { thinkingBudget: 32768 },
          tools: [{googleSearch: {}}],
        }
      });

      const rawText = response.text || '';
      
      const getSection = (tag: string) => {
        const marker = `[[${tag}]]`;
        const parts = rawText.split(marker);
        if (parts.length < 2) return '';
        return parts[1].split('[[')[0].trim();
      };

      const title = getSection('TITLE');
      const categoryRaw = getSection('CATEGORY');
      const excerpt = getSection('EXCERPT');
      const tagsRaw = getSection('TAGS');
      const readTime = getSection('READTIME');
      const content = getSection('CONTENT');

      if (!title || !content) {
        console.error("Incomplete response from AI:", rawText);
        throw new Error("AI output was malformed. Please try again with a more specific topic.");
      }

      // Type-safe category mapping
      let category: 'AI' | 'Crypto' | 'Monetization' = 'AI';
      if (categoryRaw.toLowerCase().includes('crypto')) category = 'Crypto';
      else if (categoryRaw.toLowerCase().includes('money') || categoryRaw.toLowerCase().includes('monetiz')) category = 'Monetization';

      const tags = tagsRaw.split(',').map(t => t.trim()).filter(t => t.length > 0);
      const imageUrl = customImage.trim() ? customImage.trim() : getRandomImageRandom(category);
      
      const newArticle: Article = {
        id: `auto-${Date.now()}`,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: title,
        excerpt: excerpt,
        content: content,
        category: category,
        tags: tags,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: readTime || '20 min',
        image: imageUrl,
        isAutoGenerated: true
      };

      setGeneratedArticle(newArticle);

      // Persist to local preview history
      const saved = localStorage.getItem('openyourais_new_articles');
      let history: Article[] = saved ? JSON.parse(saved) : [];
      history = [newArticle, ...history];
      localStorage.setItem('openyourais_new_articles', JSON.stringify(history));
      setLocalArticles(history);

    } catch (err: any) {
      console.error("Generation Error:", err);
      setError(`Critical Error: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const handlePublish = () => {
    if (generatedArticle) {
      saveNewArticle(generatedArticle);
      setGeneratedArticle(null);
      alert('Article Committed to Local Node! You can now find it in the Intel feed.');
    }
  };

  const handleCopyJson = (article: Article) => {
    navigator.clipboard.writeText(JSON.stringify(article, null, 2));
    alert('JSON manifest copied to clipboard for static deployment.');
  };

  const clearLocalArticles = () => {
    if(window.confirm('Wipe local transmission history?')) {
      localStorage.removeItem('openyourais_new_articles');
      setLocalArticles([]);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Card className="w-full max-w-md p-10 border-cyber-primary/30">
          <div className="flex justify-center mb-8">
            <div className="bg-cyber-primary/10 p-5 rounded-3xl border border-cyber-primary/20">
              <Lock className="w-10 h-10 text-cyber-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-center text-white mb-8 uppercase tracking-widest">Nexus Access</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="TERMINAL_KEY"
              className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:border-cyber-primary focus:outline-none uppercase text-xs font-black tracking-widest"
            />
            {error && <p className="text-red-500 text-[10px] text-center font-black uppercase tracking-widest">{error}</p>}
            <button type="submit" className="w-full bg-cyber-primary text-cyber-bg font-black py-4 rounded-2xl hover:shadow-[0_0_30px_#00E5FF] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
              <LogIn className="w-4 h-4" /> Initialize Session
            </button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <SectionTitle title="Command Center" subtitle="Automated content engineering for the post-work era." />
        <button onClick={logout} className="flex items-center gap-2 text-red-400/60 hover:text-red-400 transition-colors uppercase text-[10px] font-black tracking-widest bg-red-500/5 px-4 py-2 rounded-lg border border-red-500/10">
          <LogOut className="w-3 h-3" /> Terminate Session
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_450px] gap-12 mb-20">
        <div className="space-y-8">
           <Card className="border-cyber-primary/20 bg-cyber-primary/[0.02]">
             <div className="flex items-center gap-3 mb-8">
               <Sparkles className="text-cyber-primary w-6 h-6" />
               <h3 className="text-2xl font-black text-white uppercase tracking-widest">Authority Generator</h3>
             </div>
             
             <div className="space-y-6">
               <div>
                 <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Neural Target (Topic)</label>
                 <textarea 
                   rows={4}
                   value={topic}
                   onChange={(e) => setTopic(e.target.value)}
                   placeholder="e.g., 'The complete technical guide to Liquid Staking on Solana in 2025'"
                   className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 text-sm text-white focus:border-cyber-primary focus:outline-none transition-all placeholder:text-gray-700"
                 />
               </div>

               <div>
                 <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Custom Media Node (URL)</label>
                 <input 
                   type="text" 
                   value={customImage}
                   onChange={(e) => setCustomImage(e.target.value)}
                   placeholder="https://images.unsplash.com/..."
                   className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-xs text-white focus:border-cyber-secondary focus:outline-none"
                 />
               </div>
               
               <button 
                 onClick={handleGenerate} 
                 disabled={generating || !topic}
                 className={`w-full py-6 rounded-2xl font-black flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-xs ${generating ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white hover:shadow-[0_0_40px_rgba(0,229,255,0.3)] hover:scale-[1.01]'}`}
               >
                 {generating ? (
                   <>Synthesizing Intel... <Loader2 className="w-4 h-4 animate-spin" /></>
                 ) : (
                   <><Sparkles className="w-4 h-4" /> Launch Neural Reasoning</>
                 )}
               </button>
               {error && <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-[10px] font-black uppercase tracking-widest text-center">{error}</div>}
             </div>
           </Card>
        </div>

        <div>
           <Card className={`h-full min-h-[500px] border-dashed flex flex-col ${generatedArticle ? 'border-cyber-success/40 bg-cyber-success/[0.01]' : 'border-white/10'}`}>
             {!generatedArticle ? (
               <div className="flex-grow flex flex-col items-center justify-center text-gray-600 text-center p-10">
                 <Terminal className="w-12 h-12 mb-6 opacity-20" />
                 <p className="text-[10px] uppercase font-black tracking-[0.2em] leading-relaxed">System Standby.<br/>Waiting for neural transmission...</p>
               </div>
             ) : (
               <div className="flex flex-col h-full">
                 <div className="flex items-center gap-2 text-cyber-success mb-6 px-4 py-2 bg-cyber-success/10 rounded-full border border-cyber-success/20 w-fit text-[9px] font-black uppercase tracking-widest">
                   <CheckCircle className="w-3 h-3" /> Generation Verified
                 </div>
                 
                 <div className="bg-black/40 p-6 rounded-3xl flex-grow overflow-y-auto max-h-[500px] mb-8 border border-white/5 custom-scrollbar">
                   <div className="aspect-video mb-6 rounded-2xl overflow-hidden border border-white/5">
                      <img src={generatedArticle.image} alt="Preview" className="w-full h-full object-cover" />
                   </div>
                   <h2 className="text-xl font-black text-white mb-4 uppercase tracking-tight leading-tight">{generatedArticle.title}</h2>
                   <div className="flex gap-3 mb-6">
                     <span className="bg-cyber-primary/20 text-cyber-primary px-3 py-1 rounded-sm text-[8px] font-black uppercase tracking-widest">{generatedArticle.category}</span>
                     <span className="text-gray-500 text-[8px] font-black uppercase tracking-widest pt-1">{generatedArticle.readTime}</span>
                   </div>
                   <div className="text-[10px] text-gray-500 font-light prose prose-invert prose-sm line-clamp-6" dangerouslySetInnerHTML={{ __html: generatedArticle.content }} />
                   <div className="mt-4 p-4 border border-white/5 rounded-xl bg-white/[0.02] text-[9px] text-cyber-primary font-black uppercase tracking-widest text-center">
                      Analysis: {generatedArticle.content.length} chars synthesized.
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setGeneratedArticle(null)} className="py-4 border border-red-500/20 text-red-400 rounded-2xl hover:bg-red-500/5 text-[10px] font-black uppercase tracking-widest transition-all">Discard</button>
                    <button onClick={handlePublish} className="py-4 bg-cyber-success text-cyber-bg font-black rounded-2xl hover:shadow-[0_0_20px_#00E680] text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                        <Save className="w-3 h-3" /> Commit Data
                    </button>
                 </div>
                 <button onClick={() => handleCopyJson(generatedArticle)} className="w-full py-4 mt-4 bg-white/5 text-gray-400 rounded-2xl hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-white/5">
                    <Copy className="w-3 h-3" /> Export Raw JSON
                 </button>
               </div>
             )}
           </Card>
        </div>
      </div>

      {localArticles.length > 0 && (
        <div className="mt-20 pt-20 border-t border-white/5">
           <div className="flex items-center justify-between mb-12">
             <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic flex items-center gap-3">
               <FileText className="text-cyber-secondary w-8 h-8" /> Pipeline History
             </h3>
             <button onClick={clearLocalArticles} className="text-[10px] font-black text-red-500/40 hover:text-red-500 flex items-center gap-2 uppercase tracking-[0.2em] transition-colors">
               <Trash2 className="w-4 h-4" /> Purge Cache
             </button>
           </div>
           
           <div className="grid gap-4">
              {localArticles.map((article) => (
                <div key={article.id} className="bg-white/[0.01] border border-white/5 p-6 rounded-[24px] flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-white/[0.03] transition-all group">
                   <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-1">
                        <h4 className="font-black text-white text-lg uppercase tracking-tight group-hover:text-cyber-primary transition-colors">{article.title}</h4>
                        <span className="text-[7px] font-black px-2 py-0.5 border border-white/10 rounded text-gray-500 uppercase">{article.category}</span>
                      </div>
                      <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest italic">{article.date} • Transmission Logged</p>
                   </div>
                   <div className="flex gap-3">
                      <Link to={`/blog/${article.slug}`} className="px-5 py-2.5 border border-white/10 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Preview</Link>
                      <button onClick={() => handleCopyJson(article)} className="px-5 py-2.5 bg-cyber-primary text-cyber-bg rounded-xl text-[9px] font-black uppercase tracking-widest hover:shadow-[0_0_15px_#00E5FF] transition-all flex items-center gap-2">
                        <Copy className="w-3 h-3" /> JSON
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};
