import express from 'express'
import {
    createProductReview,
    deleteProduct,
    getProduct,
    getProductById,
    getTopProducts, updateProduct
} from "backend/controllers/ProductController";
import {protect} from "backend/middleware/AuthMiddleware";
const router = express.Router()

router.route('/').get(getProduct).post(protect,admin,createProduct);
router.route('/:id/reviews').post(protect, createProductReview)
router.get ('/top',getTopProducts)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

export default router
