import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Components';
import { AuthProvider } from './context/AuthContext';

// Eager load: Home page (critical path - first paint)
import { HomePage } from './pages/Home';

// Lazy load: Content pages (loaded on demand)
const ToolsPage = lazy(() => import('./pages/ContentPages').then(m => ({ default: m.ToolsPage })));
const PlaybooksPage = lazy(() => import('./pages/ContentPages').then(m => ({ default: m.PlaybooksPage })));
const BlogPage = lazy(() => import('./pages/ContentPages').then(m => ({ default: m.BlogPage })));

// Lazy load: Detail pages (loaded on demand)
const ArticleReader = lazy(() => import('./pages/DetailPages').then(m => ({ default: m.ArticleReader })));
const PlaybookReader = lazy(() => import('./pages/DetailPages').then(m => ({ default: m.PlaybookReader })));
const AboutPage = lazy(() => import('./pages/DetailPages').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/DetailPages').then(m => ({ default: m.ContactPage })));
const LegalPage = lazy(() => import('./pages/DetailPages').then(m => ({ default: m.LegalPage })));
const NotFoundPage = lazy(() => import('./pages/DetailPages').then(m => ({ default: m.NotFoundPage })));
const SitemapPage = lazy(() => import('./pages/DetailPages').then(m => ({ default: m.SitemapPage })));

// Lazy load: Admin page (rarely accessed)
const AdminPage = lazy(() => import('./pages/Admin').then(m => ({ default: m.AdminPage })));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-cyber-primary/20 border-t-cyber-primary rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Loading Intelligence...</p>
    </div>
  </div>
);

const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Update document title based on route
    const titles: Record<string, string> = {
      '/': 'Open Your AIs | Future Tech & Wealth Intelligence',
      '/tools': 'AI Tools Directory | Open Your AIs',
      '/playbooks': 'Monetization Playbooks | Open Your AIs',
      '/blog': 'Tech Intel Blog | Open Your AIs',
      '/about': 'About Us | Open Your AIs',
      '/contact': 'Contact Us | Open Your AIs',
      '/privacy': 'Privacy Policy | Open Your AIs',
      '/terms': 'Terms of Service | Open Your AIs',
      '/sitemap': 'Sitemap | Open Your AIs',
    };
    document.title = titles[location.pathname] || 'Open Your AIs | Future Tech & Wealth Intelligence';

    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'G-EBZ4F0ZXRY', {
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
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/playbooks" element={<PlaybooksPage />} />
              <Route path="/playbooks/:id" element={<PlaybookReader />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<ArticleReader />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<LegalPage type="privacy" />} />
              <Route path="/terms" element={<LegalPage type="terms" />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
