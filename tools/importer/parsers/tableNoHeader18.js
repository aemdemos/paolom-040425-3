/* global WebImporter */
export default function parse(element, { document }) {
    // Extract content dynamically from the input element
    const rows = [];

    // Add header row matching the example exactly
    rows.push(['Table (no header)']);

    // Process each sqs-html-content for data
    Array.from(element.querySelectorAll('.sqs-html-content')).forEach(content => {
        const heading = content.querySelector('h2, h3');
        const paragraph = content.querySelector('p');

        let rowData = '';

        // Combine heading and paragraph text content into one cell
        if (heading) rowData += heading.textContent.trim();
        if (paragraph) rowData += (rowData ? '<br>' : '') + paragraph.textContent.trim();

        if (rowData) {
            rows.push([rowData]);
        }
    });

    // Create a table block using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the new table block
    element.replaceWith(blockTable);
}