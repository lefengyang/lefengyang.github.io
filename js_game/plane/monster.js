;(function(global){

	var KEY = {
		UP : 38,
		RIGHT : 39,
		DOWN : 40,
		LEFT : 37,
		SHIFT : 16,
		W : 87,
		D : 68,
		S : 83,
		A : 65
	};

	var iTotalFrame = 4;
	var iCurFrame = 0;
	var iMonsterStepNormal = 12;//正常速度
	var iMonsterStepSlow = 5;//低速度
	var iMonsterStepCur = iMonsterStepNormal;//目前速度

	global.iLeft = 0;
	global.iTop = 0;

	//怪物运动
	var spriteMonster = function(keyCode){
		switch(keyCode){
			case KEY.UP:
			case KEY.W:
				showMonsterFrame(3);
				if(iTop>0){
					iTop -= iMonsterStepCur;
					monster.css('top', iTop+'px');
				}
				break;
				
			case KEY.RIGHT:
			case KEY.D:
				showMonsterFrame(2);
				if(iLeft + iMonsterWidth < doc_width){
					iLeft += iMonsterStepCur;
					monster.css('left', iLeft+'px');
				}
				break;
				
			case KEY.DOWN:
			case KEY.S:
				showMonsterFrame(0);
				if(iTop + iMonsterWidth < doc_height){
					iTop += iMonsterStepCur;
					monster.css('top', iTop+'px');
				}
				break;
				
			case KEY.LEFT:
			case KEY.A:
				showMonsterFrame(1);
				if(iLeft>0){
					iLeft -= iMonsterStepCur;
					monster.css('left', iLeft+'px');
				}
				break;
		}
	};

	var showMonsterFrame = function(row){
		monster.css('backgroundPosition', (-1*iMonsterWidth*parseInt(iCurFrame++))+' '+(-1*iMonsterWidth*row));
		if(iCurFrame>=iTotalFrame){
			iCurFrame = 0;
		}
	};

	function _init(){
		//绑定键盘事件
		$(document).keyup(function(evt){
			keybuf[evt.keyCode] = false;

			if(evt.keyCode == KEY.SHIFT){
				iMonsterStepCur = iMonsterStepNormal;
			}
		});
		$(document).keydown(function(evt){
			keybuf[evt.keyCode] = true;

			if(evt.keyCode == KEY.SHIFT){
				iMonsterStepCur = iMonsterStepSlow;
			}
		});
	}

	global.spriteMonster = spriteMonster;
	global.init_monster = _init;

})(window);