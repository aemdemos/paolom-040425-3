/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header Row (defines block type)
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Second Row Content (consolidated)
  const rowContent = [];

  // Extract Background Image
  const img = element.querySelector('img');
  if (img) {
    const imageClone = document.createElement('img');
    imageClone.src = img.src;
    imageClone.alt = img.alt || '';
    rowContent.push(imageClone);
  }

  // Extract Title
  const title = element.querySelector('h1');
  if (title) {
    const titleClone = document.createElement('h1');
    titleClone.textContent = title.textContent;
    rowContent.push(titleClone);
  }

  // Extract Subheading
  const subheading = element.querySelector('p');
  if (subheading) {
    const subheadingClone = document.createElement('p');
    subheadingClone.textContent = subheading.textContent;
    rowContent.push(subheadingClone);
  }

  // Extract Call-to-Action
  const cta = element.querySelector('.sqs-block-button-element');
  if (cta) {
    const ctaClone = document.createElement('a');
    ctaClone.href = cta.href;
    ctaClone.textContent = cta.textContent;
    rowContent.push(ctaClone);
  }

  cells.push([rowContent]); // Consolidate all content into a single cell

  // Create Table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new table
  element.replaceWith(table);
}