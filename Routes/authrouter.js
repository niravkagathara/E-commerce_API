// const express = require('express');
// const authController = require('./../Controllers/authController');

// const router = express.Router();

// router.route('/').get(authController.protect,authController.restrict('admin'),authController.getalluser);

// router.route('/add-user')
//     .post(authController.protect,authController.restrict('admin'),authController.adduser);

// router.route('/register')
//     .post(authController.registeruser);

// router.route('/login')
//     .post(authController.userlogin);

// // router.route('/forgotpassword')
// //     .post(authController.forgotpassword);

// // router.route('/resetpassword')
// //     .post(authController.resetpassword);S

// router.route('/:id')
//     .get(authController.protect,authController.restrict('admin'),authController.getuserbyid)
//     .delete(authController.protect,authController.restrict('admin'),authController.deleteuser)
//     .put(authController.protect,authController.restrict('admin'),authController.updateuser);

// module.exports = router;