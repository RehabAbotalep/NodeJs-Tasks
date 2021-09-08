//call modules
const fs = require('fs')
const validator = require('validator')
const chalk = require('chalk')

//read data from json file
readDataFromJsonFile = () =>{
    let data
    try{
        data = JSON.parse(fs.readFileSync('./tasks.json').toString())
        if(!Array.isArray(data)) throw new Error('msh array')
    }
    catch(e){
        data = []
    }
    return data
}
//write data to Json File
writeDataToJsonFile = (data)=>{
    try{
        fs.writeFileSync('./tasks.json', JSON.stringify(data))
    }
    catch(e){
        console.log(chalk.red('error writing data'))
    }
}
//add new task
addTask = (data) => {
    let tasks = readDataFromJsonFile()

    //validate that title is unique
    index = tasks.findIndex(t=>data.title==t.title)

    if(index !=-1) return console.log(chalk.red('this task is already exists '))
    
    let task = {
        status: false,
        id : parseInt((Date.now()) * Math.random()),
        ...data
    }
    tasks.push(task)
    writeDataToJsonFile(tasks)
    console.log(chalk.green(`data inserted successfuly and you task id is ${task.id}`))

    
}

//show all tasks
showAll = () => {
    tasks = readDataFromJsonFile()
    tasks.forEach(task => {
        console.table(task)
        
    });
}

//findindex filter find(filter return an array of data , find(return all data for the result object) 
//and findindex return index of only one item)

searchTask = (taskId) => {
    let tasks = readDataFromJsonFile()
    let result = tasks.find(t => {
        return taskId == t.id
    })

    console.log(result)
}
//delete using filter
deleteTaskByFilter = (taskId) => {
    let tasks = readDataFromJsonFile()
    tasks = tasks.filter(t=> taskId !=t.id)
    writeDataToJsonFile(tasks)
}

//dlete using splice
deleteTask = (taskId) => {
    let tasks = readDataFromJsonFile()
    
    index = tasks.findIndex(t=>taskId==t.id)
    if(index >= 0){
        tasks.splice(index,1)
        writeDataToJsonFile(tasks)
        console.log(chalk.green('Task deleted successfully :) '))

    }else{
        console.log(chalk.red('Task not found'))
    }
}

//update task data 
updataTask = (taskId, data) => {
    let tasks = readDataFromJsonFile()

    tasks.forEach(task => {
        if(task.id == taskId){
            task.title = data.title ?? task.title
            task.content = data.content ?? task.content
            task.dueDate = data.dueDate ?? task.dueDate
            task.type = data.type ?? task.type
        }
    })
    
    writeDataToJsonFile(tasks)
}

//change task status 
changeStaus = (taskId) => {
    let tasks = readDataFromJsonFile()

    tasks.forEach(task => {
        if(task.id == taskId){
            task.status = task.status == false ? true : false
        }
    })
    writeDataToJsonFile(tasks)
}

//get tasks due date > today date
filterTasksByDate = () => {
    let tasks = readDataFromJsonFile()
    today = new Date();
    tasks = tasks.filter(t=> new Date(t.dueDate) > today)
    console.log(tasks)
    
}

searchTaskIndex = (tasks, searchVal) =>{
    let result = tasks.findIndex(task=>{
        return searchVal == task.id
    })
    return result
}

//delete
deleteTask = (taskId)=>{
    let tasks = readDataFromJsonFile()
    let taskIndex = searchTaskIndex(tasks, taskId)
    if(taskIndex==-1) return console.log(chalk.red('task not found'))
    tasks.splice( taskIndex , 1 )
    writeDataToJsonFile(tasks)
    console.log(chalk.green('task deleted'))
}

module.exports = {
    addTask, 
    showAll,
    searchTask, 
    deleteTask, 
    deleteTaskByFilter,
    updataTask, 
    changeStaus,
    filterTasksByDate, 
    
}