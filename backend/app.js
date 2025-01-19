const express=require("express");
const app= express();
const path=require('path')
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const multer=require('multer');

require('dotenv').config();
const PORT=process.env.PORT || 5001;
const DATABASE_URL=process.env.DATABASE_URL;

const authRouter=require('./routes/Auth-routes');
const mainRouter=require('./routes/Main-routes');

app.use(bodyParser.json());
app.use('/Uploads',express.static(path.join(__dirname,"Uploads")));


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Methods",'GET,POST,PUT,PATCH,DELETE');
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
    next();

})

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./Uploads')
    },
    filename:(req,file,cb)=>{
        const timeStamp=Date.now();
        cb(null,timeStamp+"-"+file.originalname);
    }
});


app.use(multer({storage:fileStorage}).single('image'))


app.use(authRouter);
app.use(mainRouter);




mongoose.connect(DATABASE_URL).then((success)=>{
    console.log("code connected to database successfully");
}).catch((error)=>{
    console.log(error);
})

app.listen(PORT,()=>{
    console.log(`apllication is runing at ${PORT}`);
});