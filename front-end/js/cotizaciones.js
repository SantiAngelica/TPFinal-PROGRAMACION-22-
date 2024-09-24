let arrayCotiz = []
const boxTarjetas = document.getElementById('box-tarjetas')


Promise.all([
    fetch("https://dolarapi.com/v1/dolares/blue").then(response => response.json()),
    fetch("https://dolarapi.com/v1/dolares/tarjeta").then(response => response.json()),
    fetch("https://dolarapi.com/v1/cotizaciones").then(response => response.json())
  ]).then(results => {
    arrayCotiz.push(results[0], results[1], ...results[2]);
    console.log(arrayCotiz); // Verifica aquí la estructura de los datos
  
    arrayCotiz.forEach(moneda => {

      const newMoneda = document.createElement('div');
      newMoneda.classList.add('tarjeta');
      newMoneda.innerHTML = `
        <div class="actualizado">
            <span>Actualizado</span>
        </div>
        <div class="nombre_tarjeta">
            <p class="nombre_casa">${moneda.casa}</p>
            <h2 class="moneda">${moneda.moneda}</h2>
        </div>
        <div class="valores">
            <div class="compra">
                <p class="valor_etiqueta">Compra</p>
                <p class="valor">$${moneda.compra}</p>
            </div>
            <div class="venta">
                <p class="valor_etiqueta">Venta</p>
                <p class="valor">$${moneda.venta.toFixed(2)}</p>
            </div>
            <div class="actualizacion">
                <p class="valor_etiqueta">Fecha actualización</p>
                <p class="valor">${moneda.fechaActualizacion.split('T')[0]}</p>
            </div>
        </div>
      `;
      boxTarjetas.appendChild(newMoneda);
    });
  }).catch(error => {
    console.error('Error al obtener los datos:', error);
  });