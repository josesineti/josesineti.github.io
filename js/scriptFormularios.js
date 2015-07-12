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
            $(form).find("#enviarCorreoButton").button('loading');
        },
        success: function(template,textStatus){
            //$("#form").html(template);
            console.log("success");
        },
        error: function(XMLHttpRequest,textStatus,errorThrown){
            //processError("Ocurrio un error al procesar la petición");        
            console.log("Error");
        },
        complete: function(XMLHttpRequest,textStatus){
            $(form).find("#enviarCorreoButton").button('reset');
        }
    });
}