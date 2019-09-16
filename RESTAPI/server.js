let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let server = express()

server.use(cookieParser())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

let groups = require('./groups.js')
server.use('/groups', groups)

server.listen(3000)


