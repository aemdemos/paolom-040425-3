/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const cards = Array.from(element.querySelectorAll('.sqs-html-content')).map((cardElement) => {
    const titleElement = cardElement.querySelector('h2');
    const title = titleElement?.textContent?.trim() || ''; // Correctly extract title
    const paragraphs = cardElement.querySelectorAll('p');

    const description = paragraphs.length > 0
      ? Array.from(paragraphs).map((p) => p.textContent?.trim()).join(' ') // Correctly extract description
      : ''; // Handle missing paragraphs gracefully

    if (title || description) {
      const cellContent = [];
      if (title) {
        const strongTitle = document.createElement('strong');
        strongTitle.textContent = title;
        cellContent.push(strongTitle);
      }
      if (description) {
        cellContent.push(document.createTextNode(description));
      }
      return [cellContent];
    }
    return null; // Skip empty rows
  }).filter(row => row); // Filter invalid rows

  const tableData = [headerRow, ...cards];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}