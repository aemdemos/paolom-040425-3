/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row using the exact text from the example
    const headerRow = ['Cards (no images)'];

    // Find all relevant card elements dynamically
    const cardElements = element.querySelectorAll('.sqs-html-content p');

    if (!cardElements.length) {
        console.error('No cards found in the provided element');
        return;
    }

    // Process each card to extract its title and description
    const cardsContent = Array.from(cardElements).map(cardElement => {
        const title = cardElement.querySelector('strong')?.textContent || 'Missing title';
        const description = cardElement.textContent.replace(title, '').trim() || 'Missing description';

        // Combine title and description into a single cell content
        const combinedContent = document.createElement('div');

        const titleElement = document.createElement('strong');
        titleElement.textContent = title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description;

        combinedContent.appendChild(titleElement);
        combinedContent.appendChild(descriptionElement);

        return [combinedContent];
    });

    // Create the table array
    const tableArray = [
        headerRow,
        ...cardsContent
    ];

    // Create block table
    const blockTable = WebImporter.DOMUtils.createTable(tableArray, document);

    // Replace original element with the new block table
    element.replaceWith(blockTable);
}