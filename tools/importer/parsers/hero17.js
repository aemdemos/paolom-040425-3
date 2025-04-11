/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Extract the title
  const title = element.querySelector('h2');
  const titleElement = title ? document.createElement('h1') : undefined;
  if (titleElement) {
    titleElement.textContent = title.textContent.trim();
  }

  // Extract the image
  const image = element.querySelector('img');
  const imageElement = image ? document.createElement('img') : undefined;
  if (imageElement) {
    imageElement.src = image.src;
  }

  // Combine content into the second row
  const secondRow = [
    [titleElement, imageElement].filter(Boolean)
  ];
  cells.push(secondRow);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}