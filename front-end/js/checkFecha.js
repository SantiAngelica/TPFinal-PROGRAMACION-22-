export function verificarFechaActualizada(fecha){
    const fechaActual = new Date()
    const fechaCotiz = new Date(fecha)
    const difMiliSeg = fechaActual - fechaCotiz
    const difDias = Math.floor( difMiliSeg / (1000 * 60 * 60 * 24))
    if(difDias > 3) return false
    else return true
}