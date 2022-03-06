const express=require("express")
const router=express.Router();

const orderController =require('../controller/order.Controller')

router.post('/payment',orderController.payment)


module.exports=router;

