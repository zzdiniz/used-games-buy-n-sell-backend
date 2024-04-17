import {Router} from 'express'
import GameController from '../controllers/GameController'
import verifyToken from '../middlewares/verifyToken'
import imageUpload from '../middlewares/imageUpload'

const router = Router()

router.post('/create',verifyToken,imageUpload.array('images'),GameController.create)
router.get('/', GameController.getAll)
router.get('/my-games',verifyToken, GameController.getUserGames)
router.get('/my-purchases',verifyToken, GameController.getUserPurchases)
router.patch('/schedule/:id',verifyToken,GameController.schedule)
router.patch('/conclude/:id',verifyToken,GameController.completeSale)
router.get('/:id', GameController.getGameById)
router.delete('/:id',verifyToken,GameController.deleteGameById)
router.patch('/:id',verifyToken,imageUpload.array('images'),GameController.editGame)

export default router
