import express from 'express';
import {admin, protect} from "backend/middleware/AuthMiddleware";
import {
    addOrderItems,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
    getOrderById
} from "backend/controllers/OrderController";
const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin,getOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin, updateOrderToDelivered)

export default router
