$(function() {
	$("form.subscribe").on("submit", function(e) {
		e.preventDefault();
		sendRequestListaCorreo($(this));
	});

    $("form#formContacto").on("submit", function(e) {
        e.preventDefault();
        sendRequestContacto($(this));
    });

});

function sendRequestListaCorreo(form) {
	var url = "http://bd-jfsh.rhcloud.com/portal/listaCorreo/saveEmail";
    //var url "http://localhost:8080/portal/listaCorreo/saveEmail";
    $.ajax({
        type: "POST",
        url: url,
        data: $(form).serialize(),
        timeout: 3000,
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
            if(textStatus == "timeout") {
                showToastrError("Error", "No se ha podido establecer conexión con el servidor, intente más tarde.");
            } else  {
                showToastrError("Error", "Ocurrió un error al procesar su petición, vuelva a intentar.");
            }
        },
        complete: function(XMLHttpRequest,textStatus){
            $(form).find("#enviarCorreoButton").val("Enviar");
            $(form).find("#enviarCorreoButton").prop("disabled", false);
            $(form).find("#email").val("");
        }
    });
}

function sendRequestContacto(form) {
    var url = "http://bd-jfsh.rhcloud.com/portal/contactos/saveContacto";
    $.ajax({
        type: "POST",
        url: url,
        data: $(form).serialize(),
        timeout: 3000,
        beforeSend: function(jqXHR,settings) {
            $(form).find("#submit_btn").prop("disabled", true);
            $(form).find("#submit_btn").val("Procesando...");
        },
        success: function(response,textStatus){
            if(response == "true") {
                showToastrSuccess("Suscripción Exitosa", "Pronto recibirás noticias.");
            } //else if(response == "Ya Suscrito") {
            //    showToastrSuccess("Ya estabas suscrito", "En breve seguirás recibiendo noticias.");
            //} else{
            //    showToastrError("Ocurrió un error", "Error al intentar guardar su correo, intente nuevamente.");
            //}
        },
        error: function(XMLHttpRequest,textStatus,errorThrown){
            if(textStatus == "timeout") {
                showToastrError("Error", "No se ha podido establecer conexión con el servidor, intente más tarde.");
            } else  {
                showToastrError("Error", "Ocurrió un error al procesar su petición, vuelva a intentar.");
            }
        },
        complete: function(XMLHttpRequest,textStatus){
            $(form).find("#submit_btn").prop("disabled", false);
            $(form).find("#submit_btn").val("Enviar Información");
            $(form)[0].reset();
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