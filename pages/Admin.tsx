
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, SectionTitle } from '../components/Components';
import { GoogleGenAI } from "@google/genai";
import { saveNewArticle, getRandomImageRandom } from '../constants';
import { Article } from '../types';
import { Lock, LogIn, Sparkles, Save, LogOut, CheckCircle, AlertTriangle, Key } from 'lucide-react';

// Helper to safely access environment variables in Vite/Vercel
const getEnvKey = () => {
  // 1. Try standard Vite way
  try {
    // @ts-ignore
    if (import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // ignore error
  }

  // 2. Try process.env (sometimes polyfilled)
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // ignore error
  }
  
  return '';
};

export const AdminPage: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Generator State
  const [topic, setTopic] = useState('');
  // Load key from localStorage if available
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openyourais_gemini_key') || '');
  const [generating, setGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<Article | null>(null);

  // Save key to localStorage whenever it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('openyourais_gemini_key', apiKey);
    }
  }, [apiKey]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError('Invalid Access Key');
    }
  };

  const handleGenerate = async () => {
    if (!topic) return;
    setGenerating(true);
    setError('');

    // Determine which key to use
    const envKey = getEnvKey();
    const keyToUse = apiKey || envKey;

    if (!keyToUse) {
      setError('No API Key detected. Please enter one in the settings below.');
      setGenerating(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: keyToUse });
      
      // STRATEGY: Use Custom Delimiters instead of JSON to avoid parsing errors with HTML quotes
      const systemPrompt = `
        You are an expert tech journalist for "Open Your AIs".
        Write a high-quality, SEO-optimized blog post about the user's topic.
        
        CRITICAL OUTPUT FORMAT INSTRUCTIONS:
        Do NOT return JSON. Do NOT use markdown code blocks.
        You MUST use the following custom delimiters exactly to separate the sections.
        You can use double quotes (") freely inside the content HTML without escaping.

        [[TITLE]]
        (Write the catchy title here)

        [[CATEGORY]]
        (Write exactly one: AI, Crypto, or Monetization)

        [[EXCERPT]]
        (Write a short 2-sentence summary here)

        [[TAGS]]
        (Comma separated tags, e.g. Tech, Future, Guide)

        [[READTIME]]
        (e.g. 5 min)

        [[CONTENT]]
        (Write the full HTML content here. Use <h2>, <p>, <ul>, <li>, <strong>, <em>. Do not use <html>, <head> or <body> tags. Write purely the body content.)
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: topic,
        config: {
          systemInstruction: systemPrompt,
          tools: [{googleSearch: {}}], // Use Grounding to get latest info
        }
      });

      const rawText = response.text || '';
      
      // Helper to extract text between delimiters
      const getSection = (tag: string) => {
        const parts = rawText.split(`[[${tag}]]`);
        if (parts.length < 2) return '';
        // Take the part after the tag, and split by the next possible tag start '[['
        return parts[1].split('[[')[0].trim();
      };

      const title = getSection('TITLE');
      const categoryRaw = getSection('CATEGORY');
      const excerpt = getSection('EXCERPT');
      const tagsRaw = getSection('TAGS');
      const readTime = getSection('READTIME');
      const content = getSection('CONTENT');

      if (!title || !content) {
        console.error("Raw Response:", rawText);
        throw new Error("AI response format was incomplete. Please try again.");
      }

      // Clean up category
      let category: any = 'AI';
      if (categoryRaw.toLowerCase().includes('crypto')) category = 'Crypto';
      if (categoryRaw.toLowerCase().includes('money') || categoryRaw.toLowerCase().includes('monetiz')) category = 'Monetization';

      // Clean up tags
      const tags = tagsRaw.split(',').map(t => t.trim()).filter(t => t.length > 0);
      
      // Determine image based on category using the reliable helper
      const imageUrl = getRandomImageRandom(category);
      
      const newArticle: Article = {
        id: `auto-${Date.now()}`,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: title,
        excerpt: excerpt,
        content: content,
        category: category,
        tags: tags,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: readTime || '5 min',
        image: imageUrl, // Uses the fixed, reliable image URL
        isAutoGenerated: true
      };

      setGeneratedArticle(newArticle);

    } catch (err: any) {
      console.error(err);
      let errorMsg = 'Failed to generate content.';
      if (err.message && err.message.includes('API key')) {
        errorMsg = 'Invalid API Key. Please check your key.';
      } else if (err.message && err.message.includes('400')) {
        errorMsg = 'Bad Request. The topic might violate safety policies.';
      } else {
        errorMsg = `Error: ${err.message || 'Unknown error'}`;
      }
      setError(errorMsg);
    } finally {
      setGenerating(false);
    }
  };

  const handlePublish = () => {
    if (generatedArticle) {
      saveNewArticle(generatedArticle);
      setGeneratedArticle(null);
      setTopic('');
      // Page reload happens in saveNewArticle, but apiKey is safe in localStorage
      alert('Article Published Successfully! Check the Blog page.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Card className="w-full max-w-md p-8 border-cyber-primary/50 shadow-[0_0_50px_rgba(0,229,255,0.1)]">
          <div className="flex justify-center mb-6 text-cyber-primary">
            <Lock className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-center text-white mb-6">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Access Key"
                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-cyber-primary focus:outline-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-cyber-primary text-cyber-bg font-bold py-3 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5" /> Login
            </button>
            <p className="text-center text-gray-500 text-xs mt-4">Demo Credentials: admin / password</p>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <SectionTitle title="Admin Dashboard" subtitle="Manage your content and automation." />
        <button onClick={logout} className="flex items-center gap-2 text-red-400 hover:text-red-300">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* GENERATOR PANEL */}
        <div className="space-y-6">
           {/* API Key Configuration */}
           <Card className="border-gray-800 bg-gray-900/40">
              <div className="flex items-center gap-2 mb-2 text-gray-300 text-sm font-bold uppercase tracking-wider">
                <Key className="w-4 h-4" /> API Configuration
              </div>
              <p className="text-xs text-gray-500 mb-3">If automatic generation fails, paste your Gemini API Key here.</p>
              <input 
                 type="password" 
                 value={apiKey} 
                 onChange={(e) => setApiKey(e.target.value)} 
                 placeholder="Paste your Gemini API Key (Optional)"
                 className="w-full bg-black/40 border border-gray-700 rounded p-2 text-sm text-white focus:border-cyber-primary focus:outline-none"
              />
              <div className="mt-2 flex items-center gap-2 text-xs">
                <div className={`w-2 h-2 rounded-full ${apiKey || getEnvKey() ? 'bg-green-500 shadow-[0_0_5px_lime]' : 'bg-red-500'}`}></div>
                <span className="text-gray-400">
                  {apiKey ? 'Using Custom Key (Saved)' : (getEnvKey() ? 'Using Environment Key' : 'No Key Detected')}
                </span>
              </div>
           </Card>

           <Card className="h-full border-cyber-primary/30">
             <div className="flex items-center gap-2 mb-6 text-cyber-primary">
               <Sparkles className="w-6 h-6" />
               <h3 className="text-xl font-bold">AI Article Generator</h3>
             </div>
             <p className="text-sm text-gray-400 mb-6">
               Enter a topic. The AI will search for recent news, generate a structured article, select a category, and prepare it for publishing.
             </p>
             
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-bold text-gray-300 mb-2">Topic or Keyword</label>
                 <input 
                   type="text" 
                   value={topic}
                   onChange={(e) => setTopic(e.target.value)}
                   placeholder="e.g. 'Bitcoin price surge analysis' or 'New Midjourney V6 features'"
                   className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white focus:border-cyber-primary focus:outline-none"
                 />
               </div>
               
               <button 
                 onClick={handleGenerate} 
                 disabled={generating || !topic}
                 className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${generating ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white hover:shadow-[0_0_20px_rgba(191,0,255,0.4)]'}`}
               >
                 {generating ? (
                   <>Processing... <span className="animate-spin">⏳</span></>
                 ) : (
                   <><Sparkles className="w-5 h-5" /> Generate Content</>
                 )}
               </button>
               {error && <div className="bg-red-900/50 border border-red-500/50 p-3 rounded text-red-200 text-sm text-center">{error}</div>}
             </div>
           </Card>
        </div>

        {/* PREVIEW PANEL */}
        <div>
           <Card className={`h-full ${generatedArticle ? 'border-cyber-success/50' : 'border-gray-800'}`}>
             {!generatedArticle ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-600 min-h-[300px]">
                 <p>Generated content will appear here for review.</p>
               </div>
             ) : (
               <div className="flex flex-col h-full">
                 <div className="bg-cyber-success/10 text-cyber-success px-4 py-2 rounded mb-4 flex items-center gap-2 text-sm">
                   <CheckCircle className="w-4 h-4" /> Content Generated Successfully
                 </div>
                 
                 <div className="bg-black/40 p-4 rounded-lg flex-grow overflow-y-auto max-h-[500px] mb-4 border border-white/10">
                   <h2 className="text-xl font-bold text-white mb-2">{generatedArticle.title}</h2>
                   <div className="flex gap-2 mb-4 text-xs">
                     <span className="bg-cyber-primary/20 text-cyber-primary px-2 py-1 rounded">{generatedArticle.category}</span>
                     <span className="text-gray-400 py-1">{generatedArticle.readTime} read</span>
                   </div>
                   <div className="prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: generatedArticle.content.substring(0, 500) + '...' }} />
                 </div>

                 <div className="flex gap-4">
                   <button 
                     onClick={() => setGeneratedArticle(null)}
                     className="flex-1 py-3 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10"
                   >
                     Discard
                   </button>
                   <button 
                     onClick={handlePublish}
                     className="flex-1 py-3 bg-cyber-success text-black font-bold rounded-lg hover:bg-green-400 flex items-center justify-center gap-2"
                   >
                     <Save className="w-4 h-4" /> Publish Now
                   </button>
                 </div>
               </div>
             )}
           </Card>
        </div>
      </div>
      
      {/* DISCLAIMER */}
      <div className="mt-8 bg-yellow-900/20 border border-yellow-700/50 p-4 rounded-lg flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-yellow-500 mb-1">AdSense Best Practice</h4>
          <p className="text-sm text-gray-400">
            While this AI generator creates high-quality structures, always review the content before publishing. Add your own unique perspective or "human touch" to ensuring it meets Google's "Helpful Content" guidelines. Purely AI-generated content without review can be flagged.
          </p>
        </div>
      </div>
    </div>
  );
};
