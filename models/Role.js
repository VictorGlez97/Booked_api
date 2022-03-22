const { Schema, model } = require('mongoose');

const RoleSchema = Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }

});

module.exports = model('Role', RoleSchema);
