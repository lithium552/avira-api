import { User } from "../schemas/user.model.js"
import { Favorite } from "../schemas/favorite.model.js"
import jwt from 'jsonwebtoken'

export const updateProduct = async (req, res) => {
    try {
        const { id, isFavorite } = req.body
        await products.findByIdAndUpdate(id, { isFavorite: isFavorite })
        res.send('updated').status(200)
        console.log(req.body)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

export const setFavoriteProducts = async (req, res) => {
    const token = req.cookies.accessToken
    if (!token && req.body.email) {
        try {
            const user = await User.findOne({ email: req.body.email })
            const favorite = await Favorite.findOne({ userId: user._id.toString() })
            if (favorite) {
                favorite.items = [...favorite.items, ...req.body.favorites]
                await favorite.save()
                res.status(200).send('success')
            } else {
                const newFavorite = new Favorite()
                newFavorite.userId = user._id.toString()
                newFavorite.items = req.body.favorites
                await newFavorite.save()
                res.status(200).send('success')
            }
        } catch (error) {
            console.log(error)
            res.send(500).send('something wrong!')
        }
    } else if (token) {
        try {
            const user = await User.findOne({ email: req.body.email })
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            if (decoded.id === user._id.toString()) {
                const favorite = await Favorite.findOne({ userId: user._id.toString() })
                const filteredFavoriteItems = []
                favorite.items.forEach(item => {
                    if (!filteredFavoriteItems.includes(item)) filteredFavoriteItems.push(item)
                })
                if (req.body.isFavorite) {
                    const fiteredItems = filteredFavoriteItems.filter(item => req.body.favorites[0] !== item)
                    console.log(fiteredItems.length)
                    favorite.items = fiteredItems
                } else {
                    const items = [...filteredFavoriteItems, ...req.body.favorites]
                    favorite.items = [...items]
                }
                await favorite.save()
                console.log('favorite', favorite.items.length)
                res.status(200).send({ items: favorite.items })
            } else {
                res.status(401).send('Unauthorized')
            }
        } catch (error) {
            res.status(500).send(error)
        }
    }
}