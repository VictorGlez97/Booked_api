const { Schema, model } = require('mongoose');

const PatientSchema = Schema({

    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
    },
    phone: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

module.exports = model('Patient', PatientSchema);