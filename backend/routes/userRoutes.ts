import express from 'express';
import * as userController from './../controllers/userController';
import * as authController from './../controllers/authController';
import * as authMiddleware from './../middlewares/authMiddleware';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.patch('/activate/:token', authController.activateUser);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authMiddleware.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  // userController.uploadMyPhoto,
  userController.updateMe
);
router.delete(
  '/deleteMe',
  authMiddleware.restrictTo('user'),
  // userController.deleteMyPhoto,
  userController.deleteMe
);
router.delete(
  '/nonVerified/deleteMe',
  authMiddleware.restrictTo('user'),
  // userController.deleteMyPhoto,
  userController.deleteMe
);

router.use(authMiddleware.restrictTo('admin'));
router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    // userController.uploadUserPhoto,
    userController.updateUser
  )
  .delete(
    // userController.deleteUserPhoto,
    userController.deleteUser
  );

export default router;
