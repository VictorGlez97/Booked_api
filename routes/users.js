/*
    
    - USERS ROUTES -
    .../user

    - GET USERS -
    GET .../

    - GET USER -
    GET .../ID

    - DELETE USER -
    DELETE .../ID

*/

const { Router, response } = require('express');
const { check } = require('express-validator');

const {
    GetUser,
    GetUsers,
    UpdateUser,
    DeleteUser
} = require('../controllers/users');

const { validate, validateSign } = require('../middlewares/validate');

const router = Router();

router.use( validateSign );

router.get(
    '/',
    validate,
    GetUsers);

router.get(
    '/:id',
    validate,
    GetUser);

router.put(
    '/',
    [
        check('id').exists().not().isEmpty(),
        check('alias').exists().not().isEmpty(),
        check('pass').exists().isLength({ min: 5 }).not().isEmpty(),
        check('role').exists().not().isEmpty(),
        validate
    ],
    UpdateUser);

router.delete(
    '/:id',
    validate,
    DeleteUser);

module.exports = router;
