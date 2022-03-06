

const orderModel=require('../modules/order.Schema');
const productModel=require('../modules/product.Schema')
const demo =require("../helper/codefunction")

const { DateTime} =require('luxon')

const dotenv =require('dotenv')
dotenv.config({path:"./config.env"});

const Publishable_Key =process.env.Publishable_Key;
// console.log(Publishable_Key);
const SECRET_KEY =process.env.SECRET_KEY;
// console.log(SECRET_KEY);

const stripe=require("stripe")(SECRET_KEY)

class Ordercontroller{

  createOrder = async (req, res) => {

    try {
      const {
     
        product,
        totalAmount,  
        
      } =req.body
    

        var dateNow = DateTime.now().toFormat("yyMMdd");
        // console.log(dateNow)

        const lastOrder = await orderModel.find().sort({ _id: -1 }).limit(1);

        let code = "0001";

        if (lastOrder[0]?.orderId){
          const lastOrderArray = lastOrder[0].orderId.toString().split("-");
          // console.log(lastOrderArray);
      
          if (dateNow === lastOrderArray[1]) {
            // console.log(lastOrderArray[2]);
            code = parseInt(lastOrderArray[2]) + 1;

            code = demo(code, 4, 0);
        
          }
        }

        const orderId = `ORD-${dateNow}-${code}`;

        // console.log(order)

        
        if (product) {
          // let productdata = [];
          let sum = 0;
          let prods =[...product]
          // console.log(prods);
         
            for(let item of prods){
              // console.log(item);

              const prodDetails = await productModel.findOne({_id:item[`_id`]});

              sum+= prodDetails?.productPrice * (item[`quantity`] || 1);
             
            }
          if(sum!==totalAmount)
         
          {
            return res.status(404).json({message:'amount is not matched' ,success:false})
          }

          else if (sum == totalAmount) {

            const order = new orderModel({
              orderId: orderId,
              product:req.body.product,
              totalAmount:totalAmount
              });

            const adding=await order.save()
           
            return orderId;
          }
          return totalAmount;
        }
      }
    
     catch (e) {
      console.log(e);
      return res
        .status(500)
        .json(e, { message: "server error", success: false });
    }
  };


    payment = async (req, res) => {
        // Create a PaymentIntent with the order amount and currency
       
        try{
          const orderId = await this.createOrder(req, res);
          // console.log(orderId);
        const paymentIntent = await stripe.paymentIntents.create({
          amount:"1500",
          currency: "eur",
          automatic_payment_methods: {
            enabled: true,
          },
        });
       
    // console.log(paymentIntent);
        return res.status(200).json({
          success: true,
          orderId,
          clientSecret: paymentIntent.client_secret,
        });
      }
      catch(e){
        console.log(e);
        return res.status(500).json({message:e.message})
      }
       
      }

      webhook = (req, res) => {

    
        const payload = req.body
        const sig = req.headers['stripe-signature']
        const payloadString = JSON.stringify(payload, null, 2);
        const secret = 'whsec_B0DEY8bBMakHAcipYEVM6V8sSHfErdZo';
        const header = stripe.webhooks.generateTestHeaderString({
                payload: payloadString,
                secret,
        });
      
        let event;
      
        try {
          event = stripe.webhooks.constructEvent(payloadString, header, secret);

        } catch (err) {
          console.log(err.message);
         
          // res.status(400).send(`Webhook Error: ${err.message}`);
          return res.status(400).json({message:err.message, success:false})
         
        }
    
      
        // Handle the event
        switch (event.type) {
          case 'charge.succeeded':
            const charge = event.data.object;
            // Then define and call a function to handle the event charge.succeeded
            break;
          case 'invoice.payment_succeeded':
            const invoice = event.data.object;
            // Then define and call a function to handle the event invoice.payment_succeeded
            break;
          case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
          // ... handle other event types
          default:
            console.log(`Unhandled event type ${event.type}`);
        }
      
      
        return res.status(200).json({message:"webhook", success:true})
      }
      
    
    


}

module.exports=  new Ordercontroller();