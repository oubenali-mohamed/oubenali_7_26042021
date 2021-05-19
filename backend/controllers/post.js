const fs = require('fs'); // acces au fichier systeme
const app = require('../app');
const models = require('../models');
const user = require('../models/user');

exports.createPost = (req, res, next) => {
  
  if(req.body.content == null || req.body.title == null) {
    return res.status(400).send({
      message: "Votre post ne peut pas être vide"
    });
  }  console.log(req.userId)
    models.Post.create ({
      title: req.body.title,
      userId: req.userId,
      content: req.body.content,
      image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    })
    .then(() => res.status(201).json({message: 'Post crée'}))
    .catch(error => res.status(400).json({error}))
  };

  
exports.getOnePost = async (req, res, next) => {
    let post = await models.Post.findOne({where:{id: req.params.id}}); // récupére un seul post: ID du post est le meme que l'ID de la requete
    if(post) {
      return res.status(200).json(post);
    } else {
      return  res.status(500). json({error})
    }
  };

 
exports.getAllPost =  (req, res, next) => {

  let fields  = req.query.fields;
  let limit   = parseInt(req.query.limit);
  let offset  = parseInt(req.query.offset);
  let order   = req.query.order;

    models.Post.findAll({//récupération de toutes les post
      order: [(order != null) ? order.split(':') : ['title', 'ASC']],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.User,
        attributes: [ 'username' ]
      }]
    }) 
    .then(Post => res.status(200).json(Post))
    .catch(error=> res.status(400).json({error}));
 };

exports.modifyPost = (req, res, next) => {
  if(req.body.content == null || req.body.title == null) {
    return res.status(400).send({
      message: "Votre post ne peut pas être vide"
    })
  }
  models.Post.update({
    userId: req.userId,
    title: req.body.title,
    content: req.body.content,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  },{
    where: {
      id: req.params.id,
    }
  })
  .then(() => res.status(200).json({message: 'Post modifié'}))
    .catch(error => res.status(400).json({error}))
}


 exports.deletePost = async (req, res, next) => {
  let post = await models.Post.destroy({where:{id: req.params.id}});
  if(post) {
      return res.status(200).json({message: 'post supprimé'});
    } else {
    return  res.status(500). json({error})
  }
}; 
 /* exports.deletePost =  (req, res, next) => {
  models.Post.destroy({ 
    where: {
      id: req.params.id
    }
    })
  .then(post => {
      const filename = Post.image.split('/images/')[1];//nom du fichier
      fs.unlink(`images/${filename}`, () => {//méthode pour supprimer le fichier
          post.destroy({where: {id: req.params.id}})
          .then(() => res.status(200).json({message: 'Post supprimée'}))
          .catch(error => res.status(400).json({error}))
      });
  })
  .catch(error=> res.status(500).json({error}))
 
};  */
 
