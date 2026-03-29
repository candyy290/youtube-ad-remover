const removeYoutubeAds = () => {
    const adSelectors = [
        '.video-ads',
        '.ytp-ad-module',
        '.ytp-ad-player-overlay',
        '#player-ads',
        '#masthead-ad'
    ];

    adSelectors.forEach(selector => {
        // [수정] selctor -> selector 오타 수정
        const adElement = document.querySelector(selector);
        // [수정] adELement -> adElement 오타 수정
        if (adElement) {
            // [수정] remove.remove() -> remove()
            adElement.remove();
        }
    });

    const video = document.querySelector('video'); // 실제 비디오 태그 선택
    const adShowing = document.querySelector('.ad-showing, .ad-interrupting');
    
    // 광고가 상영 중일 경우 강제 종료 시도
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

// [해결] document.body가 로드된 후 관찰 시작
const startObserver = () => {
    if (document.body) {
        const observer = new MutationObserver(() => {
            removeYoutubeAds();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        removeYoutubeAds();
    } else {
        // 아직 body가 없으면 0.1초 뒤에 다시 시도
        setTimeout(startObserver, 100);
    }
};

startObserver();