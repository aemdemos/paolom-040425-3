/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the background image
  const img = element.querySelector('img') || {};
  const imageSrc = img.getAttribute('data-src') || img.src;

  // Extract title
  const titleElement = element.querySelector('h2');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract subtitle
  const subtitleElement = element.querySelector('p:nth-of-type(2)');
  const subtitle = subtitleElement ? subtitleElement.textContent.trim() : '';

  // Construct table cells
  const headerRow = ['Hero'];
  const contentRow = [
    [imageSrc ? (() => {
      const imageTag = document.createElement('img');
      imageTag.setAttribute('src', imageSrc);
      return imageTag;
    })() : null, (() => {
      const titleTag = document.createElement('h1');
      titleTag.textContent = title;
      return titleTag;
    })(), subtitle ? (() => {
      const subtitleTag = document.createElement('p');
      subtitleTag.textContent = subtitle;
      return subtitleTag;
    })() : null].filter(Boolean)
  ];

  const cells = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new block table
  element.replaceWith(blockTable);
}