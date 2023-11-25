const DEFAULT_PAGE = "intros";
const SELECTION_CONTAINER = "selection-container";

let lingua;
let itens;

document.addEventListener('DOMContentLoaded', function (){
    lingua = document.documentElement.lang;
    CarregarPortfolio_Itens()
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
            console.log(menus, keys);
            keys.forEach(key => {
                if(key){
                    let menu_key = translated_keys[lingua][key].toString();
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

        console.log(p);

        container.appendChild(p);
    });
}

function CarregarPortfolio_Itens(){
    return fetch('../content/database/portfolios.json')
        .then(response => response.json())
        .then(portfolio_itens => {
            itens = portfolio_itens[lingua] || [];
        })
}

function MostrarPortfolio_Itens(category){
    fetch('../content/database/portfolio-default_titles.json')
        .then(response => response.json())
        .then(titles => {
            let defaultTitle = titles[lingua][category];
            itens = itens[category];
            let container = document.getElementById('items_page');
            container.innerHTML = '';

            itens.forEach(item => {
                let image_class = "";
                let div = document.createElement('div');
                div.className = "portfolio_item";

                if(item.imagens.length == 1) {
                    image_class = "solo";
                } 

                let htmlContent = `
                    <h2>${defaultTitle} <span style="color: red;">${item.titulo}</span></h2>
                    <p>${item.versao}</p>
                    <div class="portfolio_item_img_grid">
                        ${item.imagens.map(imagem => `<img class="${image_class}" src="${imagem}">`).join('')}
                    </div>
                    <hr>
                `;

                div.innerHTML = htmlContent;

                container.appendChild(div);
            });
        })
}