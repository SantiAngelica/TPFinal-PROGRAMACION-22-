import { obtenerDatosDolarAPI } from "./obtenerHist.js"
import { capitalizarPrimeraLetra } from "./mayusFirst.js"
let dolarData
const tableHist = document.getElementById('table_hist')

function cargarFilas(dolarData) {
    console.log(dolarData)
    tableHist.innerHTML = ""
    dolarData.forEach(e => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
			<td>${capitalizarPrimeraLetra(e.casa)}</td>
			<td>${e.compra}</td>
			<td>${e.venta}</td>
			<td>${e.fecha}</td>
			<td>-</td>
		`
        tableHist.prepend(tr)
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    dolarData = await obtenerDatosDolarAPI('oficial', 30)

    cargarFilas(dolarData)
})

document.getElementById('monedaTipo').addEventListener('change', async (e) => {
    const moneda = e.target.value
    dolarData = await obtenerDatosDolarAPI(moneda, 30)
    console.log("si")
    cargarFilas(dolarData)
})

