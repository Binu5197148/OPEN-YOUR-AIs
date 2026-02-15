import { Prerenderer } from '@prerenderer/prerenderer';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Base routes
const baseRoutes = [
  '/',
  '/tools',
  '/playbooks',
  '/crypto',
  '/blog',
  '/about',
  '/privacy',
  '/terms',
  '/sitemap'
];

// Extract article slugs from constants.ts
function getArticleSlugs() {
  const slugs = [];
  const files = ['constants.ts', 'new-articles.ts', 'new-articles-part2.ts', 'new-articles-part3.ts'];
  
  files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      // Match slug: 'article-slug-here'
      const matches = content.matchAll(/slug: ['"]([^'"]+)['"]/g);
      for (const match of matches) {
        if (match[1].startsWith('art-')) {
          slugs.push(`/blog/${match[1]}`);
        } else if (match[1].includes('-')) {
          // Check if it looks like an article slug (not a tool)
          slugs.push(`/blog/${match[1]}`);
        }
      }
    }
  });
  
  // Remove duplicates
  return [...new Set(slugs)];
}

const articleRoutes = getArticleSlugs();
const routes = [...baseRoutes, ...articleRoutes];

console.log(`Found ${articleRoutes.length} articles to pre-render`);
console.log('Total routes:', routes.length);

async function prerender() {
  const prerenderer = new Prerenderer({
    staticDir: path.join(__dirname, 'dist'),
    renderer: new PuppeteerRenderer({
      renderAfterDocumentEvent: 'render-event',
      renderAfterTime: 5000,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
  });

  try {
    await prerenderer.initialize();
    const renderedRoutes = await prerenderer.renderRoutes(routes);
    
    // Write the rendered HTML files
    for (const route of renderedRoutes) {
      const { originalRoute, html } = route;
      const filePath = path.join(
        __dirname, 
        'dist', 
        originalRoute === '/' ? 'index.html' : `${originalRoute}/index.html`
      );
      
      // Create directory if needed
      const fs = await import('fs/promises');
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(filePath, html);
      console.log(`✓ Pre-rendered: ${originalRoute}`);
    }
    
    console.log('\n✅ Pre-rendering complete!');
  } catch (error) {
    console.error('Pre-rendering failed:', error);
    process.exit(1);
  } finally {
    await prerenderer.destroy();
  }
}

prerender();
