const { Schema, model } = require('mongoose');
//const Role = require('./Role')

const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId, 
        ref: "Role",
        required: true
    }

});

UserSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    //console.log(role);
    object.id = _id;
    return object;
})

module.exports = model('User', UserSchema);
