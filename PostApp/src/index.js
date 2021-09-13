//define port
const PORT = 3000

//define built-in packages
const path = require('path')
const https = require('https')

//define installed packages
const express = require('express')
const hbs = require('hbs')

//define app object from express that holds all express functions
const app = express()

//define pathes (public-views-layouts)
const publicDir = path.join('__dirname', '../public')
const viewDir = path.join('__dirname', '../resources/views')
const partialDir = path.join('__dirname', '../resources/layouts')

//set view engine
app.set('view engine', 'hbs')

//set and use directories
app.use(express.static(publicDir))
app.set('views', viewDir)
hbs.registerPartials(partialDir)

//get data from external api and show it in home page

getApiData = (url, cb) => {
    const req = https.request(url, (res) => {
        let data = ""
        res.on('data', (chunk) =>{
            data+=chunk.toString()
        })
        res.on('end', ()=>{
            cb(JSON.parse(data), false)
        })
    })
    req.on('error', (err) => cb(false, err))
    req.end()
}

//Routes
app.get('', (req, res) => {
    const url = "https://jsonplaceholder.typicode.com/posts"

    data = getApiData(url, (result, err) => {
        if(err) res.render('404', {title : '404'})
        else res.render('home', {title : 'Home', data: result})
    })
})

app.get('/post', (req, res) => {
    res.render('post', {
        title : 'Post'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404'
    })
})
app.listen(PORT, ()=>{console.log(`app is listen to port ${PORT}`)})