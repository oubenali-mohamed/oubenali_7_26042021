
const bcrypt = require('bcrypt');//package de cryptage de mot de passe
const jwt = require('jsonwebtoken');//créer et vérifier les tokens
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const sha256 = require('sha256');
const models = require('../models');

//Inscription
exports.signup = (req, res, next) => {
    
    let email = req.body.email;
    let username = req.body.username;
    let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    let password = req.body.password;
    

    let checkEmail = emailValidator.validate(email); //validation de l'email
    let checkPass = new passwordValidator(); 
    checkPass
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()
    let validPass = checkPass.validate(password);//validation de mot de passe

    const maskedEmail = sha256(email);
    
    if (username.length >= 15 || username.length <= 3) {
        return res.status(400).json({ 'error': 'Username trop court' });
      }
   
    if(checkEmail && validPass) {
        bcrypt.hash(req.body.password, 10) //on hash le mot de passe et on exécute le hashage 10 fois
        .then(hash => {
            const user = models.User.create({ // création du nouvel utilisateur
                username: username,
                email: maskedEmail,
                password: hash,
                image: image,
                isAdmin: 0
        })
        .then(() => res.status(201).json({message: 'utilisateur crée'}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}else {
    res.status(500).json('email ou mot de passe invalide');
}

};
    

//Connexion
exports.login = async (req, res, next) => {
    let checkEmail = emailValidator.validate(req.body.email);
    let checkPass = new passwordValidator();
    checkPass
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()
    let validPass = checkPass.validate(req.body.password);

    const maskedEmail = sha256(req.body.email);
    
    if(checkEmail && validPass) {
       let user = await models.User.findOne({where:{email:maskedEmail}});// trouver l'user de la base de donnée s'il existe
            if(!user) {
                return res.status(401).json({message: 'Utilisatuer non trouvé'});
            }
            bcrypt.compare(req.body.password, user.password)// on compare le mot de passe avec le hash du user enregistré
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({message: 'Mot de passe incorrect'});   
                }
                res.status(200).json({
                    userId: user.id, 
                    token: jwt.sign(
                        {userId: user.id},//user encodé
                        process.env.SECRET_KEY_TOKEN,// clé secréte pour encodage
                        {expiresIn: '24h'} // expiration du token
                    )
                });
            })
            .catch(error => res.status(500). json({error}))
      
    }else{
        res.status(500).json('utilisateur non trouvé');
    }
};