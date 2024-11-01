from flask import Flask, jsonify, request
import requests
app = Flask(__name__)

@app.route('/cotizaciones')
def cotizaciones():
    try:
         response = requests.get("https://dolarapi.com/v1/cotizaciones")
         if response.status_code == 200:
             datos = response.json()
             return jsonify(datos)
         else:
            return jsonify({"error": "No se pudo obtener los datos"}), response.status_code
    except requests.exceptions.RequestException as e:
            return jsonify({"error": "Error de conexión"}), 500

@app.route('/historico/<string:moneda>')
def historico(moneda):
    page = request.args.get('page', default=1, type=int) 
    try:
        response = requests.get(f"https://api.argentinadatos.com/v1/cotizaciones/dolares/{moneda}")
        if response.status_code == 200:
            datos = response.json()
            datos.reverse()
            last = page * 20
            first = last - 20
            numeros_filtrados = datos[first:last]
            return jsonify(numeros_filtrados)
        else: 
            return jsonify({"error": "No se pudo obtener los datos"}), response.status_code
    except requests.exceptions.RequestException as e:
            return jsonify({"error": "Error de conexión"}), 500



if __name__ == '__main__':
    app.run(debug=True, port=8080)


 