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

	}
};
var myService;