/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract content from the element
  const blocks = element.querySelectorAll('.fe-block');

  const columnData = Array.from(blocks).map((block) => {
    const title = block.querySelector('h2')?.textContent.trim() || '';
    const subtitle = block.querySelector('h4')?.textContent.trim() || '';
    const description = block.querySelector('p')?.textContent.trim() || '';

    // Create elements for structured data
    const columnElements = [];

    if (title) {
      const columnTitle = document.createElement('h2');
      columnTitle.textContent = title;
      columnElements.push(columnTitle);
    }

    if (subtitle) {
      const columnSubtitle = document.createElement('h4');
      columnSubtitle.textContent = subtitle;
      columnElements.push(columnSubtitle);
    }

    if (description) {
      const columnDescription = document.createElement('p');
      columnDescription.textContent = description;
      columnElements.push(columnDescription);
    }

    return columnElements;
  });

  const blockTable = WebImporter.DOMUtils.createTable([headerRow, columnData], document);

  element.replaceWith(blockTable);
}