const btnListaRacas = document.getElementById('btn-lista-racas')
const listaRacasContainer = document.getElementById('lista-racas')
const galeriaImagensContainer = document.getElementById('galeria-imagens')

// Função para obter a lista de raças
const obterListaRacas = () => {
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(resposta => resposta.json())
        .then(dados => {
            const racas = dados.message
            exibirBotoesRacas(racas)
        })
        .catch(erro => tratarErro(erro))
}

// Função para exibir os botões das raças
const exibirBotoesRacas = (racas) => {
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

// Função para obter imagens de uma raça específica
const obterImagensRaca = (raca) => {
    fetch(`https://dog.ceo/api/breed/${raca}/images/random/4`)
        .then(resposta => resposta.json())
        .then(dados => {
            const imagens = dados.message
            exibirImagens(imagens)
        })
        .catch(erro => tratarErro(erro))
}

// Função para exibir as imagens
const exibirImagens = (imagens) => {
    galeriaImagensContainer.innerHTML = '' // Limpar galeria anterior
    imagens.forEach(imagemUrl => {
        const img = document.createElement('img')
        img.src = imagemUrl
        img.className = 'img-fluid card'
        img.alt = 'Imagem de cachorro'
        galeriaImagensContainer.appendChild(img)
    })
}

// Função para tratar erros
const tratarErro = (erro) => {
    console.error('Ocorreu um erro:', erro)
    const mensagemErro = document.createElement('p')
    mensagemErro.className = 'text-danger'
    mensagemErro.textContent = 'Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.'
    galeriaImagensContainer.appendChild(mensagemErro)
}

btnListaRacas.addEventListener('click', obterListaRacas)