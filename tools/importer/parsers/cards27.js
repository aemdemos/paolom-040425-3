/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row
    const headerRow = ['Cards'];

    // Extract user items from the provided element
    const userItems = JSON.parse(element.querySelector('[data-current-context]').getAttribute('data-current-context')).userItems;

    // Build rows for the table
    const rows = userItems.map(item => {
        const img = document.createElement('img');
        img.src = item.image.assetUrl;
        img.alt = item.imageAltText;

        const title = document.createElement('strong');
        title.textContent = item.title;

        const description = document.createElement('p');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = item.description; // Temporarily parse the HTML
        description.textContent = tempDiv.textContent; // Extract plain text without nesting

        const cta = document.createElement('a');
        cta.href = item.button.buttonLink;
        cta.textContent = item.button.buttonText;

        const content = document.createElement('div');
        content.append(title, description, cta);

        return [img, content];
    });

    // Combine header and rows
    const tableData = [headerRow, ...rows];

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}