import {Router} from 'express'
import UserController from '../controllers/UserController'
import verifyToken from '../middlewares/verifyToken'

const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/validate', UserController.validate)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken,UserController.edit)

export default router