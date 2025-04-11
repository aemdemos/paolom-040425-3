/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the video block content
  const videoBlockContent = element.querySelector('.sqs-native-video');

  // Validate video block content exists
  if (!videoBlockContent) {
    console.warn('No video block content found');
    return;
  }

  // Extract video data (URL)
  const videoData = videoBlockContent.getAttribute('data-config-video');
  let videoUrl = '';
  if (videoData) {
    try {
      const parsedData = JSON.parse(videoData);
      videoUrl = parsedData.alexandriaUrl.replace('{variant}', '1920:1080');
    } catch (error) {
      console.error('Error parsing video data:', error);
    }
  }

  // Extract poster image URL
  const posterElement = videoBlockContent.querySelector('.plyr__poster');
  let posterImageUrl = '';
  if (posterElement && posterElement.style.backgroundImage) {
    const match = posterElement.style.backgroundImage.match(/url\((".*?"|'.*?'|.*?)\)/);
    if (match && match[1]) {
      posterImageUrl = match[1].replace(/["']/g, '');
    }
  }

  // Create elements dynamically
  const videoLink = document.createElement('a');
  videoLink.href = videoUrl;
  videoLink.textContent = videoUrl;

  const posterImage = document.createElement('img');
  posterImage.src = posterImageUrl;

  // Header row
  const headerRow = ['Video'];

  // Build the table rows dynamically
  const cells = [
    headerRow,
    [posterImage, videoLink],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}