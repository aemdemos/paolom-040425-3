/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content
  const cards = [...element.querySelectorAll('.sqs-block-html .sqs-html-content p')];

  if (!cards.length) {
    console.warn('No card elements found');
    return;
  }

  // Prepare table rows
  const headerRow = ['Cards (no images)'];
  const rows = cards.map(card => {
    const heading = document.createElement('strong');

    const cardText = card.textContent.trim();
    if (!cardText) {
      console.warn('Empty card content detected');
      return [''];
    }

    // Include all content in one cell as per requirements
    heading.textContent = cardText;
    return [heading];
  }).filter(row => row.length > 0);

  const cells = [headerRow, ...rows];

  // Create table block
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}