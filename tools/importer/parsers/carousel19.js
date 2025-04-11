/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel'];

  const slides = Array.from(element.querySelectorAll('.item-pagination-link')).map((link) => {
    const titleElement = link.querySelector('.item-pagination-title');
    const directionElement = link.querySelector('.item-pagination-prev-next');

    const directionText = directionElement ? directionElement.textContent : '';
    const titleText = titleElement ? titleElement.textContent : '';

    const directionDiv = document.createElement('div');
    directionDiv.textContent = directionText;
    const titleHeading = document.createElement('h2');
    titleHeading.textContent = titleText;

    return [directionDiv, titleHeading];
  });

  const tableData = [headerRow, ...slides];

  const carouselTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(carouselTable);
}