var services = {
    _serviceURI : "http://www.landscape-viewer.com/safems/",
    _callBack : null,
    init : function(){
        
    },
    loadService : function(params, callBack, url, method){
        var self = this;
        this._callBack = callBack;
        if (method == null){
            method = "GET";
        }
        $.ajax(
            {
                url: services._serviceURI + url,
                type: method,
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
    ajaxErrorCallBack : function(e){
        console.log('error ', e);
    },
    register : function(){
        /*if(app.getLocalStorage('user') == ""){
            return;
        }*/
        services.loadService(
            {
                uid:device.uuid,
                gcm_reg_id:"fuckingappkey"
            },
            function(data){
                console.log(data);
                app.saveLocalStorage('user', data);
            },
            "account_create",
            "POST"
        );
    },
    request : function(){
        services.loadService(
            {
                user_id:device.uuid,
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