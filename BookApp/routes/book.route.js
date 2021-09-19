const router = require('express').Router()
const BookController = require('../controllers/bookController')


router.post('/books/add', BookController.store)

router.get('/books', BookController.index)

router.get('/books/:id', BookController.show)

router.patch('/books/:id', BookController.update)

router.delete('/books/:id', BookController.destroy)


module.exports = router