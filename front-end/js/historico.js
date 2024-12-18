let dolarData
import { obtenerDatosDolarAPI } from "./obtenerHist.js";
import { renderizarEstadisticas } from "./renderStats.js";

let nextButton = document.getElementById('next-button')
let lastButton = document.getElementById('last-button')
const nextDate = document.getElementById('next-date')
const lastDate = document.getElementById('last-date')

let ACTUAL_COIN
let ACTUAL_PAGE

export function obtenerPagina(){
    return {ACTUAL_COIN, ACTUAL_PAGE}
}


const manager = async (moneda, page) => {
    dolarData = await obtenerDatosDolarAPI(moneda, page)
    actualizarBotones(dolarData)
	await renderizarEstadisticas(dolarData.payload);
}

function actualizarBotones(data){
    if (data.page > 1) {
        lastDate.innerText = data.lastPageDates; 
        lastButton.style.display = "flex";         
    } else {
        lastButton.style.display = "none";         
    }
    nextDate.innerText = data.nextPageDates;
    ACTUAL_PAGE = data.page
}


nextButton.addEventListener('click',async  () => {
    ACTUAL_PAGE += 1
    await manager(ACTUAL_COIN, ACTUAL_PAGE)
})
lastButton.addEventListener('click',async  () => {
    ACTUAL_PAGE -= 1
    await manager(ACTUAL_COIN, ACTUAL_PAGE)
})


document.addEventListener('DOMContentLoaded', async () => {
    ACTUAL_COIN = "oficial"
    ACTUAL_PAGE = 1
    await manager(ACTUAL_COIN, ACTUAL_PAGE)
})

document.getElementById('monedaTipo').addEventListener('change', async (e) => {
    const moneda = e.target.value
    ACTUAL_COIN = moneda
    ACTUAL_PAGE = 1
    await manager(ACTUAL_COIN, ACTUAL_PAGE)
})




