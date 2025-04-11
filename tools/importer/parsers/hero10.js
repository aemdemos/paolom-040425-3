/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the title from the section
  const title = element.querySelector('h1')?.textContent.trim();

  // Extract the subheading (optional)
  const subheading = element.querySelector('p')?.textContent.trim();

  // Extract the background image URL
  const imageElement = element.querySelector('img');
  const backgroundImageUrl = imageElement?.getAttribute('src');

  // Create necessary DOM elements
  const headingElement = document.createElement('h1');
  headingElement.textContent = title;

  const subheadingElement = document.createElement('p');
  subheadingElement.textContent = subheading;

  const image = document.createElement('img');
  if (backgroundImageUrl) {
    image.src = backgroundImageUrl;
  } else {
    image.style.display = 'none';
  }

  // Header row with exact text
  const headerRow = ['Hero'];

  // Combine image, heading, and subheading into a SINGLE CELL for the next row
  const combinedContentCell = [image, headingElement, subheadingElement];

  // Organize elements into a block table structure
  const cells = [headerRow, [combinedContentCell]];

  // Create the block using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}