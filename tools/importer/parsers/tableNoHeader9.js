/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Table (no header)'];

  const cells = [headerRow];

  // Extracting content blocks
  const blocks = element.querySelectorAll('.fe-block');

  blocks.forEach((block) => {
    const imageBlock = block.querySelector('img');
    const textBlock = block.querySelector('p');
    const linkBlock = block.querySelector('a');

    if (imageBlock) {
      // For image blocks
      cells.push([imageBlock]);
    } else if (textBlock) {
      // For text blocks
      cells.push([textBlock]);
    } else if (linkBlock) {
      // For link blocks
      cells.push([linkBlock]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}