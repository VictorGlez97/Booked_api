const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Role = require('../models/Role');

const { generateSign } = require('../helpers/sign');

const CreateUser = async( req, res = response ) => {

    try {

        const { alias, pass } = req.body;
        // console.log( req.body );

        let user = await User.findOne({ alias })

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'ERROR: USUARIO YA REGISTRADO'
            });
        }

        user = new User( req.body );

        //ENCRIPT PASS
        const salt = bcrypt.genSaltSync();
        user.pass = bcrypt.hashSync( pass, salt );

        await user.save();

        const token = generateSign( user.id, user.name );

        //console.log( token );

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADM'
        });

    }

}

const LoginUser = async( req, res = response ) => {

    const { alias, pass } = req.body;

    try {
        
        let user = await User.findOne({ alias });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'ERROR: USUARIO NO ENCONTRADO'
            })
        }

        const validPass = bcrypt.compareSync( pass, user.pass );

        if ( !validPass ) {
            return res.status(400).json({
                ok: false,
                msg: 'ERROR: CLAVE INCORRECTA'
            });
        }

        const token = generateSign( user.id, user.name, user.role.name );

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            msg: 'Bienvenido',
            token
        });

    } catch (error) {
        
        console.log( error );

        res.status(500).json({
            ok: false,
            msg: 'ERROR: LLAME A UN ADM'
        })

    }

}
 
module.exports = { CreateUser, LoginUser }