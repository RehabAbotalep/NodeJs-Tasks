const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('Invalid email address')
        }
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error('Invalid mobile number')
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        Match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    },
    //inner relation
    addresses:[
        {
            addrType:{
                type:String,
                trim:true,
            },
            addrDetails:{
                type:String,
                trim:true,
            }
        }
    ],
    age:{
        type:Number,
        validate(value){
            if(value<21) throw new Error('age must be lagerer than 21')
        }
    },
    image:{
        type:String,
        trime:true
    },
    status:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

//handle response
userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.__v
    delete user.createdAt
    delete user.updatedAt
    return user
}

//encrypt password
userSchema.pre('save', async function(){
    const user = this
    //لو الداتا الى جايه فيها باسورد هيتشفر شفره لو لا خلاص 
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 12)
    }
    
})


userSchema.statics.login = async(email, password) => {
    const user = await User.findOne({email})
    if(!user) throw new Error('Invalid login data')
    const isVlaidPassword = await bcrypt.compare(password, user.password)
    if(!isVlaidPassword) throw new Error('Invalid login data')
    return user
}


const User = mongoose.model('users', userSchema)

module.exports = User