$(document).ready(function() {
	// En la clase pestañas 
	$("#pestañas").tabs();
	// Indico que la clase mensajes y misMensajes es un accordion
	$("#mensajes").accordion({collapsible: true, active: false, heightStyle: "content"});
	$("#misMensajes").accordion({collapsible: true, active: false, heightStyle: "content"});

	// Cargo los mensajes de timeline.json y myline.json en su clase correspondiente
	cargarMensajes("json/timeline.json", "#mensajes");
	cargarMensajes("json/myline.json", "#misMensajes");

	// Compruebo si hay mensajes nuevos en update.json
	$.getJSON("json/update.json").done(function(data) {
		var nuevosMensajes = data.items.length;
		if (nuevosMensajes > 0) {
			añadirNotificacion(nuevosMensajes);
			// Si se hace click sobre la notificacion, se cargan
			$("#notificaciones").click(function() {
				cargarMensajes("json/update.json", "#mensajes");
				$("#notificaciones").html("");
			});
		}
	});
});

function cargarMensajes(fichero, clase) {
	// Cargo el fichero JSON
	$.getJSON(fichero).done(function(data) {
		/* Itero en cada item (mensaje), de forma que guardo su
		   información y la añado al html */
		$.each(data.items, function(i, item) {
			var mensaje = "<div class='cabecera'> <b>"
							 + item.titulo + "</b> por <b>" + item.autor + "</b> <img src='" + item.avatar
							 + "'/>" + " <span class='fecha'>" + item.fecha + "</span></div>" 							 
						 + "<div class='contenido'>"
							 + item.contenido 
						 + "</div>"
			$(clase).prepend(mensaje);
		});
		$(clase).accordion("refresh")
	});
}

function añadirNotificacion(cantidad) {
	var notificacion = "<p>Hay " + cantidad + " nuevos mensajes</p>";
	$("#notificaciones").html(notificacion);
}
