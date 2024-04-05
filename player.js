function initVideoPlayer() {
    var videoPlayerPlaceholder = document.getElementById('videoPlayerPlaceholder');
    // Create video element
    var videoElement = document.createElement('video');
    videoElement.id = 'content_video';
    videoElement.className = 'video-js vjs-default-skin  fade-in';

    videoElement.controls = true;
    videoElement.poster = 'thumbnail.png';
    videoElement.preload = 'auto';
    // Add source
    var sourceElement = document.createElement('source');
    sourceElement.src = 'https://storage.googleapis.com/gvabox/media/samples/android.mp4';
    sourceElement.type = 'video/mp4';
    videoElement.appendChild(sourceElement);
    // Append video element after the third paragraph of the article
    var fourthParagraph = document.getElementsByTagName('p')[3];
    fourthParagraph.parentNode.insertBefore(videoElement, fourthParagraph.nextSibling);

    // Initialize video player
    var player = videojs('content_video');
    // Configuration for IMA SDK
    var imaOptions = {
        id: 'content_video',
        adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator='
    };
    // Integrate IMA SDK with Video.js player
    player.ima(imaOptions);
}

// Function to check if the viewport is at least 50% visible
function isViewportOver50PercentVisible() {
    var windowHeight = window.innerHeight;
    var scrollY = window.scrollY || window.pageYOffset;
    var articleOffsetTop = document.querySelector('article').offsetTop;
    var articleHeight = document.querySelector('article').clientHeight;
    var visibleArea = windowHeight - (scrollY - articleOffsetTop);
    var percentageVisible = (visibleArea / articleHeight) * 100;
    return percentageVisible <= 50;
}

// Function to handle scroll event
function handleScroll() {
    if (isViewportOver50PercentVisible()) {
        // If the viewport is over 50% visible, initialize the video player
        initVideoPlayer();
        // Remove scroll event listener once the video player is initialized
        window.removeEventListener('scroll', handleScroll);
    }
} var adContainer = document.getElementById('videoPlayerPlaceholder')

function onWindowResize() {
    // Adjust ad resolution when device orientation changes
    var newAdContainerWidth = adContainer.offsetWidth,
        newVideoHeight = videoElement.offsetHeight;


    adsManager.resize(newAdContainerWidth, newVideoHeight, google.ima.ViewMode.NORMAL);
}

// Add scroll event listener to handle when the user scrolls down
window.addEventListener('scroll', handleScroll);

// Add load event listener to handle when the page has fully loaded
handleScroll();