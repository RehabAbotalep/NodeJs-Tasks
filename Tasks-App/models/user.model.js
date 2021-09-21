const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validation(value){
            if( !validator.isEmail(value) ) throw new Error("Invalid email address")
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
    },
    age:{
        type:Number,
        trim:true,
    },
    position:{
        type:String,
        trim:true,
        required:true,
        enum:["manager", "employee", "ceo"]
    },
    tokens:[
        {token:{}}
    ]
})

//handle response
userSchema.methods.toJSON = function() {
    const user = this.toObject()
    delete user.password
    delete user.__v
    delete user.activationToken
    delete user.createdAt
    delete user.updatedAt
    delete user.tokens
    return user
}

//encrypt password
userSchema.pre('save', async function(){
    const user = this
    if( user.isModified('password') ){
        user.password = await bcrypt.hash(user.password, 12)
    }
})

//login user
userSchema.statics.login = async(email, password) => {
    const user = await User.findOne({email})
    if(!user) throw new Error('Invalid login data')
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword) throw new Error('Invalid login data')
    return user
}

//generate token 
userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


const User = mongoose.model('users', userSchema)
module.exports = User