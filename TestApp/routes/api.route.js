const router = require('express').Router()
const userController = require('../controllers/userController')
const User = require('../models/User.model')


router.post('/register', async(req, res) => {
    try{
        const user = new User(req.body)
        await user.save()
        res.send(user)

    }catch(e){
        res.send(e)
    }
})

router.get('/users', async(req, res) => {
    try{
        const users = await User.find()
        res.send(users)

    }catch(e){
        res.send(e)
    }
})

router.get('/users/:id', async(req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user) res.send('User not found')
        res.send(user)

    }catch(e){
        res.send(e)
    }

})

router.delete('/users/:id', async(req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) res.send('user not found')
        res.send('deleted successfulley')

    }catch(e){
        res.send(e)
    }
})

router.patch('/users/:id', async(req, res) => {
    avalUpdatates = ["name", "age"]
    requested = Object.keys(req.body)
    isValid = requested.every( r => avalUpdatates.includes(r) )
    if(!isValid) res.send('updates unavaliable')

    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
        if(!user) res.send('user not found')
        res.send('done')
        
    }catch(e){
        res.send(e)
    }
})
module.exports = router