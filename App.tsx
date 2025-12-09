
import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Components';
import { HomePage } from './pages/Home';
import { ToolsPage, PlaybooksPage, CryptoPage, BlogPage } from './pages/ContentPages';
import { ArticleReader, PlaybookReader, CryptoReader, AboutPage, LegalPage, NotFoundPage, SitemapPage } from './pages/DetailPages';
import { AuthProvider } from './context/AuthContext';

// Lazy load AdminPage to isolate module loading errors (e.g. Google GenAI dependency)
const AdminPage = React.lazy(() => import('./pages/Admin').then(module => ({ default: module.AdminPage })));

// ScrollToTop Component to handle scroll behavior on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-primary"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
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
            
            <Route path="/admin" element={
              <Suspense fallback={<LoadingFallback />}>
                <AdminPage />
              </Suspense>
            } />
            
            {/* Real 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
