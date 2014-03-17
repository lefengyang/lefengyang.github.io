;(function(global){

	var fps = 30;//几毫秒运行一次，游戏帧数=1000/fps
	var invincible = 0;//无敌状态
	var _score = 0;
	global.boss = null;
	
	function _specItemRun(buf, classObj, iMaxItem, cond){
		//生成炸弹
		if(cond){
			if(cond()){
				if(buf.length < iMaxItem){
					buf.push(new classObj());
				}
			}
		}
		else{
			if(buf.length < iMaxItem){
				buf.push(new classObj());
			}
		}
		//吃到炸弹
		for(var i=0;i<buf.length;i++){
			if(!buf[i])continue;
			if(!buf[i].isshow){
				$(buf[i].obj).remove();
				buf.splice(i, 1);
				--i;
			}
			else{
				buf[i].check();
			}
		}
	}

	//游戏主循环
	function worker(){
		setInterval(function(){
			if(game_over || !running)return;
			//怪物移动
			for(var keycode in keybuf){
				if(keybuf[keycode]){
					spriteMonster(parseInt(keycode));
				}
			}
			//=======================================================
			//如果设置了等待时间，则等待时间内不会生成子弹
			if(global.wait>0){
				global.wait--;
			}
			else{
				//生成子弹
				if(bulletbuf.length < iMaxBullet){
					totalBullet++;
					var property = getStage(totalBullet);
					var b = new bullet(property.iStep, property.iTrack);
					bulletbuf.push(b);
				}
			}
			//子弹移动或消失
			for(var i=0;i<bulletbuf.length;i++){
				if(!bulletbuf[i])continue;
				if(!bulletbuf[i].isshow){
					$(bulletbuf[i].obj).remove();
					bulletbuf.splice(i, 1);
					--i;
				}
				else{
					bulletbuf[i].step();
				}
			}
			//=======================================================
			//炸弹
			_specItemRun(bombbuf, bomb, 1, function(){
				return parseInt(Math.random()*80) == 1;
			});
			//=======================================================
			//宝石
			_specItemRun(jewelbuf, jewel(), iMaxJewel);
			//=======================================================
			//加命
			_specItemRun(recoverbuf, recover, 1, function(){
				return parseInt(Math.random()*100) == 1;
			});
			//=======================================================
			//boss
			if(global.boss){
				if(!global.boss.killed()){
					global.boss.run();
				}
			}
			//=======================================================
			//无敌状态
			if(invincible>0){
				invincible--;
				//怪物闪烁
				if(invincible%2){
					monster.hide();
				}
				else{
					monster.show();
				}
			}
			if(_score != score){
				_score = score;
				$('#score').html(score);
			}
		}, fps);
	}

	//被击中
	function hit(){
		if(invincible > 0){//无敌状态，不会被攻击
		}
		else{
			$('#life_area span:last').remove();
			if(--restLife > 0){
				invincible = 50;//需要处于无敌状态一段时间
			}
			else{
				gameover();
			}
		}
	}

	//游戏结束
	function gameover(){
		$('#notice').show().html('GAME OVER<br>请按ENTER键重玩');
		game_over = true;
	}
	
	function clear(){
		//清空屏幕的子弹
		for(var i=0,len=bulletbuf.length;i<len;i++){
			$(bulletbuf[i].obj).remove();
		}
		bulletbuf = [];
		game_over = false;
		totalBullet = 0;
		$('#container').css('backgroundImage', 'none');
		global.wait = 50;
	}

	function _init(){
		//提示框位置
		$('#notice')
			.css('top', Math.round((doc_height - $('#notice').height()) / 2) + 'px')
			.css('left', Math.round((doc_width - $('#notice').width()) / 2) + 'px');

		//时间和分数
		$('#score,#time').html(0);
		setInterval(function(){
			if(!game_over && running){
				$('#time').html(++expire_time+"秒");
				score++;
			}
		}, 1000);

		//重启游戏
		$(document).keydown(function(evt){
			if(13 == evt.keyCode){//回车重新开始
				clear();
				iTop = parseInt(doc_height / 2 + 60);
				iLeft = parseInt(doc_width / 2);
				monster
					.css('top', iTop + 'px')
					.css('left',iLeft + 'px')
					.show();
				expire_time = 0;
				score = 0;
				//在右侧画出自机生命
				var lifeObj = $('#life');
				var num = initLife - $('#life_area').children().length;
				if(num > 0){
					for(var i=0;i<num;i++){
						$('#life_area').append(lifeObj.clone().css('display', 'inline-block'));
					}
				}
				restLife = initLife;
				$('#notice').show().html('开始').fadeOut(1000);
			}
			else if(32 == evt.keyCode){//空格暂停
				if(global.running){
					global.running = false;
					$('#notice').show().html('游戏暂停');
				}
				else{
					global.running = true;
					$('#notice').hide();
				}
			}
			else{
				//console.log(evt.keyCode);
			}
			return false;//如果不阻止默认事件，按下上方向时，会导致页面上下滚动
		});

		$('#notice').show().html('按ENTER键开始，空格键暂停');
	}

	global.gameover = gameover;
	global.init_ctrl = _init;
	global.worker = worker;
	global.hit = hit;
	global.clear = clear;

})(window);