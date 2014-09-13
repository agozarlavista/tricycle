var home_page = {
    init : function(target){
        console.log('home page');
        navigation._currentPageScript = this;
        this.showInitApp();
    },
    showInitApp : function(){
        var self = this;
        /*$('#intro_text').css('display', 'none');
        $('#btn_help_user').css('display', 'none');
        $('#btn_need_help').css('display', 'none');
        TweenLite.to($('#app_logo'), .1, {opacity:0});
        TweenLite.to($('#btn_help_user'), .1, {opacity:0});
        TweenLite.to($('#btn_need_help'), .1, {opacity:0});
        TweenLite.to($('#intro_text'), .1, {opacity:0});*/
        //$('.app_logo').css('margin-top', $(document).height());
        /*TweenLite.to($('.app_logo'), .8,{
            css:{marginTop:"100px"},
            ease:Back.easeOut,
            onComplete:function(){*/
                //self.showNavigation();
        //    }
        //});
    },
    showNavigation : function(){
                     
        /*TweenLite.to($('.app_logo'), .8,{
            opacity:1,
            delay:.3,
            onComplete:function(){
                $('#intro_text').css('display', 'table');
                $('#btn_help_user').css('display', 'block');
                $('#btn_need_help').css('display', 'block');
                TweenLite.to($('#intro_text'), .5, {opacity:1});
                TweenLite.to($('#btn_help_user'), .5, {opacity:1, delay:.2});
                TweenLite.to($('#btn_need_help'), .5, {opacity:1, delay:.4});
                //self.loadMyResponses();
            }
        });*/
    },
    loadMyResponses : function(){
        service.loadService(
            function(data){
                console.log('data');
            }, 
            'serviceURL'
        );
    },
    refresh : function(){
        
    },
    destroy : function(){
        
    }
}
home_page.init($('#home'));