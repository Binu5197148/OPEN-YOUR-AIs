// This script generates a dynamic sitemap.xml with all articles, playbooks, and guides
// Run it before build to ensure the sitemap is up-to-date

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = 'https://www.openyourais.com';

// Read all article files to extract article data
function extractDataFromConstants() {
    let articles = [];

    // Files to read for articles
    const files = [
        'constants.ts',
        'new-articles.ts',
        'new-articles-part2.ts',
        'new-articles-part3.ts',
        'new-articles-part4.ts',
        'new-articles-2026-02-18.ts',
        'articles-feb17.ts',
        'articles-march-2026.ts',
        'expanded-articles.ts'
    ];


    files.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');

            // Look for article objects with slug and date
            // Match pattern: slug: '...', followed by date: '...'
            const articleMatches = content.matchAll(/slug: ['"]([^'"]+)['"][\s\S]*?(?:publishD|d)ate: ['"]([^'"]+)['"]/g);
            for (const match of articleMatches) {
                // Only add if it looks like an article slug (not a tool)
                if (match[1].startsWith('art-') || match[1].includes('-')) {
                    articles.push({
                        slug: match[1],
                        date: match[2]
                    });
                }
            }
        }
    });

    // Remove duplicates based on slug
    const uniqueArticles = [];
    const seenSlugs = new Set();
    articles.forEach(article => {
        if (!seenSlugs.has(article.slug)) {
            seenSlugs.add(article.slug);
            uniqueArticles.push(article);
        }
    });

    // If no articles found, use fallback list
    if (uniqueArticles.length === 0) {
        uniqueArticles = [
            { slug: 'adsense-approval-masterclass-2025', date: '2025-12-22' },
            { slug: 'unlock-the-future-a-deep-dive-into-google-ai-studio', date: '2025-12-18' },
            { slug: 'flux-2-is-here-black-forest-labs-unveils-new-era', date: '2025-12-15' },
            { slug: 'crypto5-unpacking-the-five-pillars-reshaping-digital-assets', date: '2025-12-10' }
        ];
    }

    return uniqueArticles;
}

// Static routes
const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/tools', priority: '0.9', changefreq: 'weekly' },
    { url: '/playbooks', priority: '0.9', changefreq: 'weekly' },
    // /crypto removido — conteúdo crypto desprioritizado no reposicionamento editorial
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
    { url: '/terms', priority: '0.5', changefreq: 'yearly' },
    { url: '/sitemap', priority: '0.5', changefreq: 'monthly' },
];

// Slugs marcados como noindex — excluídos do sitemap
const NOINDEX_SLUGS = new Set([
  'defi-yield-strategies-2026',
  'crypto-airdrops-strategy-guide',
  'nft-utility-beyond-art-2026',
  'solana-ecosystem-deep-dive',
  'bitcoin-etf-institutional-playbook',
  'how-to-make-money-ai-crypto-2026-complete-guide',
  'affiliate-marketing-ai-automation-2026',
  'digital-products-passive-income-2026',
  'content-monetization-strategies-2026',
  'saas-pricing-psychology-strategies',
  'polsia-autonomous-ai-company-builder-review',
  // Hidden slugs that return 404 — remove from sitemap to avoid soft 404s
  'ai-sales-agents-million-dollar-revenue-streams-2026',
  'ai-agents-digital-millionaires-2026',
  'ai-security-business-opportunities-2026',
  'anthropic-cowork-revolution-agentic-ai',
  'validacao-ia-ideias-negocio-2026',
  'adsense-approval-masterclass-2025',
  // Crypto content — accessible but noindex
  'crypto5-unpacking-the-five-pillars-reshaping-digital-assets',
  'real-state-crypto-2026-no-hype-just-data',
]);

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

    // Add article URLs (excluindo noindex)
    articles.forEach(article => {
        if (NOINDEX_SLUGS.has(article.slug)) return;
        // Convert date from "Mar 3, 2026" to "2026-03-03" ISO format
        let articleDate = today;
        if (article.date) {
            try {
                const dateObj = new Date(article.date);
                if (!isNaN(dateObj)) {
                    articleDate = dateObj.toISOString().split('T')[0];
                }
            } catch (e) { }
        }
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