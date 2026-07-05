const express = require('express')
const app = express()
const fs = require('fs')
const cor = require('cors')
const rota = require('./rotas/incidencia')

app.use(cor())
app.use(rota)

const porta = process.env.PORT || 3000
app.listen(porta, function() {
    console.log('servidor rodando')
}) 