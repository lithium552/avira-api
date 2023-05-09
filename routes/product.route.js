import { Router } from 'express'
import {
    getAllProducts,
    getAccessoriesProducts, 
    getBeautyProducts, 
    getChildrenProducts, 
    getWomenProducts, 
    getMenProducts,
    getFavoriteProducts
} from '../controllers/getProducts.js'
import { updateProduct, setFavoriteProducts } from '../controllers/updateProducts.js'
const router = Router()


router.get('/all', getAllProducts)
router.post('/all', updateProduct)
router.get('/accessories', getAccessoriesProducts)
router.get('/children', getChildrenProducts)
router.get('/beauty', getBeautyProducts)
router.get('/men', getMenProducts)
router.get('/women', getWomenProducts)
router.get('/getFavorites', getFavoriteProducts)
router.post('/favorite', setFavoriteProducts)

export default router 