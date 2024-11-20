document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const form = document.getElementById('myForm');
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;

    //Obligatorio validación de datos
    if (!name.trim()) {
        alert("Por favor escribe tu nombre");
        return;
    }
    if (!email.includes("@")) {
        alert("Por favor escribe un correo válido");
        return;
    }

    //API FETCH
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
        .then(response => response.json())
        .then(data => {
            alert('Form submitted successfully: ' + data.messsage);
        })
        .catch(error => {
            console.error('Error: ', error);
            alert('Failed to submit the form');
        });
});
