const formContato = document.getElementById("form-contato")
const listaContatos = document.getElementById("lista-contatos")
const adicionarNovoContatoTitulo = document.getElementById('adicionar-novo-contato-titulo')
const botaoFormContato = document.getElementById("botao-form-contato")
const nome = document.getElementById("nome")
const telefone = document.getElementById("telefone")
const email = document.getElementById("email")

// Função para carregar contatos do LocalStorage
function carregarContatos() {
    const contatos = JSON.parse(localStorage.getItem('contatos')) || []
    return contatos
}

// Função para salvar contatos no LocalStorage
function salvarContatos(contatos) {
    localStorage.setItem('contatos', JSON.stringify(contatos))
}

// Função para adicionar contato ao DOM
function adicionarContatoDOM(contato) {
    const contatoCard = document.createElement('div')
    contatoCard.classList.add('col-md-4', 'mb-3')
    contatoCard.innerHTML = `
        <div class="card">
        <div class="card-body">
            <h5 class="card-title">${contato.nome}</h5>
            <p class="card-text"><strong>Telefone:</strong> ${contato.telefone}</p>
            <p class="card-text"><strong>E-mail:</strong> ${contato.email}</p>
            <button class="btn btn-warning btn-editar" data-id="${contato.id}">Editar</button>
            <button class="btn btn-danger btn-excluir" data-id="${contato.id}">Excluir</button>
        </div>
        </div>
    `
    listaContatos.appendChild(contatoCard)
}

// Função para adicionar novo contato
function adicionarContato(evento) {
    evento.preventDefault()
    const novoContato = {
        id: Date.now(),
        nome: nome.value,
        telefone: telefone.value,
        email: email.value
    }

    const contatos = carregarContatos()
    contatos.push(novoContato)
    salvarContatos(contatos)
    adicionarContatoDOM(novoContato)
    formContato.reset()
    console.log(novoContato)
}

// Função para editar contato
function editarContato(id) {
    const contatos = carregarContatos()
    const contato = contatos.find(contato => contato.id === id)
    if (contato) {
        adicionarNovoContatoTitulo.textContent = "Editar Contato"
        botaoFormContato.textContent = "Salvar Contato"
        nome.focus()
        nome.value = contato.nome
        telefone.value = contato.telefone
        email.value = contato.email
        formContato.removeEventListener("submit", adicionarContato)
        formContato.onsubmit = (evento) => {
            evento.preventDefault()
            contato.nome = nome.value
            contato.telefone = telefone.value
            contato.email = email.value
            salvarContatos(contatos)
            location.reload()
            adicionarNovoContatoTitulo.textContent = "Adicionar Novo Contato"
            botaoFormContato.textContent = "Adicionar Contato"
            formContato.addEventListener("submit", adicionarContato)
        }
    }
}

// Função para excluir contato
function excluirContato(id) {
    let contatos = carregarContatos()
    contatos = contatos.filter(contato => contato.id !== id)
    salvarContatos(contatos)
    location.reload()
}

// Função para inicializar os contatos na tela
function inicializarContatos() {
    const contatos = carregarContatos()
    contatos.forEach(contato => adicionarContatoDOM(contato))
}

document.addEventListener("DOMContentLoaded", () => {
    listaContatos.addEventListener('click', (evento) => {
      if (evento.target.classList.contains('btn-editar')) {
        const id = parseInt(evento.target.getAttribute('data-id'))
        editarContato(id)
      }
  
      if (evento.target.classList.contains('btn-excluir')) {
        const id = parseInt(evento.target.getAttribute('data-id'))
        excluirContato(id)
      }
    })
  
    formContato.addEventListener("submit", adicionarContato)
    inicializarContatos()
})