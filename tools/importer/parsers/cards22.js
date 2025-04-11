/* global WebImporter */
export default function parse(element, { document }) {
  const cardsData = [];

  // Extracting blog items
  const blogItems = element.querySelectorAll('.blog-item');

  blogItems.forEach(blogItem => {
    const imageElement = blogItem.querySelector('img');
    const titleElement = blogItem.querySelector('h1.blog-title a');
    const descriptionElement = blogItem.querySelector('.blog-excerpt p');
    const ctaElement = blogItem.querySelector('a.blog-more-link');

    // Handle missing data edge cases
    const image = document.createElement('img');
    image.src = imageElement ? imageElement.getAttribute('src').trim() : '';
    image.alt = imageElement ? imageElement.getAttribute('alt').trim() : '';

    const title = document.createElement('h1');
    title.textContent = titleElement ? titleElement.textContent.trim() : '';

    const description = document.createElement('p');
    description.textContent = descriptionElement ? descriptionElement.textContent.trim() : '';

    const cta = document.createElement('a');
    cta.href = ctaElement ? ctaElement.href.trim() : '#';
    cta.textContent = ctaElement ? 'Read More' : '';

    cardsData.push([
      image,
      [title, description, cta]
    ]);
  });

  // Adding the header row
  const headerRow = ['Cards'];
  const tableData = [headerRow, ...cardsData];

  // Creating the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replacing the original element
  element.replaceWith(block);
}