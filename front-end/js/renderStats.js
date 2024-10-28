
import { cargarFilas } from "./renderTable.js";
import { mostrarEscalaValores, mostrarColumnasHistograma } from "./renderGrafico.js";


export const calcularValorMaximo = (arr, grafico) => {
	let maxValue = arr[0][grafico];

	for (let i = 0; i < arr.length; i++) {
		if (arr[i][grafico] > maxValue) {
			maxValue = arr[i][grafico];
		}
	}
	return maxValue;
};

export const renderizarEstadisticas = async (dolarData) => {
	dolarData.reverse()
	cargarFilas(dolarData)
	const maxValueVenta = await calcularValorMaximo(dolarData, 'venta');
	mostrarEscalaValores(maxValueVenta, 'venta');
	mostrarColumnasHistograma(dolarData, maxValueVenta, 'venta');
    const maxValueCompra = await calcularValorMaximo(dolarData, 'compra');
    mostrarEscalaValores(maxValueCompra, 'compra');
	mostrarColumnasHistograma(dolarData, maxValueCompra, 'compra');
};