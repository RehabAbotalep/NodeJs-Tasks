const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true
    },
    content:{
        type:String,
        trim:true,
        required:true
    },
    responses:[
        {
            emp:{},
            file:{}

        }
    ],
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true

    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }

})

//handle response
taskSchema.methods.toJSON = function() {
    const task = this.toObject()
    delete task.__v
    return task
}
const Task = mongoose.model('tasks', taskSchema)

module.exports = Task