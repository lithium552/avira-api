import { Router } from 'express'
import { addNewAddress, fetchAllAddresses, deleteAddress, editAddress } from '../controllers/address.controller.js'
import { userAuth } from '../middleaware/userAuth.js'
const router = Router()

router.post('/', userAuth, addNewAddress)
router.get('/', userAuth, fetchAllAddresses)
router.delete('/:id', userAuth, deleteAddress)
router.post('/:id', userAuth, editAddress)


export default router 