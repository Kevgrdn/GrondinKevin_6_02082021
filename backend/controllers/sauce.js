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
exports.likeOrDislikeSauce = (req, res, next) => {
  
  //Si on like la sauce
  if (req.body.like === 1) { 
    
    //On ajoute 1 like et on l'envoie dans le tableau "usersLiked"
    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
      .then((sauce) => res.status(200).json({ message: 'Like' }))
      .catch(error => res.status(400).json({ error }));
  } 
  
  //Si l'utilisateur n'aime pas la sauce
  else if (req.body.like === -1) { 
    
    //On ajoute 1 dislike et on l'envoie dans le tableau "usersDisliked"
    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } }) 
      .then((sauce) => res.status(200).json({ message: 'Dislike' }))
      .catch(error => res.status(400).json({ error }));
  } 
  else { 
    
    //Si like === 0 l'utilisateur supprime son vote
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        
      //Si le tableau "userLiked" contient l'ID de l'utilisateur
      if (sauce.usersLiked.includes(req.body.userId)) { 
        
        //On enlève un like de "userLiked" 
        Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
            .then((sauce) => { res.status(200).json({ message: 'Like supprimé' }) })
            .catch(error => res.status(400).json({ error }))
      } 
      
      //Si le tableau "userDisliked" contient l'ID de l'utilisateur
      else if (sauce.usersDisliked.includes(req.body.userId)) {
          
        //Enlève un dislike 
        Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
          .then((sauce) => { res.status(200).json({ message: 'Dislike supprimé' }) })
          .catch(error => res.status(400).json({ error }))
      }
    })
    .catch(error => res.status(400).json({ error }));
  }
};