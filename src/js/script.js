// Объявление модуля
var myModule = (function () {

	// Инициализирует наш модуль
	function init () {
		_setUpListners();
		maskPhone();
	};

	// Прослушивает события 
	function _setUpListners () {
		$('#introduction__submit').on('click', validation);
	};

	function maskPhone (e) {
		$('.form__phone').mask('+7 (999) 99-99-99');
	};

	// Валидация форм
	function validation(event) {
		event.preventDefault();
		var form = $(this).parent('form');
		var value = form.find(':text').val();
		console.log(value)
		if (value =='' || value == 'undefined') {
			alert(1)
		}else{
			sendData(value)
		}		
	}
	// Отправит данные
	function sendData(value) {
		$.$.ajax({
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