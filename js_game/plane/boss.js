;(function(global){

	var boss = function(iObjWidth, iObjHeight, img, pos){
		var bs = function (){
			this.obj = document.createElement('span');
			this.obj.style.cssText = "display:block;width:"+iObjWidth+"px;height:"+iObjHeight+"px;background:url(img/"+img+");position:absolute;background-position:"+pos;
			this.x = parseInt(Math.random()*(doc_width));
			this.y = parseInt(Math.random()*(doc_height));
			this.obj.style.left = this.x + 'px';
			this.obj.style.top = this.y + 'px';
			$("#container").append(this.obj);
			this.lasttime = 0;
			this.bullets = [];
		}
		return bs;
	}
	
	//BOSS 一号机
	global.flyman = boss(92, 80, "boss1.jpg", "-1px -9px");
	flyman.prototype.killed = function(){//BOSS是否被杀死了
		if(this.lasttime > 600){
			this.reset();
			return true;
		}
		return false;
	}
	flyman.prototype.run = function(){
		this.lasttime++;
		//BOSS随机运动
		var offsetX = (Math.random() - 0.5 > 0 ? 1 : -1) * Math.round(Math.random()*10+5);
		var offsetY = (Math.random() - 0.5 > 0 ? 1 : -1) * Math.round(Math.random()*10+5);
		if(this.x < 100 && offsetX < 0){
			offsetX = -1 * offsetX;
		}
		else if(this.x > 500 && offsetX > 0){
			offsetX = -1 * offsetX;
		}
		else if(this.y < 100 && offsetY < 0){
			offsetY = -1 * offsetY;
		}
		else if(this.y > 500 && offsetY > 0){
			offsetY = -1 * offsetY;
		}
		this.x += offsetX;
		this.y += offsetY;
		this.obj.style.left = this.x + 'px';
		this.obj.style.top = this.y + 'px';
		
		//BOSS发射子弹
		if(this.bullets.length < 10){
			this.bullets.push(new bullet(15, true, {x:this.x, y:this.y, boss:true}));
		}
		//子弹移动或消失
		for(var i=0;i<this.bullets.length;i++){
			if(!this.bullets[i])continue;
			if(!this.bullets[i].isshow){
				$(this.bullets[i].obj).remove();
				this.bullets.splice(i, 1);
				--i;
			}
			else{
				this.bullets[i].step();
			}
		}
	}
	flyman.prototype.reset = function(){
		$(this.obj).remove();
		for(var i=0;i<this.bullets.length;i++){
			$(this.bullets[i].obj).remove();
		}
		this.bullets = [];
	}
	
	
	
	//BOSS比利
	global.bili = boss(170, 170, "monkey.jpg", "0 0");
	bili.prototype.killed = function(){//BOSS是否被杀死了
		if(this.lasttime > 1200){
			this.reset();
			return true;
		}
		return false;
	}
	bili.prototype._angle = 0;
	bili.prototype.run = function(){
		this.lasttime++;
		//BOSS随机运动
		var offsetX = (Math.random() - 0.5 > 0 ? 1 : -1) * Math.round(Math.random()*10+5);
		var offsetY = (Math.random() - 0.5 > 0 ? 1 : -1) * Math.round(Math.random()*10+5);
		if(this.x < 100 && offsetX < 0){
			offsetX = -1 * offsetX;
		}
		else if(this.x > 500 && offsetX > 0){
			offsetX = -1 * offsetX;
		}
		else if(this.y < 100 && offsetY < 0){
			offsetY = -1 * offsetY;
		}
		else if(this.y > 500 && offsetY > 0){
			offsetY = -1 * offsetY;
		}
		this.x += offsetX;
		this.y += offsetY;
		this.obj.style.left = this.x + 'px';
		this.obj.style.top = this.y + 'px';
		//BOSS发射子弹
		if(this.bullets.length < 40){
			this.bullets.push(new bullet(15, true, {x:this.x + 20, y:this.y + 50, boss:true}));//追踪
			this.bullets.push(new bullet(15, false, {x:this.x + 110, y:this.y, boss:true, angle:this._angle}));//顺时针
			this._angle += 10;
			if(this._angle >= 360){
				this._angle = 0;
			}
		}
		//子弹移动或消失
		for(var i=0;i<this.bullets.length;i++){
			if(!this.bullets[i])continue;
			if(!this.bullets[i].isshow){
				$(this.bullets[i].obj).remove();
				this.bullets.splice(i, 1);
				--i;
			}
			else{
				this.bullets[i].step();
			}
		}
	}
	bili.prototype.reset = function(){
		$(this.obj).remove();
		for(var i=0;i<this.bullets.length;i++){
			$(this.bullets[i].obj).remove();
		}
		this.bullets = [];
	}
	
})(window);