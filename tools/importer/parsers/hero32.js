/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Find the image element dynamically
  const imageElement = element.querySelector('img');
  const image = imageElement ? document.createElement('img') : null;
  if (imageElement) {
    image.src = imageElement.src;
    image.alt = imageElement.alt;
  }

  // Find the heading element dynamically
  const headingElement = element.querySelector('h1');
  const heading = headingElement ? document.createElement('h1') : null;
  if (headingElement) {
    heading.innerHTML = headingElement.innerHTML;
  }

  // Find the paragraph element dynamically
  const paragraphElement = element.querySelector('p');
  const paragraph = paragraphElement ? document.createElement('p') : null;
  if (paragraphElement) {
    paragraph.innerHTML = paragraphElement.innerHTML;
  }

  // Find the button element dynamically
  const buttonElement = element.querySelector('a.sqs-block-button-element');
  const button = buttonElement ? document.createElement('a') : null;
  if (buttonElement) {
    button.href = buttonElement.href;
    button.textContent = buttonElement.textContent;
  }

  // Assemble the content row with non-null elements
  const contentRow = [
    [image, heading, paragraph, button].filter(Boolean),
  ];

  // Create the table structure
  const tableCells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}