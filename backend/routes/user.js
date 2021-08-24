const express = require('express');
const router = express.Router();


//Appelle le controller
const userCtrl = require('../controllers/user')


//Appelle le middleware d'authentification
const auth = require('../middleware/auth')


//Route : 
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)


module.exports = router;

