/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const rows = [];

  const contentEl = element.querySelector('.sqs-block-content .sqs-html-content');

  if (contentEl) {
    const children = Array.from(contentEl.children);
    let currentTitle = null;

    children.forEach((child) => {
      if (child.tagName === 'H2') {
        currentTitle = child.textContent.trim();
      } else if (child.tagName === 'P') {
        if (currentTitle) {
          rows.push([currentTitle, child.cloneNode(true)]);
          currentTitle = null;
        }
      }
    });
  }

  const cells = [headerRow].concat(rows);
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}