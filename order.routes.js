const express = require('express');
const { createOrder, getUserOrders, getAllOrders } = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/my-orders', getUserOrders);

module.exports = router;
