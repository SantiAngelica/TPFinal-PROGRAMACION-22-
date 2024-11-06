from abc import ABC, abstractmethod

class Moneda(ABC):
    def __init__(self, nombre, moneda):
        #self.nombre = nombre
        self.set_nombre(nombre)
        self.set_moneda(moneda)
    
    def get_moneda(self):
        return self.moneda
    
    def set_moneda(self, moneda):
        self.moneda = moneda


    def get_nombre(self):
        return self.nombre
    
    def set_nombre(self, nombre):
        self.nombre = nombre

# Herencia
class Tipo(Moneda):
    def __init__(self, nombre, moneda,  nombre_tipo):
        Moneda.__init__(self, nombre, moneda)
        self.set_nombre_tipo(nombre_tipo)

    def get_nombre_tipo(self):
        return self.nombre_tipo
    
    def get_cotizaciones(self):
        for cot in self.cotizaciones:
            print(cot)
    
    def set_nombre_tipo(self, nombre_tipo):
        self.nombre_tipo = nombre_tipo

    def set_cotizaciones(self, cotizaciones):
        self.cotizaciones = cotizaciones

    def add_cotizacion(self, cotizacion):
        self.cotizaciones.append(cotizacion)
    
    def to_dict(self):
        return {
            "moneda": self.moneda,
            "casa": self.nombre_tipo,
            "nombre": self.nombre
        }
    
    def __str__(self):
        return f"Moneda: {self.get_nombre()} | Tipo de moneda: {self.get_nombre_tipo()}"


class Cotizacion:
    def __init__(self, valor_compra, valor_venta, fecha_actualizacion):
        self.set_valor_compra(valor_compra)
        self.set_valor_venta(valor_venta)
        self.set_fecha_actualizacion(fecha_actualizacion)

    def get_valor_compra(self):
        return self.valor_compra
    
    def get_valor_venta(self):
        return self.valor_venta
    
    def get_fecha_actualizacion(self):
        return self.fecha_actualizacion
    
    def set_valor_compra(self, valor_compra):
        self.valor_compra = valor_compra

    def set_valor_venta(self, valor_venta):
        self.valor_venta = valor_venta

    def set_fecha_actualizacion(self, fecha_actualizacion):
        self.fecha_actualizacion = fecha_actualizacion
    
    def to_dict(self):
        return {
            "compra": self.valor_compra,
            "venta": self.valor_venta,
            "fechaActualizacion": self.fecha_actualizacion
        }
        
    def __str__(self):
        return f"Compra: {self.get_valor_compra()} | Venta: {self.get_valor_venta()} | Fecha Actualización: {self.get_fecha_actualizacion()}"




