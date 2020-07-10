const express = require('express');
const Post = require('../models/post.model');
const User = require('../models/user.model')
const router = express.Router();
const tokenValidation = require('../helpers/tokenValidation')


router.get('/allposts',tokenValidation,(req,res)=>{
    Post.find()
        .populate('PostedBy',"_id name")
        .populate("comments.postedBy")
        .sort('-createdAt')
        .then(posts=>{
            res.json({posts})
        })
        .catch(err=>{
            res.status(404).send(err);
        })
})

router.post('/createpost',tokenValidation,(req,res)=>{
    const {title,body,imageURL} = req.body;
    console.log(title+" " + body + " " + imageURL)
    if(!title || !body || !imageURL){
        return res.status(422).send('Please provide all the details');
    }

    const post = new Post({
        title,
        body,
        photoURL : imageURL,
        PostedBy : req.user
    })

    post.save()
        .then(result=>{
            res.json({post:result});
        })
        .catch(err=>{
            res.status(500).send(err);
        })
})
//get your posts details : called on profile page (react)
router.get('/myposts',tokenValidation,(req,res)=>{
    
    Post.find({PostedBy : req.user})
        .populate("PostedBy" , "_id name")
        .populate("comments.postedBy","name _id")
        .then(posts=>{
            res.json({myposts: posts});
        })
        .catch(err=>{
            res.status(404).send(err);
        })
})
//like & unlike the post 
router.put('/like',tokenValidation,(req,res)=>{

    Post.findById(req.body.postID)
        .then(res=>{
            let isExists;
            let likesArr = res.likes ;
            if(!likesArr.includes(req.user._id)){
                isExists = false;
                return isExists;
            }else{
                
                isExists = true;
                return isExists                
            } 
        })
        .then(isExists=>{
            //if user not liked before
            if(!isExists){
                Post.findByIdAndUpdate(req.body.postID,{
                    $push : {likes : req.user._id}
                },{
                    new : true
                })
                .then(response=>{
                    res.json(response)
                })
                .catch(err=>{
                    console.log(err)
                })
            }else{ //if user has liked before
                Post.findByIdAndUpdate(req.body.postID,{
                    $pull : {likes : req.user._id}
                },{
                    new : true
                })
                .then(response=>{
                    res.json(response)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })

        
    

})

//comment on a post route
router.put('/comment',tokenValidation,(req,res)=>{
    const newComment = {
        text : req.body.text,
        postedBy : req.user._id
    }

    Post.findByIdAndUpdate(req.body.postID,{
        $push : {comments : newComment}
    },{
        new : true
    })
    .populate("comments.postedBy","_id name")
    .then(response=>{
        res.json(response)
    })
    .catch(err=>{
        console.log(err)
    })

})


router.delete('/deletepost/:postId',tokenValidation,(req,res)=>{
    Post.findOne({_id: req.params.postId})
        .populate("PostedBy","_id")
        .then(postFound=>{
            if(postFound.PostedBy._id.toString() === req.user._id.toString()){
                postFound.remove()
                    .then(result=>{
                        res.json({ message: "post deleted" , result })
                    })
                    .catch(err=>{
                        res.status(400).json({ message: "Couldn't delete the post", error: err })
                    })
            }else{
                res.status(400).json({ message: "Not Authorized" })
            }
        })
        .catch(err=>{
            res.status(400).json({ message: "Couldn't find the post", error: err })
        })
})


router.get('/myfollowingposts',tokenValidation,(req,res)=>{

    User.findById(req.user._id)
    .select("-password")
    .then(user=>{
        Post.find({PostedBy : {$in : user.following}})
        .populate('PostedBy',"_id name dpURL")
        .populate("comments.postedBy")
        .sort('-createdAt')
        .then(posts=>{
            res.json({posts})
        })
        .catch(err=>{
            res.status(404).send(err);
        })
    })
    .catch(err=>{
        res.status(400).json({ message: "Couldn't find  user", error: err })
    })

    
})

module.exports = router;