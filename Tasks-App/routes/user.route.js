const router = require('express').Router()
const userController = require('../controller/userController')
const auth = require('../middleware/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/me', auth, userController.me)
router.post('/logout', auth, userController.logout)
router.patch('/update', auth, userController.update)


module.exports = router