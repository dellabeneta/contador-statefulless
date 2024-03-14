const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const os = require('os');
const redis = require('redis');

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || "6379";

const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});

redisClient.on('error', (error) => {
    console.error(`Redis error: ${error}`);
});

redisClient.connect();

app.get('/', async (req, res) => {
    
    let contador = await redisClient.get('contador_acessos');
    contador = contador ? parseInt(contador) + 1 : 1;
    await redisClient.set('contador_acessos', contador);
    res.render('index',{"acessos": contador, "maquina": os.hostname()});
});    

app.listen(8080);

console.log('Aplicação rodando na porta 8080');
