const router = require('express').Router()
const User = require('../models/user.model')
const emailSetting = require('../helpers/sendEmail.helper')


router.post('/register', async(req, res)=>{
    try{
        const user = new User(req.body)
        await user.save()
        emailSetting(user.email, "Thank you for register to SM-App")
        res.status(200).send({
            apiStatus:true,
            data: user,
            message:"registerd successfully",
        })

    }catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"Error in register",

        })
    }  
})

router.post('/:id/addAddress', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        const address = req.body
        user.addresses.push(address)
        await user.save()
        res.status(200).send({
            apiStatus:true,
            data: user,
            message:"registerd successfully",
        })

    }catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"Error in register",

        })
    }
}), 

router.post('/login', async(req, res) => {
    try{
        let user = await User.login(req.body.email, req.body.password)
        res.status(200).send({apiStatus:true, data: user, message:"login successfully"})

    }catch(e){
        res.status(500).send({apiStatus:false, data:e.message, message:"Error in Login"})
    }

})

module.exports = router