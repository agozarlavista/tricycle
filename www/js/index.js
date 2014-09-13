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

$("#aaaaaaaaa").on("click", function(){
	console.log("tapette");
	var config = { 
					"HelloTo" : helloToString,
					"LaunchAPP" : "yes"
				}; 
	myService.setConfiguration(	config,
								function(r){handleSuccess(r)},
								function(e){handleError(e)});
	background_helper.registerForUpdates();
})