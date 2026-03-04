#!/usr/bin/env node
/**
 * Manual HTML Generator for Articles
 * Creates static HTML files with article content injected
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const DIST = './dist';

// Read the base index.html
const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');

// Read articles from source files
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
  
  // Extract article data with a more robust regex
  const articleRegex = /\{\s*id:\s*['"]([^'"]+)['"]\s*,\s*slug:\s*['"]([^'"]+)['"]\s*,\s*title:\s*["]([^"]+)["]/g;
  
  let match;
  while ((match = articleRegex.exec(content)) !== null) {
    articles.push({
      id: match[1],
      slug: match[2],
      title: match[3]
    });
  }
}

console.log(`Found ${articles.length} articles\n`);

// Generate HTML for each article
for (const article of articles) {
  // Customize title and meta
  let html = baseHtml
    .replace('<title>Open Your AIs', `<title>${article.title} | Open Your AIs`)
    .replace('content="Master Artificial Intelligence', `content="${article.title}. ${article.title.slice(0, 120)}`)
    .replace('<div id="root"></div>', `<div id="root"><!-- Article: ${article.title} --><article><h1>${article.title}</h1></article></div>`);

  const outDir = join(DIST, 'blog', article.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  
  console.log(`✅ /blog/${article.slug}`);
}

console.log('\nDone!');
