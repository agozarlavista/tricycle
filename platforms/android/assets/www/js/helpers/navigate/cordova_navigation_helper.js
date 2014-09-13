var navigation = {
    pageInfos : null,
    transition : null,
    router : null,
    defaultUri : null,
    navScroll : null,
    _lang : null,
    oldPage : null,
    init: function(){
        this._lang = lang[app._language];
        if($('#screen').length == 0)
            $('.app').append('<div id="screen"></div>');
        if($('#navigationLocker').length == 0)
            $('body').append('<div id="navigationLocker"></div>');
        this.setRoutes();
        this.setListeners();
    },
    setRoutes : function(){
        console.log('navigation init root');
        var ApplicationRouter = Backbone.Router.extend({
            routes: {
                  "": "loadPage",
                  "*page":"loadPage",
            },
            loadPage : function(params){
                if(!params) return false;
                if(navigation.defaultUri == null){
                    if ( device.platform == 'android' || device.platform == 'Android' )
                    {
                        navigation.defaultUri = params.replace('index.html', '');
                    }
                    else
                    {
                        var find = ' ';
                        var re = new RegExp(find, 'g');
                        params = params.replace(re, '%20');
                        navigation.defaultUri = params.replace('index.html', '');
                    }
                    return false;
                }
                var paramsArray = params.split('/');
                var param = 0;
                var infoObject = "{";
                for(var i = 0; i < paramsArray.length; i += 2){
                    infoObject+='"'+paramsArray[i]+'":"'+paramsArray[i+1]+'"';
                    if(i < paramsArray.length-2){
                        infoObject+=",";
                    }
                    param++;
                }
                infoObject+="}";
                navigation.pageInfos = JSON.parse(infoObject);
                navigation.loadPage();
            }
        });
        navigation.pageInfos = {};
        Backbone.emulateHTTP = true;
        navigation.router = new ApplicationRouter();
        Backbone.history.start({pushState:true});
        navigation.transition = 'instant';
        var startPage = 'home';
        navigation.router.navigate('page/'+startPage+'/nom/sdvds/prenom/dsvjsdnv/dskvhbsd/cdkvbds', {trigger: true, replace: true});
        console.log('navigation init root ended');
    },
    loadPage : function(){
        this.lockScreen();
        navigation.oldPage = $('#screen div').first();
        var leftPos = 0;
        var nextLeftPos = 0;
        switch(navigation.transition)
        {
            case 'swipeLeft':
                leftPos = '-100%';
                nextLeftPos = '100%';
                navigation.tweentime = .6;
                break;
            case 'swipeRight':
                leftPos = '100%';
                nextLeftPos = '-100%';
                navigation.tweentime = .6;
                break;
            case 'instant':
                leftPos = '100%';
                nextLeftPos = '-100%';
                navigation.tweentime = 0;
                break;
            default:
                leftPos = '-100%';
                nextLeftPos = '100%';
                navigation.tweentime = .6;
                break;
        }
        var pageName = navigation.pageInfos.page;
        navigation.transition = null;
        navigation.addResource(pageName, 'css');
        navigation.addResource(pageName, 'js');
        $('#screen').prepend('<div class="content" id="' + pageName + '"></div>');
        $('#' + pageName).css('left', nextLeftPos);
        if (device.platform == "firefoxos"){
            var uri = location.origin + "/" + 'content/pages/' + pageName + '.html';
        } else {
            var uri = 'file:///' + navigation.defaultUri + 'content/pages/' + pageName + '.html';
        }
        $('#' + pageName).load(uri, function(response, status, xhr) {
            if(status == 'success'){
                $('#' + pageName + ' .txtdyn').each(function(index){
                    $(this).html(navigation._($(this).data('text')));
                });
                $('#' + pageName + ' .valdyn').each(function(index){
                    $(this).attr('value', navigation._($(this).data('value')));
                });
                /*setTimeout(function(){
                    if(navigation._force_reload){
                        navigation._currentPageScript.init();
                    }
                }, 500);*/
                if(typeof navigation._currentPageScript !== 'undefined' && navigation._force_reload || pageName == "question")
                    navigation._currentPageScript.init($('#screen div').first());
                TweenLite.to($('#screen div').first(), navigation.tweentime, {css:{'left':'0'}, ease:Back.easeOut});
                TweenLite.to(navigation.oldPage, navigation.tweentime, {css:{'left':leftPos}, ease:Back.easeOut, onComplete:function(){
                    /* on set le wrapper de la page en js parce que la hauteur ne peut etre calsulée en percent */
                    if(!navigation._force_reload){
                        navigation.removeResource(navigation.oldPage.attr('id'), 'css');
                        navigation.removeResource(navigation.oldPage.attr('id'), 'js');
                    }
                    //if(navigation._force_reload){
                    //    alert('force reload');
                        
                    //}
                    navigation.oldPage.remove();
                    navigation.setPageWrapper();
                    navigation.unlockScreen();
                    //navigation._currentPageScript.init();
                }});
            }
        });
    },
    setPageWrapper : function(){
        var h = $(window).height() - $('.header').height();
        $('.wrapper').css('height', h+'px');
        /* on initialise la scroll de la page */
        this.navScroll = new IScroll('.wrapper', {
            scrollbars: false,
            //shrinkScrollbars : true,
            /*resizeScrollbars : false,*/
            /*indicators: {
                fade: false,
                ignoreBoundaries: false,
                interactive: false,
                listenX: false,
                listenY: true,
                resize: false,
                shrink: true,
                speedRatioX: 0,
                speedRatioY: 0,
            },*/
            //momentum :false,
            /*interactiveScrollbars: true,*/
            /*shrinkScrollbars: 'scale',*/
            fadeScrollbars: false
        });
    },
    addResource: function(filename, filetype) {
        if (filetype == 'js'){
			var fileref = document.createElement('script')
			fileref.setAttribute('type','text/javascript');
            if (device.platform == "firefoxos"){
                fileref.setAttribute('src', location.origin + "/" + 'js/pages/' + filename + '.js');
            }else{
                fileref.setAttribute('src', 'file:///' + navigation.defaultUri + 'js/pages/' + filename + '.js');
            }
		} else if (filetype=='css'){
			// CSS
			var fileref = document.createElement('link')
			fileref.setAttribute('rel', 'stylesheet');
			fileref.setAttribute('type', 'text/css');
            if (device.platform == "firefoxos"){
                fileref.setAttribute('href', location.origin + "/" + 'css/pages/' + filename + '.css');
            }else{
                fileref.setAttribute('href', 'file:///' + navigation.defaultUri + 'css/pages/' + filename + '.css');
            }
		}
	 	if (typeof fileref!='undefined')
  			document.getElementsByTagName('head')[0].appendChild(fileref)
	},
    removeResource: function(filename, filetype) {
		var targetelement = (filetype=='js')? 'script' : (filetype=='css')? 'link' : 'none' 
		var targetattr = (filetype=='js')? 'src' : (filetype=='css')? 'href' : 'none' 
		var allsuspects = document.getElementsByTagName(targetelement)
		for (var i=allsuspects.length; i>=0; i--){ 
			if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename+'.')!=-1){
				allsuspects[i].parentNode.removeChild(allsuspects[i]);
			}
		}
	},
    setListeners : function(){
        var self = this;
        //this.shutterNavigation = new shutter();
        //this.shutterNavigation.init();
        /*if ( device.platform == 'android' || device.platform == 'Android' )
        {
            document.addEventListener('menubutton', function(){
                //self.shutterNavigation.open();
            }, false);

            document.addEventListener("backbutton", function(){
                if(window.history.length>0){
                    navigation.transition = 'swipeRight';
                    window.history.back();
                }else{
                    navigator.app.exitApp();
                }
            }, false);
        }*/
        $(document).on('touchstart', function(e){
            var page = "";
            if($(e.target).parent().attr('data-action')){
                if($(e.target).parent().attr('data-action') == "refresh"){
                    navigation._currentPageScript.refresh();
                }
                if($(e.target).parent().attr('data-action') == "open_navigation"){
                    //navigation.shutterNavigation.open();
                }
            }
            if($(e.target).attr('data-page')){
                if($(e.target).attr('data-page') == 'backbutton'){
                    navigation.transition = 'swipeRight';
                    window.history.back();
                    return;
                }else{
                    page = $(e.target).attr('data-page');
                }
            }else{
                if(!$(e.target).parent().attr('data-page')){
                    return false;
                }else{
                    if($(e.target).parent().attr('data-page') == 'backbutton'){
                        navigation.transition = 'swipeRight';
                        window.history.back();
                        return;
                    }else{
                        page = $(e.target).parent().attr('data-page');
                    }
                }
            }
            if($(e.target).attr('data-transition')){
                navigation.transition = $(e.target).attr('data-transition');
            }else{
                if($(e.target).parent().attr('data-transition')){
                    navigation.transition = $(e.target).parent().attr('data-transition');
                }else{
                    navigation.transition = null;
                }
            }
            var pageName = page.split('/');
            if(pageName[0] == navigation.pageInfos.page)
                navigation._force_reload = true;
            else
                navigation._force_reload = false;
            
            navigation.router.navigate('page/'+page, {trigger: true, replace: false});
        });
    },
    _: function(key) {
        if (arguments.length > 1) {
			var args = Array.prototype.slice.call(arguments);
			args.shift();
			args.unshift(navigation._lang[key]);
			return String.format.apply(this, args);
		}
		return navigation._lang[key];
	},
    lockScreen : function(){
        $('#navigationLocker').css('display', 'block');
    },
    unlockScreen : function(){
        $('#navigationLocker').css('display', 'none');
    },
    goBack : function(){
        Backbone.history.start();
        Backbone.history.back();
        Backbone.history.stop();
    },
    startTransition : function(){
    
    },
    endTransition : function(){
        
    }
}