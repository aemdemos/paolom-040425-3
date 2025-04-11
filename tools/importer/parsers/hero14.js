/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the title from the element
  const title = element.querySelector('h1.entry-title');
  const heading = title ? document.createElement('h1') : null;
  if (title) {
    heading.textContent = title.textContent;
  }

  // Extract the content paragraphs
  const contentWrapper = element.querySelector('.blog-item-content-wrapper .blog-item-content');
  const paragraphs = contentWrapper ? [...contentWrapper.querySelectorAll('p')] : [];

  // Combine the paragraphs into a single container
  const combinedParagraphs = document.createElement('div');
  paragraphs.forEach((p) => combinedParagraphs.appendChild(p.cloneNode(true)));

  // Create the table cells
  const cells = [
    ['Hero'],
    [heading, combinedParagraphs],
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}