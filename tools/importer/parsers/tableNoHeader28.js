/* global WebImporter */
export default function parse(element, { document }) {
  // Identify elements with relevant content
  const contentWrapper = element.querySelector('.content-wrapper');

  // Mock table content for this example
  const cells = [
    ['Table (no header)'],
    ['Micky Mouse'],
    ['Daisy'],
    ['Donald Duck'],
    ['Pluto'],
    ['Goofy'],
    ['Ariel'],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}