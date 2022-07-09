

const jwt= require('jsonwebtoken')

module.exports= function auth(req,res,next){
    // console.log(req.header('auth_token'))
    const token= req.header('auth_token')
    if(!token) return res.status(401).send('Access Denied!!')
    try{
        const verified= jwt.verify(token,process.env.TOKEN)
        // console.log("data",verified)
        req.user=verified;
        next();
    }catch(err){
        res.status(400).send('invalid token !')
    }
};