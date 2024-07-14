import { mostrarJsonEnHtml } from "./request.js";
import { mostrarModalEditarUsuario } from "./modal.js";

const token = sessionStorage.getItem('token');
if (!token) {
    window.location.href = './index.html';
}
if (sessionStorage.getItem('profile') !== 'user') {
    window.location.href = './index.html';
}
const nameUser = sessionStorage.getItem('nameUser');

document.getElementById('user').innerHTML = `Bienvenido ${nameUser}`;
const botonPeliculas = document.getElementById('traer-peliculas');
const botonDirectores = document.getElementById('traer-directores');
const botonUsuarios = document.getElementById('traer-usuarios');
const botonComentarios = document.getElementById('traer-comentarios');

const botonEditarUsuario = document.getElementById('editar-usuario');

botonPeliculas.addEventListener('click', () => mostrarJsonEnHtml('movies', token));
botonDirectores.addEventListener('click',() => mostrarJsonEnHtml('directors', token));
botonUsuarios.addEventListener('click',() => mostrarJsonEnHtml('users', token));
botonComentarios.addEventListener('click',() => mostrarJsonEnHtml('comments', token));
botonEditarUsuario.addEventListener('click',() =>  mostrarModalEditarUsuario(token));