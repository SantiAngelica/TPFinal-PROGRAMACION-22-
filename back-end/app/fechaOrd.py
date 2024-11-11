from datetime import datetime

def ordenarFecha(fecha):
    fecha_objeto = datetime.strptime(fecha, '%Y-%m-%d')
    fecha_ordenada = fecha_objeto.strftime('%d-%m-%Y')
    return fecha_ordenada