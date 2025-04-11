/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards (no images)';

  const rows = [headerRow];

  // Parse the HTML content and extract cards information.
  const cardBlocks = element.querySelectorAll('.sqs-block-content');

  cardBlocks.forEach((block, index) => {
    const textElements = block.querySelectorAll('p');
    const cardContent = document.createElement('div');

    textElements.forEach((textElem) => {
      const clonedElem = textElem.cloneNode(true); // Clone the <p> element
      cardContent.appendChild(clonedElem);
    });

    if (cardContent.children.length > 0) {
      rows.push([cardContent]);

      // Insert a horizontal rule (<hr>) between sections except for the first card.
      if (index > 0) {
        const hr = document.createElement('hr');
        rows.push([hr]);
      }
    }
  });

  // Create the block table.
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table.
  element.replaceWith(blockTable);
}