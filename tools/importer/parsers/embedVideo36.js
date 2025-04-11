/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the video URL from the data-config-video attribute
  const videoContainer = element.querySelector('.sqs-native-video');
  const videoData = videoContainer ? JSON.parse(videoContainer.getAttribute('data-config-video')) : null;
  const videoUrl = videoData && videoData.structuredContent && videoData.structuredContent.alexandriaUrl
    ? videoData.structuredContent.alexandriaUrl.replace('{variant}', '1920:1080')
    : null;

  // Extract the poster thumbnail URL
  const posterElement = element.querySelector('video');
  const posterUrl = posterElement ? posterElement.getAttribute('data-poster') : null;

  // Create an image element for the poster if available
  const posterImage = posterUrl ? document.createElement('img') : null;
  if (posterImage) {
    posterImage.setAttribute('src', posterUrl);
  }

  // Create an anchor element for the video URL if available
  const videoLink = videoUrl ? document.createElement('a') : null;
  if (videoLink) {
    videoLink.setAttribute('href', videoUrl);
    videoLink.textContent = videoUrl;
  }

  // Define the table structure
  const headerRow = ['Embed']; // Header row matches example
  const contentRow = posterImage && videoLink
    ? [[posterImage, document.createElement('br'), videoLink]]
    : videoLink
    ? [[videoLink]]
    : [['No content available']];

  const cells = [
    headerRow,
    contentRow,
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}