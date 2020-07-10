const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model');
const tokenValidation = require('../helpers/tokenValidation')

// router.get('/protected',tokenValidation,(req,res)=>{
//     res.send('this is a protected resource');
// }) for testing

router.post('/signup', async (req,res)=>{
    const {name,email,password} = req.body;

    //check if all fields are filled
    if(!name || !email || !password){
        return  res.status(422).send('Please send all fields')
    }

    //check if email already exists
    const emailExist = await User.findOne({email : email});
    if(emailExist){
        return res.status(400).send('Email already exists!')
    } 

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = new User({
        name,
        email,
        password : hashedPassword
    })

    try{
        const savedUser = await user.save();
        const {email,name,_id} = savedUser;
        res.send({user: {email,name,_id}});
    }catch(err){
        res.status(400).send(err);
    }

    

    res.send("Successfully posted");
})

router.post('/signin', async (req,res)=>{
    const {email, password} = req.body;

     //check if all fields are filled
     if(!email || !password){
        return  res.status(422).send('Please send all fields')
    }

     //check if email exists or not
     const saveduser = await User.findOne({email :email})
     if(!saveduser) return res.status(400).send('This email does not exists.')
 
     //check password
     const validPass = await bcrypt.compare(password,saveduser.password)
     if(!validPass) {
        return res.status(400).send('Invalid email or password')
     }else {
        const token = jwt.sign({_id: saveduser._id},process.env.JWT_SECRET)
        const {_id,name,email,followers,following,dpURL} = saveduser;
        return res.json({token,user:{_id,name,email,followers,following,dpURL}});
     }


})

module.exports = router;