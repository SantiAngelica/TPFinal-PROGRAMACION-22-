const btnMail = document.getElementById("btn_mail")
const modalContainer = document.getElementById("modal_container")
const btnClose = document.getElementById("btn_close")




btnMail.addEventListener("click", () => {
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

