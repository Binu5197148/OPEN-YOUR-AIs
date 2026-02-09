// This script generates a dynamic sitemap.xml with all articles, playbooks, and guides
// Run it before build to ensure the sitemap is up-to-date

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = 'https://www.openyourais.com';

// Read the constants.ts file to extract article data
// Since we can't directly import TypeScript, we'll read and parse it
function extractDataFromConstants() {
    const constantsPath = path.join(__dirname, 'constants.ts');
    const content = fs.readFileSync(constantsPath, 'utf-8');

    // Extract ALL_ARTICLES array
    const articlesMatch = content.match(/export const ALL_ARTICLES: Article\[\] = (\[[\s\S]*?\]);/);
    let articles = [];

    if (articlesMatch) {
        try {
            // Simple parsing - extract slugs and dates from the array
            const articleMatches = content.matchAll(/slug: ['"]([^'"]+)['"][\s\S]*?date: ['"]([^'"]+)['"]/g);
            for (const match of articleMatches) {
                articles.push({
                    slug: match[1],
                    date: match[2]
                });
            }
        } catch (e) {
            console.log('Note: Using fallback article list');
        }
    }

    // If no articles found, use fallback list based on the sitemap
    if (articles.length === 0) {
        articles = [
            { slug: 'adsense-approval-masterclass-2025', date: '2025-12-22' },
            { slug: 'unlock-the-future-a-deep-dive-into-google-ai-studio', date: '2025-12-18' },
            { slug: 'flux-2-is-here-black-forest-labs-unveils-new-era', date: '2025-12-15' },
            { slug: 'crypto5-unpacking-the-five-pillars-reshaping-digital-assets', date: '2025-12-10' }
        ];
    }

    return articles;
}

// Static routes
const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/tools', priority: '0.9', changefreq: 'weekly' },
    { url: '/playbooks', priority: '0.9', changefreq: 'weekly' },
    { url: '/crypto', priority: '0.9', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/sitemap', priority: '0.5', changefreq: 'monthly' },
];

// Generate sitemap XML
function generateSitemap() {
    const today = new Date().toISOString().split('T')[0];
    const articles = extractDataFromConstants();

    let urls = staticRoutes.map(route => `
  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('');

    // Add article URLs
    articles.forEach(article => {
        const articleDate = article.date || today;
        urls += `
  <url>
    <loc>${BASE_URL}/blog/${article.slug}</loc>
    <lastmod>${articleDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    // Write to public folder
    const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
    fs.writeFileSync(outputPath, sitemap);

    console.log(`✅ Sitemap generated with ${staticRoutes.length + articles.length} URLs`);
    console.log(`📄 Saved to: ${outputPath}`);
}

generateSitemap();