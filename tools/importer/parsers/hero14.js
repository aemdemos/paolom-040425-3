/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero']; // Exact header as per example

  // Extract title
  const titleElement = element.querySelector('.blog-item-title h1');
  const title = document.createElement('h1');
  title.textContent = titleElement ? titleElement.textContent.trim() : '';

  // Extract blog content paragraphs
  const contentElements = element.querySelectorAll('.blog-item-content p');
  const paragraphs = Array.from(contentElements).map((p) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = p.textContent.trim();
    return paragraph;
  });

  // Combine title and paragraphs into a single cell in the second row
  const combinedContent = document.createElement('div');
  combinedContent.appendChild(title);
  paragraphs.forEach((p) => combinedContent.appendChild(p));

  // Create the table using WebImporter.DOMUtils.createTable
  const tableRows = [
    headerRow, // First row with header, single column
    [combinedContent] // Second row with all content combined
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with new structured table
  element.replaceWith(table);
}