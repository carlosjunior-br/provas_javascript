const url = 'https://dog.ceo/api/breeds/list/all'
const btnListaRacas = document.getElementById('btn-lista-racas')
const listaRacasContainer = document.getElementById('lista-racas')
const galeriaImagensContainer = document.getElementById('galeria-imagens')

// Função para obter a lista de raças usando async / await
async function obterListaRacas() {
    try {
        exibirCarregando(listaRacasContainer) // Exibe a mensagem de carregamento
        const resposta = await fetch(url)
        if (!resposta.ok) {
            throw new Error('Erro ao buscar a lista de raças')
        }
        const dados = await resposta.json()
        const racas = dados.message
        setTimeout(() => exibirBotoesRacas(racas), 2000)
    } catch (erro) {
        tratarErro(erro, listaRacasContainer)
    }
}

// Função para exibir os botões das raças
function exibirBotoesRacas(racas) {
    listaRacasContainer.innerHTML = ''
    Object.keys(racas).forEach(raca => {
        const botao = document.createElement('button')
        botao.className = 'btn btn-primary m-2'
        botao.textContent = raca
        botao.addEventListener('click', () => {
            obterImagensRaca(raca)
            galeriaImagensContainer.scrollIntoView({ behavior: 'smooth' })
        })
        listaRacasContainer.appendChild(botao)
    })
}

// Função para obter imagens de uma raça específica usando async / await
async function obterImagensRaca(raca) {
    try {
        exibirCarregando(galeriaImagensContainer) // Exibe a mensagem de carregamento
        const resposta = await fetch(`https://dog.ceo/api/breed/${raca}/images/random/4`)
        if (!resposta.ok) {
            throw new Error('Erro ao buscar as imagens da raça')
        }
        const dados = await resposta.json()
        const imagens = dados.message
        setTimeout(() => exibirImagens(imagens), 2000)
    } catch (erro) {
        tratarErro(erro, galeriaImagensContainer)
    }
}

// Função para exibir as imagens
function exibirImagens(imagens) {
    galeriaImagensContainer.innerHTML = ''
    imagens.forEach(imagemUrl => {
        const img = document.createElement('img')
        img.src = imagemUrl
        img.className = 'img-fluid card m-2'
        img.alt = 'Imagem de cachorro'
        galeriaImagensContainer.appendChild(img)
    })
}

// Função para tratar erros
function tratarErro(erro, container) {
    console.error('Ocorreu um erro:', erro)
    container.innerHTML = ''
    const mensagemErro = document.createElement('p')
    mensagemErro.className = 'text-danger'
    mensagemErro.textContent = erro
    // mensagemErro.textContent = 'Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.'
    container.appendChild(mensagemErro)
}

// Função para exibir uma mensagem de carregamento
function exibirCarregando(container) {
    container.innerHTML = ''
    const mensagemCarregando = document.createElement('p')
    mensagemCarregando.className = 'text-info text-center'
    mensagemCarregando.textContent = 'Carregando...'
    container.appendChild(mensagemCarregando)
}

btnListaRacas.addEventListener('click', obterListaRacas)