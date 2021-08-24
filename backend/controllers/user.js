const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Appelle le modèle
const User = require("../models/user")


//Inscription
exports.signup = (req, res, next) => {
    //Bcrypt va hasher le mot de passe 10x afin de s'assurer de la sécurité des données.
    bcrypt.hash(req.body.password, 10)
    //Crée un nouvel utilisateur
    .then(hash => {
    const user = new User({
        email: req.body.email,
        password: hash
    });
    //Puis l'utilisateur va etre enregistré dans la base de données
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


//Connexion au site
exports.login = (req, res, next) => {
    
    //Vérifie s'il utilisateur existe bien
    User.findOne({ email: req.body.email })
    .then(user => {
        
        //S'il n'existe pas : "Utilisateur non trouvé"
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
       
        //Si il existe, compare les mots de passe
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            
            //Si les mots de passe ne sont pas les mêmes : "Mot de passe incorrect"
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
           
            //Si les mots de passe concordent, renvoie un TOKEN d'authentification
            res.status(200).json({
              userId: user._id,

              //Créée le Token via le package jsonWebToken
              token: jwt.sign(
                  {userId: user._id},
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h'}  
              )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
