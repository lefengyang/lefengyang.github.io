//子弹类
;(function(global){

	global.iMonsterWidth = 48;
	global.iBulletWidth = 16;
	
	var specialItemFactory = function(iHidetime, iObjWidth, iObjHeight, img, pos, callback){
		var spec = function (){
			this.obj = document.createElement('span');
			this.obj.style.cssText = "display:block;width:"+iObjWidth+"px;height:"+iObjHeight+"px;background:url(img/"+img+");position:absolute;background-position:"+pos;
			this.x = parseInt(Math.random()*(doc_width));
			this.y = parseInt(Math.random()*(doc_height));
			this.obj.style.left = this.x + 'px';
			this.obj.style.top = this.y + 'px';
			$("#container").append(this.obj);
			this.hidetime = iHidetime;//x帧内消失
			this.isshow = true;
		}
		spec.prototype.check = function(){
			var _this = this;
			//是否被怪物吃掉了
			this.checkHit(iObjWidth, iObjHeight, function(){
				_this.obj.style.display = 'none';
				_this.isshow = false;
				if(callback)callback();
			});
			//是否够时间消失了
			if(this.hidetime--<=0){
				_this.obj.style.display = 'none';
				_this.isshow = false;
			}
		}
		//击中判定
		spec.prototype.checkHit = function(iWidth, iHeight, callback){
			var position = monster.position();
			if(this.x + iWidth > position.left && this.x < position.left + iMonsterWidth && this.y + iHeight > position.top && this.y < position.top + iMonsterWidth){
				if(callback)callback();
			}
		}
		return spec;
	}
	
	//宝石
	var jewelY = specialItemFactory(150, 16, 26, "bullet.jpg", "-104px -3px", function(){score+=3;});
	var jewelG = specialItemFactory(150, 16, 26, "bullet.jpg", "-72px -3px", function(){score+=8;});
	var jewelB = specialItemFactory(150, 16, 26, "bullet.jpg", "-40px -3px", function(){score+=12;});
	var jewelR = specialItemFactory(150, 16, 26, "bullet.jpg", "-8px -3px", function(){score+=30;});
	global.jewel = function(){
		return [jewelY, jewelG, jewelB, jewelR][Math.round(Math.random()*3)];
	}
	
	//炸弹
	global.bomb = specialItemFactory(100, 32, 32, "spec.jpg", "-64px -96px", function(){
			//清除屏幕的炸弹
			for(var i=0,len=bulletbuf.length;i<len;i++){
				$(bulletbuf[i].obj).remove();
			}
			bulletbuf = [];
			wait = 30;
			score+=100;
		});
	//加命
	global.recover = specialItemFactory(80, 22, 26, "spec.jpg", "-5px -3px", function(){
			restLife++;
			$('#life_area').append($('#life').clone().css('display', 'inline-block'));
		});

	function bullet(iStep, iIsTrack, option){
		var settings = $.extend({} , option || {});
		this.obj = document.createElement('span');
		if(settings['boss']){//追踪弹
			this.obj.style.cssText = "display:block;width:"+iBulletWidth+"px;height:"+iBulletWidth+"px;background:url(img/bullet.jpg);position:absolute;background-position:-104 -40";
		}
		else if(iStep>=12){//高速弹
			this.obj.style.cssText = "display:block;width:"+iBulletWidth+"px;height:"+iBulletWidth+"px;background:url(img/bullet.jpg);position:absolute;background-position:-40 -40";
		}
		else if(iIsTrack){//追踪弹
			this.obj.style.cssText = "display:block;width:"+iBulletWidth+"px;height:"+iBulletWidth+"px;background:url(img/bullet.jpg);position:absolute;background-position:-72 -40";
		}
		else{//普通弹
			this.obj.style.cssText = "display:block;width:"+iBulletWidth+"px;height:"+iBulletWidth+"px;background:url(img/bullet.jpg);position:absolute;background-position:-8 -40";
		}
		$("#container").append(this.obj);
		var direction = parseInt(Math.random()*4)%4;//0上 1右 2下 3左
		if(!settings['x']&&!settings['y']){
			//随机得出出现位置和初始角度
			switch(direction){
				case 0:
					this.x = parseInt(Math.random()*(doc_width));
					this.y = 0;
					this.angle = 180 + parseInt(Math.random()*180);
					break;
				case 1:
					this.x = doc_width;
					this.y = parseInt(Math.random()*(doc_height));
					this.angle = 270 + parseInt(Math.random()*180);
					if(this.angle > 360){
						this.angle = this.angle - 360;
					}
					break;
				case 2:
					this.x = parseInt(Math.random()*(doc_width));
					this.y = doc_height;
					this.angle = parseInt(Math.random()*180);
					break;
				case 3:
					this.x = 0;
					this.y = parseInt(Math.random()*(doc_height));
					this.angle = 90 + parseInt(Math.random()*180);
					break;
			}
		}
		else{
			this.x = settings['x'];
			this.y = settings['y'];
		}
		if(settings['angle']){
			this.angle = settings['angle'];
		}
		else if(iIsTrack){
			var position = monster.position();
			var x = position.left - this.x;
			var y = position.top - this.y;
			if(x<0&&y<0){
				this.angle = Math.round(Math.atan(y/x) / Math.PI * 180);
			}
			else if(x>=0&&y<0){
				this.angle = 180 - Math.round(Math.atan(-1*y/x) / Math.PI * 180);
			}
			else if(x>=0&&y>=0){
				this.angle = 180 + Math.round(Math.atan(y/x) / Math.PI * 180);
			}
			else{
				this.angle = 360 - Math.round(Math.atan(-1*y/x) / Math.PI * 180);
			}
		}
		this.isshow = true;
		this.iStep = iStep;
		this.obj.style.left = this.x + 'px';
		this.obj.style.top = this.y + 'px';
	}

	bullet.prototype.step = function(){
		if(this.angle <= 90){
			var x = -1 * Math.cos(2 * Math.PI / 360 * this.angle) * this.iStep;
			var y = -1 * Math.sin(2 * Math.PI / 360 * this.angle) * this.iStep;
		}
		else if(this.angle <= 180){
			var x = Math.cos(2 * Math.PI / 360 * (180 - this.angle)) * this.iStep;
			var y = -1 * Math.sin(2 * Math.PI / 360 * (180 - this.angle)) * this.iStep;
		}
		else if(this.angle <= 270){
			var x = Math.cos(2 * Math.PI / 360 * (this.angle - 180)) * this.iStep;
			var y = Math.sin(2 * Math.PI / 360 * (this.angle - 180)) * this.iStep;
		}
		else if(this.angle <= 360){
			var x = -1 * Math.cos(2 * Math.PI / 360 * (this.angle - 270)) * this.iStep;
			var y = Math.sin(2 * Math.PI / 360 * (this.angle - 270)) * this.iStep;
		}
		if(this.x + x < -30 || this.x + x > doc_width + 30 || this.y + y < -30 || this.y + y > doc_height + 30){
			this.isshow = false;
			this.obj.style.display = 'none';
		}
		else{
			this.x += x;
			this.y += y;
			this.obj.style.left = this.x + 'px';
			this.obj.style.top = this.y + 'px';
			
			//击中判定
			this.checkHit(iBulletWidth, iBulletWidth, hit);
		}
	}
	
	//击中判定
	bullet.prototype.checkHit = function(iBulletWidth, iBulletHeight, callback){
		var position = monster.position();
		if(this.x > position.left && this.x + iBulletWidth < position.left + iMonsterWidth && this.y > position.top && this.y + iBulletHeight < position.top + iMonsterWidth){
			if(callback)callback();
		}
	}

	global.bullet = bullet;
})(window);