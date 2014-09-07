var navigation = {
    pageInfos : null,
    transition : null,
    router : null,
    defaultUri : null,
    init: function(){
        this.setRoutes();
    },
    setRoutes : function(){
        console.log('navigation init root');
        var ApplicationRouter = Backbone.Router.extend({
            routes: {
                  "": "loadPage",
                  "*page":"loadPage",
            },
            loadPage : function(params){
                alert('loadpage '+params);
                if(!params) return false;
                if(navigation.defaultUri == null){
                    alert(navigation.defaultUri);
                    alert(device);
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
                }
                var paramsArray = params.split('/');
                alert(navigation.defaultUri);
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
        navigation.router.navigate('page/'+startPage+"/param1/simon/nom/delamarre", {trigger: true, replace: true});
        console.log('navigation init root ended');
    },
    loadPage : function(){
        alert(navigation.pageInfos.page);
        navigation.oldPage = $('#screen div').first();
        var leftPos = 0;
        var nextLeftPos = 0;
        switch(navigation.transition)
        {
            case 'swipeLeft':
                leftPos = '-100%';
                nextLeftPos = '100%';
                navigation.tweentime = .4;
                break;
            case 'swipeRight':
                leftPos = '100%';
                nextLeftPos = '-100%';
                navigation.tweentime = .4;
                break;
            case 'instant':
                leftPos = '100%';
                nextLeftPos = '-100%';
                navigation.tweentime = 0;
                break;
            default:
                leftPos = '-100%';
                nextLeftPos = '100%';
                navigation.tweentime = .4;
                break;
        }
        var pageName = navigation.pageInfos.page;
        navigation.transition = null;
        navigation.addResource(pageName, 'css');
        navigation.addResource(pageName, 'js');
        $('#screen').prepend('<div class="content" id="' + pageName + '"></div>');
        $('#' + pageName).css('left', nextLeftPos);
        $('#' + pageName).load(uri, function(response, status, xhr) {
            alert(status);
            if(status == 'success'){
                $('#' + pageName + ' .txtdyn').each(function(index){
                    $(this).html(app._($(this).data('text')));
                });
                $('#' + pageName + ' .valdyn').each(function(index){
                    $(this).attr('value', app._($(this).data('value')));
                });
                TweenLite.to($('#' + pageName), navigation.tweentime, {css:{'left':'0'}, ease:Power4.easeOut, delay:.5});
                TweenLite.to($('#' + navigation.oldPage.attr('id')), navigation.tweentime, {css:{'left':leftPos}, ease:Power4.easeOut, delay:.5, onComplete:function(){
                    navigation.removeResource(navigation.oldPage.attr('id'), 'css');
                    navigation.removeResource(navigation.oldPage.attr('id'), 'js');
                    $('#' + navigation.oldPage.attr('id')).remove();
                    //caw_ui.setWrapper();
                    //caw_ui.unLockScreen();
                }});
            }
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
navigation.init();