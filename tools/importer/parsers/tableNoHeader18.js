/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Extract block table name
  const headerRow = ["Table (no header)"];

  // Step 2: Collect relevant content and ensure all data is flattened into plain text
  const rows = [];

  // Get all blocks inside the section (html or text-based content)
  const allBlocks = element.querySelectorAll('.sqs-html-content');

  allBlocks.forEach(block => {
    // Combine text content from all child elements into a single flattened string
    const content = Array.from(block.children)
      .map(el => el.textContent.trim())
      .filter(text => text) // Remove empty text nodes
      .join(' '); // Combine with a space to flatten

    rows.push([content]); // Add the combined text as a single cell in the row
  });

  // Step 3: Combine header row and rest of the data
  const cells = [headerRow, ...rows];

  // Step 4: Create block table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Step 5: Replace the original element with the new block table
  element.replaceWith(table);
}