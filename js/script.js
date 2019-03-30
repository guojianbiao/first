$(function(){

// banner区图片轮播
	var timer = null,
		index = 0,
		len = $('.bloc').length;

	// 定时器每隔1秒进行轮播函数
	function startChange(){
		timer = setInterval(function(){
			index++;
			if(index >= len){
				index = 0;
			}
			// 调用图片切换函数
			changeImg();
		},1000)
	}
	startChange();

	// 清除定时器
	function stopChange(){
		if(timer){
			clearInterval(timer);
		}
	}

	// 滑过轮播区清除定时器，离开继续
	function slideImg(){
		$('#picture').mouseover(function(){
			stopChange();
		}).mouseout(function(){
			startChange();
		})
	}
	slideImg();


	// 点击左箭头切换图片
	$('#prev2').click(function(){
		index--;
		if(index < 0){
			index = len - 1;
		}
		changeImg();
	})

	// 点击右箭头切换图片
	$('#prev').click(function(){
		index++;
		if(index >= len){
			index = 0;
		}
		changeImg();
	})

	// 点击圆点切换图片
	$('.dot').click(function(){
		index = $(this).index();
		changeImg();
	})

	// 图片切换函数
	function changeImg(){
		$('.bloc').eq(index).addClass('pics-active').siblings().removeClass('pics-active');
		$('.dot').eq(index).addClass('dot-active').siblings().removeClass('dot-active');
	}

// 点击顶部的时候返回顶部
		$('.slide-nav1').click(function(){
			$(window).scrollTop(0);
		});
		
// 弹出层显示关闭处
	
	// 点击登录显示弹出层
	$('.login').click(function(){
		var loginHtml = $('.loginHtml').html();
		showLayer(loginHtml,350,320,closeCallback);
	});

	// 点击注册更换显示内容
	$('.reg').click(function(){
		var regHtml = $('.regHtml').html();
		showLayer(regHtml,300,320,closeCallback);
		changeCss();
		// 当登录信息填写错误时，点击注册时清空错误提示信息
		$('.error-msg').html('');
	});

	// 点击注册后再点击登录更换显示内容
	$('.log').click(function(){
		var loginHtml = $('.loginHtml').html();
		showLayer(loginHtml,350,320);
		changeCss();
		// 当登注册信息填写错误时，点击登录时清空错误提示信息
		$('.error-msg').html('');
	});

	// 点击注册更换样式
	function changeCss(){
		$('.log').toggleClass('log-active');
		$('.reg').toggleClass('log-active');
	};

	// 显示弹出层
	function showLayer(html,height,width,closeCallback){
		// 显示遮罩层
		$('#layer-mask').show();
		// 显示窗口
		$('#layer-pop').show();
		// 内容填充
		$('.layer-down').html(html);
		// 动态设置宽高
		$('#layer-pop').css({
			height:height,
			width:width
		});
		// 点击关闭按钮关闭弹出层
		$('.layer-close').click(function(){
			closeCallback();
			closeLary();
		});
		// 检验登录账号的输入正确
		$('#username').blur(function(){
			var username = $('input[name="username"]').val();
			// var password = $('input[name="password"]').val();
			if(username.length == "11"){
				if(isNaN(username)){
					$('.error-msg1').html('请输入正确的邮箱/手机号');
				}
			}else{
				$('.error-msg1').html('请输入正确的邮箱/手机号');
			};
			
		}).focus(function(){
			$('.error-msg1').html('');
		});
		// 检验登录密码的输入正确
		$('#password').blur(function(){
			var password = $('input[name="password"]').val();
			if(password.length >= "6" && password.length <= "16"){
													// 这块判断区分大小写不会，老师帮忙看看!!!!!!!!
			}else{
				$('.error-msg2').html('输入6-16位密码，区分大小写，不能用空格')
			};
		}).focus(function(){
			
			$('.error-msg2').html('');
		});

		// 检验注册账号的输入正确
		$('#regname').blur(function(){
			var regname = $('input[name="regname"]').val();
			if(regname.length == "11"){
				if(isNaN(regname)){
					$('.error-msg3').html('请输入正确的邮箱/手机号');
				}
			}else{
				$('.error-msg3').html('请输入正确的邮箱/手机号');
			};
		}).focus(function(){
			
			$('.error-msg3').html('');
		});
		// 检验注册验证码的输入正确
		$('#tex-ts').blur(function(){
			var texts = $('input[name="tex-ts"]').val();
			if(texts === "GYyd"){
				$('.error-msg4').html('');// 这块判断区分验证码大小写不会，老师帮忙看看!
			}else{
				$('.error-msg4').html('验证码错误');
			};
		}).focus(function(){
			$('.error-msg4').html('');
		});

	};

	//关闭弹出层函数
	function closeLary(){
		// 关闭遮罩层
		$('#layer-mask').hide();
		// 关闭窗口
		$('#layer-pop').hide();
	};

	// 弹出层关闭回调函数
	function closeCallback(){
		// 关闭按钮时登录和注册的样式恢复初始状态
		$('.log').addClass('log-active');
		$('.reg').removeClass('log-active');
		// 关闭按钮时判断输入内容的信息正确与否的提示进行清除
		$('.error-msg').html("");
	};

// 滑过主菜单显示子菜单
 	$('.menu-item').mouseover(function(){
 		// 滑过主菜单 改变字体和背景样式
 		$('.menu-item').removeClass('menu-item-active');
 		$(this).addClass('menu-item-active');
 		$('.menu-item').children().removeClass('item-active');
 		$(this).children().addClass('item-active');
 		// 滑过主菜单 显示子菜单框和内容
 		$('.sub-menu').show();
 		var index = $(this).index()-1;
 		console.log(index);
 		$('.inner-box').hide();
 		$('.inner-box').eq(index).show();
 	});
 	// 滑过子菜单
 	$('.sub-menu .inner-box').hover(function(){
 		// 滑过子菜单显示
 		$(this).parent().show();
 		var index = $(this).index();
 		console.log(index);
 		$(this).parent().siblings('#menu-content').children('.menu-item').eq(index).addClass('menu-item-active');
 		$(this).parent().siblings('#menu-content').children('.menu-item').eq(index).children().addClass('item-active');
 		console.log($(this));
 	},function(){
 		// 离开子菜单隐藏
		$(this).parent().hide();
		$('#menu-content').children().removeClass('menu-item-active');
 		$('#menu-content').children().children().removeClass('item-active');
 	});
 	// 离开主菜单 隐藏子菜单
 	$('#menu-content').mouseout(function(){
 		$('.sub-menu').hide();
 		// 离开主菜单 改变主菜单的后代元素的样式
 		$(this).children().removeClass('menu-item-active');
 		$(this).children().children().removeClass('item-active');
 	})
 
	
// 滑过购物车的时改变样式并出现下拉菜单	
	$('.shop').hover(function(){
		// 滑过购物车时背景颜色图标改变
		$(this).css({
			background:'#fff',
			border:'1px solid #ccc'
		})
		$(this).children().children('.shop-text').css('color','#f01414');
		$(this).children().children('img').eq(0).attr("src","images/icon/25.png");
		$(this).children().children('img').eq(1).attr("src","images/icon/22.png");
		$(this).children('#dropdown-menu').removeClass('hhide');
	},function(){
		// 离开购物车时背景颜色图标改变
		$(this).css({
			background:'#f01414',
			border:'none'
		})
		$(this).children().children('.shop-text').css('color','#fff');
		$(this).children().children('img').eq(0).attr("src","images/icon/26.png");
		$(this).children().children('img').eq(1).attr("src","images/icon/23.png");
		$(this).children('#dropdown-menu').addClass('hhide');
	})

		// 当滑过购物车下拉菜单时背景颜色，字体发生改变
			// 先遍历ul下的li，再对其进行样式改变
		$('#dropdown-menu>ul>li').each(function(index){
			$(this).hover(function(){
				$(this).css('background','#f3f5f7');
			},function(){
				$(this).css('background','#fff');
			});
		});
		// 遍历li下的p，再对其进行样式改变
		$('#dropdown-menu>ul>li>div>p').each(function(index){
			$(this).hover(function(){
				$(this).css('color','#f01414');
			},function(){
				$(this).css('color','#07111b');
			});
		});
		
// 楼层区右侧 
	$('.small-category').find('span').hover(function(){
		// 滑过右侧文字改变样式
		$(this).parent().find('span').removeClass('small-category-active');
		$(this).addClass('small-category-active');
		// 滑过右侧文字改变图片
		var idx = $(this).index();
		console.log(idx);
		$(this).parent().parent().nextUntil('.floor').hide();
        $(this).parents().nextUntil('.floor').eq(idx).show();
	})
		
// 楼层左侧导航
	// $(this).scroll(function(){
	// 	// 获取到第二个楼层
	// 	var indes = $('.floors').find('.floor').eq(1),
	// 	// 获取第二个楼层 到网页顶部的高度
	// 		topHeight = indes.offset().top+50,
	// 		// 获取网页窗口的高度
	// 		windowHeight = $(window).height(),
	// 		// 获取滚动条的高度
	// 		scrollHeight = $(window).scrollTop();
	// 		if(windowHeight + scrollHeight >= topHeight){
	// 			$('.elevator').show();
	// 		}else{
	// 			$('.elevator').hide();
	// 		};
	// });

		var $elevator = $('#elevator'),
			$items = $elevator.find('.elevator-item'),
			$floor = $('.floor'),
			$win = $(window),
			offset = $floor.height();

		function init(){
			$items.on('click',function(){
				var index = $(this).index();
				console.log(index);
				$('html,body').animate({
					scrollTop:$floor.eq(index).offset().top
				});
			});

			$win.on('scroll',function(){
				$floor.each(function(index){
					if($win.height() + $win.scrollTop() >= $(this).offset().top + offset){
						if(index === 1){
							$elevator.show();
						}
						$items.removeClass('elevator-active');
						$items.eq(index).addClass('elevator-active');	
						
					}else{
						$items.eq(index).removeClass('elevator-active');
						if(index === 1){
							$elevator.hide();
						}
					}
				});
			});	
		}
	
		init();
})