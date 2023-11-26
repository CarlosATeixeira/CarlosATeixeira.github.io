const LINGUA = document.documentElement.lang;
let MESES_NOMES = null;

async function IniciarMesesNomes(){
    if (MESES_NOMES !== null) {
        return Promise.resolve(MESES_NOMES);
    }

    return fetch('../content/database/certificados-meses.json')
        .then(response => response.json())
        .then(data => {
            MESES_NOMES = data[LINGUA] || [];
            return MESES_NOMES;
    });
}

IniciarMesesNomes();

document.addEventListener('DOMContentLoaded', function () {
    carregarCertificados();
    
    document.getElementById('ordenarPor').addEventListener('change', function () {
        carregarCertificados();
    });
});

function carregarCertificados() {
    let opcaoSelecionada = document.getElementById('ordenarPor').value;
    // console.log(LINGUA);
    fetch('../content/database/certificados.json')
        .then(response => response.json())
        .then(todosCertificados => {
            let certificados = todosCertificados[LINGUA] || [];
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
    let partes = data.split('-');
    let ano = partes[0];
    let mes = parseInt(partes[1]);
    let mes_Nome = await MESES_NOMES[mes-1];
    if(LINGUA == 'pt-BR'){
        console.log(mes_Nome);
        return mes ? `${mes_Nome} de ${ano}` : `${ano}`;
    }
    else if(LINGUA == 'ja-JP'){
        // Adicione a formatação para o idioma japonês aqui.
    }
    else /* en-US */ {
        return mes ? `${mes_Nome} ${ano}` : `${ano}`;
    }
}

function converterMesParaNome(mes) {
    return fetch('../content/database/certificados-meses.json')
        .then(response => response.json())
        .then(data => {
            let meses = data[LINGUA] || [];
            return meses;
        });
}