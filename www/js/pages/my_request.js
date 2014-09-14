var my_request_page = {
    init : function(target){
        var self = this;
        navigation._currentPageScript = this;
        console.log('game_selection_page page ');
        setTimeout(function(){
            services.loadService(
                {
                    user_id:app.getLocalStorage('user')[0].id
                },
                function(data){
                    console.log(data);
                    self.displayList(data);
                    //navigation.router.navigate('page/my_request', {trigger: true, replace: false});
                }, 
                "request_get", 
                'GET'
            );
        }, 500);
    },
    displayList : function(data){
        
        if(data.length > 0){
            $('#intro_text').css('display','none');
        }
        for(var i=0; i<data.length; i++){
            var htmlTemplate = '<div class="response_label">';
                htmlTemplate += '<span class="label">'+data[i].message.substr(0, 9)+'</span>';
                htmlTemplate += '<div class="arrow">></div>';
                htmlTemplate += '</div>';
            console.log(htmlTemplate);
            $('#my_request_list').append(htmlTemplate);
        }
    },
    refresh : function(){
        
    },
    destroy : function(){
        
    }
}
my_request_page.init($('#my_request'));