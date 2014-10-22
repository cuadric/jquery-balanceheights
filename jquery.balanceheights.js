/*
 * jQuery Cuadric Balance Heights v1.0
 * http://www.cuadric.com
 *
 * Copyright 2014, Gonzalo Sanchez
 * Free to use under the GPL license.
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function($){

		function igualar_heights( lineas ) {

			var mas_alto = 0;

			$.each( lineas, function(index, linea) {

					mas_alto = 0;

					$.each( linea, function(index, el) {
						$(el).height('auto');
						var este_alto = $(el).height();
						if ( este_alto > mas_alto ) {
							mas_alto = este_alto;
						}
					});

					$.each( linea, function(index, el) {
						$(el).height( mas_alto );

						$(el).css('position', 'relative');

						$(el).children().first()
							.css('position', 'static')
							.css('min-height', '100%');
					});

			});
		}

		function equal_heights_in_a_row() {

			parents = $('.balance_heights'); // devuelve todos los elementos de la página con class .equal_heights, que pueden ser varios

				var lineas   = new Array();
				var linea    = new Array();

				parents.each(function(index, el) {

					$(el).css('position', 'relative');

					elements = $(el).children();

					var lineas   = [];
					var linea    = [];
					var prev_top = -1;
					var i        = -1;
					var ii       = -1;

					elements.each(function(index, el) {

						var position   = $(el).position();
						var top        = position.top;

						if ( top == prev_top ) {
							i++;
							linea[i] = el;
						} else {
							i = 0;
							ii++;
							lineas[ii] = linea;
							linea      = [];
							linea[i]   = el;
						}
						prev_top   = top;

					});

					ii++;
					lineas[ii] = linea;

					igualar_heights( lineas );

				});
		}


	equal_heights_in_a_row();


	// Detectamos IE antiguos
	var oldIE;
	if ($('html').is('.ie6, .ie7, .ie8')) {
		oldIE = true;
	}

		$(window).load(function() {
			equal_heights_in_a_row();

			// el puto IE8 tarda en preparar la pantalla por lo que cuando se ejecuta window.onLoad() es demasiado pronto para poder ajustar los heigthts.
			// asíque volvemos a ejecutar la función luego de un pequeño delay.
			if ( oldIE) {
				setTimeout(function() {
					equal_heights_in_a_row();
				}, 1000);
			}

		});

		if ( !oldIE) {

			$( window ).resize(function() {
				equal_heights_in_a_row();
			});

		} else {

			// IE8 dispara un $(window).resize() no solo en la ventana si no cuando cualquier elemento se redimensiona! :P
			// por eso tenemos que filtrar esos eventos y asegurarnos de que es la ventana la que se está redimensionando.

			var currentHeight;
			var currentWidth;

			$(window).resize(function () {
				var windowHeight = $(window).height();
				var windowWidth = $(window).width();

				if (currentHeight == undefined || currentHeight != windowHeight
				|| currentWidth == undefined || currentWidth != windowWidth) {

					equal_heights_in_a_row();

					currentHeight = windowHeight;
					currentWidth = windowWidth;
				}
			});
		}



})(window.jQuery);