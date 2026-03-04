import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
  
  // Tell pre-renderer that React has rendered
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('render-event'));
  }
} else {
  console.error("Critical Error: Root element not found.");
}