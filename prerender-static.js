#!/usr/bin/env node
/**
 * Static Pre-renderer for OpenYourAIs.com
 * Uses Puppeteer directly to render each route and save static HTML.
 * This ensures Google/AdSense crawlers see full content.
 */
import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, 'dist');
const PORT = 4176;

// ---- Collect all routes ----
function getAllRoutes() {
  const routes = new Set([
    '/',
    '/tools',
    '/playbooks',
    '/crypto',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/sitemap',
  ]);

  // Extract article slugs
  const articleFiles = [
    'constants.ts', 'new-articles.ts', 'new-articles-part2.ts',
    'new-articles-part3.ts', 'new-articles-part4.ts',
    'new-articles-2026-02-18.ts', 'expanded-articles.ts', 'articles-feb17.ts',
    'articles-march-2026.ts'
  ];

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

  // Playbook routes
  ['p1', 'p2', 'p3', 'p4', 'p5'].forEach(id => routes.add(`/playbooks/${id}`));

  // Crypto routes
  ['cg1', 'cg2', 'cg3'].forEach(id => routes.add(`/crypto/${id}`));

  return [...routes];
}

// ---- Simple static file server ----
function startServer() {
  const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.webmanifest': 'application/manifest+json',
    '.txt': 'text/plain',
    '.xml': 'application/xml',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
  };

  const server = createServer((req, res) => {
    let filePath = join(DIST_DIR, req.url === '/' ? '/index.html' : req.url);

    // If file doesn't exist, serve index.html (SPA fallback)
    if (!existsSync(filePath)) {
      // Try with .html
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
      res.writeHead(200, { 'Content-Type': mime });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise(resolve => {
    server.listen(PORT, () => {
      console.log(`📡 Static server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

// ---- Main pre-render logic ----
async function prerender() {
  const routes = getAllRoutes();
  console.log(`\n🔍 Found ${routes.length} routes to pre-render\n`);

  const server = await startServer();

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  let success = 0;
  let failed = 0;

  for (const route of routes) {
    try {
      const page = await browser.newPage();

      // Block unnecessary resources for speed
      await page.setRequestInterception(true);
      page.on('request', req => {
        const type = req.resourceType();
        if (['image', 'font', 'media'].includes(type)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      const url = `http://localhost:${PORT}${route}`;
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // Wait for React to fully render (including lazy-loaded components)
      // networkidle0 should handle lazy chunk loading, but add extra wait
      await page.waitForSelector('footer', { timeout: 15000 }).catch(() => {});
      await new Promise(r => setTimeout(r, 5000));

      // Get the full rendered HTML
      let html = await page.content();

      // Clean up: remove scripts that aren't needed for static content
      // but KEEP the AdSense script
      // Add a meta tag to indicate this is pre-rendered
      html = html.replace('</head>', '  <meta name="prerender-status" content="200">\n  </head>');

      // Determine output path
      const outputDir = route === '/'
        ? DIST_DIR
        : join(DIST_DIR, route);

      mkdirSync(outputDir, { recursive: true });

      const outputFile = join(outputDir, 'index.html');
      writeFileSync(outputFile, html, 'utf-8');

      // Check content length
      const textContent = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      const wordCount = textContent.split(' ').length;

      console.log(`  ✅ ${route} (${wordCount} words, ${(html.length / 1024).toFixed(1)}KB)`);
      success++;

      await page.close();
    } catch (err) {
      console.error(`  ❌ ${route}: ${err.message}`);
      failed++;
    }
  }

  await browser.close();
  server.close();

  console.log(`\n📊 Results: ${success} success, ${failed} failed out of ${routes.length} routes`);

  if (failed > 0) {
    process.exit(1);
  }
}

prerender().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
