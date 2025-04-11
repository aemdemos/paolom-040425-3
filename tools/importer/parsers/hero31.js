/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract and validate content from HTML
  const headingElement = element.querySelector('h3');
  const paragraphElements = element.querySelectorAll('p');

  // Validate heading element existence
  let heading;
  if (headingElement) {
    heading = document.createElement('h1');
    heading.textContent = headingElement.textContent.trim();
  } else {
    console.warn('Heading element missing');
    heading = document.createElement('h1');
    heading.textContent = ''; // Fallback empty heading
  }

  // Validate and construct paragraphs
  const contentContainer = document.createElement('div');

  // Append heading to the container
  contentContainer.appendChild(heading);

  // Append paragraphs to the container
  Array.from(paragraphElements).forEach((p) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = p.textContent.trim();
    contentContainer.appendChild(paragraph);
  });

  if (contentContainer.children.length === 1) {
    console.warn('No paragraph elements found');
    const fallbackParagraph = document.createElement('p');
    contentContainer.appendChild(fallbackParagraph); // Fallback empty paragraph
  }

  // Construct cells for the table
  const cells = [
    headerRow,
    [contentContainer], // Combine heading and paragraphs in a single cell
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with the new block
  element.replaceWith(block);
}