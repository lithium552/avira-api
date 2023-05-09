import { User } from "../schemas/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userReg = async (req, res) => {
    try {
        const newUser = new User()
        newUser.email = req.body.email
        const hash = bcrypt.hashSync(req.body.password, 5)
        newUser.password = hash
        await newUser.save()
        res.status(201).send({ message: 'success' })
    } catch (error) {
        if (error.code === 11000) res.status(400).send({ message: 'User with this email already exist'})
        else res.status(500).send({message: 'Something went wrong!'})
    }
}

export const userLog = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isCorrect) res.status(403).send({ message: 'Wrong email or password!' })
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_KEY)
        res.cookie('accessToken', token, {
            httpOnly: true,
            maxAge: 1000000,
            secure: true,
            sameSite: 'none',
            domain: 'localhost'
        }).status(200).send({message: 'success', email: user.email}) 
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: 'Something wrong!' })
    }
}

export const logout = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        const decoded = jwt.verify(req.cookies.accessToken, process.env.JWT_KEY)
        if(decoded.id === user._id.toString()) res.clearCookie('accessToken').status(200).send({message: 'success'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: 'Something wrong!' })
    }
}