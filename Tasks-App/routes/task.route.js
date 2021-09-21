const router = require('express').Router()
const taskController = require('../controller/taskController')
const auth = require('../middleware/auth')
const upload = require('../middleware/fileUpload')

router.post('/add',auth, taskController.add)
router.post('/:id/assign',auth, taskController.assign)
router.post('/:id/response', auth, upload.single('file'), taskController.uploadFile)

module.exports = router