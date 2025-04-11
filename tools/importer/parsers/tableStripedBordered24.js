/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (striped, bordered)'];

  const blogTitle = element.querySelector('.entry-title')?.textContent.trim() || '';
  const blogDate = element.querySelector('.dt-published')?.textContent.trim() || '';

  const authorWrapper = element.querySelector('.blog-meta-item--author');
  const authorLink = authorWrapper?.querySelector('a');
  const authorName = authorLink?.textContent.trim() || '';
  const authorUrl = authorLink?.href || '';

  // Create the author element with the profile link
  const authorElement = document.createElement('div');
  authorElement.textContent = `Written By: ${authorName}`;

  if (authorUrl) {
    const authorLinkElement = document.createElement('a');
    authorLinkElement.href = authorUrl;
    authorLinkElement.textContent = 'Author Profile';
    authorElement.appendChild(document.createTextNode(' ')); // Add space between text and link
    authorElement.appendChild(authorLinkElement);
  }

  // Construct table data
  const tableData = [
    headerRow,
    [document.createTextNode(`Title: ${blogTitle}`)],
    [document.createTextNode(`Date: ${blogDate}`)],
    [authorElement]
  ];

  // Create table block and replace element
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}