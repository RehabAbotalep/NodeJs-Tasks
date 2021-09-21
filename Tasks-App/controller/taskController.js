const upload = require('../middleware/fileUpload')
const Task = require('../models/task.model')
const User = require('../models/user.model')

const add = async(req, res) => {
    try{
        const user = req.user
        if(user.position != "manager") 
            res.status(403).send( { status:false, data:"", message:"you have no access to add task"})

        const task = new Task({
            title:req.body.title,
            content:req.body.content,
            addedBy: user._id
        })
        await task.save()
        res.status(200).send( { status:true, data:task, message:"task added"})
    }
    catch(e){
        res.status(500).send({ status:false, data:e.message, message: "Error" })
    }
}

const assign = async(req, res) => {
    try{
        const user = req.user
        if(user.position != "manager") 
            res.status(403).send( { status:false, data:"", message:"you have no access to add task"})
        
        
        const assignee = await User.findById(req.body.assignedTo)

        if(assignee.position != "employee") 
            res.status(400).send( { status:false, data:"", message:"you have to assign to employee only"})

        const task = await Task.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send( { status:true, data:task, message:"task assigned"})
    }
    catch(e){
        res.status(500).send({ status:false, data:e.message, message: "Error" })
    }

}

const uploadFile = async(req, res) => {
    const user = req.user
    if(user.position != "manager") 
        res.status(403).send( { status:false, data:"", message:"you have no access to add task"})

    const task = await Task.findById(req.params.id)
    const resp = {emp: user._id, file:req.file.filename}
    task.responses.push(resp)
    await task.save()

    res.status(200).send({ status:true, data:task, message: "Uploaded Successfully" })
}

module.exports = {add, assign, uploadFile}