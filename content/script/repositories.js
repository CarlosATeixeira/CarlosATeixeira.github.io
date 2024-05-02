window.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.github.com/repos/CarlosATeixeira/LRC_to_text_renderer/readme', {
            headers: { 'Accept': 'application/vnd.github.VERSION.raw' }
        })
        .then(response => response.text())
        .then(markdown => {
            document.getElementById('content').innerHTML = marked(markdown);
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
    
});

