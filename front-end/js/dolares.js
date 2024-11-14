const boxTarjetas = document.getElementById('box-tarjetas-dolares')
import { capitalizarPrimeraLetra } from "./mayusFirst.js";
import { verificarFechaActualizada } from "./checkFecha.js";



fetch("http://127.0.0.1:8080/api/dolares")
    .then(response => response.json())
    .then(results => {
        results.forEach(moneda => {
            const newMoneda = document.createElement('div');
            newMoneda.classList.add('tarjeta');
            const fechaAct = verificarFechaActualizada(moneda.cotizacion.fechaActualizacion)
            newMoneda.innerHTML = `
        <div class=${fechaAct ? "actualizado" : "noActualizado"}>
            <span>${fechaAct ? "Actualizado" : "No actualizado"}</span>
        </div>
        <div class="nombre_tarjeta">
            <p class="nombre_casa">${moneda.tipo.moneda}</p>
            <h2 class="moneda">${capitalizarPrimeraLetra(moneda.tipo.casa) == 'Contadoconliqui' ? 'Liquidacion' : capitalizarPrimeraLetra(moneda.tipo.casa)}</h2>
            <p class="nombre_moneda">${moneda.tipo.nombre}</p>
        </div>
        <div class="valores">
            <div class="compra">
                <p class="valor_etiqueta">Compra</p>
                <p class="valor">$${moneda.cotizacion.compra.toLocaleString("es-ES")}</p>
            </div>
            <div class="venta">
                <p class="valor_etiqueta">Venta</p>
                <p class="valor">$${moneda.cotizacion.venta.toLocaleString("es-ES")}</p>
            </div>
            <div class="actualizacion">
                <p class="valor_etiqueta">Fecha actualización</p>
                <p class="valor">${moneda.cotizacion.fechaActualizacion.slice(0,10)}</p>
            </div>
        </div>
      `;
            boxTarjetas.appendChild(newMoneda);
        });
    }).catch(error => {
        console.error('Error al obtener los datos:', error);
    })