const express = require('express');
const router = express.Router();

//Appelle le controller 
const sauceCtrl = require('../controllers/sauce')

//Middleware d'authentification
const auth = require('../middleware/auth')


//Routes : 
router.get('', auth, sauceCtrl.getAllStuff)
router.get('/:id', auth, sauceCtrl.getOneThing)
router.post('', auth, sauceCtrl.createThing)
router.put('/:id', auth, sauceCtrl.updateOne)
router.delete('/:id', auth, sauceCtrl.deleteThing)
router.post('/:id/like', auth, sauceCtrl.createThing)


module.exports = router;
