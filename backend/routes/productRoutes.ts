import express from 'express';
import * as authMiddleware from './../middlewares/authMiddleware';
import * as productController from './../controllers/productController';

const router = express.Router();

router
  .route('/count')
  .get(
    productController.queryParamToFilterObj,
    productController.countProducts
  );

router
  .route('/')
  .get(
    productController.queryParamToFilterObj,
    productController.getAllProducts
  );
router.route('/slug/:slug').get(productController.getProductBySlug);

router.route('/:id').get(productController.getProduct);

router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('moderator', 'admin'));

router.route('/').post(productController.createProduct);

router
  .route('/:id')
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
