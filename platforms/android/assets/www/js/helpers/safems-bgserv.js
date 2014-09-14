var _callBack = null;
function loadModule(){
    var serviceName = 'com.red_folder.phonegap.plugin.backgroundservice.sample.MyService';
    /*
     * Get an instance of the background service factory
     * Use it to create a background service wrapper for your service
     */
    var factory = require('com.red_folder.phonegap.plugin.backgroundservice.BackgroundService');
    module.exports = factory.create(serviceName);
}

function handleSuccess(data) {
    _callBack({code:200, message:'success', data:data});
}

function handleError(data) {
    _callBack({code:401, message:'error forbiden', data:data});
}

/*
 * Button Handlers
 */ 			
function getStatus(callBack) {
    _callBack = callBack;
	myService.getStatus(	function(r){handleSuccess(r)},
							function(e){handleError(e)});
};

function startService(callBack) {
    _callBack = callBack;
	myService.startService(	function(r){handleSuccess(r)},
							function(e){handleError(e)});
}

function stopService(callBack) {
    _callBack = callBack;
	myService.stopService(	function(r){handleSuccess(r)},
							function(e){handleError(e)});
}

function enableTimer(callBack) {
    _callBack = callBack;
	myService.enableTimer(	10000,
							function(r){handleSuccess(r)},
							function(e){handleError(e)});
}

function disableTimer(callBack) {
    _callBack = callBack;
	myService.disableTimer(	function(r){handleSuccess(r)},
							function(e){handleError(e)});
};
 			
function registerForBootStart(callBack) {
    _callBack = callBack;
	myService.registerForBootStart(	function(r){handleSuccess(r)},
									function(e){handleError(e)});
}

function deregisterForBootStart(callBack) {
    _callBack = callBack;
	myService.deregisterForBootStart(	function(r){handleSuccess(r)},
										function(e){handleError(e)});
}

function registerForUpdates(callBack) {
    _callBack = callBack;
	myService.registerForUpdates(	function(r){handleSuccess(r)},
									function(e){handleError(e)});
}

function deregisterForUpdates(callBack) {
    _callBack = callBack;
	myService.deregisterForUpdates(	function(r){handleSuccess(r)},
									function(e){handleError(e)});
}

function setConfig() {
	//var helloToTxt = document.getElementById("helloToTxt");
	var helloToString = "simon say hello";
    //helloToTxt.value;
	var config = { 
					"HelloTo" : helloToString 
				}; 
	myService.setConfiguration(	config,
								function(r){handleSuccess(r)},
								function(e){handleError(e)});
}

/*
 * View logic
 */
function updateView(data) {
	var serviceBtn = document.getElementById("toggleService");
	var timerBtn = document.getElementById("toggleTimer");
	var bootBtn = document.getElementById("toggleBoot");
	var listenBtn = document.getElementById("toggleListen");
	var updateBtn = document.getElementById("updateBtn");
	var refreshBtn = document.getElementById("refreshBtn");

	var serviceStatus = document.getElementById("serviceStatus");
	var timerStatus = document.getElementById("timerStatus");
	var bootStatus = document.getElementById("bootStatus");
	var listenStatus = document.getElementById("listenStatus");
	
	serviceBtn.disabled = false;
	if (data.ServiceRunning) {
		serviceStatus.innerHTML = "Running";
		serviceBtn.onclick = stopService;
		timerBtn.disabled = false;
		if (data.TimerEnabled) {
			timerStatus.innerHTML = "Enabled";
			timerBtn.onclick = disableTimer;
		} else {
			timerStatus.innerHTML = "Disabled";
			timerBtn.onclick = enableTimer;
		} 

		updateBtn.disabled = false;
		updateBtn.onclick = setConfig;

		refreshBtn.disabled = false;
		refreshBtn.onclick = getStatus;

	} else { 
		serviceStatus.innerHTML = "Not running";
		serviceBtn.onclick = startService;
		timerBtn.disabled = true;
		timerEnabled = false; 

		updateBtn.disabled = true;
		refreshBtn.disabled = true;
	} 

	bootBtn.disabled = false;
	if (data.RegisteredForBootStart) {
		bootStatus.innerHTML = "Registered";
		bootBtn.onclick = deregisterForBootStart;
	} else {
		bootStatus.innerHTML = "Not registered";
		bootBtn.onclick = registerForBootStart;
	}
	
	listenBtn.disabled = false;
	if (data.RegisteredForUpdates) {
		listenStatus.innerHTML = "Registered";
		listenBtn.onclick = deregisterForUpdates;
	} else {
		listenStatus.innerHTML = "Not registered";
		listenBtn.onclick = registerForUpdates;
	}

	if (data.Configuration != null)
	{
		try {
			var helloToTxt = document.getElementById("helloToTxt");
			helloToTxt.value = data.Configuration.HelloTo;
		} catch (err) {
		}
	}
	
	if (data.LatestResult != null)
	{
		try {
			var resultMessage = document.getElementById("resultMessage");
			resultMessage.innerHTML = data.LatestResult.Message;
		} catch (err) {
		}
	}
}