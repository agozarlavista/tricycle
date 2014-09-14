var help_form_page = {
    _requestId:null,
    _requestInfos : null,
    init : function(target){
        var self = this;
        navigation._currentPageScript = this;
        console.log('game_selection_page page ');
        if(typeof navigation.pageInfos.request == "undefined"){
            return false;
        }
        this._requestId = navigation.pageInfos.request;
        setTimeout(function(){
            services.loadService(
                {
                    request_id : self._requestId
                },
                function(data){
                    console.log(data);
                    self._requestInfos = data;
                    self.requestLoaded();
                    //navigation.router.navigate('page/my_request', {trigger: true, replace: false});
                }, 
                "request_get", 
                'GET'
            );
        }, 500);
    },
    requestLoaded : function(){
        var self = this;
        $('#user_message').html(this._requestInfos[0].message);
        Hammer(document.getElementById('send_my_request')).on('tap', function(){
            if($('#message_box').val() == ''){
                return false;
            }
            services.loadService(
                {
                    request_id :self._requestId,
                    sender_id:app.getLocalStorage('user')[0].id,
                    message:document.getElementById('message_box').value,
                    state:0
                },
                function(data){
                    console.log(data);
                    navigation.router.navigate('page/thankyou', {trigger: true, replace: false});
                },
                "response_add",
                'POST'
            );
        });
    },
    refresh : function(){
        
    },
    destroy : function(){
        
    }
}
help_form_page.init($('#help_form'));