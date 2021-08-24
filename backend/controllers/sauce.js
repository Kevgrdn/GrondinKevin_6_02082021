const sauce = require('../models/sauce');



//Obtenir toutes les sauces
exports.getAllStuff = (req,res) => {
    sauce.find()
    .then( things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error}))
}

//Obtenir une sauce spécifique via l'ID
exports.getOneThing = (req,res) => {
    console.log('Renvoie une sauce')
    res.status(200).json(sauces)
}

//Enregistre une nouvelle sauce
exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new sauce({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
}

//Mettre à jour une sauce
exports.updateOne = (req, res) => {
    console.log(req.body);
    res.status(202).json({
      message: 'Met à jour la sauce !'
    });
}

//Supprime une sauce
exports.deleteThing = (req, res) => {
    console.log(req.body);
    res.status(202).json({
      message: 'Supprime une sauce !'
    });
}

//Aimer une sauce
exports.createThing = (req, res) => {
    console.log(req.body);
    res.status(201).json({
      message: ' Like une sauce!'
    });
}


