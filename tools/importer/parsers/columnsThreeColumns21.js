/* global WebImporter */
export default function parse(element, { document }) {
  // Define the table header row
  const headerRow = ['Columns'];

  // Dynamically extract content from the element
  const contentBlocks = element.querySelectorAll('.fe-block');

  // Initialize structure for columns
  const columnContent = [];

  contentBlocks.forEach((block) => {
    const titleElement = block.querySelector('h2, h3');
    const paragraphElement = block.querySelector('p');
    const imageElement = block.querySelector('img');

    // Handle missing data gracefully
    const title = titleElement ? titleElement.cloneNode(true) : document.createTextNode('');
    const paragraph = paragraphElement ? paragraphElement.cloneNode(true) : document.createTextNode('');
    const image = imageElement ? imageElement.cloneNode(true) : document.createTextNode('');

    // Add extracted elements to the column content
    columnContent.push([title, paragraph, image]);
  });

  // Create the table structure
  const tableStructure = [
    headerRow,
    ...columnContent
  ];

  // Generate and replace the original element with the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableStructure, document);
  element.replaceWith(blockTable);
}