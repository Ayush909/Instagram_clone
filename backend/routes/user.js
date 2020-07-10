const express = require('express')
const router = express.Router();
const tokenValidation = require('../helpers/tokenValidation')
const User = require('../models/user.model');
const Post = require('../models/post.model');

router.get('/myprofile',tokenValidation,(req,res)=>{
    User.findById(req.user._id)
        .select("-password")
        .then(user=>{
            res.json({user})
        })
        .catch(err=>{
            res.status(400).json({ message: "Couldn't find  user", error: err })
        })
})

router.get('/mysuggestions',tokenValidation,(req,res)=>{
    User.findById(req.user._id)
    .select("-password")
    .then(user=>{
        User.find({
            $and : [{ followers : {$nin : req.user._id}}, {  _id :{$ne : req.user._id} }]
        })
        .limit(5)
        //User.find({followers : {$nin : req.user._id}})
        .select("-password -email")
        .then(accounts=>{
            res.json({accounts})
        })
        .catch(err=>{
            res.status(400).json({ message: "Couldn't find  suggestions", error: err })
        })
    })
    .catch(err=>{
        res.status(400).json({ message: "Couldn't find  user", error: err })
    })
})

router.get('/userProfile/:id',tokenValidation,(req,res)=>{
    User.findOne({_id : req.params.id})
        .select("-password")
        .then(userFound=>{
            Post.find({PostedBy : req.params.id})
                .populate("PostedBy","_id name")
                .then(PostsFound=>{
                    res.json({userFound,PostsFound})
                })
                .catch(err=>{
                    res.status(400).json({ message: "Couldn't find the posts by user", error: err })
                })
        })
        .catch(err=>{
            res.status(400).json({ message: "Couldn't find the user", error: err })
        })
})

router.put('/follow',tokenValidation,(req,res)=>{
    

    User.findByIdAndUpdate(req.body.followID,{
        $push : {followers : req.user._id}
    },{new : true})

    .then(result=>{

        User.findByIdAndUpdate(req.user._id,{
            $push : {following : req.body.followID}
        },{new : true})
        .select("-password")
        .then(result=>{
            res.json({result});
        })

        .catch(err=>{
            res.status(400).json({ message: "Couldn't update following list of the yours", error: err })
        })

    })
    .catch(err=>{
        res.status(400).json({ message: "Couldn't update follower of the user", error: err })
    })
})
router.put('/unfollow',tokenValidation,(req,res)=>{

    User.findByIdAndUpdate(req.body.followID,{
        $pull : {followers : req.user._id}
    },{new : true})

    .then(result=>{

        User.findByIdAndUpdate(req.user._id,{
            $pull : {following : req.body.followID}
        },{new : true})
        .select("-password")
        .then(result=>{
            res.json({result});
        })

        .catch(err=>{
            res.status(400).json({ message: "Couldn't update following list of the yours", error: err })
        })

    })
    .catch(err=>{
        res.status(400).json({ message: "Couldn't update follower of the user", error: err })
    })
})

router.put('/dpupload',tokenValidation,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{
        dpURL : req.body.dpURL
    },{new : true})
    .select("-password")
    .then(updatedUser=>{
        res.json({updatedUser})
    })
    .catch(err=>{
        res.status(400).json({ message: "Couldn't update dpURL", error: err })
    })
})

module.exports = router;