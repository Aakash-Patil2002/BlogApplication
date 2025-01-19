const express=require('express');
const router=express.Router();

const verifyuser=require('../middelware/auth-middelware');
const profile=require('../controller/profileController').profile;
const addblog=require('../controller/blogController').addblog;
const getblogs=require('../controller/blogController').getblogs;
const myblogs=require('../controller/blogController').myblogs;
const getBlogDetail=require('../controller/blogController').getBlogDetail;
const deleteBlog=require('../controller/blogController').deleteBlog;

router.post('/profile',verifyuser,profile);
router.post('/addblog',verifyuser,addblog);
router.get('/deleteblog/:blogId',deleteBlog);
router.get('/myblogs/:id',verifyuser, myblogs);
router.get('/getDetails/:id',getBlogDetail)
router.get('/',getblogs)
module.exports=router;
