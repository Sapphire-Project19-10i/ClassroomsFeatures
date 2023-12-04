import DOMPurify from 'dompurify';

function sanitizeHTML(dirty) {
  return { __html: DOMPurify.sanitize(dirty) };
}

export { sanitizeHTML };