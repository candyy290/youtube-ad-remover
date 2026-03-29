const removeYoutubeAds = () => {
    const adSelectors = [
        '.video-ads',
        '.ytp-ad-module',
        '.ytp-ad-player-overlay',
        '#player-ads',
        '#masthead-ad'
    ];

    adSelectors.forEach(selector => {
        const adElement = document.querySelector(selector);
        if (adElement) {
            adElement.remove();
        }
    });

    const video = document.querySelector('video');
    const adShowing = document.querySelector('.ad-showing, .ad-interrupting');
    
    if (video && adShowing) {
        if (video.duration > 0 && isFinite(video.duration)) {
            video.currentTime = video.duration;
        }
    }

    const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button');
    if (skipButton) {
        skipButton.click();
    }
};

const startObserver = () => {
    if (document.body) {
        new MutationObserver(() => removeYoutubeAds()).observe(document.body, {
            childList: true,
            subtree: true
        });
        removeYoutubeAds();
    } else {
        setTimeout(startObserver, 100);
    }
};

startObserver();