const express = require('express')
const app = express()
const path = require('path')

const publicDir = path.join('__dirname', '../public')

app.use(express.static(publicDir))
app.set('view engine', 'hbs')

app.get('', (req, res) => {
    res.render('home')
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.get('/tasks', (req, res) => {
    res.render('allTasks')
})
app.listen(3000)