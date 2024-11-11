export const obtenerMes = mes => {
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


export const obtenerFechaFormateada = function (fechaSinFormatear) {
	const anio = fechaSinFormatear.slice(0, 4);
	const mes = obtenerMes(fechaSinFormatear.slice(5, 7));
	let dia = fechaSinFormatear.slice(8, 10);
	if (dia[0] == 0) {
		dia = dia.slice(-1);
	}
	const fechaFormateada = `${dia} de ${mes} del ${anio}`;
	return fechaFormateada;
};


