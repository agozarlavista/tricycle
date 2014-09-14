var background_helper = {
    init : function(){
        console.log('init');
        var self = this;
        self.getStatus();
        setConfig();
    },
    getStatus : function(){
        console.log('getStatus');
        var self = this;
        getStatus(function(data){
            console.log(data);
            if(data.code == 200){
                self.startService();
            }
        });
    },
    startService : function(){
        console.log('startService');
        var self = this;
        startService(function(data){
            console.log(data);
            if(data.code == 200){
                self.startTimerIntent();
            }
        });
    },
    startTimerIntent : function(){
        console.log('startTimeIntent');
        var self = this;
        enableTimer(function(data){
            console.log(data);
            if(data.code == 200){
                self.registerForBootStart();
            }
        });
    },
    registerForBootStart : function(){
        console.log('registerForBootStart');
        var self = this;
        registerForBootStart(function(data){
            console.log(data);
            if(data.code == 200){
                self.registerForUpdates();
            }
        });
    },
    registerForUpdates : function(){
        console.log('registerForUpdates');
        var self = this;    
        registerForUpdates(function(data){
            if(data.data.LatestResult.Message){
                if (data.data.LatestResult.Message.indexOf("com.android.mms.ComposeMessageActivity") != -1){
                    app.isUserComposeMessage = true;
                }else{
                    app.isUserComposeMessage = false;
                }
            }
            plugins_helper.updateGiroSession();
        });
    },
    destroy : function(){
        stopService(function(){});
        disableTimer(function(){});
        deregisterForBootStart(function(){});
        deregisterForUpdates(function(){});
    }
}