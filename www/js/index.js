var app = {
	isUserAlcoolized: false,
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
        document.addEventListener(
        	"resume", 
        	function() { 
        		console.log(this);
        		app.onResume(); 
        	}, 
        	false
        );

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
	alcoolizedUserDetected: function(){
		this.isUserAlcoolized = true;
	    var config = {
	        "HelloTo" : "plop",
	        "LaunchAPP" : "yes"
	    };
	    myService.setConfiguration(
		    config,
		    function(r){handleSuccess(r)},
		    function(e){handleError(e)}
		);
	},
	onResume: function (){
		if (app.isUserAlcoolized){
			console.log('navigation.goto("detect")');
		} else {
			console.log("user is not alcoolized")
		}
	}
};
var myService;