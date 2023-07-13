import express from 'express';
import * as authMiddleware from './../middlewares/authMiddleware';
import * as orderController from './../controllers/orderController';

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/:id').get(orderController.getOrder);

router.route('/').post(orderController.createOrder);

router.route('/:id').patch(orderController.updateOrder);

router.use(authMiddleware.restrictTo('moderator', 'admin'));

router.route('/').get(orderController.getAllOrders);

module.exports = router;
