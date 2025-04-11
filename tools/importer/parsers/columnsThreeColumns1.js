/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row exactly as the example specifies.
    const headerRow = ['Columns'];

    // Extracting content from the column blocks within the element.
    const blocks = Array.from(element.querySelectorAll('.fe-block'));

    // Map through the blocks and extract relevant content.
    const contentBlocks = blocks.map(block => {
        const textContent = block.querySelector('.sqs-html-content');
        const imageContent = block.querySelector('img');

        const elements = [];

        // Add extracted text nodes if present.
        if (textContent) {
            const childNodes = Array.from(textContent.childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE);
            childNodes.forEach(item => elements.push(item));
        }

        // Add extracted image if present.
        if (imageContent) {
            elements.push(imageContent);
        }

        // Combine text and image content into one block.
        return elements;
    });

    // Build the cells array for the createTable function.
    const cells = [
        headerRow,
        ...contentBlocks // Each block represents a column.
    ];

    // Create the table block using the helper function.
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the created table block.
    element.replaceWith(blockTable);

    return blockTable;
}