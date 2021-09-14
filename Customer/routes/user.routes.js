const router = require("express").Router()
const customerController = require('../controller/customer.controller')

router.get('/addCustomer', customerController.addCustomer)
router.post('/addCustomer', customerController.saveCustomer)

router.get('', customerController.getAll)

router.get('/withdraw/:accNum', customerController.withdrawForm)
router.post('/withdraw/:accNum', customerController.withdrawSubmit)

router.get('/addBalance/:accNum', customerController.addBalanceForm)
router.post('/addBalance/:accNum', customerController.addBalanceSubmit)

router.post('/activate/:accNum', customerController.activate)


// router.get('*', customerController.err404)

module.exports = router