const User=require('../models/userModel');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');

const generateToken = (user) => {
    const payload = { id: user._id, email: user.email }; 
    const secret = process.env.SECTRET_KEY; 
    const options = { expiresIn: '10h' }; 
  
    return jwt.sign(payload, secret, options);
};

exports.login=(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email}).then((user)=>{
        if(!user){
            return res.status(400).json({msg:"User not found"})
        }
        bcrypt.compare(password,user.password).then((ismatch)=>{
            if(!ismatch){
                return res.status(400).json({msg:"Wrong password"});
            }
            const token=generateToken(user);
            res.status(200).json({token:token,msg:"Logged in successfully"});

        })
    }).catch((err)=>{console.log(err)});

}

exports.register=(req,res)=>{
    const {username,email,password}=req.body;
    User.findOne({email}).then((user)=>{
        if(user){
            return res.status(400).json({msg:"User already exist"});
        }
        bcrypt.hash(password,10).then((hashpassword)=>{
            const newUser=new User({
                username,
                email,
                password:hashpassword,
            })
            newUser.save().then((user)=>{
               const token=generateToken(user);
               return res.status(200).json({token:token,msg:"User Registered successfully"});
            }).catch((error)=>{console.log("error while registering user",error)})

        }).catch((e)=>{console.log("Error while hashing password",e)})
        
    }).catch((error)=>{
        console.log(error)
    })
}


