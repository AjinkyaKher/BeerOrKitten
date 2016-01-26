var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-6960750059255716/6357426783',
        interstitial: 'ca-app-pub-6960750059255716/6357426783'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-6960750059255716/9252553983',
        interstitial: 'ca-app-pub-6960750059255716/9252553983'
    }; 
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}

function initApp() {
    if (!AdMob) { console.log('admob plugin not ready'); return; }

    AdMob.createBanner( {
        adId: admobid.banner, 
        isTesting: false,
        overlap: false, 
        offsetTopBar: false, 
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        bgColor: 'black'
    } );
    
    AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow: true
    });
}

