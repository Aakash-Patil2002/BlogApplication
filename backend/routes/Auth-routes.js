const express=require('express');
const router=express.Router();
const login=require('../controller/authController').login;
const register=require('../controller/authController').register;

router.post("/login",login);
router.post('/register',register);


module.exports=router;