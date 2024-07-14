import { mostrarJsonEnHtml, enviarFormulario } from "./request.js";
import { mostrarModalEditarUsuario } from "./modal.js";

const token = sessionStorage.getItem('token');
if (!token) {
    window.location.href = './index.html';
}
if (sessionStorage.getItem('profile') !== 'admin') {
    window.location.href = './index.html';
}
const nameUser = sessionStorage.getItem('nameUser');
document.getElementById('user').innerHTML = `Bienvenido ${nameUser}`;

const formRequest = document.getElementById('form-request');
const url = document.getElementById('url');
const method = document.getElementById('method');
const enviar = document.getElementById('enviar');

method.addEventListener('change', () => {
    if (method.value === 'PUT' || method.value === 'POST') {
        const textArea = document.createElement('textarea');
        textArea.id = 'requestBody';
        textArea.name="jsonInput"; 
        textArea.rows="10"; 
        textArea.cols="30";
        textArea.placeholder='{"key": "value"}';
        formRequest.insertBefore(textArea, enviar);
    } else {
        document.getElementById('requestBody').remove();
    }
})

formRequest.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tieneBody = method.value === 'PUT' || method.value === 'POST';
    if (!tieneBody) {
        mostrarJsonEnHtml(url.value,token, method.value);
    } else {
        const textArea = document.getElementById('requestBody');
        const json = textArea.value;
        try {
            JSON.parse(json);
            alert("El JSON es válido");
        } catch (e) {
            alert("El JSON no es válido: " + e.message);
        }
        const body = JSON.stringify(json);
        const data = await enviarFormulario(body, url.value, token, method.value);
        if (data.error) {
            alert(data.error);
            return;
        }
        results.innerHTML = JSON.stringify(data,null,2);
    }
})


const botonEditarUsuario = document.getElementById('boton-editar-usuario');
botonEditarUsuario.addEventListener('click', () => mostrarModalEditarUsuario(token));