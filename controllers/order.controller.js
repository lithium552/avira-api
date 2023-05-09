import { Order } from "../schemas/order.model.js"

export const addNewOrder = (req, res) => {
    console.log(req.body)
    try {
            const newOrder = new Order({...req.body})
            newOrder.save()
            res.send(newAddress).status(200)
    } catch (error) {
        res.send(error).status(500)
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const order = await Order.find({userId: req.body.userId})
        res.send(order).status(200)
        console.log(order)
    } catch (error) {
        console.log(error)
    }
}