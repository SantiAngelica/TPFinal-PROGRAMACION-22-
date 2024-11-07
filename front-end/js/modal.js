const btnMail = document.getElementById("btn_mail")
const modalContainer = document.getElementById("modal_container")
const btnClose = document.getElementById("btn_close")
const email = document.getElementById('input_email')
const btnEnviar = document.getElementById('enviar_pedido')
import { obtenerDatosDolarAPI } from "./obtenerHist.js"
import { obtenerPagina } from "./historico.js"

btnEnviar.addEventListener('click', async () => {
    if (email) {
        const location = window.location.pathname
        if (location == '/front-end/html/historico.html') {
            
            let { ACTUAL_COIN, ACTUAL_PAGE } = obtenerPagina()
            const data = await obtenerDatosDolarAPI(ACTUAL_COIN, ACTUAL_PAGE)
            fetch(`http://127.0.0.1:8080/api/enviarmail/${email.value}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({pedido: data})
            })
            if (location == "/front-end/index.html") {
                fetch("http://127.0.0.1:8080/api/cotizaciones")
                    .then(response => response.json())
                    .then(results => { 
                        fetch(`http://127.0.0.1:8080/api/enviarmail/${email.value}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({pedido: results})
                        })
                    })
            }
        }
    }
})





btnMail.addEventListener("click", () => {
    console.log()
    modalContainer.style.display = "flex"
    document.body.style.position = "static"
    document.body.style.height = "100%"
    document.body.style.overflow = "hidden"

})

btnClose.addEventListener("click", () => {
    modalContainer.style.display = "none"
    document.body.style.position = "inherit"
    document.body.style.height = "auto"
    document.body.style.overflow = "visible"
})

