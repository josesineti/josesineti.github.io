$(function() {
	$("form.subscribe").on("submit", function(e) {
		e.preventDefault();
		sendRequest($(this));
	});
});

function sendRequest(form) {
	var url = "http://localhost:9090/portal/listaCorreo/saveEmail";
    $.ajax({
        type: "POST",
        url: url,
        data: $(form).serialize(),
        timeout: 5000,
        beforeSend: function(jqXHR,settings) {
            $(form).find("#enviarCorreoButton").prop("disabled", true);
            $(form).find("#enviarCorreoButton").val("Enviando...");
        },
        success: function(response,textStatus){
        	if(response == "true") {
        		showToastrSuccess("Suscripción Exitosa", "Pronto recibirás noticias.");
        	} else if(response == "Ya Suscrito") {
        		showToastrSuccess("Ya estabas suscrito", "En breve seguirás recibiendo noticias.");
        	} else{
        		showToastrError("Ocurrió un error", "Error al intentar guardar su correo, intente nuevamente.");
        	}
        },
        error: function(XMLHttpRequest,textStatus,errorThrown){
            //processError("Ocurrio un error al procesar la petición");        
            console.log("Error");
        },
        complete: function(XMLHttpRequest,textStatus){
            $(form).find("#enviarCorreoButton").val("Enviar");
            $(form).find("#enviarCorreoButton").prop("disabled", false);
            $(form).find("#email").val("");
        }
    });
}

function showToastrSuccess(title, text) {
	toastr.options = {
  		"closeButton": true,
  		"debug": false,
  		"newestOnTop": false,
  		"progressBar": true,
  		"positionClass": "toast-bottom-left",
  		"preventDuplicates": true,
  		"onclick": null,
  		"showDuration": "1000",
  		"hideDuration": "1000",
  		"timeOut": "5000",
  		"extendedTimeOut": "1000",
  		"showEasing": "swing",
  		"hideEasing": "linear",
  		"showMethod": "fadeIn",
  		"hideMethod": "fadeOut"
	}
	toastr.success(text, title);
}


function showToastrError(title, text) {
	toastr.options = {
  		"closeButton": true,
  		"debug": false,
  		"newestOnTop": false,
  		"progressBar": true,
  		"positionClass": "toast-bottom-left",
  		"preventDuplicates": true,
  		"onclick": null,
  		"showDuration": "1000",
  		"hideDuration": "1000",
  		"timeOut": "5000",
  		"extendedTimeOut": "1000",
  		"showEasing": "swing",
  		"hideEasing": "linear",
  		"showMethod": "fadeIn",
  		"hideMethod": "fadeOut"
	}
	toastr.error(text, title);
}