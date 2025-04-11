/* global WebImporter */
 export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Fix the header row to match the example exactly: one column with 'Columns' text
  const headerRow = ['Columns'];

  const columns = [];
  const columnElements = element.querySelectorAll('.fe-block');

  columnElements.forEach((el) => {
    const blockContent = el.querySelector('.sqs-block-content');
    if (blockContent) {
      const cellContent = [];

      // Extract image elements
      const imgElement = blockContent.querySelector('img');
      if (imgElement) {
        cellContent.push(imgElement.cloneNode(true));
      }

      // Extract heading elements
      const headingElement = blockContent.querySelector('h2');
      if (headingElement) {
        const headingClone = document.createElement('h2');
        headingClone.textContent = headingElement.textContent;
        cellContent.push(headingClone);
      }

      // Extract paragraph content
      const contentTextElement = blockContent.querySelector('p');
      if (contentTextElement) {
        const paragraphClone = document.createElement('p');
        paragraphClone.textContent = contentTextElement.textContent.trim();
        cellContent.push(paragraphClone);
      }

      columns.push(cellContent);
    }
  });

  // Ensure there are exactly 3 columns; fill missing columns if necessary
  const maxColumns = 3;
  while (columns.length < maxColumns) {
    columns.push(['']);
  }

  // Build content row
  const contentRow = columns;

  const cells = [
    headerRow,
    contentRow
  ];

  const blockTable = createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}