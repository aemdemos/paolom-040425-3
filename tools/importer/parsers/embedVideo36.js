/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the video URL from the data attributes
  const videoBlock = element.querySelector('.sqs-native-video');
  const videoConfig = JSON.parse(videoBlock.getAttribute('data-config-video'));
  const videoUrlTemplate = videoConfig?.alexandriaUrl;

  // Safely retrieve and validate the video URL
  let videoUrl = '';
  if (videoUrlTemplate) {
    videoUrl = videoUrlTemplate.replace('{variant}', '1920');
  } else {
    console.error("Missing video configuration");
    return;
  }

  // Safely extract the poster URL
  const videoPosterElement = videoBlock.querySelector('video');
  let videoPoster = '';
  if (videoPosterElement) {
    videoPoster = videoPosterElement.getAttribute('data-poster');
  } else {
    console.error("Missing poster URL");
    return;
  }

  // Create elements for the image and link
  const posterImage = document.createElement('img');
  posterImage.setAttribute('src', videoPoster);

  const videoLink = document.createElement('a');
  videoLink.setAttribute('href', videoUrl);
  videoLink.textContent = videoUrl;

  // Create the structured table format
  const cells = [
    ['Embed'],
    [[posterImage, videoLink]] // Combine image and link into a single cell
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured table
  element.replaceWith(block);
}