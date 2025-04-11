/* global WebImporter */
export default function parse(element, {
  document
}) {
  const headerRow = ['Columns'];

  const contentCells = [];

  // Extract first text block content dynamically
  const textBlock = element.querySelector('.fe-block-yui_3_17_2_1_1738612302565_5398 .sqs-block-content');
  const textContentArray = [];
  if (textBlock) {
    const heading = textBlock.querySelector('h3');
    if (heading) {
      textContentArray.push(heading.cloneNode(true)); // Clone heading element
    }
  }

  // Extract image dynamically
  const imageBlock = element.querySelector('.fe-block-yui_3_17_2_1_1738612302565_7724 img');
  const imgElement = imageBlock ? imageBlock.cloneNode(true) : null; // Clone image element

  contentCells.push([textContentArray, imgElement]);

  // Extract final text block content dynamically
  const finalTextBlock = element.querySelector('.fe-block-yui_3_17_2_1_1738612302565_10926 .sqs-block-content');
  const finalContentArray = [];
  if (finalTextBlock) {
    const children = finalTextBlock.children;
    for (const child of children) {
      finalContentArray.push(child.cloneNode(true)); // Clone all children elements
    }
  }

  contentCells.push([finalContentArray]);

  const tableCells = [headerRow, ...contentCells];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  element.replaceWith(blockTable);
}