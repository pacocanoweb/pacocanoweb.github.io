function sendForm(name, email, ucaptcha, msg) {
	var params = {
		"name" : name,
		"email" : email,
		"ucaptcha" : ucaptcha,
		"msg" : msg
	};

	$.ajax({
		data: params,
		url: './php/form.php',
		type: 'get',
		beforeSend: function() {
			$('#send_button').val('Enviando...');
			$('#send_button').addClass('sending');
			$('#name').removeClass('error');
			$('#email').removeClass('error');
			$('#ucaptcha').removeClass('error');
			$('#msg').removeClass('error');
		},
		success: function(response) {
			if (!$.trim(response)) { //esta vacio, todo es correcto
				$('#send_button').val('Enviado');
				$('#send_button').removeClass('sending').addClass('sent');
			}
			else {
				var errors = response.split(",");

				errors.forEach(function(error) {
					$('#'+error).addClass('error');
				});

				$('#send_button').css("cursor", "pointer");
				$('#send_button').prop('disabled', false);
				$('#send_button').val('Enviar');
				$('#send_button').removeClass('sending');
			}
		}
	});
}