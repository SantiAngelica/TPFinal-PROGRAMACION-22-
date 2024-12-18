import { capitalizarPrimeraLetra } from './mayusFirst.js';

const tableHist = document.getElementById('table_hist');

export function cargarFilas(dolarData) {
	tableHist.innerHTML = '';
	dolarData.forEach(e => {
		const tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${capitalizarPrimeraLetra(e.casa)}</td>
			<td>${e.compra.toFixed(2)}</td>
			<td>${e.venta.toFixed(2)}</td>
			<td>${e.fecha}</td>
		`;
		tableHist.append(tr);
	});
}
