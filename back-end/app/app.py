from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from clases import  Tipo 
from clases import  Cotizacion 
from fechaOrd import ordenarFecha
from enviarmail import sendEmail
cotizacionArray = []
dolaresArray  = []
app = Flask(__name__)
CORS(app)

@app.route('/api/cotizaciones')
def cotizaciones():
    cotizacionArray = []
    try:
         response = requests.get("https://dolarapi.com/v1/cotizaciones")
         if response.status_code == 200:
             datos = response.json()
             
             for moneda in datos:
                   cotizacion = Cotizacion(moneda["compra"], moneda["venta"], moneda["fechaActualizacion"])
                   tipomoneda = Tipo(moneda["nombre"] ,moneda["moneda"],moneda["casa"])
                   cotizacion_data = {
                    "cotizacion": cotizacion.to_dict(),
                    "tipo": tipomoneda.to_dict()
                    }
                   cotizacionArray.append(cotizacion_data)

             return jsonify(cotizacionArray)
         else:
            return jsonify({"error": "No se pudo obtener los datos"}), response.status_code
    except requests.exceptions.RequestException as e:
            return jsonify({"error": "Error de conexión"}), 500

@app.route('/api/dolares')
def dolares():
    dolaresArray = []
    try:
        response = response = requests.get("https://dolarapi.com/v1/dolares")
        if response.status_code == 200:
            datos = response.json()
            
            for moneda in datos:
                   cotizacion = Cotizacion(moneda["compra"], moneda["venta"], moneda["fechaActualizacion"])
                   tipomoneda = Tipo(moneda["nombre"] ,moneda["moneda"],moneda["casa"])
                   cotizacion_data = {
                    "cotizacion": cotizacion.to_dict(),
                    "tipo": tipomoneda.to_dict()
                    }
                   dolaresArray.append(cotizacion_data)
            return jsonify(dolaresArray)
        else:
            return jsonify({"error": "No se pudo obtener los datos"}), response.status_code
    except requests.exceptions.RequestException as e:
            return jsonify({"error": "Error de conexión"}), 500


@app.route('/api/historico/<string:moneda>')
def historico(moneda):
    page = request.args.get('page', default=1, type=int) 
    try:
        response = requests.get(f"https://api.argentinadatos.com/v1/cotizaciones/dolares/{moneda}")
        if (response.status_code == 200) & (page > 0):
            datos = response.json()
            datos.reverse()
            last = page * 20
            first = last - 20
            numeros_filtrados = datos[first:last]
            lastPage = page - 1
            nextPage = page + 1
            firstNextPage = ordenarFecha(datos[last]["fecha"])
            lastNextPage = ordenarFecha(datos[last + 19]["fecha"])
            firstLastPage = ordenarFecha(datos[first - 20]["fecha"])
            lastLastPage = ordenarFecha(datos[first - 1]["fecha"])
            data = {
                "payload": numeros_filtrados,
                "page": page,
                "lastPage": lastPage,
                "nextPage": nextPage,
                "coin": moneda,
                "nextPageDates": f"Del {lastNextPage} hasta el {firstNextPage}",
                "lastPageDates": f"Del {lastLastPage} hasta el {firstLastPage}"
            }
            return jsonify(data)
        else: 
            return jsonify({"error": "No se pudo obtener los datos"}), response.status_code
    except requests.exceptions.RequestException as e:
            return jsonify({"error": "Error de conexión"}), 500


@app.route('/api/enviarmail/<string:email>', methods=['POST'])
def enviarEmail(email):
    data = request.json  
    coin = data.get("coin")
    page = data.get("page")
    try:
        if coin == "cotizaciones":
             data = cotizacionArray
        elif coin == 'dolares':
             data = dolaresArray
        else:
            historico_response = requests.get(f"http://127.0.0.1:8080/api/historico/{coin}", params={"page": page})
            data = historico_response.json()

        respuestaEnvio = sendEmail(email, "Equipo de COTIZACIONES", data)
        return ("ENVIADO!", respuestaEnvio)
    except:
        return jsonify({"error":"error de conexion"}), 500

@app.route('/api/contacto', methods=['POST'])
def contacto():
    nombre = request.json.get('nombre')
    email = request.json.get('email')
    informacion = request.json.get('info')
    try:
        print(informacion)
        respuestaEnvio = sendEmail('santiangelica410@gmail.com', f"{nombre} - {email}", informacion, 'contacto')
        return ("Formulario enviado correctamente")
    except:
        return jsonify({"error":"error de conexion"}), 500



if __name__ == '__main__':
    app.run(debug=True, port=8080)


 