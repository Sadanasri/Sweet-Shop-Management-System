const express = require('express');
const { addSweet, getAllSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet } = require('../controllers/sweet.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { adminOnly } = require('../middlewares/role.middleware');

const upload = require('../middleware/upload');

const router = express.Router();

router.use(authMiddleware);

router.post('/', adminOnly, upload.single('image'), addSweet);
router.get('/', getAllSweets);
router.get('/search', searchSweets);
router.put('/:id', adminOnly, upload.single('image'), updateSweet);
router.delete('/:id', adminOnly, deleteSweet);
router.post('/:id/purchase', purchaseSweet);

module.exports = router;
