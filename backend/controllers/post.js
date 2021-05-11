const fs = require('fs'); // acces au fichier systeme
const app = require('../app');
const models = require('../models');

exports.createPost = (req, res, next) => {
  
  if(req.body.content == null) {
    return res.status(400).send({
      message: "Votre post ne peut pas être vide"
    });
  }  
    models.Post.create ({
      title: req.body.title,
      userId: req.userId,
      content: req.body.content,
      image: `${req.protocol}://${req.get("host")}/images/${req.body.imageUrl}`
    })
    .then(() => res.status(201).json({message: 'Post crée'}))
    .catch(error => res.status(400).json({error}))
  };

  
exports.getOnePost = async (req, res, next) => {
    let post = await models.Post.findOne({where:{id: req.params.id}}); // récupére un seul post: ID du post est le meme que l'ID de la requete
    (Post => res.status(200).json(Post))
    .catch(error => res.status(404).json({error}))
};

 
exports.getAllPost =  (req, res, next) => {
    models.Post.findAll() //récupération de toutes les post
    .then(Post => res.status(200).json(Post))
    .catch(error=> res.status(400).json({error}));
 };

exports.modifyPost = (req, res, next) => {
  models.Post.update({
    where: {
      id: req.params.id
    },
    userId: req.userId,
    title: req.body.title,
    content: req.body.content,
    image: `${req.protocol}://${req.get("host")}/images/${req.body.imageUrl}`
  })
  .then(() => res.status(200).json({message: 'Post modifié'}))
  .catch(error => res.status(400).json({error}))
 }


exports.deletePost =  (req, res, next) => {
  models.Post.destroy({ 
    where: {
      id: req.params.id
    }
    })
  .then(Post => {
      const filename = Post.imageUrl.split('/images/')[1];//nom du fichier
      fs.unlink(`images/${filename}`, () => {//méthode pour supprimer le fichier
          post.destroy({where: {id: req.params.id}})
          .then(() => res.status(200).json({message: 'Post supprimée'}))
          .catch(error => res.status(400).json({error}))
      });
  })
  .catch(error=> res.status(500).json({error}))
 
};

