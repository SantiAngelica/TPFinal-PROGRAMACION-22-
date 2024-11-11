document.getElementById('formulario-contacto').addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const informacion = document.getElementById('info').value;
    try {
      fetch('http://127.0.0.1:8080/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          info: informacion,
        }),
      })
      .then(response => response.text())
      .then(data => {
          document.getElementById('mensaje-enviado').innerText = data;
          
      })
    } catch (error) {
      document.getElementById('mensaje-enviado').innerText = 'Error al enviar el formulario';
    }
  });