const res = require('express/lib/response');
const productModel =require('../modules/product.Schema')

class Productcontroller{

    productAdd =async (req,res)=>{
        try{

              const {productName,productPrice}=req.body;
              console.log(req.body);

              if(!productName || !productPrice){
                  return res.status(400).json({message:"please fill the field", success:false})
              }

              const productExist = await productModel.findOne({productName:productName});
              if(productExist){
                  return res.status(400).json({message:"product allready exist", success:false})
              }

            
                  const productSave=await productModel({
                      productName:productName,
                      productPrice:productPrice
                  })

                    const order= await productSave.save({new:true})
                    console.log(order);
                    return res.status(200).json({message:"product add successfully", success:true})
                   
              


        }catch(e){
            console.log(e);
            return res.status(500).json({message:err.message, success:false})
        }
    }


    productView =async (req,res)=>{

        try{
            const productinfo= await productModel.find({})

            if(!productinfo){
                return res.status(400).json({message:"product not found", success:false})
            }
    
            else{
          return res.status(200).json({message:`${productinfo.length} product found`,data:productinfo,success:true})
            }
    
        }catch(e){
            console.log(e.message);
            return res.status(500).json({message:e.message, success:false})
        }
    }


 productViewSingle=async(req,res)=>{

 try{

     const productInfo=await productModel.findOne({_id:req?.param?.id})
     console.log(productInfo);

     if(!productInfo){
         return res.status(404).json({message:"product not found", success:true})
     }
     else{

         return res.status(200).json({message: "product found", data:productInfo,success:true})
     }
 
 }catch(e){
     console.log(e);
     return res.status(500).json({message:"servor error", success:true})
 }

 }



productUpdate=async (req,res)=>{


    try{
        const {productName,newProductPrice}=req.body;
        console.log(req.body);

        if(!productName || !newProductPrice){
            return res.status(400).json({message:"please fill the field", success:false})
        }

        const productInfo =await productModel.findOne({productName:productName});
     
        if(!productInfo){
            return res.status(400).json({message:"product not found", success:false})
        }
          
        const productId=productInfo._id;
        const productUpdate =await productModel.findByIdAndUpdate({_id:productId},{productPrice:newProductPrice},{new:true})
        console.log(productUpdate);
         
            if(productInfo.productPrice===newProductPrice){
               return res.status(400).json({message:"you enter the old price", success:false})
           }

           else{
               return res.status(200).json({message:"product update", success:true})
           }

    }catch(e){
        console.log(e);
        return res.status(500).json({message:e.message, success:true})
    }
}


productDelete =async(req,res)=>{
    try{

        const {productName,productPrice}=req.body;
        console.log(req.body);

        if(!productName || !productPrice)
        {
            return res.status(206).json({message:"fill the field", success:false})
        }

        const productFind=await productModel.findOne({productName:productName});
        if(!productFind){
   return res.status(404).json({message:"product not found", success:false})
        }
        // else if(productFind.productName!=productName){
        //     return res.status(400).json({message:"please enter the correct productName ", success:false})
        // }
        else if(productFind.productPrice!=productPrice){
            return res.status(400).json({message:"please enter the correct productPrice", success:true})
        }
        else{
            const id=productFind._id;
            const productInfo=await productModel.findByIdAndDelete({_id:id})
              return res.status(200).json({message:"product delete Successfully", success:true})
        }



    }catch(e){
        console.log(e);
        return res.status(500).json({message:e.message, success:true})
    }
}




}

module.exports=new Productcontroller();