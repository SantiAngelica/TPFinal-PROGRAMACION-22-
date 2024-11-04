
import { obtenerFechaFormateada } from "./fecha.js";
let histograma


const actualizarContenedor = grafico => {
    histograma = document.getElementById(`histograma_${grafico}`)
}




export const mostrarEscalaValores = (maxValue, grafico) => {
    actualizarContenedor(grafico)
    histograma.innerHTML = ''
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

export const mostrarColumnasHistograma = (dolarData, maxValue, grafico) => {
    console.log(grafico)
	for (let i = 0; i < dolarData.length; i++) {
		// Defino el elemento columna y le agrego los estilos
		const histogramaColumn = document.createElement('div');
		const porcentajeVentaTotal = (dolarData[i][grafico] / maxValue) * 100;
		histogramaColumn.classList.add('histograma_column');
		histogramaColumn.style.height = `${porcentajeVentaTotal}%`;

		// Mostrar el valor exacto de cada cifra
		const histogramaColumnValueToast = document.createElement('div');
		histogramaColumnValueToast.classList.add('histograma_toast');
		const fecha = obtenerFechaFormateada(dolarData[i].fecha); // "dd de mm del aaaa"
		histogramaColumnValueToast.textContent = `El ${fecha} el precio era de $ ${dolarData[i][grafico]}`;

		histogramaColumn.appendChild(histogramaColumnValueToast);
		histograma.appendChild(histogramaColumn);
	}
};