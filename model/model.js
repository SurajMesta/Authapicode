const mongoose= require('mongoose')
const Schema= mongoose.Schema

let Product=new Schema({
    user:{type:String,required:true,max:20,min:3},
    password:{type:String,required:true,max:10,min:5},
    email:{type:String,required:true,max:30,min:10}

},{
    collection:"mycollection"
})



module.exports=mongoose.model('Product',Product)