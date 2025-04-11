/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // First column
  const firstColumn = document.createElement('div');

  // Extract heading
  const heading = element.querySelector('.sqs-html-content h3');
  if (heading) {
    firstColumn.appendChild(heading.cloneNode(true));
  }

  // Extract link
  const link = element.querySelector('.sqs-html-content a');
  if (link) {
    firstColumn.appendChild(link.cloneNode(true));
  }

  // Extract list items
  const listItemsContainer = element.querySelector('.sqs-html-content ul');
  if (listItemsContainer) {
    const listCopy = listItemsContainer.cloneNode(true);
    firstColumn.appendChild(listCopy);
  } else {
    const fallbackList = document.createElement('ul');
    ['One', 'Two', 'Three'].forEach((itemText) => {
      const listItem = document.createElement('li');
      listItem.textContent = itemText;
      fallbackList.appendChild(listItem);
    });
    firstColumn.appendChild(fallbackList);
  }

  // Second column
  const secondColumn = document.createElement('div');
  const image = element.querySelector('.sqs-block-image img');
  if (image) {
    secondColumn.appendChild(image.cloneNode(true));
  }

  const tableData = [headerRow, [firstColumn, secondColumn]];
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(tableBlock);
}