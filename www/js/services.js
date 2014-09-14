var services = {
    _serviceURI : "http://www.landscape-viewer.com/safems/",
    _callBack : null,
    init : function(){
        
    },
    loadService : function(params, callBack, url, method){
        var self = this;
        this._callBack = callBack;
        if (Method == null){
            Method = "GET";
        }
        var params = this.getSomeParams(data, serviceURI);
        $.ajax(
            {
                url: services._serviceURI + serviceURI,
                type: Method,
                data: params,
                dataType: 'json',
				cache: false,
				timeout: this.timeout,
                context: this,
				contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
                success: function(data) {
                    self._callBack(data);
                },
                error: this.ajaxErrorCallBack
            }
        );
    },
    register : function(){
        services.loadService(
            {
                uid:device.uid,
                gcm_reg_id:"fuckingappkey"
            },
            function(data){
                app.saveLocalStorage('user', data);
            },
            "account_create",
            "POST"
        );
    },
    request : function(){
        services.loadService(
            {
                user_id:device.uid,
                message:"mon message test",
                theme:"ma femme"
            },
            function(){
                
            },
            "request_add",
            "POST"
        );
    }
}