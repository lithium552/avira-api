import { Router } from 'express'
import { userReg, userLog , logout} from '../controllers/users.js'
const router = Router()

router.post('/register', userReg)
router.post('/login', userLog)
router.post('/logout', logout)

export default router 