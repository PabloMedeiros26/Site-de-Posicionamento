const abriCalculadora = document.getElementById('abrirCalculadora')
const calcular = document.getElementById('calcular')

const historico = document.getElementById('historico')
const valorSalvo = []

calcular.addEventListener('click', clicar)
abriCalculadora.addEventListener('click', abrir)
function abrir () {
    const calculadora = document.getElementById('calculadora')
    calculadora.classList.toggle('aberto')
}



function clicar() {
    let espessura = Number(document.getElementById('espessura').value)
    let constante = Number(document.getElementById('constante').value)    
    const resultado = document.getElementById('resultado')

    if(isNaN(espessura) || isNaN(constante)) {
        resultado.textContent = 'Digite apenas numeros para calcular'
        return
    }
    
    let calculo = (2 * espessura) + constante
    resultado.textContent = `Kv ideal: ${calculo}`

    valorSalvo.push(calculo)
    const novoArray = valorSalvo.map((item) => {
        return `<li>${item}</li>`
    })

    historico.innerHTML = novoArray.join("")
    
    
    document.getElementById('espessura').value = ""
    document.getElementById('constante').value = ""
}