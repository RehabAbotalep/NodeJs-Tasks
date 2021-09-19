const mongoose = require('mongoose')
const validator = require('validator')

const book = mongoose.model('books', {
    name:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true,
        enum:["web", "mobile", "desktop"]
    },
    pages_num:{
        type:Number,
        required:true,
        minlength:50
    }
})

module.exports = book