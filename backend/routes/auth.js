const express=require("express");
const router=express.Router();
const User =require("../models/User");
const {body,validationResult}=require("express-validator");
const bcrypt=require("bcryptjs");
const jwt =require("jsonwebtoken");
const fetchuser=require("../middleware/fetchuser")
const JWT_secret="Hey how u doin?"

router.post("/createuser",[body("name","Enter a valid username").isLength({min:3}),body("email","Enter a valid email").isEmail(),body("password","Password must minimum 5 characters").isLength({min:5})],async (req,res)=>{
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {return res.status(400).json({success,erros:errors.array()});
   }
   try{
   let user=await User.findOne({email:req.body.email});
   if(user){
     return res.status(400).json({success,error:"Sorry a user with that emial already exists"});
   }
   const salt=await bcrypt.genSalt(10);
   const secPass=await bcrypt.hash(req.body.password,salt);
    user=await User.create({
       name:req.body.name,
       password:secPass,
       email:req.body.email
     });
     const data={
       user:{
         id:user.id
       }
     };
     const authToken=jwt.sign(data,JWT_secret);
     success=true;

     res.json({success,authToken});
   } catch(error){
     console.log(error.message);
     res.status(500).send("Soem Error occured");
   }
});


router.post("/login",[body("email","Enter a valid email").isEmail(),body("password","Password shoouldnt be blank").exists()],async (req,res)=>{
    let success =false;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {return res.status(400).json({erros:errors.array()});
   }
   const {email,password}=req.body;

   try {
    let user=await User.findOne({email});
    if(!user)
    {
      success = false;
      return res.status(400).json({error:"Please enter valid credentials"})
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success=false;
      return res.status(400).json({success,error:"Please enter valid credentials"})
    }
    const data={
      user:{
        id:user.id
      }
    };
    const authToken=jwt.sign(data,JWT_secret);
    success=true;
    res.json({success,authToken});
   } catch(error){
     console.log(error.message);
     res.status(500).send("Soem Error occured");
   }
 });
 router.get("/getuser",fetchuser,async (req,res)=>{
    try {
      const userId=req.user.id;
      const user=await User.findById(userId).select("-password");
      res.send(user);
    } catch(error) {
      console.log(error);
      res.status(500).send("Soem Error occured");
    } });
module.exports=router
