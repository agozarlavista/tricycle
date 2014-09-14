var app = {
    _language : 'fr',
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady: function() {
		navigation.init();
        myService = cordova.plugins.myService;
        background_helper.init();
		//getStatus();
        /*startService();
        enableTimer();
        registerForBootStart();
        registerForUpdates();*/
        /*var timerCount = 0;
		window.plugins.BackgroundJS.LockBackgroundTime(
			function(){}, 
			function(msg){
				console.log(msg);
			}
		);
		setInterval(function() {
			$('body').html(timerCount++);
		},100);*/
	},
	receivedEvent: function(id) {

	},
    saveLocalStorage: function(key, obj) {
        window.localStorage.setItem(key+'_date', new Date().getTime());
	    instant_log.checkStorageState(key);
	    window.localStorage.setItem(key, JSON.stringify(obj));
    },
    getLocalStorage: function(key) {
		try {
			var content = window.localStorage.getItem(key);
			return content ? JSON.parse(content) : [];
		} catch(err) {
		    console.log("getLocalStorage error:", err);
		    return [];
		}
	}
};
var myService;