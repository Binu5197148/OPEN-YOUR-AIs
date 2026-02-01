import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Components';
import { HomePage } from './pages/Home';
import { ToolsPage, PlaybooksPage, CryptoPage, BlogPage } from './pages/ContentPages';
import { ArticleReader, PlaybookReader, CryptoReader, AboutPage, LegalPage, NotFoundPage, SitemapPage } from './pages/DetailPages';
import { AdminPage } from './pages/Admin';
import { AuthProvider } from './context/AuthContext';

const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Update document title based on route
    const titles: Record<string, string> = {
      '/': 'Open Your AIs | Future Tech & Wealth Intelligence',
      '/tools': 'AI Tools Directory | Open Your AIs',
      '/playbooks': 'Monetization Playbooks | Open Your AIs',
      '/crypto': 'Crypto Intelligence | Open Your AIs',
      '/blog': 'Tech Intel Blog | Open Your AIs',
      '/about': 'About | Open Your AIs',
      '/privacy': 'Privacy Policy | Open Your AIs',
      '/terms': 'Terms of Service | Open Your AIs',
      '/sitemap': 'Sitemap | Open Your AIs',
    };
    document.title = titles[location.pathname] || 'Open Your AIs | Future Tech & Wealth Intelligence';
    
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'G-XXXXXXXXXX', {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
  }, [location]);
  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouteTracker />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/playbooks" element={<PlaybooksPage />} />
            <Route path="/playbooks/:id" element={<PlaybookReader />} />
            <Route path="/crypto" element={<CryptoPage />} />
            <Route path="/crypto/:id" element={<CryptoReader />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<ArticleReader />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;