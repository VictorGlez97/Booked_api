/* 
    USERS ROUTES .../api/auth
    
    - CREATE USER -
    POST .../create

*/

const { Router, response } = require('express');
const { check } = require('express-validator');

const router = Router();

const {
    CreateUser,
    LoginUser,
    RevalidateToken
} = require('../controllers/auth');

const { validate, validateSign } = require('../middlewares/validate');

router.post(
    '/create', 
    [
        check('name').exists().not().isEmpty(),
        check('alias').exists().not().isEmpty(),
        check('pass').exists().isLength({ min: 5 }).not().isEmpty(),
        check('role').exists().not().isEmpty(),
        validate
    ],
    CreateUser);

router.post(
    '/login',
    [
        check('alias').exists().not().isEmpty(),
        check('pass').exists().not().isEmpty(),
        validate
    ],
    LoginUser);

router.get('/renew', RevalidateToken);

module.exports = router;
