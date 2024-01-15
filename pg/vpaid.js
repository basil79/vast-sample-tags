var LinearAd = function() {
    // The slot is the div element on the main page that the ad is supposed to
    // occupy.
    this._slot = null;
    // The video slot is the video object that the creative can use to render the
    // video element it might have.
    this._videoSlot = null;
    // VPAID events
    this.VPAID_EVENTS = {
        AdStarted: "AdStarted",
        AdStopped: "AdStopped",
        AdSkipped: "AdSkipped",
        AdLoaded: "AdLoaded",
        AdLinearChange: "AdLinearChange",
        AdSizeChange: "AdSizeChange",
        AdExpandedChange: "AdExpandedChange",
        AdSkippableStateChange: "AdSkippableStateChange",
        AdDurationChange: "AdDurationChange",
        AdRemainingTimeChange: "AdRemainingTimeChange",
        AdVolumeChange: "AdVolumeChange",
        AdImpression: "AdImpression",
        AdClickThru: "AdClickThru",
        AdInteraction: "AdInteraction",
        AdVideoStart: "AdVideoStart",
        AdVideoFirstQuartile: "AdVideoFirstQuartile",
        AdVideoMidpoint: "AdVideoMidpoint",
        AdVideoThirdQuartile: "AdVideoThirdQuartile",
        AdVideoComplete: "AdVideoComplete",
        AdUserAcceptInvitation: "AdUserAcceptInvitation",
        AdUserMinimize: "AdUserMinimize",
        AdUserClose: "AdUserClose",
        AdPaused: "AdPaused",
        AdPlaying: "AdPlaying",
        AdError: "AdError",
        AdLog: "AdLog"
    };
    // An object containing all registered events.  These events are all
    // callbacks from the vpaid ad.
    this._eventCallbacks = {};
    // A list of attributes getable and setable.
    this._attributes = {
        companions : "",
        desiredBitrate : 256,
        duration : 30,
        expanded : false,
        width : 0,
        height : 0,
        nonLinearSlotHeight : 150,
        viewMode : "normal",
        icons : "",
        linear : true,
        currentTime : 0,
        remainingTime : 30,
        skippableState : false,
        volume : 1
    };

    this._quartileEvents = [
        { event: 'AdImpression', value: 0 }, { event: 'AdVideoStart', value: 0 },
        { event: 'AdVideoFirstQuartile', value: 25 },
        { event: 'AdVideoMidpoint', value: 50 },
        { event: 'AdVideoThirdQuartile', value: 75 },
        { event: 'AdVideoComplete', value: 100 }
    ];
    this._nextQuartileIndex = 0;

    this._currentAd = null;

    this._isStarted = false;
    this._isPaused = false;
};
LinearAd.prototype.doContentComplete = function() {
    console.log('VP > contentEndedListener executed');
};
LinearAd.prototype.onAdLoaded = function() {
    if (this.VPAID_EVENTS.AdLoaded in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdLoaded]();
    }
};
LinearAd.prototype.onAdStarted = function() {
    if (this.VPAID_EVENTS.AdStarted in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdStarted]();
    }
};
LinearAd.prototype.onAdVideoStart = function() {
    if (this.VPAID_EVENTS.AdVideoStart in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdVideoStart]();
    }
};
LinearAd.prototype.onAdImpression = function() {
    if (this.VPAID_EVENTS.AdImpression in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdImpression]();
    }
};
LinearAd.prototype.onAdClickThru = function(url, id, playerHandles) {
    if (this.VPAID_EVENTS.AdClickThru in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdClickThru](url, id, playerHandles);
    }
};
LinearAd.prototype.onAdVideoFirstQuartile = function() {
    if (this.VPAID_EVENTS.AdVideoFirstQuartile in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdVideoFirstQuartile]();
    }
};
LinearAd.prototype.onAdVideoMidpoint = function() {
    if (this.VPAID_EVENTS.AdVideoMidpoint in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdVideoMidpoint]();
    }
};
LinearAd.prototype.onAdVideoThirdQuartile = function() {
    if (this.VPAID_EVENTS.AdVideoThirdQuartile in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdVideoThirdQuartile]();
    }
};
LinearAd.prototype.onAdVideoComplete = function() {
    console.log('VP > onAdVideoComplete');
    if (this.VPAID_EVENTS.AdVideoComplete in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdVideoComplete]();
    }
};
LinearAd.prototype.onAdPaused = function() {
    if (this.VPAID_EVENTS.AdPaused in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdPaused]();
    }
};
LinearAd.prototype.onAdPlaying = function() {
    if (this.VPAID_EVENTS.AdPlaying in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdPlaying]();
    }
};
LinearAd.prototype.onAdVolumeChange = function() {
    if (this.VPAID_EVENTS.AdVolumeChange in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdVolumeChange]();
    }
};
LinearAd.prototype.onAdStopped = function() {
    if (this.VPAID_EVENTS.AdStopped in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdStopped]();
    }
};
LinearAd.prototype.onAdSkipped = function() {
    if (this.VPAID_EVENTS.AdSkipped in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdSkipped]();
    }
};
LinearAd.prototype.onAdDurationChange = function() {
    if (this.VPAID_EVENTS.AdDurationChange in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdDurationChange]();
    }
};
LinearAd.prototype.onAdInteraction = function() {
    if (this.VPAID_EVENTS.AdInteraction in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdInteraction]();
    }
};
LinearAd.prototype.onAdLinearChange = function() {
    if (this.VPAID_EVENTS.AdLinearChange in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdLinearChange]();
    }
};
LinearAd.prototype.onAdSkippableStateChange = function() {
    if (this.VPAID_EVENTS.AdSkippableStateChange in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdSkippableStateChange]();
    }
};
LinearAd.prototype.onAdRemainingTimeChange = function() {
    if (this.VPAID_EVENTS.AdRemainingTimeChange in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdRemainingTimeChange]();
    }
}
LinearAd.prototype.onAdUserClose = function() {
    if (this.VPAID_EVENTS.AdUserClose in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdUserClose]();
    }
};
LinearAd.prototype.onAdLog = function(message) {
    if (this.VPAID_EVENTS.AdLog in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdLog](message);
    }
};
LinearAd.prototype.onAdSizeChange = function() {
    if (this.VPAID_EVENTS.AdSizeChange in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdSizeChange]();
    }
};
LinearAd.prototype.onAdExpandedChange = function() {
    if (this.VPAID_EVENTS.AdExpandedChange in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdExpandedChange]();
    }
};
LinearAd.prototype.onAdError = function(message) {
    if (this.VPAID_EVENTS.AdError in this._eventCallbacks) {
        this._eventCallbacks[this.VPAID_EVENTS.AdError](message);
    }
};
LinearAd.prototype.handshakeVersion = function(version) {
    return ('2.0');
};
LinearAd.prototype.timeUpdateHandler = function() {
    if (this._nextQuartileIndex >= this._quartileEvents.length) {
        return;
    }
    var percentPlayed = this._videoSlot.currentTime * 100.0 / this._videoSlot.duration;
    if (percentPlayed >= this._quartileEvents[this._nextQuartileIndex].value) {
        var lastQuartileEvent = this._quartileEvents[this._nextQuartileIndex].event;
        console.log('VP >', lastQuartileEvent);
        this._eventCallbacks[lastQuartileEvent]();
        this._nextQuartileIndex += 1;
    }
    if (this._videoSlot.duration > 0) {
        this._attributes.remainingTime = this._videoSlot.duration - this._videoSlot.currentTime;
    }
};
LinearAd.prototype.initAd = function(width, height, viewMode, desiredBitrate, creativeData, environmentVars) {

    console.log('initAd', width, height, viewMode, desiredBitrate, creativeData, environmentVars);

    // slot and videoSlot are passed as part of the environmentVars
    this._slot = environmentVars.slot;
    this._videoSlot = environmentVars.videoSlot;

    // Fix for Safari mobile browser
    //this._videoSlot.setAttribute('muted','');
    //this._videoSlot.muted = true;

    this._attributes.width = width;
    this._attributes.height = height;
    this._attributes.viewMode = viewMode;
    this._attributes.desiredBitrate = desiredBitrate;

    this.log('initAd ' + width + 'x' + height + ' ' + viewMode + ' ' + desiredBitrate);

    //console.log('VP > ', creativeData);
    //console.log('VP > environmentVars', environmentVars);
    //console.log('VP > VIDEO SLOT', this._videoSlot);

    var that = this;
    if(this._videoSlot == null) {
        this._videoSlot = document.createElement('video');
        this._slot.appendChild(this._videoSlot);
    }

    this._videoSlot.setAttribute('src', 'https://raw.githubusercontent.com/basil79/vast-sample-tags/master/pg/24.mp4');

    this._videoSlot.addEventListener('timeupdate', this.timeUpdateHandler.bind(this), false);
    this._videoSlot.addEventListener('loadedmetadata', function(event) {
        // The ad duration is not known until the media metadata is loaded.
        // Then, update the player with the duration change.
        that._attributes.duration = event.target.duration;
        that._attributes.remainingTime = event.target.duration;
        that.onAdDurationChange();
    }, false);

    this._videoSlot.addEventListener('ended', this.stopAd.bind(this), false);

    // AdClickThru
    /*
    this._slot.addEventListener('click', function(event) {
        //var targetUrl = 'http://192.168.1.111/';
        //var opener = window.open(targetUrl, "_blank");
        //void 0 !== opener ? opener.focus() : window.location.href = targetUrl
        if(!that._isPaused) {
            that.pauseAd();
        } else {
            that.resumeAd();
        }
    }, false);
    */
    this._slot.addEventListener('click', function() {
        that.onAdClickThru('', '0');
    }, false);

    this.onAdLoaded();
};
LinearAd.prototype.startAd = function() {
    console.log('VP > startAd');

    this._videoSlot.play();
    //this._videoSlot.load();
    this.onAdStarted();
};
LinearAd.prototype.getAdVolume = function() {
    return this._attributes.volume;
};
LinearAd.prototype.setAdVolume = function(value) {
    var isChanged = value !== this._attributes.volume;
    if(isChanged) {
        this._attributes.volume = value;
        this._videoSlot.volume = value;
        this.onAdVolumeChange();
    }
};
LinearAd.prototype.resumeAd = function() {
    this._videoSlot.play();
    this._isPaused = !1;
    this.onAdPlaying();
};
LinearAd.prototype.pauseAd = function() {
    this._videoSlot.pause();
    this._isPaused = !0;
    this.onAdPaused();
};
LinearAd.prototype.resizeAd = function(width, height, viewMode) {
    console.log('VP > resizeAd', width, height, viewMode);
    this._attributes.width = width;
    this._attributes.height = height;
    this._attributes.viewMode = viewMode;
    this.onAdSizeChange();
};
LinearAd.prototype.stopAd = function() {
    console.log('VP > stopAd');
    this.log('Stopping ad');
    var that = this;
    // Calling AdStopped immediately terminates the ad. Setting a timeout allows events to go through.
    setTimeout(function () {
        that.onAdStopped();
    }, 75);
};
LinearAd.prototype.getAdExpanded = function() {
    return this._attributes.expanded;
};
LinearAd.prototype.collapseAd = function() {
    this._attributes.expanded = false;
    this.onAdExpandedChange();
};
LinearAd.prototype.expandAd = function() {
    this._attributes.expanded = true;
    this.onAdExpandedChange();
};
LinearAd.prototype.getAdSkippableState = function() {
    return this._attributes.skippableState;
};
LinearAd.prototype.skipAd = function() {
    this.onAdSkipped();
};
LinearAd.prototype.subscribe = function(callback, eventName, context) {
    this.log('Subscribe ' + eventName);
    var givenCallback = callback.bind(context);
    this._eventCallbacks[eventName] = givenCallback;
};
LinearAd.prototype.unsubscribe = function(eventName) {
    this.log('unsubscribe ' + eventName);
    this._eventCallbacks[eventName] = null;
};
LinearAd.prototype.getAdWidth = function() {
    return this._attributes.width;
};
LinearAd.prototype.getAdHeight = function() {
    return this._attributes.height;
};
LinearAd.prototype.getAdRemainingTime = function() {
    return this._videoSlot.duration - this._videoSlot.currentTime; //this._attributes.remainingTime;
};
LinearAd.prototype.getAdDuration = function() {
    //console.log('VP > getAdDuration', this._attributes.duration);
    return this._attributes.duration;
};
LinearAd.prototype.getAdCompanions = function() {
    return [];
};
LinearAd.prototype.getAdIcons = function() {
    return this._attributes.icons;
};
LinearAd.prototype.getAdLinear = function() {
    return this._attributes.linear;
};
LinearAd.prototype.log = function(message) {
    console.log(message);
};

function getVPAIDAd() {
    //console.log('VP > getVPAIDAd');
    return new LinearAd;
}
window.getVPAIDAd = getVPAIDAd
