/* global WebImporter */
export default function parse(element, { document }) {
    const cells = [];

    // Header row
    const headerRow = ['Hero'];
    cells.push(headerRow);

    // Content row
    const contentRow = [];

    // Create container for all content in the second row
    const contentContainer = document.createElement('div');

    // Extract background image
    const imgElement = element.querySelector('img');
    if (imgElement) {
        const img = document.createElement('img');
        img.src = imgElement.getAttribute('src');
        img.alt = imgElement.getAttribute('alt') || '';
        contentContainer.appendChild(img);
    }

    // Extract title
    const titleElement = element.querySelector('h1');
    if (titleElement && titleElement.textContent.trim()) {
        const title = document.createElement('h1');
        title.textContent = titleElement.textContent.trim();
        contentContainer.appendChild(title);
    }

    // Extract subheading
    const subheadingElement = element.querySelector('p');
    if (subheadingElement && subheadingElement.textContent.trim()) {
        const subheading = document.createElement('p');
        subheading.textContent = subheadingElement.textContent.trim();
        contentContainer.appendChild(subheading);
    }

    // Extract call-to-action
    const buttonElement = element.querySelector('a');
    if (buttonElement && buttonElement.textContent.trim()) {
        const button = document.createElement('a');
        button.href = buttonElement.href;
        button.textContent = buttonElement.textContent.trim();
        contentContainer.appendChild(button);
    }

    // Combine all content into a single cell
    contentRow.push(contentContainer);

    cells.push(contentRow);

    // Create table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with the new block table
    element.replaceWith(block);
}