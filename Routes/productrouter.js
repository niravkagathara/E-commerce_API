// const express = require('express');
// const productController = require('./../Controllers/productController');
// const authController =require('../Controllers/authController')
// const router = express.Router();
// router.route('/get').get(productController.getallproduct);

// router.route('/add-product')
//     .post(authController.protect,authController.restrict('admin'),productController.addproduct);

// router.route('/:id')
//     .get(authController.protect,authController.restrict('admin'),productController.getproductbyid)
//     .delete(authController.protect,authController.restrict('admin'),productController.deleteproduct)
//     .put(authController.protect,authController.restrict('admin'),productController.updateproduct);

// module.exports = router;