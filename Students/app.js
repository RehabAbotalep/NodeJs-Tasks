const yargs = require('yargs')
const students  = require('./myModules/student')

yargs.command({
    command:'add',
    describe:"add new student with name, class",
    builder:{      
        name:{
            name:String,
            demandOption: true
        },
        className:{
            type:String,
            demandOption:true
        },
    },
    handler: function(argv){
        let student = {name:argv.name,className:argv.className}
        students.addStudent(student)
    }
})

yargs.command({
    command:'addSubject',
    describe:"add new subject with name, degree",
    builder:{   
        studentId:{
            type:Number,
            demandOption:true
        },  
        subject:{
            type:String,
            demandOption: true
        },
        degree:{
            type:Number,
            demandOption:true
        },
    },
    handler: function(argv){
        let subject = {subject:argv.subject,degree:argv.degree}
        students.addSubject(argv.studentId, subject)
    }
})

yargs.command({
    command:'getStudent',
    describe:'Get student',
    builder:{
        studentId:{
            type:Number,
            demandOption:true
        }
    },
    handler: function(argv){
        console.log(students.getStudent(argv.studentId))
    }
})

yargs.command({
    command:'getAllStudents',
    describe:'Get All students',

    handler: function(){
        students.getAllStudents()
    }
})

yargs.command({
    command:'getStudentTotalDegree',
    describe:'Get student total degree',
    builder:{
        studentId:{
            type:Number,
            demandOption:true
        }
    },
    handler: function(argv){
        console.log(students.getStudentTotalDegree(argv.studentId))
    }
})

yargs.argv