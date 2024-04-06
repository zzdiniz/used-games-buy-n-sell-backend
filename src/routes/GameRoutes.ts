import {Router} from 'express'
import GameController from '../controllers/GameController'
import verifyToken from '../middlewares/verifyToken'
import imageUpload from '../middlewares/imageUpload'

const router = Router()

router.post('/create',verifyToken,imageUpload.array('images'),GameController.create)
router.get('/', GameController.getAll)

export default router
