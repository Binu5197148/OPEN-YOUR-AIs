
import React from 'react';
import { HashRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { Layout } from './components/Components';
import { HomePage } from './pages/Home';
import { ToolsPage, PlaybooksPage, CryptoPage, BlogPage } from './pages/ContentPages';
import { ArticleReader, PlaybookReader, CryptoReader, AboutPage, LegalPage, NotFoundPage, SitemapPage } from './pages/DetailPages';
import { AdminPage } from './pages/Admin';
import { AuthProvider } from './context/AuthContext';

// ScrollToTop Component to handle scroll behavior on route change
const ScrollToTop = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
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
            
            {/* Real 404 Page instead of Redirect */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
