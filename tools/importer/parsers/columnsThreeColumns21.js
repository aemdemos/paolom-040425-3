/* global WebImporter */

export default function parse(element, { document }) {
  const sectionElements = element.querySelectorAll('.fe-block');

  const headerRow = ['Columns']; // Correct structure for the header row

  const columns = Array.from(sectionElements).map((block) => {
    const htmlContent = block.querySelector('.sqs-block-content');
    const headingText = htmlContent?.querySelector('h2, h3')?.textContent.trim() || '';
    const paragraphs = Array.from(htmlContent?.querySelectorAll('p') || []).map((p) => p.textContent.trim());
    
    const imageElement = htmlContent?.querySelector('img');
    const imageToAdd = imageElement ? document.createElement('img') : null;
    if (imageToAdd) {
      imageToAdd.src = imageElement.src;
      imageToAdd.alt = imageElement.alt || '';
      imageToAdd.style = imageElement.style.cssText;
    }

    const content = [];
    if (imageToAdd) {
      content.push(imageToAdd);
    }
    if (headingText) {
      const headingElement = document.createElement('h2');
      headingElement.innerHTML = `<strong>${headingText}</strong>`; // Ensure heading is wrapped in <strong>
      content.push(headingElement);
    }
    paragraphs.forEach((paragraph) => {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = paragraph;
      content.push(paragraphElement);
    });

    return content;
  });

  const cells = [headerRow, columns];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable); // Correct replacement behavior
}