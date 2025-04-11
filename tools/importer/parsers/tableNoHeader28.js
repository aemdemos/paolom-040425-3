/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (no header)'];

  // Dynamically extract content from the given element
  const contentRows = Array.from(element.querySelectorAll('.content-wrapper .content div > div')).map(row => {
    return [row.textContent.trim()];
  });

  // If no content is found, set a default empty row
  if (contentRows.length === 0) {
    contentRows.push(['No data']);
  }

  // Create table block
  const cells = [headerRow, ...contentRows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}