const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).send('Access Denied')
    }

    const token = authorization.replace('Bearer ','');

    try{
        const verified = jwt.verify(token,process.env.JWT_SECRET)
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}
