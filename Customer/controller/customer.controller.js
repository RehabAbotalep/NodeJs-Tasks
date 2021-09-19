const fs = require('fs')
const validator = require('validator')

const readJsonFile = () => {
    let allUsers
    try {
        allUsers = JSON.parse(fs.readFileSync('models/users.json').toString())
        if (!Array.isArray(allUsers)) throw new Error()
    }
    catch (e) {
        allUsers = []
    }
    return allUsers
}
const saveJsonFile = (allUsers) => {
    fs.writeFileSync('models/users.json', JSON.stringify(allUsers))
}
const addCustomer = (req, res) => {
    res.render('add', {
        pageTitle: "add user"
    })
}
const saveCustomer = (req, res) => {
    // res.send(req.body)
    let allUsers = readJsonFile()
    if(!(validator.isNumeric(req.body.balance))){
        res.render('add', {
            err : 'balance must be num'
        })
        console.log(111)
    }else{
        let user = {
            accNum: Date.now(),
            status:0,
            balance:req.body.balance,
            name:req.body.name,
        }
        allUsers.push(user)
        saveJsonFile(allUsers)
        res.redirect('/')
    }
    
    
}

searchUser = (allUsers, id) => {
    let index = allUsers.findIndex(user => {
        return user.accNum == id
    })
    return index
}

const edit = (req, res) => {
    let allUsers = readJsonFile()
    let userIndex = searchUser(allUsers, req.params.accNum)
    if(userIndex==-1) res.render('err404', {
        pageTitle:"User Not Found",
        err: `No user With id ${req.params.id}`
    })
    else{
        res.render('edit',{
            pageTitle:"Edit User",
            user: allUsers[userIndex]
        })    
    }
}

const update = (req, res) => {
    let allUsers = readJsonFile()
    let userIndex = searchUser(allUsers, req.params.accNum)
    allUsers[userIndex].name= req.body.name
    saveJsonFile(allUsers)
    res.redirect('/')
    
}

const getAll = (req, res) => {
    let allUsers = readJsonFile()
    let search = req.query.q

    if(search)
        allUsers = allUsers.filter(user=> search == user.accNum)

    res.render('all', {
        pageTitle: "all Customers",
        data: allUsers
    })
}

// const withdrawForm = (req, res) => {
//     res.render('withdraw', {
//         pageTitle:'Withdraw'
//     })
// }

// const withdraw = (req, res) => {

//     allUsers = readJsonFile()
//     index = searchUser(allUsers, req.params.accNum)
//     if (allUsers[index].balance==0 || allUsers[index].balance < req.body.amount) res.render('err404', {
//         pageTitle: "Error",
//         err: `You can't withdraw this amount`
//     })
//     else{
//         allUsers[index].balance-=amount
//         saveJsonFile(allUsers)
//     } 
// }

const addBalanceForm = (req, res) => {
    res.render('addBalance', {
        pageTitle:'addBalance'
    })
}

// const addBalance = (userId, amount) => {

//     allUsers = readJsonFile()
//     index = searchUser(allUsers, userId)
//     allUsers[index].balance+=parseInt(amount)
//     saveJsonFile(allUsers)
// }

const withdraw = (balance, amount) => {
    return balance-=amount
}

const addBalance = (balance, amount) => {
    return balance+=parseInt(amount)
}

const manupliateBalance = (req, res) => {
    userId = req.params.accNum
    amount = req.body.amount

    allUsers = readJsonFile()
    index = searchUser(allUsers, req.params.accNum)
    balance = allUsers[index].balance

    if(req.body.add){

        allUsers[index].balance =  addBalance(balance, amount)
    }
    else{
        if (balance == 0 || balance < amount) res.render('err404', {
            pageTitle: "Error",
            err: `You can't withdraw this amount`
        })
        else{
            allUsers[index].balance = withdraw(balance, amount)
        } 
    }
    saveJsonFile(allUsers)
    res.redirect('/')
}


const activate = (req, res) => {
    let allUsers = readJsonFile()
    let userIndex = searchUser(allUsers, req.params.accNum)
    allUsers[userIndex].status = 1
    saveJsonFile(allUsers)
    res.redirect('/')
}


module.exports = {
    addCustomer,
    saveCustomer,
    edit,
    update,
    getAll,
    // withdrawForm, 
    // withdrawSubmit,
    addBalanceForm,
    manupliateBalance, 
    activate
}