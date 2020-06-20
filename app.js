const express= require('express')
const app= express()
const config=require('./config/config')
const PORT=Number(process.env.PORT || 4500)
const mongoose= require('mongoose')
const route=require('./router/router')
const bodyParser= require('body-parser')

mongoose.Promise=global.Promise

mongoose.connect(config.DB,{useNewUrlParser:true}).then(myRes=>{
    console.log('Mongoose connection success')
},(err)=>{
    console.log('Mongoose connection failed')
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/',route)

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`)
})