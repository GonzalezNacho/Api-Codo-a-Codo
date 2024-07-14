export async function mostrarJsonEnHtml(query, token = null) {
    const Authorization = token ? `Bearer ${token}` : '';
    const response = await fetch(`http://localhost:8000/${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization
        },
    });
    const data = await response.json();
    results.innerHTML = JSON.stringify(data,null,2);
}

export async function enviarFormulario( body, url, token = null) {
    const Authorization = token ? `Bearer ${token}` : '';
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization
        },
        body,
    }
    const response = await fetch(`http://localhost:8000/${url}`, config);
    const data = await response.json();
    return data;
}