#!/usr/bin/env node
/**
 * Article Content Injector
 * Extracts article content from source and injects into HTML files
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const DIST = './dist';

// Read the base index.html
let baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');

// Remove any existing root content div and replace with placeholder
baseHtml = baseHtml.replace(/<div id="root">.*?<\/div>/s, '<div id="root">ARTICLE_PLACEHOLDER</div>');

// Read all article source files
const articleFiles = [
  'articles-march-2026.ts',
  'constants.ts', 
  'new-articles.ts',
  'new-articles-part2.ts',
  'new-articles-part3.ts',
  'new-articles-part4.ts',
  'new-articles-2026-02-18.ts'
];

const articles = [];

for (const file of articleFiles) {
  if (!existsSync(file)) continue;
  const content = readFileSync(file, 'utf-8');
  
  // Extract full article objects - looking for id, slug, title, excerpt, content, image
  const articleRegex = /\{\s*id:\s*['"]([^'"]+)['"]\s*,\s*slug:\s*['"]([^'"]+)['"]\s*,\s*title:\s*["]([^"]+)["][\s\S]*?excerpt:\s*["]([^"]*)"[\s\S]*?content:\s*`([\s\S]*?)`\s*,[\s\S]*?image:\s*['"]([^'"]*)['"]/g;
  
  let match;
  while ((match = articleRegex.exec(content)) !== null) {
    articles.push({
      id: match[1],
      slug: match[2],
      title: match[3],
      excerpt: match[4].replace(/\\"/g, '"'),
      content: match[5].trim(),
      image: match[6]
    });
  }
}

console.log(`Found ${articles.length} articles with content\n`);

// Generate HTML for each article
for (const article of articles) {
  const articleHtml = `
<article class="container mx-auto px-4 py-24 max-w-4xl">
  <header class="mb-16 text-center">
    <h1 class="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tight leading-tight">${article.title}</h1>
    <p class="text-xl text-gray-400 max-w-2xl mx-auto">${article.excerpt}</p>
  </header>
  <div class="prose prose-invert prose-lg max-w-none">
    ${article.content}
  </div>
  <div class="mt-16 pt-8 border-t border-white/10 text-center">
    <a href="/blog" class="inline-flex items-center gap-2 text-cyber-primary font-black uppercase tracking-widest hover:text-white transition-all">
      ← Back to Intel
    </a>
  </div>
</article>`;

  // Build OG tags
  const ogTags = `
    <meta property="og:title" content="${article.title}" />
    <meta property="og:description" content="${article.excerpt}" />
    <meta property="og:image" content="${article.image || 'https://www.openyourais.com/og-image.jpg'}" />
    <meta property="og:url" content="https://www.openyourais.com/blog/${article.slug}" />
    <meta property="og:type" content="article" />
    <meta property="article:author" content="Ulisses Balbino" />
    <meta property="article:published_time" content="${new Date().toISOString()}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${article.title}" />
    <meta name="twitter:description" content="${article.excerpt}" />
    <meta name="twitter:image" content="${article.image || 'https://www.openyourais.com/og-image.jpg'}" />
    <link rel="author" href="https://www.linkedin.com/in/ulissesbalbino/" />`;

  // Customize title and inject content
  let html = baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${article.title} | Open Your AIs</title>`)
    .replace(/content="Master Artificial Intelligence[^"]*"/, `content="${article.excerpt.substring(0, 150)}..."`)
    .replace('</head>', `${ogTags}\n  </head>`)
    .replace('ARTICLE_PLACEHOLDER', articleHtml);

  const outDir = join(DIST, 'blog', article.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  
  console.log(`✅ /blog/${article.slug} (${article.content.length} chars)`);
}

console.log('\nDone!');
