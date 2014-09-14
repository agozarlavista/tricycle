var help_form_page = {
    init : function(target){
        navigation._currentPageScript = this;
        console.log('game_selection_page page ');
        setTimeout(function(){
        Hammer(document.getElementById('send_my_request')).on('tap', function(){
            if($('#message_box').val() == ''){
                return false;
            }
            services.loadService(
                {
                    user_id:app.getLocalStorage('user')[0].id,
                    message:document.getElementById('message_box').value,
                    theme:'en cours'
                },
                function(data){
                    console.log(data);
                    navigation.router.navigate('page/my_request', {trigger: true, replace: false});
                }, 
                "request_add", 
                'POST'
            );
        });
        }, 1000);
    },
    refresh : function(){
        
    },
    destroy : function(){
        
    }
}
help_form_page.init($('#help_form'));