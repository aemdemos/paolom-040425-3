/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  // Extract content from the given element.
  const cards = [];
  const blocks = element.querySelectorAll('.sqs-html-content');

  blocks.forEach(block => {
    const title = block.querySelector('h3');
    const paragraphs = block.querySelectorAll('p');

    const content = [];

    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      content.push(strong);
      content.push(document.createElement('br'));
    }
    
    paragraphs.forEach(paragraph => {
      content.push(paragraph.cloneNode(true));
    });

    cards.push([content]);
  });

  // Create block table using WebImporter.DOMUtils.createTable()
  const tableData = [headerRow, ...cards];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}