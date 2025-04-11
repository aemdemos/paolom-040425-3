/* global WebImporter */
export default function parse(element, { document }) {
  // Extract column data
  const columns = Array.from(element.querySelectorAll('.fluid-engine .sqs-block-content'));
  const columnData = columns.map((col) => {
    const header = col.querySelector('h4')?.textContent.trim() || '';
    const subHeader = col.querySelector('h2')?.textContent.trim() || '';
    const content = col.querySelector('p')?.textContent.trim() || '';

    // Structure the content
    const headerElement = document.createElement('h4');
    headerElement.textContent = header;
    const subHeaderElement = document.createElement('h2');
    subHeaderElement.textContent = subHeader;
    const contentElement = document.createElement('p');
    contentElement.textContent = content;

    return [subHeaderElement, headerElement, contentElement];
  });

  // Create table with the extracted data
  const headerRow = ['Columns'];
  const tableData = [
    headerRow,
    columnData,
  ];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}