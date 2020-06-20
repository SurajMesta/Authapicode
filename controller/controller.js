const Product=require('../model/model')
const assert= require('assert')
const joi=require('@hapi/joi')

const bcrypt= require('bcryptjs')


let Schema={
    signVerify:joi.object({
        user:joi.string().required().max(20).min(3),
        password:joi.string().required().max(20).min(5),
        email:joi.string().email().required().max(30).min(10)
    })
}



module.exports={
    home:(req,res)=>{
        Product.find((err,data)=>{
            if(err){
                assert.equal(err,null)
            }

            else{
                res.json(data)
            }

        })
    },

    newPost:(req,res)=>{
      let data;

      
       
     let result= Schema.signVerify.validate(req.body)
     if(result.error){
        res.send(result.error.details[0].message)
     }
     else{
         Product.findOne({email:req.body.email}).then(myData=>{
            if(myData){
                console.log('Email already Taken')
                res.send('Email already taken')
            }

            else{
                bcrypt.genSalt(10,(err,salt)=>{
                    console.log(salt)
                    bcrypt.hash(req.body.password,salt,(err,hash)=>{
                      console.log(hash)
                         

                      data= new Product({user:req.body.user,
                      password:hash,
                      email:req.body.email})
                              

                      data.save().then(myRes=> {
                          res.send('Data Save Success You May Login Now....')
                      }).catch(err=>{
                          res.send('Data Save Failed. Please try after sometime....')
                      })

                        

                       
                    })
                })
                
            }
         }).catch(err=>{
             console.log(err)
         })
     }
   
        
       
        
        

    },

    login:(req,res)=>{
       
   
        Product.findOne({email:req.body.email}).then(data=>{
         if(data){
           
             bcrypt.compare(req.body.password,data.password,(err,isMatch)=>{
                 if(err){
                     res.send(err)
                 }
                 else{
                     if(isMatch){
                         res.send('Login Success')
                     }
                     else{
                         res.send('Login Failed')
                     }
                 }
             })
         }
         else{
             res.send('Email/Password does not match')
         }
             
        }).catch(err=>{
            res.send('Error')
        })
    }

}