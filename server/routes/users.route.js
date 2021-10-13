const express = require('express');
const {check} = require('express-validator'); // use validation
const userControllers = require('../database/controllers/users-controllers')
const router = express.Router();

router.get('/', userControllers.getUsers);
router.post("/usercreate", [
    check('firstName')
    .not().isEmpty(),
    check('lastName')
    .not().isEmpty(),
    check('email')
    .normalizeEmail()
    .isEmail(),
    check('phone')
    .isMobilePhone(),
    check('password').isLength({min:6}) //.isStrongPasswordNumber
],
userControllers.userRegister);
router.post("/userlogin", userControllers.userLogin);

module.exports = router;