const mongoose=require('../database/connection')

const orderSchema=mongoose.Schema({
    orderId:{
        type:String
    },
    product:{
        type:Array,
        require:true
    },
    totalAmount:{
        type:Number
    }
});

module.exports=mongoose.model("orderModel",orderSchema)
