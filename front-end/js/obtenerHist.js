export const obtenerDatosDolarAPI = async (moneda, limit) => {
	try {
		const request = await fetch(`https://api.argentinadatos.com/v1/cotizaciones/dolares/${moneda}`, {
			method: 'GET',
		});
		const response = await request.json();

		if (response.length <= limit) {
			return response;
		} else {
			return response.slice(-limit);
		}
	} catch (error) {
		console.error(error);
	}
};