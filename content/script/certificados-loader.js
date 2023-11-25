document.addEventListener('DOMContentLoaded', function () {
    carregarCertificados();
    
    document.getElementById('ordenarPor').addEventListener('change', function () {
        carregarCertificados();
    });
});

function carregarCertificados() {
    let opcaoSelecionada = document.getElementById('ordenarPor').value;
    let lingua = document.documentElement.lang;
    // console.log(lingua);
    fetch('../content/database/certificados.json')
        .then(response => response.json())
        .then(todosCertificados => {
            let certificados = todosCertificados[lingua] || [];
            aplicarOrdenacao(certificados, opcaoSelecionada);
            montarCertificados(certificados);
        });
}

function aplicarOrdenacao(data, opcaoSelecionada) {
    switch(opcaoSelecionada) {
        case 'alfabeticaCrescente':
            data.sort((a, b) => a.titulo.localeCompare(b.titulo));
            break;
        case 'alfabeticaDecrescente':
            data.sort((a, b) => b.titulo.localeCompare(a.titulo));
            break;
        case 'dataCrescente':
            data.sort((a, b) => new Date(a.dataConclusao) - new Date(b.dataConclusao));
            break;
        case 'dataDecrescente':
            data.sort((a, b) => new Date(b.dataConclusao) - new Date(a.dataConclusao));
            break;
        case 'duracaoCrescente':
            data.sort((a, b) => extrairHoras(a.horas) - extrairHoras(b.horas));
            break;
        case 'duracaoDecrescente':
            data.sort((a, b) => extrairHoras(b.horas) - extrairHoras(a.horas));
            break;
    }
}

document.getElementById('ordenarPor').addEventListener('change', function () {
    
});

function extrairHoras(horasTexto) {
    if (horasTexto === "") {
        return 0;
    }
    let horas = parseInt(horasTexto.match(/(\d+)/)[0]);
    return horas || 0;
}

async function montarCertificados(certificados) {
    let container = document.querySelector('#container-certificados');
    container.innerHTML = '';

    let lingua = document.documentElement.lang;

    for (let certificado of certificados) {
        let div = document.createElement('div');
        div.className = 'certificados_item';

        let data = await formatarData(certificado.dataConclusao);
        let horas = certificado.horas === '' ? '' : `${certificado.horas}h`;

        let htmlContent = `
            <img class="certificado_img" src="${certificado.imagem}">
            <p class="certificado_text">
                <span class="certificado_titulo">${certificado.titulo}</span>
                <br>
                <span class="certificado_origem">${certificado.origem}</span>
                <br>
                <span class="certificado_data">${data}</span>
                <br>
                <span class="certificado_horas">${horas}</span>
            </p>
        `;

        div.innerHTML = htmlContent;

        container.appendChild(div);
    }
}


function compararDatas(dataA, dataB) {
    let dateA = converterParaData(dataA);
    let dateB = converterParaData(dataB);
    return dateA - dateB;
}

function converterParaData(data) {
    let partes = data.split('-');
    let ano = partes[0];
    let mes = partes[1] ? partes[1] : '12'; // Usa dezembro como mês padrão para datas incompletas
    return new Date(ano, mes - 1);
}

async function formatarData(data) {
    let lingua = document.documentElement.lang;
    let partes = data.split('-');
    let ano = partes[0];
    let mes = partes[1];
    let mes_Nome = await converterMesParaNome(mes);
    if(lingua == 'pt-BR'){
        console.log(mes_Nome);
        return mes ? `${mes_Nome} de ${ano}` : `${ano}`;
    }
    else if(lingua == 'ja-JP'){
        // Adicione a formatação para o idioma japonês aqui.
    }
    else /* en-US */ {
        return mes ? `${mes_Nome} ${ano}` : `${ano}`;
    }
}

async function converterMesParaNome(mes) {
    let lingua = document.documentElement.lang;
    return fetch('../content/database/certificados-meses.json')
        .then(response => response.json())
        .then(data => {
            let meses = data[lingua] || [];
            return meses[parseInt(mes) - 1];
        });
}