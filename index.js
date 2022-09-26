// config inicial
// Importação de dependência:

require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const personRoutes = require('./routes/personRoutes');


// Habilitar uma forma de ler e enviar JSON / middlewares:

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

app.use('/person', personRoutes);



// Rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!' })
})


// Entregar porta:
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.b648wkg.mongodb.net/?retryWrites=true&`)
    .then(() => {
        console.log('Conectado ao MongoDB')
        app.listen(3000);
    })
    .catch((err) => console.log(err))
