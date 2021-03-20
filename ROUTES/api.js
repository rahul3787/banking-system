const express = require('express');
const { check, validationResult } = require('express-validator');
const router =express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs =require('bcryptjs');
const UserSchema = require('../config/User')
const Account = require('../config/account')
const config = require('config')
const jwtSecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
const auth =require("../middleware/auth")
router.get('/user',auth,async(req,res)=>{
  try {
    const User =await UserSchema.findById(req.user.id).select('-password');
    res.json(User);
  } catch (error) {
    console.log(errors.message);
        return res.status(500).json({ msg : "server s...."})
        
  }
}
)
router.post('/reg',
[
    check('email','e-mail is required').isEmail(),
    check('password','password is required').not().isEmpty()
],
  async (req,res)=>{
    try {
      let {email,password}= req.body;
      let user = await UserSchema.findOne({email: email})
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(401).json({ errors: errors.array()});
       }
      
      if(user){
        return res.status(400).json({msg:"ther is already user with this name"});
      }
      const salt = await bcryptjs.genSalt(10);
      password = await bcryptjs.hash(password,salt);
      user = new UserSchema({
        email,
        password
      });
      await user.save();
      const payload ={
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload,
        jwtSecret,
        (err,token) =>{
          if(err) throw err;
          res.json({token});
        }
      )
      // res.send(req.body);
    } catch (errors) {
      console.log(errors.message);
      return res.status(500).json({ msg : "server s...."})
      
    }
  }
  )
  router.post('/login',
  [
      check('email','e-mail is required').isEmail(),
      check('password','password is required').not().isEmpty()
  ],
   async (req,res)=>{
      try {
        let {email,password}= req.body;
        let user = await UserSchema.findOne({email})
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(401).json({ errors: errors.array()});
         }
        
        if(!user){
          return res.status(401).json({msg:"their is no user with this email"});
        }
        let isPasswordMatch = await bcryptjs.compare(password,user.password);
        if(isPasswordMatch){
          const payload ={
            user: {
              id: user.id
            }
          }
          jwt.sign(
            payload,
            jwtSecret,
            (err,token) =>{
              if(err) throw err;
              res.json({token});
            }
          )
        }else return res.status(401).json({msg : "wrong password"})
      } catch (errors) {
        console.log(errors.message);
        return res.status(500).json({ msg : "server s...."})
        
      }
    }
    )
    // router.get('/api',(req ,res)=>{
    //   try {
    //     let email = req.body;
    //     let Data = Account.findOne({email})
        
    //       res.json(Data);
 
      
    //   } catch (error) {
    //     console.log('error', daerrorta)
    //   }
     
           
  
    //    });
      
       router.post('/apis', async (req, res) => {
        try {
          let {email}= req.body;
          const Data = await Account.find({email})
          res.json(Data)
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
      })
      router.post('/all', async (req, res) => {
        try {
          
          const Data = await Account.find({ })
          res.json(Data)
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
      })
  

  
  
  
  
  
  
  // API ADD FILE Data
  router.post('/single',  (req, res) => {
      
   
      const newAccountPost = new Account({
          id : req.body.id,
          email : req.body.email,
          title: req.body.title,
          amount :req.body.amount,
          note :req.body.note,
          totalbal :req.body.totalbal,
          date :req.body.date,
          status : req.body.status,
          
      });
  
      console.log(newAccountPost, "newAccountPost")
  
      newAccountPost.save((error)=>{
          if (error){
              res.status(500).json({msg : 'sorry, internal server errors'});
          }else {
              res.json({
                  msg:'your data has been saved'
              });
          }
      })
  
      
    });
module.exports = router;