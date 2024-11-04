
const boxTarjetas = document.getElementById('box-tarjetas')
import { capitalizarPrimeraLetra } from "./mayusFirst.js";
import { obtenerFechaFormateada } from "./fecha.js";





    
fetch("http://127.0.0.1:8080/api/cotizaciones")
    .then(response => response.json())
    .then(results => {
    results.forEach(moneda => {
      console.log(moneda, moneda.nombre)
      const newMoneda = document.createElement('div');
      newMoneda.classList.add('tarjeta');
      newMoneda.innerHTML = `
        <div class="actualizado">
            <span>Actualizado</span>
        </div>
        <div class="nombre_tarjeta">
            <p class="nombre_casa">${capitalizarPrimeraLetra(moneda.casa)}</p>
            <h2 class="moneda">${moneda.moneda}</h2>
            <p class="nombre_moneda">${moneda.nombre}</p>
        </div>
        <div class="valores">
            <div class="compra">
                <p class="valor_etiqueta">Compra</p>
                <p class="valor">$${moneda.compra.toLocaleString("es-ES")}</p>
            </div>
            <div class="venta">
                <p class="valor_etiqueta">Venta</p>
                <p class="valor">$${moneda.venta.toLocaleString("es-ES")}</p>
            </div>
            <div class="actualizacion">
                <p class="valor_etiqueta">Fecha actualización</p>
                <p class="valor">${moneda.fechaActualizacion}</p>
            </div>
        </div>
      `;
      boxTarjetas.appendChild(newMoneda);
    });
  }).catch(error => {
    console.error('Error al obtener los datos:', error);
  })
