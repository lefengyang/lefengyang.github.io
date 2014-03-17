;(function(global){

	var _iSpeed = 0;
	var _iTrack = false;
	global.curStage = 1;//目前的关卡
	
	function _random(iMin, iMax){
		return Math.round(Math.random()*(iMax-iMin)+iMin);
	}

	//控制子弹速度和追踪
	function getStage(totalBullet){
		//==============第一关===============
		if(1 == global.curStage){
			if(totalBullet == 1){
				$('#container').css('backgroundImage', 'url(img/sky.jpg)');
			}else if(totalBullet == 350){
				$('#container').css('backgroundImage', 'url(img/hell.jpg)');
			}
				
			if(totalBullet < 80){//随机弹
				_iSpeed = _random(4,12);
			}
			else if(totalBullet == 80){//高速弹
				wait = 100;
				$('#notice').show().html('前方高能反应！').fadeOut(2000);
				_iSpeed = _random(14,18);
			}
			else if(totalBullet == 150){//密集
				wait = 100;
				$('#notice').show().html('前方高能反应！').fadeOut(2000);
				_iSpeed = _random(4,12);
				iMaxBullet = 50;
			}
			else if(totalBullet == 250){
				_iSpeed = _random(4,12);
				iMaxBullet = 20;//恢复
				_iTrack = true;
			}
			else if(totalBullet == 300){
				_iTrack = Math.round(Math.random()*5)%2==1;
				_iSpeed = _random(4,12);
			}
			else if(totalBullet == 350){
				wait = 100;
				$('#notice').show().html('前方高能反应！').fadeOut(2000);
			}
			else if(totalBullet == 360){
				iMaxBullet = 30;
				global.boss = new flyman();
			}
			else if(totalBullet>350){
				_iSpeed = _random(4,10);
				_iTrack = false;
			}
			
			if(global.boss && global.boss.killed()){
				global.curStage++;
				global.boss.reset();
				global.boss = null;
				clear();
				$('#notice').show().html('==第二关==').fadeOut(2000);
			}
		}
		else if(2 == global.curStage){
			
			if(totalBullet == 1){
				$('#container').css('backgroundImage', 'url(img/xionggui.jpg)');
				iMaxBullet = 20;
				global.boss = new bili();
			}
			
			_iSpeed = _random(4,10);
			_iTrack = false;
			
			if(global.boss && global.boss.killed()){
				global.curStage++;
				global.boss.reset();
				global.boss = null;
				clear();
				$('#notice').show().html('==第三关==')
			}
		}
		else if(3 == global.curStage){
			$('#notice').show().html('第三关制作中，敬请等待');
			game_over = true;
			global.curStage = 1;
		}
		
		//==============第二关===============
		
		return {
			iStep : _iSpeed,
			iTrack : _iTrack
		}
	}

	global.getStage = getStage;

})(window);