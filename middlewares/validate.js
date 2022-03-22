const { response } = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const validate = ( req, res = response, next ) => {
    
    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

const validateSign = ( req, res = response, next ) => {
 
    // x-token headers 
    const token = req.header('x-token');
    console.log( 'token', token );

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'ERROR: FALTA UNA FIRMA'
        });
    }

    try {
        
        const payload = jwt.verify(
            token,
            process.env.SIGN_SECRET
        );

        console.log( payload );

        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        
        console.log( error );

        return res.status(500).json({
            ok: false,
            msg: 'ERROR: FIRMA NO VALIDA'
        });

    }

    next();

}

module.exports = { validate, validateSign }