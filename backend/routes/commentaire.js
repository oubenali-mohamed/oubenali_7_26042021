const express = require('express');
const router = express.Router();
const commentaireCtrl =  require('../controllers/commentaire');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, commentaireCtrl.createCommentaire);
router.put('/:id', auth, multer, commentaireCtrl.modifyCommentaire);
router.delete('/:id', auth, commentaireCtrl.deleteCommentaire);

module.exports = router;