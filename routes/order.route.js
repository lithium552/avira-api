import { Router } from 'express'
import { addNewOrder, getAllOrders } from '../controllers/order.controller.js'
import { userAuth } from '../middleaware/userAuth.js'
const router = Router()

router.post('/', userAuth, addNewOrder)
router.get('/', userAuth, getAllOrders)



export default router 