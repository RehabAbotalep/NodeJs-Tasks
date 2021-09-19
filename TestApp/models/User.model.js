const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        minlength:3,
        maxlength:20
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        //make extra validation
        validate(value){
            if(! validator.isEmail(value)) throw new Error('Invalid email')

        },
        unique: true
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:6,
        maxlength:20,
        validate(value){
            if(value.includes('123')) throw new Error('Invalid password')
        }
    },
    gender:{
        type:String,
        trim:true,
        enum:["male", "female"]
    },
    age:{
        type:Number,
        validate(value){
            if(value < 21) throw new Error('Invalide Age')
        }
    },
    created_at:{
        type:Date,
        default:new Date()
    },
    status:{
        type:Boolean,
        default:false
    }

})

module.exports = User