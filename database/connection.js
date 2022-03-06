const mongoose =require('mongoose')


mongoose.connect("mongodb://localhost:27017/crudoperation")
.then(()=>{console.log("connect")})
.catch((err)=>{console.log("not connect")});


module.exports=mongoose;