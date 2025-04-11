/* global WebImporter */
export default function parse(element, { document }) {
  // Extract title
  const titleElement = element.querySelector('h1.entry-title');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract author name
  const authorElement = element.querySelector('.blog-meta-item--author .blog-author-name');
  const author = authorElement ? authorElement.textContent.trim() : '';

  // Extract published date
  const dateElement = element.querySelector('time.blog-meta-item--date span');
  const date = dateElement ? dateElement.textContent.trim() : '';

  // Construct table header row, EXACTLY matching example headers
  const headerRow = ['Blog Entry'];

  // Construct content rows dynamically
  const contentRows = [
    [`Title: ${title}`],
    [`Author: ${author}`],
    [`Date: ${date}`],
  ];

  // Create table using WebImporter.DOMUtils.createTable
  const cells = [headerRow, ...contentRows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}