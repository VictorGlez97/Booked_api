const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateSign = ( uid, name ) => {

    const payload = { uid, name };
    //console.log('payload', payload);

    return jwt.sign( payload, process.env.SIGN_SECRET, { expiresIn: '2h' });

}

module.exports = {
    generateSign
}
