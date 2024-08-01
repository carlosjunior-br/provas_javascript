let saldo = 1000

const operacao = document.getElementById('operacao')
const valor = document.getElementById('valor')
const realizar = document.getElementById('realizar')
const resultado = document.getElementById('resultado')

realizar.addEventListener('click', () => {
    const operacaoSelecionada = operacao.value
    const valorTransacao = Number(valor.value)

    try {
        if (isNaN(valorTransacao) || valorTransacao < 0) {
            throw new Error('Por favor, insira um valor válido.')
        }

        if (operacaoSelecionada === 'saldo') {
            resultado.textContent = `Seu saldo é R$ ${saldo.toFixed(2)}`
        } else if (operacaoSelecionada === 'sacar') {
            if (valorTransacao > saldo) {
                throw new Error('Saldo insuficiente para realizar esta operação.')
            }
            saldo -= valorTransacao
            resultado.textContent = `Você sacou R$ ${valorTransacao.toFixed(2)}. Seu saldo agora é R$ ${saldo.toFixed(2)}`
        } else if (operacaoSelecionada === 'depositar') {
            saldo += valorTransacao
            resultado.textContent = `Você depositou R$ ${valorTransacao.toFixed(2)}. Seu saldo agora é R$ ${saldo.toFixed(2)}`
        }
    } catch (erro) {
        resultado.textContent = erro.message
    }
})