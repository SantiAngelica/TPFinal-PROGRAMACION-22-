let dolarData
import { obtenerDatosDolarAPI } from "./obtenerHist.js";
import { renderizarEstadisticas } from "./renderStats.js";

//carga dolar oficial al principio, despues corresponde al
document.addEventListener('DOMContentLoaded', async () => {
    dolarData = await obtenerDatosDolarAPI('oficial', 30)
	await renderizarEstadisticas(dolarData);
})

document.getElementById('monedaTipo').addEventListener('change', async (e) => {
    const moneda = e.target.value
    dolarData = await obtenerDatosDolarAPI(moneda, 30)
	await renderizarEstadisticas(dolarData);
})




