const User = require('../models/user.model')

const register = async(req, res) => {

    try{
        const user = User(req.body)
        await user.save()
        res.status(200).send({
            status:true,
            data:user,
            message:"Registerd successfully"
        })
    }
    catch(e){
        res.status(500).send({
            status:false,
            data:e.message,
            message:"Error"
        })
    }
}

const login = async(req, res) => {
    try{
        const user = await User.login(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.status(200).send({status:true, data:{user:user, token:token}, message:"Login successufully"})
    }
    catch(e) { res.status(500).send({status:false, data:e.message, message:"Error"}) }

}

//user profile
const me = async(req, res) => {
    res.status(200).send({status:true, data:req.user, message:"user profile"}) 
}

const logout = async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token != req.token
        })
        req.user.save()
        res.status(200).send({status:true, data:"", message:"Login successfully"}) 

    }
    catch(e){ res.status(500).send({status:false, data:e.message, message:"Error"}) }
}

const update = async(req, res) => {
    try{
        const user = req.user
        user.name = req.body.name
        user.age = req.body.age
        user.email = req.body.email
        
        await user.save()
        res.status(200).send({status:true, data:user, message:"Updated successfully"})

    }
    catch(e){ res.status(500).send({status:false, data:e.message, message:"Error"}) }
}



module.exports = {register, login, me, logout, update}