/**
 * Utility to parse and clean rich text HTML content
 * Removes unnecessary wrapper tags and cleans up formatting
 */
export function parseRichText(html: string | any): string {
  if (!html) return '';
  
  // If it's already a string, use it directly
  let content = typeof html === 'string' ? html : '';
  
  // If it's an object with __html property, extract it
  if (typeof html === 'object' && html.__html) {
    content = html.__html;
  }
  
  // If it's an object with text property, extract it
  if (typeof html === 'object' && html.text) {
    content = html.text;
  }
  
  if (!content) return '';
  
  // Clean up common rich text wrapper issues
  // Remove extra paragraph wrappers that might be causing display issues
  content = content.trim();
  
  return content;
}

/**
 * Get the plain text version of rich text content
 * Useful for previews or when you need just the text
 */
export function getRichTextPlainText(html: string | any): string {
  const parsed = parseRichText(html);
  
  if (!parsed) return '';
  
  // Create a temporary element to extract text content
  const temp = document.createElement('div');
  temp.innerHTML = parsed;
  
  return temp.textContent || temp.innerText || '';
}
