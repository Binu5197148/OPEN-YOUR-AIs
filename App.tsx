import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
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
      <HashRouter>
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
      </HashRouter>
    </AuthProvider>
  );
};

export default App;