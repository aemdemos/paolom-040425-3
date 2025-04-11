/* global WebImporter */

export default function parse(element, { document }) {
  const cells = [];

  // First row: header
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Second row: content organized into columns
  const contentBlocks = [...element.querySelectorAll('.fe-block')];

  const columns = contentBlocks
    .map((block) => {
      const elements = [];

      // Extract image
      const image = block.querySelector('img');
      if (image) {
        elements.push(image.cloneNode(true));
      }

      // Extract heading
      const heading = block.querySelector('h2, h3');
      if (heading) {
        const headingElement = document.createElement('h3');
        headingElement.textContent = heading.textContent.trim();
        elements.push(headingElement);
      }

      // Extract paragraph text
      const paragraph = block.querySelector('p');
      if (paragraph) {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraph.textContent.trim();
        elements.push(paragraphElement);
      }

      // Extract button
      const button = block.querySelector('a.sqs-block-button-element');
      if (button) {
        const buttonElement = button.cloneNode(true);
        buttonElement.textContent = button.textContent.trim();
        elements.push(buttonElement);
      }

      // Return elements only if valid content is found
      return elements.length > 0 ? elements : null;
    })
    .filter((column) => column !== null); // Remove empty columns

  if (columns.length > 0) {
    cells.push(columns);
  }

  // Create structured table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured table block
  element.replaceWith(table);
}