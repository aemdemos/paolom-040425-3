/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the header row
  const headerRow = ['Cards (no images)'];

  // Extract the content for the cards
  const cardsContent = [];

  const heading = element.querySelector('h2');
  if (heading) {
    const headingRow = document.createElement('p');
    headingRow.textContent = heading.textContent;
    cardsContent.push([headingRow]);
  }

  const description = element.querySelector('p:nth-of-type(1)');
  if (description) {
    const descriptionRow = document.createElement('p');
    descriptionRow.textContent = description.textContent;
    cardsContent.push([descriptionRow]);
  }

  const listItems = element.querySelectorAll('li');
  listItems.forEach((li) => {
    const strongText = li.querySelector('strong');
    const restText = li.querySelector('p');

    const listRow = document.createElement('p');
    if (strongText) {
      const strongElement = document.createElement('strong');
      strongElement.textContent = strongText.textContent;
      listRow.appendChild(strongElement);

      // Ensure restText handles the strongElement correctly without relying on undefined variable
      if (restText) {
        const textNode = document.createTextNode(` ${restText.textContent.replace(strongText.textContent, '').trim()}`);
        listRow.appendChild(textNode);
      }
    }
    cardsContent.push([listRow]);
  });

  const footer = element.querySelector('p:nth-of-type(2)');
  if (footer) {
    const footerRow = document.createElement('p');
    footerRow.textContent = footer.textContent;
    cardsContent.push([footerRow]);
  }

  // Organize into a table
  const cells = [
    headerRow,
    ...cardsContent,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}