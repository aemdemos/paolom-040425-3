/* global WebImporter */
export default function parse(element, { document }) {
  // Correcting the header row to match the example exactly
  const headerRow = ['Columns'];

  // Extract column content dynamically from `.fe-block` blocks
  const columns = Array.from(element.querySelectorAll('.fe-block')).map((block) => {
    const textContent = block.querySelector('.sqs-html-content');
    const imageContent = block.querySelector('img');

    const content = [];

    if (textContent) {
      content.push(textContent.cloneNode(true));
    }

    if (imageContent) {
      content.push(imageContent.cloneNode(true));
    }

    return content;
  });

  // Create the table structure ensuring the header row contains exactly one column
  const tableStructure = [
    [headerRow], // Fix: Header row contains one column
    columns
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableStructure, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}