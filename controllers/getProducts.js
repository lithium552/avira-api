import { Product } from "../schemas/product.model.js"
import { Favorite } from "../schemas/favorite.model.js"
import { User } from "../schemas/user.model.js"
import jwt from 'jsonwebtoken'


export const getAllProducts = async (req, res) => {
    const items = await Product.find({})
    res.send(items)
}

export const getMenProducts = async (req, res) => {
    const items = await Product.find({ category: 'men' })
    res.send(items)
}

export const getWomenProducts = async (req, res) => {
    const items = await Product.find({ category: 'women' })
    res.send(items)
}

export const getBeautyProducts = async (req, res) => {
    const items = await Product.find({ category: 'beauty' })
    res.send(items)
}

export const getAccessoriesProducts = async (req, res) => {
    const items = await Product.find({ category: 'accessories' })
    res.send(items)
}

export const getChildrenProducts = async (req, res) => {
    const items = await Product.find({ category: 'children' })
    res.send(items)
}

export const getFavoriteProducts = async (req, res) => {
    console.log(req.cookies.accessToken)
    try {
        const token = req.cookies.accessToken
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findById(decoded.id)
        const favorite = await Favorite.findOne({ userId: user.id })
        res.send(favorite.items).status(200)
    } catch (err) {
        console.log(err)
        res.send({ error: err })
    }
}
