const  mongoose  = require("mongoose");
const Blog = require("../models/blogModel");
const User=require("../models/userModel");


exports.addblog = (req, res) => {
  const { title, content, category, tags } = req.body;
  const image=req.file.path.replace("\\",'/');

  const imgUrl=`http://localhost:5001/${image}`;
 
  const newBlog = new Blog({
    title,
    content,
    category,
    author:req.userId,
    image:imgUrl,
    tags,
  });

  newBlog.save().then((blogUploaded)=>{
    if(!blogUploaded){
        res.status(400).json({error:"Blog failed to upload"});
    }
    res.status(200).json({msg:"success",data:blogUploaded});
  }).catch((error)=>{
    console.log(error);
  })
};

exports.getblogs=(req,res)=>{

  Blog.aggregate([{$lookup:{from:"blogusers",localField:"author",foreignField:'_id',as:"userdetails"}},{
    $unwind: "$userdetails"
  }]).then((blogs)=>{
    if(!blogs){
      return res.status(404).json({msg:"blogs not found"});
    }
    res.status(200).json({blogs});
  }).catch((error)=>{
    console.log(error);
  })
}

exports.myblogs=(req,res)=>{
  const authorId=new mongoose.Types.ObjectId(req.userId);
  Blog.aggregate([{$match:{author:authorId}},{$lookup:{from:"blogusers",localField:"author",foreignField:'_id',as:"userdetails"}},{
    $unwind: "$userdetails"
  }]).then((myblogs)=>{
    res.status(200).json({myblogs:myblogs})
  }).catch((error)=>{
    console.log(error);
  })

 
}


exports.getBlogDetail=(req,res)=>{
   const {id}=req.params;
   const blogId=new mongoose.Types.ObjectId(id)
   Blog.aggregate([{$match:{_id:blogId}},{$lookup:{from:"blogusers",localField:"author",foreignField:'_id',as:"userdetails"}},{
    $unwind: "$userdetails"
  }]).then((blog)=>{
    if(!blog){
      return res.status(400).json({msg:"blog Not found"});
    }
    res.status(200).json({blog:blog[0]});
   }).catch((error)=>{
    console.log(error);
   })
}


exports.deleteBlog=(req,res)=>{
  Blog.findByIdAndDelete(req.params.blogId).then((deleted)=>{
    res.status(200).json({msg:"Blog deleted successfully"});
  }).catch((error)=>{
    console.log("Internal server Error",error);
  })
  
}
