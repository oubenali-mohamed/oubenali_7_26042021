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
        userId: req.userId,
        content: req.body.content,
    })
      .then(() => res.status(201).json({message: 'commentaire ajouté'}))
      .catch(error => res.status(400).json({error}))
    };

exports.getAllCommentaireByPost =  (req, res, next) => {
      models.Commentaire.findAll({//récupération de toutes les commentaires
        where: {postId: req.body.postId}
      },{
        include: [{
          model: models.Post,
          attributes: [ 'title' ]
        }]
      }) 
      .then(Commentaire => res.status(200).json(Commentaire))
      .catch(error=> res.status(400).json({error}));
   };

exports.modifyCommentaire = (req, res, next) => {
  if(req.body.content == null) {
    return res.status(400).send({
      message: "Votre commentaire ne peut pas être vide"
    })
  }
  models.Commentaire.update({
    content: req.body.content,
  },{
      where: {
          id: req.params.id
      }
       })
          .then(() => res.status(200).json({message: 'Commentaire modifié'}))
            .catch(error => res.status(400).json({error}))
          }
      
        

exports.deleteCommentaire = async (req, res, next) => {
    let commentaire = await models.Commentaire.destroy({where:{id: req.params.id}});
      if(commentaire) {
          return res.status(200).json({message: 'commentaire supprimé'});
        } else {
          return  res.status(500). json({error})
      }
    }; 