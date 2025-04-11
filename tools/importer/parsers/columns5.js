/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const rows = [];

  // Extract the first block
  const firstBlock = element.querySelector('#block-yui_3_17_2_1_1730148658783_12872 .sqs-block-content .sqs-html-content h3');
  if (firstBlock) {
    rows.push([firstBlock.textContent.trim()]);
  }

  // Extract the second block
  const secondBlock = element.querySelector('#block-yui_3_17_2_1_1730148658783_14570 .sqs-block-content .sqs-html-content');
  if (secondBlock) {
    const paragraphs = Array.from(secondBlock.querySelectorAll('p')).map(p => p.textContent.trim()).join(' ');
    rows.push([paragraphs]);
  }

  // Extract the third block
  const thirdBlock = element.querySelector('#block-yui_3_17_2_1_1730148658783_16850 .sqs-block-content .sqs-html-content h3');
  if (thirdBlock) {
    rows.push([thirdBlock.textContent.trim()]);
  }

  // Extract the fourth block
  const fourthBlock = element.querySelector('#block-yui_3_17_2_1_1730148658783_17914 .sqs-block-content .sqs-html-content');
  if (fourthBlock) {
    const paragraphs = Array.from(fourthBlock.querySelectorAll('p')).map(p => p.textContent.trim()).join(' ');
    rows.push([paragraphs]);
  }

  // Create the table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element
  element.replaceWith(table);
}