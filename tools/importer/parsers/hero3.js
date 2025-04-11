/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract content
  const extractContent = (selector) => {
    const el = element.querySelector(selector);
    return el ? el.textContent.trim() : '';
  };

  // Extract image
  const backgroundImage = element.querySelector('img');
  const image = backgroundImage ? document.createElement('img') : null;

  if (image) {
    image.src = backgroundImage.src;
    image.alt = backgroundImage.alt || '';
  }

  // Extract heading
  const heading = document.createElement('h2');
  heading.textContent = extractContent('h2');

  // Extract subheading
  const subheadingText = extractContent('.sqs-html-content p');
  const subheading = document.createElement('p');
  subheading.textContent = subheadingText;

  // Combine content into a single cell
  const combinedContent = [image, heading, subheading];

  // Table cells
  const cells = [
    ['Hero'],
    [combinedContent],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}