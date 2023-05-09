import { User } from "../schemas/user.model.js"
import jwt from 'jsonwebtoken'

export const userAuth = async (req, res, next) => {
    const token = req.cookies.accessToken
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            const user = await User.findById(decoded.id)
            req.body.userId = user._id.toString()
            next()
        } catch (err) {
            console.log(err)
        }
    } else {
        res.send({message: 'You must loggin first!'}).status(403)
    }
}