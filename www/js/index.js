var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        navigation.init();
        myService = cordova.plugins.myService;
        getStatus();
        startService();
        enableTimer();
    },
    receivedEvent: function(id) {
        
    }
};
