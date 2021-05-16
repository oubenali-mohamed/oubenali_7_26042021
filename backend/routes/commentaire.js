const express = require('express');
const router = express.Router();
const commentaireCtrl =  require('../controllers/commentaire');
const auth = require('../middleware/auth');


router.post('/', auth, commentaireCtrl.createCommentaire);
router.get('/', auth, commentaireCtrl.getAllCommentaire); 
router.put('/:id', auth, commentaireCtrl.modifyCommentaire);
router.delete('/:id', auth, commentaireCtrl.deleteCommentaire);

module.exports = router;