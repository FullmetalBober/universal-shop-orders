import express from 'express';
import * as authMiddleware from './../middlewares/authMiddleware';
import * as orderController from './../controllers/orderController';

const router = express.Router();

router.use(authMiddleware.protect);
router.use(authMiddleware.setUserId);

router
  .route('/basket')
  .post(authMiddleware.setUserId, orderController.createOrderFromBasket);

router.route('/:id').get(orderController.getOrder);

router.use(authMiddleware.restrictTo('moderator', 'admin'));

router.route('/:id').patch(orderController.setStatus);

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

export default router;
