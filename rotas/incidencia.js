const express = require('express')
const rota = express.Router()
const fs = require('fs')

rota.get('/incidencia', function(req, res){
    const dados = fs.readFileSync('./dados/incidencia.json', 'utf-8')
    const requi = JSON.parse(dados)
    
    res.send(requi)
    
} )

rota.get('/categoria', function(req, res) {
    const dados = fs.readFileSync('./dados/incidencia.json', 'utf-8')
    const requi = JSON.parse(dados)
    const result = requi.map(function(incidencia) {
        return incidencia.categoria
    })
    const unica = [...new Set(result)]
    res.send(unica)

})

rota.get('/incidencia/categoria/:categoria', function(req, res) {
    const name = req.params.categoria
    const dados = fs.readFileSync('./dados/incidencia.json', 'utf-8')
    const requi = JSON.parse(dados)
    const result = requi.filter(function(incidencia) {
        return incidencia.categoria === name
        })

    if(result.length === 0) {
        return res.status(404).send('Pagina nao encontrada')
    }

    res.send(result)
})

rota.get('/incidencia/:nome', function(req, res) {
    const name = req.params.nome
    const dados = fs.readFileSync('./dados/incidencia.json', 'utf-8')
    const requi = JSON.parse(dados)
    const result = requi.filter(function(incidencia) {
        return incidencia.nome.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    })
    res.send(result)

})

module.exports = rota