const fs = require('fs')
const chalk = require('chalk')

//read data from file
readDataFromJsonFile = () => {
    let data
    try{
        data = JSON.parse(fs.readFileSync('./students.json').toString())
        if(!Array.isArray(data)) throw new Error('Error')
    }
    catch(e){
        data = []
    }
    return data
}

//write data to json
writeDataToJsonFile = (data) => {
    try{
        fs.writeFileSync('./students.json', JSON.stringify(data))
    }
    catch(e){
        console.log(chalk.red('error writing data'))
    }
}

//add new student
addStudent = (data) => {

    let students = readDataFromJsonFile()

    let availableClasses = ['a', 'b', 'c']

    if( !availableClasses.includes(data.class_name) )
        return console.log(chalk.red('Invalid class name'))
    

    let student = {
        id: getStudentId(students),
        name : data.name,
        class_name : data.class_name
    }
    students.push(student)
    writeDataToJsonFile(students)
    console.log(chalk.green(`data inserted successfuly and your id is ${student.id}`))

}

getStudentId = (students) => {
    let lastElement = students[students.length - 1]
    if(lastElement) 
        return lastElement.id+1

    return 1
}

//add subjects for student
addSubject = (studentId, data) => {
    let students = readDataFromJsonFile()

    index = students.findIndex(s=>studentId==s.id)
    if(index == -1) return console.log(chalk.red('this student is not exists '))

    subjects = students[index]['subjects'] = [
        {subject : data.subject,degree : data.degree}
    ]
    writeDataToJsonFile(students)
}



module.exports = {
    addStudent,
    addSubject
}