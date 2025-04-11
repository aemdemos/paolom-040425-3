/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extracting content
  const contentWrapper = element.querySelector('.content-wrapper');
  const contentElement = contentWrapper?.querySelector('.sqs-html-content');
  const heading = contentElement?.querySelector('h4');
  const paragraph = contentElement?.querySelector('p');

  // Handling edge cases (empty elements or missing data)
  const contentCell = document.createElement('div');
  if (heading) {
    contentCell.appendChild(heading);
  }
  if (paragraph) {
    contentCell.appendChild(paragraph);
  }

  // Creating the block table cells
  const cells = [
    headerRow,
    [contentCell],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}