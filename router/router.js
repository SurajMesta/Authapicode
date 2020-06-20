const express= require('express')
const appRouter= express.Router()
const controller= require('../controller/controller')


appRouter.route('/').get(controller.home)
appRouter.route('/signup').post(controller.newPost)
appRouter.route('/login').post(controller.login)



module.exports=appRouter