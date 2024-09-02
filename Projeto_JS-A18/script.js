async function carregarProdutos() {
    const URL_API = 'https://fakestoreapi.com/products'
    try {
        const resposta = await fetch(URL_API)
        const produtos = await resposta.json()
        mostrarProdutos(produtos)
    } catch (erro) {
        console.error('Erro ao buscar produtos:', erro)
    }
}

function truncarTexto(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...'
    }
    return text
}

let carrinho = []

function adicionarAoCarrinho(produto) {
    const itemExistente = carrinho.find(item => item.id === produto.id)
    if (itemExistente) {
        itemExistente.quantidade += 1
    } else {
        carrinho.push({ ...produto, quantidade: 1 })
    }
    atualizarCarrinho()
    document.getElementById('carrinho').scrollIntoView({ behavior: 'smooth' })
}

function atualizarCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho')
    const resumoDiv = document.getElementById('resumo')
    carrinhoDiv.innerHTML = ''
    resumoDiv.innerHTML = ''

    if (carrinho.length === 0) {
        carrinhoDiv.innerHTML = '<p class="alert alert-warning">O carrinho está vazio.</p>'
        return
    }

    let total = 0

    carrinho.forEach(item => {
        const col = document.createElement('div')
        col.className = 'col-md-3 mb-4'

        const card = document.createElement('div')
        card.className = 'card h-100'

        const img = document.createElement('img')
        img.className = 'card-img-top'
        img.src = item.image
        img.alt = item.title

        const cardBody = document.createElement('div')
        cardBody.className = 'card-body'

        const cardTitle = document.createElement('h5')
        cardTitle.className = 'card-title'
        cardTitle.innerText = item.title

        const quantidade = document.createElement('p')
        quantidade.className = 'card-text'
        quantidade.innerText = `Quantidade: ${item.quantidade}`

        const cardPrice = document.createElement('p')
        cardPrice.className = 'card-text'
        cardPrice.innerText = `R$ ${item.price}`

        const totalItem = document.createElement('p')
        totalItem.className = 'card-text'
        totalItem.innerText = `Total: R$ ${(item.price * item.quantidade).toFixed(2)}`

        const buttonGroup = document.createElement('div')
        buttonGroup.className = 'button-group'

        const btnIncrementar = document.createElement('button')
        btnIncrementar.className = 'btn btn-success m-1'
        btnIncrementar.innerHTML = '<i class="bi bi-plus-lg"></i>'
        btnIncrementar.onclick = () => alterarQuantidade(item.id, 1)

        const btnDecrementar = document.createElement('button')
        btnDecrementar.className = 'btn btn-warning m-1'
        btnDecrementar.innerHTML = '<i class="bi bi-dash-lg"></i>'
        btnDecrementar.onclick = () => alterarQuantidade(item.id, -1)

        const btnRemover = document.createElement('button')
        btnRemover.className = 'btn btn-danger m-1'
        btnRemover.innerHTML = '<i class="bi bi-trash"></i>'
        btnRemover.onclick = () => removerDoCarrinho(item.id)

        buttonGroup.appendChild(btnIncrementar)
        buttonGroup.appendChild(btnDecrementar)
        buttonGroup.appendChild(btnRemover)

        total += item.price * item.quantidade

        cardBody.appendChild(cardTitle)
        cardBody.appendChild(quantidade)
        cardBody.appendChild(cardPrice)
        cardBody.appendChild(totalItem)
        cardBody.appendChild(buttonGroup)
        card.appendChild(img)
        card.appendChild(cardBody)
        col.appendChild(card)
        carrinhoDiv.appendChild(col)
    })

    const resumo = document.createElement('div')
    resumo.className = 'alert alert-info'
    resumo.innerText = `Total do Carrinho: R$ ${total.toFixed(2)}`
    resumoDiv.appendChild(resumo)
}

function alterarQuantidade(id, quantidade) {
    const item = carrinho.find(item => item.id === id)
    if (item) {
        item.quantidade += quantidade
        if (item.quantidade <= 0) {
            removerDoCarrinho(id)
        } else {
            atualizarCarrinho()
        }
    }
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id)
    atualizarCarrinho()
}

function mostrarProdutos(produtos) {
    const produtosDiv = document.getElementById('produtos')
    produtosDiv.innerHTML = ''

    produtos.forEach(produto => {
        const col = document.createElement('div')
        col.className = 'col-md-3 mb-4'

        const card = document.createElement('div')
        card.className = 'card h-100'

        const img = document.createElement('img')
        img.className = 'card-img-top'
        img.src = produto.image
        img.alt = produto.title

        const cardBody = document.createElement('div')
        cardBody.className = 'card-body'

        const cardTitle = document.createElement('h5')
        cardTitle.className = 'card-title'
        cardTitle.innerText = produto.title

        const cardDescription = document.createElement('p')
        cardDescription.className = 'card-text'
        cardDescription.innerText = truncarTexto(produto.description, 200)

        const cardPrice = document.createElement('p')
        cardPrice.className = 'card-text'
        cardPrice.innerText = `R$ ${produto.price}`

        const buttonGroup = document.createElement('div')
        buttonGroup.className = 'button-group'
        
        const addButton = document.createElement('button')
        addButton.className = 'btn btn-outline-success btn-sm m-1'
        addButton.innerText = 'Adicionar ao Carrinho'
        addButton.onclick = () => adicionarAoCarrinho(produto)

        const detalhesButton = document.createElement('button')
        detalhesButton.className = 'btn btn-outline-primary btn-sm m-1'
        detalhesButton.innerText = 'Detalhes do produto'
        detalhesButton.onclick = () => mostrarDetalhes(produto)

        buttonGroup.appendChild(addButton)
        buttonGroup.appendChild(detalhesButton)
        
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardDescription)
        cardBody.appendChild(cardPrice)
        cardBody.appendChild(buttonGroup)
        card.appendChild(img)
        card.appendChild(cardBody)
        col.appendChild(card)
        produtosDiv.appendChild(col)
    })
}

function mostrarDetalhes(produto) {
    const titulo = document.getElementById('titulo')
    const descricao = document.getElementById('descricao')
    const poster = document.getElementById('poster')
    const categoria = document.getElementById('categoria')
    const preco = document.getElementById('preco')
    const avaliacao = document.getElementById('avaliacao')

    titulo.innerText = produto.title
    descricao.innerText = produto.description
    poster.src = produto.image
    categoria.innerText = produto.category
    preco.innerText = `R$ ${produto.price}`
    avaliacao.innerText = produto.rating.rate

    const detalhesModal = new bootstrap.Modal(document.getElementById('detalhes'))
    detalhesModal.show()
}

carregarProdutos()