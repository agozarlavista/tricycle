function options_menu (params, delegate) {
    this.callBack = delegate;
    this.options = params;
    this.target = document.getElementById(params['target']);
    if(typeof params['swipeLeft'] != "undefined")
        this.swipeLeft = true;
    if(typeof params['swipeRight'] != "undefined")
        this.swipeRight = true;
    this.addElements();
    this.setListeners();
}
options_menu.prototype.addElements = function(){
    if(this.swipeLeft){
        $('#'+this.options['target']).append('<div class="right_list_button green"><span class="icon">'+this.options['swipeLeft'].icon+'</span>'+this.options['swipeLeft'].title+'</div>');
        $('#'+this.options['target']+' .right_list_button').css('line-height', $('#'+this.options['target']).height()+"px");
    }
    if(this.swipeRight){
        $('#'+this.options['target']).append('<div class="left_list_button red"><span class="icon">'+this.options['swipeRight'].icon+'</span>'+this.options['swipeRight'].title+'</div>');
        $('#'+this.options['target']+' .left_list_button').css('line-height', $('#'+this.options['target']).height()+"px");
    }
}
options_menu.prototype.setListeners = function(){
    var self = this;
    var startX = 0;
    var startY = 0;
    var element = document.getElementById(self.options.target);
    //caw_ui.myScroll.disable();
    //caw_ui.myScroll.enable();
    Hammer( element ).on("touchstart", function(event) {
        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;
    });
    Hammer( element ).on("touchmove", function(event) {
        var w = Math.abs(startX-event.touches[0].pageX);
        var h = Math.abs(startY-event.touches[0].pageY);
        /* except for clic and walk check shutter desactive slide */
        if(typeof navigation != "undefined")
            if(typeof navigation.shutterNavigation != "undefined")
                if(navigation.shutterNavigation._sliding)
                    return false;
        
        if(h > w){
            if(self.swipeLeft){
                TweenLite.to($('#'+self.options.target+' .float_right_element'), .5, {css:{'right':'0px'}});
                TweenLite.to($('#'+self.options.target+' .left_list_button'), .5, {css:{'width':'0px'}});
            }
            if(self.swipeRight){
                $('#'+self.options.target).css('padding-left', '0px');
                TweenLite.to($('#'+self.options.target+' .left_list_button'), .5, {css:{'width':'0px'}});
            }
            return;
        }
        if(w > $(document).width()/2)
            w = $(document).width()/2;
        if(startX-event.touches[0].pageX > 0){
            $('#'+self.options.target+' .left_list_button').css('width', '0px');
            $('#'+self.options.target).css('padding-left', '0px');
            if(self.swipeLeft){
                $('#'+self.options.target+' .float_right_element').css('right', w+'px');
                $('#'+self.options.target+' .right_list_button').css('width', w+'px');
            }
        }else{
            $('#'+self.options.target+' .float_right_element').css('right', '0px');
            $('#'+self.options.target+' .right_list_button').css('width', '0px');
            if(self.swipeRight){
                $('#'+self.options.target).css('padding-left', w+'px');
                $('#'+self.options.target+' .left_list_button').css('width', w+'px');
            }
        }
    });
    Hammer( element ).on("touchend", function(event) {
        if($('#'+self.options.target+' .right_list_button').width() >= ($(document).width()/2)-5)
            self.callBack({"data":self.options.returned_data, "direction":"left"});
        if($('#'+self.options.target+' .left_list_button').width() >= ($(document).width()/2)-5)
            self.callBack({"data":self.options.returned_data, "direction":"right"});
        TweenLite.to($('#'+self.options.target), .2, {css:{'padding-left': '0px'}});
        TweenLite.to($('#'+self.options.target+' .float_right_element'), .2, {css:{'right':'0px'}});
        TweenLite.to($('#'+self.options.target+' .right_list_button'), .2, {css:{width:'0px'}});
        TweenLite.to($('#'+self.options.target+' .left_list_button'), .2, {css:{width:'0px'}});
    });
}
options_menu.prototype.destroy = function(){
    Hammer( element ).off("touchstart");
    Hammer( element ).off("touchsmove");
    Hammer( element ).off("touchsend");
}