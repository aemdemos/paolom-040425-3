/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns'];

    // Extract all block contents dynamically from sqs-html-content classes
    const blocks = Array.from(element.querySelectorAll('.sqs-html-content')).map((block) => {
        // Clone and wrap content in a div
        const clonedContent = block.cloneNode(true);
        const wrapper = document.createElement('div');
        wrapper.append(...clonedContent.childNodes);
        return wrapper;
    });

    // Prepare table data with the correct header row
    const tableData = [
        headerRow, // Ensure header row is a single cell as per requirements
        ...blocks.map(content => [content]) // Organize extracted elements into separate rows
    ];

    // Create table using DOMUtils helper and replace element
    const table = WebImporter.DOMUtils.createTable(tableData, document);
    element.replaceWith(table);
}