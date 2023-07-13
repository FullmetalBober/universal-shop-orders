import express from 'express';
import * as authMiddleware from './../middlewares/authMiddleware';
import * as categoryController from './../controllers/categoryController';

const router = express.Router();

router.route('/').get(categoryController.getAllCategories);
router.route('/:id').get(categoryController.getCategory);

router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('moderator', 'admin'));

router.route('/').post(categoryController.createCategory);

router
  .route('/:id')
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
