/*
    ROLES ROUTES .../api/roles

    - CREATE ROLE -
    POST .../create

    - UPDATE ROLE -
    PUT .../ID

    - DELETE ROLE -
    DELETE .../ID

*/

const { Router,response } = require('express');
const { check } = require('express-validator');

const router = Router();

const {
    CreateRole,
    GetRoles,
    GetRole,
    UpdateRole,
    DeleteRole
} = require('../controllers/roles');

const { validate } = require('../middlewares/validate');

router.post(
    '/create',
    [
        check('name').exists().not().isEmpty(),
        validate
    ],
    CreateRole);

router.get(
    '/',
    GetRoles);

router.get(
    '/:id',
    GetRole);

router.put(
    '/:id',
    UpdateRole);

router.delete(
    '/:id',
    DeleteRole);

module.exports = router;