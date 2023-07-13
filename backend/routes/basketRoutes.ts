import express from 'express';
import * as authMiddleware from './../middlewares/authMiddleware';
import * as basketController from './../controllers/basketController';

const router = express.Router();

router.use(authMiddleware.protect);

router.route('/:id').get(basketController.getBasket);

router.route('/').post(basketController.createBasket);

router
  .route('/:id')
  .patch(basketController.updateBasket)
  .delete(basketController.deleteBasket);

router.use(authMiddleware.restrictTo('moderator', 'admin'));

router.route('/').get(basketController.getAllBaskets);

module.exports = router;
