const DEFAULT_PAGE = "intros";
const SELECTION_CONTAINER = "selection-container";

const LINGUA = document.documentElement.lang;

let itens = null;
let default_titles = null;

async function CarregarPortfolio_Itens(){
    if(itens !== null){
        return Promise.resolve(itens);
    }

    return fetch('../content/database/portfolios.json')
        .then(response => response.json())
        .then(portfolio_itens => {
            itens = portfolio_itens[LINGUA] || [];
        })
}

async function CarregarPortfolio_default_titles(){
    if(default_titles !== null){
        return Promise.resolve(default_titles);
    }

    return fetch('../content/database/portfolio-default_titles.json')
                .then(response => response.json())
                .then(titles => {
                    default_titles = titles[LINGUA];
                    console.log(default_titles);
                })
}

document.addEventListener('DOMContentLoaded', function (){
    CarregarPortfolio_Itens()
        .then(CarregarPortfolio_default_titles())
        .then(() => Start());
    
})

function Start(){
    let keys = [];
    let menus = [];

    for(let key in itens){
        if(!key.includes("_")){
            keys.push(key);
        }
    }
    
    fetch('../content/database/portfolios-menu.json')
        .then(response => response.json())
        .then(translated_keys => {
            //console.log(menus, keys);
            keys.forEach(key => {
                if(key){
                    let menu_key = translated_keys[LINGUA][key].toString();
                    menus.push(menu_key);
                    
                }
            });

            MakeMenu(menus, keys);

            MostrarPortfolio_Itens(DEFAULT_PAGE);
        });
}

function MakeMenu(menus, keys){
    let container = document.getElementById(SELECTION_CONTAINER);

    menus.forEach(menu => {
        
        let p = document.createElement('p');

        p.onclick = () => {
            CarregarPortfolio_Itens()
                .then(() => MostrarPortfolio_Itens(keys[menus.indexOf(menu)]));
        };

        p.innerHTML = menu;

        //console.log(p);

        container.appendChild(p);
    });
}

function MostrarPortfolio_Itens(category){
    let defaultTitle = default_titles[category];
    let current_itens = itens[category];
    let container = document.getElementById('items_page');
    container.innerHTML = '';

    current_itens.forEach(item => {
        let image_class = "";
        let div = document.createElement('div');
        div.className = "portfolio_item";

        if(item.imagens.length == 1) {
            image_class = "solo";
        } 

        let htmlContent = `
            <h2>${defaultTitle} <span class="highlight">${item.titulo}</span></h2>
            <p>${item.versao}</p>
            <div class="portfolio_item_img_grid">
                ${item.imagens.map(imagem => `<img class="${image_class}" src="${imagem}">`).join('')}
            </div>
            <hr>
        `;

        div.innerHTML = htmlContent;

        container.appendChild(div);
    });
}