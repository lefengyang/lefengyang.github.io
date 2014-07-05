;(function(){

var dom_level = $('#choose_level');
var dom_looks = $('#choose_looks');
var dom_shop = $('#choose_shop');
var dom_measurements = $('#choose_measurements');
var dom_profile = $('#create_profile');
var dom_waiting = $('#waiting');
var dom_adviser = $('#adviser');
var dom_finish = $('#finish');

//datas
var FAVOR_SELECTION = {};

function nextSection(prevDom, nextDom, callback){
	prevDom.transition({opacity:0},function(){
		$(this).addClass('hidden');
		nextDom.css({opacity:0}).removeClass('hidden').transition({opacity:1})
		callback()
	});
}

function step_style(){
	dom_level.removeClass('hidden');
	dom_level.on('click','.select',  function(){
		var parent = $(this).parent();
		var style = parent.data('value');
		FAVOR_SELECTION['style'] = style;
		parent.transition({y:'20px'},function(){step_look(style)}).siblings().transition({opacity:0})
	});
}

var iSelCount = 0;
var _setSel = function(dom){
	iSelCount++
	dom.find('img').fadeTo(500, .2, function(){
		dom.find('.checked').data('checked','1').fadeIn().transition({y : "10px"})
	})
}
var _unSetSel = function(dom){
	iSelCount--
	dom.find('img').fadeTo(500, 1, function(){
		dom.find('.checked').data('checked','').hide()
	})
}

function step_look(style){
	iSelCount = 0;
	$('#js_look'+style).removeClass('hidden');
	nextSection(dom_level, dom_looks, function(){
		var looks = $('#js_look'+style).find('.look');
		var last = looks.last();
		var continueLayer = dom_looks.find('.fixed_button');
		looks.on('click', function(){
			var _this = $(this);
			if('1' == _this.find('.checked').data('checked')){
				_unSetSel(_this)
			}else{
				_setSel(_this)
			}
			if(last.is(_this)){
				looks.not(':last').each(function(){
					if('1' == $(this).find('.checked').data('checked')){
						_unSetSel($(this))
					}
				});
			}else{
				if('1' == last.find('.checked').data('checked')){
					_unSetSel(last)
				}
			}
			if(iSelCount>0){
				continueLayer.removeClass('hidden').slideDown()
			}else{
				continueLayer.slideUp()
			}
		});
		//下一步
		continueLayer.find('.button').click(function(){
			var val = []
			dom_looks.find('.look').each(function(){
				val.push($(this).data('value'))
			})
			FAVOR_SELECTION['look'] = val.join('|')
			step_shop()
		})
	});
}

function step_shop(){
	iSelCount = 0;
	nextSection(dom_looks, dom_shop, function(){
		var looks = dom_shop.find('.look');
		var last = looks.last();
		var continueLayer = dom_shop.find('.fixed_button');
		looks.on('click', function(){
			var _this = $(this);
			if('1' == _this.find('.checked').data('checked')){
				_unSetSel(_this)
			}else{
				_setSel(_this)
			}
			if(last.is(_this)){
				looks.not(':last').each(function(){
					if('1' == $(this).find('.checked').data('checked')){
						_unSetSel($(this))
					}
				});
			}else{
				if('1' == last.find('.checked').data('checked')){
					_unSetSel(last)
				}
			}
			if(iSelCount>0){
				continueLayer.removeClass('hidden').slideDown()
			}else{
				continueLayer.slideUp()
			}
		});
		//下一步
		continueLayer.find('.button').click(function(){
			var val = []
			dom_looks.find('.look').each(function(){
				val.push($(this).data('value'))
			})
			FAVOR_SELECTION['shop'] = val.join('|')
			step_size()
		})
	});
}

function step_size(){
	nextSection(dom_shop, dom_measurements, function(){
		var continueLayer = dom_measurements.find('.fixed_button');
		var sels = [$('#signup_context_height'), $('#signup_context_weight_in_pounds'), $('#signup_context_waist'), $('#signup_context_casual_shirt_size')];
		var _checkContinue = function(){
			if(sels[0].val() && sels[1].val() && sels[2].val() && sels[3].val()){
				continueLayer.removeClass('hidden').slideDown()
			}else{
				continueLayer.slideUp()
			}
		}
		$.each(sels, function(i, n){
			n.on('change',function(){
				_checkContinue();
			});
		});
		//下一步
		continueLayer.find('.button').click(function(){
			FAVOR_SELECTION['height'] = sels[0].val();
			FAVOR_SELECTION['weight'] = sels[1].val();
			FAVOR_SELECTION['waist']  = sels[2].val();
			FAVOR_SELECTION['shirt_size'] = sels[3].val();
			step_profile()
		})
	});
}

function step_profile(){
	nextSection(dom_measurements, dom_profile, function(){
		var continueLayer = dom_profile.find('.fixed_button');
		//参数校验
		_checkError(function(){
			continueLayer.removeClass('hidden').slideDown();
		});
		//下一步
		continueLayer.find('.button').click(function(){
			step_submit()
		})
	});
}

function step_submit(){
	nextSection(dom_profile, dom_waiting, function(){
		//todo: 提交结果,返回时尚顾问的昵称和头像
		$('.stylist_name').text('Kelly');
		$('.expert_avatar').css({'backgroundImage':"url('assets/images/stylist/kelly.jpg')"});
		setTimeout(function(){
			step_adviser()
		},3000);
	});
}

function step_adviser(){
	nextSection(dom_waiting, dom_adviser, function(){
		var continueLayer = dom_adviser.find('.fixed_button');
		continueLayer.removeClass('hidden').slideDown()
		//下一步
		continueLayer.find('.button').click(function(){
			step_finish()
		})
	});
}

function step_finish(){
	nextSection(dom_adviser, dom_finish, function(){
		//noting to do...
	});
}

function _checkError(succCallback){
	succCallback();
	//手机号码长度不得小于11位
	//密码长度不得小于6位
	///^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
	//
}

//todo debug
//step_style();
step_profile()

})();