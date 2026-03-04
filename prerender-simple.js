#!/usr/bin/env node
import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIST = './dist';
const PORT = 4178;

const server = createServer((req, res) => {
  let path = join(DIST, req.url === '/' ? 'index.html' : req.url);
  if (!existsSync(path)) path = join(DIST, 'index.html');
  try {
    res.end(readFileSync(path));
  } catch {
    res.end(readFileSync(join(DIST, 'index.html')));
  }
});

async function render(page, route) {
  await page.goto(`http://localhost:${PORT}${route}`, {
    waitUntil: 'networkidle2',
    timeout: 120000
  });
  
  // Long wait for React lazy loading
  await new Promise(r => setTimeout(r, 10000));
  
  return await page.content();
}

async function main() {
  await new Promise(r => server.listen(PORT, r));
  console.log('Server ready');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-gpu']
  });

  // Get routes
  const files = ['articles-march-2026.ts', 'constants.ts'];
  const routes = new Set();
  
  for (const f of files) {
    if (!existsSync(f)) continue;
    const content = readFileSync(f, 'utf-8');
    for (const match of content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)) {
      routes.add(`/blog/${match[1]}`);
    }
  }

  const routeList = [...routes];
  console.log(`Rendering ${routeList.length} articles...\n`);

  for (const route of routeList) {
    const page = await browser.newPage();
    try {
      const html = await render(page, route);
      const outDir = join(DIST, route);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), html);
      
      const words = html.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length;
      console.log(`✅ ${route} (${words} words)`);
    } catch (err) {
      console.log(`❌ ${route}: ${err.message}`);
    }
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('\nDone!');
}

main().catch(console.error);
