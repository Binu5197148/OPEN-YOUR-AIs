import DOMPurify from 'dompurify';

/**
 * Sanitizes an HTML string to prevent XSS.
 * Uses DOMPurify defaults: strips script tags, event handlers, and
 * dangerous protocols, while preserving safe markup and class attributes.
 */
export const sanitizeHtml = (html: string): string => DOMPurify.sanitize(html);
