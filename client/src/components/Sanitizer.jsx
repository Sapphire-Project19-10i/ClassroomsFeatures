import DOMPurify from 'dompurify';

export default function sanitizeHTML(dirty) {
  return { __html: DOMPurify.sanitize(dirty) };
}
