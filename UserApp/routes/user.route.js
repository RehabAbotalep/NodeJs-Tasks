const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.get('', userController.index)

router.get('/show', userController.show)

router.get('/add', userController.add)

router.get('/edit', userController.edit)

//router.get('/delete', userController.destroy)

router.get('*', (req, res) => {
    res.render('404')
})

module.exports = router