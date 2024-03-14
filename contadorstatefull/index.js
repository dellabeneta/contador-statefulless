const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const os = require('os')

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

let contador = 0;

app.get('/', async (req, res) => {
    contador++;
    res.render('index',{"acessos": contador, "maquina": os.hostname()});
})

app.listen(8080);

console.log('Aplicação rodando na porta 8080');
