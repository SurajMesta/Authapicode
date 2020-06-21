const jwt= require('jsonwebtoken')
const TOKEN_SECRET='shajahsjahsjahs'

module.exports=function(req,res,next){
    const token=req.header('token')

    if(!token) return res.status(401).send('Access-Denied Please login to view the content')


    try{
        const verified=jwt.verify(token,TOKEN_SECRET)
        req.user=verified
      
        next()

    }catch(err){
        res.send('Error')
    }
}
