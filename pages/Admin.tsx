
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, SectionTitle } from '../components/Components';
import { GoogleGenAI } from "@google/genai";
import { saveNewArticle, getRandomImageRandom } from '../constants';
import { Article } from '../types';
import { Lock, LogIn, Sparkles, Save, LogOut, CheckCircle, AlertTriangle, Copy, Trash2, FileText, Image as ImageIcon } from 'lucide-react';

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
        console.error('Failed to parse local articles');
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
    setGenerating(true);
    setError('');

    try {
      // Create fresh instance for the latest API key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemPrompt = `
        You are a world-class SEO content strategist and tech journalist for "Open Your AIs".
        Your goal is to write a comprehensive, high-authority article that satisfies Google AdSense quality guidelines.
        
        LENGTH & QUALITY REQUIREMENTS:
        - Content must be extremely detailed, providing deep analysis and unique insights.
        - Target word count: 1500 to 2500 words.
        - Use professional, engaging, and authoritative tone.
        - Structure with H2 and H3 tags for readability.
        - Include bullet points, numbered lists, and bold text for key concepts.
        - Ensure 100% original content optimized for high-volume keywords related to the topic.

        CRITICAL OUTPUT FORMAT INSTRUCTIONS:
        Do NOT return JSON. Do NOT use markdown code blocks.
        You MUST use the following custom delimiters exactly to separate the sections.

        [[TITLE]]
        (Catchy, click-worthy SEO title)

        [[CATEGORY]]
        (Exactly one: AI, Crypto, or Monetization)

        [[EXCERPT]]
        (2-3 sentences of compelling hook summary)

        [[TAGS]]
        (Comma separated tags)

        [[READTIME]]
        (e.g. 12 min)

        [[CONTENT]]
        (The full HTML content. Use <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>. 
        Start with a strong intro, followed by deep sections, a 'Pro Tips' box using a <div> with classes 'bg-cyber-primary/10 border-l-4 border-cyber-primary p-4 my-6', and a comprehensive conclusion.)
      `;

      // Using Gemini 3 Pro Preview for maximum reasoning and quality
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Write an authoritative deep-dive article about: ${topic}`,
        config: {
          systemInstruction: systemPrompt,
          thinkingConfig: { thinkingBudget: 32768 }, // Enable deep thinking for high-quality reasoning
          tools: [{googleSearch: {}}], // Use Grounding for factual accuracy
        }
      });

      const rawText = response.text || '';
      
      const getSection = (tag: string) => {
        const parts = rawText.split(`[[${tag}]]`);
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
        console.error("Raw Response:", rawText);
        throw new Error("AI response format was incomplete. Please try again with a more specific topic.");
      }

      let category: any = 'AI';
      if (categoryRaw.toLowerCase().includes('crypto')) category = 'Crypto';
      if (categoryRaw.toLowerCase().includes('money') || categoryRaw.toLowerCase().includes('monetiz')) category = 'Monetization';

      const tags = tagsRaw.split(',').map(t => t.trim()).filter(t => t.length > 0);
      
      const imageUrl = customImage.trim() ? customImage.trim() : getRandomImageRandom(category);
      
      const newArticle: Article = {
        id: `auto-${Date.now()}`,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: title,
        excerpt: excerpt,
        content: content,
        category: category,
        tags: tags,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: readTime || '10 min',
        image: imageUrl,
        isAutoGenerated: true
      };

      setGeneratedArticle(newArticle);

      // Save to local session storage immediately as backup
      const existingSavedStr = localStorage.getItem('openyourais_new_articles');
      let existingSaved: Article[] = existingSavedStr ? JSON.parse(existingSavedStr) : [];
      existingSaved = [newArticle, ...existingSaved];
      localStorage.setItem('openyourais_new_articles', JSON.stringify(existingSaved));
      setLocalArticles(existingSaved);

    } catch (err: any) {
      console.error(err);
      let errorMsg = 'Failed to generate content.';
      if (err.message && err.message.includes('API Key')) {
        errorMsg = "API Key error. Please ensure you have a valid project selected.";
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
      const updatedList = saveNewArticle(generatedArticle);
      if (updatedList.length > 0) {
        setLocalArticles(updatedList);
      } else {
        setLocalArticles(prev => [generatedArticle, ...prev]);
      }
      setGeneratedArticle(null);
      alert('Article published locally! Copy JSON to make it permanent.');
    }
  };

  const handleCopyJson = (article: Article) => {
    const json = JSON.stringify(article, null, 2);
    navigator.clipboard.writeText(json);
    alert('Article Data Copied!');
  };

  const clearLocalArticles = () => {
    if(confirm('Clear local history?')) {
      localStorage.removeItem('openyourais_new_articles');
      setLocalArticles([]);
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
            <p className="text-center text-gray-500 text-xs mt-4">Credentials: admin / password</p>
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

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
           <Card className="h-full border-cyber-primary/30">
             <div className="flex items-center gap-2 mb-6 text-cyber-primary">
               <Sparkles className="w-6 h-6" />
               <h3 className="text-xl font-bold">Gemini 3 Pro Generator</h3>
             </div>
             <p className="text-sm text-gray-400 mb-6">
               Leveraging Gemini 3 Pro Preview with Thinking mode for high-authority SEO content.
             </p>
             
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-bold text-gray-300 mb-2">Detailed Topic</label>
                 <input 
                   type="text" 
                   value={topic}
                   onChange={(e) => setTopic(e.target.value)}
                   placeholder="e.g. 'The complete impact of decentralized finance on traditional banking in 2025'"
                   className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white focus:border-cyber-primary focus:outline-none"
                 />
               </div>

               <div>
                 <label className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                   <ImageIcon className="w-4 h-4 text-cyber-secondary" /> Custom Image URL
                 </label>
                 <input 
                   type="text" 
                   value={customImage}
                   onChange={(e) => setCustomImage(e.target.value)}
                   placeholder="Unsplash URL"
                   className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white focus:border-cyber-secondary focus:outline-none"
                 />
               </div>
               
               <button 
                 onClick={handleGenerate} 
                 disabled={generating || !topic}
                 className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all mt-4 ${generating ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white hover:shadow-[0_0_20px_rgba(191,0,255,0.4)]'}`}
               >
                 {generating ? (
                   <>Thinking and Writing... <span className="animate-spin ml-2">⏳</span></>
                 ) : (
                   <><Sparkles className="w-5 h-5" /> Generate High-Authority Article</>
                 )}
               </button>
               {error && <div className="bg-red-900/50 border border-red-500/50 p-3 rounded text-red-200 text-sm text-center">{error}</div>}
             </div>
           </Card>
        </div>

        <div>
           <Card className={`h-full ${generatedArticle ? 'border-cyber-success/50' : 'border-gray-800'}`}>
             {!generatedArticle ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-600 min-h-[300px]">
                 <p>Content preview will appear here.</p>
               </div>
             ) : (
               <div className="flex flex-col h-full">
                 <div className="bg-cyber-success/10 text-cyber-success px-4 py-2 rounded mb-4 flex items-center gap-2 text-sm">
                   <CheckCircle className="w-4 h-4" /> Ready for Review (Long-form Content)
                 </div>
                 
                 <div className="bg-black/40 p-4 rounded-lg flex-grow overflow-y-auto max-h-[500px] mb-4 border border-white/10">
                   <div className="h-40 mb-4 rounded overflow-hidden">
                      <img src={generatedArticle.image} alt="Preview" className="w-full h-full object-cover" />
                   </div>
                   <h2 className="text-xl font-bold text-white mb-2">{generatedArticle.title}</h2>
                   <div className="flex gap-2 mb-4 text-xs">
                     <span className="bg-cyber-primary/20 text-cyber-primary px-2 py-1 rounded">{generatedArticle.category}</span>
                     <span className="text-gray-400 py-1">{generatedArticle.readTime} read</span>
                   </div>
                   <div className="prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: generatedArticle.content.substring(0, 500) + '...' }} />
                   <p className="text-cyber-primary text-xs mt-4">Scroll to read more in the final article...</p>
                 </div>

                 <div className="flex flex-col gap-3">
                    <div className="flex gap-4">
                        <button onClick={() => setGeneratedArticle(null)} className="flex-1 py-3 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10">Discard</button>
                        <button onClick={handlePublish} className="flex-1 py-3 bg-cyber-success text-black font-bold rounded-lg hover:bg-green-400 flex items-center justify-center gap-2">
                            <Save className="w-4 h-4" /> Publish
                        </button>
                    </div>
                    <button onClick={() => handleCopyJson(generatedArticle)} className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2 text-sm">
                        <Copy className="w-4 h-4" /> Copy JSON Data
                    </button>
                 </div>
               </div>
             )}
           </Card>
        </div>
      </div>

      {localArticles.length > 0 && (
        <div className="mb-12">
           <div className="flex items-center justify-between mb-6">
             <h3 className="text-2xl font-bold text-white flex items-center gap-2">
               <FileText className="text-cyber-secondary" /> History
             </h3>
             <button onClick={clearLocalArticles} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
               <Trash2 className="w-3 h-3" /> Clear
             </button>
           </div>
           
           <div className="grid gap-4">
              {localArticles.map((article) => (
                <div key={article.id} className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
                   <div className="flex-grow">
                      <h4 className="font-bold text-white text-lg">{article.title}</h4>
                      <p className="text-xs text-gray-400">{article.date} • {article.category}</p>
                   </div>
                   <button onClick={() => handleCopyJson(article)} className="px-4 py-2 bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/50 rounded hover:bg-cyber-primary hover:text-black transition-colors flex items-center gap-2">
                     <Copy className="w-4 h-4" /> Copy JSON
                   </button>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};
