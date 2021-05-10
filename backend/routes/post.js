const express = require('express');
const router = express.Router();
const postCtrl =  require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//route pour les post
router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost); 
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost); 
router.delete('/:id', auth, postCtrl.deletePost); 

module.exports = router;