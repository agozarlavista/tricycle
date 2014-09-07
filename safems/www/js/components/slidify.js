function slidify () {
}
slidify.prototype.init = function(slidifyObj, min, max, defaultValue, limit, rounded, unity, color, callBack, pname){
	this.value = 0;
	this.callBackFunction = callBack;
	this.name = pname;
	var dragging = false;
	this.slideObj = slidifyObj;
	this.finalValue = 0;
	this.oldValue = 0;
	var contentHTML = "";
		contentHTML+= '<div id="SLIDER" class="slider" style="">';
		contentHTML+= '<a href="javascript:void(0)" class="btnAddRemove" id="btnRemove">-</a>';
		contentHTML+= '<div id="slider">';
		contentHTML+= '<canvas width="100%" height="100%" id="canValues'+slidifyObj+'"></canvas>';
		contentHTML+= '<div id="drag"></div>';
		contentHTML+= '</div>';
		contentHTML+= '<a href="javascript:void(0)" class="btnAddRemove" id="btnAdd">+</a>';
		contentHTML+= '</div>';
		
		contentHTML+= '<div class="VALUES">';
		contentHTML+= '<div class="btn-mg donate" id="value"><strong>0.00</strong> <span class="devise" >'+unity+'</span></div>';
		contentHTML+= '</div>';
	$('#'+slidifyObj).html('');
	$('#'+slidifyObj).append(contentHTML);
		
	$('#'+slidifyObj+' #drag').css('background-color', color);
		
	var sliderWidth = $('#'+slidifyObj).width() - 81;
	$('#'+slidifyObj+' #slider').css('width', sliderWidth+'px');
	var susDrag = $('#'+slidifyObj+' #drag').css('width').split('px').join('');
	
	var slideMax = sliderWidth - susDrag;
	var searchRange = defaultValue;
    var leftPosPercent = (defaultValue / limit) * 100;
    var leftPosPixel = slideMax * (leftPosPercent / 100);
	var actualX = leftPosPixel;
	
	var spacing = (slideMax) / Math.floor(max);
		
	var canvas = document.getElementById('canValues'+slidifyObj);
		canvas.width  = sliderWidth;
		canvas.height  = 42;
	var ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle="#E3E3E3";
		ctx.moveTo(susDrag/2, 20.5);
	    ctx.lineTo(Math.round(sliderWidth - (susDrag/2)) - 0.5, 20.5);
	    ctx.stroke();
		
	$('#'+slidifyObj+' #drag').css('left', actualX);
	$('#value strong').html(searchRange);
		
	$('#'+slidifyObj+' #drag').on('touchstart', function(e){
        dragging = true;
	});
	$( '#'+slidifyObj+' #btnRemove' ).bind('tap', function() {
		$( '#'+slidifyObj+' #btnRemove' ).css('background-color', color);
		$( '#'+slidifyObj+' #btnRemove' ).css('color', '#FFF');
		TweenLite.to($( '#'+slidifyObj+' #btnRemove' ), .6, {css:{backgroundColor:'#F9F9F9', color:'#333'}});
		var posLeft = (parseInt($('#'+slidifyObj+' #drag').css('left'))-spacing);
		if(posLeft < 0){
			posLeft = 0;
		}
		TweenLite.to($('#'+slidifyObj+' #drag'), .5, {css:{left:posLeft+"px"}, onUpdate:function(){
			//setValue();
		}, onComplete:function(){
			setValue();
		}});
	});
	$( '#'+slidifyObj+' #btnAdd' ).bind('tap', function() {
		$( '#'+slidifyObj+' #btnAdd' ).css('background-color', color);
		$( '#'+slidifyObj+' #btnAdd' ).css('color', '#FFF');
		TweenLite.to($( '#'+slidifyObj+' #btnAdd' ), .6, {css:{backgroundColor:'#F9F9F9', color:'#333'}});
		var posLeft = (parseInt($('#'+slidifyObj+' #drag').css('left'))+spacing);
		if(posLeft > slideMax){
			posLeft = slideMax;
		}
		TweenLite.to($('#'+slidifyObj+' #drag'), .5, {css:{left:posLeft+"px"}, onUpdate:function(){
			//setValue();
		}, onComplete:function(){
			setValue();
		}});
	});
	$('.content').on('touchend', function(){
        if (dragging){
            dragging = false;
            setValue();
        }
	});
    
    Hammer( document ).on("touchmove", function(event) {
        if (dragging){
            var wishX = event.touches[0].pageX - susDrag;
			if (wishX > -1 && wishX < slideMax)
                $('#'+slidifyObj+' #drag').css('left',  wishX);
            if (wishX < 0)
                $('#'+slidifyObj+' #drag').css('left', 0);
            if (wishX > slideMax)
                $('#'+slidifyObj+' #drag').css('left', slideMax);
        }
    })
	var setValue = function(){
		var currentX = parseInt($('#'+slidifyObj+' #drag').css('left'));
		if(rounded){
			this.finalValue = (parseInt(Math.floor(( (currentX * max) / (sliderWidth - susDrag) ))) ).toFixed(2);
		}else{
			this.finalValue =  ((currentX * max) / (sliderWidth - susDrag)).toFixed(2);
		}
		if((this.finalValue)>=Math.floor(max)){
			this.finalValue = max;
		}else if(parseInt(this.finalValue)<0){
			this.finalValue = 0.00;
		}
		if(this.oldValue != this.finalValue){
			$('#'+slidifyObj+' #value strong').html(this.finalValue);
			callBack.call(this, this.finalValue);
			this.oldValue = this.finalValue;
		}
	}
}