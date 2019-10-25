const app = require('express')()
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const cors = require('cors')

const corsOptions = {
  'credentials': true,
  'origin': true,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'allowedHeaders': 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept',
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/', require('./router'))
port = 8080

server.listen(port, ()=> { console.log('Server worked in', port, 'port!!!') })
