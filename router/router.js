const express= require('express')
const appRouter= express.Router()
const controller= require('../controller/controller')
const verify= require('./verifyToken')


appRouter.route('/').get(controller.home)
appRouter.route('/signup').post(controller.newPost)
appRouter.route('/login').post(controller.login)
appRouter.route('/posts').get(verify,controller.posts)


module.exports=appRouter
