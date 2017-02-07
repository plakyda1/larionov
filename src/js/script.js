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