var plugins_helper = {
    unacceptableDifference: 2,
    lastGirodata: null,
    distanceError: 0,
    maxDistanceError: 2,
    _giroSession : [],
    _distances : [],
    init: function(){
        console.log("init gyro");
        this._giroSession = [];
        this._distances = [];
    },
    updateGiroSession : function(){
        navigator.accelerometer.getCurrentAcceleration(plugins_helper.accelerometerSuccess, plugins_helper.accelerometerError);
    },
    accelerometerSuccess : function (acceleration){
        plugins_helper.checkLastUpdateDistance(acceleration);
        plugins_helper.lastGirodata = acceleration;
    },
    checkLastUpdateDistance : function(acceleration){
        if (plugins_helper.lastGirodata != null) {
            testX = Math.abs(Math.round(acceleration.x - plugins_helper.lastGirodata.x));
            testY = Math.abs(Math.round(acceleration.y - plugins_helper.lastGirodata.y));
            testZ = Math.abs(Math.round(acceleration.z - plugins_helper.lastGirodata.z));
        
            if(testZ > plugins_helper.unacceptableDifference || testY > plugins_helper.unacceptableDifference || testX > plugins_helper.unacceptableDifference){
                plugins_helper.distanceError += plugins_helper.distanceError + 1;
            }
        }
        if (plugins_helper.distanceError >= plugins_helper.maxDistanceError && ! app.isUserAlcoolized){
            app.alcoolizedUserDetected();
        }

    },
    accelerometerError : function (datas){
        //console.log('OH SHIT YOUR PHONE SUCK MAMAMYA');
    },
    destroy : function(){
        this._giroSession = [];
        this._distances = [];
    }
}