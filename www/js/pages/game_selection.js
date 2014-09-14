var watchID = null;
var lastAcceleration = null;
var isStart = 0;
var failValue = 1;
var game_selection_page = {
    init : function(target){
        navigation._currentPageScript = this;
        console.log('game_selection_page page ');
        var options = { frequency: 1000 };
        watchID = navigator.accelerometer.watchAcceleration(this.onGyroSuccess, this.onGyroError, options);
    },
    refresh : function(){
        
    },
    destroy : function(){
        
    },
    onGyroSuccess: function(acceleration){

	        if (lastAcceleration != null) {
	            testX = Math.abs(Math.round(acceleration.x - lastAcceleration.x));
	            testY = Math.abs(Math.round(acceleration.y - lastAcceleration.y));
	            testZ = Math.abs(Math.round(acceleration.z - lastAcceleration.z));
	        
	            if(testZ > failValue || testY > failValue || testX > failValue){

    				if (isStart){
	                	this.failExercice;
			    	} else {

			    	}
	            }
	            var nextnm = parseInt($("#comptearbour").data("compte")) - 1;
	            if (nextnm < 0){
					$("#comptearbour").parent("div.reda").removeClass("reda").addClass("greena");
					$("#comptearbour").text("BRAVO! Vous avez réussi le test! (clique moi dessus)").data("compte", nextnm);
	            } else {
	            	$("#comptearbour").text(nextnm).data("compte", nextnm);	
	            }
	        }
    	lastAcceleration = Acceleration;
    },
    gyroStop: function(){
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    },
    onGyroError: function(){
    	console.log("Gyro error");
    },
    startRexercice: function(){
    	isStart = true;
		var nextnm = parseInt($("#comptearbour").data("compte")) - 1;
    	$("#comptearbour").text(nextnm).data("compte", nextnm);;
    },
    failExercice: function(){
		$("#comptearbour").text("C'est raté de chez raté!").data("compte", nextnm);
    }
}
game_selection_page.init($('#game_selection'));