// Объявление модуля
var myModule = (function () {
	// Инициализирует наш модуль
	function init () {
		_setUpListners();
		maskPhone();
	};

	// Прослушивает события
	function _setUpListners () {
		$('#introduction__submit, #introduction__submit_footer').on('click', validation);
		$(document).on('mousemove touchend', function(event) {
			var formBLock = $('#meetTo .bg.active').offset();
				formBLock.top += $('#meetTo .bg.active').height()/2,
				formBLock.left += $('#meetTo .bg.active').width()/2;
			var x = formBLock.left - event.pageX,
				y = formBLock.top - event.pageY,
				angle = Math.atan2(y,x)*180/Math.PI; // узнаем угол под которым курсом, относительно центра фото
				if (Math.abs(x) < 80 && Math.abs(y) < 80) { // мышка над Ильей - cмотрим прямо
					$('.bg-container .active').removeClass('active');
					$('.bg-container .bg_c').addClass('active');
				} else {
					if (angle <= 45 || angle >= -45) { // влево
						$('.bg-container .active').removeClass('active');
						$('.bg-container .bg_l').addClass('active');
					}
					if (angle > 45 && angle < 135) { // вверх
						$('.bg-container .active').removeClass('active');
						$('.bg-container .bg_t').addClass('active');
					}
					if (angle >= 135 || angle <= -135) { // вправо
						$('.bg-container .active').removeClass('active');
						$('.bg-container .bg_r').addClass('active');
					}
					if (angle < -45 && angle > -135) { // вниз
						$('.bg-container .active').removeClass('active');
						$('.bg-container .bg_b').addClass('active');
					}
				}
		});

	};
	function maskPhone (e) {
		$('.form__phone').mask('+7 (999) 99-99-99');
	};
	var tooltipText = {
		error: 'Вы не ввели номер телефона',
		success: 'Мы вам перезвоним'
	}
	// Валидация форм
	function validation(event) {
		event.preventDefault();
		var form = $(this).parent('form');
		var input = form.find(':text');
		var value = input.val();
		input.removeClass('has-error success');
		$('.tooltip').remove();
		if (value =='' || value == 'undefined') {
			input.addClass('has-error');
			form.append('<div class="tooltip tooltip-error">'+tooltipText.error+'</div>');
		}else{
			// sendData(value);
			input.addClass('success')
			form.append('<div class="tooltip tooltip-success">'+tooltipText.success+'</div>');
		}
		return false;
	}
	// Отправит данные
	function sendData(value) {
		$.ajax({
			url: '/path/to/file',
			type: 'POST',
			dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			data: value,
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});

	}

	// Возвращаем объект (публичные методы)
	return {
		init: init
	};

})();

// Вызов модуля
myModule.init();

$(function(){
	$('a[href="#meetTo"]').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		$("html, body").animate({
			scrollTop: $($(this).attr('href')).offset().top + "px"
		}, {
			duration: 1000,
			easing: "swing"
		});
		$('#footer__phone').focus();
		return false;
	});
})

var videoModule = (function () {
	//VideoUrl
	window.videoUrl = {
		willPlay: 0,
		urls: [
			'R-2NVRZauEg',
			'gA-_O2VUwc8',
			'UfehLPb7WEE',
			'NGDA62xFJKQ',
			'rblKTubuRnE',
			'8PfDBK5kNLg',
			// 'DES3CZPiJUk',
			'4BVip_01kzs',
			'rjtqjYfymUE',
			'jtgP-TcPpeA',
			'4YTEpFTZtF8',
			'URUtzAACbCY',
		]
	}

	var player,
		ytmobile;
	// Инициализирует наш модуль
	function init () {
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/player_api?enablejsapi=1";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		$(window).load(function(){
			if (document.documentElement.clientWidth >= 768) {
				videoView()
				$('.tricks-wrap').on('click','.tricks-item', loadNewVid);
				$('.tricks-wrap').on('mouseenter', playVid);
			} else {
				ytmobile = new YT.Player('ytmobile');
				vidmobRescale();
			}
			$(window).on('resize', function(){
				if (document.documentElement.clientWidth >= 768) {
				  vidRescale();
				} else {
					vidmobRescale();
				}
			});
		})
	}
	function vidmobRescale(){
		var w = $('.tricks-wrap .container').width();
		ytmobile.setSize(w, w/16*9);
	}

	function vidRescale(){
	  var w = $('.tricks-wrap .container').width()+200,
	    h = $('.tricks-wrap .container').height()+200;

	  if (w/h > 16/9){
	    player.setSize(w, w/16*9);
	    $('#ytplayer').css({'left': '0px'});
	  } else {
	    player.setSize(h/9*16, h);
	  }
  	    if ($('.video-wrap').width()<$('#ytplayer').attr('width')) {
	    	$('#ytplayer').css({'left':-($('#ytplayer').attr('width')-$('.video-wrap').width())/2});
	    }
	}
	function videoView (event){
		$('.tricks').addClass('videoActivated');
		// if(!player){
		    player = new YT.Player('ytplayer', {
		       playerVars : {
	            'autoplay' : 1,
	            'rel' : 0,
	            'showinfo' : 0,
	            'egm' : 0,
	            'showsearch' : 0,
	            'controls' : 0,
				'autohide': 1,
	            'modestbranding' : 1
	        	},
	        	events: {
		            'onReady': onPlayerReady,
		            'onStateChange' : onPlayerStateChange
	          	},
			     // loop: 1,
	      		videoId: videoUrl.urls[videoUrl.willPlay]
			})
		// }else{
		// 	loadNewVid(videoUrl.willPlay)
		// 	// loadNewVid()
		// }
		// videoUrl.willPlay = videoUrl.willPlay < videoUrl.urls.length ? videoUrl.willPlay+1 : 0;
	}
    function playVid(){
    	player.playVideo();
    }
    function loadNewVid(randomInteger){
    	$('.tricks').addClass('videoActivated');
    	// player.nextVideo();
    	// console.log(player.getPlaylist());
    	player.loadVideoById(videoUrl.urls[videoUrl.willPlay]);

		videoUrl.willPlay = videoUrl.willPlay < videoUrl.urls.length ? videoUrl.willPlay+1 : 0;
	}

	function onPlayerReady(event) {
        event.target.playVideo();
        player.mute();
        vidRescale();
    }
	var done = false;
	window.onPlayerStateChange = function(event, element) {
		console.log(event.data);
        	// alert(1);
        if (event.data == 1 && !done && $('.tricks').hasClass('videoActivated')) {
          setTimeout(stopVideo, 1000);
          done = true;
        }
		function stopVideo() {
			player.pauseVideo();
		}
	    if (event.data == 3) { // буферизация
	    	$('.video-wrap').removeClass('active');
	        $('.tricks').addClass('videoActivated');
	    }
	    if (event.data == 2) { // видео началось
	    	$('.video-wrap').addClass('active');
	    }

	    if (event.data == 1) { // видео началось
	    	$('.video-wrap').addClass('active');
	        // $('#ytplayer').fadeIn();
	    }
	    if (event.data == 0) { // видео окончилось
	        // $('#ytplayer').fadeOut();
	    	$('.video-wrap').removeClass('active');
	        // player.destroy();
	        // player = false;
	        $('.tricks').removeClass('videoActivated');
	    }

	};
	return{
		init: init
	}
})()

	videoModule.init();
