const tarjetasContenedor = document.getElementById('tarjetas_contenedor');

const obtenerCotizaciones = async () => {
	let cotizaciones;
	try {
		const request = await fetch('https://dolarapi.com/v1/cotizaciones')
			.then(response => response.json())
			.then(data => (cotizaciones = data));

		cotizaciones.map(cotizacion => {
			const tarjeta = crearTarjetaDeCotizacion(cotizacion);
			tarjetasContenedor.innerHTML += tarjeta;
		});
	} catch (error) {
		console.log(error);
	}
};

const crearTarjetaDeCotizacion = cotizacion => {
	return `<div class="tarjeta">
          <div class="actualizado">
            <span>Actualizado</span>
          </div>
          <div class="nombre_tarjeta">
            <p class="nombre_casa">${cotizacion.casa}</p>
            <h2 class="moneda">${cotizacion.moneda}</h2>
          </div>
          <div class="valores">
            <div class="compra">
              <p class="valor_etiqueta">Compra</p>
              <p class="valor"> ${cotizacion.compra}</p>
            </div>
            <div class="venta">
              <p class="valor_etiqueta">Venta</p>
              <p class="valor">${cotizacion.venta}</p>
            </div>
            <div class="actualizacion" >
              <p class="valor_etiqueta">Fecha actualizacion</p>
              <p class="valor">${cotizacion.fechaActualizacion}</p>
            </div>
          </div>
        </div>`;
};
obtenerCotizaciones();
