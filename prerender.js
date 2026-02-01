import { Prerenderer } from '@prerenderer/prerenderer';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = [
  '/',
  '/tools',
  '/playbooks',
  '/crypto',
  '/blog',
  '/blog/adsense-approval-masterclass-2025',
  '/blog/unlock-the-future-a-deep-dive-into-google-ai-studio',
  '/blog/flux-2-is-here-black-forest-labs-unveils-new-era',
  '/blog/crypto5-unpacking-the-five-pillars-reshaping-digital-assets',
  '/about',
  '/privacy',
  '/terms',
  '/sitemap'
];

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
