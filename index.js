const express = require('express');
//const Router = express.Router();
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// CREAR EL SERVIDOR DE EXPRESS
const app = express();

// BASE DE DATOS
dbConnection();

// CORS
app.use(cors());


// LECTURA Y PARSEO DE BODY
app.use( express.json() );

//RUTAS
// Router.get('/auth', (req, res) => {
//     try {
//         console.log('entrando');
//         res.status(201).json({
//             ok: true,
//             message: 'RESPONDIENDO'
//         });
//     } catch (error) {
//         console.log(error);
//     }
// });
// app.use('/api', Router);

// ROLES ROUTE
app.use('/api/role', require('./routes/roles'));

// AUTH ROUTE
app.use('/api/auth', require('./routes/auth'));

// USERS ROUTE
app.use('/api/user', require('./routes/users'));

// ESCUCHA PETICIONES
app.listen(process.env.PORT, () => {
    console.log(`SERVIDOR ESCUCHANDO PETICIONES EN PUERTO ${process.env.PORT}`);
});
