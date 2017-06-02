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
			var formBLock = $('#meetTo .container').offset(),
				object=$('#meetTo .container'),
				// надбавки чтобы взять центр оси по середине фотки Ильи
				plusX = document.documentElement.clientWidth <= 480 ? $('#meetTo .container').width() : 200 ,
				plusY =	document.documentElement.clientWidth <= 480 ? ($('#meetTo .container').height() - 80) : 200 ;
				formBLock.top += plusY;
				formBLock.left += plusX;
			var x = formBLock.left - event.pageX,
				y = (formBLock.top - event.pageY),
				angle = Math.atan2(y,x)*180/Math.PI; // узнаем угол под которым курсом, относительно центра фото
				if (Math.abs(x) < 80 && Math.abs(y) < 80) { // мышка над Ильей - cмотрим прямо
					object.css('background-image', 'url(img/form2_bg_c.png)')
				} else {
					if (angle <= 45 || angle >= -45) { // влево
						object.css('background-image', 'url(img/form2_bg_l.png)')
					}
					if (angle > 45 && angle < 135) { // вверх
						object.css('background-image', 'url(img/form2_bg_t.png)')
					}
					if (angle >= 135 || angle <= -135) { // вправо
						object.css('background-image', 'url(img/form2_bg_r.png)')
					}
					if (angle < -45 && angle > -135) { // вниз
						object.css('background-image', 'url(img/form2_bg_b.png)')
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