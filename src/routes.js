const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')

const UserController = require('./controller/UserController')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.post('/users', upload.single('foto'), UserController.store)
routes.get('/users', UserController.index)
routes.get('/users/:nome', UserController.indexName)
routes.get('/user/:key', UserController.show)

module.exports = routes