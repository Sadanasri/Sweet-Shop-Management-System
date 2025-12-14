const express = require('express');
const { purchaseSweet, restockSweet } = require('../controllers/inventory.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { adminOnly } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/:id/purchase', purchaseSweet);
router.post('/:id/restock', adminOnly, restockSweet);

module.exports = router;
