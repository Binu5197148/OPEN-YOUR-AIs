import { createHmac } from 'crypto';
import { GoogleGenAI } from '@google/genai';

function validateToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.slice(7);
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const secret = process.env.SESSION_SECRET || adminPassword;
  const expected = createHmac('sha256', secret).update('admin_session').digest('hex');
  return token === expected;
}

function getSection(rawText, tag) {
  const marker = `[[${tag}]]`;
  const parts = rawText.split(marker);
  if (parts.length < 2) return '';
  return parts[1].split('[[')[0].trim();
}

const SYSTEM_PROMPT = `
  You are a World-Class Senior Content Architect for "Open Your AIs".
  Your mission is to produce an exhaustive "Authority Guide" that establishes the site as a top-tier intelligence hub for Google AdSense compliance.

  WORD COUNT TARGET: 1,500 - 2,500 words.
  EDITORIAL DEPTH: PhD-level technical analysis, industry trends, and step-by-step implementation logic.

  ARTICLE STRUCTURE:
  1. Executive Summary: High-impact hook.
  2. Evolution & Architecture: The history and tech stack.
  3. Core Mechanics: Deep dive into how it works.
  4. Practical Execution: Actionable guide for the reader.
  5. Future Implications: Socio-economic impact and 5-year outlook.
  6. Technical Insight Box: Specific technical nuance.
  7. Comprehensive FAQ: 5 complex, multi-layered questions and answers.

  FORMATTING RULES:
  - Use standard HTML tags: <h2>, <h3>, <h4>, <p>, <ul>, <li>, <strong>, <em>.
  - Create a specialized "Technical Insight" container using: <div class="bg-cyber-primary/10 border-l-4 border-cyber-primary p-6 my-8 rounded-r-2xl border border-white/5">...</div>.
  - NO Markdown code blocks. Output plain text with HTML tags inside.

  OUTPUT PROTOCOL:
  Use these exact markers for parsing:

  [[TITLE]]
  (SEO-Optimized Title)

  [[CATEGORY]]
  (AI, Crypto, or Monetization)

  [[EXCERPT]]
  (Technical hook summary)

  [[TAGS]]
  (Comma separated list)

  [[READTIME]]
  (e.g., 22 min)

  [[CONTENT]]
  (The full HTML content body)
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!validateToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { topic } = req.body || {};
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Write a definitive, exhaustive, and highly technical authority article about: "${topic}". Focus on professional terminology, long-form depth (2000 words), and actionable intelligence.`,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        tools: [{ googleSearch: {} }],
      },
    });

    const rawText = response.text || '';

    const title = getSection(rawText, 'TITLE');
    const categoryRaw = getSection(rawText, 'CATEGORY');
    const excerpt = getSection(rawText, 'EXCERPT');
    const tagsRaw = getSection(rawText, 'TAGS');
    const readTime = getSection(rawText, 'READTIME');
    const content = getSection(rawText, 'CONTENT');

    if (!title || !content) {
      return res.status(422).json({ error: 'AI output was malformed. Please try again.' });
    }

    let category = 'AI';
    if (categoryRaw.toLowerCase().includes('crypto')) category = 'Crypto';
    else if (categoryRaw.toLowerCase().includes('money') || categoryRaw.toLowerCase().includes('monetiz')) category = 'Monetization';

    const tags = tagsRaw.split(',').map(t => t.trim()).filter(t => t.length > 0);

    return res.status(200).json({ title, category, excerpt, tags, readTime, content });
  } catch (err) {
    console.error('Generation error:', err);
    return res.status(500).json({ error: err.message || 'Generation failed' });
  }
}
