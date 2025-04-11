/* global WebImporter */
export default function parse(element, { document }) {
  // Initialize table data
  const data = [];

  // Add the header row with bold text
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards (no images)';
  data.push(headerRow);

  // Extract relevant content from the element
  const contentContainer = element.querySelector('.sqs-html-content');
  if (!contentContainer) {
    console.warn('Content container not found');
    return;
  }

  const cards = [];

  // Extract title, descriptions, and list items
  const title = contentContainer.querySelector('h2');
  const paragraphs = contentContainer.querySelectorAll('p');
  const list = contentContainer.querySelector('ul');

  // Create a card object
  const cardContent = document.createElement('div');

  if (title) {
    const cardTitle = document.createElement('h2');
    cardTitle.textContent = title.textContent.trim();
    cardContent.appendChild(cardTitle);
  }

  paragraphs.forEach((paragraph) => {
    const cardDescription = document.createElement('p');
    cardDescription.textContent = paragraph.textContent.trim();
    cardContent.appendChild(cardDescription);
  });

  if (list) {
    const listClone = list.cloneNode(true); // Retain the ul/li structure
    cardContent.appendChild(listClone);
  }

  cards.push(cardContent);

  // Add cards to table data
  cards.forEach((card) => {
    data.push([card]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(data, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}