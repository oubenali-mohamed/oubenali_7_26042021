const fs = require('fs');
const app = require('../app');
const models = require('../models');

exports.createCommentaire = (req, res, next) => {
  
    if(req.body.content == null) {
      return res.status(400).send({
        message: "Votre commentaire ne peut pas être vide"
      });
    }  
      models.commentaire.create({
        postId: req.body.postId,
        userId: req.userId,
        content: req.body.content,
    })
      .then(() => res.status(201).json({message: 'commentaire ajouté'}))
      .catch(error => res.status(400).json({error}))
    };


exports.modifyCommentaire = (req, res, next) => {
        models.commentaire.update({
          where: {
            id: req.params.id
          },
          content: req.body.content,
          })
        .then(() => res.status(200).json({message: 'Commentaire modifié'}))
        .catch(error => res.status(400).json({error}))
       }

exports.deleteCommentaire =  (req, res, next) => {
        models.commentaire.destroy({ 
          where: {
            id: req.params.id
          }
          })
        .then(commentaire => {
            commentaire.destroy({where: {id: req.params.id}})
                .then(() => res.status(200).json({message: 'Commentaire supprimée'}))
                .catch(error => res.status(400).json({error}))
           
        })
        .catch(error=> res.status(500).json({error}))
       
      };