;(function(global){

	function _main(){
		global.keybuf = [];
		global.bulletbuf = [];
		global.jewelbuf = [];
		global.bombbuf = [];
		global.recoverbuf = [];
		global.doc_width = $('#container').width();
		global.doc_height = $('#container').height();
		global.game_over = true;
		global.iMaxBullet = 20;
		global.iMaxJewel = 10;
		global.monster = $('#monster');
		global.totalBullet = 0;
		global.running = true;//游戏暂停
		global.expire_time = 0;
		global.score = 0;
		global.wait = 0;
		global.initLife = 5;//初始有几条命
		global.restLife = initLife;//剩余几条命

		//初始操作
		init_monster();
		init_ctrl();

		//开始
		worker();

	}

	$(document).ready(function(){
		_main();
	});

})(window);