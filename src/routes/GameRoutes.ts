import {Router} from 'express'
import GameController from '../controllers/GameController'
import verifyToken from '../middlewares/verifyToken'
import imageUpload from '../middlewares/imageUpload'

const router = Router()

router.post('/create',verifyToken,imageUpload.array('images'),GameController.create)
router.get('/', GameController.getAll)
router.get('/my-games',verifyToken, GameController.getUserGames)
router.get('/my-purchases',verifyToken, GameController.getUserPurchases)

export default router
