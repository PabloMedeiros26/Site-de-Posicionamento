const buscar = document.getElementById('pesquisa') // varaivel do inout que vai pegar o que foi digitado
const botao = document.getElementById('botao') // sera usado para criar um evento para dispara
const sup = document.getElementById('superior')
const inf = document.getElementById('inferior')
const volta = document.getElementById('voltar')
let categoriaatual = ''

 buscar.addEventListener('input', () =>{
            const secao = document.querySelectorAll('section') // sera usado para procurar todas as seçoes na pagina
            secao.forEach(incidencia => { // aqui o foreach vai fazer uma busca por todas as sections
                const nome = incidencia.getAttribute('data-nome')
                const tags = incidencia.getAttribute('data-tags')
                const categoria = incidencia.getAttribute('data-categoria')
                const palavra = buscar.value.split(' ')
                const encontrado = palavra.every(p => normalizar(nome).includes(normalizar(p)))

                if(categoria === categoriaatual && (encontrado || (tags && normalizar(tags).includes(normalizar(buscar.value))))) {
                      incidencia.style.display = 'block'
                } else {
                      incidencia.style.display = 'none'
                } 
            })
            
        })


        sup.addEventListener('click', () => {
            const secao = document.querySelectorAll('section')
            const inicial = document.getElementById('inicial')
            const incidencias = document.getElementById('incidencias')

            inicial.style.display = 'none'
            incidencias.style.display = 'block'
            document.getElementById('container').style.display = 'block'
            
            secao.forEach(incidencia => {
                const categoria = incidencia.getAttribute('data-categoria')
                if(categoria ==='membros superiores') {
                    incidencia.style.display = 'block'
                }else {
                    incidencia.style.display = 'none'
                }
            })
            categoriaatual = 'membros superiores'
        })


        inf.addEventListener('click', () => {
            const secao = document.querySelectorAll('section')
            const inicial = document.getElementById('inicial')
            const incidencias = document.getElementById('incidencias')

            inicial.style.display = 'none'
            incidencias.style.display = 'block'
            document.getElementById('container').style.display = 'block'

            secao.forEach(incidencia => {
                const categoria = incidencia.getAttribute('data-categoria')
                if(categoria === 'membros inferiores'){
                    incidencia.style.display = 'block'
                }else {
                    incidencia.style.display = 'none'
                }    
            })
            categoriaatual = 'membros inferiores'
        })

        volta.addEventListener('click', () => {
            const inicial = document.getElementById('inicial')
            const incidencias = document.getElementById('incidencias')

            inicial.style.display = 'block'
            incidencias.style.display = 'none'
            document.getElementById('container').style.display = 'none'
         })
        

function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}


async function carregarincid() {
        const resposta = await fetch('http://localhost:3000/incidencia')
        const dados = await resposta.json()

        dados.forEach(element => {
            const secao = document.createElement('section')
            secao.setAttribute('data-nome', element.nome)
            secao.setAttribute('data-categoria', element.categoria)
            
            
                if(element.tags) {
                    secao.setAttribute('data-tags', element.tags.join(','))
                }

            const titulo = document.createElement('h2')
            const paragrafo = document.createElement('p')
            const paragrafo2 = document.createElement('p')
            const paragrafo3 = document.createElement('p')
            const incidencias = document.getElementById('incidencias')
            

            titulo.textContent = element.nome
            paragrafo.textContent = `Chassi: ${element.tecnica.chassi}`
            paragrafo2.textContent = `Raio Central: ${element.tecnica.rc}`
            paragrafo3.textContent = `DFF: ${element.tecnica.dff}`
            


            secao.appendChild(titulo)
            secao.appendChild(paragrafo)
            secao.appendChild(paragrafo2)
            secao.appendChild(paragrafo3)
            if(element.imagem) {
                const imagem = document.createElement('img')
                imagem.src = element.imagem
                secao.appendChild(imagem)
            }
            
            incidencias.appendChild(secao)
                

        });
    
}
carregarincid()