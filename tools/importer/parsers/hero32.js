/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the background image element
  const extractBackgroundImage = (imageBlock) => {
    const img = imageBlock.querySelector('img');
    if (img) {
      const backgroundImage = document.createElement('img');
      backgroundImage.src = img.src;
      backgroundImage.alt = img.alt || '';
      return backgroundImage;
    }
    return null;
  };

  // Extract content elements
  const imageElement = element.querySelector('.image-block img');
  const backgroundImage = extractBackgroundImage(element.querySelector('.image-block'));
  const titleElement = element.querySelector('.html-block h1');
  const subheadingElement = element.querySelector('.html-block p');

  const callToActionElement = element.querySelector('.button-block a');

  // Create cells for the table
  const headerRow = ['Hero'];

  const contentRow = [];

  if (backgroundImage) {
    contentRow.push(backgroundImage);
  }

  if (titleElement) {
    const heading = document.createElement('h1');
    heading.textContent = titleElement.textContent;
    contentRow.push(heading);
  }

  if (subheadingElement) {
    const subheading = document.createElement('p');
    subheading.textContent = subheadingElement.textContent;
    contentRow.push(subheading);
  }

  if (callToActionElement) {
    const button = document.createElement('a');
    button.href = callToActionElement.href;
    button.textContent = callToActionElement.textContent;
    button.classList.add('button');
    contentRow.push(button);
  }

  // Create the table
  const cells = [headerRow, [contentRow]];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block
  element.replaceWith(block);
}