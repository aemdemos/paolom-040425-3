/* global WebImporter */
export default function parse(element, { document }) {

  const headerRow = ['Hero'];

  // Extracting data from HTML structure
  const titleElement = element.querySelector("h4");
  const subheadingElement = element.querySelector("p");

  // Create title and subheading content
  const contentCell = document.createElement('div');

  if (titleElement) {
    const title = document.createElement('h1');
    title.textContent = titleElement.textContent;
    contentCell.appendChild(title);
  }

  if (subheadingElement) {
    const subheading = document.createElement('p');
    subheading.textContent = subheadingElement.textContent;
    contentCell.appendChild(subheading);
  }

  // Create table rows
  const rows = [
    headerRow,
    [contentCell]
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  if (element.replaceWith) {
    element.replaceWith(blockTable);
  }
}