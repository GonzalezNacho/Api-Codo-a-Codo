import { mostrarJsonEnHtml } from "./request.js";

const botonPeliculas = document.getElementById('traer-peliculas');
const botonDirectores = document.getElementById('traer-directores');
const formUser = document.getElementById('form-user');
const email = document.getElementById('email');
const password = document.getElementById('password');
const name = document.getElementById('name');
const lastname = document.getElementById('lastname');

botonPeliculas.addEventListener('click', () => mostrarJsonEnHtml('movies'));
botonDirectores.addEventListener('click',() => mostrarJsonEnHtml('directors'));
formUser.addEventListener('submit', createUser);

async function createUser(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value
        }),
    });
    const data = await response.json();
    alert(data);
}