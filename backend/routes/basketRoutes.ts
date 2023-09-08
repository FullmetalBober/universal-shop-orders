import express from 'express';
import * as authMiddleware from './../middlewares/authMiddleware';
import * as basketController from './../controllers/basketController';

const router = express.Router();

router.use(authMiddleware.protect);
router.use(authMiddleware.setUserId);

router.route('/').get(basketController.getBasketByUser);
router.route('/').patch(basketController.updateMyBasket);
// router.route('/').get(basketController.getAllBaskets);
// router.route('/:id').get(basketController.getBasket);

// router.route('/').post(basketController.createBasket);

// router
//   .route('/:id')
//   .patch(basketController.updateBasket)
//   .delete(basketController.deleteBasket);

// router.use(authMiddleware.restrictTo('moderator', 'admin'));

export default router;
