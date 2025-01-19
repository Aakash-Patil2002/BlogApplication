const User=require('../models/userModel');
exports.profile=(req,res)=>{
    User.findById(req.userId).select('-password').then((user)=>{
       if(!user){
        return res.status(400).json({msg:"User not found"});
       }

       res.status(200).json({user});
        
    }).catch((error)=>{console.log(error)})
}