import React, { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem', 
          backgroundColor: '#0A0E1A', 
          color: '#E0FFFE', 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          fontFamily: 'sans-serif'
        }}>
          <h1 style={{color: '#FF0080', fontSize: '2rem', marginBottom: '1rem'}}>System Critical Failure</h1>
          <p style={{marginBottom: '2rem', maxWidth: '600px', textAlign: 'center'}}>
            The neural link has been severed. Please check the console for more details.
          </p>
          <pre style={{
            background: '#111625', 
            padding: '1rem', 
            borderRadius: '8px', 
            border: '1px solid #00E5FF',
            color: '#00E5FF',
            maxWidth: '80vw',
            overflow: 'auto'
          }}>
            {this.state.error?.toString()}
          </pre>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);