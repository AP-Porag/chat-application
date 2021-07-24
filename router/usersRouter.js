/*
*external imports
*/
const express = require('express');
const {check} = require('express-validator');
const router = express.Router();

/*
*internal imports
*/
const {getUsers, addUser, removeUser} = require('../controller/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require('../middlewares/users/avatarUpload');
const {addUserValidators, addUserValidationHandler} = require('../middlewares/users/userValidators');

//users page
router.get('/', decorateHtmlResponse('users'), getUsers);

//create user
router.post('/', avatarUpload, addUserValidators, addUserValidationHandler, addUser);

//remove user
router.delete('/:id', removeUser);

module.exports = router;