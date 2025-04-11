/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [["Cards"]];

  const articles = element.querySelectorAll("article.blog-item");

  articles.forEach((article) => {
    // Extract image
    const imageLink = article.querySelector(".image-wrapper");
    const imageElement = imageLink?.querySelector("img");

    const image = document.createElement("img");
    image.src = imageElement?.src;
    image.alt = imageElement?.alt || "";

    // Extract title
    const titleLink = article.querySelector("h1.blog-title a");
    const title = titleLink ? document.createElement("p") : undefined;
    if (title) {
      title.style.fontWeight = "bold";
      title.textContent = titleLink.textContent.trim(); // Fix unnecessary formatting
    }

    // Extract description
    const descriptionElement = article.querySelector("div.blog-excerpt-wrapper > p");
    const description = descriptionElement ? document.createElement("p") : undefined;
    if (description) {
      description.textContent = descriptionElement.textContent.trim(); // Fix unnecessary formatting
    }

    // Extract call-to-action link
    const readMoreLink = article.querySelector("a.blog-more-link");
    const cta = readMoreLink ? document.createElement("a") : undefined;
    if (cta) {
      cta.href = readMoreLink.href;
      cta.textContent = "Read More";
    }

    const textContent = [];
    if (title) textContent.push(title);
    if (description) textContent.push(description);
    if (cta) textContent.push(cta);

    cells.push([image, textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}