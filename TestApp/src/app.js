const express = require('express')
const app = express()
const api = require('../routes/api.route')

require('dotenv').config()
require('../db/connection')


app.use(express.json())
app.use(api)
module.exports = app