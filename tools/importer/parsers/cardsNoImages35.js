/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const rows = [headerRow];

  // Extract sections within the HTML
  const sections = element.querySelectorAll('.fe-block');

  sections.forEach((section) => {
    const heading = section.querySelector('h3');
    const paragraphs = section.querySelectorAll('p');

    // Combine heading and paragraphs into a single cell
    const content = [];

    if (heading) {
      const headingText = document.createElement('strong');
      headingText.textContent = heading.textContent;
      content.push(headingText);
    }

    paragraphs.forEach((paragraph) => {
      const paragraphText = document.createElement('p');
      paragraphText.textContent = paragraph.textContent;
      content.push(paragraphText);
    });

    // Create a row for this section
    rows.push([content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);

  return table;
}