export const mostrarModalEditarUsuario =  async (token) => {
    const response = await fetch(`http://localhost:8000/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    const data = await response.json();
    const modal = document.getElementsByClassName('modal')[0];
    const contenidoModal = `
        <div id="modal-content">
            <span id="close">&times;</span>
            <h2>Editar usuario</h2>
            <form id="form-user">
                <label for="name">Nombre</label>
                <input type="text" name="name" id="name" value="${data[0].name}">
                <label for="lastname">Apellidos</label>
                <input type="text" name="lastname" id="lastname" value="${data[0].lastname}">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" value="${data[0].email}">
                <label for="email">Password</label>
                <input type="password" name="password" id="password">
                <input type="submit" value="Editar usuario">
            </form>
        </div>
    `;
    modal.innerHTML = contenidoModal;
    modal.style.display = 'block';
    const cerrarModal = document.getElementById('close');
    cerrarModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    /*
    const formUser = document.getElementById('form-user');
    formUser.addEventListener('submit', async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value
        });
        const data = await enviarFormulario( body, 'users', token);
        if (data.error) {
            alert(data.error);
            return;
        } 
        alert(data.message);
        redirect();
    })*/
}
