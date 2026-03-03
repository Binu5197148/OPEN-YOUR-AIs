#!/usr/bin/env node
/**
 * Static Pre-renderer for OpenYourAIs.com
 * Uses Puppeteer to render each route with full content
 */
import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, 'dist');
const PORT = 4177;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function startServer() {
  const server = createServer((req, res) => {
    if (res.headersSent) return;
    
    let filePath = join(DIST_DIR, req.url === '/' ? '/index.html' : req.url);
    
    if (!existsSync(filePath)) {
      if (existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
      } else if (existsSync(join(filePath, 'index.html'))) {
        filePath = join(filePath, 'index.html');
      } else {
        filePath = join(DIST_DIR, 'index.html');
      }
    }

    const ext = extname(filePath);
    const mime = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      const content = readFileSync(filePath);
      if (!res.headersSent) {
        res.writeHead(200, { 'Content-Type': mime });
        res.end(content);
      }
    } catch {
      if (!res.headersSent) {
        res.writeHead(404);
        res.end('Not found');
      }
    }
  });

  return new Promise(resolve => {
    server.listen(PORT, () => resolve(server));
  });
}

async function prerenderRoute(page, route) {
  const url = `http://localhost:${PORT}${route}`;
  
  // Navigate and wait for network
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Wait for React to hydrate and load lazy components
  await page.waitForFunction(() => {
    // Check if main content is loaded
    const main = document.querySelector('main') || document.querySelector('#root');
    return main && main.children.length > 1;
  }, { timeout: 30000 });
  
  // Extra wait for dynamic content
  await new Promise(r => setTimeout(r, 8000));
  
  // For article pages, wait for article content
  if (route.startsWith('/blog/')) {
    try {
      await page.waitForSelector('article, [class*="article"], h1', { timeout: 20000 });
    } catch {
      console.log(`    ⚠️ No article content found for ${route}`);
    }
  }
  
  return await page.content();
}

async function prerender() {
  // Get article slugs from source files
  const articleFiles = [
    'constants.ts', 'new-articles.ts', 'new-articles-part2.ts',
    'new-articles-part3.ts', 'new-articles-part4.ts',
    'new-articles-2026-02-18.ts', 'expanded-articles.ts', 
    'articles-feb17.ts', 'articles-march-2026.ts'
  ];

  const routes = new Set(['/', '/about', '/contact', '/privacy', '/terms', '/sitemap']);
  
  articleFiles.forEach(file => {
    const filePath = join(__dirname, file);
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf-8');
      const matches = content.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
      for (const match of matches) {
        routes.add(`/blog/${match[1]}`);
      }
    }
  });

  const routeList = [...routes];
  console.log(`🔍 Found ${routeList.length} routes to pre-render\n`);

  const server = await startServer();
  
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    protocolTimeout: 120000
  });

  let success = 0;
  let failed = 0;

  for (const route of routeList) {
    const page = await browser.newPage();
    
    try {
      // Block images/fonts for speed but allow JS
      await page.setRequestInterception(true);
      page.on('request', req => {
        const type = req.resourceType();
        if (['image', 'font', 'media'].includes(type)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      const html = await prerenderRoute(page, route);
      
      // Mark as pre-rendered
      const finalHtml = html.replace('</head>', '<meta name="prerender-status" content="200">\n</head>');

      const outputDir = route === '/' ? DIST_DIR : join(DIST_DIR, route);
      mkdirSync(outputDir, { recursive: true });
      writeFileSync(join(outputDir, 'index.html'), finalHtml, 'utf-8');

      const wordCount = finalHtml.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length;
      console.log(`✅ ${route} (${wordCount} words)`);
      success++;
      
    } catch (err) {
      console.error(`❌ ${route}: ${err.message}`);
      failed++;
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\n📊 ${success} success, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

prerender().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
