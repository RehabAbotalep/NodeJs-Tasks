const tasks = require('./myModules/task.js')

tasks.addTask({title:'t1', content : 'c1', dueDate: '2018-02-22', type: 't1'})

tasks.showAll()

tasks.searchTask(4145392743)
tasks.deleteTask(1075476355633)
tasks.updataTask(408851574180, { title: 'new t', type: 'new Type'})
tasks.changeStaus(408851574180)
tasks.filterTasksByDate()