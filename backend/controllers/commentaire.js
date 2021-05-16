const fs = require('fs');
const app = require('../app');
const models = require('../models');

exports.createCommentaire = (req, res, next) => {
  
    if(req.body.content == null) {
      return res.status(400).send({
        message: "Votre commentaire ne peut pas être vide"
      });
    }  
      models.Commentaire.create({
        postId: req.body.postId,
        userId: req.body.userId,
        content: req.body.content,
    })
      .then(() => res.status(201).json({message: 'commentaire ajouté'}))
      .catch(error => res.status(400).json({error}))
    };

exports.getAllCommentaire =  (req, res, next) => {
      models.Commentaire.findAll() //récupération de toutes les commentaires
      .then(Commentaire => res.status(200).json(Commentaire))
      .catch(error=> res.status(400).json({error}));
   };

exports.modifyCommentaire = (req, res, next) => {
        models.Commentaire.update({
          where: {
            id: req.params.id
          },
          content: req.body.content,
          })
        .then(() => res.status(200).json({message: 'Commentaire modifié'}))
        .catch(error => res.status(400).json({error}))
       }

exports.deleteCommentaire =  (req, res, next) => {
        models.Commentaire.destroy({ 
          where: {
            id: req.params.id
          }
          })
        .then(Commentaire => {
            Commentaire.destroy({where: {id: req.params.id}})
                .then(() => res.status(200).json({message: 'Commentaire supprimée'}))
                .catch(error => res.status(400).json({error}))
           
        })
        .catch(error=> res.status(500).json({error}))
       
      };