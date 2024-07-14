export async function mostrarJsonEnHtml(query) {
    const response = await fetch(`http://localhost:8000/${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    console.log(data[0]);
    results.innerHTML = JSON.stringify(data,null,2);
}
