const express = require('express');
const router = express.Router();

//Appelle le controller 
const sauceCtrl = require('../controllers/sauce')

//Middleware
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

//Routes : 
router.get('', auth, sauceCtrl.getAllSauces)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.post('', auth, multer, sauceCtrl.createSauce)
router.post('/:id/like', auth, sauceCtrl.likeOrDislikeSauce)
router.put('/:id', auth, multer, sauceCtrl.updateOneSauce)
router.delete('/:id', auth, sauceCtrl.deleteOneSauce)


module.exports = router;

