function diaporama (target, name, height, unity, displayNavigation, autoSwipe, swipeDelay, endCallBack) {
    this.target = target;
    this._current = 0;
    this._action = true;
    this._name = name;
    this._idName = target.attr('id');
    this._count = this.target.find('li').length;
    this._delay = swipeDelay;
    this._autoSwipe = autoSwipe;
    this.delayMotion = null;
    this._endCallBack = endCallBack;
    this.target.find('.diaporama').css('height', height + unity);
    
    if(displayNavigation == false){
        this.target.find('.diaporama_navigation').css('display', 'none');
    }
    if(this._count == 1){
        this.target.find('.diaporama_navigation').css('display', 'none');    
    }
}
diaporama.prototype.init = function(){
    this.target.find('li').first().addClass('active');
    this.target.find('.slide').css('transform', 'translateZ(0)');
    this.target.find('.slide').css('width', this.target.find('.content_screens').width()+"px");
    this.target.find('.content_screens').css('width', (this._count * 100) + '%');
    var self = this;
    /* add events */
    var startX = 0;
    var endX = 0;
    var startY = 0;
    var endY = 0;
    var currentX = this._current * $(document).width(); 
    this.target.find('li').bind('tap', function(e){
        if(self._action)
            self.slide($(this).attr('data-slide'));
    });
    Hammer( document.getElementById(self._idName) ).on("touchstart", function(event) {
        event.preventDefault();
        currentX = -(self._current * $(document).width());
        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;
        if(startX < 50){
            return false;
        }
        if(self.delayMotion != null){
            self.delayMotion.pause();
        }
    });
    Hammer( document.getElementById(self._idName) ).on("touchmove", function(event) {
        endX = event.touches[0].pageX;
        endY = event.touches[0].pageY;
        if(startX < 50){
            return false;
        }
        if(Math.abs(startX-endX) < Math.abs(startY-endY)){
            return false;
        }
        if(Math.abs(startY-endY) > 25){
            self.slide(self._current);
            return false;
        }
        self.target.find('.content_screens').css('left', (currentX-(startX-endX))+'px');
        event.preventDefault();
    });
    Hammer( document.getElementById(self._idName) ).on("touchend", function(event) {
        if(startX < 50){
            return false;
        }
        if(Math.abs(startX-endX) < Math.abs(startY-endY)){
            self.slide(self._current);
            return false;
        }
        if(Math.abs(startY-endY) > 25){
            self.slide(self._current);
            return false;
        }
        if(Math.abs(startX-endX) > $(document).width()/4){
            if(startX-endX < 0){
                self.slide(self._current-1);
            }else{
                self.slide(self._current+1);
            }
        }else{
            self.slide(self._current);
        }
    });
    
    if(this._autoSwipe == true){
        self.target.find('.diaporama').append('<div class="progress_bar orange" id="progress_bar"></div>');
        self.startRotation();
    }
}
diaporama.prototype.startRotation = function(){
    var self = this;
    self.waitCompt = {value:0};
    self.delayMotion = TweenLite.to(self.waitCompt, self._delay, {value:100, 
    onUpdate : function(){
        self.target.find('.progress_bar').css('width', self.waitCompt.value+'%');
    },
    onComplete:function(){
        var showId = self._current+1;
        if(showId > (self._count - 1)){
            showId=0;
        }
        self.slide(showId);
        //self.startRotation();
    }, ease:Power4.easeIn});
}
diaporama.prototype.slide = function(id){
    var self = this;
    if(self.delayMotion != null){
        self.delayMotion.pause();
    }
    if(id < 0){
        id=0;
    }
    self._endCallBack(id);
    if(id > (this._count - 1)){
        id=(this._count - 1);
    }
    this._action = false;
    this.target.find('#diapo_'+this._current).removeClass('active');
    this.target.find('#diapo_'+id).addClass('active');
    TweenLite.to(this.target.find('.content_screens'), .2, {css:{'left': (-(id * 100)) + "%"}, ease:Power4.easeOut, onComplete:function(){
        setTimeout(function(){
            self.target.find('.content_screens').css('left', (-(id * 100)) + "%");
            self._action = true;
            if(self.delayMotion != null){
                self.delayMotion.restart();
            }
        }, 300);
    }});
    this._current = id;
}
diaporama.prototype.destroy = function(id){
    var self = this;
    self.delayMotion.pause();
    TweenLite.killTweensOf(self.delayMotion);
    this.delayMotion = null;
}
diaporama.prototype.bind = function (scope) {
    var fn = this;
    return function () {
        return fn.apply(scope);
    };
}
