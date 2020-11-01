import asyncHandler from 'express-async-handler';
import Order from '../model/OrderModel'


//ACCESS TYPE PRIVATE
//CREATE NEW ORDER
//ROUTE : REQUEST [POST] => /api/orders
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }
})


//ACCESS TYPE PRIVATE
//GET ORDER BY BY ID
//ROUTE : REQUEST [GET] => /api/orders/:id

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).popstate(
        'user',
        'name email'
    )

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


//ACCESS TYPE PRIVATE
//UPDATE ORDER TO PAID
//ROUTE : REQUEST [GET] => /api/orders/:id/pay
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }

        const updateOrder = await order.save()
        res.json(updateOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//ACCESS TYPE PRIVATE/ADMIN
//UPDATE ORDER TO DELIVERED
//ROUTE : REQUEST [GET] => /api/orders/:id/deliver
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updateOrder = await order.save()

        res.json(updateOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//ACCESS TYPE PRIVATE
//GET LOGGED IN USER ORDERS
//ROUTE : REQUEST [GET] => /api/orders/myorders
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
})

//ACCESS TYPE PRIVATE/ADMIN
//GET ALL ORDER
//ROUTE : REQUEST [GET] => /api/orders/
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders

}
