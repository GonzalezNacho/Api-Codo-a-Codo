export async function mostrarJsonEnHtml(query, token = null, method = 'GET') {
    const Authorization = token ? `Bearer ${token}` : '';
    const response = await fetch(`http://localhost:8000${query}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization
        },
    });
    const data = await response.json();
    results.innerHTML = JSON.stringify(data,null,2);
}

export async function enviarFormulario( body, url, token = null, method = 'POST') {
    const Authorization = token ? `Bearer ${token}` : '';
    const config = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization
        },
        body,
    }
    console.log(typeof(body));
    const response = await fetch(`http://localhost:8000${url}`, config);
    const data = await response.json();
    return data;
}