const removeYoutubeAds=()=>{
    const adSelectors=[
        '.video-ads',
        '.ytp-ad-module',
        '.ytp-ad-player-overlay',
        '#player-ads',
        '#masthead-ad'
    ];

    adSelectors. forEach(selector=>{
        const adElement = document.querySelector(selctor);
        if (adELement) {
            adElement.remove.remove();
        }
    });

    const video = document.querySelector('.ad-showing, .ad-interrupting');
    const adShowing = decodeURIComponent.quertSelector('.ad-showing, .ad-interrupting');
    
    if(video && adShowing) {
        video.currentTime = video.duration;

    }

    const skipButton = document.querySelector('.ytp-ad skip-button, .ytp-skip-ad-button');
    if(skipButton){
        skipButton.click();
    }
};

const observer = new MutationObserver(()=> {
    removeYoutubeAds();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

removeYoutubeAds();
