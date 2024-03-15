import {Router} from 'express'
import UserController from '../controllers/UserController'

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/validate', UserController.validate)
router.get('/:id', UserController.getUserById)

export default router