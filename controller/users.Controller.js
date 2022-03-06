
const userModel =require('../modules/user.Schema')
const tokenGenerate =require('../middleware/tokenGenerate')

class Usercontroller{


    register = async (req,res)=>{
        try{

             const {userName ,password}=req.body;
             console.log(req.body);

             if(!userName || !password){
                 return res.status(400).json({message:"please fill the field", success:false})
             } 

              const userInfo = await userModel.findOne({userName:userName});
              console.log(userInfo);
              if(userInfo){
                  return res.status(400).json({message:"user allready exist", success:false})
              }

              else{

                   const info =  new userModel({
                        userName:userName,
                        password:password
                   });

                   const userSave =info.save();
                   return res.status(200).json({message:"user save", success:true})
              }

              
        }catch(err){
            return res.status(500).json({message:err.message, success:false})
        }
    }


    login = async (req,res)=>{

        try{
            const {userName,password}=req.body;

            if(!userName || !password){
                return res.status(400).json({message:"please fill the field", success:false})
            }

               const userInfo =await userModel.findOne({userName:userName});
               if(!userInfo){
                   return res.status(400).json({message:"user not found", success:false})
               }
               else if(userInfo.password!=password){
                   return res.status(400).json({message:"password not found", success:false})
               }
               else{
                   const token =tokenGenerate(userInfo)
return res.status(200).json({message:"user login success", success:true,token})
               }



        }catch(err){
            return res.status(500).json({message:err.message, success:true})
        }
    }


    update=async (req,res)=>{


        try{
            const {userName,newPassword}=req.body;
            console.log(req.body);

            if(!userName || !newPassword){
                return res.status(400).json({message:"please fill the field", success:false})
            }

            const userInfo =await userModel.findOne({userName:userName});
         
            if(!userInfo){
                return res.status(400).json({message:"user not found", success:false})
            }
              
            const userId=userInfo._id;
            const userUpdate =await userModel.findByIdAndUpdate({_id:userId},{userName:userName,password:newPassword},{new:true})
            console.log(userUpdate);
             
                if(userInfo.password===newPassword){
                   return res.status(400).json({message:"you enter the old password", success:false})
               }

               else{
                   return res.status(200).json({message:"user update", success:true})
               }

        }catch(err){
            console.log(err);
            return res.status(500).json({message:err.message, success:true})
        }
    }


    delete=async (req,res)=>{

        try{

        const {userName,password}=req.body;
        // console.log(req.body);
        if(!userName || !password){
          return res.status(400).json({message:"please fill the field", success:false})
        }
        const userdata =await userModel.findOne({userName:userName});
        console.log(userdata);
          
            console.log(userdata);
            if(!userdata){
                return res.status(400).json({message:"please enter the correct userName", success:false})
            }

            else if(userdata.password!=password){
                return res.status(400).json({message:"please enter the correct password", success:false})
            }
       
       else{
        const usersdata=userdata._id;
        const userDelete=await userModel.findByIdAndDelete({_id:usersdata},{new:true})
        console.log(userDelete);
  
        return res.status(200).json({message:"user delete ", success:true})
       }

        }catch(err){
            console.log(err.message);
            return res.status(500).json({message:err.message, success:false})
        }


    }


}

module.exports=new Usercontroller();