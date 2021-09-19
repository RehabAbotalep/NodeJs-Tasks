const app = require('./src/app')

app.listen(process.env.PORT,() =>{
    console.log(`app is listen on port ${process.env.PORT}`)
})