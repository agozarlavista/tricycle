var watchID = null;
var isStart = 0;
var failValue = 1;
var game_selection_page = {
	lastAcceleration: null,
	startValue : 3,
	failValue : 2,
	isWin: false,
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
    	console.log("gyro success");
    	console.log(game_selection_page.lastAcceleration);

        if (game_selection_page.lastAcceleration !== null) {

            testX = Math.abs(Math.round(acceleration.x - game_selection_page.lastAcceleration.x));
            testY = Math.abs(Math.round(acceleration.y - game_selection_page.lastAcceleration.y));
            testZ = Math.abs(Math.round(acceleration.z - game_selection_page.lastAcceleration.z));
            if (isStart){
	            if(testZ > game_selection_page.failValue || testY > game_selection_page.failValue || testX > game_selection_page.failValue){

					if (isStart && !game_selection_page.isWin){
	                	game_selection_page.failExercice();
			    	}

	            }else{
	            	var nextnm = parseInt($("#comptearbour").data("compte")) - 1;
		            if (nextnm < 0){
						$("#comptearbour").parent("div.reda").removeClass("reda").addClass("greena").css("height", "300px;");
						$("#comptearbour").text("BRAVO! Vous avez réussi le test! (clique moi dessus)").data("compte", nextnm);
						game_selection_page.isWin = true;
					    var config = {
					        "HelloTo" : "plop",
					        "backSMS" : "yes"
					    };
					    console.log("----");
					    console.log(config.backSMS);
					    console.log(myService);
					    myService.setConfiguration(
						    config,
						    function(r){handleSuccess(r)},
						    function(e){handleError(e)}
						);
		            } else {
		            	$("#comptearbour").text(nextnm).data("compte", nextnm);	
		            }
	            }
	        }else{
	            if(testZ > game_selection_page.startValue || testY > game_selection_page.startValue || testX > game_selection_page.startValue){
	    			game_selection_page.startRexercice();
	            }
	    	}

        } else {
        	console.log("no accel");
        }
    	game_selection_page.lastAcceleration = acceleration;
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
		$("#comptearbour").text("C'est raté de chez raté!").data("compte", 20).css("height", "300px;");
		$("#comptearbour").parent("div").data("page","question/quiz/origin");
    }
}
game_selection_page.init($('#game_selection'));