/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards (no images)'];

    // Find content blocks with relevant data
    const contentBlocks = element.querySelectorAll('.sqs-block-content');

    const rows = Array.from(contentBlocks).map((block) => {
        const heading = block.querySelector('h3')?.textContent.trim();
        const paragraphs = Array.from(block.querySelectorAll('p')).map((p) => {
            const paragraphElement = document.createElement('p');
            paragraphElement.textContent = p.textContent.trim();
            return paragraphElement;
        });

        // Combine heading and paragraphs into one cell
        const cellContent = [];
        if (heading) {
            const headingElement = document.createElement('strong');
            headingElement.textContent = heading;
            cellContent.push(headingElement);
        }

        // Add paragraphs with clear separation
        paragraphs.forEach((paragraph, index) => {
            if (index > 0) {
                const separator = document.createElement('hr');
                cellContent.push(separator);
            }
            cellContent.push(paragraph);
        });

        return [cellContent];
    });

    // Create the table without empty rows
    const cells = [headerRow, ...rows.filter((row) => row[0]?.length > 0)];
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the table
    element.replaceWith(table);
}