const express = require('express'); //importer express
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const session = require('express-session');
const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentaireRoutes = require('./routes/commentaire');
const app = express(); //application express créée avec la méthode express

  app.use((req, res, next) => {/*
    d'accéder à notre API depuis n'importe quelle origine
    d'ajouter les headers mentionnés aux requêtes envoyées vers notre API 
    d'envoyer des requêtes avec les méthodes mentionnées*/
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  const sequelize = new Sequelize( "database_development_p7", "root", "", {
    dialect: "mysql",
    host: "localhost"
});

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
  } catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());//transforme le corps de la requet en json pour la rendre exploitable
app.use(helmet()); //Pour sécuriser les en-têtes HTTP, minimum désactiver l'en-tête X-Powered-By
app.disable('x-powered-by');//on désactive au minimum x-powered-by
app.set('trust proxy', 1);
app.use(session({ //génére un id de session
  secret: process.env.SECRET_SESSION,
  name: 'sessionID',
  resave: false,
  saveUninitialized: true,
 })); 

app.use('/api/auth', userRoutes); 
app.use('/api/auth/post', postRoutes);
app.use('/api/commentaire', commentaireRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));//donne accés au chemin de notre systeme de fichier



module.exports = app;//exporter l'application pour y avoir accés dans les autres fichier.