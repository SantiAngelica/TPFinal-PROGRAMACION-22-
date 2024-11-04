export const obtenerDatosDolarAPI = async (moneda, page) => {
	try {
		const request = await fetch(`http://127.0.0.1:8080/api/historico/${moneda}?page=${page}`, {
			method: 'GET',
		});
		const response = await request.json();
		return response
	} catch (error) {
		console.error(error);
	}
};