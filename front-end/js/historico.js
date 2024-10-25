import { cargarFilas } from "./renderTable.js";
let dolarData
const histograma = document.getElementById('histograma');
import { obtenerDatosDolarAPI } from "./obtenerHist.js";


const calcularValorMaximo = arr => {
	let maxValue = arr[0].venta;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i].venta > maxValue) {
			maxValue = arr[i].venta;
		}
	}
	return maxValue;
};

const mostrarEscalaValores = maxValue => {
	const escalaDeValoresContenedor = document.createElement('div');
	escalaDeValoresContenedor.classList.add('escala_valores_contenedor');
	escalaDeValoresContenedor.style.height = '100%';
	histograma.appendChild(escalaDeValoresContenedor);
	const stepValue = Math.ceil(maxValue / 1000) * 100;

	for (let i = 0; i <= Math.floor(maxValue / stepValue); i++) {
		const etiquetaValor = document.createElement('span');
		const valor = i * stepValue;
		etiquetaValor.textContent = valor;
		etiquetaValor.classList.add('etiqueta_valor');
		escalaDeValoresContenedor.appendChild(etiquetaValor);
	}

	if (maxValue % stepValue !== 0) {
		const etiquetaValorMax = document.createElement('span');
		etiquetaValorMax.textContent = maxValue;
		etiquetaValorMax.classList.add('etiqueta_valor');
		escalaDeValoresContenedor.appendChild(etiquetaValorMax);
	}
};

const mostrarColumnasHistograma = (dolarData, maxValue) => {
	for (let i = 0; i < dolarData.length; i++) {
		// Defino el elemento columna y le agrego los estilos
		const histogramaColumn = document.createElement('div');
		const porcentajeVentaTotal = (dolarData[i].venta / maxValue) * 100;
		histogramaColumn.classList.add('histograma_column');
		histogramaColumn.style.height = `${porcentajeVentaTotal}%`;

		// Mostrar el valor exacto de cada cifra
		const histogramaColumnValueToast = document.createElement('div');
		histogramaColumnValueToast.classList.add('histograma_toast');
		const fecha = obtenerFechaFormateada(dolarData[i].fecha); // "dd de mm del aaaa"
		histogramaColumnValueToast.textContent = `El ${fecha} el precio era de $ ${dolarData[i].venta}`;

		histogramaColumn.appendChild(histogramaColumnValueToast);
		histograma.appendChild(histogramaColumn);
	}
};

const obtenerFechaFormateada = function (fechaSinFormatear) {
	const anio = fechaSinFormatear.slice(0, 4);
	const mes = obtenerMes(fechaSinFormatear.slice(5, 7));
	let dia = fechaSinFormatear.slice(8, 10);
	if (dia[0] == 0) {
		dia = dia.slice(-1);
	}
	const fechaFormateada = `${dia} de ${mes} del ${anio}`;
	return fechaFormateada;
};

const obtenerMes = mes => {
	let nroMes;
	if (mes[0] == '0') {
		nroMes = mes.slice(-1);
	} else {
		nroMes = mes;
	}
	const meses = [
		'enero',
		'febrero',
		'marzo',
		'abril',
		'mayo',
		'junio',
		'julio',
		'agosto',
		'septiembre',
		'octubre',
		'noviembre',
		'diciembre',
	];
	return meses[nroMes - 1];
};

const renderizarEstadisticas = async (dolarData) => {
	dolarData.reverse()
	cargarFilas(dolarData)
	const maxValue = await calcularValorMaximo(dolarData);
	console.log(dolarData[0].casa, dolarData)
	histograma.innerHTML = ''
	mostrarEscalaValores(maxValue);
	mostrarColumnasHistograma(dolarData, maxValue);
};



document.addEventListener('DOMContentLoaded', async () => {
    dolarData = await obtenerDatosDolarAPI('oficial', 30)
	await renderizarEstadisticas(dolarData);
})

document.getElementById('monedaTipo').addEventListener('change', async (e) => {
    const moneda = e.target.value
    dolarData = await obtenerDatosDolarAPI(moneda, 30)
	await renderizarEstadisticas(dolarData);
})




