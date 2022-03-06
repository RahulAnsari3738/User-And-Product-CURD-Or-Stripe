const mongoose=require('../database/connection')


const productSchema=mongoose.Schema({

    productName:{
    type:String,
    require:true,
    minlength:[3,"minimum length 3"]
    },

    productPrice:{
        type:String,
        require:true
    }

});

module.exports=new mongoose.model("productModel",productSchema)