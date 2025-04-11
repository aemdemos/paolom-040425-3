/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract the background image
  const imageElement = element.querySelector('img');
  const backgroundImage = imageElement ? document.createElement('img') : null;
  if (backgroundImage) {
    backgroundImage.src = imageElement.src;
    backgroundImage.alt = imageElement.alt;
  }

  // Extract the title
  const titleElement = element.querySelector('h1');
  const title = titleElement ? document.createElement('h1') : null;
  if (title) {
    title.innerHTML = titleElement.innerHTML;
  }

  // Extract the subheading
  const subheadingElement = element.querySelector('p');
  const subheading = subheadingElement ? document.createElement('p') : null;
  if (subheading) {
    subheading.innerHTML = subheadingElement.innerHTML;
  }

  // Combine extracted elements into the second row
  const contentRow = [];
  if (backgroundImage) contentRow.push(backgroundImage);
  if (title) contentRow.push(title);
  if (subheading) contentRow.push(subheading);

  // Create the block table
  const cells = [
    headerRow,
    [contentRow]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}