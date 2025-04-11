/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const cells = [
    headerRow, // Header row
  ];

  // Find all blocks within the element
  const blocks = element.querySelectorAll('.fe-block');

  blocks.forEach((block) => {
    const columnContent = [];

    // Extract image if present
    const imageElement = block.querySelector('img');
    if (imageElement) {
      const img = document.createElement('img');
      img.src = imageElement.src;
      img.alt = imageElement.alt || '';
      columnContent.push(img);
    }

    // Extract title if present
    const titleElement = block.querySelector('h3');
    if (titleElement) {
      const title = document.createElement('h3');
      title.textContent = titleElement.textContent.trim();
      columnContent.push(title);
    }

    // Extract description if present
    const descriptionElement = block.querySelector('p');
    if (descriptionElement) {
      const paragraph = document.createElement('p');
      paragraph.textContent = descriptionElement.textContent.trim();
      columnContent.push(paragraph);
    }

    // Extract button if present and meaningful
    const buttonElement = block.querySelector('a');
    if (buttonElement && buttonElement.textContent.trim()) {
      const button = document.createElement('a');
      button.href = buttonElement.href;
      button.textContent = buttonElement.textContent.trim();
      columnContent.push(button);
    }

    if (columnContent.length > 0) {
      cells.push([columnContent]);
    }
  });

  // Create and replace the original element with the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}