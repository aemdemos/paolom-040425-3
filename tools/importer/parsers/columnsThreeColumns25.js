/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns'];

    // Helper function to extract image elements dynamically
    const getImageElement = (imageBlock) => {
        const imgTag = imageBlock.querySelector('img');
        return imgTag ? imgTag.cloneNode(true) : null;
    };

    // Helper function to extract text content dynamically
    const getTextElement = (htmlBlock) => {
        const paragraphs = htmlBlock.querySelectorAll('p');
        return Array.from(paragraphs).map((paragraph) => {
            const clonedPara = document.createElement('p');
            clonedPara.textContent = paragraph.textContent;
            return clonedPara;
        });
    };

    // Validate that extraction handles missing data gracefully
    const collectedContent = [];

    const imageBlocks = element.querySelectorAll('.sqs-block-image');
    const textBlocks = element.querySelectorAll('.sqs-block-html');

    const numColumns = Math.max(imageBlocks.length, textBlocks.length); // Ensure extraction flexibility

    for (let i = 0; i < numColumns; i++) {
        const imageElement = imageBlocks[i] ? getImageElement(imageBlocks[i]) : document.createElement('div');
        const textElement = textBlocks[i] ? getTextElement(textBlocks[i]) : [];

        collectedContent.push([imageElement, ...textElement]);
    }

    const tableData = [headerRow, ...collectedContent];

    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(blockTable);
}