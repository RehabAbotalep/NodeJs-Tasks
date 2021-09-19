const app = require('./src/app')
app.listen(process.env.PORT, ()=>{
    console.log(`app is on ${process.env.PORT} port`)
})