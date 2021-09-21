const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()
require('../models/db/connection')

const userRoutes = require('../routes/user.route')
const taskRoutes = require('../routes/task.route')


app.use(cors())
app.use( express.urlencoded( { extended : true } ) )
app.use( express.json() )

app.use(userRoutes)
app.use('/tasks', taskRoutes)

module.exports = app