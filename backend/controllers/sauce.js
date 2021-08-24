//Appelle le modèle
const Sauce = require('../models/sauce');


//Accès aux fichiers système
const fs = require('fs');


//Obtenir toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
     .then(sauces => res.status(200).json(sauces))
     .catch(error => res.status(400).json({ error }));
};



//Obtenir une sauce spécifique via l'ID
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }))
};



//Enregistre une nouvelle sauce
exports.createSauce = (req, res, next) => {
  
  //Transforme l'élément sauce de la requête en tableau
  let sauceObject = JSON.parse(req.body.sauce);
  
  //Puis retire l'id du tableau
  delete sauceObject._id;
  
  //Ajoute la nouvelle sauce grâce au modèle, et au tableau "sauce" de la requête 
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  });

  //Sauvegarde la sauce sur la base de données
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce créée !' }))
    .catch(error => res.status(400).json({ error }));
}



//Mettre à jour une sauce
exports.updateOneSauce = (req, res, next) => {

  //Vérification si il y a un fichier a télécharger
  const sauceObject = req.file ?
    {

      //Récupération de l'élément "sauce" de la requête
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  //Remplace les données de l'ancienne sauce, tout en gardant le même ID  
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};



//Supprime une sauce
exports.deleteOneSauce = (req, res, next) => {
 
  //Trouve une sauce via son ID
  Sauce.findOne({ _id: req.params.id })
  
  //Puis supprime l'image via "unlink"
    .then(thing => {
    const filename = thing.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
        
      //Supprime la sauce grace à son ID
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};



//Aimer une sauce
exports.likeSauce = (req, res) => {
  console.log(req.body);
  res.status(201).json({
    message: ' Like une sauce!'
  });
}


