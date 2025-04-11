/* global WebImporter */
 export default function parse(element, { document }) {
    const headerRow = ['Video'];
    
    // Extract video configuration
    const videoWrapper = element.querySelector('.sqs-native-video');
    const videoConfig = videoWrapper ? JSON.parse(videoWrapper.dataset.configVideo || '{}') : {};

    // Get video URL
    const videoUrl = videoConfig?.structuredContent?.alexandriaUrl?.replace('{variant}', '1920:1080');

    // Get poster image source
    const posterSrc = videoConfig?.structuredContent?.alexandriaUrl?.replace('{variant}', 'thumbnail');

    // Check for potential missing data and handle edge cases
    const posterImage = posterSrc ? document.createElement('img') : document.createTextNode('No poster available');
    if (posterSrc) {
        posterImage.setAttribute('src', posterSrc);
        posterImage.setAttribute('alt', 'Video poster');
    }

    const videoLink = videoUrl ? document.createElement('a') : document.createTextNode('No video URL available');
    if (videoUrl) {
        videoLink.setAttribute('href', videoUrl);
        videoLink.textContent = videoUrl;
    }

    // Build the table cells
    const cells = [
        headerRow,
        [posterImage, videoLink],
    ];

    // Create and replace the original block with the table
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
    }