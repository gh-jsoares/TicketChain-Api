const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes').router
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/', routes)

const port = process.env.PORT || 8090;
app.listen(port)
console.log('TicketChain is running at ' + port)