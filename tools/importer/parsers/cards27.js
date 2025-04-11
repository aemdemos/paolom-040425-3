/* global WebImporter */
export default function parse(element, { document }) {
    const cards = [];

    // Extract cards data from the HTML element
    const cardElements = element.querySelectorAll('.user-items-list-carousel__slide');

    cardElements.forEach((cardElement) => {
        const image = cardElement.querySelector('img');
        const title = cardElement.querySelector('.list-item-content__title');
        const description = cardElement.querySelector('.list-item-content__description');
        const button = cardElement.querySelector('.list-item-content__button a');

        const imageElement = document.createElement('img');
        imageElement.src = image?.getAttribute('data-src') || '';
        imageElement.alt = image?.getAttribute('alt') || '';
        
        const content = [];

        if (title && title.textContent.trim()) {
            const titleElement = document.createElement('strong');
            titleElement.textContent = title.textContent.trim();
            content.push(titleElement);
        }

        if (description && description.textContent.trim()) {
            const descElement = document.createElement('p');
            descElement.textContent = description.textContent.trim();
            content.push(descElement);
        }

        if (button && button.href && button.textContent.trim()) {
            const buttonElement = document.createElement('a');
            buttonElement.href = button.href;
            buttonElement.textContent = button.textContent.trim();
            content.push(buttonElement);
        }

        cards.push([imageElement, content]);
    });

    const tableHeader = ['Cards'];
    const tableData = [tableHeader, ...cards];

    const table = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(table);
}