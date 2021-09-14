//define built-in packages
const path = require('path')

//define installed packages
const express = require('express')
const hbs = require('hbs')

//define user routes
const userRoutes = require('../routes/user.route')

//define app object that hold all express functions
const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join('__dirname', '../resources/views'))

app.use(express.static(path.join('__dirname', '../public')))
app.use(express.urlencoded())

hbs.registerPartials(path.join('__dirname', '../resources/layouts'))

app.use(userRoutes)

//export app
module.exports = app