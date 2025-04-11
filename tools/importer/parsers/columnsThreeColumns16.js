/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row with the exact text from the example
  const headerRow = ['Columns'];

  // Locate the main content area using the `.fluid-engine` class
  const content = element.querySelector('.fluid-engine');

  // Prepare an array to hold the content for three columns (matching the example structure)
  const columns = [];

  // Extract all child blocks from the content area dynamically
  const blocks = content.querySelectorAll('.fe-block');

  // Ensure only three columns are extracted, as per the example
  blocks.forEach((block, index) => {
    if (index < 3) { // Limit to three columns
      const blockContent = block.querySelector('.sqs-block-content');
      if (blockContent) {
        const text = blockContent.querySelector('p, h2');
        const image = blockContent.querySelector('img');

        const cellContent = [];
        if (text) {
          cellContent.push(text.textContent); // Use plain text for captions or headers
        }
        if (image) {
          const imageElement = document.createElement('img');
          imageElement.src = image.src;
          imageElement.alt = image.alt || '';
          cellContent.push(imageElement);
        }

        columns.push(cellContent);
      }
    }
  });

  // Construct the table cells array, ensuring it matches the required structure
  const cells = [
    headerRow, // The header row
    columns // Add the properly structured content for three columns only
  ];

  // Create a block table using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(block);
}