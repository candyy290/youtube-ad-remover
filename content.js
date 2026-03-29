const removeYoutubeAds = () => {
    const adSelectors = [
        '.video-ads',
        '.ytp-ad-module',
        '.ytp-ad-player-overlay',
        '#player-ads',
        '#masthead-ad',
        '.ytp-ad-image-overlay'
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
        // 광고 감지 시 즉시 음소거 및 16배속 설정
        video.muted = true;
        video.playbackRate = 16;
        
        if (isFinite(video.duration) && video.duration > 0) {
            video.currentTime = video.duration + 0.5;
        }
    }

    // 최신 유튜브 스킵 버튼 클래스 대응
    const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button, .ytp-ad-skip-button-modern');
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