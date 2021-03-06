import { fetchDados } from "./fetchDados.js"

const buttonSearch = document.querySelector("[data-search-filmes]");
const divLoading = document.querySelector("[data-loading]");
const listaFilmes = document.querySelector("[data-lista-filmes]");
const mensagem = document.querySelector("[data-mensagem]");

const createElement = tag => {
    return document.createElement(tag);
}

const appendElemento = (reference, elemento) => {
    reference.append(elemento);
}

const limparListaFilmes = () => {
  listaFilmes.innerHTML = "";
};

const exibirMensagem = () => {
    mensagem.innerHTML = `
        <h1>Ocorreu um problema</h1>
        <p>Erro na busca dos dados no servidor.</p>
    `;
    mensagem.classList.add("mensagem");
}

const esconderMensagem = () => {
    mensagem.innerHTML = "";
    mensagem.classList.remove("mensagem");
}

const criarCardFilme = filme => {

    const box = createElement('div')
    const title = createElement('h2');
    const resumo = createElement('p');
    const ano = createElement('span');
    const genero = createElement('span');

    title.textContent = filme.title;
    resumo.textContent = filme.resumo;
    ano.textContent = filme.ano;
    genero.textContent = filme.genero;

    appendElemento(box, title)
    appendElemento(box, resumo)
    appendElemento(box, ano)
    appendElemento(box, genero)
    listaFilmes.append(box);
}

const exibirDados = () => {

    limparListaFilmes();
    esconderMensagem();
    divLoading.classList.add('loading');

    fetchDados("/data/db.json")
        .then(filmes => {

            setTimeout(() => {
                divLoading.classList.remove('loading');
                filmes.forEach(criarCardFilme);
            }, 2000)
        })
        .catch(() => {

            setTimeout(() => {
              divLoading.classList.remove("loading");
              exibirMensagem();
            }, 2000);
        })

};

buttonSearch.addEventListener('click', exibirDados);