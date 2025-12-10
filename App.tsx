
import React, { Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Components';
import { HomePage } from './pages/Home';
import { ToolsPage, PlaybooksPage, CryptoPage, BlogPage } from './pages/ContentPages';
import { ArticleReader, PlaybookReader, CryptoReader, AboutPage, LegalPage, NotFoundPage, SitemapPage } from './pages/DetailPages';
import { AuthProvider } from './context/AuthContext';

// Lazy load AdminPage to isolate module loading errors (e.g. Google GenAI dependency)
const AdminPage = React.lazy(() => import('./pages/Admin').then(module => ({ default: module.AdminPage })));

// ScrollToTop & Analytics Tracker
// Handles scroll behavior AND Google Analytics pageview tracking
const RouteTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // 1. Scroll to top
    window.scrollTo(0, 0);

    // 2. Track Pageview in GA4
    // We check if gtag is defined (it's in index.html)
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);
  
  return null;
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-primary"></div>
  </div>
);

// Add gtag type to window
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

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
