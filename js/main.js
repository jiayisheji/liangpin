$(function(){
	//banner
	(function(){
		var winW = $(window).width();
		var $banner = $('#j-banner');
		var oUl = $banner.find('ul');
		var li = oUl.find('li');
		var num = 0;
		var now = 0;
		var timer = null;
		li.each(function(index, el) {
			$(el).css('width',winW);
		});
		oUl.append(li.first().clone(true));
		oUl.width((li.size()+1)*winW);
		var sLi = '<ol>';
		for (var i = 0; i < li.size(); i++) {
			sLi+='<li class="'+(i==0?'current':'')+'"></li>'
		};
		sLi += '</ol>';
		$banner.append(sLi);
		var aLi = $banner.find('ol').find('li');
		$banner.find('ol').css('marginLeft',-35*aLi.size()/2)
		aLi.on('click',function(){
			num = now = $(this).index();
			fnMove()
		})
		function fnMove(){
			aLi.eq(num).attr('class', 'current').siblings().attr('class','');
			oUl.stop().animate({left:-now*winW}, 500)
		}
		function fnAuto(){
			if(num == 0){
				now = 0;
				oUl.css('left',0);
			}
			if(num == aLi.size()-1){
				num = 0;
			}else{
				num++;
			}
			now++;
			fnMove()
		}
		timer = setInterval(fnAuto, 5000);
		$banner.hover(function() {
			clearInterval(timer);
		}, function() {
			clearInterval(timer);
			timer = setInterval(fnAuto, 5000);
		});
	})();
	//公告
	(function(){
		var $notice = $('#j-notice');
		var $ul = $notice.find('.list').find('ul');
		var aLi = $ul.find('li');
		var aLiH = aLi.height();
		if(aLi.size() < 2){
			return;
		}
		function play(){
			$ul.css('top', 0);
			$ul.stop().animate({top: -aLiH},500,function(){
				for(var i=0;i<1;i++){
	                $ul.append($ul.find("li:first"));
	            }
				$ul.css('top', 0);
			});
		}
		timer = setInterval(play, 5000)
		$notice.hover(function() {
			clearInterval(timer);
		}, function() {
			clearInterval(timer);
			timer = setInterval(play, 5000)
		});
	})();
	//免费电话
	(function(){
		//freeTel($('#freetel-Text'),$('#freetel-btn'))
		$('#freetel-form').submit(function(event) {
			if(freeTel($('#freetel-text'))){
				alert('请保持电话畅通，稍后给您回电话');
				return true;
			}else{
				return false;
			}
		});
		$('#contfree-form').submit(function(event) {
			if(freeTel($('#contfree-text'))){
				alert('请保持电话畅通，稍后给您回电话');
				return true;
			}else{
				return false;
			}
		});
		function freeTel(value){
			resetplaceholder(value)
			var  val = value.val();
			if(isMobile(val) || isTel(val)){
				return true;
			}else{
				alert('请输入正确手机号码或电话号码');
				return false;
			}
		}
		$('#contfree-form').submit(function(event) {
			if(freeTel($('#contfree-text'))){
				alert('请保持电话畅通，稍后给您回电话');
				return true;
			}else{
				return false;
			}
		});
		$('#contget-form').submit(function(event) {
			if(fromapply()){
				alert('请保持电话畅通，稍后给您回电话')
				return true;
			}else{
				return false;
			}
		});
		var $contapplyText = $('#contapply-text');
		var $contapplyName = $('#contapply-name');
		resetplaceholder($contapplyText)
		resetplaceholder($contapplyName)
		function fromapply(){
			var  val = $contapplyText.val();
			var  val2 = $contapplyName.val();
			if(!isNmae(val2)){
				alert('请输入姓名，方便与您联系')
				return false;
			}
			if(isMobile(val) || isTel(val)){
				return true;
			}else{
				alert('请输入正确手机号码或电话号码');
				return false;
			}
			return true;
		}
	})();
	//二维码显示
	(function(){
		$('#erweima').hover(function(){
			$('#erwei').show();
		},function(){
			$('#erwei').hide();
		})
	})();
	//回到顶部
	(function(){
		var winH = $(window).height();
		var $fixed = $('#j-fixed');
		var aLi = $fixed.find('li');
		var $goto = $fixed.find('.goto');
		var top = $fixed.offset().top;
			function fixed(){
				$fixed.css('top', top+ $(document).scrollTop())
			}
		$goto.hide();
		$goto.on('click',function(){
			$('html,body').animate({scrollTop: 0}, 500)
		})
		$(window).on('scroll',function(){
			if($(this).scrollTop() > winH){
				$goto.fadeIn(500)
			}else{
				$goto.fadeOut(500)
			}
			if($fixed.css('position') === 'absolute'){fixed()}
			
		})
		if((winH - 1120)/2 > 150){
			$fixed.css('right', 110);
		}else{
			$fixed.css('right', 0);
		}
		aLi.hover(function(){
			$(this).attr('class', 'hover');
		},function(){
			$(this).attr('class', '');
		})
	})();
	//无缝滚动
	(function(){
		//友情链接
		rollMove($('#j-links'));
	})();
});

// 检测浏览器是否支持css3新属性，来给低版本浏览器做优雅降级；
function testCss3(c){var p=['webkit','Moz','ms','o'],i,a=[],s=document.documentElement.style,t=function(r){return r.replace(/-(\w)/g,function($0,$1){return $1.toUpperCase()})};for(i in p){a.push(t(p[i]+'-'+c));a.push(t(c))}for(i in a){if(a[i]in s){return true}}return false};
// 检测浏览器是否支持css3新属性，来给低版本浏览器做优雅降级；
function resetplaceholder(element){
	var $element = $(element), placeholder = $element.attr('placeholder');
	var arr = ['input','textarea'];
	var off = false;
	  off = (!('placeholder' in document.createElement('input')));
	 off = (!('placeholder' in document.createElement('textarea')));
	if (placeholder && off) {
		
	    // 文本框ID
	    var elementId = $element.attr('id');
	    if (!elementId) {
	        var now = new Date();
	        elementId = 'lbl_placeholder' + now.getSeconds() + now.getMilliseconds();
	        $element.attr('id', elementId);
	    }
	    // 添加label标签，用于显示placeholder的值
	    var $label = $('<label>', {
	        html: $element.val() ? '' : placeholder,
	        'for': elementId
	    }).insertAfter($element).attr('class', 'label-placeholder');

	    // 绑定事件
	    var _resetPlaceholder = function () {
	        if ($element.val()) { $label.html(null); }
	        else {
	            $label.html(placeholder);
	            $element.attr('placeholder','');
	        }
	    }
	    $label.on('click',function(){
	    	$element.focus();
	    })
	    $element.on('focus blur input keyup propertychange resetplaceholder', _resetPlaceholder);
	}
}
//判断手机号码和电话号码
function isMobile(str){  
  return (/^(?:13\d|15[89]|18\d)-?\d{5}(\d{3}|\*{3})$/.test(str));  
} 
function isTel(str){
   return (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(str));
}
function isNmae(str){
   return (/^([a-zA-Z0-9]|[\u4e00-\u9fa5]|[._]){2,30}$/.test(str));
}
//无缝滚动
function rollMove(obj){
	var $roll = obj;
	var $prev = $roll.find('.prev');
	var $next = $roll.find('.next');
	var $ul = $roll.find('ul');
	var aLi = $ul.find('li');
	var aLiW = aLi.eq(0).outerWidth();
	var iNum = 0;
	var bOff = true;
	var timer = null;
	$ul.width(aLi.size()*2*aLiW)
	if(aLi.size() < 2){
		return;
	}else if(aLi.size() < 6){
		$ul.append($ul.children().clone())
		$ul.width(aLi.size()*2*aLiW)
	}
	$prev.on('click',function(){
		prev()
		bOff = true;
	})
	$next.on('click',function(){
		next()
		bOff = false;
	})
	function prev(){
		var first = $ul.find('li:first')
		$ul.append(first.clone()).stop().animate({
			left: -aLiW},
			500, function(){
			first.remove();
			$ul.css('left',0);
		});
	}
	function next(){
		var last = $ul.find('li:last')
		$ul.prepend(last.clone()).css('left',-aLiW).stop().animate({
			left: 0},
			500, function() {
			last.remove();
		});
	}
	function fnAuto(){
		if(bOff){
			prev()
		}else{
			next()
		}
	}
	timer = setInterval(fnAuto,3000);
	$roll.hover(function() {
		clearInterval(timer);
	}, function() {
		clearInterval(timer);
		timer = setInterval(fnAuto,3000);
	});
}