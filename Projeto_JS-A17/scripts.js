const API_KEY = 'ece30da9f7571f4be1c2c9790c8be87b'
const FILMES_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`
const SERIES_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=pt-BR`
const CARROSSEL_URL = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=pt-BR`

async function carregarCatalogo(url) {
    try {
        const resposta = await fetch(url)
        const data = await resposta.json()
        mostrarCatalogo(data.results)
    } catch (error) {
        console.error('Erro ao buscar dados:', error)
    }
}

async function carregarCarrossel(url) {
    try {
        const resposta = await fetch(url)
        const data = await resposta.json()
        mostrarCarrossel(data.results)
    } catch (error) {
        console.error('Erro ao carregar carrossel:', error)
    }
}

function mostrarCarrossel(items) {
    const carouselIndicators = document.getElementById('carousel-indicators')
    const carouselInner = document.getElementById('carousel-inner')

    items.forEach((item, index) => {
        const indicator = document.createElement('button')
        indicator.type = 'button'
        indicator.setAttribute('data-bs-target', '#carrosselBanners')
        indicator.setAttribute('data-bs-slide-to', index)
        if (index === 0) indicator.classList.add('active')
        carouselIndicators.appendChild(indicator)

        const carouselItem = document.createElement('div')
        carouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`

        const img = document.createElement('img')
        img.src = `https://image.tmdb.org/t/p/w780${item.backdrop_path}`
        img.alt = item.title || item.name
        carouselItem.appendChild(img)

        const carouselCaption = document.createElement('div')
        carouselCaption.className = 'carousel-caption d-none d-md-block'
        const title = document.createElement('h5')
        title.innerText = item.title || item.name
        const description = document.createElement('p')
        description.innerText = item.overview
        carouselCaption.appendChild(title)
        carouselCaption.appendChild(description)
        carouselItem.appendChild(carouselCaption)
        carouselInner.appendChild(carouselItem)

        carouselItem.addEventListener('click', () => mostrarDetalhes(item))
    })
}

function mostrarCatalogo(items) {
    const catalogo = document.getElementById('catalogo')
    catalogo.innerHTML = ''

    items.forEach(item => {
        if (!item.overview) {
            return
        }
        const col = document.createElement('div')
        col.className = 'col-md-3 mb-4'

        const card = document.createElement('div')
        card.className = 'card h-100'

        const img = document.createElement('img')
        img.className = 'card-img-top'
        img.src = `https://image.tmdb.org/t/p/w780${item.backdrop_path}`
        img.alt = item.title || item.name

        const cardBody = document.createElement('div')
        cardBody.className = 'card-body'

        const cardTitle = document.createElement('h5')
        cardTitle.className = 'card-title'
        cardTitle.innerText = item.title || item.name

        const cardText = document.createElement('p')
        cardText.className = 'card-text'
        cardText.innerText = truncarTexto(item.overview, maxCaracteresParaExibirNoOverview)

        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardText)
        card.appendChild(img)
        card.appendChild(cardBody)
        col.appendChild(card)
        catalogo.appendChild(col)

        card.addEventListener('click', () => mostrarDetalhes(item))
    })
}

function mostrarDetalhes(item) {
    const titulo = document.getElementById('titulo')
    const descricao = document.getElementById('descricao')
    const poster = document.getElementById('poster')
    const dataLancamento = document.getElementById('data-lancamento')
    const avaliacao = document.getElementById('avaliacao')

    titulo.innerText = item.title || item.name
    descricao.innerText = item.overview
    poster.src = `https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`

    dataLancamento.innerText = formatarDataBrasileira(item.release_date || item.first_air_date)
    avaliacao.innerText = item.vote_average ? `${item.vote_average} / 10` : 'N/A'

    const detalhesModal = new bootstrap.Modal(document.getElementById('detalhes'))
    detalhesModal.show()
}

function definirAtivo(elemento) {
    document.querySelector('.navbar-nav .active').classList.remove('active')
    elemento.classList.add('active')
}

function truncarTexto(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...'
    }
    return text
}

function formatarDataBrasileira(data) {
    if (!data) return 'N/A'
    
    const dataObjeto = new Date(data)
    return dataObjeto.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

const menuFilmes = document.getElementById('menu-filmes')
const menuSeries = document.getElementById('menu-series')
let maxCaracteresParaExibirNoOverview = 200

menuFilmes.addEventListener('click', (event) => {
    carregarCatalogo(FILMES_URL)
    definirAtivo(event.target)
})

menuSeries.addEventListener('click', (event) => {
    carregarCatalogo(SERIES_URL)
    definirAtivo(event.target)
})

document.addEventListener('DOMContentLoaded', () => {
    carregarCatalogo(FILMES_URL)
    carregarCarrossel(CARROSSEL_URL)
})