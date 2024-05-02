document.addEventListener('DOMContentLoaded', (event) => {
    const resumoLink = document.getElementById('resumo');
    const experienciaLink = document.getElementById('experiencia');
    const certificadosLink = document.getElementById('certificados');
    const portfolioLink = document.getElementById('portfolio');
    const contatoLink = document.getElementById('contato');
    const repoLink = document.getElementById('repositorios');

    if (document.getElementsByClassName("resume_page").length > 0) {
        resumoLink.classList.add('active-page');
    } else if (document.getElementsByClassName("portfolio_page").length > 0) {
        portfolioLink.classList.add('active-page');
    } else if (document.getElementsByClassName("experience_page").length > 0) {
        experienciaLink.classList.add('active-page');
    } else if (document.getElementsByClassName("contact_page").length > 0) {
        contatoLink.classList.add('active-page');
    } else if (document.getElementsByClassName("repo_page").length > 0) {
        repoLink.classList.add('active-page');
    } else if (document.getElementsByClassName("certificated_pages").length > 0) {
        certificadosLink.classList.add('active-page');
    }
});
