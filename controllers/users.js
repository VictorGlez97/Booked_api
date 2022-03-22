const { response } = require('express');
const User = require('../models/User');

const GetUsers = async( req, res = response ) => {

    try {
        
        const users = await User.find()
                                .populate('role','name');

        res.json({
            ok: true,
            users
        });

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADM'
        });
    }
}

const GetUser = async( req, res = response ) => {

    try {
        
        const user_id = req.params.id;
        console.log( user_id );

        const user = await User.findById( user_id )
                               .populate('role', 'name');

        if ( !user ) {
            return res.status(401).json({
                ok: false,
                msg: 'ERROR: USUARIO NO ENCONTRADO'
            });
        }

        return res.status(201).json({
            ok: true,
            user
        });


    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADM'
        });
    }
}

const UpdateUser = async( req, res = response ) => {

    const { id } = req.params.id;

    try {
        
        let user = User.findById( id );

        if ( !user ) {
            
            return res.status(401).json({
                ok: false,
                msg: 'ERROR: USUARIO NO ENCONTRADO'
            });

        }

        const userUpdated = await User.findByIdAndUpdate( id, req.params, { new: true } );
        
        res.status(201).json({
            ok: true,
            userUpdated
        });

    } catch (error) {
        
        console.log( error );

        res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADM'
        });

    }

}

const DeleteUser = async( req, res = response ) => {

    try {
        
        const user_id = req.params.id;

        let user = User.findById( user_id );

        if ( !user ) {
            res.status(400).json({
                ok: false,
                msg: 'ERROR: USUARIO NO ENCONTRADO'
            });
        }

        await User.deleteOne({ _id: user_id });

        res.status(201).json({
            ok: true,
            msg: 'EXITO: USUARIO ELIMINADO CORRECTAMENTE'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADM'
        });   
    }
}

module.exports = { GetUsers, GetUser, UpdateUser, DeleteUser }