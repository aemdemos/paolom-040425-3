/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  // Extract relevant content from the element
  const title = element.querySelector('h2')?.textContent.trim() || '';

  const paragraphs = Array.from(element.querySelectorAll('p')).map((p) => {
    const strongText = p.querySelector('strong');
    const content = strongText 
      ? [
          strongText.cloneNode(true), 
          document.createTextNode(' ' + p.textContent.replace(strongText.textContent, '').trim())
        ] 
      : document.createTextNode(p.textContent.trim());
    return content;
  });

  // Structure the table
  const rows = paragraphs.map((content, index) => {
    const titleCell = index === 0 ? title : '';
    return [titleCell, content];
  });

  const tableData = [headerRow, ...rows];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}