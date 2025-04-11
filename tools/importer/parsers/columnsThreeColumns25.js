/* global WebImporter */

export default function parse(element, { document }) {
  // Helper to extract text content
  const extractText = (selector) => {
    const el = element.querySelector(selector);
    return el ? el.textContent.trim() : '';
  };

  // Helper to extract images
  const extractImage = (selector) => {
    const img = element.querySelector(selector);
    if (!img) return '';

    const imageElement = document.createElement('img');
    imageElement.src = img.src;
    imageElement.alt = img.alt;
    return imageElement;
  };

  // Extract content for columns
  const column1Header = extractText(".fe-block-eccc4280f3d0399f7d04 h2");
  const column1Content = extractText(".fe-block-da69e00a895b5a70ddd7 p");
  const column1Image = extractImage(".fe-block-046cc3528c2c2eaf43f0 img");

  const column2Header = extractText(".fe-block-297a88bb6fe254d9d71d p");
  const column2Content = extractText(".fe-block-04cb045237036ee8af31 p");
  const column2Image = extractImage(".fe-block-702c8261b81d6de2b78a img");

  const column3Header = extractText(".fe-block-7c3393ea789ca3648864 p");
  const column3Content = extractText(".fe-block-79fcdd345d81d234dc2b p");
  const column3Image = extractImage(".fe-block-5dddb0c9f7d61a6caca3 img");

  // Create the table structure
  const cells = [
    ["Columns"],
    [
      [column1Header, column1Image, column1Content],
      [column2Header, column2Image, column2Content],
      [column3Header, column3Image, column3Content],
    ],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
  return table;
}