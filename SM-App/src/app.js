const express = require('express')
const app = express()
const userRoute=require('../routes/user.routes')

require('dotenv').config()
require('../models/db/connection')

const cors = require('cors')

app.use( cors() )
app.use( express.urlencoded( { extended:true } ) )
app.use( express.json() )

app.use('/user', userRoute)


module.exports=app