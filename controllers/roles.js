const { response } = require('express');
const Role = require('../models/Role');

const CreateRole = async( req, res = response ) => {

    try {
        
        const { name } = req.body;

        let role = await Role.findOne({ name });

        if ( role ) {
            return res.status(400).json({
                ok: false,
                msg: 'ERROR: ROL YA REGISTRADO'
            });
        }

        role = new Role( req.body );
        await role.save();

        res.status(201).json({
            ok: true,
            uid: role.id,
            role: role.name
        });

    } catch (error) {
        
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADM'
        });

    }

}

const GetRoles = async( req, res = response ) => {

    try {
        
        const roles = await Role.find();
                      
        console.log( roles );
            
        res.status(200).json({
            ok: true,
            roles
        })

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADM'
        })
    }
}

const GetRole = async( req, res = response ) => {

    try {
        
        const role_id = req.params.id;

        const role = await Role.findById( role_id );

        console.log( role );

        if ( !Role ) {
            return res.status(404).json({
                ok: false,
                msg: 'ERROR: ROL NO ENCONTRADO'
            });
        }

        res.status(200).json({
            ok: true,
            role
        });

    } catch (error) {
        
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADM'
        })

    }

}

const UpdateRole = async( req, res = response ) => {

    try {
        
        const role_id = req.params.id;

       let role = Role.findById( role_id );

       if ( !role ) {
           return res.status(201).json({
               ok: false,
               msg: 'ERROR: ESTE ROL NO EXISTE'
           });
       } 

        const newRole = {
            ...req.body
        }

        const Roleupdated = await Role.findByIdAndUpdate( role_id, newRole, { new: true } );

        res.status(201).json({
            ok: true,
            data: Roleupdated
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADM'
        });

    }

}

const DeleteRole = async( req, res = response ) => {

    try {
        
        const role_id = req.params.id;
        //console.log(role_id);

        let role = await Role.findById( role_id );

        //console.log(role);

        if ( !role ) {
            return res.status(404).json({
                ok: false,
                msg: 'ERROR: ROL NO ENCONTRADO'
            });
        }

        await Role.deleteOne({ _id: role_id });

        res.status(201).json({
            ok: true,
            msg: 'EXITO: ROL ELIMINADO CORRECTAMENTE'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADM'
        })

    }

}

module.exports = {
    CreateRole, GetRoles, GetRole, UpdateRole, DeleteRole
}