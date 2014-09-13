var app = {
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady: function() {
		navigation.init();
		var timerCount = 0;
		window.plugins.BackgroundJS.LockBackgroundTime(
			function(){}, 
			function(msg){
				console.log(msg);
			}
		);
		setInterval(function() {
			$('body').html(timerCount++);
		},100);
	},
	receivedEvent: function(id) {

	}
};
