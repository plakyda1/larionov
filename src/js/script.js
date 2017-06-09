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
				console.log(formBLock.top+'='+formBLock.left);
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