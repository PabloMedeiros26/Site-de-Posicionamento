const buscar = document.getElementById('pesquisa') // varaivel do inout que vai pegar o que foi digitado
const botao = document.getElementById('botao') // sera usado para criar um evento para dispara
const sup = document.getElementById('superior')
const inf = document.getElementById('inferior')
const volta = document.getElementById('voltar')
const inicial = document.getElementById('inicial')
const incidencias = document.getElementById('incidencias')
let secao
let categoriaatual = ''

 buscar.addEventListener('input', () =>{
            secao = document.querySelectorAll('section[data-categoria]') // sera usado para procurar todas as seçoes na pagina
            const palavra = buscar.value.split(' ')
            secao.forEach(incidencia => { // aqui o foreach vai fazer uma busca por todas as sections
                const nome = incidencia.getAttribute('data-nome')
                const tags = incidencia.getAttribute('data-tags')
                const categoria = incidencia.getAttribute('data-categoria')
                const encontrado = palavra.every(p => normalizar(nome).includes(normalizar(p)))

                if(categoria === categoriaatual && (encontrado || (tags && palavra.every(p => normalizar(tags).includes(normalizar(p)))))) {
                      incidencia.style.display = 'block'
                } else {
                      incidencia.style.display = 'none'
                } 
            })
            
        })

function mostrarCategoria(procurar) {
    secao = document.querySelectorAll('section[data-categoria]')
    
    inicial.style.display = 'none'
    incidencias.style.display = 'block'
    document.getElementById('container').style.display = 'block'

    secao.forEach(incidencia => {
        const categoria = incidencia.getAttribute('data-categoria')

        if (categoria === procurar) {
            incidencia.style.display = 'block'
        }else {
            incidencia.style.display = 'none'
        }
    })

        const calculadora = document.getElementById('calculadora')
        if(calculadora) {
            calculadora.classList.remove('aberto')
        }
    
    categoriaatual = procurar
}


sup.addEventListener('click', () => mostrarCategoria('membros superiores'))
inf.addEventListener('click', () => mostrarCategoria('membros inferiores'))

        volta.addEventListener('click', () => {

            inicial.style.display = 'flex'
            incidencias.style.display = 'none'
            document.getElementById('container').style.display = 'none'
         })

         const calculadora = document.getElementById('calculadora')
         if(calculadora) {
            calculadora.classList.remove('aberto')
         }

function normalizar(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}


async function carregarincid() {
    try {
        const resposta = await fetch('http://localhost:3000/incidencia')
        const dados = await resposta.json()
        
        dados.forEach(element => {
            const secao = document.createElement('section')
            secao.setAttribute('data-nome', element.nome)
            secao.setAttribute('data-categoria', element.categoria)

                secao.innerHTML = `
                <div class="cabecalho">
                <button>${element.nome}</button>
                </div>

                <div class="conteudo">
                <p><strong>Anatomia Demonstrada:</strong> ${element.anatomia.join(', ')}</p>
                <p><strong>Critérios de Avaliação:</strong> ${element.criterios.join(', ')}
                <p><strong>Chassi:</strong> ${element.tecnica.chassi}</p>
                <p><strong>Raio Central(RC):</strong> ${element.tecnica.rc}</p>
                <p><strong>DFF:</strong> ${element.tecnica.dff}</p>
                <p><strong>Patologias:</strong> ${element.patologias.join(', ')}</p>
                <div class="imagem-grid"></div>
                </div>`

                const cabecalho = secao.querySelector('.cabecalho')
                const conteudo = secao.querySelector('.conteudo')
                const imagemGrid = secao.querySelector('.imagem-grid')
                
                cabecalho.addEventListener ('click', () =>{  // accordion: linha que vai esconder e mostrar o conteudo
                    document.querySelectorAll('.conteudo').forEach(c=> {
                        c.classList.remove('aberto')
                    })
                    conteudo.classList.add('aberto')
                })

            if(element.imagem) {
                element.imagem.forEach(src => {
                const imagem = document.createElement('img')
                imagem.src = src
                imagemGrid.appendChild(imagem)
            })
            }

                incidencias.appendChild(secao)
        })

    }catch(erro) {
        console.log('Algo inesperado aconteceu', erro)
    }
}
carregarincid()


