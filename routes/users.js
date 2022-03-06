var express = require('express');
var router = express.Router();
const expressraw=require('../helper/raw')
const userController=require('../controller/users.Controller')
const orderController=require('../controller/order.Controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

               // usersRouter
router.post('/register',userController.register)
router.post('/login',userController.login)
router.put('/update',userController.update)
router.delete('/delete',userController.delete)


// paymentRouter

//  router.post('/webhook',expressraw,stripecontroller.webhook)
router.post('/payment',orderController.payment)
router.post('/webhook',orderController.webhook)



module.exports = router;
