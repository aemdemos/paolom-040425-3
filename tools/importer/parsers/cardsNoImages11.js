/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const cards = [];

  // Extract the heading, description, and list items
  const heading = element.querySelector('h2');
  const headingText = heading ? heading.textContent.trim() : '';

  const paragraphs = element.querySelectorAll('p');
  const description = paragraphs.length > 0 ? paragraphs[0].textContent.trim() : '';

  const list = element.querySelector('ul');
  const listItems = list ? [...list.querySelectorAll('li')].map((li) => li.textContent.trim()) : [];

  const cellContent = [];

  // Add heading to the cell
  if (headingText) {
    const strongHeading = document.createElement('strong');
    strongHeading.textContent = headingText;
    cellContent.push(strongHeading);
  }

  // Add description to the cell
  if (description) {
    const descriptionText = document.createTextNode(description);
    cellContent.push(descriptionText);
  }

  // Add list items to the cell
  if (listItems.length) {
    const ul = document.createElement('ul');
    listItems.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });
    cellContent.push(ul);
  }

  // Consolidate all extracted content into one row
  cards.push([cellContent]);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, ...cards], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}