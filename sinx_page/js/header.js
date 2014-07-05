;(function(){

	var _writeTop = function(){
		//todo:检查是否已登录
		var _htmlLogined = '<nav class="mobile_hidden" id="desktop" style=" height:50px;">\
				<div class="container" style="margin-bottom:0px;">\
					<a class="logo" href="default.aspx">\
					<img src="assets/common/sinx55.png"/>\
					</a>\
					<div id="Desktopnav1_Panel1">\
						<div class="button blue_button" id="account">\
							<span>杨乐峰</span>\
							<ul id="account_links">\
								<li><a href="profile.html">我的资料</a></li>\
								<li><a href="orders.html">我的订单</a></li>\
								<li><a href="editprofile.html">编辑资料</a></li>\
								<li><a href="login.html">退出</a></li>\
							</ul>\
						</div>\
					</div>\
				</div>\
			</nav>';

		var _htmlUnlogin = '<nav class="mobile_hidden" id="desktop" style=" height:50px;">\
			<div class="container" style="margin-bottom:0px;">\
				<a class="logo" href="default.aspx">\
				<img src="assets/common/sinx55.png">\
				</a>\
				<div id="Desktopnav1_Panel2">\
					<a class="button blue_button" href="signup.html" id="get_started" style=" margin-top:10px;">开始</a>\
					<a class="button gray_button" href="login.html" id="log_in" style=" background-color:white; color:black; margin-top:10px;">登录</a>\
					<ul class="desktop_navigation" style=" margin-top:10px;">\
						<li>\
						<a class="stylist_link" href="Default.aspx#stylist">时尚顾问</a>\
						</li>\
						<li>\
						<a class="clothing_link" href="Default.aspx#clothing">衣服</a>\
						</li>\
						<li>\
						<a class="shipping_link" href="Default.aspx#shipping">配送</a>\
						</li>\
						<li>\
						<a class="home_tryon_link" href="Default.aspx#home_tryon">试穿</a>\
						</li>\
						<li>\
						<a class="pricing_link" href="Default.aspx#pricing">价格</a>\
						</li>\
						<li>\
						<a href="faq.html">常见问题</a>\
						</li>\
						<li>\
						<a href="about.html">关于我们</a>\
						</li>\
					</ul>\
				</div>\
			</div>\
			</nav>';
		document.write(_htmlLogined);
	}

	var _writeFooter = function(){
		var html = '<footer>\
			<div class="footer_wrapper">\
				<ul id="footer_list">\
					<li>\
					<a href="about.aspx">关于我们</a>\
					</li>\
					<li>\
					<a href="careers.aspx">招聘</a>\
					</li>\
					<li>\
					<a href="faq.aspx">常见问题</a>\
					</li>\
					<li>\
					<a href="contact.aspx">联系方式</a>\
					</li>\
				</ul>\
			</div>\
			</footer>';
		document.write(html);
	}

	window['SINX'] = {
		writeTop : _writeTop,
		writeFooter : _writeFooter
	};

})();