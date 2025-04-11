/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract main content
  const title = element.querySelector('.fe-block-yui_3_17_2_1_1736804124924_6659 h3');
  const descriptions = Array.from(
    element.querySelectorAll('.fe-block-yui_3_17_2_1_1736804124924_19685 p')
  );

  // Title element
  const heading = title ? document.createElement('h3') : null;
  if (heading) {
    heading.innerHTML = title.innerHTML.trim();
  }

  // Combine descriptions into a single subheading
  const subheading = descriptions.length
    ? document.createElement('div')
    : null;
  if (subheading) {
    descriptions.forEach(description => {
      const para = document.createElement('p');
      para.innerHTML = description.innerHTML.trim();
      subheading.appendChild(para);
    });
  }

  // Combine content into the table
  const cells = [headerRow, [[heading, subheading]]]; // Ensuring one column per row

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created table
  element.replaceWith(table);
}