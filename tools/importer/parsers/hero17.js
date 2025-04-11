/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the block
  const headerRow = ['Hero'];

  // Extract the title element dynamically
  const titleElement = element.querySelector('h2, h3');
  let title;
  if (titleElement) {
    title = document.createElement('h1');
    title.textContent = titleElement.textContent.trim();
  }

  // Extract the image element dynamically
  const imageElement = element.querySelector('[data-image]');
  let image;
  if (imageElement) {
    image = document.createElement('img');
    image.src = imageElement.getAttribute('data-src') || imageElement.getAttribute('data-image');
    image.alt = imageElement.getAttribute('alt') || 'Default alt text'; // Use dynamically extracted alt or provide default
  }

  // Build the table cells
  const cells = [
    headerRow,
    [
      title || document.createTextNode('Heading in Block'), // Use fallback text if title is missing
      image || document.createTextNode('') // Handle missing image gracefully
    ]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}