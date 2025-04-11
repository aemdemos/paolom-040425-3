/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row based on example structure
  const headerRow = ['Table (no header)'];
  cells.push(headerRow);

  // Extract image block
  const imageBlock = element.querySelector('.image-block img');
  if (imageBlock) {
    const image = document.createElement('img');
    image.src = imageBlock.src;
    image.alt = imageBlock.alt || '';
    cells.push([image]);
  }

  // Extract address block
  const addressBlock = element.querySelector('.fe-block-yui_3_17_2_1_1729204014804_41853 .sqs-html-content p');
  if (addressBlock) {
    cells.push([addressBlock.cloneNode(true)]);
  }

  // Extract link blocks
  const linkBlocks = element.querySelectorAll('.fe-block .sqs-html-content a');
  linkBlocks.forEach((linkBlock) => {
    const link = document.createElement('a');
    link.href = linkBlock.href;
    link.textContent = linkBlock.textContent;
    cells.push([link]);
  });

  // Extract copyright block
  const copyrightBlock = element.querySelector('.fe-block-yui_3_17_2_1_1729204014804_43823 .sqs-html-content p');
  if (copyrightBlock) {
    cells.push([copyrightBlock.cloneNode(true)]);
  }

  // Create the new table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}