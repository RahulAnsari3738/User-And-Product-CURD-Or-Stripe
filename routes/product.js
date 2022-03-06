const express=require('express');
const productController = require('../controller/product.Controller');
const router = express.Router();

const Productcontroller=require('../controller/product.Controller');



router.post('/productadd',productController.productAdd)
router.get('/productview',productController.productView)
router.get('/productviewsingle/:id',productController.productViewSingle)

router.put('/productupdate',productController.productUpdate)
router.delete('/productdelete',productController.productDelete)
// router.delete(/)


module.exports=router;