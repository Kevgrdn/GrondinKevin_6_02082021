const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kevin:Bertrand1974!@cluster0.onezu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

app.post('/api/auth/signup', (req, res) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Compte créé !'
    });
});

app.post('/api/auth/login', (req, res) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Connecté !'
    });
  });


app.get('/api/sauces', (req,res) => {
    console.log('Renvoie un tableau de toutes les sauces de la base de données')
    res.status(200).json(sauces)
})

app.get('/api/sauces/:id', (req,res) => {
    console.log('Renvoie une sauce')
    res.status(200).json(sauces)
})

app.post('/api/sauces', (req, res) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Enregistre l image transformee en chaine de caractères !'
    });
});

app.put('/api/sauces/:id', (req, res) => {
    console.log(req.body);
    res.status(202).json({
      message: 'Met à jour la sauce !'
    });
});

app.delete('/api/sauces/:id', (req, res) => {
    console.log(req.body);
    res.status(202).json({
      message: 'Supprime une sauce !'
    });
});

app.post('/api/sauces/:id/like', (req, res) => {
    console.log(req.body);
    res.status(201).json({
      message: ' Like une sauce!'
    });
});

module.exports = app;