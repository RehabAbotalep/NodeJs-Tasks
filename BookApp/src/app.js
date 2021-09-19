const express = require('express')
const app = express()

const routes = require('../routes/book.route')

require('dotenv').config()
require('../db/connection')

app.use(express.json())
app.use(routes)



module.exports = app