/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const prevLink = element.querySelector('.item-pagination-link--prev');
  const nextLink = element.querySelector('.item-pagination-link--next');

  // Helper function to extract link and title content
  function createSlideRow(linkElement) {
    if (!linkElement) return null; // Handle case where linkElement is missing

    const href = linkElement.getAttribute('href');
    const titleElement = linkElement.querySelector('.item-pagination-title');
    const title = titleElement ? document.createElement('h2') : null;
    if (title) title.textContent = titleElement.textContent;

    const link = href ? document.createElement('a') : null;
    if (link) {
      link.setAttribute('href', href);
      link.textContent = href; // Display the href as text for debugging purposes
    }

    return [link, title ? [title] : ''];
  }

  const cells = [
    ['Carousel'], // Header row
    createSlideRow(prevLink),
    createSlideRow(nextLink),
  ].filter(row => row); // Filter out null rows

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block); // Replace the original element with the new block
}