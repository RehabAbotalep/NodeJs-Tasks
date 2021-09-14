const fs = require('fs')
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
    let user = {
        accNum: Date.now(),
        status:0,
        balance:0,
        name:req.body.name
    }
    allUsers.push(user)
    saveJsonFile(allUsers)
    res.redirect('/')
}
const getAll = (req, res) => {
    let allUsers = readJsonFile()
    res.render('all', {
        pageTitle: "all Customers",
        data: allUsers
    })
}

searchUser = (allUsers, id) => {
    let index = allUsers.findIndex(user => {
        return user.accNum == id
    })
    return index
}

const withdrawForm = (req, res) => {
    res.render('withdraw', {
        pageTitle:'Withdraw'
    })
}

const withdrawSubmit = (req, res) => {

    allUsers = readJsonFile()
    index = searchUser(allUsers, req.params.accNum)
    if (allUsers[index].balance==0 || allUsers[index].balance < req.body.amount) res.render('err404', {
        pageTitle: "Error",
        err: `You can't withdraw this amount`
    })
    else{
        allUsers[index].balance-=req.body.amount
        saveJsonFile(allUsers)
        res.redirect('/')
    }
    
}

const addBalanceForm = (req, res) => {
    res.render('addBalance', {
        pageTitle:'addBalance'
    })
}

const addBalanceSubmit = (req, res) => {

    allUsers = readJsonFile()
    index = searchUser(allUsers, req.params.accNum)
    allUsers[index].balance+=parseInt(req.body.amount)
    saveJsonFile(allUsers)
    res.redirect('/')
}


module.exports = {
    addCustomer, saveCustomer, getAll, withdrawForm, withdrawSubmit, addBalanceForm, addBalanceSubmit
}