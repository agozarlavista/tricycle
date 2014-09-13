var plugins_helper = {
    _giroSession : [],
    _distances : [],
    init: function(){
        this._giroSession = [];
        this._distances = [];
    },
    updateGiroSession : function(){
        navigator.accelerometer.getCurrentAcceleration(plugins_helper.accelerometerSuccess, plugins_helper.accelerometerError);
    },
    accelerometerSuccess : function (acceleration){
        //acceleration.x acceleration.y acceleration.z acceleration.timestamp
        this._giroSession.push(acceleration);
        this.checkLastUpdateDistance();
    },
    checkLastUpdateDistance : function(){
        if(this._giroSession.length>1){
            var Xa = this._giroSession[this._giroSession.length-1].x;
            var Xb = this._giroSession[this._giroSession.length].x;
            var Ya = this._giroSession[this._giroSession.length-1].y;
            var Yb = this._giroSession[this._giroSession.length].y;
            var Za = this._giroSession[this._giroSession.length-1].z;
            var Zb = this._giroSession[this._giroSession.length].z;
            var distance = 8;
            //Math.sqrt(Math.sqrt(Xa-Xb)+Math.sqrt(Ya-Yb)+Math.sqrt(Za-Zb));
            this._distances.push(distance);
            //if($('#dump').length > 0){
                $('#dump').html(JSON.stringify(this._giroSession));
                //$('#distance').html(JSON.stringify(this._distances));
            //}
            //alert(this._giroSession);
        }
    },
    accelerometerError : function (datas){
        console.log('OH SHIT YOUR PHONE SUCK MAMAMYA');
    },
    destroy : function(){
        this._giroSession = [];
        this._distances = [];
    }
}