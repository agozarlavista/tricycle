function shutter () {
    this._sliding = false;  
    this._width = ($(document).width() * 80)/100;
    this._X=0;
    this._lastPosX=0;
    this._slideInterval = null;
    this._isOpen = false;
}
shutter.prototype.init = function(){
    var thisObj = this;
	Hammer( document ).on("touchstart", function(event) {
        if(utilities.getLocalStorage('user') == '')
            return false;
        if(typeof utilities.getLocalStorage('user').state == "undefined" || utilities.getLocalStorage('user').state != "valid")
            return false;
    
        if(event.touches[0].pageX < 10 && event.touches[0].pageY > 50){
            caw_ui.myScroll.disable();
            TweenLite.to($('.shutterNavigation'), .1, {css:{width:'35px'}, ease:Power4.easeOut});
            TweenLite.to($('.app'), .1, {css:{left:'35px'}, ease:Power4.easeOut}); 
            TweenLite.to($('.lock'), .1, {css:{left:'35px'}, ease:Power4.easeOut}); 
            $('.lock').css('display', 'block');
            thisObj._sliding = true;
            //thisObj.openInterval();
        }
        if(thisObj._isOpen == true && event.touches[0].pageX >= thisObj._width){
            thisObj._sliding = true;
        }
    });
    Hammer( document ).on("touchmove", function(event) {
        if(thisObj._sliding == true){
            //clearInterval(caw_ui.pullInterval);
            thisObj._lastPosX = event.touches[0].pageX;
            if(event.touches[0].pageX < thisObj._width){
                var moveX = event.touches[0].pageX;
                if(moveX<35)
                    moveX = 35;
                $('.shutterNavigation').css('width', moveX+'px');
                $('.app').css('left', moveX+'px');
                $('.lock').css('left', moveX+'px');
            }
        }
        event.preventDefault();
    });
    Hammer( document ).on("touchend", function(event) {
        caw_ui.myScroll.enable();
        clearInterval(thisObj._slideInterval);
        //alert('end '+thisObj._lastPosX+ ' this._sliding = ' +thisObj._sliding);
        if(thisObj._sliding == true){
            thisObj._sliding = false;
            if(thisObj._lastPosX > thisObj._width/2){
                thisObj.open();
            }else{
                thisObj.close();
            }
        }
    });
}
shutter.prototype.refresh = function(){
    $('#open_CGU').on('tap', function(){
        utilities.openBrowser(function(e){
        }, {
                url:"http://www.clicandwalk.com/redirect/mention/locale/" + app._locale + "/lang/" + app._language + "?utm_source=iosregister&utm_medium=app&utm_campaign=terms"
        });
    });
    $('#log_out').on('tap', function(){
        console.log('hitted');
        app.reset();
    });
    $('#note_the_app').on('tap', function(){
        if ( device.platform == 'android' || device.platform == 'Android' ){
            window.open('market://details?id=com.clicandwalk.walkers', target='_blank');
        }else{
            window.open('itms-apps://itunes.apple.com/'+app._language+'/app/clic-and-walk/id511337816', target='_blank');
        }
    });
    $('#walker_profile_page .avatar').css('background-image', 'url('+caw_ui.getAvatarUri(utilities.getLocalStorage('user').avatar)+')');
    /*$('#walker_profile_page').on('tap', function(){
        navigation.transition = "instant";
        navigation.router.navigate('page/walkerpage/walkerpage/'+utilities.getLocalStorage('user').id, {trigger: true, replace: false});
    });*/
    $('#user_page_pseudo').html(utilities.getLocalStorage('user').pseudo);
}

shutter.prototype.openInterval = function(){
    var thisObj = this;
    thisObj._slideInterval = setInterval(function(){
        if(thisObj._sliding == true){
            clearInterval(caw_ui.pullInterval);
            thisObj._lastPosX = event.touches[0].pageX;
            if(event.touches[0].pageX < thisObj._width){
                var moveX = event.touches[0].pageX;
                if(moveX<35)
                    moveX = 35;
                $('.shutterNavigation').css('width', moveX+'px');
                $('.app').css('left', moveX+'px');
                $('.lock').css('left', moveX+'px');
            }
        }
    },30);
}
shutter.prototype.open = function(){
    if(utilities.getLocalStorage('user') == '')
        return false;
    if(typeof utilities.getLocalStorage('user').state == "undefined" || utilities.getLocalStorage('user').state != "valid")
        return false;
    
    utilities.saveLocalStorage('shutteradvice', 'showed');
    
    //navigation.shutterScroll.enable();
    //navigation.shutterScroll.refresh();
    this._sliding = false;
    this._isOpen = true;
	$('.lock').css('display', 'block');
    TweenLite.to($('.shutterNavigation'), .5, {css:{width:this._width+'px'}, ease:Power4.easeOut}); 
    TweenLite.to($('.lock'), .5, {css:{backgroundColor:'rgba(0,0,0,.1)'}}); 
    TweenLite.to($('.app'), .5, {css:{left:this._width+'px'}, ease:Power4.easeOut}); 
    TweenLite.to($('.lock'), .5, {css:{left:this._width+'px'}, ease:Power4.easeOut}); 
    navigation.shutterScroll.refresh();
}
shutter.prototype.close = function(){
    //navigation.shutterScroll.disable();
    this._sliding = false;
    this._isOpen = false;
    $('.lock').css('display', 'none');
    TweenLite.to($('.shutterNavigation'), .5, {css:{width:'0px'}, ease:Power4.easeOut}); 
    TweenLite.to($('.lock'), .5, {css:{backgroundColor:'rgba(0,0,0,0)'}}); 
    TweenLite.to($('.app'), .5, {css:{left:'0px'}, ease:Power4.easeOut}); 
    TweenLite.to($('.lock'), .5, {css:{left:'0px'}, ease:Power4.easeOut}); 
}