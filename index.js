const express = require('express');
const Router = express.Router();
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// CREAR EL SERVIDOR DE EXPRESS
const app = express();

// BASE DE DATOS
dbConnection();

// CORS
app.use(cors());

//RUTAS
Router.get('/auth', (req, res) => {

    try {
    
        console.log('entrando');

        res.status(201).json({
            ok: true,
            message: 'RESPONDIENDO'
        });

    } catch (error) {
        console.log(error);
    }

});

app.use('/api', Router);

// ESCUCHA PETICIONES
app.listen(process.env.PORT, () => {
    console.log(`SERVIDOR ESCUCHANDO PETICIONES EN PUERTO ${process.env.PORT}`);
});
