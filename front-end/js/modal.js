const btnMail = document.getElementById("btn_mail")
const modalContainer = document.getElementById("modal_container")
const modalContainerMail = document.getElementById('modal_container_mail')
const btnClose = document.getElementById("btn_close")
const email = document.getElementById('input_email')
const btnEnviar = document.getElementById('enviar_pedido')
import { obtenerDatosDolarAPI } from "./obtenerHist.js"



function ModalMail() {
    modalContainerMail.style.display = "flex"
    document.body.style.position = "static"
    document.body.style.height = "100%"
    document.body.style.overflow = "hidden"
    new Promise(resolve => setTimeout(resolve, 3000))
        .then(() => {
            modalContainerMail.style.display = "none"
            document.body.style.position = "inherit"
            document.body.style.height = "auto"
            document.body.style.overflow = "visible"
        });
}

function desmontarModal() {
    modalContainer.style.display = "none"
    document.body.style.position = "inherit"
    document.body.style.height = "auto"
    document.body.style.overflow = "visible"
}

async function POSTalMail( ACTUAL_COIN, ACTUAL_PAGE) {
    fetch(`http://127.0.0.1:8080/api/enviarmail/${email.value}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ coin: ACTUAL_COIN, page: ACTUAL_PAGE })
    })
        .then(res => {
            if (res.status == 200) {
                desmontarModal()
                ModalMail()
            }
        })
}



btnEnviar.addEventListener('click', async () => {
    if (email) {
        const location = window.location.pathname
        if (location == "/front-end/index.html") {
            await POSTalMail("cotizaciones", null)
        }

        if (location == '/front-end/html/historico.html') {
            const { obtenerPagina } = await import('./historico.js');
            let { ACTUAL_COIN, ACTUAL_PAGE } = obtenerPagina()
            await POSTalMail(ACTUAL_COIN, ACTUAL_PAGE)
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



btnClose.addEventListener("click", desmontarModal)

