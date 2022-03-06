const mongoose =require('../database/connection');

  const userSchema =mongoose.Schema({
      userName:{
          type:String,
          require:true,
          unique:true
      },
      password:{
          type:Number,
          require:true,
        
    
      }

   });

   
  module.exports= new mongoose.model("userModel",userSchema);


